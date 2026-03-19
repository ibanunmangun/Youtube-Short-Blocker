# Final Design: YouTube Shorts Block Extension

## Understanding Summary
- **What is being built:** A "Silent Filter" Chrome extension for YouTube.
- **Why it exists:** To remove the "Shorts" sections from YouTube and help the user reclaim their attention span.
- **Who it is for:** Users who want a cleaner, less distracting YouTube experience.
- **Key features:**
    - **Block Shorts:** Always-on filter for Shorts content.
    - **Focus Mode:** Optional toggle to hide recommendation sidebars and related videos on watch pages.
- **Key constraints:** Lightweight, high performance, and resilient to YouTube's code changes.

## Architecture & Components
1. **Manifest (v3):** Defines permissions and scripts for `www.youtube.com`.
2. **Static CSS (`hide-shorts.css`):** Instantly hides known Shorts and recommendation elements via stylesheets.
3. **Content Script (`content.js`):** Uses `MutationObserver` to watch for lazy-loaded content and handles settings updates.
4. **Popup UI (`popup.html`/`popup.js`):** Provides toggles for "Block Shorts" and "Focus Mode".

## Data Flow
- **Injection:** Chrome injects CSS and JS on page load.
- **Settings Sync:** Popup saves settings to `chrome.storage.local` and notifies content scripts in real-time.
- **Dynamic Watchman:** `MutationObserver` identified and hides new Shorts containers using "Fuzzy Selectors."

## Decision Log
- **3/19/2026 - Project Initialization:** Starting the YouTube Shorts Block project.
- **3/19/2026 - UI Introduction:** Added a popup with toggles for user-controlled filtering.
- **3/19/2026 - Focus Mode Adjustment:** Refined Focus Mode to target watch page sidebars only, avoiding the "empty home page" issue.

## Testing Strategy
- Manual verification of Homepage, Sidebar, Infinite Scroll, Search Results, and Channel Pages.
- Inspection of YouTube's code to update fuzzy selectors if new Shorts containers appear.
