document.addEventListener('DOMContentLoaded', () => {
    // Animate on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Animated counters
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    const impactSection = document.getElementById('impact');
    const impactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                impactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (impactSection) {
        impactObserver.observe(impactSection);
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = 0;
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Modal Logic
    const modal = document.getElementById('auth-modal');
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const closeBtn = document.querySelector('.close-btn');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    loginBtn.onclick = () => {
        modal.style.display = 'block';
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    }

    signupBtn.onclick = () => {
        modal.style.display = 'block';
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }

    closeBtn.onclick = () => {
        modal.style.display = 'none';
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    showSignup.onclick = (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }

    showLogin.onclick = (e) => {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    }

    // Initialize map centered on India
    const map = L.map('map').setView([20.5937, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom Icons
    const volunteerIcon = L.icon({
        iconUrl: 'https://loremflickr.com/40/40/volunteer,person',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    const donorIcon = L.icon({
        iconUrl: 'https://loremflickr.com/40/40/giving,hand',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    const receiverIcon = L.icon({
        iconUrl: 'https://loremflickr.com/40/40/building,community',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    const icons = {
        volunteer: volunteerIcon,
        donor: donorIcon,
        receiver: receiverIcon
    };

    const locations = [
        { lat: 28.7041, lon: 77.1025, type: 'volunteer', name: 'Volunteer Hub - Delhi' },
        { lat: 19.0760, lon: 72.8777, type: 'donor', name: 'Generous Givers - Mumbai' },
        { lat: 12.9716, lon: 77.5946, type: 'receiver', name: 'Hope Orphanage - Bangalore' },
        { lat: 22.5726, lon: 88.3639, type: 'receiver', name: 'Community Kitchen - Kolkata' },
        { lat: 17.3850, lon: 78.4867, type: 'volunteer', name: 'Helping Hands - Hyderabad' }
    ];

    locations.forEach(loc => {
        const marker = L.marker([loc.lat, loc.lon], { icon: icons[loc.type] }).addTo(map);
        marker.bindPopup(`<b>${loc.name}</b><br>Type: ${loc.type}`);
    });
});
