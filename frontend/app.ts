async function fetchUser() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    console.log(data);

    return data;
  } catch (e) {
    console.log(e);
  }
}

fetchUser();
