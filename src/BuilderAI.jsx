import { useState, useRef, useEffect } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  orange: "#F77F00",
  orangeLight: "#FFAA40",
  orangeDark: "#C05E00",
  blue: "#003566",
  blueLight: "#1B4F8A",
  blueMid: "#0A2744",
  steel: "#1E3A5F",
  white: "#FFFFFF",
  offWhite: "#F4F6F9",
  gray: "#8A9BB5",
  grayLight: "#CDD6E3",
  dark: "#0D1B2A",
  success: "#2ECC71",
  warn: "#F39C12",
  danger: "#E74C3C",
  glass: "rgba(255,255,255,0.07)",
  glassBorder: "rgba(255,255,255,0.12)",
};

const FONT = {
  display: "'Barlow Condensed', sans-serif",
  body: "'DM Sans', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  app: {
    width: 390,
    minHeight: 844,
    margin: "0 auto",
    background: C.dark,
    fontFamily: FONT.body,
    color: C.white,
    position: "relative",
    overflow: "hidden",
    borderRadius: 40,
    boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
  },
  screen: {
    width: "100%",
    minHeight: 844,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
  },
  statusBar: {
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    fontSize: 12,
    fontWeight: 600,
    color: C.white,
    flexShrink: 0,
  },
  navbar: {
    height: 72,
    background: C.blueMid,
    borderTop: `1px solid ${C.glassBorder}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: (active) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    padding: "8px 16px",
    borderRadius: 12,
    background: active ? "rgba(247,127,0,0.15)" : "transparent",
    cursor: "pointer",
    transition: "all 0.2s",
  }),
  navLabel: (active) => ({
    fontSize: 10,
    fontWeight: 600,
    color: active ? C.orange : C.gray,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  }),
  card: {
    background: C.steel,
    borderRadius: 16,
    padding: "16px 20px",
    border: `1px solid ${C.glassBorder}`,
  },
  btn: (variant = "primary") => ({
    padding: variant === "small" ? "8px 16px" : "14px 24px",
    borderRadius: 12,
    border: "none",
    background:
      variant === "primary"
        ? `linear-gradient(135deg, ${C.orange}, ${C.orangeDark})`
        : variant === "secondary"
        ? C.steel
        : variant === "ghost"
        ? "transparent"
        : C.steel,
    color: variant === "ghost" ? C.gray : C.white,
    fontSize: variant === "small" ? 12 : 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: FONT.body,
    letterSpacing: "0.02em",
    border: variant === "secondary" ? `1px solid ${C.glassBorder}` : "none",
    transition: "all 0.2s",
  }),
  tag: (color = C.orange) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "4px 10px",
    borderRadius: 6,
    background: `${color}22`,
    border: `1px solid ${color}44`,
    color: color,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  }),
};

// ─── ICONS (inline SVG) ───────────────────────────────────────────────────────
const Icon = ({ name, size = 22, color = C.white, ...props }) => {
  const icons = {
    camera: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    blueprint: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    ar: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
        <line x1="12" y1="22" x2="12" y2="15.5"/>
        <polyline points="22 8.5 12 15.5 2 8.5"/>
      </svg>
    ),
    materials: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/>
        <line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/>
        <line x1="3" y1="12" x2="3.01" y2="12"/>
        <line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
    mic: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
    wifi: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
        <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
        <line x1="12" y1="20" x2="12.01" y2="20"/>
      </svg>
    ),
    check: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    alert: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <triangle points="10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    upload: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 16 12 12 8 16"/>
        <line x1="12" y1="12" x2="12" y2="21"/>
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
      </svg>
    ),
    play: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
    pause: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
        <rect x="6" y="4" width="4" height="16"/>
        <rect x="14" y="4" width="4" height="16"/>
      </svg>
    ),
    offline: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 6l4 4"/>
        <path d="M5 10a10.26 10.26 0 0 1 14 0"/>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
        <line x1="12" y1="20" x2="12.01" y2="20"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </svg>
    ),
    home: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    chevron: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    ),
    ruler: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.3 8.7L8.7 21.3c-.4.4-1 .4-1.4 0L2.7 16.7c-.4-.4-.4-1 0-1.4L15.3 2.7c.4-.4 1-.4 1.4 0l4.6 4.6c.4.4.4 1 0 1.4z"/>
        <path d="M7.5 10.5l2 2"/><path d="M10.5 7.5l2 2"/>
        <path d="M13.5 4.5l2 2"/><path d="M4.5 13.5l2 2"/>
      </svg>
    ),
    key: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7.5" cy="15.5" r="5.5"/>
        <path d="M21 2l-9.6 9.6"/>
        <path d="M15.5 7.5l3 3L22 7l-3-3"/>
      </svg>
    ),
    close: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    ),
  };
  return icons[name] || <span style={{ fontSize: size }}>●</span>;
};

// ─── GOOGLE FONTS LOADER ──────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0D1B2A; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; padding: 20px; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
    @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes ping { 0%{transform:scale(1);opacity:1} 75%,100%{transform:scale(2);opacity:0} }
    @keyframes waveform { 0%,100%{height:6px} 50%{height:18px} }
  `}</style>
);

// ═══════════════════════════════════════════════════════════════════════════════
// AI ANALYSIS — ported from the Phase 1 app (src/services/analyzeBlueprint.js)
// Calls Claude's vision API directly from the browser with the user's own key.
// For production, swap the fetch() below for a call to your own backend route
// so the API key never reaches the browser.
// ═══════════════════════════════════════════════════════════════════════════════
// Haiku is the cheapest vision-capable model — a big cost cut from Opus, with
// a small quality tradeoff on tricky/ambiguous blueprints. Bump to
// "claude-sonnet-5-5" if you want a middle ground, or back to an Opus model
// for maximum accuracy once you're past the testing phase.
const CLAUDE_MODEL = "claude-haiku-4-5-20251001";
const CLAUDE_API = "https://api.anthropic.com/v1/messages";
const API_KEY_STORAGE = "builderai_api_key";

