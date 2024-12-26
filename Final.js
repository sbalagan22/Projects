const key = "be6957bc349e93eccf4b8019c5c1d4fa";

async function nearbyForecast() {
  const city = document.getElementById("input").value.trim().toLowerCase();

  if (city) {
    try {
      const forecastData = await hourlyData(city);
      const percipitationData = await hourlyID(city);
      dispTemp(forecastData, percipitationData);
    } catch (error) {
      inputError(error.message);
    }
  } else {
    inputError("Please input a city");
  }
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow error for higher-level handling
  }
}

async function getGeoData(city) {
  try {
    const apiGeoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      city
    )}&appid=${key}`;
    const geoData = await fetchData(apiGeoURL);
    if (!geoData || geoData.length === 0) {
      throw new Error("No location data found");
    }

    const location = geoData[0];
    return location;
  } catch (error) {
    console.error("Error in getGeoData:", error);
    throw error;
  }
}

async function getHourlyData(city) {
  try {
    const location = await getGeoData(city);
    const apiHourlyURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&units=metric&lon=${location.lon}&appid=${key}`;
    const weatherData = await fetchData(apiHourlyURL);
    return weatherData;
  } catch (error) {
    console.error("Error in getHourlyData:", error);
    throw error;
  }
}

async function getcurrentData(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  const response = await fetch(apiURL);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

async function hourlyID(city) {
  const data = await getHourlyData(city);
  const hourlyID = [];
  if (data && data.list) {
    data.list.forEach((item) => {
      const {
        weather: [{ id }],
      } = item;
      hourlyID.push(id);
    });
    return hourlyID;
  } else {
    throw new Error("No hourly data found");
  }
}

async function hourlyData(city) {
  const data = await getHourlyData(city);
  const hourlyTemp = [];
  if (data && data.list) {
    data.list.forEach((item) => {
      const {
        main: { temp },
      } = item;
      hourlyTemp.push(temp);
    });
    return hourlyTemp;
  } else {
    throw new Error("No hourly data found");
  }
}

function dispTemp(tempData, weatherID) {
  document.getElementById("near").style.display = "none";
  document.getElementById("result").style.display = "table";

  const picElements = document.querySelectorAll(".Icon");
  console.log("Pic Elements:", picElements);

  for (let i = 0; i < 7; i++) {
    if (i > 2) {
      const element = document.getElementById((i - 3 + 1).toString());
      if (element) {
        element.innerHTML = tempData[i].toFixed(1) + "\u00B0" + "C";
      }

      const picElement = picElements[i + 1];
      console.log(picElement);

      if (picElement) {
        switch (true) {
          case weatherID[i] >= 200 && weatherID[i] < 300:
            picElement.src = "./Weather Icon/icons8-cloud-lightning-80.png";
            break;
          case weatherID[i] >= 300 && weatherID[i] < 400:
            picElement.src = "./Weather Icon/icons8-light-rain-80.png";
            break;
          case weatherID[i] >= 500 && weatherID[i] < 600:
            picElement.src = "./Weather Icon/icons8-heavy-rain-80.png";
            break;
          case weatherID[i] >= 600 && weatherID[i] < 700:
            picElement.src = "./Weather Icon/icons8-snow-80.png";
            break;
          case weatherID[i] >= 700 && weatherID[i] < 800:
            picElement.src = "./Weather Icon/icons8-partly-cloudy-day-80.png";
            break;
          case weatherID[i] === 800:
            picElement.src = "./Weather Icon/icons8-sun-80.png";
            break;
          case weatherID[i] >= 801 && weatherID[i] < 810:
            picElement.src = "./Weather Icon/icons8-cloud-80.png";
            break;
          default:
            picElement.src = "./Weather Icon/icons8-partly-cloudy-day-80.png";
            break;
        }
        console.log(`Weather ID: ${weatherID[i]}, Icon: ${picElement.src}`);
      } else {
        console.error(`No icon element found for index ${i}`);
      }
    }
  }
}

async function disp24HTemp() {
  const tempData = await hourlyData("toronto");
  const weatherID = await hourlyID("toronto");

  const picElements = document.querySelectorAll(".Icon");

  for (let i = 0; i < 8; i++) {
    const element = document.getElementById("hour" + (i + 1).toString());
    const picElement = picElements[i];

    if (element) {
      element.innerHTML = tempData[i].toFixed(1) + "\u00B0" + "C";
    }

    if (picElement) {
      switch (true) {
        case weatherID[i] >= 200 && weatherID[i] < 300:
          picElement.src = "./Weather Icon/icons8-cloud-lightning-80.png";
          break;
        case weatherID[i] >= 300 && weatherID[i] < 400:
          picElement.src = "./Weather Icon/icons8-light-rain-80.png";
          break;
        case weatherID[i] >= 500 && weatherID[i] < 600:
          picElement.src = "./Weather Icon/icons8-heavy-rain-80.png";
          break;
        case weatherID[i] >= 600 && weatherID[i] < 700:
          picElement.src = "./Weather Icon/icons8-snow-80.png";
          break;
        case weatherID[i] >= 700 && weatherID[i] < 800:
          picElement.src = "./Weather Icon/icons8-partly-cloudy-day-80.png";
          break;
        case weatherID[i] === 800:
          picElement.src = "./Weather Icon/icons8-sun-80.png";
          break;
        case weatherID[i] >= 801 && weatherID[i] < 810:
          picElement.src = "./Weather Icon/icons8-cloud-80.png";
          break;
        default:
          picElement.src = "./Weather Icon/icons8-partly-cloudy-day-80.png";
          break;
      }
      console.log(`Weather ID: ${weatherID[i]}, Icon: ${picElement.src}`);
    } else {
      console.error(`No icon element found for index ${i}`);
    }
  }
}

async function dispForecastTemp() {
  const tempData = await hourlyData("toronto");
  const weatherID = await hourlyID("toronto");
  const picElements = document.querySelectorAll(".Icon");
  const days = [0, 8, 16, 24, 32];
  let counter = 0;
  for (let i = 0; i < tempData.length; i++) {
    if (i == days[counter]) {
      const element = document.getElementById("day" + (counter + 1).toString());
      if (element) {
        element.innerHTML = tempData[i].toFixed(1) + "\u00B0" + "C";
      }

      const picElement = picElements[counter];

      if (picElement) {
        switch (true) {
          case weatherID[i] >= 200 && weatherID[i] < 300:
            picElement.src = "./Weather Icon/icons8-cloud-lightning-80.png";
            break;
          case weatherID[i] >= 300 && weatherID[i] < 400:
            picElement.src = "./Weather Icon/icons8-light-rain-80.png";
            break;
          case weatherID[i] >= 500 && weatherID[i] < 600:
            picElement.src = "./Weather Icon/icons8-heavy-rain-80.png";
            break;
          case weatherID[i] >= 600 && weatherID[i] < 700:
            picElement.src = "./Weather Icon/icons8-snow-80.png";
            break;
          case weatherID[i] >= 700 && weatherID[i] < 800:
            picElement.src = "./Weather Icon/icons8-partly-cloudy-day-80.png";
            break;
          case weatherID[i] === 800:
            picElement.src = "./Weather Icon/icons8-sun-80.png";
            break;
          case weatherID[i] >= 801 && weatherID[i] < 810:
            picElement.src = "./Weather Icon/icons8-cloud-80.png";
            break;
          default:
            picElement.src = "./Weather Icon/icons8-partly-cloudy-day-80.png";
            break;
        }
        console.log(
          `Weather ID: ${weatherID[counter]}, Icon: ${picElement.src}`
        );
      } else {
        console.error(`No icon element found for index ${counter}`);
      }
      counter += 1;
    }
  }
}

async function currentTemp(city) {
  const data = await getcurrentData(city);
  if (data) {
    const {
      main: { temp },
    } = data;
    return temp;
  } else {
    throw new Error("No current data found");
  }
}

async function currentID(city) {
  const data = await getcurrentData(city);
  if (data) {
    const {
      weather: [{ id }],
    } = data;
    return id;
  } else {
    throw new Error("No current data found");
  }
}
async function defaultCities() {
  const toronto = await currentTemp("toronto");
  const mississauga = await currentTemp("mississauga");
  const brampton = await currentTemp("brampton");
  const hamilton = await currentTemp("hamilton");

  const torontoID = await currentID("toronto");
  const mississaugaID = await currentID("mississauga");
  const bramptonID = await currentID("brampton");
  const hamiltonID = await currentID("hamilton");

  document.getElementById("Toronto").innerHTML =
    (toronto - 273.15).toFixed(1) + "\u00B0" + "C";
  document.getElementById("Mississauga").innerHTML =
    (mississauga - 273.15).toFixed(1) + "\u00B0" + "C";
  document.getElementById("Brampton").innerHTML =
    (brampton - 273.15).toFixed(1) + "\u00B0" + "C";
  document.getElementById("Hamilton").innerHTML =
    (hamilton - 273.15).toFixed(1) + "\u00B0" + "C";

  const picElements = document.querySelectorAll(".Icon");
  const weatherID = [torontoID, mississaugaID, bramptonID, hamiltonID];

  for (i = 0; i < weatherID.length; i++) {
    const picElement = picElements[i];
    if (picElement) {
      switch (true) {
        case weatherID[i] >= 200 && weatherID[i] < 300:
          picElement.src = "./Weather Icon/icons8-cloud-lightning-80.png";
          break;
        case weatherID[i] >= 300 && weatherID[i] < 400:
          picElement.src = "./Weather Icon/icons8-light-rain-80.png";
          break;
        case weatherID[i] >= 500 && weatherID[i] < 600:
          picElement.src = "./Weather Icon/icons8-heavy-rain-80.png";
          break;
        case weatherID[i] >= 600 && weatherID[i] < 700:
          picElement.src = "./Weather Icon/icons8-snow-80.png";
          break;
        case weatherID[i] >= 700 && weatherID[i] < 800:
          picElement.src = "./Weather Icon/icons8-partly-cloudy-day-80.png";
          break;
        case weatherID[i] === 800:
          picElement.src = "./Weather Icon/icons8-sun-80.png";
          break;
        case weatherID[i] >= 801 && weatherID[i] < 810:
          picElement.src = "./Weather Icon/icons8-cloud-80.png";
          break;
        default:
          picElement.src = "./Weather Icon/icons8-partly-cloudy-day-80.png";
          break;
      }
      console.log(`Weather ID: ${weatherID[i]}, Icon: ${picElement.src}`);
    } else {
      console.error(`No icon element found for index ${i}`);
    }
  }
}

function inputError(message) {
  const errorContainer = document.querySelector(".error");
  if (errorContainer) {
    errorContainer.textContent = message;
  } else {
    alert(message); // Fallback for missing error container
  }
}
