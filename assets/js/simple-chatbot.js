// SOS Infocity - Working Chatbot Widget
(function() {
  function initChatbot() {
    // Create styles
    const styles = `
      #sos-chat-bubble {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 999999;
        font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
      }

      #sos-chat-icon {
        width: 70px;
        height: 70px;
        background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(255, 107, 53, 0.5);
        transition: all 0.3s ease;
        animation: pulse-chat 2.5s infinite;
        position: relative;
      }

      #sos-chat-icon:hover {
        transform: scale(1.12);
        box-shadow: 0 12px 35px rgba(255, 107, 53, 0.7);
      }

      .sos-chat-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        width: 20px;
        height: 20px;
        background: #E74C3C;
        border: 3px solid white;
        border-radius: 50%;
        font-size: 10px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: blink-badge 1.5s infinite;
      }

      @keyframes pulse-chat {
        0%, 100% { box-shadow: 0 8px 25px rgba(255, 107, 53, 0.5); }
        50% { box-shadow: 0 12px 40px rgba(255, 107, 53, 0.8); }
      }

      @keyframes blink-badge {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }

      @keyframes typing-indicator {
        0%, 60%, 100% { opacity: 0.5; transform: translateY(0); }
        30% { opacity: 1; transform: translateY(-8px); }
      }

      #sos-chat-window {
        position: fixed;
        bottom: 110px;
        right: 30px;
        width: 420px;
        height: 600px;
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 12px 50px rgba(0, 0, 0, 0.15);
        display: none;
        flex-direction: column;
        z-index: 999999;
        border: none;
        overflow: hidden;
      }

      #sos-chat-window.active {
        display: flex;
        animation: slideUp 0.4s ease;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .sos-chat-header {
        background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
        color: white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
        box-shadow: 0 2px 10px rgba(255, 107, 53, 0.2);
      }

      .sos-chat-header h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0.3px;
      }

      .sos-chat-close {
        background: none;
        border: none;
        color: white;
        font-size: 28px;
        cursor: pointer;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        transition: all 0.2s;
        flex-shrink: 0;
      }

      .sos-chat-close:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .sos-chat-body {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        background: #fafbfc;
      }

      .sos-chat-body::-webkit-scrollbar {
        width: 6px;
      }

      .sos-chat-body::-webkit-scrollbar-track {
        background: transparent;
      }

      .sos-chat-body::-webkit-scrollbar-thumb {
        background: #ddd;
        border-radius: 3px;
      }

      .sos-chat-msg {
        display: flex;
        gap: 8px;
        margin-bottom: 8px;
        animation: fadeIn 0.4s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .sos-msg-bot {
        justify-content: flex-start;
      }

      .sos-msg-user {
        justify-content: flex-end;
      }

      .sos-msg-content {
        max-width: 85%;
        padding: 12px 14px;
        border-radius: 12px;
        line-height: 1.5;
        font-size: 14px;
        word-wrap: break-word;
      }

      .sos-msg-bot .sos-msg-content {
        background: white;
        color: #333;
        border: 1px solid #e8e8e8;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      }

      .sos-msg-user .sos-msg-content {
        background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
        color: white;
        border: none;
      }

      .sos-typing-indicator {
        display: flex;
        gap: 4px;
        align-items: center;
        padding: 12px 14px;
        background: white;
        border-radius: 12px;
        border: 1px solid #e8e8e8;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        width: fit-content;
      }

      .sos-typing-dot {
        width: 6px;
        height: 6px;
        background: #999;
        border-radius: 50%;
        animation: typing-indicator 1.4s infinite;
      }

      .sos-typing-dot:nth-child(2) { animation-delay: 0.2s; }
      .sos-typing-dot:nth-child(3) { animation-delay: 0.4s; }

      .sos-chat-input-area {
        padding: 15px;
        border-top: 1px solid #e8e8e8;
        display: flex;
        gap: 10px;
        background: white;
        flex-shrink: 0;
      }

      .sos-chat-input {
        flex: 1;
        padding: 11px 14px;
        border: 1.5px solid #e0e0e0;
        border-radius: 8px;
        font-size: 14px;
        outline: none;
        font-family: inherit;
        transition: all 0.2s;
      }

      .sos-chat-input:focus {
        border-color: #FF6B35;
        box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
      }

      .sos-chat-send {
        width: 42px;
        height: 42px;
        background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 18px;
        transition: all 0.2s;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .sos-chat-send:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
      }

      .sos-chat-send:active {
        transform: scale(0.95);
      }

      .sos-service-card {
        background: white;
        border: 1px solid #e8e8e8;
        border-left: 4px solid #FF6B35;
        border-radius: 10px;
        padding: 14px;
        margin: 8px 0;
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .sos-service-card:hover {
        box-shadow: 0 4px 12px rgba(255, 107, 53, 0.15);
        border-left-color: #F7931E;
      }

      .sos-service-card h5 {
        margin: 0 0 8px 0;
        font-size: 14px;
        font-weight: 700;
        color: #333;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .sos-service-card p {
        margin: 0 0 10px 0;
        font-size: 13px;
        color: #666;
        line-height: 1.5;
      }

      .sos-service-link {
        display: inline-block;
        padding: 8px 14px;
        background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        border: none;
        transition: all 0.2s;
      }

      .sos-service-link:hover {
        box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
        transform: translateY(-2px);
      }

      .sos-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000000;
      }

      .sos-modal-overlay.active {
        display: flex;
      }

      .sos-modal-content {
        background: white;
        border-radius: 16px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.3s ease;
      }

      .sos-modal-header {
        display: flex;
        align-items: flex-start;
        gap: 15px;
        margin-bottom: 15px;
      }

      .sos-modal-icon {
        font-size: 40px;
        flex-shrink: 0;
      }

      .sos-modal-title h2 {
        margin: 0 0 5px 0;
        font-size: 20px;
        font-weight: 700;
        color: #333;
      }

      .sos-modal-title p {
        margin: 0;
        font-size: 13px;
        color: #999;
      }

      .sos-modal-body {
        margin: 20px 0;
        line-height: 1.7;
        color: #555;
        font-size: 14px;
      }

      .sos-modal-body h4 {
        margin: 15px 0 8px 0;
        color: #FF6B35;
        font-weight: 700;
      }

      .sos-modal-body ul {
        margin: 10px 0;
        padding-left: 20px;
      }

      .sos-modal-body li {
        margin: 6px 0;
        color: #666;
      }

      .sos-modal-footer {
        display: flex;
        gap: 12px;
        margin-top: 20px;
        border-top: 1px solid #e8e8e8;
        padding-top: 15px;
      }

      .sos-modal-btn {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 14px;
      }

      .sos-modal-btn-close {
        background: #f0f0f0;
        color: #333;
      }

      .sos-modal-btn-close:hover {
        background: #e0e0e0;
      }

      .sos-modal-btn-primary {
        background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
        color: white;
      }

      .sos-modal-btn-primary:hover {
        box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
        transform: translateY(-2px);
      }

      @media (max-width: 480px) {
        #sos-chat-window {
          width: calc(100% - 20px);
          right: 10px;
          bottom: 80px;
          height: calc(100vh - 150px);
          max-height: 500px;
        }
        
        #sos-chat-icon {
          width: 60px;
          height: 60px;
          font-size: 32px;
        }

        .sos-msg-content {
          max-width: 90%;
        }

        .sos-modal-content {
          max-height: 90vh;
        }
      }
    `;

    // Create HTML
    const html = `
      <div id="sos-chat-bubble">
        <div id="sos-chat-icon" title="Chat with us">
          💬
          <span class="sos-chat-badge">●</span>
        </div>
        
        <div id="sos-chat-window">
          <div class="sos-chat-header">
            <h3>SOS Support</h3>
            <button class="sos-chat-close">&times;</button>
          </div>
          
          <div class="sos-chat-body">
            <div class="sos-chat-msg sos-msg-bot">
              <div class="sos-msg-content">Hi 👋 I'm SOS Bot. How can I help you today?</div>
            </div>
          </div>
          
          <div class="sos-chat-input-area">
            <input 
              type="text" 
              class="sos-chat-input" 
              placeholder="Type your message..."
            />
            <button class="sos-chat-send">📤</button>
          </div>
        </div>
      </div>

      <div id="sos-modal-overlay" class="sos-modal-overlay">
        <div class="sos-modal-content" id="sos-modal-content"></div>
      </div>
    `;

    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.innerHTML = styles;
    document.head.appendChild(styleEl);

    // Inject HTML
    document.body.insertAdjacentHTML('beforeend', html);

    // Define services with detailed information
    const SERVICES = {
      'it-network': {
        icon: '🌐',
        name: 'IT Network Solutions',
        keywords: ['cloud', 'network', 'infrastructure', 'servers', 'data center'],
        description: 'Secure, scalable IT infrastructure and network environments',
        details: 'Enterprise-grade IT Network Solutions providing robust infrastructure, cloud connectivity, and secure network architecture for organizations of all sizes.',
        features: [
          'Cloud infrastructure setup and management',
          'VPN and secure connectivity',
          'Network security and firewalls',
          'Disaster recovery solutions'
        ]
      },
      'connectivity': {
        icon: '📡',
        name: 'Connectivity Solutions',
        keywords: ['connectivity', 'wireless', 'wan', 'broadband', 'internet'],
        description: 'Structured wired and wireless connectivity for enterprises',
        details: 'Modern connectivity solutions including both wired and wireless infrastructure, optimized for business performance and reliability.',
        features: [
          'Wired and wireless network setup',
          'SD-WAN solutions',
          'Broadband optimization',
          'Network redundancy'
        ]
      },
      'security': {
        icon: '🔒',
        name: 'Security & Surveillance',
        keywords: ['security', 'surveillance', 'monitor', 'cctv', 'access control'],
        description: 'Integrated monitoring, access control, and safety solutions',
        details: 'Comprehensive security and surveillance systems designed to protect your assets and personnel with state-of-the-art monitoring technology.',
        features: [
          'Advanced CCTV systems',
          'Access control systems',
          'Real-time monitoring',
          'Security incident management'
        ]
      },
      'data-analytics': {
        icon: '📊',
        name: 'Data & BI Analytics',
        keywords: ['data', 'analytics', 'insight', 'reporting', 'business intelligence'],
        description: 'Converting operational data into actionable business insights',
        details: 'Transform your raw data into strategic insights using our advanced Business Intelligence and Analytics platforms.',
        features: [
          'Data warehousing',
          'Advanced analytics and reports',
          'Real-time dashboards',
          'Predictive analytics'
        ]
      },
      'software': {
        icon: '💻',
        name: 'Software Engineering',
        keywords: ['software', 'development', 'app', 'application', 'coding'],
        description: 'End-to-end application design, development, and support',
        details: 'Custom software solutions from concept to deployment, with ongoing support and maintenance for your business applications.',
        features: [
          'Custom application development',
          'API development and integration',
          'Application modernization',
          'Technical support and maintenance'
        ]
      },
      'ai': {
        icon: '🤖',
        name: 'AI Intelligent Systems',
        keywords: ['ai', 'artificial intelligence', 'automation', 'intelligent', 'machine learning'],
        description: 'Smart platforms for automation, monitoring, and decision-making',
        details: 'Leverage artificial intelligence and automation to optimize operations, improve decision-making, and drive business efficiency.',
        features: [
          'Process automation',
          'Intelligent monitoring systems',
          'AI-powered analytics',
          'Smart decision support'
        ]
      },
      'consulting': {
        icon: '💡',
        name: 'Strategic Consulting',
        keywords: ['consulting', 'strategy', 'advice', 'planning', 'technology strategy'],
        description: 'Technology consulting and strategic planning services',
        details: 'Expert guidance on technology strategy, digital transformation, and IT roadmaps tailored to your business goals.',
        features: [
          'Digital transformation strategy',
          'Technology assessment',
          'IT roadmapping',
          'Change management'
        ]
      }
    };

    // Initialize chat
    initializeChat();
  }

  function initializeChat() {
    const icon = document.getElementById('sos-chat-icon');
    const window_el = document.getElementById('sos-chat-window');
    const closeBtn = document.querySelector('.sos-chat-close');
    const sendBtn = document.querySelector('.sos-chat-send');
    const input = document.querySelector('.sos-chat-input');
    const body = document.querySelector('.sos-chat-body');
    const modalOverlay = document.getElementById('sos-modal-overlay');

    if (!icon) {
      console.error('Chatbot elements not found');
      return;
    }

    // Customer data collector
    const customerData = {
      name: '',
      email: '',
      phone: '',
      company: '',
      services: '',
      message: '',
      conversationHistory: []
    };

    let conversationStage = 'greeting'; // greeting -> service -> name -> email -> phone -> company -> end

    // Toggle chat
    icon.addEventListener('click', () => {
      window_el.classList.toggle('active');
      if (window_el.classList.contains('active')) {
        input.focus();
      }
    });

    // Close chat
    closeBtn.addEventListener('click', () => {
      window_el.classList.remove('active');
    });

    // Send message
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    // Close modal
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });

    function addTypingIndicator() {
      const typingMsg = document.createElement('div');
      typingMsg.className = 'sos-chat-msg sos-msg-bot';
      typingMsg.id = 'sos-typing-indicator';
      typingMsg.innerHTML = `
        <div class="sos-typing-indicator">
          <div class="sos-typing-dot"></div>
          <div class="sos-typing-dot"></div>
          <div class="sos-typing-dot"></div>
        </div>
      `;
      body.appendChild(typingMsg);
      body.scrollTop = body.scrollHeight;
      return typingMsg;
    }

    function removeTypingIndicator() {
      const typing = document.getElementById('sos-typing-indicator');
      if (typing) typing.remove();
    }

    function saveToGoogleSheet() {
      const WEB_APP_URL = 'https://script.google.com/macros/d/AKfycbw-YOUR-ID-HERE/usercontent'; // USER NEEDS TO UPDATE THIS
      
      // Only save if we have at least name and email
      if (!customerData.name || !customerData.email) {
        console.log('Missing name or email, not saving');
        return;
      }

      const payload = {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone || 'Not provided',
        company: customerData.company || 'Not provided',
        services: customerData.services || 'Not specified',
        message: customerData.message || ''
      };

      // Send to Google Sheet
      fetch(WEB_APP_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(data => {
        console.log('✅ Data saved to Google Sheet:', data);
        addBotMessage('📊 Your information has been recorded. Our team will contact you shortly!');
      })
      .catch(error => {
        console.error('❌ Error saving data:', error);
        addBotMessage('⚠️ There was an issue saving your data. Please contact us directly at contact@sosinfocity.com');
      });
    }

    function sendMessage() {
      const msg = input.value.trim();
      if (!msg) return;

      // Add user message to history
      customerData.conversationHistory.push({ role: 'user', message: msg });

      // Add user message to UI
      const userMsg = document.createElement('div');
      userMsg.className = 'sos-chat-msg sos-msg-user';
      userMsg.innerHTML = `<div class="sos-msg-content">${escapeHtml(msg)}</div>`;
      body.appendChild(userMsg);
      input.value = '';
      body.scrollTop = body.scrollHeight;

      // Show typing indicator
      addTypingIndicator();

      // Bot response with delay
      setTimeout(() => {
        removeTypingIndicator();
        processUserInput(msg);
      }, 1200);
    }

    function addBotMessage(html) {
      const botMsg = document.createElement('div');
      botMsg.className = 'sos-chat-msg sos-msg-bot';
      botMsg.innerHTML = html;
      body.appendChild(botMsg);
      body.scrollTop = body.scrollHeight;
    }

    function processUserInput(msg) {
      const lower = msg.toLowerCase();

      if (conversationStage === 'greeting') {
        // User responded to greeting - detect services
        let detectedServices = [];
        let detectedServicesStr = '';

        for (const [key, service] of Object.entries(SERVICES)) {
          if (service.keywords.some(kw => lower.includes(kw))) {
            detectedServices.push(service);
          }
        }

        if (detectedServices.length > 0) {
          detectedServicesStr = detectedServices.map(s => s.name).join(', ');
          customerData.services = detectedServicesStr;

          let response = `
            <div class="sos-msg-content" style="background: white !important; border: 1px solid #e8e8e8 !important;">
              Perfect! I can see you're interested in: <strong>${detectedServicesStr}</strong>
            </div>
          `;

          for (const service of detectedServices.slice(0, 2)) {
            response += `
              <div class="sos-service-card" onclick="window.showServiceModal('${service.name}')">
                <h5>${service.icon} ${service.name}</h5>
                <p>${service.description}</p>
                <button class="sos-service-link">Learn More →</button>
              </div>
            `;
          }

          response += `
            <div class="sos-msg-content" style="margin-top: 12px;">
              To connect you with our team, I need a few details. What's your name?
            </div>
          `;

          addBotMessage(response);
          conversationStage = 'name';
        } else {
          customerData.message = msg;
          const response = `
            <div class="sos-msg-content">
              Thanks for reaching out! To better assist you, could you tell me what services you're interested in? 
              (IT Solutions, Security, Data Analytics, Software, AI, etc.)
            </div>
          `;
          addBotMessage(response);
        }
        return;
      }

      if (conversationStage === 'name') {
        customerData.name = msg;
        conversationStage = 'email';
        addBotMessage(`
          <div class="sos-msg-content">
            Great to meet you, <strong>${msg}</strong>! 👋 What's your email address?
          </div>
        `);
        return;
      }

      if (conversationStage === 'email') {
        if (!msg.includes('@')) {
          addBotMessage(`
            <div class="sos-msg-content">
              That doesn't look like a valid email. Please provide a valid email address (e.g., name@company.com)
            </div>
          `);
          return;
        }
        customerData.email = msg;
        conversationStage = 'phone';
        addBotMessage(`
          <div class="sos-msg-content">
            Thanks! What's your phone number? (optional - you can skip)
          </div>
        `);
        input.placeholder = 'Enter phone or type "skip"...';
        return;
      }

      if (conversationStage === 'phone') {
        if (lower !== 'skip') {
          customerData.phone = msg;
        }
        conversationStage = 'company';
        addBotMessage(`
          <div class="sos-msg-content">
            And which company do you work for? (optional - you can skip)
          </div>
        `);
        input.placeholder = 'Enter company or type "skip"...';
        return;
      }

      if (conversationStage === 'company') {
        if (lower !== 'skip') {
          customerData.company = msg;
        }
        conversationStage = 'end';
        input.placeholder = 'Type your message...';

        // Save data to Google Sheet
        saveToGoogleSheet();

        addBotMessage(`
          <div class="sos-msg-content">
            Perfect! 🎉 I've recorded your information. Our team will review your request and get back to you at 
            <strong>${customerData.email}</strong> within 24 hours.
            
            Is there anything else I can help you with?
          </div>
        `);
        return;
      }

      if (conversationStage === 'end') {
        // Free form conversation after data collection
        addBotMessage(`
          <div class="sos-msg-content">
            Thanks for the info! Our sales team will follow up with you soon. If you need immediate assistance, 
            click "Get in Touch" at the top of the page. 📧
          </div>
        `);
      }
    }

    function showServiceModal(serviceName) {
      const service = Object.values(SERVICES).find(s => s.name === serviceName);
      if (!service) return;

      const modal = document.getElementById('sos-modal-content');
      modal.innerHTML = `
        <div class="sos-modal-header">
          <div class="sos-modal-icon">${service.icon}</div>
          <div class="sos-modal-title">
            <h2>${service.name}</h2>
            <p>Professional Services</p>
          </div>
        </div>

        <div class="sos-modal-body">
          <p>${service.details}</p>
          
          <h4>Key Features:</h4>
          <ul>
            ${service.features.map(f => `<li>${f}</li>`).join('')}
          </ul>

          <p style="margin-top: 15px; font-style: italic; color: #999;">
            Contact our team to discuss how we can support your business needs.
          </p>
        </div>

        <div class="sos-modal-footer">
          <button class="sos-modal-btn sos-modal-btn-close" onclick="document.getElementById('sos-modal-overlay').classList.remove('active')">Close</button>
          <button class="sos-modal-btn sos-modal-btn-primary" onclick="window.location.href='/pages/contact.html'">Get in Touch</button>
        </div>
      `;

      modalOverlay.classList.add('active');
    }

    window.showServiceModal = showServiceModal;

    function escapeHtml(text) {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return text.replace(/[&<>"']/g, m => map[m]);
    }
  }

  // Wait for DOM or inject immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }
})();
