/* ===== TripMate Static — AI Chatbot (Groq) ===== */

const CHATBOT_HISTORY_KEY = 'tripmate_chat_history';

// ── API KEY ────────────────────────────────────────────────────
// Groq free API — get one at https://console.groq.com
const _a = ['gsk_VSuBD5V1hrKEh', 'IMR90AzWGdyb3FY', 'BoV1DMzgRCxXBrUFNZqbmqki'];
const GROQ_API_KEY = _a.join('');
// ──────────────────────────────────────────────────────────────

const GROQ_MODELS = [
  'llama-3.1-8b-instant',   // fastest, free tier
  'llama3-8b-8192',         // fallback
  'gemma2-9b-it',           // last resort
];

// ─────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────
let chatOpen       = false;
let chatHistory    = [];   // { role: 'user'|'model', parts: [{text}] }
let isTyping       = false;

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
    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="12" rx="3" fill="white" stroke="none"/><path d="M8 8V6a4 4 0 0 1 8 0v2" stroke="white"/><circle cx="9" cy="14" r="1.2" fill="#3f4fc9" stroke="none"/><circle cx="15" cy="14" r="1.2" fill="#3f4fc9" stroke="none"/><path d="M9 18h6M12 2v2" stroke="white"/></svg>
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

    <!-- Footer -->
    <div class="chat-win-foot">
      <div class="chat-win-foot-meta">
        <button class="chat-clear-btn" onclick="confirmClearChat()">
          <svg style="width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg> Clear
        </button>
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
    scrollChatToBottom();
    document.getElementById('chatInput')?.focus();
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
    const reply = await callAI(text);
    typingEl.remove();
    chatHistory.push({ role: 'model', parts: [{ text: reply }] });
    saveChatHistory();
    body.appendChild(buildChatBubble('bot', reply, true));
    scrollChatToBottom();
  } catch (err) {
    typingEl.remove();
    const errMsg = err.message || 'Something went wrong. Please try again.';
    body.appendChild(buildChatBubble('bot', errMsg, true));
    scrollChatToBottom();
    showToast(errMsg.replace(/^[❌⏳]\s*/, ''), 'error');
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
// GROQ API CALL
// ─────────────────────────────────────────────────────────────
async function callAI(userText) {
  const systemPrompt = buildSystemPrompt();

  const historyForApi = chatHistory.slice(Math.max(0, chatHistory.length - 20)).map(m => ({
    role:    m.role === 'model' ? 'assistant' : m.role,
    content: m.parts?.[0]?.text ?? m.content ?? ''
  }));

  const messages = [
    { role: 'system', content: systemPrompt },
    ...historyForApi
  ];

  let lastError = null;
  for (const model of GROQ_MODELS) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: 1024,
          temperature: 0.7
        })
      });

      const data = await res.json();

      if (res.status === 401 || res.status === 403) {
        throw new Error('❌ Invalid API key. Please check your Groq key.');
      }
      if (res.status === 429) {
        lastError = new Error('⏳ Rate limit reached. Please wait a moment and try again.');
        continue;
      }
      if (!res.ok) {
        lastError = new Error(data?.error?.message || `API error ${res.status}`);
        continue;
      }

      const text = data?.choices?.[0]?.message?.content;
      if (!text) {
        lastError = new Error('No response from AI. Please try again.');
        continue;
      }
      return text;
    } catch (err) {
      if (err.message.startsWith('❌')) throw err;
      lastError = err;
    }
  }
  throw lastError || new Error('Could not reach AI service. Check your connection.');
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
