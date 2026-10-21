// CSS scroll-snap ベースのカルーセルに、前後ボタンと自動送りを足すだけの小さなスクリプト
function setup(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>('[data-track]');
  if (!track) return;
  const step = () => track.querySelector<HTMLElement>('.carousel-item')?.offsetWidth ?? track.clientWidth;
  const atEnd = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;

  const go = (dir: 1 | -1) => {
    if (dir === 1 && atEnd()) track.scrollTo({ left: 0, behavior: 'smooth' });
    else if (dir === -1 && track.scrollLeft <= 2) track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    else track.scrollBy({ left: dir * step(), behavior: 'smooth' });
  };

  root.querySelector('[data-prev]')?.addEventListener('click', () => go(-1));
  root.querySelector('[data-next]')?.addEventListener('click', () => go(1));

  const interval = Number(root.dataset.interval ?? 0);
  if (!interval || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let timer = setInterval(() => go(1), interval);
  const stop = () => clearInterval(timer);
  const start = () => {
    stop();
    timer = setInterval(() => go(1), interval);
  };
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);
}

document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(setup);
