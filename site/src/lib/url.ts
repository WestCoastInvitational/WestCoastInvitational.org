const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Makes an internal path work on both the real domain and the /wci-preview test site. */
export function url(path: string): string {
  if (!path.startsWith("/")) return path;
  const hasExtension = /\.[a-z0-9]+$/i.test(path);
  const withSlash = hasExtension || path.endsWith("/") ? path : `${path}/`;
  return `${base}${withSlash}`;
}

/** Turns the current URL into a site path like "/event/schedule". */
export function sitePath(pathname: string): string {
  const stripped = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  const clean = stripped.replace(/\/$/, "");
  return clean === "" ? "/" : clean;
}
