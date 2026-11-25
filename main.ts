// The 3AM Fridge Text — one line a smart fridge texts its owner at 3am.
// The program writes exactly one line of text to /output/entry.txt.
// The text is a fixed string: no randomness, no clock, no input — every run
// produces byte-identical output.
//
// The line's angle: the fridge as a tired witness with a small opinionated
// voice — it counts the 3am door-openings and calls out the ritual itself,
// not the milk, the ice, or a door left open. Punchline lands on the last
// words ("flirting with my light"), short enough for a lock screen.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "3am. You have opened me four times tonight and eaten nothing. I am not a museum. Pick something, or stop flirting with my light.";

// Runtime validation mirroring the sealed gate: /output/entry.txt must be
// UTF-8 text of 1 to 140 characters, not only white space, on a single line.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 140) {
  throw new Error(`entry is ${chars.length} characters, outside the 1-140 gate`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must stay on one line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only white space");
}

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_PATH = `${OUT_DIR}/entry.txt`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_PATH, ENTRY, "utf8");

// Read back and confirm the file holds exactly the validated text.
const written = readFileSync(OUT_PATH, "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not hold the entry text");
}