const ANALYSIS_SYSTEM_PROMPT = `You are BuilderAI, an expert construction analyst with deep knowledge of residential and commercial building.

You will be shown one or two images: a live photo of a job site, and (if provided) the blueprint or construction plan for that job. Analyze them together. Return ONLY a single valid JSON object — no markdown fences, no preamble, no explanation.

JSON structure (fill every field):
{
  "project_name":    "string — infer from the plan or describe it briefly",
  "project_type":    "string — e.g. Foundation, Framing, Deck, Garage, Addition",
  "summary":         "string — 2-3 sentences describing what was analyzed",
  "dimensions": {
    "description":   "string — e.g. 24 ft × 32 ft footprint",
    "area_sqft":     number or null
  },
  "materials": [
    {
      "category":          "string — e.g. Concrete & Masonry, Lumber, Fasteners, Drainage",
      "name":              "string — specific product name",
      "quantity":          "string — e.g. 4.2 cu yd, 180 linear ft, 48 pieces",
      "unit_cost_estimate":"string — e.g. $145/cu yd, $0.85/ft",
      "total_estimate":    "string — e.g. $609",
      "spec":              "string — grade/type/standard, e.g. 3000 PSI, #2 SPF, 16d galvanized",
      "note":              "string or null — critical detail or substitution note"
    }
  ],
  "total_cost_low":  number,
  "total_cost_high": number,
  "steps": [
    {
      "step":     number,
      "title":    "string — short action title",
      "detail":   "string — clear 1-2 sentence instruction a tradesperson can follow",
      "duration": "string — e.g. ~2 hours, Half day"
    }
  ],
  "warnings": ["string", "string"],
  "confidence": number
}

Rules:
- Include 6-14 distinct materials grouped by category
- Include 5-10 steps in logical build sequence
- Provide 2-5 warnings covering code compliance, safety, and common mistakes
- Cost estimates should reflect current Canadian Prairie pricing (Manitoba/Saskatchewan)
- confidence is 0-100 based on blueprint/photo clarity
- If the images are not a construction site/blueprint, set project_type to "Unknown" and explain in summary`;

function loadStoredApiKey() {
  try {
    return localStorage.getItem(API_KEY_STORAGE) || "";
  } catch {
    return "";
  }
}
function storeApiKey(key) {
  try {
    localStorage.setItem(API_KEY_STORAGE, key);
  } catch {}
}
function clearStoredApiKey() {
  try {
    localStorage.removeItem(API_KEY_STORAGE);
  } catch {}
}

// data: URL (from the camera capture) → base64 + mime type
function dataUrlToBase64(dataUrl) {
  const [header, base64] = dataUrl.split(",");
  const mimeType = header.match(/data:(.*?);base64/)?.[1] || "image/jpeg";
  return { base64, mimeType };
}

// File (from the blueprint upload) → base64 + mime type
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const base64 = dataUrl.split(",")[1];
      resolve({ base64, mimeType: file.type || "image/jpeg" });
    };
    reader.onerror = () => reject(new Error("Failed to read blueprint file"));
    reader.readAsDataURL(file);
  });
}

/**
 * Sends the captured site photo + (optional) blueprint file to Claude's
 * vision API and returns the parsed materials/steps/warnings JSON.
 */
async function analyzeBuilderProject({ sitePhotoDataUrl, blueprintFile, apiKey, onProgress }) {
  onProgress?.(10);
  const siteImg = dataUrlToBase64(sitePhotoDataUrl);
  const bpImg = blueprintFile ? await fileToBase64(blueprintFile) : null;

  onProgress?.(25);
  const userContent = [
    { type: "image", source: { type: "base64", media_type: siteImg.mimeType, data: siteImg.base64 } },
  ];
  if (bpImg) {
    userContent.push({ type: "image", source: { type: "base64", media_type: bpImg.mimeType, data: bpImg.base64 } });
  }
  userContent.push({
    type: "text",
    text: `The first image is a live photo of the job site.${
      bpImg ? " The second image is the blueprint / plan for this job." : ""
    } Analyze them and provide the complete JSON response. Return ONLY the JSON object.`,
  });

  onProgress?.(40);
  const response = await fetch(CLAUDE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      // Required for direct browser calls — in production, proxy through your own backend instead.
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 3000,
      system: ANALYSIS_SYSTEM_PROMPT,
      messages: [{ role: "user", content: userContent }],
    }),
  });

  onProgress?.(75);

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  const raw = data.content?.[0]?.text ?? "";
  onProgress?.(90);

  const clean = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();
  let result;
  try {
    result = JSON.parse(clean);
  } catch {
    throw new Error("AI returned an unexpected format. Try a clearer photo, or retake the shot.");
  }

  onProgress?.(100);
  return result;
}

