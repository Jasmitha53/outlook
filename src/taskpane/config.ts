/**
 * API configuration for Codeplix backend.
 * In development, requests go through the webpack proxy (/api → https://localhost:44372)
 * so the add-in does not require backend CORS changes.
 */
export const API_CONFIG = {
  /** Relative base — proxied by webpack-dev-server in development. */
  baseUrl: "/api/v1",
  endpoints: {
    login: "/auth/Login",
    refreshToken: "/auth/RefreshToken",
    saveOpening: "/Openings/SaveOpening",
    getClients: "/Clients/GetClients",
    getClientContacts: "/Clients/GetClientContacts",
    getRecruiters: "/Dashboard/GetRecruitmentRecruiters",
    getSkillsCatalog: "/Openings/GetSkillsCatalog",
  },
  /** Defaults matching Codeplix RecruitmentLookupIds / openings-add. */
  openingDefaults: {
    status: 10, // Open
    priority: 15, // Medium
    numOpenings: 1,
    workType: 18, // On-site
    employmentType: 53, // Full time
    interviewType: 23, // Standard
    technicalRounds: 1,
    clientRounds: 1,
    finalRounds: 1,
    otherRounds: 0,
    salaryCurrency: "INR",
    salaryPeriod: 21, // Yearly
  },
};

export const AUTH_STORAGE_KEY = "codeplix.outlook.auth";
