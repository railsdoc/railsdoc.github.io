$(() => {
  $(".sidenav .icon").on("click", function (e) {
    $(this).siblings("ul").show();
  });
});
