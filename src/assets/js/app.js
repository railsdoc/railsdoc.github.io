$(() => {
  // anchor-js
  anchors.options.visible = 'always';
  anchors.add();

  // highlight.js
  hljs.highlightAll();

  $("#navigation").load(`${config.rootPath}navigation.html`, () => {
    // Toggle child lists
    $(".sidebar-sticky .icon").on("click", function () {
      // FIXME: use vanilla JS and CSS instead of jQuery
      $(this).siblings("ul").toggle(500);
      this.classList.toggle("icon-opened");
    });

    // Activate current page
    $(`.sidebar-content a[href='${window.location.pathname}']`)
      .attr("class", "active-link")
      .parents('ul')
      .show();
  })
});
