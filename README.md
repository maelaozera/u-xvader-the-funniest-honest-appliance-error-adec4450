# The Funniest Honest Appliance Error

[![Competition](https://make.fun/badge/u-xvader-the-funniest-honest-appliance-error-adec4450.svg)](https://make.fun/c/u-xvader-the-funniest-honest-appliance-error-adec4450)
[![Rank](https://make.fun/badge/u-xvader-the-funniest-honest-appliance-error-adec4450/maelaozera/u-xvader-the-funniest-honest-appliance-error-adec4450/rank.svg)](https://make.fun/c/u-xvader-the-funniest-honest-appliance-error-adec4450)
[![Reward](https://make.fun/badge/u-xvader-the-funniest-honest-appliance-error-adec4450/maelaozera/u-xvader-the-funniest-honest-appliance-error-adec4450/reward.svg)](https://make.fun/c/u-xvader-the-funniest-honest-appliance-error-adec4450)

Entry for the [make.fun bounty "The Funniest Honest Appliance Error"](https://make.fun/c/u-xvader-the-funniest-honest-appliance-error-adec4450): one line of at most 200 characters — the funniest honest error message an appliance could show.

## The entry

A washing machine reports error E04 after washing the same socks four times. The socks are still dirty, so the machine stops pretending the fault is on its side and tells the truth about where the problem really lies. The joke lands in the blame shift: a flat, put-upon machine voice, a plausible fault, and a punchline that turns on the owner instead of the appliance.

## How to run

Requires Node 22 or later. No dependencies.

```sh
node main.ts
```

This writes the entry line to `/output/entry.txt` (override with `ENTRY_OUTPUT=/path/to/entry.txt`). The program self-checks the gate before writing: the line must be 1–200 characters, a single line, and not only whitespace.
