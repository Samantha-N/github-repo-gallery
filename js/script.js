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
    repos();
};

//Fetching repos
const repos = async function () {
    const getRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=update&per_page=100`);
    const repoData = await getRepos.json();
    console.log(repoData);
};