// ─── API KEY SHEET ────────────────────────────────────────────────────────────
const ApiKeySheet = ({ apiKey, onSave, onClear, onClose }) => {
  const [value, setValue] = useState(apiKey || "");
  const isValid = value.trim().startsWith("sk-");

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}
      onClick={onClose}
    >
      <div
        style={{ ...S.card, width: "100%", maxWidth: 360, background: C.steel, padding: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="key" size={18} color={C.orange} />
            <h3 style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 800 }}>ANTHROPIC API KEY</h3>
          </div>
          <span style={{ cursor: "pointer" }} onClick={onClose}>
            <Icon name="close" size={18} color={C.gray} />
          </span>
        </div>
        <p style={{ fontSize: 12, color: C.gray, marginTop: 6, marginBottom: 14, lineHeight: 1.5 }}>
          Stored only in this browser. Used to call Claude's vision API directly for blueprint analysis.
        </p>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="sk-ant-..."
          style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${C.glassBorder}`, background: C.dark, color: C.white, fontSize: 14, fontFamily: FONT.mono, marginBottom: 12 }}
        />
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ ...S.btn("secondary"), flex: 1 }} onClick={onClear}>Clear</button>
          <button
            style={{ ...S.btn("primary"), flex: 1, opacity: isValid ? 1 : 0.4, cursor: isValid ? "pointer" : "not-allowed" }}
            disabled={!isValid}
            onClick={() => isValid && onSave(value.trim())}
          >
            Save
          </button>
        </div>
        {!isValid && value && (
          <p style={{ fontSize: 11, color: C.warn, marginTop: 8 }}>Anthropic keys start with "sk-"</p>
        )}
      </div>
    </div>
  );
};

// ─── STATUS BAR ───────────────────────────────────────────────────────────────
const StatusBar = ({ offline }) => (
  <div style={S.statusBar}>
    <span style={{ fontFamily: FONT.display, fontSize: 14, fontWeight: 700, color: C.orange }}>
      9:41
    </span>
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {offline && (
        <span style={{ ...S.tag(C.warn), fontSize: 9, padding: "2px 6px" }}>OFFLINE</span>
      )}
      <span style={{ fontSize: 11, color: C.gray }}>●●●</span>
      <Icon name="wifi" size={14} color={offline ? C.warn : C.white} />
      <span style={{ fontSize: 12, color: C.white }}>🔋</span>
    </div>
  </div>
);

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
const BottomNav = ({ active, onNav }) => {
  const tabs = [
    { id: "home", icon: "home", label: "Home" },
    { id: "camera", icon: "camera", label: "Scan" },
    { id: "ar", icon: "ar", label: "AR View" },
    { id: "materials", icon: "materials", label: "Materials" },
    { id: "offline", icon: "offline", label: "Offline" },
  ];
  return (
    <div style={S.navbar}>
      {tabs.map((t) => (
        <div key={t.id} style={S.navItem(active === t.id)} onClick={() => onNav(t.id)}>
          <Icon name={t.icon} size={20} color={active === t.id ? C.orange : C.gray} />
          <span style={S.navLabel(active === t.id)}>{t.label}</span>
        </div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 1: HOME DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
const HomeScreen = ({ onNav, onOpenSettings, apiKey }) => {
  const projects = [
    { name: "Maple Street Footer", status: "active", progress: 65, date: "Today", type: "Foundation" },
    { name: "Oak Ave Framing", status: "review", progress: 40, date: "Yesterday", type: "Framing" },
    { name: "Pine Rd Deck", status: "complete", progress: 100, date: "3 days ago", type: "Deck" },
  ];
  const statusColor = { active: C.success, review: C.warn, complete: C.orange };

  return (
    <div style={{ ...S.screen, background: `linear-gradient(160deg, ${C.blueMid} 0%, ${C.dark} 60%)` }}>
      <StatusBar />
      <div style={{ flex: 1, padding: "8px 20px 90px", overflowY: "auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 24, animation: "fadeIn 0.4s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: 13, color: C.gray, fontWeight: 500, marginBottom: 4 }}>Good morning,</p>
              <h1 style={{ fontFamily: FONT.display, fontSize: 34, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.01em" }}>
                BUILDER<span style={{ color: C.orange }}>AI</span>
              </h1>
            </div>
            <div
              onClick={onOpenSettings}
              title={apiKey ? "API key set — tap to change" : "Set your Anthropic API key"}
              style={{ width: 44, height: 44, borderRadius: 12, background: apiKey ? C.orange : C.steel, border: apiKey ? "none" : `1px solid ${C.glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <Icon name="key" size={18} color={apiKey ? C.white : C.gray} />
            </div>
          </div>
        </div>

        {/* Quick Action Banner */}
        <div
          onClick={() => onNav("camera")}
          style={{
            background: `linear-gradient(135deg, ${C.orange}CC, ${C.orangeDark})`,
            borderRadius: 20,
            padding: "20px 24px",
            marginBottom: 20,
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            animation: "fadeIn 0.5s ease 0.1s both",
          }}
        >
          <div style={{ position: "absolute", right: -10, top: -10, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
          <div style={{ position: "absolute", right: 20, bottom: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: 6 }}>New Scan</p>
          <p style={{ fontFamily: FONT.display, fontSize: 26, fontWeight: 800, lineHeight: 1.1, marginBottom: 12 }}>
            Snap a photo to<br />get AI guidance
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: "8px 14px", width: "fit-content" }}>
            <Icon name="camera" size={16} />
            <span style={{ fontSize: 13, fontWeight: 700 }}>Open Camera</span>
            <Icon name="chevron" size={14} />
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20, animation: "fadeIn 0.5s ease 0.2s both" }}>
          {[
            { label: "Scans", value: "24", icon: "camera" },
            { label: "Saved", value: "8", icon: "offline" },
            { label: "Projects", value: "3", icon: "blueprint" },
          ].map((s) => (
            <div key={s.label} style={{ ...S.card, textAlign: "center", padding: "14px 10px" }}>
              <Icon name={s.icon} size={18} color={C.orange} />
              <p style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 800, margin: "4px 0 2px", color: C.orangeLight }}>{s.value}</p>
              <p style={{ fontSize: 11, color: C.gray, fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Projects */}
        <div style={{ animation: "fadeIn 0.5s ease 0.3s both" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 700, letterSpacing: "0.02em" }}>RECENT PROJECTS</h2>
            <span style={{ fontSize: 12, color: C.orange, fontWeight: 600, cursor: "pointer" }}>See all →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {projects.map((p, i) => (
              <div key={i} style={{ ...S.card, cursor: "pointer" }} onClick={() => onNav("ar")}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 3 }}>{p.name}</p>
                    <div style={{ display: "flex", gap: 6 }}>
                      <span style={S.tag(C.blue + "88")}>{p.type}</span>
                      <span style={{ fontSize: 11, color: C.gray, alignSelf: "center" }}>{p.date}</span>
                    </div>
                  </div>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: statusColor[p.status], boxShadow: `0 0 8px ${statusColor[p.status]}` }} />
                </div>
                <div style={{ background: C.dark, borderRadius: 6, height: 6, overflow: "hidden" }}>
                  <div style={{ width: `${p.progress}%`, height: "100%", background: `linear-gradient(90deg, ${C.orange}, ${C.orangeLight})`, borderRadius: 6, transition: "width 1s ease" }} />
                </div>
                <p style={{ fontSize: 11, color: C.gray, marginTop: 5, textAlign: "right" }}>{p.progress}% complete</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 2: CAMERA + UPLOAD
// ═══════════════════════════════════════════════════════════════════════════════
const CameraScreen = ({ onNav, apiKey, onOpenSettings, onAnalyzed }) => {
  const [step, setStep] = useState("camera"); // camera | analyzing | error
  const [hasSitePhoto, setHasSitePhoto] = useState(false);
  const [hasBlueprint, setHasBlueprint] = useState(false);
  const [progress, setProgress] = useState(0);
  const [capturedImage, setCapturedImage] = useState(null);
  const [blueprintFile, setBlueprintFile] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const blueprintInputRef = useRef(null);

  // Start the device camera as soon as we're on the capture screen and no photo yet.
  useEffect(() => {
    if (step !== "camera" || hasSitePhoto) return;
    let cancelled = false;

    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: "environment" }, audio: false })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
        setCameraError(null);
      })
      .catch((err) => setCameraError(err.message || "Camera unavailable"));

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [step, hasSitePhoto]);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.videoWidth) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    setCapturedImage(canvas.toDataURL("image/jpeg", 0.9));
    setHasSitePhoto(true);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const retakePhoto = () => {
    setHasSitePhoto(false);
    setCapturedImage(null);
  };

  const handleBlueprintChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBlueprintFile(file);
    setHasBlueprint(true);
  };

  const runAnalysis = async () => {
    if (!hasSitePhoto || !hasBlueprint) return;
    if (!apiKey) {
      onOpenSettings();
      return;
    }
    setStep("analyzing");
    setProgress(0);
    try {
      const result = await analyzeBuilderProject({
        sitePhotoDataUrl: capturedImage,
        blueprintFile,
        apiKey,
        onProgress: setProgress,
      });
      onAnalyzed(result);
      onNav("ar");
    } catch (err) {
      setErrorMsg(err.message || "Analysis failed");
      setStep("error");
    }
  };

  if (step === "analyzing") {
    const steps = [
      "Preparing images...",
      "Sending to Claude vision...",
      "Reading site photo & blueprint...",
      "Generating materials & steps...",
    ];
    const currentStepIdx = Math.floor((progress / 100) * (steps.length - 1));

    return (
      <div style={{ ...S.screen, background: C.dark, alignItems: "center", justifyContent: "center" }}>
        <StatusBar />
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", border: `3px solid ${C.steel}`, borderTop: `3px solid ${C.orange}`, animation: "spin 1s linear infinite", margin: "0 auto 24px" }} />
          <h2 style={{ fontFamily: FONT.display, fontSize: 28, fontWeight: 800, marginBottom: 8 }}>AI ANALYSIS</h2>
          <p style={{ color: C.gray, fontSize: 14, marginBottom: 24 }}>
            {steps[Math.min(currentStepIdx, steps.length - 1)]}
          </p>
          <div style={{ background: C.steel, borderRadius: 8, height: 8, overflow: "hidden", marginBottom: 10, width: 260 }}>
            <div style={{ width: `${progress}%`, height: "100%", background: `linear-gradient(90deg, ${C.orange}, ${C.orangeLight})`, transition: "width 0.3s ease", borderRadius: 8 }} />
          </div>
          <p style={{ fontFamily: FONT.mono, fontSize: 13, color: C.orange }}>{Math.round(progress)}%</p>
          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 8 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, opacity: i <= currentStepIdx ? 1 : 0.3, transition: "opacity 0.3s" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: i < currentStepIdx ? C.success : i === currentStepIdx ? C.orange : C.steel, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {i < currentStepIdx && <Icon name="check" size={10} color={C.white} />}
                </div>
                <span style={{ fontSize: 13, color: i <= currentStepIdx ? C.white : C.gray }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div style={{ ...S.screen, background: C.dark, alignItems: "center", justifyContent: "center" }}>
        <StatusBar />
        <div style={{ textAlign: "center", padding: 40 }}>
          <Icon name="alert" size={40} color={C.danger} />
          <h2 style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 800, marginTop: 16, marginBottom: 8 }}>ANALYSIS FAILED</h2>
          <p style={{ color: C.gray, fontSize: 13, marginBottom: 24, maxWidth: 280 }}>{errorMsg}</p>
          <button style={S.btn("primary")} onClick={() => setStep("camera")}>← Try again</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...S.screen, background: C.dark }}>
      <StatusBar />
      <div style={{ padding: "8px 20px 20px", flexShrink: 0 }}>
        <h2 style={{ fontFamily: FONT.display, fontSize: 26, fontWeight: 800 }}>NEW <span style={{ color: C.orange }}>SCAN</span></h2>
        <p style={{ fontSize: 13, color: C.gray, marginTop: 2 }}>Capture site + blueprint for AI analysis</p>
      </div>

      {/* Camera Viewfinder */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div
        onClick={() => !hasSitePhoto && capturePhoto()}
        style={{
          margin: "0 20px",
          height: 220,
          borderRadius: 20,
          background: hasSitePhoto
            ? `linear-gradient(160deg, #2d4a2d, #1a3020)`
            : `linear-gradient(160deg, ${C.blueMid}, ${C.dark})`,
          border: `2px dashed ${hasSitePhoto ? C.success : C.glassBorder}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s",
          marginBottom: 12,
        }}
      >
        {hasSitePhoto ? (
          <>
            {/* Actual captured frame */}
            {capturedImage && (
              <img src={capturedImage} alt="Captured site photo" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            )}
            <div style={{ position: "absolute", top: 10, right: 10, zIndex: 2 }} onClick={(e) => { e.stopPropagation(); retakePhoto(); }}>
              <span style={{ ...S.btn("secondary"), padding: "6px 12px", fontSize: 11, display: "inline-block" }}>↻ Retake</span>
            </div>
            <div style={{ position: "absolute", bottom: 12, left: 12, zIndex: 2, background: `${C.success}22`, border: `1px solid ${C.success}`, borderRadius: 10, padding: "6px 12px", display: "flex", alignItems: "center", gap: 8, backdropFilter: "blur(4px)" }}>
              <Icon name="check" size={14} color={C.success} />
              <span style={{ fontSize: 13, fontWeight: 700, color: C.success }}>Site photo captured</span>
            </div>
          </>
        ) : cameraError ? (
          <>
            <Icon name="alert" size={30} color={C.warn} />
            <p style={{ fontSize: 13, fontWeight: 600, color: C.warn, marginTop: 10, textAlign: "center", padding: "0 24px" }}>Camera unavailable</p>
            <p style={{ fontSize: 11, color: C.gray, marginTop: 4, textAlign: "center", padding: "0 24px" }}>{cameraError} — check browser permissions</p>
          </>
        ) : (
          <>
            <video ref={videoRef} muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              <div style={{ position: "absolute", top: "30%", left: 0, right: 0, height: 1, background: `${C.orange}55`, animation: "scanline 3s linear infinite" }} />
            </div>
            {/* Corner brackets */}
            {[{ top: 12, left: 12 }, { top: 12, right: 12 }, { bottom: 12, left: 12 }, { bottom: 12, right: 12 }].map((pos, i) => (
              <div key={i} style={{ position: "absolute", width: 24, height: 24, ...pos, borderColor: C.orange, borderStyle: "solid", borderWidth: 0, pointerEvents: "none", ...(i < 2 ? { borderTopWidth: 3 } : { borderBottomWidth: 3 }), ...(i % 2 === 0 ? { borderLeftWidth: 3 } : { borderRightWidth: 3 }), borderRadius: 2 }} />
            ))}
            <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, textAlign: "center", zIndex: 2 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.white, textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>Tap to capture site photo</p>
            </div>
          </>
        )}
      </div>

      {/* Blueprint Upload */}
      <input
        ref={blueprintInputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        style={{ display: "none" }}
        onChange={handleBlueprintChange}
      />
      <div
        onClick={() => blueprintInputRef.current?.click()}
        style={{
          margin: "0 20px 16px",
          padding: "16px 20px",
          borderRadius: 16,
          background: hasBlueprint ? `${C.blueLight}33` : C.steel,
          border: `2px dashed ${hasBlueprint ? C.blueLight : C.glassBorder}`,
          display: "flex",
          alignItems: "center",
          gap: 16,
          cursor: "pointer",
          transition: "all 0.3s",
        }}
      >
        <div style={{ width: 48, height: 48, borderRadius: 12, background: hasBlueprint ? `${C.blueLight}33` : C.dark, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {hasBlueprint ? <Icon name="blueprint" size={24} color={C.blueLight} /> : <Icon name="upload" size={24} color={C.gray} />}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: hasBlueprint ? C.white : C.gray }}>
            {hasBlueprint ? blueprintFile?.name : "Upload Blueprint / House Plan"}
          </p>
          <p style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>
            {hasBlueprint ? `${(blueprintFile.size / 1024 / 1024).toFixed(1)} MB · Ready for analysis` : "PDF, PNG, JPG — up to 50MB"}
          </p>
        </div>
        {hasBlueprint && <Icon name="check" size={18} color={C.success} />}
      </div>

      {/* AI Features Preview */}
      <div style={{ margin: "0 20px 16px" }}>
        <p style={{ fontSize: 12, color: C.gray, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>AI will analyze for:</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {["Materials & cost estimate", "Build step sequence", "Code/safety warnings", "Project summary"].map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: C.steel, borderRadius: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.orange, flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: C.grayLight }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Analyze Button */}
      <div style={{ padding: "0 20px 90px" }}>
        <button
          style={{ ...S.btn("primary"), width: "100%", opacity: hasSitePhoto && hasBlueprint ? 1 : 0.4, cursor: hasSitePhoto && hasBlueprint ? "pointer" : "not-allowed" }}
          disabled={!hasSitePhoto || !hasBlueprint}
          onClick={runAnalysis}
        >
          🤖 Analyze with BuilderAI
        </button>
        {(!hasSitePhoto || !hasBlueprint) && (
          <p style={{ textAlign: "center", fontSize: 12, color: C.gray, marginTop: 8 }}>
            {!hasSitePhoto ? "Capture site photo first" : "Upload blueprint to continue"}
          </p>
        )}
        {hasSitePhoto && hasBlueprint && !apiKey && (
          <p style={{ textAlign: "center", fontSize: 12, color: C.warn, marginTop: 8, cursor: "pointer" }} onClick={onOpenSettings}>
            ⚙ Set your Anthropic API key to enable real analysis
          </p>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 3: AR RESULTS + VOICE GUIDE
// ═══════════════════════════════════════════════════════════════════════════════
const ARScreen = ({ onNav, result }) => {
  const [voiceActive, setVoiceActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [arMode, setArMode] = useState("overlay"); // overlay | measurements | alignment
  const [showAlert, setShowAlert] = useState(true);

  const demoSteps = [
    { title: "Mark footer corners", detail: "Using AR guides, mark all 4 corners with stakes. Ensure alignment with red overlay lines.", time: "~5 min" },
    { title: "Verify depth measurements", detail: "Dig to exactly 42 inches per plan. AR depth indicator will turn green when correct.", time: "~45 min" },
    { title: "Check width compliance", detail: "Footer width must be 24 inches minimum. Blue measurement lines show exact required width.", time: "~5 min" },
    { title: "Inspect soil condition", detail: "Look for soft spots or debris. AR will flag areas needing compaction.", time: "~10 min" },
    { title: "Prepare for concrete pour", detail: "Confirm form boards are level. AR level indicator shows ±0.5° tolerance.", time: "~20 min" },
  ];

  const steps = result?.steps?.length
    ? result.steps.map((s) => ({ title: s.title, detail: s.detail, time: s.duration }))
    : demoSteps;

  const warnings = result?.warnings?.length ? result.warnings : null;
  const confidence = result?.confidence ?? 94;
  const isLive = !!result;

  return (
    <div style={{ ...S.screen, background: C.dark }}>
      <StatusBar />

      {/* AR Viewfinder */}
      <div style={{ margin: "0 0 0 0", height: 280, position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #1a2e10, #0f1e08, #1a300a)", flexShrink: 0 }}>
        {/* Ground simulation */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(to bottom, transparent 50%, rgba(101,67,33,0.4) 100%)" }} />

        {/* Grid overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.orange}18 1px, transparent 1px), linear-gradient(90deg, ${C.orange}18 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

        {/* AR overlay lines (illustrative — not derived from real pixel coordinates) */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 390 280">
          <rect x="60" y="80" width="270" height="140" fill="none" stroke={C.orange} strokeWidth="2.5" strokeDasharray="8,4" />
          <line x1="40" y1="80" x2="40" y2="220" stroke={C.warn} strokeWidth="2" />
          <line x1="34" y1="80" x2="46" y2="80" stroke={C.warn} strokeWidth="2" />
          <line x1="34" y1="220" x2="46" y2="220" stroke={C.warn} strokeWidth="2" />
          <line x1="195" y1="60" x2="195" y2="260" stroke={`${C.blueLight}88`} strokeWidth="1" strokeDasharray="4,4" />
          <line x1="30" y1="150" x2="360" y2="150" stroke={`${C.blueLight}88`} strokeWidth="1" strokeDasharray="4,4" />
          {[[60,80],[330,80],[60,220],[330,220]].map(([x,y],i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="6" fill={C.orange} opacity="0.9" />
              <circle cx={x} cy={y} r="10" fill="none" stroke={C.orange} strokeWidth="1.5" opacity="0.5" />
            </g>
          ))}
        </svg>

        {/* Mode selector */}
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
          {["overlay", "measurements", "alignment"].map((m) => (
            <button key={m} style={{ padding: "5px 10px", borderRadius: 8, border: "none", background: arMode === m ? C.orange : "rgba(0,0,0,0.6)", color: C.white, fontSize: 11, fontWeight: 700, cursor: "pointer", textTransform: "capitalize" }} onClick={() => setArMode(m)}>
              {m}
            </button>
          ))}
        </div>

        {!isLive && (
          <div style={{ position: "absolute", top: 12, right: 12, ...S.tag(C.blueLight), fontSize: 9, padding: "3px 8px" }}>DEMO DATA</div>
        )}

        {/* Confidence badge */}
        <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.75)", borderRadius: 10, padding: "6px 12px", backdropFilter: "blur(4px)", border: `1px solid ${C.glassBorder}` }}>
          <p style={{ fontSize: 10, color: C.gray, fontWeight: 600, letterSpacing: "0.06em" }}>AI CONFIDENCE</p>
          <p style={{ fontFamily: FONT.display, fontSize: 22, fontWeight: 800, color: C.success, lineHeight: 1 }}>{confidence}%</p>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px 90px" }}>
        {/* Project summary (real result) */}
        {result && (
          <div style={{ ...S.card, marginBottom: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 700 }}>{result.project_name || "Untitled project"}</p>
            <p style={{ fontSize: 11, color: C.gray, marginTop: 4 }}>
              {result.project_type} · {result.dimensions?.description || "dimensions unknown"}
              {result.dimensions?.area_sqft ? ` · ${result.dimensions.area_sqft} sq ft` : ""}
            </p>
            {result.summary && <p style={{ fontSize: 12, color: C.grayLight, marginTop: 8, lineHeight: 1.5 }}>{result.summary}</p>}
          </div>
        )}

        {/* Alerts / warnings */}
        {warnings ? (
          warnings.map((w, i) => (
            <div key={i} style={{ background: `${C.warn}18`, border: `1px solid ${C.warn}44`, borderRadius: 12, padding: "12px 16px", marginBottom: 10, display: "flex", gap: 12, alignItems: "flex-start", animation: "fadeIn 0.3s ease" }}>
              <Icon name="alert" size={18} color={C.warn} />
              <p style={{ fontSize: 12, color: C.gray, lineHeight: 1.4 }}>{w}</p>
            </div>
          ))
        ) : (
          showAlert && (
            <div style={{ background: `${C.warn}18`, border: `1px solid ${C.warn}44`, borderRadius: 12, padding: "12px 16px", marginBottom: 12, display: "flex", gap: 12, alignItems: "center", animation: "fadeIn 0.3s ease" }}>
              <Icon name="alert" size={18} color={C.warn} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.warn }}>Alignment warning</p>
                <p style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>East wall is 2.1° off. Adjust stakes before digging.</p>
              </div>
              <span style={{ fontSize: 16, cursor: "pointer", color: C.gray }} onClick={() => setShowAlert(false)}>✕</span>
            </div>
          )
        )}

        {/* Voice Guide */}
        <div style={{ ...S.card, marginBottom: 16, background: voiceActive ? `${C.blue}66` : C.steel, border: `1px solid ${voiceActive ? C.blueLight : C.glassBorder}`, transition: "all 0.3s" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: voiceActive ? C.orange : C.dark, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <Icon name="mic" size={18} color={voiceActive ? C.white : C.gray} />
                {voiceActive && <div style={{ position: "absolute", inset: -3, borderRadius: "50%", border: `2px solid ${C.orange}`, animation: "ping 1.5s ease infinite" }} />}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700 }}>Voice Guide</p>
                <p style={{ fontSize: 11, color: voiceActive ? C.orangeLight : C.gray }}>{voiceActive ? "Speaking step-by-step..." : "Tap to enable hands-free"}</p>
              </div>
            </div>
            <button style={{ ...S.btn(voiceActive ? "primary" : "secondary"), padding: "8px 16px", fontSize: 12 }} onClick={() => setVoiceActive(!voiceActive)}>
              {voiceActive ? "Pause" : "Start"}
            </button>
          </div>
          {voiceActive && (
            <div style={{ display: "flex", alignItems: "center", gap: 3, padding: "8px 0" }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} style={{ width: 3, background: C.orange, borderRadius: 3, animationName: "waveform", animationDuration: `${0.3 + Math.random() * 0.5}s`, animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: `${i * 0.05}s`, height: 6 }} />
              ))}
            </div>
          )}
        </div>

        {/* Step-by-step instructions */}
        <div>
          <h3 style={{ fontFamily: FONT.display, fontSize: 18, fontWeight: 700, marginBottom: 12, letterSpacing: "0.02em" }}>
            STEP-BY-STEP GUIDE
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {steps.map((s, i) => (
              <div
                key={i}
                style={{ ...S.card, cursor: "pointer", background: i === currentStep ? `${C.orange}18` : C.steel, border: `1px solid ${i === currentStep ? C.orange : C.glassBorder}`, transition: "all 0.2s" }}
                onClick={() => setCurrentStep(i)}
              >
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: i < currentStep ? C.success : i === currentStep ? C.orange : C.dark, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, fontWeight: 800, color: C.white, fontFamily: FONT.display }}>
                    {i < currentStep ? <Icon name="check" size={14} color={C.white} /> : i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: i === currentStep ? C.white : C.grayLight }}>{s.title}</p>
                      <span style={{ fontSize: 11, color: C.gray }}>{s.time}</span>
                    </div>
                    {i === currentStep && (
                      <p style={{ fontSize: 12, color: C.gray, marginTop: 6, lineHeight: 1.5, animation: "fadeIn 0.3s ease" }}>{s.detail}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button style={{ ...S.btn("secondary"), flex: 1 }} onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}>← Previous</button>
            <button style={{ ...S.btn("primary"), flex: 1 }} onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}>Next Step →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 4: MATERIALS LIST
// ═══════════════════════════════════════════════════════════════════════════════
const MaterialsScreen = ({ result }) => {
  const demoCategories = [
    {
      name: "Concrete & Masonry",
      icon: "🏗️",
      items: [
        { name: "Ready-Mix Concrete", qty: "4.2 cu yd", unit_cost: "$145", total: "$609", confidence: 98, notes: "3000 PSI minimum" },
        { name: "Rebar #4", qty: "180 linear ft", unit_cost: "$0.85/ft", total: "$153", confidence: 95, notes: "12\" spacing per plan" },
        { name: "Tie Wire", qty: "5 lbs", unit_cost: "$12/lb", total: "$60", confidence: 90, notes: "" },
      ]
    },
    {
      name: "Forming Materials",
      icon: "🪵",
      items: [
        { name: '2"×8" Form Boards', qty: "48 pieces", unit_cost: "$8.50/ea", total: "$408", confidence: 92, notes: "8 ft lengths" },
        { name: "Form Stakes", qty: "36 pieces", unit_cost: "$1.20/ea", total: "$43", confidence: 88, notes: "" },
        { name: "Form Oil / Release", qty: "2 gallons", unit_cost: "$28/gal", total: "$56", confidence: 85, notes: "" },
      ]
    },
    {
      name: "Drainage & Waterproofing",
      icon: "💧",
      items: [
        { name: "Drain Tile 4\"", qty: "55 linear ft", unit_cost: "$2.10/ft", total: "$116", confidence: 90, notes: "Perimeter drain" },
        { name: "Gravel (Pea Stone)", qty: "3 tons", unit_cost: "$42/ton", total: "$126", confidence: 85, notes: "6\" bed required" },
      ]
    },
  ];

  const parseMoney = (s) => parseFloat(String(s).replace(/[^0-9.]/g, "")) || 0;

  let categories = demoCategories;
  let totalCost = 1571;
  let confidenceLabel = "92%";
  let headerSubtitle = "Maple Street Foundation — AI Generated";
  let isLive = false;

  if (result?.materials?.length) {
    isLive = true;
    const byCategory = {};
    for (const m of result.materials) {
      const cat = m.category || "Other";
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push({
        name: m.name,
        qty: m.quantity,
        unit_cost: m.unit_cost_estimate,
        total: m.total_estimate,
        confidence: result.confidence ?? 90,
        notes: m.note || m.spec || "",
      });
    }
    categories = Object.entries(byCategory).map(([name, items]) => ({ name, icon: "🧱", items }));
    totalCost = result.total_cost_low != null && result.total_cost_high != null
      ? Math.round((result.total_cost_low + result.total_cost_high) / 2)
      : categories.reduce((a, c) => a + c.items.reduce((b, i) => b + parseMoney(i.total), 0), 0);
    confidenceLabel = result.confidence != null ? `${result.confidence}%` : "—";
    headerSubtitle = `${result.project_name || "Project"} — AI Generated`;
  }

  const totalItems = categories.reduce((a, c) => a + c.items.length, 0);

  return (
    <div style={{ ...S.screen, background: C.dark }}>
      <StatusBar />
      <div style={{ padding: "8px 20px 12px", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <h2 style={{ fontFamily: FONT.display, fontSize: 26, fontWeight: 800 }}>MATERIAL <span style={{ color: C.orange }}>ESTIMATE</span></h2>
          {!isLive && <span style={{ ...S.tag(C.blueLight), fontSize: 9, padding: "3px 8px" }}>DEMO</span>}
        </div>
        <p style={{ fontSize: 13, color: C.gray, marginTop: 2 }}>{headerSubtitle}</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: "0 20px 16px", flexShrink: 0 }}>
        {[
          { label: "Total Cost", value: `$${totalCost.toLocaleString()}`, icon: "💰", color: C.orange },
          { label: "Line Items", value: totalItems, icon: "📦", color: C.blueLight },
          { label: "Confidence", value: confidenceLabel, icon: "🎯", color: C.success },
        ].map((s, i) => (
          <div key={i} style={{ ...S.card, textAlign: "center", padding: "12px 8px" }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
            <p style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</p>
            <p style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div style={{ margin: "0 20px 12px", padding: "8px 14px", background: `${C.warn}15`, border: `1px solid ${C.warn}30`, borderRadius: 10, display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
        <Icon name="alert" size={14} color={C.warn} />
        <p style={{ fontSize: 11, color: C.warn }}>AI estimate ±10%. Verify with supplier before ordering.</p>
      </div>

      {/* Items */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 90px" }}>
        {categories.map((cat, ci) => (
          <div key={ci} style={{ marginBottom: 20, animation: `fadeIn 0.4s ease ${ci * 0.1}s both` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{cat.icon}</span>
              <h3 style={{ fontFamily: FONT.display, fontSize: 17, fontWeight: 700, letterSpacing: "0.03em" }}>{cat.name.toUpperCase()}</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {cat.items.map((item, ii) => (
                <div key={ii} style={{ ...S.card, padding: "12px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 700 }}>{item.name}</p>
                      <p style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{item.qty} × {item.unit_cost}</p>
                      {item.notes && <p style={{ fontSize: 11, color: C.blueLight, marginTop: 3, fontStyle: "italic" }}>Note: {item.notes}</p>}
                    </div>
                    <div style={{ textAlign: "right", marginLeft: 12 }}>
                      <p style={{ fontFamily: FONT.mono, fontSize: 16, fontWeight: 700, color: C.orangeLight }}>{item.total}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", marginTop: 4 }}>
                        <div style={{ width: 40, height: 4, borderRadius: 2, background: C.dark, overflow: "hidden" }}>
                          <div style={{ width: `${item.confidence}%`, height: "100%", background: item.confidence >= 95 ? C.success : item.confidence >= 88 ? C.warn : C.danger, borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 10, color: C.gray }}>{item.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Category subtotal */}
            <div style={{ textAlign: "right", marginTop: 6, padding: "0 4px" }}>
              <span style={{ fontSize: 12, color: C.gray }}>Subtotal: </span>
              <span style={{ fontFamily: FONT.mono, fontSize: 13, color: C.orange, fontWeight: 700 }}>
                ${cat.items.reduce((a, i) => a + parseMoney(i.total), 0).toLocaleString()}
              </span>
            </div>
          </div>
        ))}

        {/* Total + Export */}
        <div style={{ ...S.card, background: `linear-gradient(135deg, ${C.blue}, ${C.blueMid})`, padding: "20px", marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 13, color: C.gray, fontWeight: 600 }}>TOTAL ESTIMATE</p>
              <p style={{ fontFamily: FONT.display, fontSize: 36, fontWeight: 800, color: C.orangeLight, lineHeight: 1 }}>${totalCost.toLocaleString()}</p>
              <p style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>Excl. tax & delivery</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button style={{ ...S.btn("primary"), padding: "10px 16px", fontSize: 13 }}>📤 Export PDF</button>
              <button style={{ ...S.btn("secondary"), padding: "10px 16px", fontSize: 13 }}>💾 Save Offline</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 5: OFFLINE MODE
// ═══════════════════════════════════════════════════════════════════════════════
const OfflineScreen = () => {
  const [isOnline, setIsOnline] = useState(true);
  const cached = [
    { name: "Maple Street Foundation", type: "foundation-plan-v2.pdf", size: "4.2 MB", date: "Today", steps: 5, status: "synced" },
    { name: "Oak Ave Framing Plan", type: "oak-framing-final.pdf", size: "7.8 MB", date: "Yesterday", steps: 12, status: "synced" },
    { name: "Pine Rd Deck Details", type: "deck-specs-v3.pdf", size: "2.1 MB", date: "3 days ago", steps: 8, status: "outdated" },
  ];

  const storageUsed = 14.1;
  const storageMax = 100;
  const pct = (storageUsed / storageMax) * 100;

  return (
    <div style={{ ...S.screen, background: C.dark }}>
      <StatusBar offline={!isOnline} />
      <div style={{ padding: "8px 20px 12px", flexShrink: 0 }}>
        <h2 style={{ fontFamily: FONT.display, fontSize: 26, fontWeight: 800 }}>OFFLINE <span style={{ color: C.orange }}>MODE</span></h2>
        <p style={{ fontSize: 13, color: C.gray, marginTop: 2 }}>Blueprints cached for job sites</p>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 90px" }}>
        {/* Connection toggle */}
        <div style={{ ...S.card, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: isOnline ? `${C.success}22` : `${C.warn}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={isOnline ? "wifi" : "offline"} size={20} color={isOnline ? C.success : C.warn} />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700 }}>{isOnline ? "Connected" : "Offline Mode Active"}</p>
              <p style={{ fontSize: 12, color: C.gray }}>{isOnline ? "All features available" : "Using cached data only"}</p>
            </div>
          </div>
          <div
            onClick={() => setIsOnline(!isOnline)}
            style={{ width: 46, height: 26, borderRadius: 13, background: isOnline ? C.success : C.steel, position: "relative", cursor: "pointer", transition: "background 0.3s", border: `1px solid ${C.glassBorder}` }}
          >
            <div style={{ position: "absolute", top: 3, left: isOnline ? 22 : 3, width: 18, height: 18, borderRadius: "50%", background: C.white, transition: "left 0.3s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
          </div>
        </div>

        {/* Storage */}
        <div style={{ ...S.card, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <p style={{ fontSize: 13, fontWeight: 700 }}>Storage Used</p>
            <p style={{ fontFamily: FONT.mono, fontSize: 13, color: C.orange }}>{storageUsed} / {storageMax} MB</p>
          </div>
          <div style={{ background: C.dark, borderRadius: 8, height: 10, overflow: "hidden", marginBottom: 6 }}>
            <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${C.orange}, ${C.orangeLight})`, borderRadius: 8 }} />
          </div>
          <p style={{ fontSize: 11, color: C.gray }}>{(storageMax - storageUsed).toFixed(1)} MB free · AsyncStorage + Realm DB</p>
        </div>

        {/* Offline capabilities */}
        <div style={{ ...S.card, marginBottom: 16, background: `${C.blueMid}88` }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.gray, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Available Offline</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { feature: "Cached blueprints & plans", icon: "blueprint", ok: true },
              { feature: "Step-by-step instructions", icon: "materials", ok: true },
              { feature: "Voice guidance (downloaded)", icon: "mic", ok: true },
              { feature: "Material estimates (saved)", icon: "ruler", ok: true },
              { feature: "Live AI image analysis", icon: "camera", ok: false },
              { feature: "Cloud sync & updates", icon: "wifi", ok: false },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon name={f.icon} size={16} color={f.ok ? C.success : C.gray} />
                <span style={{ fontSize: 13, color: f.ok ? C.white : C.gray, flex: 1 }}>{f.feature}</span>
                {f.ok ? <Icon name="check" size={14} color={C.success} /> : <span style={{ fontSize: 12, color: C.gray }}>Needs Wi-Fi</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Cached projects */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h3 style={{ fontFamily: FONT.display, fontSize: 18, fontWeight: 700 }}>CACHED BLUEPRINTS</h3>
            <button style={{ ...S.btn("primary"), padding: "6px 14px", fontSize: 12 }}>+ Cache New</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {cached.map((p, i) => (
              <div key={i} style={{ ...S.card, animation: `fadeIn 0.4s ease ${i * 0.1}s both` }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: `${C.blueLight}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name="blueprint" size={22} color={C.blueLight} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <p style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</p>
                      <span style={{ ...S.tag(p.status === "synced" ? C.success : C.warn), fontSize: 9, padding: "2px 6px" }}>{p.status}</span>
                    </div>
                    <p style={{ fontSize: 11, color: C.gray, marginTop: 3 }}>{p.type} · {p.size} · {p.steps} steps · {p.date}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button style={{ ...S.btn("secondary"), flex: 1, padding: "7px", fontSize: 12 }}>Open</button>
                  <button style={{ ...S.btn("ghost"), flex: 1, padding: "7px", fontSize: 12, color: C.danger }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function BuilderAI() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [apiKey, setApiKeyState] = useState(() => loadStoredApiKey());
  const [showSettings, setShowSettings] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const openSettings = () => setShowSettings(true);

  const screens = {
    home: <HomeScreen onNav={setActiveScreen} onOpenSettings={openSettings} apiKey={apiKey} />,
    camera: (
      <CameraScreen
        onNav={setActiveScreen}
        apiKey={apiKey}
        onOpenSettings={openSettings}
        onAnalyzed={(result) => setAnalysis(result)}
      />
    ),
    ar: <ARScreen onNav={setActiveScreen} result={analysis} />,
    materials: <MaterialsScreen result={analysis} />,
    offline: <OfflineScreen />,
  };

  return (
    <>
      <FontLoader />
      <div style={{ minHeight: "100vh", background: "#060E18", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "20px 0", fontFamily: FONT.body }}>
        <div>
          {/* Phone frame */}
          <div style={{ ...S.app, position: "relative" }}>
            {/* Notch */}
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 32, background: C.dark, borderRadius: "0 0 20px 20px", zIndex: 50 }} />
            {screens[activeScreen]}
            <BottomNav active={activeScreen} onNav={setActiveScreen} />
          </div>

          {/* Legend below phone */}
          <div style={{ marginTop: 24, maxWidth: 390, padding: "0 4px" }}>
            <p style={{ fontFamily: FONT.body, fontSize: 12, color: "#4A6080", textAlign: "center", lineHeight: 1.6 }}>
              📱 <strong style={{ color: "#6A8FB5" }}>BuilderAI</strong> — Tap the key icon on Home to set your Anthropic API key, then Scan → capture + upload → Analyze for a real AI read.
            </p>
          </div>
        </div>
      </div>

      {showSettings && (
        <ApiKeySheet
          apiKey={apiKey}
          onSave={(key) => { storeApiKey(key); setApiKeyState(key); setShowSettings(false); }}
          onClear={() => { clearStoredApiKey(); setApiKeyState(""); }}
          onClose={() => setShowSettings(false)}
        />
      )}
    </>
  );
}
