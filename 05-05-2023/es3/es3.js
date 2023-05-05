const person = {
  name: "Andrea Paracino",
  age: 21,
  gender: "male",
  occupation: "Software Developer",
  address: {
    street: "777 Via Bella",
    city: "New York",
    state: "NY",
    zip: "12345",
  },
  interests: ["drugs", "gambling", "drinking"],
  friends: [
    { name: "Asia Mauro", age: 24, occupation: "geografa" },
    { name: "Max Boh", age: 40, occupation: "fallito" },
    { name: "Eugenio Puccio", age: 28, occupation: "mantenuto" },
  ],
  getBirthYear: function () {
    // Funzione mezza inutile, dato che assume che la persona abbia già compiuto
    // gli anni quest'anno. Ma vabbè, giusto un esempio.
    const currentYear = new Date().getFullYear();
    return currentYear - this.age;
  },
};

console.log(`Name: ${person.name}`);
console.log(`Age: ${person.age}`);
console.log(`Occupation: ${person.occupation}`);
console.log(
  `Address: ${person.address.street}, ${person.address.city}, ${person.address.state} ${person.address.zip}`
);
console.log(`Interests: ${person.interests.join(", ")}`);
console.log(`Friends:`);

person.friends.forEach((friend) =>
  console.log(`- ${friend.name} (${friend.age}), ${friend.occupation}`)
);

console.log(`Birth Year: ${person.getBirthYear()}`);
