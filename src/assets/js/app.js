$(() => {
  $(".sidebar .icon").on("click", function (e) {
    $(this).siblings("ul").toggle();
    this.classList.toggle("icon-opened");
  });
});
