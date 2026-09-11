import { API_CONFIG } from "../config";
import { clearSession, getStoredSession, refreshToken } from "./authService";

export interface NamedOption {
  id: string;
  name: string;
}

export interface SaveOpeningPayload {
  title: string;
  jobDescription: string;
  clientId: string;
  clientContactId?: string | null;
  recruiterIds: string[];
  primarySkills?: string | null;
}

export interface SaveOpeningResult {
  success: boolean;
  message: string;
}

interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data?: T;
}

interface PagedItems<T> {
  items?: T[];
}

async function parseJson<T>(response: Response): Promise<ApiEnvelope<T>> {
  const text = await response.text();
  if (!text) {
    return { success: response.ok, message: response.statusText || "Empty response" };
  }
  try {
    return JSON.parse(text) as ApiEnvelope<T>;
  } catch {
    return { success: false, message: "Unexpected response from server." };
  }
}

function authHeaders(): HeadersInit {
  const session = getStoredSession();
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (session?.token) {
    headers.Authorization = `Bearer ${session.token}`;
  }
  return headers;
}

async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  retried = false
): Promise<ApiEnvelope<T>> {
  const url = `${API_CONFIG.baseUrl}${path}`;
  let response: Response;

  try {
    response = await fetch(url, {
      ...init,
      credentials: "include",
      headers: {
        ...authHeaders(),
        ...(init.headers || {}),
      },
    });
  } catch {
    return {
      success: false,
      message: "Cannot reach Codeplix API. Ensure the backend and add-in proxy are running.",
    };
  }

  if (response.status === 401 && !retried) {
    const refreshed = await refreshToken();
    if (refreshed) {
      return apiFetch<T>(path, init, true);
    }
    clearSession();
    return { success: false, message: "Session expired. Please log in again." };
  }

  const envelope = await parseJson<T>(response);
  if (!response.ok || envelope.success === false) {
    return {
      success: false,
      message: envelope.message || `Request failed (${response.status}).`,
      data: envelope.data,
    };
  }

  return {
    success: true,
    message: envelope.message,
    data: envelope.data,
  };
}

function asArray<T>(data: T[] | PagedItems<T> | null | undefined): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data.items ?? [];
}

function pickName(row: Record<string, unknown>): string {
  const name =
    row.name ??
    row.clientName ??
    row.userName ??
    row.fullName ??
    row.displayName ??
    row.email;
  return String(name ?? "").trim() || "Unnamed";
}

function pickId(row: Record<string, unknown>): string {
  return String(row.id ?? row.userId ?? "").trim();
}

/**
 * GET /api/v1/Clients/GetClients
 */
export async function getClients(): Promise<NamedOption[]> {
  const qs = new URLSearchParams({ pageNumber: "1", pageSize: "100" });
  const result = await apiFetch<PagedItems<Record<string, unknown>> | Record<string, unknown>[]>(
    `${API_CONFIG.endpoints.getClients}?${qs.toString()}`,
    { method: "GET" }
  );

  if (!result.success) {
    throw new Error(result.message || "Failed to load clients.");
  }

  return asArray(result.data)
    .map((row) => ({ id: pickId(row), name: pickName(row) }))
    .filter((x) => x.id);
}

/**
 * GET /api/v1/Clients/GetClientContacts
 */
export async function getClientContacts(clientId: string): Promise<NamedOption[]> {
  if (!clientId) return [];

  const qs = new URLSearchParams({
    clientId,
    pageNumber: "1",
    pageSize: "100",
  });
  const result = await apiFetch<PagedItems<Record<string, unknown>> | Record<string, unknown>[]>(
    `${API_CONFIG.endpoints.getClientContacts}?${qs.toString()}`,
    { method: "GET" }
  );

  if (!result.success) {
    throw new Error(result.message || "Failed to load contacts.");
  }

  return asArray(result.data)
    .map((row) => ({ id: pickId(row), name: pickName(row) }))
    .filter((x) => x.id);
}

/**
 * GET /api/v1/Dashboard/GetRecruitmentRecruiters
 */
export async function getRecruiters(): Promise<NamedOption[]> {
  const result = await apiFetch<Record<string, unknown>[] | null>(
    API_CONFIG.endpoints.getRecruiters,
    { method: "GET" }
  );

  if (!result.success) {
    throw new Error(result.message || "Failed to load recruiters.");
  }

  return (result.data ?? [])
    .map((row) => ({ id: pickId(row), name: pickName(row) }))
    .filter((x) => x.id);
}

/**
 * GET /api/v1/Openings/GetSkillsCatalog
 */
export async function getSkillsCatalog(): Promise<string[]> {
  const result = await apiFetch<string[] | null>(API_CONFIG.endpoints.getSkillsCatalog, {
    method: "GET",
  });

  if (!result.success) {
    throw new Error(result.message || "Failed to load skills.");
  }

  return (result.data ?? []).map((s) => String(s).trim()).filter(Boolean);
}

/**
 * POST /api/v1/Openings/SaveOpening
 */
export async function saveJobDescription(
  payload: SaveOpeningPayload
): Promise<SaveOpeningResult> {
  const title = payload.title?.trim();
  const jobDescription = payload.jobDescription?.trim();
  const clientId = payload.clientId?.trim();
  const recruiterIds = (payload.recruiterIds ?? []).map((id) => String(id).trim()).filter(Boolean);

  if (!title) {
    return { success: false, message: "Title is required." };
  }
  if (!jobDescription) {
    return { success: false, message: "Job description is required." };
  }
  if (!clientId) {
    return { success: false, message: "Please select a client." };
  }
  if (!recruiterIds.length) {
    return { success: false, message: "Please select at least one recruiter." };
  }
  if (jobDescription.length > 8000) {
    return { success: false, message: "Job description must be at most 8000 characters." };
  }

  const body = {
    ...API_CONFIG.openingDefaults,
    clientId,
    clientContactId: payload.clientContactId?.trim() || null,
    title,
    jobDescription,
    primarySkills: payload.primarySkills?.trim() || null,
    recruiterIds,
  };

  const result = await apiFetch<unknown>(API_CONFIG.endpoints.saveOpening, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!result.success) {
    return {
      success: false,
      message: result.message || "Failed to save opening.",
    };
  }

  return {
    success: true,
    message: result.message || "Opening created successfully. It will appear under Recruitment → Openings.",
  };
}
