"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import rawCalls from "@/data/calls-data.json";

// ─── CSS variables from dashboard.html ───────────────────────────────────────
const D = {
    bg:        "#0d0d0f",
    surface:   "#141417",
    surface2:  "#1c1c21",
    surface3:  "#242429",
    border:    "rgba(255,255,255,0.07)",
    border2:   "rgba(255,255,255,0.12)",
    text:      "#f0f0f2",
    muted:     "#7c7c8a",
    faint:     "#3a3a44",
    positive:  "#5af0a0",  posDim:  "rgba(90,240,160,0.1)",
    negative:  "#f05a5a",  negDim:  "rgba(240,90,90,0.1)",
    neutral:   "#8a8af0",  neuDim:  "rgba(138,138,240,0.1)",
    transfer:  "#f0c05a",  traDim:  "rgba(240,192,90,0.1)",
    accent:    "#c9a961",  accDim:  "rgba(201,169,97,0.12)",  accBorder: "rgba(201,169,97,0.28)",
};

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = "Agent" | "User" | "System";
interface Turn { time: string; role: Role; text: string; }
interface CallRecord {
    call_id: string;
    caller_name: string;
    caller_id: string | null;
    started_at: string;
    duration_seconds: number;
    ai_sentiment: "positive" | "neutral" | "negative";
    disposition: "transferred" | "resolved" | "callback" | "missed";
    end_reason: string;
    ai_intent: string;
    ai_summary: string;
    transferred_to?: string;
    transferred_ext?: string;
    transfer_dept?: string;
    audio_src: string;
    transcript: Turn[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmtDuration(s: number) {
    const m = Math.floor(s / 60), sec = s % 60;
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
}
function fmtTime(s: number) {
    if (!isFinite(s)) return "0:00";
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}
function timeOnly(dt: string) { return dt.split(" ")[1]?.slice(0, 5) ?? dt; }
function dateOnly(dt: string) {
    const [y, m, d] = (dt.split(" ")[0] ?? "").split("-");
    if (!d) return dt;
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${d} ${months[parseInt(m)-1]}`;
}

// ─── Sentiment badge ──────────────────────────────────────────────────────────
function SentBadge({ s }: { s: string }) {
    const map: Record<string, [string,string]> = {
        positive: [D.positive, D.posDim],
        negative: [D.negative, D.negDim],
        neutral:  [D.neutral,  D.neuDim],
    };
    const [color, bg] = map[s] ?? [D.muted, D.surface3];
    return (
        <span style={{
            display:"inline-flex", alignItems:"center",
            padding:"2px 8px", borderRadius:"100px",
            fontSize:"11px", fontWeight:500, fontFamily:"'DM Mono',monospace",
            color, background: bg,
        }}>{s}</span>
    );
}

// ─── Disposition pill (dispo-pill) ────────────────────────────────────────────
function DispoPill({ d }: { d: string }) {
    const map: Record<string, [string,string]> = {
        transferred: [D.transfer, D.traDim],
        resolved:    [D.positive, D.posDim],
        callback:    [D.neutral,  D.neuDim],
        missed:      [D.negative, D.negDim],
    };
    const [color, bg] = map[d] ?? [D.muted, "none"];
    return (
        <span style={{
            display:"inline-flex", alignItems:"center",
            padding:"3px 10px", borderRadius:"100px",
            fontSize:"11px", fontFamily:"'DM Mono',monospace",
            fontWeight:500, color, background: bg,
        }}>{d}</span>
    );
}

// ─── Simple audio player (mirrors audio-wrap) ─────────────────────────────────
function AudioPlayer({ src }: { src: string }) {
    const ref = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);
    const [cur, setCur]         = useState(0);
    const [dur, setDur]         = useState(0);
    const [err, setErr]         = useState(false);
    const pct = dur ? (cur / dur) * 100 : 0;

    const toggle = useCallback(() => {
        const a = ref.current; if (!a || err) return;
        if (playing) { a.pause(); setPlaying(false); }
        else { a.play().catch(() => setErr(true)); setPlaying(true); }
    }, [playing, err]);

    const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const a = ref.current; if (!a || !dur) return;
        const r = e.currentTarget.getBoundingClientRect();
        a.currentTime = ((e.clientX - r.left) / r.width) * dur;
    }, [dur]);

    return (
        <div style={{ background: D.surface2, border:`1px solid ${D.border}`, borderRadius:"8px", padding:"14px 16px" }}>
            {err ? (
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px", color: D.muted, padding:"12px 0" }}>
                    Audio file not yet uploaded — place MP3 at <span style={{color:D.accent}}>/public/audio/{src.split("/").pop()}</span>
                </div>
            ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
                    {/* progress */}
                    <div onClick={seek} style={{ position:"relative", height:"4px", background: D.surface3, borderRadius:"2px", cursor:"pointer" }}>
                        <div style={{ position:"absolute", left:0, top:0, height:"100%", width:`${pct}%`, background: D.accent, borderRadius:"2px", transition:"width 0.1s" }} />
                    </div>
                    {/* controls */}
                    <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                        <button onClick={toggle} style={{
                            width:"36px", height:"36px", borderRadius:"50%",
                            border:`1px solid ${D.accBorder}`, background: D.accDim,
                            display:"flex", alignItems:"center", justifyContent:"center",
                            cursor:"pointer", flexShrink:0, transition:"all 0.15s",
                        }}>
                            {playing
                                ? <Pause style={{ width:"14px", height:"14px", color: D.accent }} />
                                : <Play  style={{ width:"14px", height:"14px", color: D.accent, marginLeft:"2px" }} />}
                        </button>
                        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color: D.muted }}>
                            {fmtTime(cur)} / {fmtTime(dur)}
                        </span>
                    </div>
                </div>
            )}
            <audio ref={ref} src={src}
                onTimeUpdate={() => setCur(ref.current?.currentTime ?? 0)}
                onLoadedMetadata={() => setDur(ref.current?.duration ?? 0)}
                onEnded={() => setPlaying(false)}
                onError={() => setErr(true)}
                preload="metadata"
            />
        </div>
    );
}

// ─── Modal (exact dashboard.html modal structure) ─────────────────────────────
const MODAL_TABS = ["Summary", "Transcript", "Recording"] as const;
type MTab = typeof MODAL_TABS[number];

function CallModal({ call, onClose }: { call: CallRecord; onClose: () => void }) {
    const [tab, setTab] = useState<MTab>("Summary");

    useEffect(() => {
        const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", fn);
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", fn);
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [onClose]);

    // info-grid items — mirrors what the dashboard JS populates
    const info = [
        { label:"Caller",    value: call.caller_name + (call.caller_id ? ` (${call.caller_id})` : "") },
        { label:"Duration",  value: fmtDuration(call.duration_seconds) },
        { label:"Started",   value: call.started_at },
        { label:"End Reason",value: call.end_reason.replace(/_/g," ") },
        ...(call.transferred_to ? [
            { label:"Transfer To", value: call.transferred_to },
            { label:"Extension",   value: call.transferred_ext ?? "—" },
            { label:"Department",  value: call.transfer_dept ?? "—" },
        ] : []),
        { label:"Intent",    value: call.ai_intent },
    ];

    return (
        // modal-bg
        <div
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            style={{
                position:"fixed", inset:0,
                background:"rgba(0,0,0,0.72)",
                zIndex:200,
                display:"flex", alignItems:"center", justifyContent:"center",
                backdropFilter:"blur(3px)",
                padding:"16px",
            }}
        >
            {/* modal */}
            <motion.div
                initial={{ opacity:0, y:12 }}
                animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:12 }}
                transition={{ duration:0.2 }}
                style={{
                    background: D.surface,
                    border:`1px solid ${D.border2}`,
                    borderRadius:"14px",
                    width:"min(680px,95vw)",
                    maxHeight:"90vh",
                    display:"flex", flexDirection:"column",
                    overflow:"hidden",
                }}
            >
                {/* modal-header */}
                <div style={{
                    padding:"20px 24px",
                    borderBottom:`1px solid ${D.border}`,
                    display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"16px",
                    flexShrink:0,
                }}>
                    <div>
                        <div style={{ fontFamily:"'Fraunces',serif", fontSize:"18px", fontWeight:600, color: D.text }}>
                            {call.caller_name}{call.caller_id ? ` (${call.caller_id})` : ""}
                        </div>
                        <div style={{ fontSize:"11px", color: D.muted, marginTop:"3px", fontFamily:"'DM Mono',monospace" }}>
                            {call.call_id} · {call.started_at} · {fmtDuration(call.duration_seconds)}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: D.surface3, border:`1px solid ${D.border}`, borderRadius:"8px",
                            color: D.muted, cursor:"pointer", padding:"6px 10px", fontSize:"13px",
                            flexShrink:0, fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s",
                        }}
                        onMouseEnter={e => { (e.target as HTMLButtonElement).style.color = D.text; }}
                        onMouseLeave={e => { (e.target as HTMLButtonElement).style.color = D.muted; }}
                    >
                        ✕ Close
                    </button>
                </div>

                {/* modal-body */}
                <div style={{ padding:"20px 24px", overflowY:"auto", flex:1 }}>
                    {/* modal-tabs */}
                    <div style={{ display:"flex", gap:"2px", marginBottom:"18px" }}>
                        {MODAL_TABS.map(t => (
                            <button key={t} onClick={() => setTab(t)} style={{
                                padding:"7px 14px", borderRadius:"8px",
                                fontSize:"12px", fontFamily:"'DM Mono',monospace",
                                cursor:"pointer",
                                color:      tab === t ? D.accent : D.muted,
                                background: tab === t ? D.accDim : "none",
                                border:     tab === t ? `1px solid ${D.accBorder}` : "1px solid transparent",
                                transition:"all 0.15s",
                            }}>
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* Tab content — Summary */}
                    {tab === "Summary" && (
                        <div>
                            {/* ai-block */}
                            <div style={{
                                background: D.surface2, border:`1px solid ${D.border}`,
                                borderLeft:`3px solid ${D.accent}`, borderRadius:"8px",
                                padding:"14px 16px", marginBottom:"16px",
                            }}>
                                <div style={{ fontSize:"10px", fontFamily:"'DM Mono',monospace", color: D.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"6px" }}>
                                    AI summary
                                </div>
                                <div style={{ fontSize:"13.5px", lineHeight:"1.65", color: D.text }}>
                                    {call.ai_summary}
                                </div>
                            </div>

                            {/* Badges */}
                            <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"16px" }}>
                                <DispoPill d={call.disposition} />
                                <SentBadge s={call.ai_sentiment} />
                            </div>

                            {/* info-grid */}
                            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
                                {info.map(({ label, value }) => (
                                    <div key={label} style={{
                                        background: D.surface2, border:`1px solid ${D.border}`,
                                        borderRadius:"8px", padding:"12px 14px",
                                    }}>
                                        <div style={{ fontSize:"10px", fontFamily:"'DM Mono',monospace", color: D.muted, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"4px" }}>
                                            {label}
                                        </div>
                                        <div style={{ fontSize:"14px", color: D.text, textTransform:"capitalize" }}>
                                            {value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tab content — Transcript */}
                    {tab === "Transcript" && (
                        <div>
                            {/* transcript-wrap */}
                            <div style={{
                                background: D.surface2, border:`1px solid ${D.border}`,
                                borderRadius:"8px", padding:"16px",
                                maxHeight:"380px", overflowY:"auto",
                                fontFamily:"'DM Mono',monospace", fontSize:"12.5px", lineHeight:"1.75",
                            }}>
                                {/* file header */}
                                <div style={{ color: D.faint, marginBottom:"12px", paddingBottom:"10px", borderBottom:`1px solid ${D.border}`, fontSize:"11px" }}>
                                    <div>Call ID : {call.call_id}</div>
                                    <div>Caller  : {call.caller_name}{call.caller_id ? ` (${call.caller_id})` : ""}</div>
                                    <div>Started : {call.started_at}</div>
                                    <div>{"=".repeat(48)}</div>
                                </div>

                                {call.transcript.map((line, i) => (
                                    <div key={i} style={{ display:"flex", gap:"10px", marginBottom:"4px" }}>
                                        {/* t-time */}
                                        <span style={{ color: D.muted, flexShrink:0 }}>[{line.time}]</span>
                                        <div>
                                            <span style={{
                                                color: line.role === "Agent" ? D.accent
                                                    : line.role === "User"  ? D.neutral
                                                    : D.faint,
                                                fontStyle: line.role === "System" ? "italic" : "normal",
                                                marginRight:"4px", fontWeight:500,
                                            }}>{line.role}:</span>
                                            <span style={{
                                                color: line.role === "Agent" ? D.accent
                                                    : line.role === "User"  ? D.neutral
                                                    : D.faint,
                                                fontStyle: line.role === "System" ? "italic" : "normal",
                                            }}>{line.text}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tab content — Recording */}
                    {tab === "Recording" && (
                        <div>
                            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color: D.muted, marginBottom:"10px" }}>
                                {call.call_id}.wav · {fmtDuration(call.duration_seconds)}
                            </div>
                            <AudioPlayer src={call.audio_src} />
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

// ─── Call data loaded from src/data/calls-data.json ─────────────────────────
// To update: edit that file directly, or run scripts/export_calls.py
const CALLS = rawCalls as CallRecord[];

// ─── Main section ─────────────────────────────────────────────────────────────
export default function CallShowcase() {
    const [open, setOpen] = useState<CallRecord | null>(null);

    return (
        <>
            {/* Modal */}
            <AnimatePresence>
                {open && <CallModal call={open} onClose={() => setOpen(null)} />}
            </AnimatePresence>

            <section className="pb-28 relative z-10 w-full bg-background">
                <div className="max-w-7xl mx-auto px-4 md:px-8">

                    {/* Section header */}
                    <motion.div
                        initial={{ opacity:0, y:20 }}
                        whileInView={{ opacity:1, y:0 }}
                        viewport={{ once:true }}
                        className="mb-10"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-px w-12 bg-accent/40" />
                            <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase font-mono">
                                System Output
                            </p>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-serif text-foreground leading-tight">
                            Live <span className="text-accent italic">Calls</span>
                        </h3>
                        <p className="text-muted text-base mt-3 max-w-xl">
                            Three real interactions handled by the agent — click any row to see the recording, transcript, and AI post-call analysis.
                        </p>
                    </motion.div>

                    {/* table-wrap — dashboard.html exact structure */}
                    <motion.div
                        initial={{ opacity:0, y:20 }}
                        whileInView={{ opacity:1, y:0 }}
                        viewport={{ once:true }}
                        transition={{ delay:0.1 }}
                        style={{
                            background: D.surface,
                            border:`1px solid ${D.border}`,
                            borderRadius:"14px",
                            overflow:"hidden",
                        }}
                    >
                        <table style={{ width:"100%", borderCollapse:"collapse" }}>
                            <thead style={{ borderBottom:`1px solid ${D.border}` }}>
                                <tr>
                                    {["Time","Caller","Duration","Caller Sentiment","Disposition","Handle Time","Files"].map(h => (
                                        <th key={h} style={{
                                            textAlign:"left", padding:"12px 16px",
                                            fontSize:"11px", fontFamily:"'DM Mono',monospace",
                                            color: D.muted, textTransform:"uppercase",
                                            letterSpacing:"0.06em", fontWeight:400, whiteSpace:"nowrap",
                                        }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {CALLS.map((call, i) => (
                                    <motion.tr
                                        key={call.call_id}
                                        initial={{ opacity:0, x:-8 }}
                                        whileInView={{ opacity:1, x:0 }}
                                        viewport={{ once:true }}
                                        transition={{ delay: i * 0.06 }}
                                        onClick={() => setOpen(call)}
                                        style={{
                                            borderBottom: i < CALLS.length - 1 ? `1px solid ${D.border}` : "none",
                                            cursor:"pointer",
                                            transition:"background 0.1s",
                                        }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = D.surface2; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
                                    >
                                        {/* Time */}
                                        <td style={{ padding:"13px 16px", fontSize:"13px", color: D.text, verticalAlign:"middle" }}>
                                            <div style={{ fontWeight:500 }}>{timeOnly(call.started_at)}</div>
                                            <div style={{ fontSize:"11px", color: D.muted, fontFamily:"'DM Mono',monospace", marginTop:"2px" }}>
                                                {dateOnly(call.started_at)}
                                            </div>
                                        </td>
                                        {/* Caller */}
                                        <td style={{ padding:"13px 16px", fontSize:"13px", color: D.text, verticalAlign:"middle" }}>
                                            <div style={{ fontWeight:500 }}>{call.caller_name}</div>
                                            {call.caller_id && (
                                                <div style={{ fontSize:"11px", color: D.muted, fontFamily:"'DM Mono',monospace", marginTop:"2px" }}>
                                                    {call.caller_id}
                                                </div>
                                            )}
                                        </td>
                                        {/* Duration */}
                                        <td style={{ padding:"13px 16px", fontSize:"13px", color: D.muted, verticalAlign:"middle", fontFamily:"'DM Mono',monospace" }}>
                                            {fmtDuration(call.duration_seconds)}
                                        </td>
                                        {/* Sentiment */}
                                        <td style={{ padding:"13px 16px", verticalAlign:"middle" }}>
                                            <SentBadge s={call.ai_sentiment} />
                                        </td>
                                        {/* Disposition */}
                                        <td style={{ padding:"13px 16px", verticalAlign:"middle" }}>
                                            <DispoPill d={call.disposition} />
                                        </td>
                                        {/* Handle Time */}
                                        <td style={{ padding:"13px 16px", fontSize:"13px", color: D.muted, verticalAlign:"middle", fontFamily:"'DM Mono',monospace" }}>
                                            {fmtDuration(call.duration_seconds)}
                                        </td>
                                        {/* Files */}
                                        <td style={{ padding:"13px 16px", verticalAlign:"middle" }}>
                                            <div style={{ display:"flex", gap:"6px" }}>
                                                {["▶ wav","≡ txt"].map(f => (
                                                    <span key={f} style={{
                                                        padding:"3px 8px", borderRadius:"6px",
                                                        fontSize:"11px", fontFamily:"'DM Mono',monospace",
                                                        background: D.surface3, color: D.muted,
                                                        border:`1px solid ${D.border}`,
                                                    }}>{f}</span>
                                                ))}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>

                </div>
            </section>
        </>
    );
}
