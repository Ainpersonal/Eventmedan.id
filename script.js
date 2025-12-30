document.addEventListener('DOMContentLoaded', function() {
    
    // --- INIT LIBRARY ---
    AOS.init({ once: false, duration: 1000, offset: 120 });
    
    if(document.querySelector(".about-image img")) {
        VanillaTilt.init(document.querySelectorAll(".about-image img"), {
            max: 15, speed: 400, glare: true, "max-glare": 0.5,
        });
    }

    // --- LOGIKA NAVBAR PINDAH WARNA (SCROLL SPY) ---
    const nav = document.querySelector('nav');
    const sections = document.querySelectorAll('section'); 
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        // Cek posisi scroll
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Jika scroll melewati (Top Section - 150px), maka itu section aktif
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(li => {
            li.classList.remove('active');
            // Cek apakah href link mengandung ID section yang aktif
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });

        // Sticky Navbar
        if (window.scrollY > 100) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    });

    // --- MOBILE MENU ---
    const menuToggle = document.querySelector('.menu-toggle input');
    const navList = document.querySelector('.nav-links');

    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('slide');
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('slide');
            if(menuToggle) menuToggle.checked = false;
        });
    });

    // --- FILTER EVENT ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    const searchInput = document.getElementById('eventSearch');

    function filterEvents() {
        if(!searchInput) return;
        const searchTerm = searchInput.value.toLowerCase();
        
        // Cek tombol aktif
        let activeBtn = document.querySelector('.filter-btn.active');
        let activeFilter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';

        eventCards.forEach(card => {
            const cardCategory = card.classList;
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            
            const matchesCategory = activeFilter === 'all' || cardCategory.contains(activeFilter);
            const matchesSearch = cardTitle.includes(searchTerm);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 50);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterEvents();
        });
    });

    if(searchInput) {
        searchInput.addEventListener('keyup', filterEvents);
    }

    // --- SLIDER STUDIO (MANUAL NEXT ONLY) ---
    const stNextBtn = document.querySelector('.st-next');
    const stSlider = document.querySelector('.st-slide');
    
    if (stSlider && stNextBtn) {
        function nextStudioSlide() {
            let items = document.querySelectorAll('.st-item');
            stSlider.appendChild(items[0]);
        }
        
        // Tombol Next
        stNextBtn.addEventListener('click', nextStudioSlide);
        
        // Bisa juga klik gambar slider
        stSlider.addEventListener('click', nextStudioSlide);
        
        // TIDAK ADA AUTO SLIDE
    }

    // --- CONTACT FORM ---
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            Swal.fire({
                title: 'Terkirim!',
                text: 'Pesan Anda sudah kami terima.',
                icon: 'success',
                confirmButtonColor: '#C67C08'
            });
            this.reset();
        });
    }
});