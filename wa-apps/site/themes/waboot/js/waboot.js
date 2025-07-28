/*!
 * Waboot Theme JavaScript
 * WordPress Bootscore to Webasyst Migration
 * Built with Alpine.js for micro-interactions and reactivity
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out-sine',
            once: true,
            mirror: false,
            offset: 50,
            delay: 100
        });
    }

    // Waboot Theme JavaScript Module
    const WabootTheme = {
        
        // Initialize theme functionality
        init: function() {
            this.setupNavigation();
            this.setupSmoothScrolling();
            this.setupFormHandlers();
            this.setupLazyLoading();
            this.setupProductInteractions();
            this.setupNewsletterForm();
            this.setupBackToTop();
            this.setupSearchToggle();
            this.setupMobileMenu();
            this.setupThemeSwitcher();
            this.setupAccessibility();
            this.setupPerformanceMonitoring();
        },

        // Enhanced Navigation
        setupNavigation: function() {
            // Add active class to current navigation item
            const currentUrl = window.location.pathname;
            const navLinks = document.querySelectorAll('.waboot__nav-link');
            
            navLinks.forEach(link => {
                if (link.getAttribute('href') === currentUrl) {
                    link.classList.add('waboot__nav-link--active');
                }
            });

            // Dropdown hover enhancement
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                let hideTimeout;
                
                dropdown.addEventListener('mouseenter', function() {
                    clearTimeout(hideTimeout);
                    const menu = this.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.classList.add('show');
                    }
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    const menu = this.querySelector('.dropdown-menu');
                    hideTimeout = setTimeout(() => {
                        if (menu) {
                            menu.classList.remove('show');
                        }
                    }, 300);
                });
            });
        },

        // Smooth scrolling for anchor links
        setupSmoothScrolling: function() {
            const anchors = document.querySelectorAll('a[href^="#"]');
            anchors.forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        },

        // Enhanced form handling
        setupFormHandlers: function() {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                // Add loading states to submit buttons
                const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
                if (submitBtn) {
                    form.addEventListener('submit', function() {
                        submitBtn.disabled = true;
                        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
                    });
                }

                // Real-time form validation
                const inputs = form.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    input.addEventListener('blur', function() {
                        this.validateField();
                    });
                });
            });
        },

        // Lazy loading for images
        setupLazyLoading: function() {
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    });
                });

                const lazyImages = document.querySelectorAll('img[data-src]');
                lazyImages.forEach(img => imageObserver.observe(img));
            }
        },

        // Product interaction handlers
        setupProductInteractions: function() {
            // Quick view functionality
            const quickViewBtns = document.querySelectorAll('.waboot__btn-quick-view');
            quickViewBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const productId = this.dataset.productId;
                    this.openQuickView(productId);
                });
            });

            // Add to cart functionality
            const addToCartBtns = document.querySelectorAll('.waboot__btn-add-to-cart');
            addToCartBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const productId = this.dataset.productId;
                    this.addToCart(productId);
                });
            });
        },

        // Newsletter form handling
        setupNewsletterForm: function() {
            const newsletterForm = document.querySelector('.waboot__newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const email = this.querySelector('input[type="email"]').value;
                    this.subscribeToNewsletter(email);
                });
            }
        },

        // Back to top button
        setupBackToTop: function() {
            const backToTopBtn = document.createElement('button');
            backToTopBtn.className = 'waboot__back-to-top';
            backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
            backToTopBtn.setAttribute('aria-label', 'Back to top');
            document.body.appendChild(backToTopBtn);

            // Show/hide based on scroll position
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('waboot__back-to-top--visible');
                } else {
                    backToTopBtn.classList.remove('waboot__back-to-top--visible');
                }
            });

            // Smooth scroll to top
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        },

        // Search toggle functionality
        setupSearchToggle: function() {
            const searchToggle = document.querySelector('.waboot__search-toggle');
            const searchForm = document.querySelector('.waboot__search-form');
            
            if (searchToggle && searchForm) {
                searchToggle.addEventListener('click', function() {
                    searchForm.classList.toggle('waboot__search-form--active');
                    const searchInput = searchForm.querySelector('input[type="search"]');
                    if (searchForm.classList.contains('waboot__search-form--active')) {
                        searchInput.focus();
                    }
                });
            }
        },

        // Mobile menu functionality
        setupMobileMenu: function() {
            const mobileMenuToggle = document.querySelector('.waboot__mobile-menu-toggle');
            const mobileMenu = document.querySelector('.waboot__mobile-menu');
            
            if (mobileMenuToggle && mobileMenu) {
                mobileMenuToggle.addEventListener('click', function() {
                    this.classList.toggle('waboot__mobile-menu-toggle--active');
                    mobileMenu.classList.toggle('waboot__mobile-menu--active');
                    
                    // Update aria-expanded
                    const isExpanded = mobileMenu.classList.contains('waboot__mobile-menu--active');
                    this.setAttribute('aria-expanded', isExpanded);
                });
            }
        },

        // Theme switcher (light/dark mode)
        setupThemeSwitcher: function() {
            const themeToggle = document.querySelector('.waboot__theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', function() {
                    const currentTheme = document.documentElement.getAttribute('data-theme');
                    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                    
                    document.documentElement.setAttribute('data-theme', newTheme);
                    localStorage.setItem('waboot-theme', newTheme);
                    
                    // Update toggle button
                    this.setAttribute('aria-label', `Switch to ${newTheme === 'dark' ? 'light' : 'dark'} mode`);
                });
            }
        },

        // Accessibility enhancements
        setupAccessibility: function() {
            // Skip link functionality
            const skipLink = document.querySelector('.waboot__skip-link');
            if (skipLink) {
                skipLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.focus();
                        target.scrollIntoView();
                    }
                });
            }

            // Keyboard navigation for dropdowns
            const dropdownToggles = document.querySelectorAll('[data-bs-toggle="dropdown"]');
            dropdownToggles.forEach(toggle => {
                toggle.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });
        },

        // Performance monitoring
        setupPerformanceMonitoring: function() {
            // Monitor Core Web Vitals
            if ('web-vitals' in window) {
                import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
                    getCLS(this.logWebVital);
                    getFID(this.logWebVital);
                    getFCP(this.logWebVital);
                    getLCP(this.logWebVital);
                    getTTFB(this.logWebVital);
                });
            }
        },

        // Utility methods
        logWebVital: function(metric) {
            console.log(metric);
            // Send to analytics if needed
            if (window.gtag) {
                gtag('event', 'web_vital', {
                    event_category: 'Web Vitals',
                    event_label: metric.name,
                    value: Math.round(metric.value),
                    non_interaction: true
                });
            }
        },

        // Product cart functionality
        addToCart: function(productId) {
            // Show loading state
            const btn = document.querySelector(`[data-product-id="${productId}"]`);
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Adding...';
            }

            // Simulate API call
            setTimeout(() => {
                // Update cart count
                const cartBadge = document.querySelector('.waboot__cart-badge');
                if (cartBadge) {
                    const currentCount = parseInt(cartBadge.textContent) || 0;
                    cartBadge.textContent = currentCount + 1;
                }

                // Show success message
                this.showNotification('Product added to cart!', 'success');

                // Reset button
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = 'Add to Cart';
                }
            }, 1000);
        },

        // Newsletter subscription
        subscribeToNewsletter: function(email) {
            // Show loading state
            const form = document.querySelector('.waboot__newsletter-form');
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Subscribing...';

            // Simulate API call
            setTimeout(() => {
                this.showNotification('Successfully subscribed to newsletter!', 'success');
                form.reset();
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        },

        // Quick view functionality
        openQuickView: function(productId) {
            // Create modal content
            const modal = document.createElement('div');
            modal.className = 'modal fade waboot__quick-view-modal';
            modal.innerHTML = `
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Quick View</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <img src="/path/to/product-image.jpg" alt="Product" class="img-fluid">
                                </div>
                                <div class="col-md-6">
                                    <h4>Product Name</h4>
                                    <p class="text-muted">Product description goes here...</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="h5 text-primary">$29.99</span>
                                        <button class="btn btn-primary">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            
            // Initialize Bootstrap modal
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();

            // Clean up on hide
            modal.addEventListener('hidden.bs.modal', () => {
                document.body.removeChild(modal);
            });
        },

        // Notification system
        showNotification: function(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `alert alert-${type} alert-dismissible fade show waboot__notification`;
            notification.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;

            // Add to page
            const container = document.querySelector('.waboot__notifications') || document.body;
            container.appendChild(notification);

            // Auto remove after 5 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 5000);
        },

        // Form validation
        validateField: function() {
            const field = this;
            const value = field.value.trim();
            const fieldType = field.type;
            let isValid = true;
            let errorMessage = '';

            // Remove existing error
            const existingError = field.parentNode.querySelector('.waboot__field-error');
            if (existingError) {
                existingError.remove();
            }

            // Validation rules
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'This field is required.';
            } else if (fieldType === 'email' && value && !this.isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            } else if (fieldType === 'tel' && value && !this.isValidPhone(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number.';
            }

            // Show error if invalid
            if (!isValid) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'waboot__field-error text-danger small mt-1';
                errorDiv.textContent = errorMessage;
                field.parentNode.appendChild(errorDiv);
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            }

            return isValid;
        },

        // Utility methods
        isValidEmail: function(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        isValidPhone: function(phone) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
        }
    };

    // Initialize the theme
    WabootTheme.init();

    // Make available globally for debugging
    window.WabootTheme = WabootTheme;
});

// Alpine.js Store for global state management
document.addEventListener('alpine:init', () => {
    Alpine.store('waboot', {
        // Global state
        mobileMenuOpen: false,
        searchOpen: false,
        theme: localStorage.getItem('waboot-theme') || 'light',
        notifications: [],

        // Methods
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },

        toggleSearch() {
            this.searchOpen = !this.searchOpen;
        },

        setTheme(theme) {
            this.theme = theme;
            localStorage.setItem('waboot-theme', theme);
            document.documentElement.setAttribute('data-theme', theme);
        },

        addNotification(message, type = 'info') {
            this.notifications.push({
                id: Date.now(),
                message,
                type
            });
        },

        removeNotification(id) {
            this.notifications = this.notifications.filter(n => n.id !== id);
        }
    });
});