(() => {
  function setUwULogo() {
    const uwuParam = new URLSearchParams(new URL(window.location).search).get(
      "uwu",
    );
    const uwuStorage = localStorage.getItem("uwu");
    if (uwuParam !== null || uwuStorage !== null) {
      if (uwuParam === "false") {
        // disable uwu mode
        localStorage.removeItem("uwu");
        return;
      }
      // enable uwu modes
      localStorage.setItem("uwu", true);
      const qs = (s) => document.querySelector(s);
      qs(".header > .logo-wrap").innerHTML =
        '<a href="/"><img src="/images/uwu.png"/></a>';
      qs(".header.mobile-only > .logo-wrap").innerHTML =
        '<a href="/"><img src="/images/uwu.png" height="80px"/></a>';
      qs(".header.mobile-only").setAttribute("style", "margin: 1rem");
    }
  }
  window.addEventListener("load", setUwULogo, false);
  setTimeout(() => InstantClick.on("change", setUwULogo), 200);
})();
