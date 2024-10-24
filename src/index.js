import "./styles.css";
import { processWeatherData } from "./getData";
import { dataWeatherAPI } from "./getData";
import searchIcon from "./images/search-globe-svgrepo-com.svg";

function displayIndexPage() {
    const body = document.querySelector("body");
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
};

function displayWeatherInformations() {
    
}


const weather = processWeatherData(await dataWeatherAPI("paris"));
console.log(weather);
