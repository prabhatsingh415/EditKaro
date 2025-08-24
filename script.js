document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const items = gsap.utils.toArray(".portfolio-item");

  // GSAP scroll animation
  items.forEach((item) => {
    gsap.to(item, {
      scale: 0.7,
      opacity: 0,
      scrollTrigger: {
        trigger: item,
        start: "top 15%",
        end: "bottom 15%",
        scrub: true,
      },
    });
  });

  // Filter Buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter-btn.active").classList.remove("active");
      btn.classList.add("active");
      const category = btn.dataset.category;

      items.forEach((item) => {
        item.style.display =
          category === "all" || item.dataset.category === category
            ? "flex"
            : "none";
      });
    });
  });

  // Modal functionality
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");

  // Function to add description to modal
  const addDescription = (description) => {
    // Remove old description if exists
    const oldDesc = modal.querySelector("p");
    if (oldDesc) oldDesc.remove();

    // Add new description
    const desc = document.createElement("p");
    desc.textContent = description || "No description available.";
    modal.querySelector(".modal-content").appendChild(desc);
  };

  const closeBtn = document.querySelector(".close");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = item.querySelector("img").src;
      modalTitle.textContent = item.querySelector(".overlay h3").textContent;
      addDescription(item.dataset.description);
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});

const menuToggle = document.getElementById("menu-toggle");
const mobilePanel = document.getElementById("mobile-panel");
const closeBtn = document.getElementById("close-btn");

// Open Panel
menuToggle.addEventListener("click", () => {
  mobilePanel.style.right = "0";
});

// Close Panel
closeBtn.addEventListener("click", () => {
  mobilePanel.style.right = "-100%";
});
