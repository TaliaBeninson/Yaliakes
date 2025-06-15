document.addEventListener("DOMContentLoaded", () => {
  const dots = document.querySelectorAll(".dot");
  const cards = document.querySelectorAll(".scroll-container > .card");
  const scrollContainer = document.querySelector(".scroll-container");

  let clickedIndex = null;

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const index = dot.getAttribute("data-index");
      const target = document.querySelector(`.card[data-index="${index}"]`);
      if (target) {
        clickedIndex = index;

        dots.forEach(dot => dot.classList.remove("active"));
        dot.classList.add("active");

        target.scrollIntoView({ behavior: "smooth", block: "start" });

        setTimeout(() => {
          clickedIndex = null;
        }, 800);
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const index = entry.target.getAttribute("data-index");

      if (entry.isIntersecting) {
        if (clickedIndex === null) {
          dots.forEach(dot => dot.classList.remove("active"));
          const activeDot = document.querySelector(`.dot[data-index="${index}"]`);
          if (activeDot) {
            activeDot.classList.add("active");
          } 
        }
      }
    });
  }, {
    root: scrollContainer,
    threshold: 0.3
  });

  cards.forEach(card => {
    observer.observe(card);
  });

  // Collapsible logic
  const collapsibles = document.querySelectorAll(".collapsible");
  collapsibles.forEach(button => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const isOpen = content.style.maxHeight;
      document.querySelectorAll('.content').forEach(c => c.style.maxHeight = null);
      if (!isOpen) content.style.maxHeight = content.scrollHeight + "px";
    });
  });

  document.querySelectorAll('.icon-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const target = document.getElementById(targetId);
  
      document.querySelectorAll('.overlay-card').forEach(card => {
        if (card.id === targetId) {
          card.classList.toggle('active');
        } else {
          card.classList.remove('active');
        }
      });
    });
  });
  
  // Optional: close overlays when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.overlay-card') && !e.target.closest('.icon-toggle')) {
      document.querySelectorAll('.overlay-card').forEach(card => card.classList.remove('active'));
    }
  });
});


function updateCountup() {
  const countupElement = document.getElementById("countup");
  if (!countupElement) return;

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

