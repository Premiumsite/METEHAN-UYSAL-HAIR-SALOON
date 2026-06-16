document.addEventListener("DOMContentLoaded", function() {

    // --- 1. TYPEWRITER EFEKTİ (Akıcı, Silmeli, Sonsuz Döngü) ---
    const texts = [
        "Isparta'nın En İyi Kadın Kuaförü",
        "Saçınıza Hak Ettiği Işıltıyı Verin",
        "Profesyonel Güzellik ve Bakım Deneyimi",
        "Tarzınızı Kusursuzluğa Taşıyın"
    ];
    let count = 0;
    let index = 0;
    let currentText = '';
    let isDeleting = false;
    let typingSpeed = 100;
    
    const typeWriterElement = document.getElementById("typewriter-text");

    function type() {
        if (count === texts.length) {
            count = 0; // Sonsuz döngü
        }
        
        currentText = texts[count];

        if (isDeleting) {
            typeWriterElement.textContent = currentText.substring(0, index - 1);
            index--;
            typingSpeed = 50; // Silme hızı daha yüksek
        } else {
            typeWriterElement.textContent = currentText.substring(0, index + 1);
            index++;
            typingSpeed = 100; // Yazma hızı
        }

        let timeout = typingSpeed;

        // Kelime bittiğinde bekleme
        if (!isDeleting && index === currentText.length) {
            timeout = 2000; // 2 saniye bekle
            isDeleting = true;
        } else if (isDeleting && index === 0) {
            isDeleting = false;
            count++;
            timeout = 500; // Yeni kelimeye geçmeden önce bekle
        }

        setTimeout(type, timeout);
    }

    // Typewriter'ı başlat
    setTimeout(type, 1000);


    // --- 2. YAĞAN ÇİÇEK ANİMASYONU ---
    const flowerContainer = document.getElementById("flower-container");
    const flowerIcons = ['🌸', '💮', '🌺', '✨']; // Premium ambiyans için yumuşak emojiler

    function createFlower() {
        const flower = document.createElement("div");
        flower.classList.add("flower");
        
        // Rastgele çiçek simgesi
        flower.innerText = flowerIcons[Math.floor(Math.random() * flowerIcons.length)];
        
        // Rastgele pozisyon ve boyut
        flower.style.left = Math.random() * 100 + "vw";
        flower.style.fontSize = (Math.random() * 15 + 10) + "px";
        
        // Rastgele düşme süresi (7s - 15s)
        const duration = Math.random() * 8 + 7;
        flower.style.animationDuration = duration + "s";
        
        // Rastgele gecikme
        flower.style.animationDelay = Math.random() * 5 + "s";

        flowerContainer.appendChild(flower);

        // Animasyon bitince DOM'dan temizle
        setTimeout(() => {
            flower.remove();
        }, duration * 1000);
    }

    // Başlangıçta ekrana yayılmış çiçekler oluştur
    for(let i=0; i<30; i++) {
        setTimeout(createFlower, Math.random() * 3000);
    }
    // Sürekli üretmeye devam et
    setInterval(createFlower, 800);


    // --- 3. SCROLL FADE-IN ANİMASYONLARI ---
    const fadeSections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Bir kere çalışsın
            }
        });
    }, observerOptions);

    fadeSections.forEach(section => {
        sectionObserver.observe(section);
    });


    // --- 4. S.S.S (AKORDİYON) MANTIĞI ---
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        question.addEventListener("click", () => {
            // Açık olanı kapat (İsteğe bağlı, sadece bir tane açık kalsın isteniyorsa)
            const isActive = item.classList.contains("active");
            
            faqItems.forEach(el => {
                el.classList.remove("active");
            });

            if (!isActive) {
                item.classList.add("active");
            }
        });
    });

});