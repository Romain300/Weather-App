const keyAPI = "8DJWE9THBZJXWJEJYUYJ2NNUV";


function formatDate(date) {
    const splitDate = date.split("-");
    const newFormat = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
    return newFormat;
}

export async function dataWeatherAPI(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${keyAPI}`, {mode: "cors",});
        const weatherInformations = await response.json();
        console.log(weatherInformations)
        return weatherInformations;  

    } catch (error) {
        console.log(error)
    }; 
};


export function processWeatherData(weatherInformations) {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    //location informations:
    const location = weatherInformations.resolvedAddress;
    const dateTimeEpoch = weatherInformations.currentConditions.datetimeEpoch;
    const currentDate = new Date((parseInt(dateTimeEpoch))*1000); //Date of the user location
    const currentTimeZone = weatherInformations.timezone; 
    const localCurrentDate = currentDate.toLocaleString([], { timeZone: currentTimeZone }) //Date of the weather location
    const day = currentDate.getDay();
    const currentDay = dayNames[day];
    
    //current weather
    const temp = weatherInformations.currentConditions.temp;
    const minTemp = weatherInformations.days[0]["tempmin"];
    const maxTemp = weatherInformations.days[0]["tempmax"];
    const tempCelsius = ((parseInt(temp) - 32) * 5/9).toFixed(1);
    const minTempCelcius = ((parseInt(minTemp) - 32) * 5/9).toFixed(1);
    const maxTempCelcius = ((parseInt(maxTemp) - 32) * 5/9).toFixed(1);
    
    const condition = weatherInformations.currentConditions.conditions;
    const humidity = weatherInformations.currentConditions.humidity;
    const visibility = weatherInformations.currentConditions.visibility;
    const icon = weatherInformations.currentConditions.icon;

    const sunrise = weatherInformations.currentConditions.sunrise;
    const sunset = weatherInformations.currentConditions.sunset;

    //Forecast
    const forecastDays = weatherInformations.days
    return {
        localInformation: {
            location,
            currentTimeZone,
            localCurrentDate,
            currentDay,
        },

        currentWeather: {
            temp,
            minTemp,
            maxTemp,
            condition,
            humidity,
            visibility,
            icon,
            sunrise,
            sunset
        },

        forecast: {
            forecastDays,
        }
    };
};

 