/* ===== TripMate Static — Gemini AI Chatbot ===== */

const CHATBOT_KEY = 'tripmate_gemini_key';
const CHATBOT_HISTORY_KEY = 'tripmate_chat_history';
const GEMINI_MODELS = [
  'gemini-2.5-flash-lite',   // fastest, cheapest — try first
  'gemini-2.5-flash',        // best price-performance
  'gemini-3.5-flash',        // previous-gen stable
  'gemini-3.6-flash',        // previous-gen stable
  'gemini-3.7-flash',        // fallback
];

// ─────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────
let chatOpen       = false;
let chatHistory    = [];   // { role: 'user'|'model', parts: [{text}] }
let isTyping       = false;
let geminiApiKey   = localStorage.getItem(CHATBOT_KEY) || '';

function loadChatHistory() {
  try {
    chatHistory = JSON.parse(localStorage.getItem(CHATBOT_HISTORY_KEY)) || [];
  } catch { chatHistory = []; }
}
function saveChatHistory() {
  // Keep last 40 messages to avoid localStorage bloat
  if (chatHistory.length > 40) chatHistory = chatHistory.slice(chatHistory.length - 40);
  localStorage.setItem(CHATBOT_HISTORY_KEY, JSON.stringify(chatHistory));
}
function clearChatHistory() {
  chatHistory = [];
  localStorage.removeItem(CHATBOT_HISTORY_KEY);
}

