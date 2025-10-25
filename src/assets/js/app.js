document.addEventListener('DOMContentLoaded', () => {
  anchors.options.visible = 'always';
  anchors.add('h3');
});

$(() => {
  // highlight.js
  hljs.configure({
    languages: ['ruby', 'html', 'bash', 'sql']
  });
  hljs.highlightAll();

  $("#navigation").load(`${config.rootPath}navigation.html`, function() {
    $(".sidebar-sticky .icon").on("click", function (e) {
      e.preventDefault();
      $(this).siblings("ul").toggle();
      this.classList.toggle("icon-opened");
    });
    $(`.sidebar-content a[href='${window.location.pathname}']`)
      .attr("class", "active-link")
      .parents('ul')
      .show();
  })
});
