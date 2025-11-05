# Just Write

A minimalist, distraction-free web application built to help writers achieve a state of flow by removing the ability to edit. This project is built on the "write-only" principle to force forward momentum and bypass your inner critic.

## 🚀 Live Demo

**https://acardilini.github.io/Write-Only/**

## Project Goal

This application helps writers overcome perfectionism and maintain creative flow by disabling backspace and delete keys during the writing process. It's designed to encourage unfiltered creation and build consistent daily writing habits through visual feedback.

## Current Implementation Status

### ✅ Phase 1: Focus Space (Complete)
- **Write-Only Editor**: Backspace and delete keys are disabled
- **Session Tracking**: Automatic tracking of word count and time spent
- **Session Naming**: Optional naming prompt when finishing
- **Auto-Save**: Sessions automatically saved to IndexedDB

### ✅ Phase 2: Reflection Space (Complete)
- **Session Log**: Reverse-chronological list of all writing sessions
- **Session Viewer**: Read-only modal for viewing full session text
- **Statistics Dashboard**: Overview of total sessions, words, and time
- **Local Storage**: All data stored in browser's IndexedDB
- **Data Warning**: Clear notification about local storage limitations

### ✅ Phase 3: Heatmap Calendar (Complete)
- **Year-Long Activity**: GitHub-style contribution graph
- **Visual Feedback**: Color-coded intensity based on daily word counts
- **Interactive Tooltips**: Hover to see exact counts for each day
- **Habit Building**: Visual reinforcement of writing consistency

### 🚧 Phase 4: Google Drive Integration (Pending)
- Google OAuth authentication
- Export individual sessions to Google Drive
- Backup entire session history

## Technical Stack

- **Framework**: React 18 with Vite
- **Storage**: IndexedDB (via `idb` library)
- **Date Handling**: date-fns
- **Styling**: Custom CSS with calm, minimalist design
- **Hosting**: Static deployment ready (GitHub Pages, Vercel, Netlify)

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── FocusSpace.jsx          # Write-only editor
│   ├── FocusSpace.css
│   ├── ReflectionSpace.jsx     # Session log & dashboard
│   ├── ReflectionSpace.css
│   ├── SessionViewer.jsx       # Read-only session modal
│   ├── SessionViewer.css
│   ├── HeatmapCalendar.jsx     # Year heatmap visualization
│   └── HeatmapCalendar.css
├── utils/
│   └── db.js                   # IndexedDB operations
├── App.jsx                     # Main app & routing
├── App.css
├── index.css                   # Global styles
└── main.jsx                    # Entry point
```

## Features

### Write Mode
- Clean, distraction-free interface
- Typography-first design
- Disabled editing (no backspace/delete)
- Live word count
- Time tracking
- Session naming

### Reflect Mode
- Browse all writing sessions
- View session statistics
- Interactive year-long heatmap
- Read previous sessions
- Track writing consistency

## Design Philosophy

**Minimalist & Calm**
- Typography-first interface using Merriweather and Inter fonts
- Calm color palette (#fdfdf9 background, #333 text)
- Clean, uncluttered layouts
- Smooth animations and transitions

**Data Ownership**
- 100% client-side application
- No server-side data storage
- All data stored locally in browser
- Future: Optional Google Drive backup

**Flow State Focus**
- Remove editing to bypass inner critic
- Encourage forward momentum
- Build writing habits through visual feedback
- Celebrate progress without judgment

## Documentation

See [docs/PRD.md](./docs/PRD.md) for the complete Product Requirements Document.

## Browser Compatibility

Modern browsers with IndexedDB support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Data Privacy

Your writing is stored **only** in your browser's local IndexedDB. The application:
- Does not send data to any server
- Works completely offline
- Requires manual export for backups
- Will lose data if browser cache is cleared

**Important**: Always export important work to Google Drive (when available) or copy to a safe location.

## Deployment

The application is configured for automatic deployment to GitHub Pages.

### Quick Deploy

1. **Enable GitHub Pages** in repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to the `main` branch
4. Your app will be live at `https://acardilini.github.io/Write-Only/`

For detailed deployment instructions, troubleshooting, and manual deployment options, see **[DEPLOY.md](./DEPLOY.md)**.

## License

See LICENSE file for details.

## Contributing

This project is being developed as part of a personal coding exercise. Future contributions may be welcome once Phase 4 is complete.
