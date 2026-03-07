type ScrollNavOptions = {
  linkSelector?: string;
  sectionSelector?: string;
  activeAttr?: string;
  offset?: number;
};

export function initScrollNav(options: ScrollNavOptions = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return () => undefined;
  }

  const {
    linkSelector = "[data-scroll-link]",
    sectionSelector = "[data-scroll-section]",
    activeAttr = "data-active",
    offset = 120,
  } = options;

  const links = Array.from(
    document.querySelectorAll<HTMLElement>(linkSelector)
  );
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>(sectionSelector)
  );

  if (!links.length || !sections.length) {
    return () => undefined;
  }

  const activate = (id: string) => {
    links.forEach((link) => {
      const isActive = link.dataset.scrollLink === id;
      link.setAttribute(activeAttr, isActive ? "true" : "false");
    });
  };

  const handleClick = (event: Event) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement | null;
    if (!target) return;
    const targetId = target.dataset.scrollLink;
    if (!targetId) return;
    const node = document.getElementById(targetId);
    if (!node) return;

    const top =
      window.scrollY + node.getBoundingClientRect().top - offset;
    window.scrollTo({ top, behavior: "smooth" });
    activate(targetId);
    try {
      history.replaceState(null, "", `#${targetId}`);
    } catch (_) {
      /* no-op */
    }
  };

  links.forEach((link) => link.addEventListener("click", handleClick));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          activate(entry.target.id);
        }
      });
    },
    {
      rootMargin: `-${offset}px 0px -50% 0px`,
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  sections.forEach((section) => observer.observe(section));
  activate(sections[0].id);

  return () => {
    links.forEach((link) => link.removeEventListener("click", handleClick));
    observer.disconnect();
  };
}
