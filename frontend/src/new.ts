const keyword = "frank";
const fruits = [
  { name: "amam", price: 23 },
  { name: "frank", price: 23 },
];

const get = fruits.filter((fruit) => fruit.name.indexOf(keyword) - 1);
console.log(get);
