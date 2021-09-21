$(() => {
  $("#navigation").load(`${config.rootPath}navigation.html`, () => {
    // Toggle child lists
    $(".sidebar-sticky .icon").on("click", function () {
      this.classList.toggle("icon-opened");
      // FIXME: use vanilla JS and CSS instead of jQuery
      $(this).siblings("ul").toggle(500);
    });

    // Activate current page
    $(`.sidebar-content a[href='${window.location.pathname}']`)
      .attr("class", "active-link")
      .parents('ul')
      .show();
  })
});
