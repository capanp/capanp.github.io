document.querySelectorAll(".mccard").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 20;
      const y = (e.clientY - top - height / 2) / 20;
  
      card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
  
    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateY(0deg) rotateX(0deg)"; // Kart eski haline dönsün
    });
  });