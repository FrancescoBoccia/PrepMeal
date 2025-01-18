// SCROLLING SECTION HOME PAGE
document.addEventListener("DOMContentLoaded", () => {
    const scrollSection = document.querySelector(".scrolling-section");
    const indicators = document.querySelectorAll(".indicator");
  
    const updateIndicators = () => {
      const scrollBoxes = document.querySelectorAll(".scroll-box");
      const scrollSectionRect = scrollSection.getBoundingClientRect();
  
      let activeIndex = 0;
      let minDistance = Infinity;
  
      scrollBoxes.forEach((box, index) => {
        const boxRect = box.getBoundingClientRect();
        const distance = Math.abs(
          boxRect.left + boxRect.width / 2 - scrollSectionRect.left - scrollSectionRect.width / 2
        );
  
        if (distance < minDistance) {
          minDistance = distance;
          activeIndex = index;
        }
      });
  
      indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
          indicator.classList.add("active");
        } else {
          indicator.classList.remove("active");
        }
      });
    };
  
    scrollSection.addEventListener("scroll", updateIndicators);
  
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        const targetBox = document.getElementById(`scroll-box-${index + 1}`);
        if (targetBox) {
          targetBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    });
  
    updateIndicators();
  });


  // LIKE BUTTON
  document.addEventListener("DOMContentLoaded", function() {
    const heartIconContainer = document.querySelector(".heart-icon-container");
    const panImg = heartIconContainer.querySelector(".frying-pan"); 
    
    heartIconContainer.addEventListener("mouseenter", function() {
      heartImg.style.opacity = "0";
      panImg.style.display = "block"; 
      panImg.style.opacity = "1"; 
    });
  
    heartIconContainer.addEventListener("mouseleave", function() {
      heartImg.style.opacity = "1";
      panImg.style.display = "none"; 
      panImg.style.opacity = "0"; 
    });
  });
  
  
  