// ─────────────────────────────────────────────────────────────
// RENDER
// ─────────────────────────────────────────────────────────────
function injectChatbot() {
  if (document.getElementById('chatFab')) return; // already injected

  const fabHtml = `
  <button class="chat-fab" id="chatFab" onclick="toggleChat()" aria-label="Open AI Assistant">
    <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" fill="white"/><path d="M12 2v4M8 11V9a4 4 0 0 1 8 0v2" stroke="white" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="16" r="1" fill="#3f4fc9"/><circle cx="15" cy="16" r="1" fill="#3f4fc9"/></svg>
  </button>

  <div class="chat-window hidden" id="chatWindow">
    <!-- Header -->
    <div class="chat-win-head">
      <div class="chat-win-head-avatar">
        <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" fill="white" opacity=".9"/><path d="M12 2v4M8 11V9a4 4 0 0 1 8 0v2" stroke="white" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="16" r="1" fill="#7c5cf0"/><circle cx="15" cy="16" r="1" fill="#7c5cf0"/></svg>
      </div>
      <div class="chat-win-title">
        <strong>TripMate AI</strong>
        <span id="chatStatus">Your travel assistant</span>
      </div>
      <button class="chat-win-close" onclick="toggleChat()" title="Close">✕</button>
    </div>

    <!-- Body -->
    <div class="chat-win-body" id="chatBody">
      <!-- Welcome screen shown when no history -->
      <div class="chat-welcome" id="chatWelcome">
        <div class="chat-welcome-icon">
          <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" fill="white"/><path d="M12 2v4M8 11V9a4 4 0 0 1 8 0v2" stroke="white" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="16" r="1" fill="#3f4fc9"/><circle cx="15" cy="16" r="1" fill="#3f4fc9"/></svg>
        </div>
        <h4>Hello! I'm TripMate AI</h4>
        <p>Your intelligent travel assistant. I can help you plan trips, find destinations, suggest itineraries, and answer all your travel questions.</p>
        <div class="chat-chips">
          <button class="chat-chip" onclick="sendChip(this)">✈️ Plan a trip for me</button>
          <button class="chat-chip" onclick="sendChip(this)">🏨 Hotel recommendations</button>
          <button class="chat-chip" onclick="sendChip(this)">💰 Budget tips</button>
          <button class="chat-chip" onclick="sendChip(this)">📋 My next trip</button>
        </div>
      </div>
    </div>

    <!-- API key notice -->
    <div id="chatKeyNotice" style="display:none;background:var(--amber-50);border-top:1px solid #fde3a0;padding:10px 14px;font-size:12px;color:var(--amber-600);display:flex;align-items:center;gap:8px">
      <svg style="width:14px;height:14px;stroke:var(--amber-600);fill:none;stroke-width:2;flex-shrink:0" viewBox="0 0 24 24"><path d="M10.3 3.3L2 20h20L13.7 3.3a2 2 0 0 0-3.4 0z"/><path d="M12 9v5"/><circle cx="12" cy="17" r=".5" fill="currentColor"/></svg>
      <span>Gemini API key required. <button onclick="promptApiKey()" style="background:none;border:none;color:var(--blue-600);font-weight:700;cursor:pointer;padding:0">Set it here</button></span>
    </div>

    <!-- Footer -->
    <div class="chat-win-foot">
      <div class="chat-win-foot-meta">
        <button class="chat-clear-btn" onclick="confirmClearChat()">
          <svg style="width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg> Clear
        </button>
        <button onclick="promptApiKey()" style="background:none;border:none;font-size:11px;color:var(--text-faint);cursor:pointer">⚙️ API Key</button>
        <span class="chat-footer-note">AI may make mistakes</span>
      </div>
      <div class="chat-input-row">
        <textarea id="chatInput" placeholder="Ask me anything about travel..." rows="1"
          onkeydown="chatKeyDown(event)" oninput="autoResizeChatInput(this)"></textarea>
        <button class="chat-send-btn" onclick="sendChatMessage()" title="Send" aria-label="Send">
          <svg viewBox="0 0 24 24" fill="white"><path d="m3 11 18-7-7 18-3-8z"/></svg>
        </button>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', fabHtml);
  loadChatHistory();
  renderChatHistory();
}

// ─────────────────────────────────────────────────────────────
// TOGGLE / OPEN / CLOSE
// ─────────────────────────────────────────────────────────────
function toggleChat() {
  const win = document.getElementById('chatWindow');
  if (!win) return;
  chatOpen = !chatOpen;
  win.classList.toggle('hidden', !chatOpen);
  if (chatOpen) {
    checkApiKey();
    scrollChatToBottom();
    document.getElementById('chatInput')?.focus();
  }
}

function checkApiKey() {
  const notice = document.getElementById('chatKeyNotice');
  if (!notice) return;
  notice.style.display = geminiApiKey ? 'none' : 'flex';
}

function promptApiKey() {
  const key = prompt('Enter your Gemini API key (get one free at https://aistudio.google.com/app/apikey):', geminiApiKey);
  if (key !== null) {
    geminiApiKey = key.trim();
    localStorage.setItem(CHATBOT_KEY, geminiApiKey);
    checkApiKey();
    if (geminiApiKey) showToast('API key saved!', 'success');
  }
}

// ─────────────────────────────────────────────────────────────
// RENDER HISTORY
// ─────────────────────────────────────────────────────────────
function renderChatHistory() {
  const body    = document.getElementById('chatBody');
  const welcome = document.getElementById('chatWelcome');
  if (!body) return;

  // Remove old messages (keep welcome div)
  body.querySelectorAll('.chat-msg').forEach(m => m.remove());

  if (!chatHistory.length) {
    if (welcome) welcome.style.display = '';
    return;
  }
  if (welcome) welcome.style.display = 'none';

  chatHistory.forEach(msg => {
    const role = msg.role === 'user' ? 'user' : 'bot';
    const text = msg.parts?.[0]?.text || '';
    const el   = buildChatBubble(role, text);
    body.appendChild(el);
  });
  scrollChatToBottom();
}

function buildChatBubble(role, text, isNew = false) {
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  if (isNew) div.style.animation = 'fadeInUp .28s ease both';
  const now = new Date().toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit' });
  div.innerHTML = `
    <div class="chat-bubble">${mdToHtml(text)}</div>
    <div class="chat-time">${now}</div>`;
  return div;
}

// ─────────────────────────────────────────────────────────────
// SEND MESSAGE
// ─────────────────────────────────────────────────────────────
async function sendChatMessage() {
  const input = document.getElementById('chatInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text || isTyping) return;

  if (!geminiApiKey) { promptApiKey(); return; }

  input.value = '';
  input.style.height = 'auto';

  // Hide welcome, show user bubble
  const welcome = document.getElementById('chatWelcome');
  if (welcome) welcome.style.display = 'none';
  const body = document.getElementById('chatBody');
  body.appendChild(buildChatBubble('user', text, true));
  scrollChatToBottom();

  // Add to history
  chatHistory.push({ role: 'user', parts: [{ text }] });
  saveChatHistory();

  // Show typing
  isTyping = true;
  updateChatStatus('Thinking...');
  const typingEl = document.createElement('div');
  typingEl.className = 'chat-msg bot';
  typingEl.id = 'typingIndicator';
  typingEl.innerHTML = `<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
  body.appendChild(typingEl);
  scrollChatToBottom();

  try {
    const reply = await callGemini(text);
    typingEl.remove();
    chatHistory.push({ role: 'model', parts: [{ text: reply }] });
    saveChatHistory();
    body.appendChild(buildChatBubble('bot', reply, true));
    scrollChatToBottom();
  } catch (err) {
    typingEl.remove();
    const errMsg = err.message || 'Something went wrong. Please try again.';
    body.appendChild(buildChatBubble('bot', `⚠️ ${errMsg}`, true));
    scrollChatToBottom();
    showToast(errMsg, 'error');
  } finally {
    isTyping = false;
    updateChatStatus('Your travel assistant');
  }
}

