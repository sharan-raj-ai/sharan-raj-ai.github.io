#!/usr/bin/env python3
"""
AIPBX Portfolio Call Exporter
==============================
Queries your SQLite call log, parses transcripts, converts WAV → MP3,
and writes src/data/calls-data.json ready for the portfolio.

Usage:
    # Auto-pick 3 calls (transferred, callback, resolved):
    python3 scripts/export_calls.py

    # Pick specific call IDs:
    python3 scripts/export_calls.py call_20260414_091532_847291 call_20260413_143721_512673 call_20260412_110845_234891
"""

import json
import os
import re
import sqlite3
import subprocess
import sys
from pathlib import Path

# ── CONFIG — edit these paths if needed ──────────────────────────────────────

DB_PATH        = Path("/home/asttecs/Downloads/claudecode/aipbx-latest/data/aipbx_calllog.db")
TRANSCRIPTS_BASE = Path("/home/asttecs/Downloads/claudecode/aipbx-latest")  # transcripts/ relative to here
SITE_ROOT      = Path(__file__).parent.parent                                # sharan-site/
AUDIO_OUT_DIR  = SITE_ROOT / "public" / "audio"
JSON_OUT       = SITE_ROOT / "src" / "data" / "calls-data.json"

# ─────────────────────────────────────────────────────────────────────────────


def parse_transcript(path: str) -> list[dict]:
    """Parse a .txt transcript file into [{time, role, text}] list."""
    p = Path(path) if path.startswith("/") else TRANSCRIPTS_BASE / path
    if not p.exists():
        print(f"  ⚠  Transcript not found: {p}")
        return []
    lines = []
    for raw in p.read_text(encoding="utf-8").splitlines():
        m = re.match(r"\[(\d{2}:\d{2}:\d{2})\] (Agent|User|System): (.+)", raw.strip())
        if m:
            lines.append({"time": m.group(1), "role": m.group(2), "text": m.group(3)})
    return lines


def convert_wav_to_mp3(wav_path: Path, out_path: Path) -> bool:
    """Convert WAV/OGG to MP3 using ffmpeg. Returns True on success."""
    out_path.parent.mkdir(parents=True, exist_ok=True)
    try:
        subprocess.run(
            ["ffmpeg", "-y", "-i", str(wav_path), "-codec:a", "libmp3lame", "-q:a", "4", str(out_path)],
            check=True, capture_output=True,
        )
        return True
    except FileNotFoundError:
        print("  ⚠  ffmpeg not found — skipping audio conversion. Install with: sudo apt install ffmpeg")
    except subprocess.CalledProcessError as e:
        print(f"  ⚠  ffmpeg error: {e.stderr.decode()[:200]}")
    return False


def find_recording(rec_path: str) -> Path | None:
    """Try .wav and .ogg variants; return the first that exists."""
    if not rec_path:
        return None
    p = Path(rec_path)
    for candidate in [p, p.with_suffix(".wav"), p.with_suffix(".ogg")]:
        if candidate.exists():
            return candidate
    return None


def export(call_ids: list[str] | None = None):
    if not DB_PATH.exists():
        sys.exit(f"Database not found: {DB_PATH}")

    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row

    rows: list[sqlite3.Row] = []

    if call_ids:
        placeholders = ",".join("?" * len(call_ids))
        rows = conn.execute(
            f"SELECT * FROM calls WHERE call_id IN ({placeholders})", call_ids
        ).fetchall()
        if len(rows) != len(call_ids):
            found = {r["call_id"] for r in rows}
            missing = [c for c in call_ids if c not in found]
            print(f"⚠  Call IDs not found in DB: {missing}")
    else:
        # Auto-pick one call for each key disposition (best recent with AI data)
        for dispo in ["transferred", "callback", "resolved"]:
            row = conn.execute(
                "SELECT * FROM calls WHERE disposition=? AND ai_summary IS NOT NULL ORDER BY started_at DESC LIMIT 1",
                (dispo,),
            ).fetchone()
            if row:
                rows.append(row)
            else:
                print(f"  ⚠  No '{dispo}' call with AI data found — skipping.")

    conn.close()

    if not rows:
        sys.exit("No calls found. Run with specific call IDs or make sure the DB has calls with ai_summary filled in.")

    AUDIO_OUT_DIR.mkdir(parents=True, exist_ok=True)
    result = []

    for i, row in enumerate(rows[:3], start=1):
        call = dict(row)
        call_id = call["call_id"]
        print(f"\n[{i}/3] {call_id}")

        # ── Transcript ────────────────────────────────────────────────────────
        transcript = []
        trans_path = call.get("transcript_path") or ""
        if trans_path:
            transcript = parse_transcript(trans_path)
            print(f"  ✓  Transcript: {len(transcript)} lines")
        else:
            print("  ⚠  No transcript_path in DB row")

        # ── Audio ─────────────────────────────────────────────────────────────
        audio_src = f"/audio/sample-call-{i}.mp3"
        rec_path = call.get("recording_path") or ""
        wav = find_recording(rec_path)
        if wav:
            mp3_out = AUDIO_OUT_DIR / f"sample-call-{i}.mp3"
            ok = convert_wav_to_mp3(wav, mp3_out)
            if ok:
                print(f"  ✓  Audio: {wav.name} → sample-call-{i}.mp3")
            else:
                print(f"  ⚠  Audio conversion failed — place MP3 manually at public/audio/sample-call-{i}.mp3")
        else:
            print(f"  ⚠  Recording file not found ({rec_path}) — place MP3 manually at public/audio/sample-call-{i}.mp3")

        result.append({
            "call_id":          call_id,
            "caller_name":      call.get("caller_name") or "Unknown",
            "caller_id":        call.get("caller_id"),
            "started_at":       call.get("started_at") or "",
            "duration_seconds": int(call.get("duration_seconds") or 0),
            "ai_sentiment":     call.get("ai_sentiment") or "neutral",
            "disposition":      call.get("disposition") or "resolved",
            "end_reason":       call.get("end_reason") or "caller_done",
            "ai_intent":        call.get("ai_intent") or "",
            "ai_summary":       call.get("ai_summary") or "",
            "transferred_to":   call.get("transferred_to"),
            "transferred_ext":  call.get("transferred_ext"),
            "transfer_dept":    None,   # not stored in DB — add manually if needed
            "audio_src":        audio_src,
            "transcript":       transcript,
        })

    JSON_OUT.parent.mkdir(parents=True, exist_ok=True)
    JSON_OUT.write_text(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\n✅  Wrote {len(result)} calls to {JSON_OUT.relative_to(SITE_ROOT)}")
    print("   Rebuild the site to publish:  npm run build")


if __name__ == "__main__":
    ids = sys.argv[1:] if len(sys.argv) > 1 else None
    export(ids)
