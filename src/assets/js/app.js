$(() => {
  $(".sidebar-sticky .icon").on("click", function (e) {
    $(this).siblings("ul").toggle();
    this.classList.toggle("icon-opened");
  });

  hljs.initHighlightingOnLoad();

  anchors.add();
});
