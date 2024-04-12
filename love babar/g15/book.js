// JavaScript code for stopping the book slide on hover
const bookSlider = document.querySelector('.book-slider');

bookSlider.addEventListener('mouseenter', () => {
    bookSlider.style.animationPlayState = 'paused';
});

bookSlider.addEventListener('mouseleave', () => {
    bookSlider.style.animationPlayState = 'running';
});
