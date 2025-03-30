// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Detect touch devices
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }

    if (!isTouchDevice()) {
        document.body.classList.remove('touch-device');
    } else {
        document.body.classList.add('touch-device');
    }

    // Custom cursor
    if (!isTouchDevice()) {
        const cursorDot = document.querySelector('[data-cursor-dot]');
        const cursorOutline = document.querySelector('[data-cursor-outline]');

        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        });

        // Add hover effect to links and buttons for custom cursor
        document.querySelectorAll('a, button, .btn, input, textarea').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'scale(0.5)';
                cursorOutline.style.transform = 'scale(1.5)';
                cursorOutline.style.borderColor = 'var(--primary-color)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'scale(1)';
                cursorOutline.style.transform = 'scale(1)';
                cursorOutline.style.borderColor = 'var(--primary-color)';
            });
        });
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Language toggle
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Here you would implement language switching logic
            const lang = btn.getAttribute('data-lang');
            localStorage.setItem('language', lang);
        });
    });

    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    document.querySelector(`.lang-btn[data-lang="${savedLanguage}"]`).classList.add('active');

    // Typing animation
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const phrases = ['Backend Developer', 'Node.js Expert', 'API Developer', 'Database Specialist'];
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeText() {
            const phrase = phrases[currentPhrase];
            
            if (isDeleting) {
                typingText.textContent = phrase.substring(0, currentChar - 1);
                currentChar--;
                typingSpeed = 50;
            } else {
                typingText.textContent = phrase.substring(0, currentChar + 1);
                currentChar++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && currentChar === phrase.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pause at end
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
                typingSpeed = 500; // Pause before typing next phrase
            }
            
            setTimeout(typeText, typingSpeed);
        }
        
        setTimeout(typeText, 1000);
    }

    // Scroll animations
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('show');
            }
        });
    }

    // Initial check
    checkScroll();

    // Check on scroll
    window.addEventListener('scroll', checkScroll);

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Hide all panels
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Show corresponding panel
            const panelId = btn.getAttribute('data-tab') + '-panel';
            document.getElementById(panelId).classList.add('active');
        });
    });

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    const categories = item.getAttribute('data-category').split(' ');
                    
                    if (categories.includes(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });

    // Testimonial slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    const testimonialDots = document.querySelector('.testimonial-dots');

    if (testimonialTrack && testimonialItems.length > 0) {
        let currentSlide = 0;
        const slideWidth = 100; // 100%
        
        // Create dots
        testimonialItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            testimonialDots.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.testimonial-dot');
        
        // Set initial position
        testimonialTrack.style.transform = `translateX(0%)`;
        
        // Previous slide
        testimonialPrev.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonialItems.length) % testimonialItems.length;
            updateSlider();
        });
        
        // Next slide
        testimonialNext.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonialItems.length;
            updateSlider();
        });
        
        // Go to specific slide
        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
        }
        
        // Update slider position and active dot
        function updateSlider() {
            testimonialTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Auto slide
        let slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialItems.length;
            updateSlider();
        }, 5000);
        
        // Pause on hover
        testimonialTrack.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialTrack.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % testimonialItems.length;
                updateSlider();
            }, 5000);
        });
    }

    // Form validation
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate name
            const nameInput = document.getElementById('name');
            const nameError = nameInput.nextElementSibling;
            
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Name is required';
                nameError.style.display = 'block  === '') {
                nameError.textContent = 'Name is required';
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }
            
            // Validate email
            const emailInput = document.getElementById('email');
            const emailError = emailInput.nextElementSibling;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Email is required';
                emailError.style.display = 'block';
                isValid = false;
            } else if (!emailPattern.test(emailInput.value)) {
                emailError.textContent = 'Please enter a valid email';
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.style.display = 'none';
            }
            
            // Validate subject
            const subjectInput = document.getElementById('subject');
            const subjectError = subjectInput.nextElementSibling;
            
            if (subjectInput.value.trim() === '') {
                subjectError.textContent = 'Subject is required';
                subjectError.style.display = 'block';
                isValid = false;
            } else {
                subjectError.style.display = 'none';
            }
            
            // Validate message
            const messageInput = document.getElementById('message');
            const messageError = messageInput.nextElementSibling;
            
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Message is required';
                messageError.style.display = 'block';
                isValid = false;
            } else {
                messageError.style.display = 'none';
            }
            
            // If form is valid, submit
            if (isValid) {
                // Here you would typically send the form data to a server
                // For demonstration, we'll just show a success message
                contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you for contacting me. I'll get back to you soon.</p>
                    </div>
                `;
            }
        });
    }

    // Download CV
    const downloadCV = document.getElementById('downloadCV');
    if (downloadCV) {
        downloadCV.addEventListener('click', function(e) {
            e.preventDefault();
            // Here you would typically trigger a download
            alert('CV download would start here. Replace with actual download functionality.');
        });
    }

    // Cookie consent
    const cookieConsent = document.querySelector('.cookie-consent');
    const acceptCookies = document.getElementById('acceptCookies');
    const declineCookies = document.getElementById('declineCookies');

    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');

    if (!cookieChoice) {
        setTimeout(() => {
            cookieConsent.classList.add('active');
        }, 2000);
    }

    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('active');
    });

    declineCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.classList.remove('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.backgroundColor = 'var(--bg-color)';
        } else {
            header.style.boxShadow = 'none';
            header.style.backdropFilter = 'none';
            header.style.backgroundColor = 'var(--bg-color)';
        }
    });

    // Active navigation based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Initialize skill bars
    setTimeout(() => {
        document.querySelectorAll('.skill-progress').forEach(progress => {
            const width = progress.parentElement.previousElementSibling.querySelector('span').textContent;
            progress.style.width = width;
        });
    }, 1000);

    // Chatbot functionality
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotBox = document.querySelector('.chatbot-box');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-message-input');
    const chatbotSendBtn = document.getElementById('chatbot-send-btn');

    // Toggle chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotBox.classList.toggle('active');
    });

    // Close chatbot
    chatbotClose.addEventListener('click', () => {
        chatbotBox.classList.remove('active');
    });

    // Send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input
        chatbotInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Get response from API
        fetch(`https://api.agatz.xyz/api/degreeguru?message=${encodeURIComponent(message)}`)
            .then(response => response.json())
            .then(data => {
                // Remove typing indicator
                removeTypingIndicator();
                
                // Add bot response
                addMessage(data.response || "I'm sorry, I couldn't process your request at the moment.", 'bot');
            })
            .catch(error => {
                // Remove typing indicator
                removeTypingIndicator();
                
                // Add error message
                addMessage("Sorry, there was an error connecting to the server. Please try again later.", 'bot');
                console.error('Error:', error);
            });
    }

    // Add message to chat
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <span class="message-time">${timeString}</span>
        `;
        
        chatbotMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.classList.add('message', 'bot-message', 'typing-indicator');
        
        typingElement.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatbotMessages.appendChild(typingElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Send message on button click
    chatbotSendBtn.addEventListener('click', sendMessage);

    // Send message on Enter key
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
