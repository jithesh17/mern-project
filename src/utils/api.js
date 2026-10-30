
const API_BASE_URL = "http://localhost:5000";

export async function apiFetch(endpoint, options = {}) {
  // Keep the existing token key as the default.
  // Admin requests can specify a different key when needed.
  const {
    tokenKey = "token",
    ...fetchOptions
  } = options;

 const token = sessionStorage.getItem(tokenKey);

  const headers = {
    ...fetchOptions.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (
    fetchOptions.body &&
    !(fetchOptions.body instanceof FormData)
  ) {
    headers["Content-Type"] = "application/json";
  }

  // Do not automatically log out or redirect on 401.
  // Let the calling component handle authentication errors.
  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });
}
