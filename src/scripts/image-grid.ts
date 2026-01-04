class Carousel {
  container!: HTMLElement;
  slides: HTMLElement[] = [];
  dots: HTMLElement[] = [];
  prevBtn: HTMLElement | null = null;
  nextBtn: HTMLElement | null = null;
  currentSlide: number = 0;
  totalSlides: number = 0;
  intervalId: any;

  constructor(containerId: string) {
    const element = document.getElementById(containerId);
    if (!element) return; // Container might not exist (e.g. valid for hidden viewports if logic separates them, or just safety)

    this.container = element;
    // Scope queries to this container
    this.slides = Array.from(this.container.querySelectorAll("[data-slide]"));
    this.dots = Array.from(this.container.querySelectorAll("[data-dot]"));
    this.prevBtn = this.container.querySelector("[data-prev]");
    this.nextBtn = this.container.querySelector("[data-next]");

    this.totalSlides = this.slides.length;

    if (this.totalSlides === 0) return;

    this.init();
  }

  init() {
    // Arrow listeners
    if (this.prevBtn)
      this.prevBtn.addEventListener("click", () =>
        this.showSlide(this.currentSlide - 1)
      );
    if (this.nextBtn)
      this.nextBtn.addEventListener("click", () =>
        this.showSlide(this.currentSlide + 1)
      );

    // Dot listeners
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.showSlide(index));
    });

    // Auto-play
    this.startAutoPlay();

    // Initial render
    this.showSlide(0);
  }

  showSlide(index: number) {
    this.currentSlide = (index + this.totalSlides) % this.totalSlides;

    // Update slides visibility
    this.slides.forEach((slide, i) => {
      if (i === this.currentSlide) {
        slide.classList.remove("opacity-0", "pointer-events-none");
        slide.classList.add("opacity-100", "z-10");
      } else {
        slide.classList.remove("opacity-100", "z-10");
        slide.classList.add("opacity-0", "pointer-events-none");
      }
    });

    // Update dots
    this.dots.forEach((dot, i) => {
      if (i === this.currentSlide) {
        dot.classList.add("bg-gray-900");
        dot.classList.remove("bg-gray-300");
      } else {
        dot.classList.remove("bg-gray-900");
        dot.classList.add("bg-gray-300");
      }
    });

    // Reset timer on manual interaction
    this.resetAutoPlay();
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.showSlide(this.currentSlide + 1);
    }, 5000);
  }

  resetAutoPlay() {
    clearInterval(this.intervalId);
    this.startAutoPlay();
  }
}

// Initialize carousels and modal when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new Carousel("desktop-carousel");
  new Carousel("tablet-carousel");
  new Carousel("mobile-carousel");

  const modal = document.getElementById('sale-modal');
  const modalContent = document.getElementById('sale-modal-content');
  const closeBtn = document.getElementById('close-modal');
  const saleBadges = document.querySelectorAll('[data-sale-badge]');

  const openModal = () => {
    if (!modal || !modalContent) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    // Force reflow for animation
    void modal.offsetWidth;
    modalContent.classList.remove('scale-95', 'opacity-0');
    modalContent.classList.add('scale-100', 'opacity-100');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal || !modalContent) return;
    modalContent.classList.add('scale-95', 'opacity-0');
    modalContent.classList.remove('scale-100', 'opacity-100');
    setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }, 300);
  };

  saleBadges.forEach(badge => {
    badge.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModal();
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
});
