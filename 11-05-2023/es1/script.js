const items = [
  { id: 1, title: "test 1" },
  { id: 2, title: "test 2" },
  { id: 3, title: "test 3" },
  { id: 4, title: "test 4" },
  { id: 5, title: "test 5" },
];

const list = document.createElement("ul");

items.forEach((item) => {
  const listItem = document.createElement("li");

  listItem.textContent = item.title;
  list.appendChild(listItem);
});

document.body.appendChild(list);
