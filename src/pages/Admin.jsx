import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, UploadCloud, CheckCircle2, ArrowLeft } from "lucide-react";
import {
  verifyAccess,
  getFile,
  putFile,
  utf8ToBase64,
  isConfigured,
  REPO_INFO,
} from "../lib/github";
import artworksSeed from "../data/artworks.json";

const CATEGORIES = [
  "Graphite Portraits",
  "Pen Sketching",
  "Charcoal Work",
  "Commission Work",
];

const TOKEN_KEY = "tc_admin_token";
const ARTWORKS_PATH = "src/data/artworks.json";

function slugify(title) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `piece-${Date.now()}`
  );
}

function resizeImageToBase64(file, maxWidth = 1600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = () => {
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve({ dataUrl, base64: dataUrl.split(",")[1] });
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || "");
  const [tokenInput, setTokenInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [gateError, setGateError] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: CATEGORIES[0],
    medium: "",
    description: "",
  });
  const [preview, setPreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (token) {
      verifyAccess(token)
        .then(() => setUnlocked(true))
        .catch(() => {
          sessionStorage.removeItem(TOKEN_KEY);
          setToken("");
        });
    }
  }, [token]);

  async function handleUnlock(e) {
    e.preventDefault();
    setGateError("");
    setVerifying(true);
    try {
      await verifyAccess(tokenInput.trim());
      sessionStorage.setItem(TOKEN_KEY, tokenInput.trim());
      setToken(tokenInput.trim());
      setUnlocked(true);
    } catch (err) {
      setGateError(err.message);
    } finally {
      setVerifying(false);
    }
  }

  function handleLock() {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setUnlocked(false);
    setTokenInput("");
  }

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const { dataUrl, base64 } = await resizeImageToBase64(file);
    setPreview(dataUrl);
    setImageData(base64);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    setSuccess(null);

    if (!imageData) {
      setSubmitError("Please choose an image first.");
      return;
    }
    if (!form.title.trim()) {
      setSubmitError("Please give the piece a title.");
      return;
    }

    setSubmitting(true);
    try {
      const id = slugify(form.title);
      const imagePath = `public/images/${id}.jpg`;
      const imageUrl = `/images/${id}.jpg`;

      const existingImage = await getFile(imagePath, token).catch(() => null);
      await putFile(
        imagePath,
        imageData,
        `Add artwork image: ${form.title}`,
        token,
        existingImage?.sha
      );

      const current = await getFile(ARTWORKS_PATH, token);
      const list = current ? JSON.parse(current.content) : artworksSeed;
      const entry = {
        id,
        title: form.title.trim(),
        category: form.category,
        medium: form.medium.trim() || "Mixed media",
        description: form.description.trim(),
        image: imageUrl,
        featured: false,
      };
      const updated = [entry, ...list.filter((a) => a.id !== id)];
      const newContent = JSON.stringify(updated, null, 2) + "\n";

      await putFile(
        ARTWORKS_PATH,
        utf8ToBase64(newContent),
        `Add "${form.title}" to gallery`,
        token,
        current?.sha
      );

      setSuccess(form.title);
      setForm({ title: "", category: CATEGORIES[0], medium: "", description: "" });
      setPreview(null);
      setImageData(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setSubmitError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isConfigured()) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-3xl text-brown-deep mb-3">
            Admin not configured
          </h1>
          <p className="text-brown text-sm mb-6">
            Set <code>VITE_GITHUB_OWNER</code> and <code>VITE_GITHUB_REPO</code>{" "}
            in your <code>.env</code> file (see <code>.env.example</code>),
            then rebuild.
          </p>
          <Link to="/" className="text-brown-deep underline">
            Back to site
          </Link>
        </div>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleUnlock}
          className="w-full max-w-sm bg-sand/40 border border-olive/40 rounded-3xl p-7 sm:p-8"
        >
          <div className="rounded-full bg-brown-deep text-cream w-11 h-11 flex items-center justify-center mb-5">
            <Lock size={20} />
          </div>
          <h1 className="font-display text-3xl text-brown-deep mb-2">
            Tushar Creates — Admin
          </h1>
          <p className="text-brown text-sm mb-5">
            Paste a GitHub token scoped to{" "}
            <code>
              {REPO_INFO.owner}/{REPO_INFO.repo}
            </code>{" "}
            to unlock uploading.
          </p>

          <input
            type="password"
            required
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="github_pat_..."
            className="w-full rounded-xl border border-olive/60 bg-cream px-4 py-3 text-sm text-brown-deep mb-3 focus:outline-none focus:ring-2 focus:ring-brown-deep"
          />

          {gateError && (
            <p className="text-red-700 text-xs mb-3">{gateError}</p>
          )}

          <button
            type="submit"
            disabled={verifying}
            className="w-full rounded-full bg-brown-deep text-cream font-semibold py-3 hover:bg-brown transition-colors disabled:opacity-60"
          >
            {verifying ? "Checking…" : "Unlock"}
          </button>

          <div className="mt-6 flex gap-2 text-xs text-brown/70 leading-relaxed">
            <ShieldCheck size={28} className="shrink-0 text-olive-dark" />
            <p>
              This token stays in this browser only (session storage) and is
              sent only to <code>api.github.com</code>. Create a{" "}
              <a
                href="https://github.com/settings/personal-access-tokens/new"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                fine-grained token
              </a>{" "}
              scoped to just this repo, with Contents: Read & write, and a
              short expiry.
            </p>
          </div>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-1 text-xs text-brown/60 hover:text-brown"
          >
            <ArrowLeft size={14} /> Back to site
          </Link>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-10 px-5 sm:px-8">
      <div className="mx-auto max-w-xl">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-brown/70 hover:text-brown"
          >
            <ArrowLeft size={16} /> Back to site
          </Link>
          <button
            type="button"
            onClick={handleLock}
            className="text-sm text-brown/70 hover:text-brown"
          >
            Lock
          </button>
        </div>

        <h1 className="font-display text-4xl text-brown-deep mb-2">
          Add new artwork
        </h1>
        <p className="text-brown text-sm mb-8">
          This commits straight to{" "}
          <code>
            {REPO_INFO.owner}/{REPO_INFO.repo}@{REPO_INFO.branch}
          </code>
          . Cloudflare Pages will redeploy automatically in ~30–60s.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-brown-deep mb-1.5">
              Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="w-full text-sm text-brown"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 rounded-xl max-h-64 object-cover"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-brown-deep mb-1.5">
              Title
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full rounded-xl border border-olive/60 bg-white/60 px-4 py-2.5 text-sm text-brown-deep focus:outline-none focus:ring-2 focus:ring-brown-deep"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-brown-deep mb-1.5">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full rounded-xl border border-olive/60 bg-white/60 px-4 py-2.5 text-sm text-brown-deep focus:outline-none focus:ring-2 focus:ring-brown-deep"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-brown-deep mb-1.5">
              Medium
            </label>
            <input
              type="text"
              placeholder="e.g. Graphite on paper"
              value={form.medium}
              onChange={(e) => setForm((f) => ({ ...f, medium: e.target.value }))}
              className="w-full rounded-xl border border-olive/60 bg-white/60 px-4 py-2.5 text-sm text-brown-deep focus:outline-none focus:ring-2 focus:ring-brown-deep"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-brown-deep mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              className="w-full rounded-xl border border-olive/60 bg-white/60 px-4 py-2.5 text-sm text-brown-deep focus:outline-none focus:ring-2 focus:ring-brown-deep"
            />
          </div>

          {submitError && (
            <p className="text-red-700 text-sm">{submitError}</p>
          )}

          {success && (
            <div className="flex items-center gap-2 text-green-800 text-sm bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <CheckCircle2 size={18} />
              &ldquo;{success}&rdquo; committed. It'll appear on the live site
              shortly.
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brown-deep text-cream font-semibold py-3.5 hover:bg-brown transition-colors disabled:opacity-60"
          >
            <UploadCloud size={18} />
            {submitting ? "Uploading…" : "Publish artwork"}
          </button>
        </form>
      </div>
    </div>
  );
}
