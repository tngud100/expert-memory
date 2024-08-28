export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
  });
};

export const formattedPrice = (value) => parseInt(value).toLocaleString();
