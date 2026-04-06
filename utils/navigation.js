import { appPages } from "../mvpData";

export function getRouteFromHash() {
  if (typeof window === "undefined") {
    return "landing";
  }

  const route = window.location.hash.replace("#", "");
  return route === "landing" || appPages.some((page) => page.id === route)
    ? route
    : "landing";
}

export function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);

  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
