function scrollToDiv(id: string) {
  const element = document.getElementById(id);

  if (!element) return;

  element.scrollIntoView({ behavior: 'smooth', block: 'start' });

  element.classList.add('div-animation');

  setTimeout(() => {
    element.classList.remove('div-animation');
  }, 1000);
}

export default scrollToDiv;
