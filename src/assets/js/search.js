$(() => {
  const searchForm = document.getElementById("search-form")

  addEventListener("keydown", (e) => {
    switch (e.key) {
      case '/':
        if (document.activeElement === searchForm) break

        e.preventDefault()
        searchForm.focus()
        break
      case 'Escape':
        if (document.activeElement === searchForm) {
          searchForm.blur()
        }
        break
    }
  })
});
