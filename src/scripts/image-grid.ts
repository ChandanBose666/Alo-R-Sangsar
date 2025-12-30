
    let currentSlide = 0;
    const carouselSlides: HTMLElement[] = Array.from(document.querySelectorAll('[id^="slide-"]'));
    const dots: HTMLElement[] = Array.from(document.querySelectorAll('[id^="dot-"]'));
    const totalSlides = carouselSlides.length;

    if (totalSlides === 0) {
        // Nothing to do if there are no slides
        console.warn('Carousel: no slides found');
    } else {
        function showSlide(index: number) {
            currentSlide = (index + totalSlides) % totalSlides;

            // Update slides
            carouselSlides.forEach((slide, i) => {
                slide.classList.toggle('opacity-0', i !== currentSlide);
                slide.classList.toggle('opacity-100', i === currentSlide);
            });

            // Update dots
            dots.forEach((dot, i) => {
                if (i === currentSlide) {
                    dot.classList.add('bg-white');
                    dot.classList.add('w-6');
                    dot.classList.remove('bg-white/50');
                    dot.classList.remove('hover:bg-white/75');
                } else {
                    dot.classList.remove('bg-white');
                    dot.classList.remove('w-6');
                    dot.classList.add('bg-white/50');
                    dot.classList.add('hover:bg-white/75');
                }
            });
        }

        // Arrow navigation (guard for missing buttons)
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

        // Dot navigation
        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                const idx = dot.dataset.index;
                if (typeof idx !== 'undefined') showSlide(parseInt(idx, 10));
            });
        });

        // Optional: Auto-advance every 5 seconds
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);

        // Show initial slide
        showSlide(0);
    }
