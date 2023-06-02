export const scrollTop = (): void => {
  window.scrollBy({
    top: -window.innerHeight,
    behavior: "smooth",
  });
};

export const scrollDown = (): void => {
  window.scrollBy({
    top: window.innerHeight,
    behavior: "smooth",
  });
};
