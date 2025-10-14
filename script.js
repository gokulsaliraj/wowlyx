
// Smiley animation
const smiley = document.getElementById('smiley');
const mouth = document.getElementById('mouth');
const eyeLeft = document.getElementById('eye-left');
const eyeRight = document.getElementById('eye-right');

let eyesMoving = false;
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

if(smiley && smiley.parentElement){
  smiley.parentElement.addEventListener('mouseenter', () => {
    eyesMoving = true;
    if(mouth) mouth.setAttribute('d', 'M7 16s2.5 3 5 3 5-3 5-3');
  });
  smiley.parentElement.addEventListener('mouseleave', () => {
    eyesMoving = false;
    if(eyeLeft){ eyeLeft.setAttribute('cx', 9); eyeLeft.setAttribute('cy', 9); }
    if(eyeRight){ eyeRight.setAttribute('cx', 15); eyeRight.setAttribute('cy', 9); }
    if(mouth) mouth.setAttribute('d', 'M7 17s2 2.5 5 2.5 5-2.5 5-2.5');
  });
}

function animateEyes() {
  if(eyesMoving && smiley && eyeLeft && eyeRight){
    const rect = smiley.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = Math.max(-2, Math.min(2, (mouseX - cx) / 20));
    const dy = Math.max(-2, Math.min(2, (mouseY - cy) / 20));
    eyeLeft.setAttribute('cx', 9 + dx);
    eyeLeft.setAttribute('cy', 9 + dy);
    eyeRight.setAttribute('cx', 15 + dx);
    eyeRight.setAttribute('cy', 9 + dy);
  }
  requestAnimationFrame(animateEyes);
}
animateEyes();




const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;

  // Mobile menu toggle
  if(menuOpen){
    mobileMenu.style.display = "block";
    setTimeout(() => mobileMenu.style.opacity = "1", 10);
  } else {
    mobileMenu.style.opacity = "0";
    setTimeout(() => mobileMenu.style.display = "none", 300);
  }

  // Animate hamburger to X
  const lines = hamburger.querySelectorAll('.hamburger-line');
  if(menuOpen){
    lines[0].style.transform = "rotate(45deg) translateY(8px)";
    lines[1].style.opacity = "0";
    lines[2].style.transform = "rotate(-45deg) translateY(-8px)";
  } else {
    lines[0].style.transform = "rotate(0) translateY(0)";
    lines[1].style.opacity = "1";
    lines[2].style.transform = "rotate(0) translateY(0)";
  }
});





    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevBtn = document.querySelector('.arrow-left');
    const nextBtn = document.querySelector('.arrow-right');
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));
    let currentIndex = 0;

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentIndex].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        currentIndex = parseInt(e.target.dataset.index);
        updateCarousel();
      });
    });

    // Auto slide every 5 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }, 5000);