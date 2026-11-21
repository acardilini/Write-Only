# tldraw check

The tldraw connector runs Claude's code on the shared canvas but returns nothing: no result, no error, no view. This folder runs the same script in a local copy of tldraw (5.6.0) in headless Chromium and saves a PNG, so every sketch is seen before it is shown.

```bash
cd mrcd-interactive/map/tldraw-check
npm install
npm run build
node render.js ../sketch-05-tldraw.js out.png
```

`render.js` needs Playwright and Chromium (pre-installed in Claude's cloud sessions). The script gets `editor`, `createShapeId` and `toRichText`, as it does in the connector. Fonts are bundled from `@tldraw/assets`, so label widths match the shared canvas.

Scripts sent to the connector use only `frame`, `geo`, `line` and `text` shapes, because the connector's tldraw version is unknown and `draw` shapes changed format in v5.
