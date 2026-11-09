// Runs on every page: nav, dropdowns, Extras lineup, and section reveals.
const nav = document.querySelector<HTMLElement>(".nav")!;
const toggle = nav.querySelector<HTMLButtonElement>(".nav__toggle")!;
const links = document.getElementById("nav-links")!;
const items = [...nav.querySelectorAll<HTMLElement>(".nav__item")];

function setItem(item: HTMLElement, open: boolean) {
  item.classList.toggle("is-open", open);
  item.querySelector(".nav__more")?.setAttribute("aria-expanded", String(open));
}
const closeItems = (except?: HTMLElement) => items.filter((i) => i !== except).forEach((i) => setItem(i, false));

function setMenu(open: boolean) {
  toggle.setAttribute("aria-expanded", String(open));
  links.classList.toggle("is-open", open);
  nav.classList.toggle("is-open", open);
  if (!open) closeItems();
}

toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));

for (const item of items) {
  item.querySelector(".nav__more")?.addEventListener("click", () => {
    closeItems(item);
    setItem(item, !item.classList.contains("is-open"));
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const open = items.find((i) => i.classList.contains("is-open"));
  if (open) {
    setItem(open, false);
    open.querySelector<HTMLElement>(".nav__more")?.focus();
  } else if (toggle.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    toggle.focus();
  }
});

document.addEventListener("click", (e) => {
  if (!(e.target as Element).closest(".nav__item")) closeItems();
});

const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Sunset: the hovered layer rises and its neighbors ripple
const RIPPLE = [1, 0.5, 0.2];
for (const svg of document.querySelectorAll<SVGSVGElement>(".rings")) {
  const rings = [...svg.querySelectorAll<SVGElement>(".ring")];
  svg.addEventListener("pointerover", (e) => {
    const hit = (e.target as Element).closest<SVGElement>("[data-ring]");
    if (!hit) return;
    const active = Number(hit.dataset.ring);
    rings.forEach((ring, i) => {
      const distance = Math.abs(i - active);
      ring.style.setProperty("--lift", String(RIPPLE[distance] ?? 0));
      ring.classList.toggle("is-hot", distance === 0);
    });
  });
  svg.addEventListener("pointerleave", () => {
    for (const ring of rings) {
      ring.style.removeProperty("--lift");
      ring.classList.remove("is-hot");
    }
  });
}

// Lineup: no separator dot at the start of a wrapped line
function markLineStarts() {
  for (const tier of document.querySelectorAll<HTMLElement>(".tier")) {
    let top: number | null = null;
    for (const li of tier.children as HTMLCollectionOf<HTMLElement>) {
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
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!still && "IntersectionObserver" in window) {
  const targets = document.querySelectorAll(
    ".about__intro, .gallery, .facts, .road__head, .steps li, .ask > *, .cards li, .block, .photo, .lineup, .teamgrid li"
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
