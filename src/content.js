/**
 * YouTube Shorts Blocker - Enhanced JavaScript Watchman
 */

let settings = {
  blockShorts: true,
  hideRecs: false
};

const updateUI = () => {
  // Update Shorts Class
  if (settings.blockShorts) {
    document.body.classList.add('block-shorts-active');
    runShortsCleanup();
  } else {
    document.body.classList.remove('block-shorts-active');
  }

  // Update Recommendations Class
  if (settings.hideRecs) {
    document.body.classList.add('hide-recs-active');
  } else {
    document.body.classList.remove('hide-recs-active');
  }
};

const runShortsCleanup = () => {
  if (!settings.blockShorts) return;

  const shortsSelectors = [
    'ytd-rich-shelf-renderer[is-shorts]',
    'ytd-reel-shelf-renderer',
    'ytm-reel-shelf-renderer'
  ];

  shortsSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (el.style.display !== 'none') {
        el.style.display = 'none';
      }
    });
  });

  const sidebarShorts = document.querySelector('ytd-guide-entry-renderer a[href*="/shorts"]');
  if (sidebarShorts) {
    const entry = sidebarShorts.closest('ytd-guide-entry-renderer');
    if (entry) entry.style.display = 'none';
  }
};

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateSettings") {
    settings = request.settings;
    updateUI();
  }
});

// Set up the "Watchman"
const observer = new MutationObserver((mutations) => {
  const hasNewNodes = mutations.some(mutation => mutation.addedNodes.length > 0);
  if (hasNewNodes) {
    if (settings.blockShorts) runShortsCleanup();
  }
});

const initialize = () => {
  if (document.body) {
    chrome.storage.local.get({ 
      blockShorts: true, 
      hideRecs: false 
    }, (result) => {
      settings = result;
      updateUI();
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  } else {
    window.addEventListener('DOMContentLoaded', initialize, { once: true });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize, { once: true });
} else {
  initialize();
}
