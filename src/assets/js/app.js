$(() => {
  // anchor-js
  anchors.options.visible = 'always';
  anchors.add();

  // highlight.js
  hljs.highlightAll();

  $(".sidebar-sticky .icon").on("click", function (e) {
    $(this).siblings("ul").toggle();
    this.classList.toggle("icon-opened");
  });
  $(`.sidebar-content a[href='${window.location.pathname}']`)
    .attr("class", "active-link")
    .parents('ul')
    .show();
});
