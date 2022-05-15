//Profile info
const overview = document.querySelector(".overview");
//Git user name
const username = "Samantha-N";
//unordered list for repos
const repoList = document.querySelector(".repo-list");
//repo container
const repoContainer = document.querySelector(".repos");

const repoData = document.querySelector(".repo-data");

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
    const data = await fetchRepos.json();
    console.log(data);
    displayRepos(data);
};

//Fetching INFO on repos
const displayRepos = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      repoList.append(repoItem);    
  }
};

repoList.addEventListener("click", function (e){
  if (e.target.matches("h3")){
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
  
}); 

//Function to get SPECIFIC repo info
const getRepoInfo = async function (repoName){
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchInfo.json();
  console.log(repoInfo);
}
