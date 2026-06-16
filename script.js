document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Sıkça Sorulan Sorular (Accordion)
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const header = item.querySelector(".faq-header");
        header.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            faqItems.forEach(el => el.classList.remove("active"));
            if (!isActive) item.classList.add("active");
        });
    });

    // 2. Scroll Animasyonları (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                // Bir kere çalışması için observer'dan çıkar
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".scroll-animate").forEach(el => {
        scrollObserver.observe(el);
    });

    // --- SADECE MASAÜSTÜ (PC) İÇİN "300K $" AĞIR ANİMASYONLAR ---
    // Ekran genişliği 768px'den büyükse çalıştır (Mobilde kasma yapmaması için)
    if (window.innerWidth > 768) {
        
        // 3. Özel Mouse İmleci Animasyonu
        const cursor = document.querySelector(".custom-cursor");
        const follower = document.querySelector(".custom-cursor-follower");
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Ana nokta anında takip eder
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        });

        // Takipçi çember yavaşça arkadan gelir (RequestAnimationFrame ile pürüzsüz)
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Butonların üzerine gelince imleci büyütme
        const interactiveElements = document.querySelectorAll("a, .faq-header, .btn-solid, .btn-outline");
        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", () => {
                follower.style.width = "60px";
                follower.style.height = "60px";
                follower.style.backgroundColor = "rgba(24, 24, 27, 0.1)";
            });
            el.addEventListener("mouseleave", () => {
                follower.style.width = "40px";
                follower.style.height = "40px";
                follower.style.backgroundColor = "transparent";
            });
        });

        // 4. Hizmet Kartları İçin 3D Tilt (Eğilme) Efekti
        const tiltCards = document.querySelectorAll(".tilt-card");
        
        tiltCards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // Kart içindeki X konumu
                const y = e.clientY - rect.top;  // Kart içindeki Y konumu
                
                // Kartın merkezine göre hesaplama
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10; // Max 10 derece eğim
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            // Mouse karttan çıkınca sıfırla
            card.addEventListener("mouseleave", () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });

        // 5. Hero Alanı Mouse Parallax Efekti (Arka plan farenin tersine hafifçe kayar)
        const heroBg = document.querySelector(".hero-bg");
        document.querySelector(".hero-section").addEventListener("mousemove", (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 90;
            const y = (window.innerHeight - e.pageY * 2) / 90;
            heroBg.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
        });
    }

    // Header Arka Planını Scroll Edince Şeffaflıktan Çıkarma
    const headerEl = document.querySelector(".premium-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            headerEl.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
        } else {
            headerEl.style.boxShadow = "none";
        }
    });
});