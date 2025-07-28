# Technical Stack Guide: Bootstrap 5 + Alpine.js + BEM + Atomic Design
## Comprehensive Implementation for Webasyst Theme System

**Project**: Waboot Theme - WordPress to Webasyst Migration  
**Stack**: Bootstrap 5.3.2 + Alpine.js 3.13.3 + BEM + Atomic Design + JSON-LD  
**Updated**: January 16, 2025  
**Status**: Complete Implementation Guide  

---

## 📋 **TABLE OF CONTENTS**

1. [Introduction & Principles](#introduction--principles)
2. [Architectural Foundations](#architectural-foundations)
3. [Semantic HTML Structure](#semantic-html-structure)
4. [BEM Methodology for Webasyst](#bem-methodology-for-webasyst)
5. [Atomic Design in Theme System](#atomic-design-in-theme-system)
6. [Bootstrap 5 Integration](#bootstrap-5-integration)
7. [Alpine.js Reactivity](#alpinejs-reactivity)
8. [Accessibility & Universal Design](#accessibility--universal-design)
9. [SEO Optimization & JSON-LD](#seo-optimization--json-ld)
10. [Practical Patterns](#practical-patterns)

---

## 🎯 **INTRODUCTION & PRINCIPLES**

### **1.1 Modern Semantic Markup Philosophy**

In 2025, semantic markup has evolved from a recommendation to a mandatory requirement for creating quality, accessible, and performant web interfaces. This is especially critical for CMS systems like Webasyst, where content is created by users with varying technical knowledge levels.

**Key Principles:**
- **Semantics First** — HTML structure should describe meaning, not appearance
- **Accessibility by Default** — Code should work for all users without additional effort
- **Progressive Enhancement** — Basic functionality without JavaScript, enhancements with it
- **Mobile Priority** — Mobile-first approach in all development aspects

### **1.2 Webasyst Ecosystem Integration**

Webasyst Framework provides a unique theme inheritance architecture that requires a special approach to code organization:

```
Parent Theme (site:default)
├── Base Components
├── Common Styles and Scripts
├── Semantic Patterns
└── Child Themes (inheritance)
    ├── Shop-Script
    ├── Blog
    ├── Hub
    ├── Mailer
    └── Photos
```

---

## 🏗️ **ARCHITECTURAL FOUNDATIONS**

### **2.1 Architecture Principles**

**Priority Hierarchy (top to bottom):**
1. **HTML Semantics** — Correct tags for correct content
2. **Accessibility** — WCAG 2.2 AA as minimum standard
3. **Performance** — Core Web Vitals in green zone
4. **Visual Design** — Aesthetics should not compromise functionality

### **2.2 Technology Stack**

```html
<!-- Base HTML5 structure with correct semantics -->
<!DOCTYPE html>
<html lang="en" itemscope itemtype="https://schema.org/WebSite">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Bootstrap 5 CSS -->
    <link href="{$wa->themeUrl()}css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Custom CSS (BEM + Atomic) -->
    <link href="{$wa->themeUrl()}css/atoms.css" rel="stylesheet">
    <link href="{$wa->themeUrl()}css/molecules.css" rel="stylesheet">
    <link href="{$wa->themeUrl()}css/organisms.css" rel="stylesheet">
    <link href="{$wa->themeUrl()}css/templates.css" rel="stylesheet">
    
    <!-- Preload critical resources -->
    <link rel="preload" href="{$wa->themeUrl()}fonts/main.woff2" as="font" type="font/woff2" crossorigin>
</head>
<body>
    <!-- Alpine.js before closing body for progressive enhancement -->
    <script defer src="{$wa->themeUrl()}js/alpine.min.js"></script>
    <script defer src="{$wa->themeUrl()}js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

---

## 📄 **SEMANTIC HTML STRUCTURE**

### **3.1 Basic Semantic Principles**

Semantic markup is using HTML elements according to their semantic purpose, not visual display.

**Correct heading hierarchy:**
```html
<h1>Main page heading (one per page)</h1>
  <h2>First level section</h2>
    <h3>Subsection</h3>
    <h3>Another subsection</h3>
  <h2>First level section</h2>
    <h3>Subsection</h3>
      <h4>Sub-subsection</h4>
```

### **3.2 HTML5 Semantic Elements**

**Structural elements:**

```html
<!-- Main page structure -->
<header class="site-header" role="banner">
    <nav class="site-navigation" role="navigation" aria-label="Main navigation">
        <!-- Navigation -->
    </nav>
</header>

<main class="site-main" role="main" id="main-content">
    <article class="content-article" itemscope itemtype="https://schema.org/Article">
        <header class="content-article__header">
            <h1 class="content-article__title" itemprop="headline">Article title</h1>
            <time class="content-article__date" datetime="2025-07-27" itemprop="datePublished">July 27, 2025</time>
        </header>
        
        <div class="content-article__body" itemprop="articleBody">
            <!-- Main content -->
        </div>
        
        <footer class="content-article__footer">
            <!-- Article metadata -->
        </footer>
    </article>
    
    <aside class="site-sidebar" role="complementary" aria-label="Additional information">
        <!-- Sidebar -->
    </aside>
</main>

<footer class="site-footer" role="contentinfo">
    <!-- Site footer -->
</footer>
```

### **3.3 Interactive Elements**

**Buttons and links:**
```html
<!-- Button for actions -->
<button type="button" class="btn btn--primary" aria-describedby="btn-help">
    Submit form
</button>
<div id="btn-help" class="visually-hidden">
    Submits the form to server for processing
</div>

<!-- Link for navigation -->
<a href="/products" class="link link--primary" aria-current="page">
    Product catalog
</a>

<!-- Link that behaves like a button -->
<a href="#modal" class="btn btn--secondary" role="button" 
   aria-haspopup="dialog" aria-expanded="false">
    Open modal window
</a>
```

**Forms with proper accessibility:**
```html
<form class="form form--contact" novalidate>
    <fieldset class="form__fieldset">
        <legend class="form__legend">Contact information</legend>
        
        <div class="form__group">
            <label for="name" class="form__label">
                Name <span class="form__required" aria-label="required field">*</span>
            </label>
            <input type="text" id="name" name="name" class="form__input" 
                   required aria-describedby="name-error name-help"
                   autocomplete="given-name">
            <div id="name-help" class="form__help">
                Enter your full name
            </div>
            <div id="name-error" class="form__error" role="alert" aria-live="polite">
                <!-- Error will appear here -->
            </div>
        </div>
        
        <div class="form__group">
            <label for="email" class="form__label">Email</label>
            <input type="email" id="email" name="email" class="form__input" 
                   required aria-describedby="email-error"
                   autocomplete="email">
            <div id="email-error" class="form__error" role="alert" aria-live="polite">
                <!-- Error will appear here -->
            </div>
        </div>
    </fieldset>
</form>
```

---

## 🎨 **BEM METHODOLOGY FOR WEBASYST**

### **4.1 BEM Naming Convention**

BEM (Block, Element, Modifier) provides a systematic approach to CSS class naming that ensures maintainability and scalability.

**BEM Structure:**
```css
/* Block */
.waboot-button

/* Element */
.waboot-button__icon
.waboot-button__text

/* Modifier */
.waboot-button--primary
.waboot-button--large
.waboot-button--disabled
```

### **4.2 Webasyst-Specific BEM Implementation**

**Component naming pattern:**
```css
/* App-specific prefix */
.waboot-site__header          /* Site app */
.waboot-shop__product-card    /* Shop app */
.waboot-blog__post-card       /* Blog app */
.waboot-hub__user-profile     /* Hub app */
.waboot-mailer__campaign      /* Mailer app */

/* Atomic design integration */
.waboot-atom__button
.waboot-molecule__form
.waboot-organism__header
```

### **4.3 CSS Architecture with BEM**

```css
/* Base styles */
.waboot-button {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
    border-radius: 0.375rem;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

/* Elements */
.waboot-button__icon {
    margin-right: 0.5rem;
    width: 1.25rem;
    height: 1.25rem;
}

.waboot-button__text {
    line-height: 1.5;
}

/* Modifiers */
.waboot-button--primary {
    background-color: var(--waboot-primary);
    color: white;
}

.waboot-button--primary:hover {
    background-color: var(--waboot-primary-dark);
}

.waboot-button--secondary {
    background-color: transparent;
    border-color: var(--waboot-secondary);
    color: var(--waboot-secondary);
}

.waboot-button--large {
    padding: 1rem 2rem;
    font-size: 1.125rem;
}

.waboot-button--disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
```

---

## 🧩 **ATOMIC DESIGN IN THEME SYSTEM**

### **5.1 Atomic Design Principles**

Atomic Design breaks down interfaces into fundamental building blocks that can be reused throughout the application.

**Atomic Design Hierarchy:**
```
Atoms → Molecules → Organisms → Templates → Pages
```

### **5.2 Atom Components**

**Button Atom:**
```smarty
{* templates/atoms/button.html *}
<button class="waboot-atom__button waboot-atom__button--{$variant|default:'primary'} {$class|default:''}"
        type="{$type|default:'button'}"
        {if $disabled}disabled{/if}
        {if $aria_label}aria-label="{$aria_label}"{/if}>
    {if $icon}
        <span class="waboot-atom__button__icon">
            <i class="waboot-icon waboot-icon--{$icon}"></i>
        </span>
    {/if}
    <span class="waboot-atom__button__text">{$text}</span>
</button>
```

**Input Atom:**
```smarty
{* templates/atoms/input.html *}
<div class="waboot-atom__input-group">
    {if $label}
        <label for="{$id}" class="waboot-atom__input-group__label">
            {$label}
            {if $required}<span class="waboot-atom__input-group__required">*</span>{/if}
        </label>
    {/if}
    
    <input type="{$type|default:'text'}" 
           id="{$id}" 
           name="{$name}" 
           class="waboot-atom__input-group__input {$class|default:''}"
           {if $placeholder}placeholder="{$placeholder}"{/if}
           {if $required}required{/if}
           {if $aria_describedby}aria-describedby="{$aria_describedby}"{/if}
           {if $autocomplete}autocomplete="{$autocomplete}"{/if}>
    
    {if $help_text}
        <div class="waboot-atom__input-group__help">{$help_text}</div>
    {/if}
    
    {if $error}
        <div class="waboot-atom__input-group__error" role="alert">{$error}</div>
    {/if}
</div>
```

### **5.3 Molecule Components**

**Contact Form Molecule:**
```smarty
{* templates/molecules/contact-form.html *}
<form class="waboot-molecule__contact-form" 
      x-data="contactForm()" 
      @submit.prevent="submitForm()">
    
    <div class="waboot-molecule__contact-form__field">
        {include file="atoms/input.html" 
                 id="name" 
                 name="name" 
                 label="Name" 
                 required="true" 
                 autocomplete="given-name"}
    </div>
    
    <div class="waboot-molecule__contact-form__field">
        {include file="atoms/input.html" 
                 id="email" 
                 name="email" 
                 label="Email" 
                 type="email" 
                 required="true" 
                 autocomplete="email"}
    </div>
    
    <div class="waboot-molecule__contact-form__field">
        {include file="atoms/textarea.html" 
                 id="message" 
                 name="message" 
                 label="Message" 
                 required="true"}
    </div>
    
    <div class="waboot-molecule__contact-form__actions">
        {include file="atoms/button.html" 
                 text="Send Message" 
                 type="submit" 
                 variant="primary"}
    </div>
</form>
```

### **5.4 Organism Components**

**Site Header Organism:**
```smarty
{* templates/organisms/site-header.html *}
<header class="waboot-organism__site-header" role="banner">
    <div class="waboot-organism__site-header__container">
        <div class="waboot-organism__site-header__brand">
            <a href="{$wa_url}" class="waboot-organism__site-header__logo">
                <img src="{$wa_theme_url}images/logo.png" alt="{$wa->accountName()}">
            </a>
        </div>
        
        <nav class="waboot-organism__site-header__navigation" 
             role="navigation" 
             aria-label="Main navigation">
            {include file="molecules/navigation-menu.html" menu=$main_menu}
        </nav>
        
        <div class="waboot-organism__site-header__actions">
            {include file="molecules/search-form.html"}
            {include file="molecules/user-menu.html"}
        </div>
        
        <button class="waboot-organism__site-header__mobile-toggle" 
                x-data="{ open: false }"
                @click="open = !open"
                aria-label="Toggle mobile menu"
                aria-expanded="false">
            <span class="waboot-organism__site-header__mobile-toggle__icon"></span>
        </button>
    </div>
</header>
```

---

## 🎨 **BOOTSTRAP 5 INTEGRATION**

### **6.1 Bootstrap 5 Customization**

**Custom CSS Variables:**
```css
:root {
    /* Primary colors */
    --bs-primary: #0d6efd;
    --bs-primary-rgb: 13, 110, 253;
    
    /* Secondary colors */
    --bs-secondary: #6c757d;
    --bs-secondary-rgb: 108, 117, 125;
    
    /* Custom Waboot colors */
    --waboot-primary: #2563eb;
    --waboot-primary-dark: #1d4ed8;
    --waboot-secondary: #64748b;
    --waboot-accent: #f59e0b;
    
    /* Typography */
    --bs-font-sans-serif: 'Inter', system-ui, -apple-system, sans-serif;
    --bs-font-size-base: 1rem;
    --bs-line-height-base: 1.6;
    
    /* Spacing */
    --bs-spacer: 1rem;
    --bs-border-radius: 0.375rem;
    --bs-border-radius-lg: 0.5rem;
}
```

### **6.2 Utility Classes Integration**

**Custom utility classes:**
```css
/* Waboot-specific utilities */
.waboot-text-gradient {
    background: linear-gradient(135deg, var(--waboot-primary), var(--waboot-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.waboot-shadow-soft {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.waboot-transition-smooth {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### **6.3 Grid System Enhancement**

**Custom grid utilities:**
```css
/* Extended grid system */
.waboot-container-fluid {
    max-width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
}

.waboot-container-narrow {
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
}

.waboot-container-wide {
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
}
```

---

## ⚡ **ALPINE.JS REACTIVITY**

### **7.1 Alpine.js Store Management**

**Global store setup:**
```javascript
// js/store.js
Alpine.store('waboot', {
    // Site-wide state
    mobileMenuOpen: false,
    searchQuery: '',
    notifications: [],
    
    // User preferences
    theme: localStorage.getItem('waboot-theme') || 'light',
    fontSize: localStorage.getItem('waboot-font-size') || 'medium',
    
    // Methods
    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
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
            type,
            timestamp: new Date()
        });
    },
    
    removeNotification(id) {
        this.notifications = this.notifications.filter(n => n.id !== id);
    }
});
```

### **7.2 Component Reactivity**

**Form validation component:**
```javascript
// js/components/form-validation.js
Alpine.data('formValidation', () => ({
    errors: {},
    isSubmitting: false,
    
    validateField(field, rules) {
        const value = this.$refs[field].value;
        const fieldErrors = [];
        
        if (rules.required && !value) {
            fieldErrors.push('This field is required');
        }
        
        if (rules.email && value && !this.isValidEmail(value)) {
            fieldErrors.push('Please enter a valid email address');
        }
        
        if (rules.minLength && value && value.length < rules.minLength) {
            fieldErrors.push(`Minimum ${rules.minLength} characters required`);
        }
        
        this.errors[field] = fieldErrors;
        return fieldErrors.length === 0;
    },
    
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    async submitForm() {
        this.isSubmitting = true;
        
        try {
            const formData = new FormData(this.$el);
            const response = await fetch(this.$el.action, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                Alpine.store('waboot').addNotification('Form submitted successfully!', 'success');
                this.$el.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            Alpine.store('waboot').addNotification('An error occurred. Please try again.', 'error');
        } finally {
            this.isSubmitting = false;
        }
    }
}));
```

### **7.3 Performance Optimization**

**Debounced search:**
```javascript
// js/components/search.js
Alpine.data('searchComponent', () => ({
    query: '',
    results: [],
    isLoading: false,
    debounceTimer: null,
    
    search() {
        clearTimeout(this.debounceTimer);
        
        this.debounceTimer = setTimeout(async () => {
            if (this.query.length < 2) {
                this.results = [];
                return;
            }
            
            this.isLoading = true;
            
            try {
                const response = await fetch(`/search/?q=${encodeURIComponent(this.query)}`);
                this.results = await response.json();
            } catch (error) {
                console.error('Search failed:', error);
                this.results = [];
            } finally {
                this.isLoading = false;
            }
        }, 300);
    }
}));
```

---

## ♿ **ACCESSIBILITY & UNIVERSAL DESIGN**

### **8.1 WCAG 2.2 AA Compliance**

**Keyboard navigation:**
```css
/* Focus indicators */
.waboot-focus-visible:focus-visible {
    outline: 2px solid var(--waboot-primary);
    outline-offset: 2px;
}

/* Skip links */
.waboot-skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--waboot-primary);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
}

.waboot-skip-link:focus {
    top: 6px;
}
```

### **8.2 Screen Reader Support**

**ARIA attributes:**
```html
<!-- Navigation with proper ARIA -->
<nav class="waboot-navigation" role="navigation" aria-label="Main navigation">
    <ul class="waboot-navigation__list">
        <li class="waboot-navigation__item">
            <a href="/" class="waboot-navigation__link" aria-current="page">
                Home
            </a>
        </li>
        <li class="waboot-navigation__item">
            <a href="/products" class="waboot-navigation__link">
                Products
            </a>
        </li>
    </ul>
</nav>

<!-- Form with proper labeling -->
<form class="waboot-form" role="form" aria-labelledby="form-title">
    <h2 id="form-title">Contact Form</h2>
    
    <div class="waboot-form__group">
        <label for="name" class="waboot-form__label">Name</label>
        <input type="text" id="name" name="name" class="waboot-form__input"
               aria-describedby="name-help" required>
        <div id="name-help" class="waboot-form__help">
            Enter your full name as it appears on official documents
        </div>
    </div>
</form>
```

### **8.3 Color Contrast**

**Accessible color combinations:**
```css
/* High contrast color combinations */
.waboot-text-primary {
    color: #1a365d; /* Dark blue - meets AAA contrast */
}

.waboot-text-secondary {
    color: #4a5568; /* Dark gray - meets AA contrast */
}

.waboot-bg-primary {
    background-color: #2563eb;
    color: white; /* Meets AA contrast */
}

.waboot-bg-secondary {
    background-color: #f7fafc;
    color: #2d3748; /* Meets AAA contrast */
}
```

---

## 📊 **SEO OPTIMIZATION & JSON-LD**

### **9.1 Semantic HTML for SEO**

**Structured content:**
```html
<!-- Article with proper schema markup -->
<article class="waboot-article" itemscope itemtype="https://schema.org/Article">
    <header class="waboot-article__header">
        <h1 class="waboot-article__title" itemprop="headline">
            Article Title
        </h1>
        <meta itemprop="datePublished" content="2025-07-27T10:00:00Z">
        <meta itemprop="dateModified" content="2025-07-27T15:30:00Z">
        <meta itemprop="author" content="Author Name">
    </header>
    
    <div class="waboot-article__content" itemprop="articleBody">
        <!-- Article content -->
    </div>
    
    <footer class="waboot-article__footer">
        <div class="waboot-article__tags">
            <span itemprop="keywords">web development, accessibility, SEO</span>
        </div>
    </footer>
</article>
```

### **9.2 JSON-LD Implementation**

**Product schema example:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "description": "Product description",
  "image": "https://example.com/product-image.jpg",
  "offers": {
    "@type": "Offer",
    "price": "29.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "25"
  }
}
</script>
```

### **9.3 Performance Optimization**

**Critical CSS inlining:**
```html
<style>
/* Critical above-the-fold styles */
.waboot-header { /* ... */ }
.waboot-hero { /* ... */ }
.waboot-navigation { /* ... */ }
</style>

<!-- Non-critical CSS loaded asynchronously -->
<link rel="preload" href="css/non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="css/non-critical.css"></noscript>
```

---

## 🔧 **PRACTICAL PATTERNS**

### **10.1 Responsive Design Patterns**

**Mobile-first approach:**
```css
/* Base styles (mobile) */
.waboot-card {
    padding: 1rem;
    margin-bottom: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
    .waboot-card {
        padding: 1.5rem;
        margin-bottom: 1.5rem;
    }
}

/* Desktop and up */
@media (min-width: 1024px) {
    .waboot-card {
        padding: 2rem;
        margin-bottom: 2rem;
    }
}
```

### **10.2 Component Composition**

**Reusable component patterns:**
```smarty
{* templates/atoms/icon-button.html *}
<button class="waboot-atom__icon-button waboot-atom__icon-button--{$variant|default:'primary'}"
        type="{$type|default:'button'}"
        {if $aria_label}aria-label="{$aria_label}"{/if}>
    <span class="waboot-atom__icon-button__icon">
        <i class="waboot-icon waboot-icon--{$icon}"></i>
    </span>
    {if $text}
        <span class="waboot-atom__icon-button__text">{$text}</span>
    {/if}
</button>
```

### **10.3 State Management**

**Alpine.js state patterns:**
```javascript
// Component with local state
Alpine.data('toggleComponent', () => ({
    isOpen: false,
    items: [],
    
    toggle() {
        this.isOpen = !this.isOpen;
    },
    
    async loadItems() {
        const response = await fetch('/api/items');
        this.items = await response.json();
    }
}));
```

---

## 🎯 **CONCLUSION**

This comprehensive technical stack guide provides a solid foundation for building modern, accessible, and performant Webasyst themes using Bootstrap 5, Alpine.js, BEM methodology, and Atomic Design principles.

**Key Success Factors:**
- ✅ **Semantic HTML**: Proper markup for accessibility and SEO
- ✅ **BEM Methodology**: Maintainable and scalable CSS architecture
- ✅ **Atomic Design**: Reusable component system
- ✅ **Bootstrap 5**: Responsive framework integration
- ✅ **Alpine.js**: Lightweight reactivity
- ✅ **Accessibility**: WCAG 2.2 AA compliance
- ✅ **Performance**: Core Web Vitals optimization
- ✅ **SEO**: JSON-LD structured data implementation

*This guide serves as the definitive reference for implementing modern web standards in the Webasyst ecosystem, ensuring consistent, high-quality theme development across all applications.*