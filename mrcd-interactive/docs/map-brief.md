# Map brief

Snapshot of the Map brief tab of the living Claude Doc, 21 November 2026.

The map at the end of the walk is the whole of Rothgerber's model drawn as a place, with the walker's own route wandering across it. It should be pared back: the wandering and the connections, and nothing more.

## What it must show

1. **All of the model:** 5 triggers, 6 prevention mechanisms, discomfort, 8 reduction mechanisms in 3 groups (about the animal, about the meat, about responsibility) and 2 outcomes. Our 2 additions (awareness as justification, meat attachment) sit apart.
2. **The walk's stops:** home, the high street, the Smokehouse and the market.
3. **The walker's route,** in the order things happened, as a wandering line rather than a straight one.
4. **Connections:** which mechanisms showed up together at the same stop.
5. **Three states for every mark:** used, possible on this walk but not used, and not on this walk. The states differ by more than colour (for example filled, outlined, dashed).
6. **Where defences held:** stops where nothing stirred.

## What it should feel like

- Pared back, minimal and quiet. It shows the wandering and the connections, without superfluous detail.
- Not a transit map, not a detailed illustrated town, not a neural network; no alarm colours and no scores.
- Starting points, not styles to copy: Guy Debord, *The Naked City* (1957); Richard Long, *A Line Made by Walking* (1967).

## The owner's reference images (round 1)

Not committed (other people's images); described here so the direction is kept.

1. A vertical dotted path that wanders between outlined map pins, with the odd red dot along it.
2. A single smooth black curve labelled "Route 07", with open circles for stops, one filled in orange, ending at a pink flag.
3. A one-colour (red) line drawing: one long line looping between two pins, with tiny monoline pictograms (houses, trees, hills, birds, grass) and lots of white space.
4. A flat, colourful trail map: a thick dashed route weaving past woods, over a river by a bridge and round a mountain, with ring waypoints, flags and a chequered finish. The owner's note: "something a bit like this, but with branching and joining paths".

What was taken from them: one ink, a single wandering route, open circles for places, flags at the ends, tiny line pictograms, generous white space, landscape features standing for parts of the model, and paths that branch and join.

## Round 1 sketches

[`../map/base-map-sketches.png`](../map/base-map-sketches.png) shows four layouts of the full model, in black and white, sharing one visual grammar (the walk, paths that come back, paths that leave, mechanism dots, places, discomfort, and two kinds of ending):

1. **Detours at each stop:** small loops beside each place; mechanisms repeat.
2. **One shared map:** every stop feeds into one model; each mechanism appears once; prevention is "the long way round".
3. **The loop:** the walk is a loop home; justifications lead back to it, change leaves it.
4. **A trail through a landscape:** woods (prevention), a river crossed by bridges (discomfort), hills where justification paths branch and join, and a path off to "change".

**Next:** the owner chooses a layout (or a combination); then one walker's journey is drawn on top in a single colour.

## Practical limits

- Drawn as SVG, so it scales from a laptop (about 1,000 px wide) to a phone (about 390 px). On a phone the map can pan or zoom, but labels must still be readable.
- Works on both light and dark backgrounds, or comes as two versions.
- If marks are tappable, each needs a touch area of at least 44 px.

## How the drawing connects to the prototype

As long as these IDs stay on the right objects, the prototype can light up each walker's path on the drawing. Everything else is free: add, move, restyle or redraw.

| ID | What it is | How the prototype uses it |
| --- | --- | --- |
| `mech-<name>`, containing `mech-<name>-mark` and `mech-<name>-label` | Each mechanism, e.g. `mech-avoidance`, `mech-deny-mind` | Applies the used, possible or absent style to the mark |
| `trigger-<name>` | Each trigger, e.g. `trigger-vegans` | Marks the triggers this walk met |
| `stop-<name>` | Each stop: `stop-home`, `stop-high-street`, `stop-smokehouse`, `stop-market` | The route passes through these in walk order |
| `outcome-maintained` | Same, or more, meat | Marked when no behavioural change was picked |
| `style-used`, `style-offered`, `style-absent` | Three sample marks | Their style is copied onto every mark in that state |
| `route-style` | A sample route line | Each walker's route is drawn in this style |
| `link-style` | A sample connection | Drawn between mechanisms that appeared at the same stop |
| `link-<a>--<b>` (optional) | A connection drawn by hand, e.g. `link-avoidance--wilful-ignorance` | Shown when both ends were used |

Mechanism names in IDs use hyphens (`mech-wilful-ignorance`); the prototype's garden file uses underscores (`wilful_ignorance`) and converts between them. Keep labels as text, not paths, so they stay readable and editable. Decoration goes on the Ground layer.

## Starter file

[`../map/mrcd-map-starter.svg`](../map/mrcd-map-starter.svg) contains every part listed above, unstyled and laid out in the model's order. Open it in Inkscape and treat it as a kit of parts.
