const OWNER = import.meta.env.VITE_GITHUB_OWNER;
const REPO = import.meta.env.VITE_GITHUB_REPO;
const BRANCH = import.meta.env.VITE_GITHUB_BRANCH || "main";

const API = "https://api.github.com";

function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export function utf8ToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

export function base64ToUtf8(b64) {
  return decodeURIComponent(escape(atob(b64)));
}

function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

async function request(path, token, options = {}) {
  const res = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${path}`, {
    ...options,
    headers: { ...headers(token), ...(options.headers || {}) },
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = body?.message || `GitHub API error (${res.status})`;
    throw new Error(msg);
  }
  return body;
}

/** Verify the token can read the repo, and return basic repo info. */
export async function verifyAccess(token) {
  const res = await fetch(`${API}/repos/${OWNER}/${REPO}`, {
    headers: headers(token),
  });
  if (!res.ok) {
    throw new Error(
      res.status === 404
        ? "Repo not found, or this token can't see it. Check VITE_GITHUB_OWNER/REPO and the token's repo access."
        : `Could not verify access (${res.status}).`
    );
  }
  return res.json();
}

/** Fetch a file's current content (decoded) and sha, or null if it doesn't exist yet. */
export async function getFile(path, token) {
  try {
    const data = await request(`${encodePath(path)}?ref=${BRANCH}`, token);
    return { sha: data.sha, content: base64ToUtf8(data.content) };
  } catch (e) {
    if (String(e.message).includes("Not Found")) return null;
    throw e;
  }
}

/**
 * Create or update a file in the repo.
 * @param {string} path - repo-relative path, e.g. "public/images/foo.jpg"
 * @param {string} base64Content - raw base64 payload (no data: prefix)
 * @param {string} message - commit message
 * @param {string} token
 * @param {string|undefined} sha - required when updating an existing file
 */
export async function putFile(path, base64Content, message, token, sha) {
  return request(encodePath(path), token, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: base64Content,
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });
}

export function isConfigured() {
  return Boolean(OWNER && REPO);
}

export const REPO_INFO = { owner: OWNER, repo: REPO, branch: BRANCH };
