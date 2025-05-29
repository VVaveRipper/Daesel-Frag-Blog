document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('.section');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Navigation and section switching
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and add to clicked link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all sections and show the target section
            const targetId = this.getAttribute('href').substring(1);
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
            
            // Close mobile menu if open
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            
            // Scroll to top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Blog update boxes functionality
    const updateBoxes = document.querySelectorAll('.update-box');
    const blogPosts = document.querySelectorAll('.blog-post-text');
    
    updateBoxes.forEach(box => {
        box.addEventListener('click', function() {
            // Remove active class from all update boxes
            updateBoxes.forEach(box => box.classList.remove('active'));
            // Add active class to clicked box
            this.classList.add('active');
            
            // Get the target post id
            const targetPostId = this.getAttribute('data-post');
            
            // Hide all blog posts
            blogPosts.forEach(post => post.classList.remove('active'));
            
            // Show the target post
            document.getElementById(targetPostId).classList.add('active');
            
            // Scroll to top of blog container on mobile
            if (window.innerWidth <= 900) {
                const blogContainer = document.querySelector('.blog-container');
                blogContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Character bio toggle
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const characterCard = this.closest('.character-card');
            const characterBio = characterCard.querySelector('.character-bio');
            
            characterBio.classList.toggle('active');
            
            if (characterBio.classList.contains('active')) {
                this.textContent = 'Close';
                
                // Add close button to bio
                if (!characterBio.querySelector('.close-bio')) {
                    const closeBtn = document.createElement('button');
                    closeBtn.classList.add('close-bio');
                    closeBtn.innerHTML = '&times;';
                    closeBtn.style.position = 'absolute';
                    closeBtn.style.top = '10px';
                    closeBtn.style.right = '10px';
                    closeBtn.style.fontSize = '24px';
                    closeBtn.style.color = 'white';
                    closeBtn.style.background = 'none';
                    closeBtn.style.border = 'none';
                    closeBtn.style.cursor = 'pointer';
                    
                    closeBtn.addEventListener('click', function() {
                        characterBio.classList.remove('active');
                        button.textContent = 'Read Bio';
                    });
                    
                    characterBio.appendChild(closeBtn);
                }
            } else {
                this.textContent = 'Read Bio';
            }
        });
    });
    
    // Check URL hash on page load to navigate to correct section
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const link = document.querySelector(`nav ul li a[href="#${hash}"]`);
        if (link) link.click();
    }
});
