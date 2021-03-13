window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const cityapi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=YOUR_API_KEY`;
      fetch(cityapi)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("지금 여기는!");
          console.log(data);
          locationTimezone.textContent = data.results[5].formatted_address;
        });
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=YOUR_API_KEY`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          console.log(data.weather[0].main); // 날씨 정의
          console.log(data.weather[0].description); //날씨 설명
          console.log(data.main.temp); //온도
          temperature = data.main.temp;
          temperature -= 273.15; // 캘빈온도를 섭씨온도로 변환
          console.log(temperature);
          const { main, description } = data.weather[0];
          //Set DOM Elements from the API
          temperatureDegree.textContent = Math.ceil(temperature);
          temperatureDescription.textContent = description;
          
        });
    });
  }
});
