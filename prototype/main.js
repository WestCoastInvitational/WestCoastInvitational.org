// Doors open 8:30 AM PDT, July 10, 2027
const DOORS = Date.parse("2027-07-10T08:30:00-07:00");

const cd = Object.fromEntries(
  [...document.querySelectorAll("[data-cd]")].map((el) => [el.dataset.cd, el])
);
const pad = (n) => String(n).padStart(2, "0");

function tick() {
  const left = Math.max(0, DOORS - Date.now());
  const s = Math.floor(left / 1000);
  cd.d.textContent = Math.floor(s / 86400);
  cd.h.textContent = pad(Math.floor((s % 86400) / 3600));
  cd.m.textContent = pad(Math.floor((s % 3600) / 60));
  cd.s.textContent = pad(s % 60);
}
tick();
setInterval(tick, 1000);

// Nav: solid on scroll, mobile toggle
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav__toggle");
const links = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", open);
  links.classList.toggle("is-open", open);
  nav.classList.toggle("is-open", open);
});
links.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    toggle.setAttribute("aria-expanded", "false");
    links.classList.remove("is-open");
    nav.classList.remove("is-open");
  }
});

// The sun starts half set on the horizon and sinks below the sea as you scroll
const sunset = document.querySelector(".sunset");
const hero = document.querySelector(".hero");
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle("is-scrolled", y > 40);
  if (still) return;
  const p = Math.min(1, y / (hero.offsetHeight * 0.85));
  // ease-in so it starts slow, then drops; 50% of its height = fully under the horizon
  sunset.style.transform = `translateY(${p * p * 50}%)`;
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Phones and portrait tablets: grow the sunset into the free space around the
// copy, as big as it can get without touching any text or button
const stacked = matchMedia("(max-width: 640px), (max-width: 1080px) and (orientation: portrait)");
const sea = hero.querySelector(".sea");
const blockers = hero.querySelectorAll(".hero__title span, .hero__when, .countdown > div, .hero__actions .btn");

function textBox(el) {
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

// Lineup: no separator dot at the start of a wrapped line
function markLineStarts() {
  for (const tier of document.querySelectorAll(".tier")) {
    let top = null;
    for (const li of tier.children) {
      li.classList.remove("line-start");
      if (top !== null && li.offsetTop > top + 4) li.classList.add("line-start");
      top = li.offsetTop;
    }
  }
}
markLineStarts();
document.fonts.ready.then(markLineStarts);
addEventListener("resize", markLineStarts);

// Section reveal: content is visible by default, only staged once JS runs
if (!still && "IntersectionObserver" in window) {
  const targets = document.querySelectorAll(
    ".about__intro, .mosaic, .facts, .road__head, .steps li, .timeline, .lineup, .quick__list, .venue > *, .join__half > div"
  );
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.remove("is-pending");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  targets.forEach((t) => {
    if (t.getBoundingClientRect().top > innerHeight) {
      t.classList.add("reveal", "is-pending");
      io.observe(t);
    }
  });
}
