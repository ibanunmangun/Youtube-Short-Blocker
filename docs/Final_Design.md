# Final Design: YouTube Shorts Block Extension

## Understanding Summary
- **What is being built:** A "Silent Filter" Chrome extension for YouTube.
- **Why it exists:** To remove the "Shorts" sections from YouTube and help the user reclaim their attention span.
- **Who it is for:** Users who want a cleaner, less distracting YouTube experience.
- **Key constraints:** Always-On (no UI), high performance, and resilient to YouTube's code changes.
- **Explicit non-goals:** No toggle buttons, no settings menu, and no redirection of URLs (focus on visibility).

## Architecture & Components
1. **Manifest (v3):** Defines permissions and scripts for `www.youtube.com`.
2. **Static CSS (`hide-shorts.css`):** Instantly hides known Shorts elements (sidebar, homepage shelves) via stylesheets.
3. **Content Script (`content.js`):** Uses `MutationObserver` to watch for lazy-loaded Shorts shelves as the user scrolls.

## Data Flow
- **Injection:** Chrome injects CSS and JS on page load.
- **Static Filter:** CSS hides elements immediately to prevent "flickering."
- **Dynamic Watchman:** `MutationObserver` identifies and hides new Shorts containers using "Fuzzy Selectors" (targeting links containing `/shorts`).

## Decision Log
- **3/19/2026 - Project Initialization:** Starting the YouTube Shorts Block project.
- **3/19/2026 - Combined CSS/JS Approach:** Chosen for best speed (CSS) and reliability (JS) during infinite scrolling.
- **3/19/2026 - Always-On Filter:** Decided on a minimalist, no-UI approach for a distraction-free experience.
- **3/19/2026 - Fuzzy Selector Strategy:** Using partial matches for "/shorts" links to resist YouTube's layout updates.
- **3/19/2026 - MutationObserver Targeting:** Targeted the main video container to optimize performance and reduce CPU usage.

## Testing Strategy
- Manual verification of Homepage, Sidebar, Infinite Scroll, Search Results, and Channel Pages.
- Inspection of YouTube's code to update fuzzy selectors if new Shorts containers appear.
