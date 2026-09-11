/* global document, Office */

import { clearSession, getStoredSession, login } from "./services/authService";
import {
  getClientContacts,
  getClients,
  getRecruiters,
  getSkillsCatalog,
  saveJobDescription,
  type NamedOption,
} from "./services/jobDescriptionService";

const elements = {
  loginView: () => document.getElementById("login-view") as HTMLElement,
  formView: () => document.getElementById("form-view") as HTMLElement,
  loginEmail: () => document.getElementById("loginEmail") as HTMLInputElement,
  loginPassword: () => document.getElementById("loginPassword") as HTMLInputElement,
  loginButton: () => document.getElementById("loginButton") as HTMLButtonElement,
  loginMessage: () => document.getElementById("loginMessage") as HTMLElement,
  logoutButton: () => document.getElementById("logoutButton") as HTMLButtonElement,
  signedInAs: () => document.getElementById("signedInAs") as HTMLElement,
  emailSubject: () => document.getElementById("emailSubject") as HTMLInputElement,
  openingTitle: () => document.getElementById("openingTitle") as HTMLInputElement,
  clientSelect: () => document.getElementById("clientSelect") as HTMLSelectElement,
  contactSelect: () => document.getElementById("contactSelect") as HTMLSelectElement,
  recruiterSelect: () => document.getElementById("recruiterSelect") as HTMLSelectElement,
  skillsSelect: () => document.getElementById("skillsSelect") as HTMLSelectElement,
  jobDescription: () => document.getElementById("jobDescription") as HTMLTextAreaElement,
  submitButton: () => document.getElementById("submitButton") as HTMLButtonElement,
  formMessage: () => document.getElementById("formMessage") as HTMLElement,
};

Office.onReady((info) => {
  if (info.host !== Office.HostType.Outlook) {
    showMessage(elements.loginMessage(), "This add-in must be opened in Outlook.", "error");
    return;
  }

  elements.loginButton().addEventListener("click", () => {
    void handleLogin();
  });
  elements.logoutButton().addEventListener("click", handleLogout);
  elements.submitButton().addEventListener("click", () => {
    void handleSubmit();
  });
  elements.clientSelect().addEventListener("change", () => {
    void handleClientChange();
  });

  elements.loginEmail().addEventListener("keydown", (event) => {
    if (event.key === "Enter") void handleLogin();
  });
  elements.loginPassword().addEventListener("keydown", (event) => {
    if (event.key === "Enter") void handleLogin();
  });

  const existing = getStoredSession();
  if (existing?.token) {
    void showFormView(existing.userName || existing.emailId);
  } else {
    showLoginView();
  }
});

function showLoginView(): void {
  elements.loginView().hidden = false;
  elements.formView().hidden = true;
  clearMessage(elements.loginMessage());
}

async function showFormView(displayName?: string): Promise<void> {
  elements.loginView().hidden = true;
  elements.formView().hidden = false;
  clearMessage(elements.formMessage());

  const session = getStoredSession();
  const label = displayName || session?.userName || session?.emailId || "Signed in";
  elements.signedInAs().textContent = `Signed in as ${label}`;

  populateEmailSubject();
  elements.jobDescription().value = "";

  await loadLookupData();
  elements.jobDescription().focus();
}

function handleLogout(): void {
  clearSession();
  elements.loginPassword().value = "";
  showLoginView();
}

async function handleLogin(): Promise<void> {
  const email = elements.loginEmail().value.trim();
  const password = elements.loginPassword().value.trim();
  const loginButton = elements.loginButton();

  clearMessage(elements.loginMessage());

  if (!email && !password) {
    showMessage(elements.loginMessage(), "Please enter your email and password.", "error");
    return;
  }
  if (!email) {
    showMessage(elements.loginMessage(), "Please enter your email.", "error");
    return;
  }
  if (!password) {
    showMessage(elements.loginMessage(), "Please enter your password.", "error");
    return;
  }

  loginButton.disabled = true;
  loginButton.textContent = "Signing in...";

  try {
    const result = await login(email, password);
    if (!result.success) {
      showMessage(elements.loginMessage(), result.message, "error");
      return;
    }

    await showFormView(result.session?.userName || result.session?.emailId);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed.";
    showMessage(elements.loginMessage(), message, "error");
  } finally {
    loginButton.disabled = false;
    loginButton.textContent = "Login";
  }
}

