//Profile info
const overview = document.querySelector(".overview");
//Git user name
const username = "Samantha-N";
//unordered list for repos
const repoList = document.querySelector(".repo-list");
//repo container
const repoContainer = document.querySelector(".repos");

const repoData = document.querySelector(".repo-data");
//Repo Gallery Button
const galleryButton = document.querySelector(".view-repos");

const filterInput = document.querySelector(".filter-repos");

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
filterInput.classList.remove("hide");
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
      galleryButton.classList.remove("hide");   
  }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }  
}); 

//Function to get SPECIFIC repo info
const getRepoInfo = async function (repoName) {
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchInfo.json();
  console.log(repoInfo);
  //Fetching languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  
  //console.log(languageData);

  //Array to loop through languages
  const languages = [];
    for (const language in languageData)
    {
      languages.push(language);
  }
  displaySpecificRepoInfo(repoInfo, languages);
};


//Create a Function to Display Specific Repo Info
const displaySpecificRepoInfo = function (repoInfo, languages) {
  galleryButton.classList.remove("hide");
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  //Making the repo container visable 
  repoContainer.classList.add("hide");
   
  const div = document.createElement("div");
  div.innerHTML = `
  <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`

  repoData.append(div);
};


//Repo Gallery button
galleryButton.addEventListener("click", function(){
  repoContainer.classList.remove("hide");
  repoData.classList.add("hide");
  galleryButton.classList.add("hide");
});

//Input event search bar
filterInput.addEventListener("input", function (e){
  const searchBar = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const lowerCaseSearchBar = searchBar.toLowerCase(); 


  for (const repo of repos) {
    const repoLowerCase = repo.innerText.toLowerCase();
    if (repoLowerCase.includes(lowerCaseSearchBar)) {
      repo.classList.remove("hide"); 
     } else {
        repo.classList.add("hide");
      }
      }
});
