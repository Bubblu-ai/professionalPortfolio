// your code goes here
// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .btn, .project-card, .skill-card');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  setTimeout(() => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
  }, 100);
});

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursorFollower.style.width = '50px';
    cursorFollower.style.height = '50px';
    cursorFollower.style.borderWidth = '2px';
  });
  
  link.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.width = '30px';
    cursorFollower.style.height = '30px';
    cursorFollower.style.borderWidth = '1px';
  });
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    navLinks.classList.remove('active');
  });
});

// Sticky Header
const header = document.querySelector('header');
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
  if (window.scrollY > scrollThreshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').substring(1) === current) {
      item.classList.add('active');
    }
  });
});

// Scroll Reveal Animation
function reveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// Skills Animation
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkills() {
  skillBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    bar.style.width = progress + '%';
  });
}

// Trigger skill animation when skills section is in view
const skillsSection = document.querySelector('#skills');
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkills();
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillsObserver.observe(skillsSection);

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      if (filter === 'all') {
        card.style.display = 'block';
      } else if (card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
      
      // Add animation
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 300);
    });
  });
});

// Initialize project cards
setTimeout(() => {
  projectCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}, 500);

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    // For demonstration, we'll just log it and show an alert
    console.log({ name, email, subject, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
  });
}

// Disable custom cursor on mobile devices
function isMobile() {
  return window.innerWidth <= 768;
}

function handleMobileChanges() {
  if (isMobile()) {
    document.querySelector('.cursor').style.display = 'none';
    document.querySelector('.cursor-follower').style.display = 'none';
  } else {
    document.querySelector('.cursor').style.display = 'block';
    document.querySelector('.cursor-follower').style.display = 'block';
  }
}

window.addEventListener('resize', handleMobileChanges);
handleMobileChanges(); // Initial check

// Enhanced skill card animations
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const skillName = card.getAttribute('data-skill');
    card.style.transform = 'translateY(-10px) rotate(2deg)';
    
    // Create floating particles
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.classList.add('skill-particle');
      particle.style.width = Math.random() * 10 + 5 + 'px';
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
      particle.style.position = 'absolute';
      particle.style.borderRadius = '50%';
      particle.style.opacity = Math.random() * 0.5 + 0.5;
      particle.style.top = Math.random() * 100 + '%';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1';
      
      card.appendChild(particle);
      
      // Animate particle
      setTimeout(() => {
        particle.style.transition = 'all 1s ease';
        particle.style.top = '-20px';
        particle.style.opacity = '0';
        
        // Remove particle after animation
        setTimeout(() => {
          particle.remove();
        }, 1000);
      }, Math.random() * 500);
    }
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotate(0)';
  });
});

// 3D tilt effect for project cards
projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;
    
    const rotateX = (mouseY / (cardRect.height / 2)) * -5;
    const rotateY = (mouseX / (cardRect.width / 2)) * 5;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// Parallax effect for hero section
const heroSection = document.querySelector('.hero');
const shapes = document.querySelectorAll('.shape');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  
  if (scrollPosition < window.innerHeight) {
    shapes.forEach((shape, index) => {
      const speed = 0.1 * (index + 1);
      shape.style.transform = `translate(-50%, -50%) translateY(${scrollPosition * speed}px)`;
    });
  }
});

// Typing animation for subtitle
const subtitle = document.querySelector('.subtitle');
const originalText = subtitle.textContent;
subtitle.textContent = '';

let charIndex = 0;
function typeSubtitle() {
  if (charIndex < originalText.length) {
    subtitle.textContent += originalText.charAt(charIndex);
    charIndex++;
    setTimeout(typeSubtitle, 100);
  } else {
    setTimeout(eraseSubtitle, 2000);
  }
}

function eraseSubtitle() {
  if (subtitle.textContent.length > 0) {
    subtitle.textContent = subtitle.textContent.slice(0, -1);
    setTimeout(eraseSubtitle, 50);
  } else {
    charIndex = 0;
    setTimeout(typeSubtitle, 500);
  }
}

// Start typing animation after page load
window.addEventListener('load', () => {
  setTimeout(typeSubtitle, 1000);
});