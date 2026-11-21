# MRCD Interactive — Project Brief

Snapshot of the living Claude Doc ([MRCD Interactive — Project Brief](https://claude.ai/artifact/FqVnvcQm773VW29H8eWvkw)), 21 November 2026.

MRCD Interactive is an everyday walk in which hidden reminders of farmed animals surface, people respond in the moment, and at the end they see the trail of mechanisms their mind used. It exists to test one hypothesis: that seeing your own meat-related cognitive dissonance at work changes how you process it.

## Where we are (21 November 2026)

Phases 1–4 (review, intention, parameters, this brief) are done. The project is now in visual exploration, alongside a working text prototype. Status and next steps are kept current in [`../README.md`](../README.md).

## Intention

**Hypothesis.** Meat-related cognitive dissonance (MRCD) works because it goes unnoticed (Rothgerber, 2020). If people can see their own prevention and reduction mechanisms operating, that metacognitive view may prompt them to process the dissonance differently, towards the harm itself rather than away from it.

**Who it is for.** People who eat animals, at the pre-contemplative or contemplative stage of the transtheoretical model of behaviour change.

- *Pre-contemplative:* prevention usually holds, so triggers may not land. "Nothing much happened" is a valid and visible outcome, because it is the finding.
- *Contemplative:* the dissonance is already active, so expect more reduction mechanisms, including "I know, but…".

**What makes it MRCD, not a generic quiz.**

- Invisibility is the setting: the default state is quiet, and triggers sit at the edge of an ordinary day.
- Rothgerber's mechanisms are what get caught, in the person's own responses rather than as labels handed to them.
- Several mechanisms can co-occur in one person. Mapping those combinations is the novel contribution.
- Awareness used as a justification ("I know I'm rationalising, and that's fine") is itself a mechanism, because it leaves the harm unaddressed.
- It respects the paper's warning that triggering MRCD can backfire into stronger justification, so intensity is graded and a debrief is built in.

**Evidence-based throughout.** Every encounter, response option, mechanism mapping and line of feedback must point to the literature, starting with Rothgerber (2020) and the studies it cites. Each item in the garden file carries its citation. Three levels of evidence are kept distinct:

- *Established:* the trigger or mechanism is shown in empirical studies (for example, wilful ignorance in 27–28% of people; do-gooder derogation).
- *Proposed:* part of Rothgerber's framework but flagged by him as speculative (for example, which individual differences predict which mechanism).
- *Our coding:* the judgement that a particular response option indicates a particular mechanism. This is checked by expert review and the pilot, not claimed as established.

**Framing.** Participants are told this is about how we think: cognitive dissonance and the unexamined reactions we may not recognise in ourselves. Meat-related cognitive dissonance is the model the walk uses, and the wider aim is to understand metacognition more generally.

## The experience

The person goes for an ordinary walk. Most of it is uneventful, and reminders of farmed animals appear in the landscape, at first at the edges and later closer.

1. **Walk.** A street, a café, a field. Nothing asks anything of them. This is prevention holding.
2. **Encounter.** Something surfaces: a long windowless shed in the distance, a truck with slatted sides, a vegan "Ask Me Anything" table, a menu, a conversation. Intensity rises from distant hints to explicit depictions of harm, for example a pig shoved back onto a stock truck at a petrol station while a dog is fussed over at the next pump. Encounters cover Rothgerber's five trigger types: information exposure, reminders of an animal's origin, admitting you eat meat, admitting the animal was harmed, and the presence of vegetarians or vegans.
3. **Word clouds.** Words float up and the person clicks the ones that match their reaction. Each pick shapes the next round of words, narrowing towards the thought behind the reaction without ever naming a mechanism. Several picks are allowed, so co-occurring mechanisms show up naturally. Walking on, or not looking, is also recorded.
4. **Light prompt (optional).** A short, neutral nudge to notice the moment ("What went through your head?"). The mechanism is not named here.
5. **Repeat.** The walk continues through about 6–8 encounters.
6. **Your path on the full map.** The ending shows the whole MRCD model (Rothgerber's Figure 1: triggers, prevention, arousal, reduction and outcomes) as a base layer, with the person's path drawn on top. Mechanisms they used are marked along their path. Those not triggered stay visible, so it is clear there is more to MRCD than their own experience.
7. **Reflect.** For each encounter they see three things together: what they met, how they responded, and the name of the mechanism. They reflect on that combination. This is also the main evidence of whether metacognition happened.
8. **Debrief.** Short and accessible: what cognitive dissonance is, and how reactions in the moment are often unexamined and may not reflect our values and ethics.
9. **Take-home package.** A download with their path, every mechanism (triggered and not), plain-language explanations and the literature behind each. Framed as education, not judgement.

**Naming happens at the end, not during the walk.** Naming a mechanism before it fires would stop it firing, or prompt performance and defensiveness.

**The structured garden.** The walk is one authored map of encounters, possible responses and the mechanism each response points to. Every format, from text to VR, is a different way through the same garden, so the content and path data carry forward between stages.

**Every mechanism gets a chance.** Across the encounters, each mechanism in the model is offered by at least one response option. "Not triggered" then means the person had the chance and did not use it, not that the walk never offered it.

## Parameters for v1

Version 1 is a text walk (Stage 0), followed by an illustrated web walk (Stage 1) piloted with 5–6 people the project owner knows.

| Area | Decision |
| --- | --- |
| Length | One walk, about 10–15 minutes |
| Scope | Food-related encounters only in v1, where Rothgerber's evidence sits |
| Focal animal | Pigs throughout v1, which keeps cognitive load low. Later versions focused on chickens, fish or cows allow a species comparison |
| Setting | One standard walk in v1. Later, people choose a setting (town, countryside and so on): same encounters, different scenery |
| Visual mode | Walkers choose at the start between an illustrated version and a photographic or photorealistic one. The choice is recorded as a preference and not interpreted |
| Encounters | 8 core encounters plus 5 alternates, all kept for testing; all five trigger types covered; intensity rising to explicit depictions of harm (see `encounters.md`) |
| Responses | Word clouds: 2–3 rounds per encounter, each pick shaping the next set of words, several picks allowed, neutral words and "none of these" in every round, plus an optional "something else…" box that is logged but not interpreted. "What do you say?" when another person is present; "What goes through your head?" when alone |
| Coverage | Every mechanism in the model is offered by at least one word |
| Evidence | Every encounter, word and mechanism mapping carries a citation and an evidence level (established, proposed or our coding) |
| Naming | Only at the end; light neutral prompts during the walk |
| Ending | The full MRCD model with the person's path layered on top, reflection on each encounter with its name, a short debrief, and a downloadable take-home package |
| Metacognition feedback | Responses to seeing their own map, reflecting on encounter, response and name together |
| Garden file | One human-readable file (`prototype/garden.json`) holding encounters, word sets, mechanism mappings and citations, editable without touching code |
| Data | Path log (including every word picked, in order) collected at the end by copying it; no server, no accounts |
| Stage 0 format | A single web page reading a separate garden file, chosen over Twine because the word clouds need custom interaction. Encounters 1–3 built as a first prototype |
| Stage 1 format | Static web page run locally or on GitHub Pages; illustrated and photographic scenes |
| Tools | Inkscape, VS Code, plain HTML/CSS/JS; all free and open source |
| Sessions | Facilitated in person or on a call, with a short consent note, a content warning, the option to stop at any time, and a debrief |
| Validated scales | Not in v1. In later stages, most likely after the walk |
| "Done" for v1 | Someone can go from entering the walk to seeing their path on the full map, reflecting and giving feedback; run with 5–6 people |

## Non-goals for v1

These are deliberately left out of v1, not ruled out for good.

- No encounters outside food, and no focal animal other than pigs.
- No agent and no interpretation of free text.
- No validated scales.
- No analytics or data server.
- No 3D or VR.
- No choice of setting: one standard walk.
- No persona labels ("You are…") and no percentage scores.
- No demographic predictions shown to participants.
- No polish beyond "works on a laptop".

## Visual direction hypothesis

First hypothesis: **a quiet, everyday walk in which the animals are drawn exactly as invisibly as society keeps them, and the ending is a map of the walk you just took.** This is a starting point to test, not a decision.

**Principles to test**

1. **One continuous place.** The walk is a single landscape the person moves through, not a series of screens. Every encounter belongs to the same world, which gives the connective tissue earlier attempts lacked.
2. **The design does not point, at first.** Early sheds, trucks and packaging are drawn in the same muted ink as everything else, with no glow, red or highlight. Noticing them is up to the walker, as it is in life. As intensity rises, encounters come closer and become explicit, but the drawing never switches into shock imagery or alarm colours. Walkers choose at the start between an illustrated and a photographic version.
3. **Looking is the interaction.** An encounter sits at the edge. The person can turn towards it or keep walking, which makes avoidance a physical choice rather than an answer option.
4. **Calm and trustworthy.** It is a research instrument, so it must feel honest and non-manipulative: restrained palette, generous space, plain humane typography.
5. **The map under the walk.** The ending reveals the full MRCD model as a base layer, with the person's path drawn on top. Mechanisms they used are marked; the rest stay visible but quiet. A hypothesis to test: draw the model itself as terrain, so the walk and the map become the same picture seen from above.
6. **One voice.** The text is a grounded inner voice, never a diagnostic system voice.

**It must not feel like:** a dark neural network or glowing circuit; a red alarm; a shock campaign; a gamified score or personality quiz; a clinical survey form; or cute cartoon animals.

**Possible references to explore** (to test, not copy): quiet walking games such as *A Short Hike*; everyday-vignette games such as *Florence*; the ordinary-but-uneasy stillness of Edward Hopper; and wordless illustrated storytelling such as Shaun Tan's *The Arrival*.

**How we'll know it works:** pilot participants say they felt *walked*, not *quizzed*, and recognise their path on the map as their own.

**Since then:** three generated style tiles (survey map, two-colour print, transit line) were not taken forward. The owner wants something more pared back that shows the wandering and the connections. Round 1 base-map sketches follow the owner's reference images: one ink, a wandering line, open circles for places, small pictograms, and branching and joining paths.

## Development path

Each stage is justified by the question it answers, and every stage walks through the same garden. v1 is Stages 0 and 1.

1. **Stage 0 · Text walk.** Is the garden right? Do the triggers land? (Built as a web page rather than Twine.)
2. **Stage 1 · Illustrated web walk.** Does it feel walked, not quizzed?
   - **Stage 1b · Photographic mode** (walker's choice). Does realism help, or feel manipulative?
3. **Pilot with 5–6 people.** Go on when people felt walked, not quizzed, and recognised their path on the map as their own.
4. After the pilot, the next unknown decides the next stage:
   - **Stage 2 · Agent walk (free text)** if it is language: can free answers be placed reliably?
   - **Stage 3 · Desktop 3D walk (Unity)** if it is embodiment: do people physically look away?
     - **Stage 4 · VR walk (Unity XR):** presence and gaze, in person only.

## Open questions

- [ ] Write word sets tailored to each encounter, grounded in literature on how people respond to that particular trigger (encounters 1–3 drafted; see `prototype/garden.json`).
- [ ] Visual mode: build both versions for every encounter, or only for the most intense ones?
- [ ] How is the full model drawn so a person's path and co-occurring mechanisms read at a glance without becoming a score?
- [ ] Which feedback questions, built around reflecting on encounter, response and name together, best show whether metacognition happened?
- [ ] How much is disclosed up front, given the broad "how we think" framing?
- [ ] What goes in the take-home package, and in what format?
- [ ] Later stages: a comparison group that sees no map, validated scales after the walk, and walks focused on other species (chickens, fish, cows).
- [ ] **Parked idea: a recall walk.** Instead of simulated encounters, people remember a real everyday moment they moved past without recognising it, such as driving behind a pig truck, and that memory is the trigger. How does a real, recalled encounter differ from the simulated walk? A possible comparison condition later.

## Process log

Notes on the repeatable process for LLM-assisted visual design, one row per phase.

| Phase | What worked | Friction |
| --- | --- | --- |
| 1. Review previous attempts | Reading all history before summarising; the pattern (visuals named, never designed) only showed across all three | PDF chat exports cut off the user's own replies |
| 2. Brainstorm intention | Conversational, voice-style answers; reading the primary source first; ending each round with a short "here's what I heard" summary | Early framing leaned towards an art piece until the research aim surfaced |
| 3. Define parameters | Listing formats by the question each one tests, not by technology | None significant; decisions came quickly once options were concrete |
| 4. Brief | One living reference document with the visual direction stated as a hypothesis to test | — |
| 4b. Brief review | Reading a written brief surfaced requirements the conversation had not: evidence levels, the full-model map, response paths, the take-home package | Answers to open questions arrive in chat and must be carried into the doc; the doc stays the single source |
| 5. Prototype and style tiles | A working prototype surfaced content problems within one walk-through; the style tiles made clear what the visual direction is not | Generated visual directions land on familiar genres (survey map, risograph, transit map). The aesthetic should start by hand; Claude then systematises it and builds it in |
| 6. Reference-led sketching | Reference images plus a few words gave a far clearer direction than generated tiles; rendering and checking sketches before showing them caught overlapping labels | tldraw returned nothing to Claude (no confirmation or view), so sketching moved to SVG |

**Rules to keep:** read the source before the summaries; ask who and why before how it looks; end every phase with a short summary to push against; justify each build stage by the question it answers; state visual directions as hypotheses; for visual work, start from the owner's references and sketch rough options before refining.
