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
      // enable uwu mode
      localStorage.setItem("uwu", true);
      const logo = document.querySelector(".logo-wrap");
      logo.innerHTML = '<a href="/"><img src="/images/uwu.png"/></a>';
    }
  }
  window.addEventListener("load", setUwULogo, false);
  setTimeout(() => InstantClick.on("change", setUwULogo), 200);
})();
