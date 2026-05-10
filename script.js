const dock = document.querySelector('.dock');
const icons = document.querySelectorAll('.dock img');

dock.addEventListener('mousemove', (e) => {
  icons.forEach(icon => {
    const rect = icon.getBoundingClientRect();
    const iconCenter = rect.left + rect.width / 2;

    const distance = Math.abs(e.clientX - iconCenter);

    const scale = Math.max(1, 2 - distance / 100);

    icon.style.transform = `scale(${scale}) translateY(${-(scale * 10)}px)`;
  });
});

dock.addEventListener('mouseleave', () => {
  icons.forEach(icon => {
    icon.style.transform = 'scale(1) translateY(0)';
  });
});