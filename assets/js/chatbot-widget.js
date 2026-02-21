/* ==============================================
   SOS Infocity - Professional Chat Chatbot
   Apple-Inspired Minimalist Design
   ============================================== */

(function() {
  'use strict';
  
  // Create and inject styles
  const styles = document.createElement('style');
  styles.textContent = `
    #sos-chat-bubble {
      position: fixed;
      bottom: 30px;
      right: 20px;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    #sos-chat-icon {
      width: 70px;
      height: 50px;
      background: transparent;
      border-radius: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: none;
      transition: all 0.3s ease;
      position: fixed;
      bottom: 120px;
      right: 20px;
      font-size: 24px;
      animation: cloudPopUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), cloudFloat 3s ease-in-out 0.8s infinite;
      z-index: 999998;
    }

    @keyframes cloudPopUp {
      from {
        transform: translateY(60px) scale(0.6) rotateY(30deg);
        opacity: 0;
      }
      to {
        transform: translateY(0) scale(1) rotateY(0deg);
        opacity: 1;
      }
    }

    @keyframes cloudFloat {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-8px);
      }
    }

    #sos-chat-icon:hover {
      transform: scale(1.08);
    }
    
    #sos-chat-icon svg {
      filter: drop-shadow(0 4px 12px rgba(255, 107, 53, 0.25));
      transition: all 0.3s ease;
    }
    
    #sos-chat-icon:hover svg {
      filter: drop-shadow(0 6px 16px rgba(255, 107, 53, 0.35));
    }

    .sos-typing {
      display: inline-flex;
      gap: 4px;
      align-items: center;
      padding: 8px 12px;
    }

    .sos-typing span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #FF6B35;
      animation: typing 1.4s infinite;
    }

    .sos-typing span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .sos-typing span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.7;
      }
      30% {
        transform: translateY(-8px);
        opacity: 1;
      }
    }
      0%, 100% { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); }
      50% { box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25); }
    }

    #sos-chat-icon.active {
      animation: pulse 2.5s infinite;
    }

    #sos-chat-window {
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 420px;
      height: 560px;
      max-width: 420px;
      max-height: 560px;
      background: #FFFFFF;
      border-radius: 24px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      display: none;
      flex-direction: column;
      z-index: 999999;
      overflow: hidden;
    }

    #sos-chat-window.active {
      display: flex;
      animation: slideUp 0.3s ease-out;
    }

    @keyframes slideUp {
      from { 
        opacity: 0; 
        transform: translateY(20px);
      }
      to { 
        opacity: 1; 
        transform: translateY(0);
      }
    }

    .sos-header {
      background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%);
      border-bottom: 2px solid #FF6B35;
      padding: 16px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .sos-header h3 {
      margin: 0;
      font-size: 15px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: -0.3px;
      white-space: nowrap;
    }

    .sos-header button {
      background: none;
      border: none;
      color: #FFFFFF;
      font-size: 20px;
      cursor: pointer;
      padding: 0;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      opacity: 0.8;
    }

    .sos-header button:hover {
      opacity: 1;
      transform: rotate(90deg);
    }

    .sos-body {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 16px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #FFFFFF;
      max-height: calc(560px - 60px);
    }

    .sos-body::-webkit-scrollbar {
      width: 6px;
    }

    .sos-body::-webkit-scrollbar-track {
      background: transparent;
    }

    .sos-body::-webkit-scrollbar-thumb {
      background: #E0E0E0;
      border-radius: 3px;
    }

    .sos-body::-webkit-scrollbar-thumb:hover {
      background: #D0D0D0;
    }

    .sos-msg {
      display: flex;
      gap: 8px;
      animation: fadeIn 0.3s ease;
      margin-bottom: 0;
    }

    @keyframes fadeIn {
      from { 
        opacity: 0; 
        transform: translateY(6px);
      }
      to { 
        opacity: 1; 
        transform: translateY(0);
      }
    }

    .sos-msg.bot {
      justify-content: flex-start;
    }

    .sos-msg.user {
      justify-content: flex-end;
    }

    .sos-msg-content {
      max-width: 85%;
      padding: 11px 14px;
      border-radius: 14px;
      line-height: 1.45;
      font-size: 13px;
      word-wrap: break-word;
      letter-spacing: 0.1px;
    }

    .sos-msg.bot .sos-msg-content {
      background: #F0F0F5;
      color: #333;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    .sos-msg.user .sos-msg-content {
      background: #FF6B35;
      color: #FFFFFF;
      box-shadow: 0 2px 6px rgba(255, 107, 53, 0.25);
    }

    .sos-service-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 4px 0;
    }

    .sos-service-option {
      padding: 13px 14px;
      background: #F8F8FA;
      border: 1.5px solid #E8E8EC;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.25s ease;
      font-size: 13px;
      font-weight: 500;
      color: #1A1A1A;
      text-align: left;
      font-family: inherit;
      letter-spacing: 0.1px;
    }

    .sos-service-option:hover {
      background: #F0F0F8;
      border-color: #FF6B35;
      transform: translateX(3px);
      box-shadow: 0 3px 8px rgba(255, 107, 53, 0.12);
    }

    .sos-service-option:active {
      background: #EEE;
      transform: translateX(1px);
    }

    .sos-form {
      background: #F9F9FB;
      border: 1.5px solid #E8E8EC;
      border-radius: 14px;
      padding: 14px;
      margin: 4px 0;
    }

    .sos-form-group {
      margin-bottom: 12px;
    }

    .sos-form-group label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: #1A1A1A;
      margin-bottom: 6px;
      letter-spacing: 0.1px;
    }

    .sos-form-group input {
      width: 100%;
      padding: 10px 12px;
      border: 1.5px solid #E0E0E8;
      border-radius: 10px;
      font-size: 13px;
      font-family: inherit;
      box-sizing: border-box;
      transition: all 0.2s;
      background: #FFFFFF;
      color: #1A1A1A;
    }

    .sos-form-group input::placeholder {
      color: #AAA;
    }

    .sos-form-group input:focus {
      outline: none;
      border-color: #FF6B35;
      box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.12);
    }

    .sos-submit-btn {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #FF6B35 0%, #F55A22 100%);
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      transition: all 0.3s ease;
      margin-top: 8px;
      font-family: inherit;
      letter-spacing: 0.2px;
      box-shadow: 0 4px 12px rgba(255, 107, 53, 0.2);
    }

    .sos-submit-btn:hover {
      background: linear-gradient(135deg, #F55A22 0%, #E84C0F 100%);
      box-shadow: 0 6px 16px rgba(255, 107, 53, 0.3);
      transform: translateY(-2px);
    }

    .sos-submit-btn:active {
      background: linear-gradient(135deg, #E84C0F 0%, #D93F00 100%);
      transform: translateY(0);
    }

    .sos-success {
      background: #F0FAF0;
      border: 1.5px solid #B8E6B8;
      border-radius: 12px;
      color: #2D5F2D;
      padding: 12px 14px;
      font-size: 13px;
      margin: 4px 0;
      font-weight: 500;
      line-height: 1.45;
      box-shadow: 0 2px 6px rgba(45, 95, 45, 0.1);
    }

    .sos-service-description {
      background: #F9F9FB;
      border: 1.5px solid #E8E8EC;
      border-radius: 14px;
      padding: 12px 14px;
      margin: 4px 0;
      font-size: 13px;
      color: #555;
      line-height: 1.5;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .sos-service-description strong {
      display: block;
      color: #FF6B35;
      margin-bottom: 8px;
      font-size: 13px;
      margin-top: 10px;
      font-weight: 600;
    }

    .sos-service-description strong:first-child {
      margin-top: 0;
    }

    .sos-features-list {
      margin: 10px 0;
      padding-left: 18px;
    }

    .sos-features-list li {
      margin: 5px 0;
      color: #555;
      font-size: 13px;
      line-height: 1.4;
    }

    .sos-back-btn-inline {
      padding: 13px 14px;
      background: #F8F8FA;
      border: 1.5px solid #E8E8EC;
      border-radius: 12px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      color: #1A1A1A;
      transition: all 0.25s ease;
      font-family: inherit;
      letter-spacing: 0.1px;
      display: inline-block;
    }

    .sos-back-btn-inline:hover {
      background: #F0F0F8;
      border-color: #FF6B35;
      transform: translateX(3px);
      box-shadow: 0 3px 8px rgba(255, 107, 53, 0.12);
    }

    .sos-back-btn-inline:active {
      background: #EEE;
      transform: translateX(1px);
    }

    .sos-faq-item {
      background: #F9F9FB;
      border: 1.5px solid #E8E8EC;
      border-radius: 12px;
      margin: 6px 0;
      overflow: hidden;
    }

    .sos-faq-question {
      padding: 12px 14px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      color: #1A1A1A;
      background: #F9F9FB;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.2s ease;
    }

    .sos-faq-question:hover {
      background: #F0F0F8;
      color: #FF6B35;
    }

    .sos-faq-toggle {
      font-size: 16px;
      transition: transform 0.3s ease;
    }

    .sos-faq-item.open .sos-faq-toggle {
      transform: rotate(180deg);
    }

    .sos-faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
      padding: 0 14px;
    }

    .sos-faq-item.open .sos-faq-answer {
      max-height: 500px;
      padding: 12px 14px;
      border-top: 1px solid #E8E8EC;
    }

    .sos-faq-answer {
      font-size: 12px;
      color: #555;
      line-height: 1.5;
    }

    .sos-links-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 8px 0;
    }

    .sos-link-button {
      padding: 12px 14px;
      background: linear-gradient(135deg, #FF6B35 0%, #F55A22 100%);
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      transition: all 0.25s ease;
      font-family: inherit;
      text-align: left;
      box-shadow: 0 3px 8px rgba(255, 107, 53, 0.15);
    }

    .sos-link-button:hover {
      background: linear-gradient(135deg, #F55A22 0%, #E84C0F 100%);
      box-shadow: 0 5px 12px rgba(255, 107, 53, 0.25);
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      #sos-chat-window {
        width: calc(100% - 32px);
        right: 16px;
        left: 16px;
        height: calc(100vh - 140px);
        max-height: 520px;
        bottom: 70px;
      }
      #sos-chat-icon {
        width: 65px;
        height: 48px;
        font-size: 22px;
      }
    }
  `;
  
  document.head.appendChild(styles);

  // All SOS Services - Complete List
  const ALL_SERVICES = [
    {
      id: 'it-network',
      name: 'IT Network Solutions',
      description: 'Enterprise-grade IT Network Solutions providing robust infrastructure, cloud connectivity, and secure network architecture for organizations of all sizes.',
      features: [
        'Cloud infrastructure setup and management',
        'VPN and secure connectivity solutions',
        'Network security and advanced firewalls',
        'Disaster recovery and business continuity',
        'Network monitoring and maintenance',
        'IT infrastructure consulting',
        'Data center optimization'
      ]
    },
    {
      id: 'connectivity',
      name: 'Connectivity Solutions',
      description: 'Modern connectivity solutions including both wired and wireless infrastructure, optimized for business performance and reliability.',
      features: [
        'Wired and wireless network infrastructure',
        'SD-WAN (Software-Defined WAN) solutions',
        'Broadband optimization and management',
        'Network redundancy and failover systems',
        '24/7 connectivity support',
        'Fiber optic installation and management',
        'Multi-carrier management'
      ]
    },
    {
      id: 'security',
      name: 'Security & Surveillance',
      description: 'Comprehensive security and surveillance systems designed to protect your assets and personnel with state-of-the-art monitoring technology.',
      features: [
        'Advanced CCTV and camera systems',
        'Access control and biometric systems',
        'Real-time surveillance monitoring',
        'Security incident management',
        'Alarm and alert systems',
        'Facial recognition technology',
        'Security audit and assessment',
        'Cybersecurity consulting'
      ]
    },
    {
      id: 'data-analytics',
      name: 'Data & BI Analytics',
      description: 'Transform your raw data into strategic insights using our advanced Business Intelligence and Analytics platforms.',
      features: [
        'Data warehousing and management',
        'Advanced analytics and business reports',
        'Real-time dashboards and visualizations',
        'Predictive analytics and forecasting',
        'Data-driven decision support',
        'ETL (Extract, Transform, Load) solutions',
        'Big data processing and analysis',
        'Custom KPI development'
      ]
    },
    {
      id: 'software',
      name: 'Software Engineering',
      description: 'Custom software solutions from concept to deployment, with ongoing support and maintenance for your business applications.',
      features: [
        'Custom application development',
        'API development and third-party integration',
        'Application modernization and migration',
        'Technical support and maintenance',
        'Quality assurance and testing',
        'Mobile app development',
        'Web application development',
        'Legacy system transformation'
      ]
    },
    {
      id: 'ai',
      name: 'AI Intelligent Systems',
      description: 'Leverage artificial intelligence and automation to optimize operations, improve decision-making, and drive business efficiency.',
      features: [
        'Process automation and workflow optimization',
        'Intelligent monitoring and alert systems',
        'AI-powered data analytics',
        'Smart decision support systems',
        'Machine learning implementations',
        'Natural language processing',
        'Chatbot development and deployment',
        'Computer vision applications'
      ]
    }
  ];

  // Extended Service Details - Benefits, Use Cases, etc.
  const SERVICE_DETAILS = {
    'it-network': {
      benefits: 'Improved uptime (99.9%), reduced infrastructure costs by 30-40%, enhanced security, seamless scalability, better disaster recovery',
      useCases: 'Enterprise migrations to cloud, multi-branch network consolidation, hybrid cloud setup, mission-critical infrastructure',
      implementation: 'Assessment (1 week) → Design (2 weeks) → Deployment (3-4 weeks) → Optimization (ongoing)',
      successStories: 'Helped 500+ enterprises move to cloud, reduced client downtime by 95%, saved clients $2M+ in infrastructure costs',
      comparison: 'Our 24/7 managed services vs industry standard reactive support. 99.99% uptime SLA vs 99.5% competitor average',
      whyChooseUs: 'Expert team with 15+ years experience, 24/7 dedicated support, guaranteed uptime SLA, end-to-end solutions'
    },
    'connectivity': {
      benefits: 'Ultra-fast speeds (up to 10Gbps), 99.99% uptime guarantee, 20-35% cost reduction via SD-WAN, intelligent traffic routing',
      useCases: 'Multi-location business connectivity, disaster recovery links, ISP failover setup, bandwidth-intensive operations',
      implementation: 'Site survey (3-5 days) → Equipment setup (1-2 weeks) → Configuration & testing (1 week) → Go-live & monitoring',
      successStories: 'Connected 1000+ sites globally, reduced latency by 60%, eliminated connectivity bottlenecks for 200+ clients',
      comparison: 'SD-WAN reduces WAN costs by 30-40% vs traditional solutions. Our redundancy ensures zero downtime vs competitor 99.5% SLA',
      whyChooseUs: 'Multi-carrier expertise, SD-WAN specialists, proven global reach, proactive optimization, instant failover'
    },
    'security': {
      benefits: '24/7 real-time monitoring, instant threat detection/response, 99.9% threat prevention rate, compliance with ISO/GDPR, peace of mind',
      useCases: 'Retail store surveillance, office access control, facility perimeter security, critical asset monitoring, incident investigation',
      implementation: 'Audit (1 week) → System design (2 weeks) → Installation (2-3 weeks) → Training & monitoring setup',
      successStories: 'Deployed 50+ surveillance systems preventing $5M+ in losses, installed facial recognition in 100+ facilities',
      comparison: 'Our AI-powered detection catches 99.9% threats vs 95% traditional methods. Real-time alerts vs 2-hour delays in competitors',
      whyChooseUs: 'AI-powered threat detection, facial recognition experts, 24/7 monitoring team, forensic analysis capability, compliance guaranteed'
    },
    'data-analytics': {
      benefits: '50-70% faster decision-making, identify hidden revenue opportunities ($500K+ annually), reduce operational costs by 25%',
      useCases: 'Sales forecasting, customer behavior analysis, operational efficiency optimization, fraud detection, market trend analysis',
      implementation: 'Data audit (2 weeks) → Warehouse setup (4 weeks) → Dashboard creation (2 weeks) → Training & optimization',
      successStories: 'Helped clients identify $100M+ in revenue opportunities, improved forecast accuracy from 70% to 95%+',
      comparison: 'Real-time dashboards vs monthly reports from competitors. Predictive accuracy 94% vs industry average 75-80%',
      whyChooseUs: 'Advanced ML algorithms, real-time processing, predictive accuracy experts, user-friendly dashboards, ROI-focused approach'
    },
    'software': {
      benefits: 'Custom-built for your needs (not off-shelf compromise), 40% faster time-to-market, scalable & future-proof, ongoing optimization',
      useCases: 'ERP systems, mobile banking apps, internal workflow automation, e-commerce platforms, AI-powered applications',
      implementation: 'Requirements gathering (2 weeks) → Design (3 weeks) → Development (8-16 weeks) → Testing & deployment (2 weeks)',
      successStories: 'Developed 500+ applications for Fortune 500 companies, achieved 99.9% uptime for mission-critical apps',
      comparison: 'Custom solutions scale infinitely. Off-shelf software costs 3-5x more for customization vs our purpose-built apps',
      whyChooseUs: 'Award-winning developers, agile methodology, latest tech stack, post-launch support for 5+ years, zero vendor lock-in'
    },
    'ai': {
      benefits: 'Automate 60-80% of repetitive work, reduce operational costs by 40-50%, improve decision accuracy by 20-30%, 10x faster processing',
      useCases: 'Customer service automation (chatbots), predictive maintenance, fraud detection, document processing, inventory optimization',
      implementation: 'Problem definition (1 week) → Data preparation (2-3 weeks) → Model training (3-4 weeks) → Deployment & optimization',
      successStories: 'Automated processes for 200+ companies saving $50M+ annually, deployed 1000+ AI models with 90%+ accuracy',
      comparison: 'Our ML models achieve 92-98% accuracy vs industry average 75-85%. Automation reduces costs 40% vs 15% with competitors',
      whyChooseUs: 'AI/ML experts with 100+ implementations, proprietary algorithms, continuous learning & optimization, proven ROI'
    }
  };

  // Create chat bubble HTML
  const html = `
    <div id="sos-chat-bubble">
      <div id="sos-chat-icon" title="Start Chat">
        <svg width="52" height="38" viewBox="0 0 52 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M42 14C45.866 14 49 17.134 49 21C49 24.866 45.866 28 42 28H10C4.477 28 0 23.523 0 18C0 13.029 3.996 9 9 9C9.644 3.817 14.288 0 19.5 0C23.038 0 26.153 1.659 28 4.238C29.394 3.474 31.068 3 33 3C37.418 3 41 6.582 41 11C41.647 11.312 42.308 11.642 42.984 12C45.077 12.993 46.661 14.373 42 14Z" fill="#FF6B35" opacity="0.9"/>
          <path d="M42 14C45.866 14 49 17.134 49 21C49 24.866 45.866 28 42 28H10C4.477 28 0 23.523 0 18C0 13.029 3.996 9 9 9C9.644 3.817 14.288 0 19.5 0C23.038 0 26.153 1.659 28 4.238C29.394 3.474 31.068 3 33 3C37.418 3 41 6.582 41 11C41.647 11.312 42.308 11.642 42.984 12C45.077 12.993 46.661 14.373 42 14Z" stroke="#FF6B35" stroke-width="0.5" fill="none" opacity="0.3"/>
        </svg>
      </div>
      
      <div id="sos-chat-window">
        <div class="sos-header">
          <h3>SOS Support</h3>
          <button id="sos-close">×</button>
        </div>
        
        <div class="sos-body" id="sos-body">
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', html);

  // Initialize the chatbot
  function init() {
    console.log('Professional chatbot loaded');
    
    const icon = document.getElementById('sos-chat-icon');
    const window_el = document.getElementById('sos-chat-window');
    const closeBtn = document.getElementById('sos-close');
    const body = document.getElementById('sos-body');

    if (!icon || !body) {
      console.error('Chatbot DOM elements not found');
      return;
    }

    // State management
    let selectedService = null;
    let conversationStep = 0;

    // Helper to add bot message with typing indicator
    function addBotMessage(text) {
      const msg = document.createElement('div');
      msg.className = 'sos-msg bot';
      msg.innerHTML = `<div class="sos-msg-content"><div class="sos-typing"><span></span><span></span><span></span></div></div>`;
      body.appendChild(msg);
      body.scrollTop = body.scrollHeight;
      
      // Replace typing animation with actual message after delay
      setTimeout(() => {
        msg.innerHTML = `<div class="sos-msg-content">${text}</div>`;
        body.scrollTop = body.scrollHeight;
      }, 800);
    }

    // Helper to add user message
    function addUserMessage(text) {
      const msg = document.createElement('div');
      msg.className = 'sos-msg user';
      msg.innerHTML = `<div class="sos-msg-content">${text}</div>`;
      body.appendChild(msg);
      body.scrollTop = body.scrollHeight;
    }

    // Toggle chat window
    icon.addEventListener('click', () => {
      const isActive = window_el.classList.toggle('active');
      icon.classList.toggle('active', isActive);
      
      if (isActive && body.children.length === 0) {
        window.startConversation();
      }
    });

    // Close chat window
    closeBtn.addEventListener('click', () => {
      window_el.classList.remove('active');
      icon.classList.remove('active');
    });

    // Start conversation - make it accessible globally
    window.startConversation = function() {
      body.innerHTML = '';
      conversationStep = 0;
      selectedService = null;

      addBotMessage('Welcome to SOS Infocity. How can we assist you today?');

      setTimeout(() => {
        showServiceOptions();
      }, 1200);
    };

    // Show service selection
    function showServiceOptions() {
      const optionsDiv = document.createElement('div');
      optionsDiv.className = 'sos-service-options';

      ALL_SERVICES.forEach(service => {
        const btn = document.createElement('button');
        btn.className = 'sos-service-option';
        btn.textContent = service.name;
        btn.onclick = () => selectService(service);
        optionsDiv.appendChild(btn);
      });

      body.appendChild(optionsDiv);
      body.scrollTop = body.scrollHeight;
    }

    // Select a service
    function selectService(service) {
      selectedService = service;
      addUserMessage(service.name);

      setTimeout(() => {
        showServiceDetails(service);
      }, 400);
    }

    // Service URLs mapping
    const serviceUrls = {
      'it-network': 'pages/it-network-solutions.html',
      'connectivity': 'pages/connectivity-solutions.html',
      'security': 'pages/security-surveillance.html',
      'data-analytics': 'pages/data-bi-analytics.html',
      'software': 'pages/software-engineering.html',
      'ai': 'pages/ai-intelligent-solutions.html'
    };

    // Show service details
    function showServiceDetails(service) {
      addBotMessage('Here are details about ' + service.name + ':');

      setTimeout(() => {
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'sos-service-description';
        detailsDiv.innerHTML = `
          <strong>${service.name}</strong>
          <div>${service.description}</div>
          <strong>Capabilities:</strong>
          <ul class="sos-features-list">
            ${service.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        `;
        body.appendChild(detailsDiv);

        // Redirect button to service page
        const redirectBtn = document.createElement('button');
        redirectBtn.className = 'sos-link-button';
        redirectBtn.innerHTML = '🔗 Learn More on ' + service.name + ' Page';
        redirectBtn.onclick = () => window.open(serviceUrls[service.id], '_blank');
        redirectBtn.style.width = '100%';
        redirectBtn.style.marginTop = '8px';
        redirectBtn.style.marginBottom = '12px';
        body.appendChild(redirectBtn);

        // Service Extended Details (Benefits, Use Cases, etc.) - As clickable buttons
        setTimeout(() => {
          addBotMessage('Explore more about this service:');
          
          setTimeout(() => {
            const detailsData = SERVICE_DETAILS[service.id];
            const detailsButtonDiv = document.createElement('div');
            detailsButtonDiv.style.display = 'grid';
            detailsButtonDiv.style.gridTemplateColumns = '1fr 1fr';
            detailsButtonDiv.style.gap = '8px';
            detailsButtonDiv.style.marginTop = '8px';
            detailsButtonDiv.style.marginBottom = '8px';
            
            const detailItems = [
              { title: 'Benefits', key: 'benefits', content: detailsData.benefits },
              { title: 'Use Cases', key: 'useCases', content: detailsData.useCases },
              { title: 'Implementation', key: 'implementation', content: detailsData.implementation },
              { title: 'Success Stories', key: 'successStories', content: detailsData.successStories },
              { title: 'Why Choose Us', key: 'whyChooseUs', content: detailsData.whyChooseUs }
            ];
            
            detailItems.forEach((item) => {
              const btn = document.createElement('button');
              btn.className = 'sos-service-option';
              btn.textContent = item.title;
              btn.onclick = function() {
                addUserMessage(item.title);
                setTimeout(() => {
                  addBotMessage(item.content);
                  setTimeout(() => {
                    showServiceMenu(service);
                  }, 800);
                }, 300);
              };
              detailsButtonDiv.appendChild(btn);
            });
            
            body.appendChild(detailsButtonDiv);
            body.scrollTop = body.scrollHeight;
          }, 600);
        }, 400);

        body.scrollTop = body.scrollHeight;
      }, 500);
    }

    // Show service menu buttons
    function showServiceMenu(service) {
      const menuDiv = document.createElement('div');
      menuDiv.style.display = 'grid';
      menuDiv.style.gridTemplateColumns = '1fr 1fr';
      menuDiv.style.gap = '8px';
      menuDiv.style.marginTop = '12px';
      menuDiv.style.marginBottom = '8px';
      
      // Store current service for FAQ
      window.currentService = service;
      
      // Get Details button (full width, orange CTA)
      const detailsBtn = document.createElement('button');
      detailsBtn.className = 'sos-service-option';
      detailsBtn.textContent = 'Get Details';
      detailsBtn.style.gridColumn = '1 / -1';
      detailsBtn.style.background = 'linear-gradient(135deg, #FF6B35 0%, #F55A22 100%)';
      detailsBtn.style.color = '#FFFFFF';
      detailsBtn.style.borderColor = '#FF6B35';
      detailsBtn.onclick = function() {
        window.sosGetDetails();
      };
      menuDiv.appendChild(detailsBtn);
      
      // View FAQ (uniform gray)
      const viewFaqBtn = document.createElement('button');
      viewFaqBtn.className = 'sos-service-option';
      viewFaqBtn.textContent = 'View FAQ';
      viewFaqBtn.onclick = function() {
        addUserMessage('View FAQ');
        setTimeout(() => {
          window.showServiceFAQ(service);
        }, 300);
      };
      menuDiv.appendChild(viewFaqBtn);
      
      // Other Services (uniform gray)
      const otherServicesBtn = document.createElement('button');
      otherServicesBtn.className = 'sos-service-option';
      otherServicesBtn.textContent = 'Other Services';
      otherServicesBtn.onclick = function() {
        window.sosBackToServices();
      };
      menuDiv.appendChild(otherServicesBtn);
      
      // No, Thank You (full width, uniform gray)
      const noThankBtn = document.createElement('button');
      noThankBtn.className = 'sos-service-option';
      noThankBtn.textContent = 'No, Thank You';
      noThankBtn.style.gridColumn = '1 / -1';
      noThankBtn.onclick = function() {
        addUserMessage('No, thank you.');
        setTimeout(() => {
          addBotMessage('Thank you for your interest. Feel free to reach out anytime!');
        }, 300);
      };
      menuDiv.appendChild(noThankBtn);
      
      body.appendChild(menuDiv);
      body.scrollTop = body.scrollHeight;
    }

    // Show service-specific FAQs (called from menu)
    window.showServiceFAQ = function(service) {
      addBotMessage('Frequently asked questions about ' + service.name + ':');
      
      setTimeout(() => {
        const faqDiv = document.createElement('div');
        faqDiv.style.marginTop = '8px';

        // Get service-specific FAQs
        const serviceFaqs = SERVICE_FAQS[service.id] || SERVICE_FAQS['it-network'];
        serviceFaqs.forEach((faq, index) => {
          const faqItem = document.createElement('div');
          faqItem.className = 'sos-faq-item';
          faqItem.innerHTML = `
            <div class="sos-faq-question">
              <span>${faq.question}</span>
              <span class="sos-faq-toggle">▼</span>
            </div>
            <div class="sos-faq-answer">${faq.answer}</div>
          `;

          faqItem.querySelector('.sos-faq-question').addEventListener('click', function() {
            faqItem.classList.toggle('open');
          });

          faqDiv.appendChild(faqItem);
        });

        body.appendChild(faqDiv);
        body.scrollTop = body.scrollHeight;

        // Show menu again after FAQ
        setTimeout(() => {
          showServiceMenu(service);
        }, 600);
      }, 1200);
    };

    // User wants to get details (renamed from interested)
    window.sosGetDetails = function() {
      addUserMessage('Yes, I want to get details.');
      selectedService = null;

      setTimeout(() => {
        addBotMessage('Please share your details so we can reach out.');

        setTimeout(() => {
          showCustomerForm();
        }, 1200);
      }, 300);
    };

    // Show customer form
    function showCustomerForm() {
      const formDiv = document.createElement('div');
      formDiv.className = 'sos-form';
      formDiv.innerHTML = `
        <div class="sos-form-group">
          <label>Full Name *</label>
          <input type="text" id="sos-name" placeholder="Your full name" required>
        </div>

        <div class="sos-form-group">
          <label>Email *</label>
          <input type="email" id="sos-email" placeholder="your@email.com" required>
        </div>

        <div class="sos-form-group">
          <label>Phone Number *</label>
          <input type="tel" id="sos-phone" placeholder="+91-XXXXXXXXXX" required>
        </div>

        <div class="sos-form-group">
          <label>Company</label>
          <input type="text" id="sos-company" placeholder="Company name (optional)">
        </div>

        <div class="sos-form-group">
          <label>Message / Questions</label>
          <input type="text" id="sos-message" placeholder="Tell us more about your needs..." style="min-height: 50px; padding: 10px 12px; resize: none;">
        </div>

        <div class="sos-form-group">
          <label>Services You're Interested In *</label>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <label style="display: flex; align-items: center; gap: 8px; margin: 0; font-weight: 400;">
              <input type="checkbox" id="service-it" value="IT Network Solutions"> IT Network Solutions
            </label>
            <label style="display: flex; align-items: center; gap: 8px; margin: 0; font-weight: 400;">
              <input type="checkbox" id="service-connectivity" value="Connectivity Solutions"> Connectivity Solutions
            </label>
            <label style="display: flex; align-items: center; gap: 8px; margin: 0; font-weight: 400;">
              <input type="checkbox" id="service-security" value="Security & Surveillance"> Security & Surveillance
            </label>
            <label style="display: flex; align-items: center; gap: 8px; margin: 0; font-weight: 400;">
              <input type="checkbox" id="service-data" value="Data & BI Analytics"> Data & BI Analytics
            </label>
            <label style="display: flex; align-items: center; gap: 8px; margin: 0; font-weight: 400;">
              <input type="checkbox" id="service-software" value="Software Engineering"> Software Engineering
            </label>
            <label style="display: flex; align-items: center; gap: 8px; margin: 0; font-weight: 400;">
              <input type="checkbox" id="service-ai" value="AI Intelligent Systems"> AI Intelligent Systems
            </label>
          </div>
        </div>

        <button class="sos-submit-btn" onclick="sosSubmitForm()">Submit & Send to Email</button>
      `;
      body.appendChild(formDiv);
      body.scrollTop = body.scrollHeight;

      window.sosSubmitForm = function() {
        const name = document.getElementById('sos-name').value.trim();
        const email = document.getElementById('sos-email').value.trim();
        const phone = document.getElementById('sos-phone').value.trim();
        const company = document.getElementById('sos-company').value.trim();
        const message = document.getElementById('sos-message').value.trim();
        
        const selectedServices = [];
        ['service-it', 'service-connectivity', 'service-security', 'service-data', 'service-software', 'service-ai'].forEach(id => {
          const checkbox = document.getElementById(id);
          if (checkbox && checkbox.checked) {
            selectedServices.push(checkbox.value);
          }
        });

        if (!name || !email || !phone) {
          alert('Please fill in: Name, Email, and Phone Number');
          return;
        }

        if (!email.includes('@')) {
          alert('Please enter a valid email');
          return;
        }

        if (selectedServices.length === 0) {
          alert('Please select at least one service');
          return;
        }

        // Prepare data for submission
        const submissionData = {
          name: name,
          email: email,
          phone: phone,
          company: company,
          message: message,
          services: selectedServices,
          timestamp: new Date().toLocaleString(),
          serviceSelected: selectedService ? selectedService.name : 'Multiple Services'
        };

        // Submit to backend
        submitToBackend(submissionData, name);
      };
    }

    // Submit to backend
    function submitToBackend(data, userName) {
      // Formspree endpoint - no backend needed!
      const formspreeUrl = 'https://formspree.io/f/mreakqap';
      
      addUserMessage(userName);

      setTimeout(() => {
        addBotMessage('Processing your submission...');

        // Send to Formspree as JSON
        fetch(formspreeUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            company: data.company,
            message: data.message,
            services: data.services.join(', '),
            timestamp: data.timestamp
          })
        }).catch(err => {
          console.log('Formspree submission error:', err);
        }).finally(() => {
          setTimeout(() => {
            showSubmissionSuccess(data.name, data.email);
          }, 1200);
        });
      }, 300);
    }

    // Show submission success
    function showSubmissionSuccess(name, email) {
      addBotMessage('Thank you, ' + name + '.');

      setTimeout(() => {
        const successDiv = document.createElement('div');
        successDiv.className = 'sos-success';
        successDiv.innerHTML = `Your inquiry has been received. We will contact you at <strong>${email}</strong> within 24 hours.`;
        body.appendChild(successDiv);

        setTimeout(() => {
          addBotMessage('What else can we help you with?');

          setTimeout(() => {
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'sos-service-options';
            
            const faqBtn = document.createElement('button');
            faqBtn.className = 'sos-service-option';
            faqBtn.textContent = 'View FAQ';
            faqBtn.onclick = () => showFAQ();
            optionsDiv.appendChild(faqBtn);

            const solutionsBtn = document.createElement('button');
            solutionsBtn.className = 'sos-service-option';
            solutionsBtn.textContent = 'Explore Solutions';
            solutionsBtn.onclick = () => showSolutions();
            optionsDiv.appendChild(solutionsBtn);

            const continueBtn = document.createElement('button');
            continueBtn.className = 'sos-service-option';
            continueBtn.textContent = 'Explore Other Services';
            continueBtn.onclick = () => startConversation();
            optionsDiv.appendChild(continueBtn);

            const endBtn = document.createElement('button');
            endBtn.className = 'sos-service-option';
            endBtn.textContent = 'No, Thank You';
            endBtn.onclick = () => {
              addUserMessage('No, thank you.');
              setTimeout(() => {
                addBotMessage('Thank you for reaching out. Have a great day!');
              }, 300);
            };
            optionsDiv.appendChild(endBtn);
            body.appendChild(optionsDiv);
            body.scrollTop = body.scrollHeight;
          }, 500);
        }, 800);
      }, 300);
    }

    // FAQ Data
    // Service-specific FAQ data
    const SERVICE_FAQS = {
      'it-network': [
        { question: 'What does IT Network Solutions include?', answer: 'Our IT Network Solutions provide comprehensive infrastructure setup, cloud connectivity, network security, monitoring, and consulting services tailored to your organization size and complexity.' },
        { question: 'How do you ensure network security?', answer: 'We implement advanced firewalls, intrusion detection systems, VPN solutions, regular security audits, and continuous monitoring to protect your network from threats.' },
        { question: 'Can you help with cloud migration?', answer: 'Yes, we specialize in cloud infrastructure setup and management. We help migrate your existing systems to cloud platforms while ensuring zero downtime and data integrity.' },
        { question: 'What is your disaster recovery plan?', answer: 'We implement comprehensive disaster recovery strategies including data backup, redundant systems, failover mechanisms, and regular disaster recovery testing to minimize downtime.' },
        { question: 'Do you provide 24/7 network monitoring?', answer: 'Yes, our network monitoring and maintenance services include 24/7 monitoring with immediate alerts for any issues, ensuring your network remains operational at all times.' }
      ],
      'connectivity': [
        { question: 'What connectivity solutions do you offer?', answer: 'We provide both wired and wireless infrastructure, SD-WAN solutions, broadband optimization, fiber optic installation, and multi-carrier management for maximum reliability.' },
        { question: 'What is SD-WAN and how does it help?', answer: 'SD-WAN (Software-Defined WAN) optimizes your network traffic, reduces costs, and improves performance by intelligently routing data across multiple types of connections.' },
        { question: 'Can you handle multiple internet providers?', answer: 'Yes, our multi-carrier management solution allows you to use multiple ISPs simultaneously for load balancing, redundancy, and optimized performance.' },
        { question: 'How quickly can you deploy wireless infrastructure?', answer: 'Our wireless deployment typically takes 1-2 weeks depending on coverage area size. We conduct site surveys and provide detailed implementation timelines.' },
        { question: 'Do you provide failover and redundancy?', answer: 'Absolutely. We implement network redundancy and automatic failover systems to ensure continuous connectivity even if one connection fails.' }
      ],
      'security': [
        { question: 'What surveillance systems do you recommend?', answer: 'We recommend advanced HD/4K CCTV cameras with AI-powered features, real-time monitoring capabilities, and cloud storage for continuous security coverage.' },
        { question: 'How does facial recognition technology work?', answer: 'Our facial recognition system uses AI algorithms to identify individuals from camera feeds, enabling automatic alerts for unauthorized personnel and detailed audit trails.' },
        { question: 'Can I access surveillance from my phone?', answer: 'Yes, all our surveillance systems include mobile app access for real-time viewing, instant alerts, and recorded footage access from anywhere.' },
        { question: 'What access control options are available?', answer: 'We offer RFID cards, biometric (fingerprint/face), PIN codes, and smartphone-based access control with detailed audit logging and integration with your security system.' },
        { question: 'How is my video data secured?', answer: 'All video data is encrypted both in transit and at rest. We offer on-premises storage, cloud backup, and comply with data protection regulations.' }
      ],
      'data-analytics': [
        { question: 'How can BI analytics improve my business?', answer: 'Business Intelligence transforms raw data into actionable insights, enabling data-driven decisions, identifying trends, improving efficiency, and increasing profitability.' },
        { question: 'What is a data warehouse?', answer: 'A data warehouse is a centralized repository where data from multiple sources is consolidated, cleaned, and organized for efficient analysis and reporting.' },
        { question: 'How real-time are your dashboards?', answer: 'Our real-time dashboards update instantly as new data comes in, providing live insights into business metrics, KPIs, and performance indicators.' },
        { question: 'Can you predict future trends?', answer: 'Yes, our predictive analytics use machine learning algorithms to forecast future trends, customer behavior, and business outcomes with high accuracy.' },
        { question: 'How long does an analytics project take?', answer: 'A typical BI implementation takes 2-4 months depending on data complexity and requirements. We provide detailed project timelines during the planning phase.' }
      ],
      'software': [
        { question: 'What types of applications do you develop?', answer: 'We develop custom web applications, mobile apps (iOS/Android), enterprise software, APIs, and integration solutions tailored to your business requirements.' },
        { question: 'How do you ensure software quality?', answer: 'We follow strict QA processes including automated testing, code reviews, security scanning, performance testing, and multiple rounds of manual testing before deployment.' },
        { question: 'Do you provide post-deployment support?', answer: 'Yes, we offer comprehensive technical support, maintenance, bug fixes, performance optimization, and feature updates after deployment.' },
        { question: 'Can you modernize our legacy systems?', answer: 'Absolutely. We specialize in application modernization, helping you migrate legacy systems to modern platforms while preserving data and functionality.' },
        { question: 'How secure are your applications?', answer: 'We implement industry best practices including encryption, authentication, authorization, secure coding standards, and regular security audits to protect against vulnerabilities.' }
      ],
      'ai': [
        { question: 'What processes can be automated with AI?', answer: 'AI can automate data entry, document processing, customer support (chatbots), scheduling, reporting, anomaly detection, and many repetitive business processes.' },
        { question: 'How does machine learning improve accuracy?', answer: 'Machine learning algorithms learn from historical data patterns and continuously improve their accuracy over time, enabling more precise predictions and decisions.' },
        { question: 'What is natural language processing?', answer: 'NLP enables machines to understand, interpret, and respond to human language naturally. It powers chatbots, sentiment analysis, and intelligent document processing.' },
        { question: 'Can AI monitor my systems 24/7?', answer: 'Yes, our AI-powered monitoring systems continuously analyze system performance, detect anomalies, and send instant alerts for potential issues, ensuring 24/7 vigilance.' },
        { question: 'How do I get started with AI implementation?', answer: 'Contact us to discuss your business challenges. We assess your data, recommend suitable AI solutions, and provide a detailed implementation plan with timelines and ROI projections.' }
      ]
    };

    const FAQ_DATA = [
      {
        question: 'What is SOS Infocity?',
        answer: 'SOS Infocity is a technology solutions provider offering IT infrastructure, connectivity, security, data analytics, software engineering, and AI intelligent systems.'
      },
      {
        question: 'How can I get started with your services?',
        answer: 'You can fill out the contact form to share your requirements, and our team will reach out within 24 hours to discuss your needs and provide a customized solution.'
      },
      {
        question: 'Do you offer customized solutions?',
        answer: 'Yes, all our services are tailored to your specific business needs. We work closely with you to understand your requirements and deliver solutions that fit perfectly.'
      },
      {
        question: 'What is your support availability?',
        answer: 'We provide 24/7 support for critical issues. Regular support hours are Monday to Friday, 9 AM to 6 PM. Emergency support is available round the clock.'
      },
      {
        question: 'How long does implementation usually take?',
        answer: 'Implementation timelines vary based on project complexity. Simple projects take 2-4 weeks, while enterprise solutions may take 2-3 months. We provide a detailed timeline during the planning phase.'
      },
      {
        question: 'Do you provide training for implemented solutions?',
        answer: 'Yes, comprehensive training is included with all implementations. We provide on-site or online training depending on your preference and location.'
      }
    ];

    // Show FAQ
    window.showFAQ = function() {
      addBotMessage('Here are some frequently asked questions:');

      setTimeout(() => {
        const faqDiv = document.createElement('div');
        faqDiv.style.marginTop = '8px';

        FAQ_DATA.forEach((faq, index) => {
          const faqItem = document.createElement('div');
          faqItem.className = 'sos-faq-item';
          faqItem.innerHTML = `
            <div class="sos-faq-question">
              <span>${faq.question}</span>
              <span class="sos-faq-toggle">▼</span>
            </div>
            <div class="sos-faq-answer">${faq.answer}</div>
          `;

          faqItem.querySelector('.sos-faq-question').addEventListener('click', function() {
            faqItem.classList.toggle('open');
          });

          faqDiv.appendChild(faqItem);
        });

        body.appendChild(faqDiv);

        setTimeout(() => {
          const backDiv = document.createElement('div');
          backDiv.style.marginTop = '12px';
          backDiv.innerHTML = `
            <button class="sos-service-option" style="width: 100%; margin-bottom: 6px;" onclick="window.sosBackToServices()">Explore Services</button>
            <button class="sos-service-option" style="width: 100%;" onclick="window.startConversation()">Main Menu</button>
          `;
          body.appendChild(backDiv);
          body.scrollTop = body.scrollHeight;
        }, 300);
      }, 400);
    };

    // Show Solutions with redirects
    window.showSolutions = function() {
      addBotMessage('Our Solutions:');

      setTimeout(() => {
        const linksDiv = document.createElement('div');
        linksDiv.className = 'sos-links-group';

        const solutions = [
          { name: '🌐 IT Network Solutions', url: '/pages/it-network-solutions.html' },
          { name: '📡 Connectivity Solutions', url: '/pages/connectivity-solutions.html' },
          { name: '🔐 Security & Surveillance', url: '/pages/security-surveillance.html' },
          { name: '📊 Data & BI Analytics', url: '/pages/data-bi-analytics.html' },
          { name: '💻 Software Engineering', url: '/pages/software-engineering.html' },
          { name: '🤖 AI Intelligent Systems', url: '/pages/ai-intelligent-solutions.html' }
        ];

        solutions.forEach(sol => {
          const btn = document.createElement('button');
          btn.className = 'sos-link-button';
          btn.textContent = sol.name;
          btn.onclick = () => {
            addUserMessage(sol.name);
            setTimeout(() => {
              window.open(sol.url, '_blank');
              addBotMessage('Opening ' + sol.name + '...');
            }, 200);
          };
          linksDiv.appendChild(btn);
        });

        body.appendChild(linksDiv);

        setTimeout(() => {
          const backDiv = document.createElement('div');
          backDiv.style.marginTop = '12px';
          backDiv.innerHTML = `
            <button class="sos-back-btn-inline" style="width: 100%;" onclick="sosBackToServices()">
              Back to Services
            </button>
          `;
          body.appendChild(backDiv);
          body.scrollTop = body.scrollHeight;
        }, 300);
      }, 400);
    };

    // Back to services
    window.sosBackToServices = function() {
      addUserMessage('Other Services');
      selectedService = null;

      setTimeout(() => {
        addBotMessage('Here are all our services:');

        setTimeout(() => {
          showServiceOptions();
          body.scrollTop = body.scrollHeight;
        }, 1200);
      }, 300);
    };

    // Start
    startConversation();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();