/**
 * SOS Infocity - Advanced AI Chatbot
 * Features:
 * - Natural conversation with company knowledge base
 * - Smart service suggestions
 * - Customer details capture
 * - Email/WhatsApp integration via Zapier
 * - Conversation history tracking
 */

class SOSAIChatbot {
  constructor() {
    this.isOpen = false;
    this.conversationStage = 'greeting';
    this.customerData = {
      name: '',
      email: '',
      phone: '',
      company: '',
      interestedServices: [],
      conversationHistory: [],
      queryDetails: '',
      timestamp: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    // Company Knowledge Base
    this.knowledgeBase = {
      company: {
        name: 'SOS Infocity',
        shortDesc: 'Your trusted IT Solutions & Cybersecurity partner',
        tagline: 'Field-Ready Solutions | Large-Scale Deployments | Operational Stability',
        values: ['Security-First Approach', 'System Integration Expertise', 'Long-Term Support']
      },
      services: [
        {
          id: 'ai',
          name: 'AI Intelligent Systems',
          shortDesc: 'Smart platforms for automation, monitoring, and decision-making',
          fullDesc: 'Leverage AI for intelligent automation, real-time monitoring, and data-driven decision making.',
          page: '/pages/ai-intelligent-solutions.html',
          keywords: ['AI', 'automation', 'smart', 'intelligent', 'data-driven', 'analytics', 'monitoring']
        },
        {
          id: 'it-network',
          name: 'IT Network Solutions',
          shortDesc: 'Secure, scalable IT infrastructure and network environments',
          fullDesc: 'Enterprise-grade IT infrastructure, cloud migration, and secure network implementations.',
          page: '/pages/it-network-solutions.html',
          keywords: ['IT', 'network', 'infrastructure', 'cloud', 'servers', 'cloud migration', 'scalable']
        },
        {
          id: 'connectivity',
          name: 'Connectivity Solutions',
          shortDesc: 'Structured wired and wireless connectivity for enterprises',
          fullDesc: 'Enterprise connectivity solutions including wired, wireless, and hybrid deployments.',
          page: '/pages/connectivity-solutions.html',
          keywords: ['connectivity', 'network', 'wifi', 'wired', 'wireless', 'wan', 'bandwidth']
        },
        {
          id: 'data-bi',
          name: 'Data & BI Analytics',
          shortDesc: 'Converting operational data into actionable business insights',
          fullDesc: 'Business intelligence, data warehousing, and predictive analytics for better decision making.',
          page: '/pages/data-bi-analytics.html',
          keywords: ['data', 'analytics', 'BI', 'business intelligence', 'insights', 'reporting', 'analytics']
        },
        {
          id: 'security',
          name: 'Security & Surveillance',
          shortDesc: 'Integrated monitoring, access control, and safety solutions',
          fullDesc: 'Comprehensive security systems, surveillance, access control, and risk management.',
          page: '/pages/security-surveillance.html',
          keywords: ['security', 'surveillance', 'monitoring', 'access control', 'safety', 'cyber', 'protection']
        },
        {
          id: 'software',
          name: 'Software Engineering',
          shortDesc: 'End-to-end application design, development, and support',
          fullDesc: 'Custom software development, application design, integration, and ongoing support.',
          page: '/pages/software-engineering.html',
          keywords: ['software', 'development', 'application', 'coding', 'web', 'app', 'programming']
        },
        {
          id: 'digital',
          name: 'Advanced Digital Technologies',
          shortDesc: 'IoT, blockchain, and next-generation digital systems',
          fullDesc: 'Cutting-edge technologies including IoT, blockchain, edge computing, and more.',
          page: '/pages/new-age-technologies.html',
          keywords: ['IoT', 'blockchain', 'emerging tech', 'digital transformation', 'edge computing']
        }
      ],
      faqs: [
        { q: 'What services do you offer?', a: 'We provide AI, IT Networks, Connectivity, Data Analytics, Security, Software Development, and advanced digital technologies.' },
        { q: 'How can I get started?', a: 'Share your requirements with us and we\'ll provide a custom solution. Visit our Connect page or reply here with your details!' },
        { q: 'Do you offer support?', a: 'Yes! We provide long-term support and system integration expertise as part of our commitment to operational stability.' },
        { q: 'Can you handle large deployments?', a: 'Absolutely! Large-scale deployments are our specialty. We have field-ready solutions for enterprises.' }
      ]
    };

    this.webhookUrl = 'https://hooks.zapier.com/hooks/catch/26445526/ue7aco8/';
    this.init();
  }

  init() {
    try {
      this.createChatUI();
      console.log('✅ Chat UI created');
    } catch (e) {
      console.error('❌ Error creating chat UI:', e);
      return;
    }
    
    try {
      this.attachEventListeners();
      console.log('✅ Event listeners attached');
    } catch (e) {
      console.error('❌ Error attaching event listeners:', e);
    }
  }

  createChatUI() {
    const chatHTML = `
      <!-- AI Chatbot Widget -->
      <div class="sos-ai-chat-bubble">
        <div class="sos-ai-chat-icon" id="sosAIChatToggle" title="Chat with us">
          💬
          <span class="sos-ai-chat-badge" id="sosAIChatBadge">●</span>
        </div>
        
        <div class="sos-ai-chat-window" id="sosAIChatWindow">
          <div class="sos-ai-chat-header">
            <div class="sos-ai-header-content">
              <h3>SOS Infocity</h3>
              <p class="sos-ai-status">Online</p>
            </div>
            <button class="sos-ai-close-btn" id="sosAIChatClose">✕</button>
          </div>
          
          <div class="sos-ai-chat-body" id="sosAIChatBody">
            <div class="sos-ai-message bot-message">
              <div class="sos-ai-message-avatar">🤖</div>
              <div class="sos-ai-message-content">
                <p>Hi there! 👋 I'm SOS Bot, here to help you find the perfect solution for your business needs.</p>
                <p>What brings you here today?</p>
              </div>
            </div>
          </div>
          
          <div class="sos-ai-chat-footer">
            <div class="sos-ai-input-group">
              <input 
                type="text" 
                id="sosAIChatInput" 
                placeholder="Type your message..." 
                class="sos-ai-chat-input"
              >
              <button class="sos-ai-send-btn" id="sosAISendBtn">📤</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Inject into body
    if (document.body) {
      document.body.insertAdjacentHTML('beforeend', chatHTML);
    } else {
      console.error('❌ document.body not available');
    }
  }

  attachEventListeners() {
    // Add small delay to ensure DOM elements exist
    setTimeout(() => {
      const toggle = document.getElementById('sosAIChatToggle');
      const close = document.getElementById('sosAIChatClose');
      const sendBtn = document.getElementById('sosAISendBtn');
      const input = document.getElementById('sosAIChatInput');
      
      if (!toggle) {
        console.error('❌ sosAIChatToggle element not found');
        return;
      }
      
      toggle.addEventListener('click', () => this.toggleChat());
      if (close) close.addEventListener('click', () => this.closeChat());
      if (sendBtn) sendBtn.addEventListener('click', () => this.handleUserMessage());
      if (input) input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleUserMessage();
      });
      
      console.log('✅ All event listeners attached successfully');
    }, 100);
  }

  toggleChat() {
    this.isOpen ? this.closeChat() : this.openChat();
  }

  openChat() {
    this.isOpen = true;
    document.getElementById('sosAIChatWindow').classList.add('active');
    document.getElementById('sosAIChatInput').focus();
  }

  closeChat() {
    this.isOpen = false;
    document.getElementById('sosAIChatWindow').classList.remove('active');
  }

  handleUserMessage() {
    const input = document.getElementById('sosAIChatInput');
    const message = input.value.trim();
    
    if (!message) return;

    // Add user message to chat
    this.addMessage(message, 'user');
    this.customerData.conversationHistory.push({ role: 'user', message, timestamp: new Date() });

    // Clear input
    input.value = '';

    // Process and respond
    this.processUserMessage(message);
  }

  processUserMessage(message) {
    const lowerMsg = message.toLowerCase();

    // Detect customer details
    if (this.conversationStage === 'ask_name' && !this.customerData.name) {
      this.customerData.name = message;
      this.conversationStage = 'ask_email';
      this.addBotMessage(`Nice to meet you, ${message}! 😊 What's your email address?`);
      return;
    }

    if (this.conversationStage === 'ask_email' && !this.customerData.email) {
      if (this.isValidEmail(message)) {
        this.customerData.email = message;
        this.conversationStage = 'ask_phone';
        this.addBotMessage(`Great! And your phone number (with country code)?`);
      } else {
        this.addBotMessage(`Hmm, that doesn't look like a valid email. Can you try again?`);
      }
      return;
    }

    if (this.conversationStage === 'ask_phone' && !this.customerData.phone) {
      if (this.isValidPhone(message)) {
        this.customerData.phone = message;
        this.conversationStage = 'ask_company';
        this.addBotMessage(`Perfect! What's your company name?`);
      } else {
        this.addBotMessage(`Please provide a phone number with country code (e.g., +1234567890)?`);
      }
      return;
    }

    if (this.conversationStage === 'ask_company' && !this.customerData.company) {
      this.customerData.company = message;
      this.conversationStage = 'suggestion';
      this.addBotMessage(`Thanks, ${this.customerData.company}! Now let me suggest what might work best for you...`);
      setTimeout(() => this.suggestServices(message), 800);
      return;
    }

    // Service detection
    const detectedServices = this.detectServices(message);
    if (detectedServices.length > 0) {
      this.customerData.interestedServices = detectedServices;
      this.showServiceDetails(detectedServices);
      return;
    }

    // FAQ handling
    if (lowerMsg.includes('faq') || lowerMsg.includes('help') || lowerMsg.includes('question')) {
      this.showFAQs();
      return;
    }

    // General response
    this.addBotMessage(this.generateResponse(message));
  }

