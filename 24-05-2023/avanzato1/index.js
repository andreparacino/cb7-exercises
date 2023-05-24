// ES1
const person1 = ["Andrea", "Paracino", "Italia"];
const person2 = ["Andrea", "Paracino"];

const getPersonInfo = (person) => {
  const [name, surname, country = "Not specified"] = person;
  return `${name} ${surname} - Country: ${country}`;
};

console.log(getPersonInfo(person1)); // Andrea Paracino - Country: Italia
console.log(getPersonInfo(person2)); // Andrea Paracino - Country: Not specified

// ES2
const book1 = {
  title: "Come fare soldi",
  author: "Andrea Paracino",
  year: 1725,
};
const book2 = {
  title: "Come fare soldi",
  author: "Andrea Paracino",
};

const getBookInfo = (book) => {
  const { title, author, year = "Year not specified" } = book;
  return `${title} - ${author} [${year}]`;
};

console.log(getBookInfo(book1)); // Come fare soldi - Andrea Paracino [1725]
console.log(getBookInfo(book2)); // Come fare soldi - Andrea Paracino [Year not specified]
