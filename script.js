// https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"

async function getBackgroundImg() {
  try {
    const response = await fetch(
      "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
    );
    if (!response.ok) {
      throw Error("Something went wrong");
    }
    const data = await response.json();
    document.body.style.backgroundImage = `url("${data.urls.small}")`;
    document.getElementById("img-author").innerHTML = "By: " + data.user.name;
  } catch (err) {
    console.log(err);
    //add a default background in case error causes problems
    document.body.style.backgroundImage = "url(images/saloon.jpg)";
  }
}

getBackgroundImg();

async function getCryptoInfoCringe() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/dogecoin"
    );
    if (!response.ok) {
      throw Error("Something went wrong");
    }
    const data = await response.json();
    document.getElementById("cringto").innerHTML = `
        <div class="crypto-top">
          <div><img src="${data.image.small}"/></div>
          <h3>${data.name}</h3>
        </div>
        <div class="crypto-bottom">
          <p>Current Price: $${data.market_data.current_price.usd}</p>
          <p>24-Hour High: $${data.market_data.high_24h.usd}</p>
          <p>24-Hour Low: $${data.market_data.low_24h.usd}</p>
        </div>
`;
  } catch (err) {
    console.error(err);
  }
}

getCryptoInfoCringe();

function getTime() {
  const currentTime = new Date().toLocaleTimeString("en-us", {
    timeStyle: "medium",
  });
  document.getElementById("time").innerHTML = currentTime;
}

setInterval(getTime, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      setWeatherHtml(data);
    })
    .catch((err) => console.error(err));
});

function setWeatherHtml(data) {
  const weatherIcon = data.weather[0].icon;
  document.getElementById(
    "weather-icon-holder"
  ).innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" />`;
  document.getElementById("current-temp").innerText =
    "Current Temp: " +
    Math.round(data.main.temp) +
    "\n" +
    "Feels Like: " +
    Math.round(data.main.feels_like);
}