  detectServices(message) {
    const lowerMsg = message.toLowerCase();
    const detected = [];

    this.knowledgeBase.services.forEach(service => {
      if (service.keywords.some(kw => lowerMsg.includes(kw))) {
        detected.push(service);
      }
    });

    return detected.length > 0 ? detected : [];
  }

  suggestServices(message) {
    const lowerMsg = message.toLowerCase();
    
    // Smart suggestion based on keywords
    let suggestions = [];

    if (lowerMsg.includes('large') || lowerMsg.includes('enterprise') || lowerMsg.includes('company')) {
      suggestions = this.knowledgeBase.services.filter(s => ['it-network', 'security', 'connectivity'].includes(s.id));
    } else if (lowerMsg.includes('startup') || lowerMsg.includes('small')) {
      suggestions = this.knowledgeBase.services.filter(s => ['software', 'data-bi', 'ai'].includes(s.id));
    } else {
      suggestions = this.knowledgeBase.services.slice(0, 3);
    }

    if (suggestions.length > 0) {
      this.addBotMessage('Based on what you've told me, I think these could help:');
      suggestions.forEach((service, idx) => {
        setTimeout(() => {
          this.addServiceCard(service);
        }, 300 * (idx + 1));
      });
      
      setTimeout(() => {
        this.addBotMessage('Which of these interests you? Just type the name or let me know what else you need!');
      }, 300 * (suggestions.length + 1));
    }
  }

  showServiceDetails(services) {
    if (services.length === 0) {
      this.addBotMessage('Hmm, I didn\'t quite catch that. Let me show you all our services:');
      this.knowledgeBase.services.forEach((service, idx) => {
        setTimeout(() => {
          this.addServiceCard(service);
        }, 200 * idx);
      });
      return;
    }

    services.forEach((service, idx) => {
      setTimeout(() => {
        this.addServiceCard(service);
      }, 300 * idx);
    });

    setTimeout(() => {
      this.addBotMessage(`Ready to learn more? I can schedule a call or send you details!`);
      this.addButtonOptions(['Schedule a Call', 'Send Details via Email', 'More Services']);
    }, 300 * services.length + 200);
  }

  addServiceCard(service) {
    const bodyEl = document.getElementById('sosAIChatBody');
    const card = document.createElement('div');
    card.className = 'sos-ai-service-card';
    card.innerHTML = `
      <div class="service-header">
        <h4>${service.name}</h4>
        <span class="service-icon">→</span>
      </div>
      <p class="service-desc">${service.shortDesc}</p>
      <button class="sos-ai-service-link" onclick="window.sosAIBot.selectService('${service.id}', '${service.page}')">
        Learn More
      </button>
    `;
    bodyEl.appendChild(card);
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  selectService(serviceId, servicePage) {
    const service = this.knowledgeBase.services.find(s => s.id === serviceId);
    if (service) {
      this.customerData.interestedServices.push(serviceId);
      this.addBotMessage(`Great choice! ${service.name} is an excellent solution. I'm preparing a custom overview for you...`);
      
      this.addMessage(`Learn more: ${service.name}`, 'bot');
      
      setTimeout(() => {
        this.addBotMessage(`To proceed, I'll need to capture your full details. Could you share your name first?`);
        this.conversationStage = 'ask_name';
      }, 500);
    }
  }

  showFAQs() {
    this.addBotMessage('Here are some common questions:');
    this.knowledgeBase.faqs.forEach((faq, idx) => {
      setTimeout(() => {
        this.addFAQItem(faq);
      }, 200 * idx);
    });
  }

  addFAQItem(faq) {
    const bodyEl = document.getElementById('sosAIChatBody');
    const faqDiv = document.createElement('div');
    faqDiv.className = 'sos-ai-faq-item';
    faqDiv.innerHTML = `
      <strong>Q: ${faq.q}</strong>
      <p>A: ${faq.a}</p>
    `;
    bodyEl.appendChild(faqDiv);
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  addButtonOptions(options) {
    const bodyEl = document.getElementById('sosAIChatBody');
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'sos-ai-buttons';
    
    options.forEach(option => {
      const btn = document.createElement('button');
      btn.className = 'sos-ai-option-btn';
      btn.textContent = option;
      btn.onclick = () => {
        this.handleUserMessage();
        document.getElementById('sosAIChatInput').value = option;
      };
      buttonsDiv.appendChild(btn);
    });
    
    bodyEl.appendChild(buttonsDiv);
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  generateResponse(message) {
    if (message.toLowerCase().includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help with? 😊';
    }
    if (message.toLowerCase().includes('yes')) {
      return 'Excellent! What specific solution are you looking for?';
    }
    if (message.toLowerCase().includes('no')) {
      return 'No problem! Let me know if you have any questions.';
    }
    if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) {
      return 'Great question! Pricing depends on your specific needs. Can you share more about your requirements?';
    }
    if (message.toLowerCase().includes('demo') || message.toLowerCase().includes('trial')) {
      return 'We can definitely arrange a demo for you! I\'ll need your contact details first. What\'s your name?';
    }
    
    return 'That\'s interesting! Tell me more about what you\'re looking for, and I\'ll suggest the best solution for you.';
  }

  addMessage(text, sender) {
    const bodyEl = document.getElementById('sosAIChatBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = `sos-ai-message ${sender}-message`;
    
    const content = document.createElement('div');
    content.className = 'sos-ai-message-content';
    content.textContent = text;
    
    if (sender === 'bot') {
      const avatar = document.createElement('div');
      avatar.className = 'sos-ai-message-avatar';
      avatar.textContent = '🤖';
      messageDiv.appendChild(avatar);
    }
    
    messageDiv.appendChild(content);
    bodyEl.appendChild(messageDiv);
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  addBotMessage(text) {
    this.addMessage(text, 'bot');
    this.customerData.conversationHistory.push({ role: 'bot', message: text, timestamp: new Date() });
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isValidPhone(phone) {
    return /^\+?[1-9]\d{1,14}$/.test(phone.replace(/[\s\-\(\)]/g, ''));
  }

  async sendToZapier() {
    const data = {
      ...this.customerData,
      conversationHistory: JSON.stringify(this.customerData.conversationHistory),
      interestedServices: this.customerData.interestedServices.join(', ')
    };

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Webhook failed');
      
      this.addBotMessage('✅ Perfect! We\'ve received your details. Our team will contact you within 24 hours. Thank you!');
      return true;
    } catch (error) {
      console.error('Error sending to Zapier:', error);
      localStorage.setItem('sosAIConversation_' + Date.now(), JSON.stringify(data));
      this.addBotMessage('✅ We\'ve saved your information. Our team will reach out shortly!');
      return false;
    }
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    try {
      window.sosAIBot = new SOSAIChatbot();
      console.log('✅ SOS AI Chatbot initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing chatbot:', error);
    }
  });
} else {
  // DOM is already loaded
  try {
    window.sosAIBot = new SOSAIChatbot();
    console.log('✅ SOS AI Chatbot initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing chatbot:', error);
  }
}
