document.addEventListener("DOMContentLoaded", () => {
  anchors.options = { visible: "always" };
  anchors.add();

  window.addEventListener("hashchange", openDetailsForHash);
  openDetailsForHash();
});

$(() => {
  // highlight.js configuration
  hljs.configure({
    languages: ["ruby", "html", "bash", "sql"],
  });
  hljs.highlightAll();

  $("#navigation").load(`${config.rootPath}navigation.html`, () => {
    $(".sidebar-sticky .icon").on("click", function (e) {
      e.preventDefault();
      $(this).siblings("ul").toggle();
      this.classList.toggle("icon-opened");
    });
    $(`.sidebar-content a[href='${window.location.pathname}']`)
      .attr("class", "active-link")
      .parents("ul")
      .show();
  });
});

// Open details that is at the same level as the target of the hash
function openDetailsForHash() {
  const hash = window.location.hash;
  if (!hash) return;
  const target = document.querySelector(hash);
  if (!target) return;

  const siblingDetails = target.closest("div.method")?.querySelector("details");
  if (siblingDetails) {
    siblingDetails.open = true;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
