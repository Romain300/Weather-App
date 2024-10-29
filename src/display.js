import { processWeatherData } from "./getData";
import { dataWeatherAPI } from "./getData";
import searchIcon from "./images/search-globe-svgrepo-com.svg";
import cleardayIcon from "./images/clear-day.svg";
import clearnightIcon from "./images/clear-night.svg";
import cloudyIcon from "./images/cloudy.svg";
import fogIcon from "./images/fog.svg";
import hailIcon from "./images/hail.svg";
import partlycloudydayIcon from "./images/partly-cloudy-day.svg";
import partlycloudynightIcon from "./images/partly-cloudy-night.svg";
import rainsnowshowersdayIcon from "./images/rain-snow-showers-day.svg";
import rainsnowshowersnightIcon from "./images/rain-snow-showers-night.svg";
import rainsnowIcon from "./images/rain-snow.svg";
import rainIcon from "./images/rain.svg";
import showersdayIcon from "./images/showers-day.svg";
import showersnightIcon from "./images/showers-night.svg";
import sleetIcon from "./images/sleet.svg";
import snowshowersdayIcon from "./images/snow-showers-day.svg";
import snowshowersnightIcon from "./images/snow-showers-night.svg";
import snowIcon from "./images/snow.svg";
import thunderrainIcon from "./images/thunder-rain.svg";
import thundershowersdayIcon from "./images/thunder-showers-day.svg";
import thundershowersnightIcon from "./images/thunder-showers-night.svg";
import thunderIcon from "./images/thunder.svg";
import windIcon from "./images/wind.svg";

const weatherIcon = {
    clearday: cleardayIcon,
    clearnight: clearnightIcon,
    cloudy: cloudyIcon,
    fog: fogIcon,
    hail: hailIcon,
    partlycloudyday: partlycloudydayIcon,
    partlycloudynight: partlycloudynightIcon,
    rainsnowshowersday: rainsnowshowersdayIcon,
    rainsnowshowersnight: rainsnowshowersnightIcon,
    rainsnow: rainsnowIcon,
    rain: rainIcon,
    showersday: showersdayIcon,
    showersnight: showersnightIcon,
    sleet: sleetIcon,
    snowshowersday: snowshowersdayIcon,
    snowshowersnight: snowshowersnightIcon,
    snow: snowIcon,
    thunderrain: thunderrainIcon,
    thundershowersday: thundershowersdayIcon,
    thundershowersnight: thundershowersnightIcon,
    thunder: thunderIcon,
    wind: windIcon, 
}

export function displayIndexPage() {
    const body = document.querySelector("body");
    body.style.height = "100vh";
    const formContainer = document.createElement("div");
    formContainer.classList.add("form-container");

    const form = document.createElement("form");

    const inputSearch = document.createElement("input");
    inputSearch.type = "text";
    inputSearch.placeholder = "Enter a location";
    inputSearch.required = true;
    inputSearch.autofocus = true;

    const buttonForm = document.createElement("button");
    buttonForm.type = "submit";

    const img = document.createElement("img");
    img.alt = "Search Icon";
    img.src = searchIcon;

    body.appendChild(formContainer);
    formContainer.appendChild(form);
    form.appendChild(inputSearch);
    form.appendChild(buttonForm);
    buttonForm.appendChild(img);

    const creatorDiv = document.createElement("div")
    creatorDiv.textContent = "Done by Romain300";
    creatorDiv.classList.add("creator");
    body.appendChild(creatorDiv);

    newResearch();
};

