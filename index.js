const foodList = document.getElementById("foodList");
const searcBar = document.getElementById("searchBar");
const spinner = document.getElementById("spinner");

spinner.removeAttribute("hidden");

let foodArray = [];

//Searchbar
searcBar.addEventListener("keyup", (e) => {
  const searchValue = e.target.value.toLowerCase();
  // console.log(searchValue);
  const filterSearchValue = foodArray.filter((f) => {
    return f.title.toLowerCase().includes(searchValue);
  });

  fetchFoodDisplay(filterSearchValue);
});

//Fetch User
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => response.json())
  .then((user) => {
    document.getElementById("js").innerHTML = "Merhaba, " + user.name;
  });

//Fetch Foods
const fetchFood = async () => {
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/todos");
      foodArray = await response.json();
      spinner.setAttribute("hidden", "");
      fetchFoodDisplay(foodArray);
      // return data;
    } catch (error) {
      console.log(err);
    }
};

//Show Foods

const fetchFoodDisplay = (foods) => {
  foodList.innerHTML = null;
  foods.forEach((food) => {
    var id = food.id;
    var parsedFavFoods = JSON.parse(localStorage.getItem("favFoods"));
    var className =
      parsedFavFoods != null && parsedFavFoods.includes(id)
        ? "favoriData"
        : "data";

    var li = document.createElement("li");
    li.id = "li" + id;
    li.className = className;
    li.onclick = function(e){
      if(!li.style.border) li.style.border = "1px solid black"
      else li.style.border = ""
    }    

    var h2 = document.createElement("h2");
    h2.innerHTML = food.title;

    var br = document.createElement("br");

    var addFavoriteBtn = document.createElement("button");
    addFavoriteBtn.className = "btn1";
    addFavoriteBtn.innerHTML = "Favoriye Ekle";
    addFavoriteBtn.onclick = function (e) {
      addFavourite(id);
    };

    var deleteFavoriteBtn = document.createElement("button");
    deleteFavoriteBtn.className = "btn2";
    deleteFavoriteBtn.innerHTML = "Favoriden Çıkar";
    deleteFavoriteBtn.onclick = function (e) {
      removeFavourite(id);
    };
    li.append(h2);
    li.append(br);
    li.append(addFavoriteBtn);
    li.append(deleteFavoriteBtn);
    foodList.append(li);
  });
};

setTimeout(() => {
  fetchFood();
}, 1000);

//Add Favourite
function addFavourite(id) {
  li = document.getElementById("li" + id);
  li.style.backgroundColor = "red";

  var foods = [];
  var favFoods = localStorage.getItem("favFoods");
  if (favFoods == null) {
    foods.push(id);
    localStorage.setItem("favFoods", JSON.stringify(foods));
  } else {
    foods = JSON.parse(favFoods);

    if (!foods.includes(id)) foods.push(id);
    else alert("Already exist");

    localStorage.setItem("favFoods", JSON.stringify(foods));
  }
}

//Remove Favourite
function removeFavourite(id) {
  li = document.getElementById("li" + id);
  li.style.backgroundColor = "white";

  var favFoods = localStorage.getItem("favFoods");
  if (favFoods != null) {
    var parsedFavFoods = JSON.parse(favFoods);
    var newFavFoods = parsedFavFoods.filter((foodId) => foodId != id);

    localStorage.setItem("favFoods", JSON.stringify(newFavFoods));
  }
}

let data = document.getElementById("data");
data.onclick = function () {
  alert("test");
};
