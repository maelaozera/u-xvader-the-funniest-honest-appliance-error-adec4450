// Funniest Honest Appliance Error — u-xvader entry
// u-xvader-the-funniest-honest-appliance-error-adec4450
//
// Produces one line of at most 200 characters: the most honest error
// a household appliance could ever display. Plain Node 22+, no
// third-party packages.
//
// How it fits together: assembleEntryLine() stitches the wording
// together from short labelled fragments, runAllChecks() enforces
// the one-line length rules, and saveEntry() writes the result.
// main() simply runs those stages in order.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// --- Wording ------------------------------------------------------------
// A washing machine that tried its best, gave up pretending, and
// finally points the finger where it belongs. Splitting the joke
// into labelled fragments keeps the exact wording easy to spot and
// tweak without rewiring how the line is put together.
const APPLIANCE_ERROR_CODE = "Error E04";
const WASH_ATTEMPT = "I washed these socks four times.";
const STILL_DIRTY_NOTE = "They are still dirty.";
const BLAME_LINE = "The problem is the socks. Or you.";

/** Glue sentence fragments together with single spaces. */
function joinFragments(fragments: string[]): string {
  return fragments.join(" ");
}

// --- Output -------------------------------------------------------------
// The sandbox exposes its output folder at /output. Setting the
// ENTRY_OUTPUT environment variable points the file elsewhere,
// which is handy when checking the entry locally.
const DEFAULT_OUTPUT_PATH = "/output/entry.txt";

// --- Limits -------------------------------------------------------------
// The competition wants a single line of 1-200 characters. Length
// is counted in Unicode code points (spreading the string first),
// so characters outside the basic plane count once, as a reader
// would count them, rather than as two UTF-16 units.
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

/** Count how long a string is in Unicode code points. */
function measureLength(text: string): number {
  return [...text].length;
}

/** Assemble the fragments into the single line to be submitted. */
function assembleEntryLine(): string {
  const fragments = [
    `${APPLIANCE_ERROR_CODE}:`,
    WASH_ATTEMPT,
    STILL_DIRTY_NOTE,
    BLAME_LINE,
  ];
  return joinFragments(fragments);
}

/** Reject the entry unless its length sits inside 1-200 characters. */
function checkLength(text: string): void {
  const length = measureLength(text);
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(`entry must be 1-200 characters, got ${length}`);
  }
}

/** Reject the entry if it is empty or contains only whitespace. */
function checkNotBlank(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

/** Reject the entry if it contains a line break. A newline would
 * violate the single-line rule even if the character count fits. */
function checkOneLine(text: string): void {
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

/** Apply every check above to the finished entry line. */
function runAllChecks(text: string): void {
  checkLength(text);
  checkNotBlank(text);
  checkOneLine(text);
}

/** Work out where the entry file should be saved. */
function pickOutputPath(): string {
  return process.env.ENTRY_OUTPUT ?? DEFAULT_OUTPUT_PATH;
}

/** Make the output folder if it is missing, then save the line. */
function saveEntry(text: string, outputPath: string): void {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, text, "utf8");
}

/** Assemble, check, and save the entry, then report the result. */
function main(): void {
  const entry = assembleEntryLine();
  runAllChecks(entry);
  const outputPath = pickOutputPath();
  saveEntry(entry, outputPath);
  console.log(`wrote ${measureLength(entry)} characters to ${outputPath}`);
}

main();