function sendChip(btn) {
  const input = document.getElementById('chatInput');
  if (input) { input.value = btn.textContent.replace(/^[^\w]+/, ''); }
  sendChatMessage();
}

function updateChatStatus(text) {
  const el = document.getElementById('chatStatus');
  if (el) el.textContent = text;
}

// ─────────────────────────────────────────────────────────────
// GEMINI API CALL
// ─────────────────────────────────────────────────────────────
async function callGemini(userText) {
  const systemPrompt = buildSystemPrompt();

  // Trim history for request (last 20 turns = 40 messages)
  const historyForApi = chatHistory.slice(Math.max(0, chatHistory.length - 40));

  const payload = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: historyForApi,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024
    }
  };

  let lastError = null;
  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;
      const res  = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.status === 400 && data?.error?.message?.toLowerCase().includes('api key')) {
        throw new Error('Invalid API key. Please check your Gemini API key and try again.');
      }
      if (res.status === 403) {
        throw new Error('API key not authorized. Make sure your Gemini key is valid and has the Generative Language API enabled.');
      }
      if (res.status === 429) {
        lastError = new Error('Rate limit reached. Please wait a moment and try again.');
        continue;
      }
      if (res.status === 404 || (data?.error?.message || '').includes('not found')) {
        // Model not available — try next one silently
        lastError = new Error(data?.error?.message || `Model not available (${res.status})`);
        continue;
      }
      if (!res.ok) {
        lastError = new Error(data?.error?.message || `API error ${res.status}`);
        continue;
      }

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        lastError = new Error('No response from AI. Please try again.');
        continue;
      }
      return text;
    } catch (err) {
      if (err.message.includes('Invalid API key')) throw err;
      lastError = err;
    }
  }
  throw lastError || new Error('Could not reach Gemini API. Check your connection.');
}

