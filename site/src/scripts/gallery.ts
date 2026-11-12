// Home page gallery: moving the rows, expanding a photo, and going back.
const gallery = document.querySelector<HTMLElement>(".gallery")!;
const box = document.querySelector<HTMLDialogElement>(".lightbox")!;
const big = box.querySelector("img")!;

const NAME = "gallery-photo";
const still = matchMedia("(prefers-reduced-motion: reduce)");

let origin: HTMLImageElement | null = null;
let openCount = 0;
let opening = false;
let closing = false;
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
  closing = true;
  const thumb = origin;
  morph(() => {
    big.style.viewTransitionName = "";
    if (thumb) thumb.style.viewTransitionName = NAME;
    box.close();
  })
    .catch(() => {})
    .finally(() => {
      closing = false;
      if (thumb) thumb.style.viewTransitionName = "";
      // Only now, so the rows hold still while the photo flies back to its spot.
      gallery.classList.remove("is-viewing");
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
  if (!closing) gallery.classList.remove("is-viewing");
  if (history.state?.wciPhoto) history.back();
  // The browser hands focus back to the photo; mouse users don't need it, so the row can move again.
  if (openedByMouse && document.activeElement instanceof HTMLElement) document.activeElement.blur();
});

// This loop is the only thing that moves the rows. A CSS animation with its speed changed
// from script can paint at a different position than the script sees, which shows as a jump.
const STOP_MS = 900;
const START_MS = 1200;
const LONGEST_STEP_MS = 64; // after a stall, carry on instead of leaping ahead
const smooth = (t: number) => t * t * (3 - 2 * t);

const rows = [...gallery.querySelectorAll<HTMLElement>(".gallery__row")].map((row) => ({
  row,
  track: row.querySelector<HTMLElement>(".gallery__track")!,
  loopMs: Number(row.dataset.loop) * 1000,
  progress: 0,
  rate: 1,
  from: 1,
  to: 1,
  startedAt: 0,
  duration: 0,
}));

let pointer: { x: number; y: number } | null = null;
addEventListener(
  "pointermove",
  (e) => {
    pointer = e.pointerType === "touch" ? null : { x: e.clientX, y: e.clientY };
  },
  { passive: true }
);
document.documentElement.addEventListener("pointerleave", () => {
  pointer = null;
});

// Looked up every frame, so a row also stops when it scrolls under a resting cursor.
// The strips between rows count as the nearest row, so there's nowhere that stops nothing.
function rowUnderPointer() {
  if (!pointer) return null;
  const { x, y } = pointer;
  const under = document.elementFromPoint(x, y);
  if (!under || !gallery.contains(under)) return null;

  let nearest: HTMLElement | null = null;
  let nearestDistance = Infinity;
  for (const { row } of rows) {
    const box = row.getBoundingClientRect();
    const distance = Math.max(box.top - y, y - box.bottom, 0);
    if (distance < nearestDistance) {
      nearest = row;
      nearestDistance = distance;
    }
  }
  return nearest;
}

function rowWithKeyboardFocus() {
  const active = document.activeElement;
  return active?.matches(".gallery__photo:focus-visible") ? active.closest(".gallery__row") : null;
}

let frameId = 0;
let lastFrame = 0;

function frame(now: number) {
  frameId = requestAnimationFrame(frame);
  const step = lastFrame ? Math.min(now - lastFrame, LONGEST_STEP_MS) : 0;
  lastFrame = now;

  const viewing = gallery.classList.contains("is-viewing");
  const hovered = rowUnderPointer();
  const focused = rowWithKeyboardFocus();

  for (const r of rows) {
    const to = viewing || r.row === hovered || r.row === focused ? 0 : 1;
    if (to !== r.to) {
      r.from = r.rate;
      r.to = to;
      r.startedAt = now;
      // A row that's already part-way there needs less time to finish.
      r.duration = (to === 0 ? STOP_MS : START_MS) * Math.max(0.35, Math.abs(to - r.rate));
    }
    if (viewing) {
      r.rate = 0; // the expanded photo has to return to the same spot
    } else if (r.rate !== r.to) {
      const t = Math.min(1, (now - r.startedAt) / r.duration);
      r.rate = t === 1 ? r.to : r.from + (r.to - r.from) * smooth(t);
    }
    if (r.rate === 0) continue;
    // Each row holds two copies of its photos, so moving by half of it loops seamlessly.
    r.progress = (((r.progress + (step * r.rate) / r.loopMs) % 1) + 1) % 1;
    r.track.style.transform = `translate3d(${-50 * r.progress}%, 0, 0)`;
  }
}

let onScreen = false;

function syncMotion() {
  const run = onScreen && !still.matches;
  if (run && !frameId) {
    frameId = requestAnimationFrame(frame);
  } else if (!run && frameId) {
    cancelAnimationFrame(frameId);
    frameId = 0;
    lastFrame = 0;
  }
  if (still.matches) for (const r of rows) r.track.style.transform = "";
}

new IntersectionObserver(([entry]) => {
  onScreen = entry.isIntersecting;
  syncMotion();
}).observe(gallery);
still.addEventListener("change", syncMotion);
