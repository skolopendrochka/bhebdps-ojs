function deactivateSlides(slides, bullets) {
  slides.forEach(slide => slide.classList.remove('slider__item_active'));
  bullets.forEach(bullet => bullet.classList.remove('slider__dot_active'));
}

function activateSlide(slide, bullets, index) {
  slide.classList.add('slider__item_active');
  bullets[index].classList.add('slider__dot_active');
}

function changeSlide(slides, bullets, index) {
  deactivateSlides(slides, bullets);
  activateSlide(slides[index], bullets, index);
}

function getActiveSlideIndex(bullets) {
  return Array.from(bullets).findIndex(bullet => bullet.classList.contains('slider__dot_active'));
}

function onNextClick(slides, bullets) {
  const index = getActiveSlideIndex(bullets);
  changeSlide(slides, bullets, (index + 1) % slides.length);
}

function onPrevClick(slides, bullets) {
  const index = getActiveSlideIndex(bullets);
  changeSlide(slides, bullets, (index - 1 + slides.length) % slides.length);
}

function onBulletClick(slides, bullets, index) {
  changeSlide(slides, bullets, index);
}

document.addEventListener('DOMContentLoaded', () => {
  const sliderNextArrow = document.querySelector('.slider__arrow_next');
  const sliderPrevArrow = document.querySelector('.slider__arrow_prev');
  const sliderBullets = document.querySelectorAll('.slider__dot');
  const slides = document.querySelectorAll('.slider__item');

  sliderNextArrow.addEventListener('click', () => onNextClick(slides, sliderBullets));
  sliderPrevArrow.addEventListener('click', () => onPrevClick(slides, sliderBullets));

  sliderBullets.forEach((bullet, index) => {
    bullet.addEventListener('click', () => onBulletClick(slides, sliderBullets, index));
  });

  activateSlide(slides[0], sliderBullets, 0);
});
