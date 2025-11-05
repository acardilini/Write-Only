2. Product Requirements Document (PRD): Just Write
This document provides the technical requirements for building the "Just Write" writer application, based on the creative brief provided.

2.1. Executive Summary
"Just Write" is a minimalist, distraction-free web application designed to help writers achieve a state of flow by removing the ability to edit. The core feature is a "write-only" text editor where the backspace and delete keys are disabled. The application will be a client-side, single-page application (SPA) hosted on a static platform (e.g., GitHub Pages). All user data will be stored locally in the browser, with an optional export feature to the user's personal Google Drive.

2.2. Problem Statement
Writers often struggle with their "inner critic," leading them to edit and refine their work prematurely. This breaks the creative flow and hinders momentum. Existing writing tools are built for editing and perfection, not for pure, unfiltered creation.

2.3. Goals & Objectives
Primary Goal: Force forward momentum in the writing process to bypass the "inner critic".
Secondary Goal: Help users build a consistent daily writing habit through visual feedback.
User Principle: Ensure 100% user data ownership by storing data locally and providing an easy export mechanism.
Design Principle: Provide a 'calm', minimalist, and distraction-free writing environment.

2.4. Product Requirements****Functional Requirements
'Focus' Space (Editor)
FR 1.1: The application must present a clean, text-focused writing area immediately upon loading.
FR 1.2: The Backspace and Delete keys must be disabled within this text area.
FR 1.3: A single "Finish" button must be present.
FR 1.4: Upon clicking "Finish," the user must be prompted to (optionally) name their writing session.
FR 1.5: The session (text content, optional name, timestamp, time spent, and word count) must be saved to the browser's local storage.
'Reflection' Space (Dashboard & Log)
FR 2.1 (Session Log): The app must display a reverse-chronological, read-only list of all saved writing sessions.
FR 2.2 (Log Metadata): Each entry in the log must display its name (if provided), date, time spent, and word count.
FR 2.3 (Log Viewer): Clicking a log entry must display the full, uneditable text of that session.
FR 2.4 (Stats Dashboard): The dashboard must feature a heatmap calendar showing all days of the year.
FR 2.5 (Heatmap Data): Each day on the calendar must be coloured with an intensity corresponding to the total word count written on that day.
FR 2.6 (Heatmap Tooltip): Hovering over a day on the heatmap must display the exact word count for that day.
Data Portability
FR 3.1: The user must be able to authenticate with their Google Account via an OAuth flow.
FR 3.2: The user must be able to save individual log entries to their personal Google Drive.
FR 3.3 (Optional): The user should be able to export their entire session log as a single file (e.g., JSON or .zip of text files) to Google Drive.

Non-Functional Requirements
NFR 1 (Storage): All application data (session text, logs, metadata) must be stored in the user's browser (e.g., IndexedDB is preferred over localStorage for storing large text). The application must be fully functional offline.
NFR 2 (Hosting): The application must be a static web application, capable of being hosted on platforms like GitHub Pages, Vercel, or Netlify.
NFR 3 (Performance): The application must have a near-instant load time.
NFR 4 (Aesthetics): The UI must be minimalist, typography-first, and use a calm colour palette, adhering to the aesthetic direction.
NFR 5 (Data Ownership): The application must not send any user-generated writing content to any server, except for the explicit Google Drive export action initiated by the user.

2.5. Regulatory & Ethical Considerations
Data Privacy: The primary regulatory concern is data handling.
Action: The UI must clearly and proactively inform the user that their data is stored only in their browser and that clearing their browser cache will result in data loss.
Action: The Google Drive integration must clearly state it is connecting to the user's personal drive, and the app must only request the minimum required scopes (e.g., drive.file) to save files.
Ethical: No significant ethical concerns, as the tool is user-centric and data is user-owned.

2.6. Technical Architecture
System Design: Client-side Single-Page Application (SPA).
Hosting: Static file hosting.
Technology Stack (Recommendation):
Front-End: React, Vue, Svelte, or vanilla JavaScript/HTML/CSS. Given the need for a "coding agent" and a GitHub project, a framework like React (using Create React App or Vite) is a robust choice.
Local Storage: IndexedDB (via a library like idb) to handle potentially large text entries and structured data.
API Integration: Google API Client Library for JavaScript (gapi) for OAuth 2.0 and Google Drive API interaction.
Visualisations: A simple heatmap library (e.g., react-calendar-heatmap) or custom-built using CSS/SVG.
Data Flow:
Write: User types in the 'Focus' space.
Finish: User clicks 'Finish'.
Save: The app captures text, calculates word count/time, prompts for a name, and saves a session object to the browser's IndexedDB.
Read: The 'Reflection' space reads from IndexedDB to populate the session log and aggregate data for the heatmap.
Export: User clicks 'Export'. The app initiates the Google OAuth flow. On success, it uses the Google Drive API to create a new file in the user's drive with the session text.

2.7. Implementation Plan (Phased)
I recommend the following phased approach for the coding agent:
Phase 1: Core Editor (MVP)
Build the 'Focus' space text editor.
Implement the onKeyDown event listener to disable backspace/delete.
Implement the "Finish" button and save (with metadata) to localStorage (for simplicity first).
Phase 2: Session Log & IndexedDB
Build the 'Reflection' space.
Refactor data storage from localStorage to IndexedDB to handle larger data.
Build the reverse-chronological session log that reads from IndexedDB.
Build the read-only session viewer modal/page.
Phase 3: Statistics Dashboard
Build the heatmap calendar component.
Write the logic to query IndexedDB, aggregate word counts by day, and pass this data to the heatmap.
Implement the hover-over tooltip.
Phase 4: Google Drive Integration
Set up a Google Cloud project to get API keys.
Implement the client-side OAuth 2.0 authentication flow.
Add "Export to Drive" buttons/functionality to the session log, using the Drive API to create files.

2.8. Risk Assessment
Risk 1: Data Loss (High Impact)
Description: The user clears their browser cache or uses a different browser/device, resulting in the loss of all their writing.
Mitigation:
Add a clear, persistent warning in the 'Reflection' space (e.g., "Your data is stored locally. Clear your cache, and it's gone!").
Make the Google Drive export feature prominent and encourage it as a "backup".
Risk 2: Google API Changes (Low Impact)
Description: Google deprecates or changes the Drive API, breaking the export feature.
Mitigation: Encapsulate all Google API logic in a single module/service for easy maintenance.

2.9. Success Metrics
Activation: User writes and saves their first session.
Retention (Habit): % of users who return and write a new entry within 7 days.
Engagement (Momentum): Average word count per session.
Adoption (Visualisation): % of users who view the 'Reflection' space (indicates interest in the habit-building feedback loop).