function buildSystemPrompt() {
  const state   = getState ? getState() : {};
  const user    = state.user    || {};
  const trips   = state.trips   || [];
  const bookings= state.bookings|| [];
  const today   = new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

  const nextTrip = trips.find(t => t.status === 'active') || trips[0];
  let tripInfo = 'No active trips.';
  if (nextTrip) {
    tripInfo = `Next trip: "${nextTrip.name}" to ${nextTrip.destination}. `
      + `Dates: ${nextTrip.startDate} – ${nextTrip.endDate}. `
      + `Travelers: ${nextTrip.travelers}. Budget: $${nextTrip.budgetMin}–$${nextTrip.budgetMax}.`;
  }

  const recentBookings = bookings.slice(0, 5).map(b =>
    `- ${b.type}: ${b.provider} (${b.dates}) — ${b.status}`
  ).join('\n') || 'No bookings.';

  return `You are TripMate AI, a friendly and knowledgeable travel assistant built into the TripMate travel planning platform.

Your role:
- Help users plan trips, discover destinations, suggest itineraries, recommend hotels, flights, activities, and estimate budgets.
- You have live context about this user's TripMate data. Reference it naturally when relevant.
- Keep replies concise and conversational. Use bullet points or short paragraphs — avoid walls of text.
- When suggesting bookings or trips, remind the user they can use TripMate's Bookings and Trip Builder pages.
- Never make up booking references or confirmation numbers.
- Today is ${today}.

User profile:
- Name: ${user.name || 'Traveler'}
- Account type: ${user.accountType || 'traveler'}
- Total trips: ${trips.length}
- Total bookings: ${bookings.length}

${tripInfo}

Recent bookings:
${recentBookings}

If the user asks something unrelated to travel, gently steer back to travel topics while still being helpful.`;
}

// ─────────────────────────────────────────────────────────────
// CLEAR CHAT
// ─────────────────────────────────────────────────────────────
function confirmClearChat() {
  if (!chatHistory.length) { showToast('Chat is already empty', 'info'); return; }
  if (typeof showConfirm === 'function') {
    showConfirm('Clear the entire chat history?', function() {
      clearChatHistory();
      renderChatHistory();
      showToast('Chat cleared', 'success');
    });
  } else if (confirm('Clear chat history?')) {
    clearChatHistory();
    renderChatHistory();
  }
}

// ─────────────────────────────────────────────────────────────
// INPUT HELPERS
// ─────────────────────────────────────────────────────────────
function chatKeyDown(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
}

function autoResizeChatInput(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 110) + 'px';
}

function scrollChatToBottom() {
  const body = document.getElementById('chatBody');
  if (body) setTimeout(() => { body.scrollTop = body.scrollHeight; }, 50);
}

// ─────────────────────────────────────────────────────────────
// MARKDOWN → HTML (lightweight)
// ─────────────────────────────────────────────────────────────
function mdToHtml(text) {
  if (!text) return '';
  // Escape HTML first
  let t = text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  // Bold
  t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  t = t.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Inline code
  t = t.replace(/`([^`]+)`/g, '<code style="background:#f1f2f6;padding:1px 5px;border-radius:4px;font-size:.9em">$1</code>');
  // Headings
  t = t.replace(/^### (.+)$/gm, '<h4 style="margin:10px 0 4px;font-size:13.5px;font-weight:700">$1</h4>');
  t = t.replace(/^## (.+)$/gm,  '<h3 style="margin:10px 0 4px;font-size:14px;font-weight:700">$1</h3>');
  // Unordered lists (convert blocks of - items into <ul>)
  t = t.replace(/((?:^- .+\n?)+)/gm, match => {
    const items = match.trim().split('\n').map(l => `<li>${l.replace(/^- /, '')}</li>`).join('');
    return `<ul style="margin:6px 0;padding-left:18px">${items}</ul>`;
  });
  // Numbered lists
  t = t.replace(/((?:^\d+\. .+\n?)+)/gm, match => {
    const items = match.trim().split('\n').map(l => `<li>${l.replace(/^\d+\. /, '')}</li>`).join('');
    return `<ol style="margin:6px 0;padding-left:18px">${items}</ol>`;
  });
  // Paragraphs — wrap blocks of text not already wrapped in a tag
  t = t.split('\n\n').map(block => {
    block = block.trim();
    if (!block) return '';
    if (/^<[hopu]/.test(block)) return block;
    return `<p>${block.replace(/\n/g, '<br>')}</p>`;
  }).join('');
  return t;
}

// ─────────────────────────────────────────────────────────────
// AUTO-INJECT on DOMContentLoaded
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Only inject on app pages (those with a sidebar mount)
  if (document.getElementById('sidebar-mount') || document.getElementById('sidebar')) {
    setTimeout(injectChatbot, 200);
  }
});
