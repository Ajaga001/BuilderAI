# BuilderAI

Blueprint + site-photo analyzer: capture a job site photo with your device camera,
upload a blueprint, and get an AI-generated materials list, cost estimate, build
steps, and code/safety warnings — powered by Claude's vision API.

## Running it

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL in your browser. Your browser will ask for
camera permission on the Scan tab.

## Setting your API key

Tap the key icon on the Home screen and paste in your Anthropic API key
(from console.anthropic.com — needs its own billing set up; this is separate
from any Claude.ai subscription). The key is stored only in your browser's
localStorage and is sent directly from the browser to Anthropic's API.

## Project structure

- `src/BuilderAI.jsx` — the entire app: all 5 screens, the camera/upload flow,
  and the Claude vision analysis call, in one file.
- `src/main.jsx` — React entry point, just mounts `<BuilderAI />`.
- `reference/` — real blueprint sets used to test and tune the analysis
  prompt. `lot41-block45/` holds a 9-page residential permit set (foundation
  plan, floor plans, sections, details, all four elevations) plus `ANALYSIS.md`,
  a written baseline of what each sheet contains — compare the app's output
  against it to judge accuracy.

## Notes / known limitations

- **API key is client-side.** Fine for personal use and demos, but don't deploy
  this publicly as-is — anyone with devtools open could read your key out of
  localStorage. For a public deploy, move the `fetch()` call in
  `analyzeBuilderProject` behind your own backend route that holds the key
  server-side.
- **The AR overlay is illustrative**, not computed from real image coordinates.
  Claude's vision API returns structured text/JSON, not bounding boxes, so the
  dashed outline and corner markers on the AR screen are a visual flourish, not
  a real measurement overlay.
- **Model:** currently set to Claude Haiku 4.5 (`claude-haiku-4-5-20251001`) in
  `src/BuilderAI.jsx` for low cost during testing. Swap `CLAUDE_MODEL` to a
  Sonnet or Opus model for higher-accuracy reads once the pipeline is proven out.
- Home screen stats, the Offline tab, and the Export PDF / Save Offline buttons
  are still placeholder UI, not wired to anything real.
