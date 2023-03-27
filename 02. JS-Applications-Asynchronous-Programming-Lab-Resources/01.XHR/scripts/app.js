function loadRepos() {
  let url = "https://api.github.com/users/testnakov/repos";
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("res").textContent = this.responseText;
    }
  };
  httpRequest.open("GET", url);
  httpRequest.send();
}
