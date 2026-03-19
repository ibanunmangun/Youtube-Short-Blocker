document.addEventListener('DOMContentLoaded', () => {
  const shortsToggle = document.getElementById('toggleShorts');
  const recsToggle = document.getElementById('toggleRecs');

  // Load current states from storage
  chrome.storage.local.get({ 
    blockShorts: true, 
    hideRecs: false 
  }, (result) => {
    shortsToggle.checked = result.blockShorts;
    recsToggle.checked = result.hideRecs;
  });

  const saveAndNotify = () => {
    const settings = {
      blockShorts: shortsToggle.checked,
      hideRecs: recsToggle.checked
    };

    chrome.storage.local.set(settings, () => {
      // Notify all YouTube tabs that the setting has changed
      chrome.tabs.query({ url: "*://www.youtube.com/*" }, (tabs) => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { 
            action: "updateSettings", 
            settings 
          });
        });
      });
    });
  };

  shortsToggle.addEventListener('change', saveAndNotify);
  recsToggle.addEventListener('change', saveAndNotify);
});
