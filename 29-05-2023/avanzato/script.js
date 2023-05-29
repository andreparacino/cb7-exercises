const navBtnList = document.querySelectorAll(".Navbar-navItem");
const mainNavOptionBtnList = document.querySelectorAll(
  ".Main-header-optionsItem"
);

navBtnList.forEach((navBtn) => {
  navBtn.addEventListener("click", () => {
    navBtnList.forEach((_navBtn) => {
      _navBtn.classList.remove("Navbar-navItem--active");
    });
    navBtn.classList.add("Navbar-navItem--active");
  });
});

mainNavOptionBtnList.forEach((mainNavOptionBtn) => {
  mainNavOptionBtn.addEventListener("click", () => {
    mainNavOptionBtnList.forEach((_mainNavOptionBtn) => {
      _mainNavOptionBtn.classList.remove("Main-header-optionsItem--active");
    });
    mainNavOptionBtn.classList.add("Main-header-optionsItem--active");
  });
});
