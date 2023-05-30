import { mainContent, postsList } from "../script.js";
import { createEl } from "./utilities.js";

export const createTweetElement = (post) => {
  const fallbackImg =
    "https://stonegatesl.com/wp-content/uploads/2021/01/avatar.jpg";
  const tweetElement = createEl("div", { className: "Tweet" });

  const avatarImage = createEl("img", {
    src: post.user?.image || fallbackImg,
    className: "Tweet-avatar",
  });
  tweetElement.appendChild(avatarImage);

  const tweetContent = createEl("article", { className: "Tweet-content" });
  tweetElement.appendChild(tweetContent);

  const fullName = createEl("span", {
    textContent:
      post.user?.firstName && post.user?.lastName
        ? `${post.user.firstName} ${post.user.lastName}`
        : "Deleted user",
    className: "Tweet-content-fullName",
  });
  tweetContent.appendChild(fullName);

  const username = createEl("span", {
    textContent: post.user?.username ? "@" + post.user.username : "deleted",
    className: "Tweet-content-username",
  });
  tweetContent.appendChild(username);

  const tweetText = createEl("p", {
    textContent: post.body,
    className: "Tweet-content-text",
  });
  tweetContent.appendChild(tweetText);

  const tweetFooter = createEl("section", { className: "Tweet-footer" });
  tweetContent.appendChild(tweetFooter);

  const tweetDate = createEl("span", {
    textContent: new Date().toLocaleDateString(),
    className: "Tweet-footer-date",
  });
  tweetFooter.appendChild(tweetDate);

  const reactionsCount = createEl("span", {
    textContent: post.reactions + " 👍",
    className: "Tweet-footer-reactions",
  });
  tweetFooter.appendChild(reactionsCount);

  return tweetElement;
};

export const createPostBox = () => {
  const postBox = createEl("div", { className: "PostBox" });

  const avatarImage = createEl("img", {
    src: "https://robohash.org/800A",
    className: "PostBox-avatar",
  });
  postBox.appendChild(avatarImage);

  const postInput = createEl("textarea", {
    placeholder: "What is happening?!",
    className: "PostBox-input",
  });
  postBox.appendChild(postInput);

  const postButton = createEl("button", {
    textContent: "Tweet",
    className: "PostBox-postButton",
  });
  postButton.addEventListener("click", () => {
    const newPost = {
      body: postInput.value,
      reactions: 0,
      user: {
        firstName: "Test",
        lastName: "user",
        username: "testuser123",
        image: "https://robohash.org/800A",
      },
    };
    postsList.unshift(newPost);
    const tweetElement = createTweetElement(newPost);
    mainContent.insertBefore(tweetElement, postBox.nextSibling);
    postInput.value = "";
  });
  postBox.appendChild(postButton);

  return postBox;
};