async function loadLookupData(): Promise<void> {
  const submitButton = elements.submitButton();
  submitButton.disabled = true;
  showMessage(elements.formMessage(), "Loading clients and recruiters...", "success");

  try {
    const [clients, recruiters, skills] = await Promise.all([
      getClients(),
      getRecruiters(),
      getSkillsCatalog(),
    ]);

    fillSelect(elements.clientSelect(), clients, "Select client", false);
    fillSelect(elements.recruiterSelect(), recruiters, "", true);
    fillSkillsSelect(skills);
    resetContactSelect();
    clearMessage(elements.formMessage());
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load lookup data.";
    showMessage(elements.formMessage(), message, "error");

    if (/session expired/i.test(message)) {
      clearSession();
      showLoginView();
      showMessage(elements.loginMessage(), message, "error");
    }
  } finally {
    submitButton.disabled = false;
  }
}

async function handleClientChange(): Promise<void> {
  const clientId = elements.clientSelect().value;
  const contactSelect = elements.contactSelect();

  resetContactSelect();
  if (!clientId) return;

  contactSelect.disabled = true;
  try {
    const contacts = await getClientContacts(clientId);
    fillSelect(contactSelect, contacts, "Select contact (optional)", false);
    contactSelect.disabled = false;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load contacts.";
    showMessage(elements.formMessage(), message, "error");
    contactSelect.disabled = true;
  }
}

async function handleSubmit(): Promise<void> {
  const title =
    elements.openingTitle().value.trim() || elements.emailSubject().value.trim();
  const jobDescription = elements.jobDescription().value.trim();
  const clientId = elements.clientSelect().value;
  const clientContactId = elements.contactSelect().value || null;
  const recruiterIds = selectedValues(elements.recruiterSelect());
  const primarySkills = selectedValues(elements.skillsSelect()).join(", ") || null;
  const submitButton = elements.submitButton();

  clearMessage(elements.formMessage());

  if (!getStoredSession()?.token) {
    showLoginView();
    showMessage(elements.loginMessage(), "Please log in again.", "error");
    return;
  }

  if (!title) {
    showMessage(elements.formMessage(), "Please enter a title.", "error");
    return;
  }
  if (!clientId) {
    showMessage(elements.formMessage(), "Please select a client.", "error");
    return;
  }
  if (!recruiterIds.length) {
    showMessage(elements.formMessage(), "Please select at least one recruiter.", "error");
    return;
  }
  if (!jobDescription) {
    showMessage(elements.formMessage(), "Please enter a job description.", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  try {
    const result = await saveJobDescription({
      title,
      jobDescription,
      clientId,
      clientContactId,
      recruiterIds,
      primarySkills,
    });

    showMessage(
      elements.formMessage(),
      result.message,
      result.success ? "success" : "error"
    );

    if (result.success) {
      elements.jobDescription().value = "";
    }

    if (!result.success && /session expired/i.test(result.message)) {
      clearSession();
      showLoginView();
      showMessage(elements.loginMessage(), result.message, "error");
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save job description.";
    showMessage(elements.formMessage(), message, "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Submit";
  }
}

function populateEmailSubject(): void {
  const subjectInput = elements.emailSubject();
  const titleInput = elements.openingTitle();
  const item = Office.context.mailbox?.item;

  if (!item) {
    subjectInput.value = "";
    showMessage(
      elements.formMessage(),
      "Unable to read the current email. Open a message and try again.",
      "error"
    );
    return;
  }

  const subject = item.subject || "";
  subjectInput.value = subject;
  if (!titleInput.value.trim()) {
    titleInput.value = subject;
  }
}

function fillSelect(
  select: HTMLSelectElement,
  options: NamedOption[],
  placeholder: string,
  multiple: boolean
): void {
  select.innerHTML = "";

  if (!multiple && placeholder) {
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = placeholder;
    select.appendChild(empty);
  }

  for (const option of options) {
    const el = document.createElement("option");
    el.value = option.id;
    el.textContent = option.name;
    select.appendChild(el);
  }
}

function fillSkillsSelect(skills: string[]): void {
  const select = elements.skillsSelect();
  select.innerHTML = "";
  for (const skill of skills) {
    const el = document.createElement("option");
    el.value = skill;
    el.textContent = skill;
    select.appendChild(el);
  }
}

function resetContactSelect(): void {
  const contactSelect = elements.contactSelect();
  contactSelect.innerHTML = "";
  const empty = document.createElement("option");
  empty.value = "";
  empty.textContent = "Select contact (optional)";
  contactSelect.appendChild(empty);
  contactSelect.disabled = true;
}

function selectedValues(select: HTMLSelectElement): string[] {
  return Array.from(select.selectedOptions)
    .map((opt) => opt.value.trim())
    .filter(Boolean);
}

function showMessage(
  target: HTMLElement,
  text: string,
  type: "success" | "error"
): void {
  target.textContent = text;
  target.className = `message ${type}`;
}

function clearMessage(target: HTMLElement): void {
  target.textContent = "";
  target.className = "message";
}
