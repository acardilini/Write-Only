# MRCD Interactive

An everyday walk in which hidden reminders of farmed animals surface, people respond in the moment, and at the end they see the trail of mechanisms their mind used. It exists to test one hypothesis: that seeing your own meat-related cognitive dissonance (MRCD) at work changes how you process it. The framework is Rothgerber (2020), *Meat-related cognitive dissonance*, Appetite 146, 104511.

This folder holds the project's documentation and source files. It lives inside the Write-Only repository for now; moving it to its own repository is one of the next steps.

## Where we are (21 November 2026)

Phases 1–4 are done: review of previous attempts, intention, parameters, and a one-page brief. The project is now in **visual exploration**, alongside a working text prototype.

| Item | State | Where |
| --- | --- | --- |
| Project brief, Encounters, Prototype notes, Map brief | Current | Living doc: [MRCD Interactive — Project Brief](https://claude.ai/artifact/FqVnvcQm773VW29H8eWvkw) (four tabs). Copies in [`docs/`](docs/) |
| The Saturday Walk, prototype v0.3 (encounters 1–3 of 8) | Live; walked through twice | [Published prototype](https://claude.ai/artifact/WYb8UcJkaHX2DjDeDjCYsW). Source in [`prototype/`](prototype/) |
| Style tiles: survey map, two-colour print, transit line | Not taken forward: too busy and tied to familiar genres | [Style tiles canvas](https://claude.ai/artifact/LCtW812b6jozPcmrWAG4y3) |
| Map starter kit (Inkscape SVG with named parts) | Ready | [`map/mrcd-map-starter.svg`](map/mrcd-map-starter.svg) |
| Base-map sketches, round 1 | **Waiting for a choice** | [`map/base-map-sketches.png`](map/base-map-sketches.png) and `.svg` |

The claude.ai links are private to the project owner unless shared from each page's Share menu.

### The four base-map sketches (round 1)

All four lay out the full model as a pared-back line map, in black and white, ready for one walker's route to be drawn on top in a single colour.

1. **Detours at each stop:** a simple walk from the vegan stall to the butcher's to lunch, with small loops beside each place for the dissonance it can set off.
2. **One shared map:** every stop feeds into one model; each mechanism appears once.
3. **The loop:** the walk is a loop; justifications lead back to it, change leaves it.
4. **A trail through a landscape:** woods are prevention, crossing the river is discomfort, paths over the hills are justifications that branch and rejoin, and one path leads off to "change".

## Next steps

1. Choose a base-map layout from the four sketches, or a combination.
2. Draw one walker's journey on it in a single colour; keep sketching in tldraw (try a fresh chat) or in SVG.
3. Walk through prototype v0.3 and log notes on the conversational lines, "What do you say?" versus "What goes through your head?", and the look-closer ladder.
4. Draft encounters 4–8 and their word sets, with a literature search per encounter. Pre-approve the PubMed tools so searches don't wait for permission.
5. Plug the chosen map into the prototype's ending, using the starter kit's IDs (see [`docs/map-brief.md`](docs/map-brief.md)).
6. Prepare the pilot with 5–6 people: consent note, content warning, debrief and a trimmed set of feedback questions.
7. Decide where the project lives long term; its own repository is recommended.

## Starting a new chat

A new chat does not remember earlier conversations. Paste this to bring it up to speed:

> We're working on MRCD Interactive. Read `mrcd-interactive/README.md` first, then the docs in `mrcd-interactive/docs/` (the living version is the Claude Doc linked in the README). We're at the "Next steps" list in the README, starting with step 1: choosing a base-map layout from `mrcd-interactive/map/base-map-sketches.png`. Keep the working agreements in the README.

Make sure the new chat runs on this repository and branch (`claude/initial-app-development-011CUparkDNUBpxhhApHXBdQ`), and attach the source PDFs listed below if it needs them.

## Working agreements

- **Phased, with pauses.** Work in clear phases and pause for feedback at the end of each. End each phase with a short "here's what I heard" summary.
- **Process notes.** A meta-goal is a repeatable process for LLM-assisted visual design. Note what worked and what caused friction at each phase (see the Process log in the brief).
- **Evidence-based.** Every encounter, word and mechanism link cites the literature, with an evidence level: established, proposed (flagged as speculative by Rothgerber) or our coding.
- **Tools.** Free, open-source and local-first where possible (Inkscape, Blender, Unity, VS Code). Light MCP servers are fine if they earn their place.
- **Visual direction starts from references.** Generated style tiles drifted towards familiar genres. The loop now is: the owner shares reference images and describes what they want; Claude says back what it is taking from them, sketches 3–4 rough options, checks its own render, then refines one.
- **Words sound like people.** Response options read like real thoughts or speech, not like the framework talking.

## Tool notes

- **tldraw** (connector): in the first session its tools ran but returned nothing to Claude (no confirmation, errors or view of the canvas), so sketches were made in SVG instead. Worth retrying in a fresh chat.
- **PubMed** (connector): used for the literature searches; each search waited a long time for permission until approved.
- **Claude Docs** (connector): the living brief is a Claude Doc; the Markdown in `docs/` is a snapshot.

## Folder map

| Path | What it is |
| --- | --- |
| [`docs/project-brief.md`](docs/project-brief.md) | Intention, experience, parameters, non-goals, visual direction, development path, open questions, process log |
| [`docs/encounters.md`](docs/encounters.md) | The eight encounters plus alternates, coverage of all 15 mechanisms, design notes for the word clouds, sources |
| [`docs/prototype-notes.md`](docs/prototype-notes.md) | Feedback from each prototype walk-through and what changed |
| [`docs/map-brief.md`](docs/map-brief.md) | What the end-of-walk map must show, how it should feel, and the naming rules that connect a drawing to the prototype |
| [`prototype/index.html`](prototype/index.html) | The Saturday Walk page |
| [`prototype/garden.json`](prototype/garden.json) | The "garden file": encounters, word rounds, mechanism links, evidence levels and sources. The current word sets live here |
| [`map/mrcd-map-starter.svg`](map/mrcd-map-starter.svg) | Inkscape starter kit: every mechanism, trigger and stop as a named object |
| [`map/base-map-sketches.svg`](map/base-map-sketches.svg) / `.png` | Round 1 base-map sketches |
| [`map/sketch-generator.py`](map/sketch-generator.py) | Script that draws the sketch sheet: `python3 sketch-generator.py out.svg` |

### Running the prototype locally

The page loads `garden.json`, so it needs a local web server rather than opening the file directly:

```bash
cd mrcd-interactive/prototype
python3 -m http.server 8000
# then open http://localhost:8000
```

## Not in this repository

These are kept by the project owner and are not committed, because they are other people's copyrighted material:

- Rothgerber (2020), *Meat-related cognitive dissonance* (PDF)
- Piazza et al. (2015), *Rationalizing meat consumption. The 4Ns* (PDF; the 4N scale items are in its Table 6)
- Exports of the three earlier Gemini conversations
- Reference images for the map: a dotted path with pins, a "Route 07" curve with a flag, a red line drawing with small pictograms, and a trail map with woods, a river and a bridge
