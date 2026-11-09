// Home page gallery: expanding a photo, going back, and the pause button.
const gallery = document.querySelector<HTMLElement>(".gallery")!;
const box = document.querySelector<HTMLDialogElement>(".lightbox")!;
const big = box.querySelector("img")!;
const pause = gallery.querySelector<HTMLButtonElement>(".gallery__pause")!;

const NAME = "gallery-photo";
const still = matchMedia("(prefers-reduced-motion: reduce)");

let origin: HTMLImageElement | null = null;
let openCount = 0;
let opening = false;
let openedByMouse = false;

/** Animates the photo between its two spots where the browser supports it. */
function morph(change: () => void) {
  if (still.matches || !document.startViewTransition) {
    change();
    return Promise.resolve();
  }
  return document.startViewTransition(change).finished;
}

function open(card: HTMLElement) {
  if (box.open || opening) return;
  const thumb = card.querySelector("img")!;
  const id = ++openCount;
  opening = true;
  origin = thumb;
  big.alt = card.dataset.alt ?? "";
  big.src = thumb.currentSrc || thumb.src;
  big.style.setProperty("--ratio", card.dataset.ratio ?? "1.33");
  gallery.classList.add("is-viewing");

  thumb.style.viewTransitionName = NAME;
  morph(() => {
    opening = false;
    thumb.style.viewTransitionName = "";
    if (id !== openCount) return; // closed before it finished opening
    big.style.viewTransitionName = NAME;
    box.showModal();
  }).catch(() => {});
  history.pushState({ wciPhoto: true }, "");

  // Show the small version right away, then swap in the sharp one.
  const sharp = new Image();
  sharp.src = card.dataset.full!;
  sharp
    .decode()
    .then(() => {
      if (id === openCount && box.open) big.src = sharp.src;
    })
    .catch(() => {});
}

function close() {
  if (!box.open) {
    if (opening) {
      openCount++;
      gallery.classList.remove("is-viewing");
    }
    return;
  }
  openCount++;
  const thumb = origin;
  morph(() => {
    big.style.viewTransitionName = "";
    if (thumb) thumb.style.viewTransitionName = NAME;
    box.close();
    gallery.classList.remove("is-viewing");
  })
    .catch(() => {})
    .finally(() => {
      if (thumb) thumb.style.viewTransitionName = "";
    });
}

// Going through history means the browser's Back button closes the photo too.
function requestClose() {
  if (history.state?.wciPhoto) history.back();
  else close();
}

gallery.addEventListener("click", (e) => {
  const card = (e.target as Element).closest<HTMLElement>("[data-full]");
  if (!card) return;
  openedByMouse = e.detail > 0; // keyboard "clicks" report 0
  open(card);
});

box.addEventListener("click", requestClose);
box.addEventListener("cancel", (e) => {
  e.preventDefault();
  requestClose();
});
addEventListener("popstate", close);
// The browser can close the photo on its own when Esc is pressed, so tidy up here too.
box.addEventListener("close", () => {
  gallery.classList.remove("is-viewing");
  if (history.state?.wciPhoto) history.back();
  // The browser hands focus back to the photo; mouse users don't need it, so the row can move again.
  if (openedByMouse && document.activeElement instanceof HTMLElement) document.activeElement.blur();
});

// Rows ease to a stop and back up to speed instead of switching instantly.
const STOP_MS = 900;
const START_MS = 1200;
const canHover = matchMedia("(hover: hover)");
const smooth = (t: number) => t * t * (3 - 2 * t);

const rows = [...gallery.querySelectorAll<HTMLElement>(".gallery__row")].flatMap((row) => {
  // No animation to control when the visitor has reduced motion turned on.
  const anim = row.querySelector(".gallery__track")!.getAnimations()[0];
  return anim ? [{ row, anim, rate: 1, from: 1, to: 1, startedAt: 0, duration: 0 }] : [];
});
let ticking = false;

function shouldStop(row: HTMLElement) {
  return (
    gallery.classList.contains("is-paused") ||
    gallery.classList.contains("is-viewing") ||
    (canHover.matches && row.matches(":hover")) ||
    row.querySelector(".gallery__photo:focus-visible") !== null // keyboard focus only; a mouse click must not leave a row stuck
  );
}

function tick(now: number) {
  let active = false;
  for (const r of rows) {
    if (r.rate === r.to) continue;
    const t = Math.min(1, Math.max(0, (now - r.startedAt) / r.duration));
    r.rate = t === 1 ? r.to : r.from + (r.to - r.from) * smooth(t);
    r.anim.playbackRate = r.rate;
    if (t < 1) active = true;
  }
  ticking = active;
  if (active) requestAnimationFrame(tick);
}

function updateRows() {
  for (const r of rows) {
    const to = shouldStop(r.row) ? 0 : 1;
    if (to === r.to) continue;
    r.from = r.rate;
    r.to = to;
    r.startedAt = performance.now();
    // A row that's already part-way there needs less time to finish.
    r.duration = (to === 0 ? STOP_MS : START_MS) * Math.max(0.35, Math.abs(to - r.rate));
    if (to === 0 && gallery.classList.contains("is-viewing")) {
      // Hidden behind the expanded photo, and the photo must return to the same spot.
      r.rate = 0;
      r.anim.playbackRate = 0;
    }
  }
  if (!ticking && rows.some((r) => r.rate !== r.to)) {
    ticking = true;
    requestAnimationFrame(tick);
  }
}

for (const { row } of rows) {
  row.addEventListener("pointerenter", updateRows);
  row.addEventListener("pointerleave", updateRows);
}
gallery.addEventListener("focusin", updateRows);
gallery.addEventListener("focusout", () => setTimeout(updateRows));
new MutationObserver(updateRows).observe(gallery, { attributes: true, attributeFilter: ["class"] });

// Touch screens can't hover, and moving content needs a way to stop it (WCAG 2.2.2)
pause.addEventListener("click", () => {
  const paused = gallery.classList.toggle("is-paused");
  pause.setAttribute("aria-pressed", String(paused));
});
