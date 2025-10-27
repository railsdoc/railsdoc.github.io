document.addEventListener("DOMContentLoaded", () => {
  anchors.options = { visible: "always" };
  anchors.add();
});

$(() => {
  // highlight.js configuration
  hljs.configure({
    languages: ["ruby", "html", "bash", "sql"],
  });
  hljs.highlightAll();

  // Open details that is at the same level as the target of the hash
  window.addEventListener("hashchange", () => {
    const target = document.querySelector(window.location.hash);
    if (!target) return;

    const siblingDetails = target
      .closest("div.method")
      ?.querySelector("details");
    if (siblingDetails) {
      siblingDetails.open = true;
    }
  });

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
