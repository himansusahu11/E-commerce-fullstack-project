export const sliderSettings = {
  slidesPerView: 4, // Number of slides to show at a time
  spaceBetween: 20, // Space between slides
  loop: true, // Enable infinite loop
  pagination: { clickable: true },
  navigation: true,
  breakpoints: {
    // Adjust breakpoints for responsiveness
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  },
};
