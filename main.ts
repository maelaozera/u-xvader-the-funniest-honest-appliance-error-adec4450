// The Funniest Honest Appliance Error
// u-xvader-the-funniest-honest-appliance-error-adec4450
//
// Writes a single line (at most 200 characters): the funniest honest
// error message an appliance could show. No dependencies, Node 22+.
//
// Structure: the entry text is assembled from named parts by
// buildEntry(), checked by a small validation pipeline
// (validateLength / assertNonBlank / assertSingleLine), and finally
// persisted by writeEntry(). main() wires the stages together so
// each step can be read — and tested — on its own.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// --- Entry text ---------------------------------------------------------
// The entry: a washing machine that has done its honest best and
// finally tells the truth about whose fault the dirty socks are.
// Kept as separate sentence fragments so the wording stays visible
// and editable without touching the assembly logic below.
const ERROR_CODE = "Error E04";
const FIRST_CONFESSION = "I washed these socks four times.";
const SECOND_CONFESSION = "They are still dirty.";
const PUNCHLINE = "The problem is the socks. Or you.";

// --- Limits -------------------------------------------------------------
// Competition rule: one line, 1-200 characters. Counted in Unicode
// code points (spread into an array) so multi-byte characters are
// measured the way a reader sees them, not in UTF-16 units.
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

// --- Output -------------------------------------------------------------
// The sandbox mounts the output directory at /output. An explicit
// ENTRY_OUTPUT path (used for local checks) overrides the default.
const DEFAULT_OUTPUT_PATH = "/output/entry.txt";

/** Join the entry fragments into the single line that gets submitted. */
function buildEntry(): string {
  const parts = [ERROR_CODE + ":", FIRST_CONFESSION, SECOND_CONFESSION, PUNCHLINE];
  return parts.join(" ");
}

/** Measure a string in Unicode code points. */
function countChars(text: string): number {
  return [...text].length;
}

/** Fail unless the entry length is inside the allowed 1-200 window. */
function validateLength(text: string): void {
  const length = countChars(text);
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(`entry must be 1-200 characters, got ${length}`);
  }
}

/** Fail if the entry is empty or only whitespace. */
function assertNonBlank(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

/** Fail if the entry spans more than one line. Newlines would break
 * the single-line rule even when the character count still fits. */
function assertSingleLine(text: string): void {
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

/** Run every validation rule on the finished entry line. */
function validateLine(text: string): void {
  validateLength(text);
  assertNonBlank(text);
  assertSingleLine(text);
}

/** Resolve where the entry file should be written. */
function resolveOutputPath(): string {
  return process.env.ENTRY_OUTPUT ?? DEFAULT_OUTPUT_PATH;
}

/** Create the output directory if needed and write the entry line. */
function writeEntry(text: string, outputPath: string): void {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, text, "utf8");
}

/** Build, validate, and write the entry, then report what happened. */
function main(): void {
  const entry = buildEntry();
  validateLine(entry);
  const outputPath = resolveOutputPath();
  writeEntry(entry, outputPath);
  console.log(`wrote ${countChars(entry)} characters to ${outputPath}`);
}

main();
