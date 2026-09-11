import { API_CONFIG, AUTH_STORAGE_KEY } from "../config";

export interface AuthSession {
  token: string;
  userId: string;
  userName: string;
  emailId: string;
  companyId: string;
  companyName: string;
}

export interface LoginResult {
  success: boolean;
  message: string;
  session?: AuthSession;
}

interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data?: T;
}

interface LoginData {
  token?: string;
  userId?: string;
  userName?: string;
  emailId?: string;
  companyId?: string;
  companyName?: string;
}

function storage(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function getStoredSession(): AuthSession | null {
  const raw = storage()?.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as AuthSession;
    return parsed?.token ? parsed : null;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  storage()?.removeItem(AUTH_STORAGE_KEY);
}

function saveSession(session: AuthSession): void {
  storage()?.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

function toSession(data: LoginData): AuthSession | null {
  if (!data?.token) return null;
  return {
    token: data.token,
    userId: String(data.userId ?? ""),
    userName: String(data.userName ?? ""),
    emailId: String(data.emailId ?? ""),
    companyId: String(data.companyId ?? ""),
    companyName: String(data.companyName ?? ""),
  };
}

async function parseEnvelope<T>(response: Response): Promise<ApiEnvelope<T>> {
  const text = await response.text();
  if (!text) {
    return { success: response.ok, message: response.statusText || "Empty response" };
  }
  try {
    return JSON.parse(text) as ApiEnvelope<T>;
  } catch {
    return {
      success: false,
      message: "Unexpected response from server.",
    };
  }
}

/**
 * Login against Codeplix auth API.
 * Only uses POST /api/v1/auth/Login.
 */
export async function login(email: string, password: string): Promise<LoginResult> {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.login}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    return {
      success: false,
      message: "Cannot reach Codeplix API. Ensure the backend and add-in proxy are running.",
    };
  }

  const envelope = await parseEnvelope<LoginData>(response);

  if (!response.ok || !envelope.success) {
    return {
      success: false,
      message: envelope.message || `Login failed (${response.status}).`,
    };
  }

  const session = toSession(envelope.data ?? {});
  if (!session) {
    return { success: false, message: "Login succeeded but no token was returned." };
  }

  saveSession(session);
  return { success: true, message: envelope.message || "Login successful", session };
}

/**
 * Refresh access token.
 * Only uses POST /api/v1/auth/RefreshToken (cookie-based).
 */
export async function refreshToken(): Promise<boolean> {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.refreshToken}`;
  const current = getStoredSession();

  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(current?.token ? { Authorization: `Bearer ${current.token}` } : {}),
      },
    });

    const envelope = await parseEnvelope<LoginData>(response);
    if (!response.ok || !envelope.success) {
      clearSession();
      return false;
    }

    const session = toSession(envelope.data ?? {});
    if (!session) {
      clearSession();
      return false;
    }

    saveSession(session);
    return true;
  } catch {
    clearSession();
    return false;
  }
}
