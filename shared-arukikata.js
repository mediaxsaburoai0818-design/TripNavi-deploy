// === TripNavi - Arukikata Style Scripts ===

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      mobileNav.classList.toggle('open');
    });

    // Close menu when clicking a link
    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('open');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('open');
      }
    });
  }
});

// Hero Carousel
class HeroCarousel {
  constructor(element) {
    this.carousel = element;
    this.track = element.querySelector('.carousel-track');
    this.slides = element.querySelectorAll('.carousel-slide');
    this.dots = element.querySelectorAll('.carousel-dot');
    this.prevBtn = element.querySelector('.carousel-arrow.prev');
    this.nextBtn = element.querySelector('.carousel-arrow.next');
    
    this.currentIndex = 0;
    this.autoplayInterval = null;
    
    this.init();
  }
  
  init() {
    if (!this.track || this.slides.length === 0) return;
    
    // Event listeners
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }
    
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Auto-play
    this.startAutoplay();
    
    // Pause on hover
    this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
    this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
  }
  
  goToSlide(index) {
    this.currentIndex = index;
    const offset = -100 * index;
    this.track.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.goToSlide(this.currentIndex);
  }
  
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(this.currentIndex);
  }
  
  startAutoplay() {
    this.autoplayInterval = setInterval(() => this.next(), 5000);
  }
  
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', function() {
  const carouselElement = document.querySelector('.hero-carousel');
  if (carouselElement) {
    new HeroCarousel(carouselElement);
  }
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Lazy load images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        
        if (img.style.backgroundImage) {
          img.style.backgroundImage = `url('${src}')`;
        } else {
          img.src = src;
        }
        
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
});

// Accordion
document.addEventListener('DOMContentLoaded', function() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const item = this.parentElement;
      const isOpen = item.classList.contains('open');
      
      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
      });
      
      // Open clicked (if it was closed)
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
});

// Tab switching
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('[data-tab]');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-tab');
      const group = this.getAttribute('data-tab-group') || 'default';
      
      // Remove active from all tabs in group
      document.querySelectorAll(`[data-tab-group="${group}"]`).forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Hide all content in group
      document.querySelectorAll(`[data-tab-content][data-tab-group="${group}"]`).forEach(content => {
        content.style.display = 'none';
      });
      
      // Activate clicked tab
      this.classList.add('active');
      
      // Show target content
      const targetContent = document.querySelector(`[data-tab-content="${targetId}"]`);
      if (targetContent) {
        targetContent.style.display = 'block';
      }
    });
  });
});

// Horizontal scroll navigation
document.addEventListener('DOMContentLoaded', function() {
  const scrollContainers = document.querySelectorAll('.scroll-container');
  
  scrollContainers.forEach(container => {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
    
    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });
    
    container.addEventListener('mouseup', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });
    
    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });
  });
});

// Fade in on scroll
const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        fadeInObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.card, .feature-card, .scroll-card').forEach(el => {
    fadeInObserver.observe(el);
  });
});
