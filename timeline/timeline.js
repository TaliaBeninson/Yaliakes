document.addEventListener("DOMContentLoaded", () => {
    const dots = document.querySelectorAll(".timeline-bar .dot");
  const sections = document.querySelectorAll(".scroll-container .card");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target);
            dots.forEach(dot => dot.classList.remove("active"));
            if (dots[index]) dots[index].classList.add("active");
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          sections[index].scrollIntoView({ behavior: "smooth", block: "start" });
    
          // Optional: set active class immediately
          dots.forEach(dot => dot.classList.remove("active"));
          dot.classList.add("active");
        });
      });
  
      sections.forEach(card => observer.observe(card));
  
    function updateCountup() {
      const countupElement = document.getElementById("countup");
      if (!countupElement) return;
  
      const israelOffset = 3 * 60;
      const targetDate = new Date(Date.UTC(2025, 4, 18, 17, 0));
  
      const now = new Date();
      const diff = now - targetDate;
  
      if (diff < 0) {
        countupElement.textContent = "Not yet! 😳";
        return;
      }
  
      const seconds = Math.floor(diff / 1000);
      const days = Math.floor(seconds / (3600 * 24));
      const hours = Math.floor((seconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
  
      countupElement.textContent =
        `${days} days, ${hours} hours, ${minutes} minutes, ${secs} seconds`;
    }
  
    updateCountup();
    setInterval(updateCountup, 1000);
  });
  