async function displayWeatherInformations(city) {
    const body = document.querySelector("body");
    body.style.height = "100vh";

    //Adding loading screen
    const loadDiv = document.createElement("div");
    loadDiv.classList.add("loading");
    loadDiv.textContent = "LOADING...";
    body.appendChild(loadDiv);

    //Gathering data 
    const data = await dataWeatherAPI(city);
    body.textContent = "";
    body.style.height = "auto";
    const mainContainer = document.createElement("div");
    mainContainer.classList.add("main-container");

    //Creating form top page
    const form = document.createElement("form");

    const inputSearch = document.createElement("input");
    inputSearch.type = "text";
    inputSearch.placeholder = "Enter a location";
    inputSearch.required = true;

    const buttonForm = document.createElement("button");
    buttonForm.type = "submit";

    const img = document.createElement("img");
    img.alt = "Search Icon";
    img.src = searchIcon;

    body.appendChild(mainContainer);
    mainContainer.appendChild(form);
    form.appendChild(inputSearch);
    form.appendChild(buttonForm);
    buttonForm.appendChild(img);

    //Handling error
    if (data === "something went wrong") {
        body.style.height = "100vh";
        const alertDiv = document.createElement("div")
        alertDiv.textContent = "Oops! Location not found.";
        alertDiv.classList.add("alert");
        body.appendChild(alertDiv);
    } else {
        const weather = processWeatherData(data);

        //Creating div with local informations
        const localInformations = document.createElement("div");
        localInformations.classList.add("local-informations");
        mainContainer.appendChild(localInformations);

        const location = document.createElement("div");
        location.classList.add("location");
        location.textContent = weather.localInformation.location;
        localInformations.appendChild(location);

        const dayTimeInfo = document.createElement("div");
        dayTimeInfo.classList.add("day-time-info");
        dayTimeInfo.textContent = `${weather.localInformation.currentDay}, ${weather.localInformation.localCurrentDate.substring(0,10)}`;
        localInformations.appendChild(dayTimeInfo);

        //Creating temperatur info div
        const tempInfomations = document.createElement("div");
        tempInfomations.classList.add("temp-informations");
        mainContainer.appendChild(tempInfomations);

        const swichTempDiv = document.createElement("div");
        swichTempDiv.classList.add("switch-div");
        tempInfomations.appendChild(swichTempDiv);
        const spanCelcius = document.createElement("span");
        spanCelcius.textContent = "°C";
        swichTempDiv.appendChild(spanCelcius);
        const label = document.createElement("label"); //Switch to toggle temperature
        label.classList.add("switch");
        swichTempDiv.appendChild(label);
        const inputTemp = document.createElement("input");
        inputTemp.type = "checkbox";
        label.appendChild(inputTemp);
        const span = document.createElement("span");
        span.classList.add("slider", "round");
        label.appendChild(span);
        const spanFahrenheit = document.createElement("span");
        spanFahrenheit.textContent = "°F";
        swichTempDiv.appendChild(spanFahrenheit);
        
        const currentTemperature = document.createElement("div");
        currentTemperature.classList.add("current-temperature");
        currentTemperature.textContent = `${weather.currentWeather.tempCel}°C`;
        tempInfomations.appendChild(currentTemperature);

        const currentCondition = document.createElement("div");
        currentCondition.classList.add("current-condition");
        currentCondition.textContent = weather.currentWeather.condition;
        tempInfomations.appendChild(currentCondition);

        const iconWeather = document.createElement("img");
        iconWeather.width = 100;
        iconWeather.alt = "Weather Icon";
        iconWeather.src = weatherIcon[weather.currentWeather.icon];
        tempInfomations.appendChild(iconWeather);

        const HLTemp = document.createElement("div");
        HLTemp.classList.add("h-l-temp");
        HLTemp.textContent = `L: ${weather.currentWeather.minTempCel}°C, H: ${weather.currentWeather.maxTempCel}°C`;
        tempInfomations.appendChild(HLTemp);

        //creating forecast div
        const forecastDiv = document.createElement("div");
        forecastDiv.classList.add("forecast");
        mainContainer.appendChild(forecastDiv);

        for (let day of weather.forecast.forecastDays) {
            const backDiv = document.createElement("div");
            backDiv.classList.add("background-forecast");
            forecastDiv.appendChild(backDiv);

            const forecastday = document.createElement("div");
            forecastday.classList.add("forecast-day");
            backDiv.appendChild(forecastday);

            const dayTimeInfo = document.createElement("div");
            dayTimeInfo.classList.add("day-time-info");
            dayTimeInfo.textContent = `${day.day}, ${day.date.substring(0,10)}`;
            forecastday.appendChild(dayTimeInfo);

            const currentTemperature = document.createElement("div");
            currentTemperature.dataset.index = weather.forecast.forecastDays.indexOf(day);
            currentTemperature.classList.add("current-temperature", "current-forecast-temp");
            currentTemperature.textContent = `${day.tempCel}°C`;
            forecastday.appendChild(currentTemperature);

            const currentCondition = document.createElement("div");
            currentCondition.classList.add("current-condition");
            currentCondition.textContent = day.condition;
            forecastday.appendChild(currentCondition);

            const iconWeather = document.createElement("img");
            iconWeather.width = 100;
            iconWeather.alt = "Weather Icon";
            iconWeather.src = weatherIcon[day.icon];
            forecastday.appendChild(iconWeather);

            const HLTemp = document.createElement("div");
            HLTemp.dataset.index = weather.forecast.forecastDays.indexOf(day);
            HLTemp.classList.add("h-l-temp", "forecast-LH-Temp");
            HLTemp.textContent = `L: ${day.tempminCel}°C, H: ${day.tempmaxCel}°C`;
            forecastday.appendChild(HLTemp)
        };



        function toggleTemperature() {
            const currentTempForecastDiv = document.querySelectorAll(".current-forecast-temp");
            const forecastLHTempDiv = document.querySelectorAll(".forecast-LH-Temp");

            if (currentTemperature.textContent === `${weather.currentWeather.tempCel}°C`) {
                currentTemperature.textContent = `${weather.currentWeather.temp}°F`;
                HLTemp.textContent = `L: ${weather.currentWeather.minTemp}°F, H: ${weather.currentWeather.maxTemp}°F`;

                currentTempForecastDiv.forEach((div) => {
                    const index = div.dataset.index;
                    div.textContent = `${weather.forecast.forecastDays[index]["temp"]}°F`
                    ;
                });

                forecastLHTempDiv.forEach((div) => {
                    const index = div.dataset.index;
                    div.textContent = `L: ${weather.forecast.forecastDays[index]["tempmin"]}°F, H: ${weather.forecast.forecastDays[index]["tempmax"]}°F`;
                    ;
                });



            } else {
                currentTemperature.textContent = `${weather.currentWeather.tempCel}°C`;
                HLTemp.textContent = `L: ${weather.currentWeather.minTempCel}°C, H: ${weather.currentWeather.maxTempCel}°C`;

                currentTempForecastDiv.forEach((div) => {
                    const index = div.dataset.index;
                    div.textContent = `${weather.forecast.forecastDays[index]["tempCel"]}°C`
                    ;
                });

                forecastLHTempDiv.forEach((div) => {
                    const index = div.dataset.index;
                    div.textContent = `L: ${weather.forecast.forecastDays[index]["tempminCel"]}°C, H: ${weather.forecast.forecastDays[index]["tempmaxCel"]}°C`;
                    ;
                });
            };
        };

        inputTemp.addEventListener("change", toggleTemperature);
    };
    newResearch();  
};

function newResearch() {
    const body = document.querySelector("body");
    const input = document.querySelector("input")
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        const location = input.value;
        body.textContent = "";
        displayWeatherInformations(location);

        event.preventDefault();
    }) 
};
