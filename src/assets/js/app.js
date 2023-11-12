$(() => {
  // anchor-js
  anchors.options.visible = 'always';
  anchors.add();

  // highlight.js
  hljs.configure({
    languages: ['ruby', 'html', 'bash']
  });
  hljs.highlightAll();

  $("#navigation").load(`${config.rootPath}navigation.html`, function() {
    $(".sidebar-sticky .icon").on("click", function (e) {
      $(this).siblings("ul").toggle();
      this.classList.toggle("icon-opened");
    });
    $(`.sidebar-content a[href='${window.location.pathname}']`)
      .attr("class", "active-link")
      .parents('ul')
      .show();
  })
});
