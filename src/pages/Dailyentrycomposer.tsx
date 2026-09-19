import { useState, useEffect, useRef, useCallback } from "react";
import { ImagePlus, X, Check, BookmarkPlus, Trash2, Clock, ChevronLeft } from "lucide-react";

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap";

const STORAGE_KEY = "daily-entries";

function useGoogleFonts() {
  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_HREF}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    document.head.appendChild(link);
  }, []);
}

function formatTopBarDate(d) {
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function formatCardDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function DailyEntryComposer() {
  useGoogleFonts();

  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [entries, setEntries] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const fileInputRef = useRef(null);
  const saveTimeoutRef = useRef(null);

  // Load previously saved entries on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!window.storage) throw new Error("no storage");
        const result = await window.storage.get(STORAGE_KEY, false);
        if (!cancelled && result?.value) {
          setEntries(JSON.parse(result.value));
        }
      } catch {
        if (!cancelled) setStorageAvailable(false);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  const persist = useCallback(async (next) => {
    setEntries(next);
    try {
      if (window.storage) {
        await window.storage.set(STORAGE_KEY, JSON.stringify(next), false);
      }
    } catch {
      // silently keep in-memory only
    }
  }, []);

  const readFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    readFile(e.dataTransfer.files?.[0]);
  };

  const wordCount = story.trim() ? story.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  const handleSave = () => {
    if (!title.trim()) {
      setTitleError(true);
      setTimeout(() => setTitleError(false), 500);
      return;
    }
    const entry = {
      id: `${Date.now()}`,
      title: title.trim(),
      story: story.trim(),
      image,
      createdAt: new Date().toISOString(),
    };
    persist([entry, ...entries]);
    setTitle("");
    setStory("");
    setImage(null);
    setJustSaved(true);
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => setJustSaved(false), 2200);
  };

  const handleDelete = (id) => {
    persist(entries.filter((e) => e.id !== id));
  };

  return (
    <div className="dje-root">
      <style>{`
        .dje-root {
          --canvas: #E9E6DD;
          --surface: #FFFFFF;
          --border: #D8D3C4;
          --ink: #26241E;
          --muted: #7A7568;
          --accent: #3F5D4E;
          --accent-soft: #E4EAE6;
          --warm: #B8763F;
          --warm-soft: #F4E7D8;
          font-family: 'Inter', -apple-system, sans-serif;
          background: var(--canvas);
          color: var(--ink);
          min-height: 100%;
          padding: 32px 20px 64px;
          box-sizing: border-box;
        }
        .dje-root *, .dje-root *::before, .dje-root *::after { box-sizing: border-box; }
        .dje-shell {
          max-width: 640px;
          margin: 0 auto;
          animation: dje-rise 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes dje-rise {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .dje-shell { animation: none; }
        }

        .dje-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          font-size: 13px;
          color: var(--muted);
        }
        .dje-back {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          color: var(--muted);
          font-size: 13px;
          font-family: inherit;
          cursor: pointer;
          padding: 4px 2px;
        }
        .dje-back:hover { color: var(--ink); }
        .dje-saved-count { color: var(--muted); }

        .dje-dropzone {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 8;
          border-radius: 16px;
          border: 1.5px dashed var(--border);
          background: var(--surface);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.2s ease, background 0.2s ease;
          margin-bottom: 28px;
        }
        .dje-dropzone.dragging {
          border-color: var(--warm);
          background: var(--warm-soft);
        }
        .dje-dropzone:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }
        .dje-dropzone-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--muted);
          padding: 24px;
          text-align: center;
        }
        .dje-dropzone-empty span.dje-hint { font-size: 12px; color: var(--muted); opacity: 0.8; }
        .dje-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .dje-cover-remove {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(38, 36, 30, 0.55);
          border: none;
          color: #fff;
          width: 30px;
          height: 30px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .dje-cover-remove:hover { background: rgba(38, 36, 30, 0.75); }

        .dje-title-input {
          width: 100%;
          border: none;
          background: transparent;
          font-family: 'Fraunces', Georgia, serif;
          font-size: 40px;
          font-weight: 500;
          line-height: 1.15;
          color: var(--ink);
          padding: 0 0 12px 0;
          border-bottom: 1.5px solid transparent;
          margin-bottom: 20px;
          transition: border-color 0.2s ease;
        }
        .dje-title-input::placeholder { color: #C7C2B3; }
        .dje-title-input:focus { outline: none; border-bottom-color: var(--border); }
        .dje-title-input.error { animation: dje-shake 0.4s ease; border-bottom-color: #B4543D; }
        @keyframes dje-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }

        .dje-story {
          width: 100%;
          min-height: 220px;
          border: none;
          background: transparent;
          resize: vertical;
          font-family: 'Fraunces', Georgia, serif;
          font-size: 19px;
          font-weight: 400;
          line-height: 1.8;
          color: var(--ink);
          padding: 0;
        }
        .dje-story::placeholder { color: #ACA792; }
        .dje-story:focus { outline: none; }

        .dje-footer {
          position: sticky;
          bottom: 16px;
          margin-top: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 12px 14px 12px 18px;
        }
        .dje-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--muted);
        }
        .dje-save-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          padding: 10px 18px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.1s ease;
        }
        .dje-save-btn:hover { background: #34493D; }
        .dje-save-btn:active { transform: scale(0.97); }
        .dje-save-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
        .dje-save-btn.saved { background: var(--warm); }

        .dje-shelf {
          margin-top: 56px;
        }
        .dje-shelf-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 20px;
          font-weight: 500;
          margin: 0 0 4px 0;
        }
        .dje-shelf-sub {
          font-size: 13px;
          color: var(--muted);
          margin: 0 0 16px 0;
        }
        .dje-shelf-row {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          padding-bottom: 8px;
          margin: 0 -20px;
          padding-left: 20px;
          padding-right: 20px;
        }
        .dje-shelf-empty {
          border: 1px dashed var(--border);
          border-radius: 14px;
          padding: 28px 20px;
          text-align: center;
          color: var(--muted);
          font-size: 14px;
        }
        .dje-card {
          flex: 0 0 210px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          position: relative;
        }
        .dje-card-img {
          width: 100%;
          height: 110px;
          object-fit: cover;
          display: block;
          background: var(--accent-soft);
        }
        .dje-card-monogram {
          width: 100%;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--accent-soft);
          font-family: 'Fraunces', Georgia, serif;
          font-size: 34px;
          color: var(--accent);
        }
        .dje-card-body { padding: 12px 12px 14px; }
        .dje-card-date { font-size: 11px; color: var(--muted); margin: 0 0 4px 0; }
        .dje-card-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 16px;
          font-weight: 500;
          margin: 0 0 4px 0;
          line-height: 1.3;
        }
        .dje-card-excerpt {
          font-size: 12.5px;
          color: var(--muted);
          margin: 0;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .dje-card-delete {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(255,255,255,0.9);
          border: 1px solid var(--border);
          color: var(--muted);
          width: 26px;
          height: 26px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .dje-card-delete:hover { color: #B4543D; border-color: #B4543D; }

        .dje-storage-note {
          font-size: 12px;
          color: var(--muted);
          text-align: center;
          margin-top: 10px;
        }
      `}</style>

      <div className="dje-shell">
        <div className="dje-topbar">
          <button className="dje-back" type="button">
            <ChevronLeft size={15} />
            Journal
          </button>
          <span>{formatTopBarDate(new Date())}</span>
          <span className="dje-saved-count">
            {loaded ? `${entries.length} saved` : "loading…"}
          </span>
        </div>

        <div
          className={`dje-dropzone${isDragging ? " dragging" : ""}`}
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {image ? (
            <>
              <img src={image} alt="Cover" className="dje-cover-img" />
              <button
                type="button"
                className="dje-cover-remove"
                onClick={(e) => { e.stopPropagation(); setImage(null); }}
                aria-label="Remove cover image"
              >
                <X size={15} />
              </button>
            </>
          ) : (
            <div className="dje-dropzone-empty">
              <ImagePlus size={22} />
              <span>Add a cover image</span>
              <span className="dje-hint">Click to browse or drag a photo here</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => readFile(e.target.files?.[0])}
          />
        </div>

        <input
          className={`dje-title-input${titleError ? " error" : ""}`}
          placeholder="Today's topic"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={90}
        />

        <textarea
          className="dje-story"
          placeholder="Write today's story…"
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />

        <div className="dje-footer">
          <div className="dje-meta">
            <Clock size={14} />
            <span>{wordCount} words · {readingTime} min read</span>
          </div>
          <button
            type="button"
            className={`dje-save-btn${justSaved ? " saved" : ""}`}
            onClick={handleSave}
          >
            {justSaved ? <Check size={16} /> : <BookmarkPlus size={16} />}
            {justSaved ? "Saved for later" : "Save entry"}
          </button>
        </div>

        <div className="dje-shelf">
          <h2 className="dje-shelf-title">Saved for later</h2>
          <p className="dje-shelf-sub">Entries you can come back and read anytime.</p>

          {entries.length === 0 ? (
            <div className="dje-shelf-empty">Nothing saved yet — your first entry will show up here.</div>
          ) : (
            <div className="dje-shelf-row">
              {entries.map((entry) => (
                <div className="dje-card" key={entry.id}>
                  <button
                    type="button"
                    className="dje-card-delete"
                    onClick={() => handleDelete(entry.id)}
                    aria-label={`Delete ${entry.title}`}
                  >
                    <Trash2 size={13} />
                  </button>
                  {entry.image ? (
                    <img src={entry.image} alt="" className="dje-card-img" />
                  ) : (
                    <div className="dje-card-monogram">{entry.title.charAt(0).toUpperCase()}</div>
                  )}
                  <div className="dje-card-body">
                    <p className="dje-card-date">{formatCardDate(entry.createdAt)}</p>
                    <h3 className="dje-card-title">{entry.title}</h3>
                    {entry.story && <p className="dje-card-excerpt">{entry.story}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!storageAvailable && loaded && (
          <p className="dje-storage-note">Saved entries will persist for this session.</p>
        )}
      </div>
    </div>
  );
}