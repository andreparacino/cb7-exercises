import { fetchUserMappedPosts } from "./helpers/api.js";
import { createPostBox, createTweetElement } from "./helpers/generators.js";

const navBtnList = document.querySelectorAll(".Navbar-navItem");
const mainNavOptionBtnList = document.querySelectorAll(
  ".Main-header-optionsItem"
);
export const mainContent = document.querySelector(".Main-content");
export let postsList = [];

fetchUserMappedPosts()
  .then((data) => {
    postsList = data;
    mainContent.appendChild(createPostBox());
    postsList.forEach((post) => {
      const tweetElement = createTweetElement(post);
      mainContent.appendChild(tweetElement);
    });
  })
  .catch((error) => console.error(error));

navBtnList.forEach((navBtn) => {
  navBtn.addEventListener("click", () => {
    navBtnList.forEach((_navBtn) =>
      _navBtn.classList.remove("Navbar-navItem--active")
    );
    navBtn.classList.add("Navbar-navItem--active");
  });
});

mainNavOptionBtnList.forEach((mainNavOptionBtn) => {
  mainNavOptionBtn.addEventListener("click", () => {
    mainNavOptionBtnList.forEach((_mainNavOptionBtn) =>
      _mainNavOptionBtn.classList.remove("Main-header-optionsItem--active")
    );
    mainNavOptionBtn.classList.add("Main-header-optionsItem--active");
  });
});
