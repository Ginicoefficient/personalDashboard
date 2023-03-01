// https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"

async function getBackgroundImg() {
  const response = await fetch(
    "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
  );
  const data = await response.json();
  document.body.style.backgroundImage = `url("${data.urls.full}")`;
  document.getElementById("img-author").innerHTML = "By: " + data.user.name;
}

getBackgroundImg();
