// Service Worker para la extensión companion de LUZFER (Manifest V3)
const LUZFER_API = 'http://127.0.0.1:3883/api/status';
const REPORT_API = 'http://127.0.0.1:3883/api/report-attempt';

let isFocusActive = false;
let blockedDomains = ['instagram.com', 'tiktok.com', 'roblox.com', 'twitch.tv'];

async function checkFocusStatus() {
  try {
    const res = await fetch(LUZFER_API);
    if (!res.ok) return;
    const data = await res.json();

    isFocusActive = !!data.isActive;
    if (data.blockedWebsites && Array.isArray(data.blockedWebsites)) {
      blockedDomains = data.blockedWebsites;
    }

    await applyBlockingRules(isFocusActive);
  } catch (err) {
    // Si la app de escritorio no está abierta, no bloqueamos
  }
}

async function applyBlockingRules(enable) {
  const ruleIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (!enable) {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: ruleIds
    });
    return;
  }

  const newRules = blockedDomains.map((domain, index) => ({
    id: index + 1,
    priority: 1,
    action: {
      type: 'redirect',
      redirect: {
        extensionPath: `/blocked.html?target=${encodeURIComponent(domain)}`
      }
    },
    condition: {
      urlFilter: `||${domain}`,
      resourceTypes: ['main_frame']
    }
  }));

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: ruleIds,
    addRules: newRules
  });
}

// Escuchar intentos bloqueados
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'report_blocked_attempt') {
    fetch(REPORT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: request.url })
    }).catch(() => {});
    sendResponse({ received: true });
  }
});

// Revisión periódica con Alarms API cada 15 segundos
chrome.alarms.create('checkLuzferFocus', { periodInMinutes: 0.25 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkLuzferFocus') {
    checkFocusStatus();
  }
});

// Chequeo inicial
checkFocusStatus();
