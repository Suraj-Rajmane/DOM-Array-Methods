const api = `https://randomuser.me/api`;

const addUser = document.getElementById("user-btn");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");
const ascSortBtn = document.getElementById("sort-asc");
const descSortBtn = document.getElementById("sort-desc");

const appState = [];

class User {
  constructor(title, firstname, lastname, email, gender) {
    this.title = title;
    this.name = `${firstname} ${lastname}`;
    this.email = email;
    this.gender = gender;
  }
}

addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
  });

  const userJson = await userData.json();

  // console.log(userJson);

  const user = userJson.results[0]; // object

  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.email,
    user.gender
  );

  appState.push(classUser);

  console.log(appState);

  domRenderer(appState);
});

const domRenderer = (stateArr) => {
  userList.innerHTML = null;

  stateArr.forEach((userObj) => {
    // const userEle = document.createElement("div");

    userList.innerHTML += `
        <div>
          Name: ${userObj.title} ${userObj.name}
          <ol>
            <li>${userObj.gender}</li>
            <li>${userObj.email}</li>
          </ol>
        </div>
      `;

    // userList.appendChild(userEle);
  });
};

searchInput.addEventListener("keyup", (e) => {
  const filteredAppState = appState.filter(
    (user) =>
      user.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      (user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) &&
        user.gender.toLowerCase().charAt(0) ===
          searchInput.value.toLowerCase().charAt(0))
  );

  domRenderer(filteredAppState);
});

ascSortBtn.addEventListener("click", () => {
  const appStateCopy = [...appState];

  appStateCopy.sort((a, b) => (a.name > b.name ? 1 : -1));

  domRenderer(appStateCopy);
});

descSortBtn.addEventListener("click", () => {
  const appStateCopy = [...appState];

  appStateCopy.sort((a, b) => (a.name < b.name ? 1 : -1));

  domRenderer(appStateCopy);
});
