// Home page only: countdown, sunset scroll, marquee pause.
import { event } from "../data/event";

const DOORS = Date.parse(event.doorsOpen);

const cd = Object.fromEntries(
  [...document.querySelectorAll<HTMLElement>("[data-cd]")].map((el) => [el.dataset.cd, el])
);
const pad = (n: number) => String(n).padStart(2, "0");

function tick() {
  const left = Math.max(0, DOORS - Date.now());
  const s = Math.floor(left / 1000);
  cd.d.textContent = String(Math.floor(s / 86400));
  cd.h.textContent = pad(Math.floor((s % 86400) / 3600));
  cd.m.textContent = pad(Math.floor((s % 3600) / 60));
  cd.s.textContent = pad(s % 60);
}
tick();
setInterval(tick, 1000);

// The sun starts half set on the horizon and sinks below the sea as you scroll
const sunset = document.querySelector<HTMLElement>(".sunset")!;
const hero = document.querySelector<HTMLElement>(".hero")!;
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

function onScroll() {
  if (still) return;
  const p = Math.min(1, window.scrollY / (hero.offsetHeight * 0.85));
  // ease-in so it starts slow, then drops; 50% of its height = fully under the horizon
  sunset.style.transform = `translateY(${p * p * 50}%)`;
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Phones and portrait tablets: grow the sunset into the free space around the
// copy, as big as it can get without touching any text or button
const stacked = matchMedia("(max-width: 640px), (max-width: 1080px) and (orientation: portrait)");
const sea = hero.querySelector<HTMLElement>(".sea")!;
const blockers = hero.querySelectorAll<HTMLElement>(".hero__title span, .hero__when, .countdown > div, .hero__actions .btn");

function textBox(el: HTMLElement) {
  if (el.matches(".btn, .countdown > div")) return el.getBoundingClientRect();
  const r = document.createRange();
  r.selectNodeContents(el);
  return r.getBoundingClientRect();
}

function fitSun() {
  if (!stacked.matches) {
    hero.style.removeProperty("--fit");
    hero.style.removeProperty("--cx");
    return;
  }
  const h = hero.getBoundingClientRect();
  const w = h.width;
  const horizon = h.height - sea.offsetHeight;
  const boxes = [...blockers].map((el) => {
    const b = textBox(el);
    return { l: b.left - h.left, r: b.right - h.left, t: b.top - h.top, b: b.bottom - h.top };
  });
  const maxR = w * 0.56;
  let best = { r: 0, cx: w * 0.75 };
  for (let cx = w * 0.55; cx <= w * 0.9; cx += w * 0.01) {
    let r = maxR;
    for (const b of boxes) {
      const dx = Math.max(b.l - cx, 0, cx - b.r);
      const dy = Math.max(horizon - b.b, 0);
      r = Math.min(r, Math.hypot(dx, dy) - 14);
    }
    if (r > best.r) best = { r, cx };
  }
  hero.style.setProperty("--fit", `${Math.max(0, best.r * 2)}px`);
  hero.style.setProperty("--cx", `${best.cx}px`);
}
fitSun();
document.fonts.ready.then(fitSun);
addEventListener("resize", fitSun);

// Moving text needs a way to stop it (WCAG 2.2.2)
const pause = document.querySelector<HTMLButtonElement>(".marquee__pause")!;
pause.addEventListener("click", () => {
  const paused = sea.classList.toggle("is-paused");
  pause.setAttribute("aria-pressed", String(paused));
});
