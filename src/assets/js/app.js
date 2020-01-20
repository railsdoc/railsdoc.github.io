$(() => {
  $(".sidebar-sticky .icon").on("click", function (e) {
    $(this).siblings("ul").toggle();
    this.classList.toggle("icon-opened");
  });

  hljs.initHighlightingOnLoad();

  anchors.options.visible = 'always';
  anchors.add();

  $(`.sidebar-content a[href='${window.location.pathname}']`)
    .attr("class", "active-link")
    .parents('ul').show();
});
