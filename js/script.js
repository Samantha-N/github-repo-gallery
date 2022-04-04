//Profile info
const overview = document.querySelector(".overview");
//Git user name
const username = "Samantha-N";
////unordered list for repos
const repoList = document.querySelector(".repo-list");


//Fetching user info GitHub profile
const gitUserInfo = async function () {
    const userInfo = await fetch (
        `https://api.github.com/users/${username}`
    );
    const data = await userInfo.json();
    
    displayUserInfo(data);
};
gitUserInfo();

//Displaying user info
const displayUserInfo =  function (data) {
    const div = document.createElement('div');
    div.classList.add("user-info");
    div.innerHTML =
    `<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(div);
    gitRepos();
  };

//Fetching repos
const gitRepos = async function () {
    const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=update&per_page=100`);
    const repoData = await fetchRepos.json();
    console.log(repoData);
    repoInfo(repoData);
};

//Info on repos
const repoInfo = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      repoList.append(repoItem);    
  }
};