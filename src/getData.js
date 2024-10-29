const keyAPI = "8DJWE9THBZJXWJEJYUYJ2NNUV";

function formatDate(date) {
    const splitDate = date.split("-");
    const newFormat = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
    return newFormat;
}

export async function dataWeatherAPI(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${keyAPI}`, {mode: "cors",});
        if (!response.ok) {
            throw new Error(); //catch Error in case of non existent location
        } else {
            const weatherInformations = await response.json();
            return weatherInformations; 
        };
    } catch (error) {
        console.log(error);
        return "something went wrong";
    }; 
};

export function processWeatherData(weatherInformations) {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const forecastDays = [];

    //location informations:
    const location = weatherInformations.resolvedAddress;
    const dateTimeEpoch = weatherInformations.currentConditions.datetimeEpoch;
    const currentDate = new Date((parseInt(dateTimeEpoch))*1000); //Date of the user location
    const currentTimeZone = weatherInformations.timezone; 
    const localCurrentDate = currentDate.toLocaleString([], { timeZone: currentTimeZone }) //Date of the weather location
    const day = currentDate.getDay();
    const currentDay = dayNames[day];
    
    //current weather
    // const temp = weatherInformations.currentConditions.temp;
    // const minTemp = weatherInformations.days[0]["tempmin"];
    // const maxTemp = weatherInformations.days[0]["tempmax"];
    const temp = weatherInformations.currentConditions.temp;
    const minTemp = weatherInformations.days[0]["tempmin"];
    const maxTemp = weatherInformations.days[0]["tempmax"];
    
    const tempCel = convertToCelcius(temp);
    const minTempCel = convertToCelcius(minTemp);
    const maxTempCel = convertToCelcius(maxTemp);
    
    const condition = weatherInformations.currentConditions.conditions;
    const humidity = weatherInformations.currentConditions.humidity;
    const visibility = weatherInformations.currentConditions.visibility;
    const icon = weatherInformations.currentConditions.icon.replaceAll("-", ""); //removing dash to match import 

    const sunrise = weatherInformations.currentConditions.sunrise;
    const sunset = weatherInformations.currentConditions.sunset;

    //Forecast
    const infoForecastDays = weatherInformations.days
    for (const day of infoForecastDays) {
        let dateTimeEpoch = day.datetimeEpoch;
        let currentDate = new Date((parseInt(dateTimeEpoch))*1000);
        let dayOfTheWeek = dayNames[currentDate.getDay()];
        let infoDay = {
            tempCel: convertToCelcius(day.temp),
            tempminCel: convertToCelcius(day.tempmin),
            tempmaxCel: convertToCelcius(day.tempmax),
            temp: day.temp,
            tempmin: day.tempmin,
            tempmax: day.tempmax,
            icon: day.icon.replaceAll("-", ""),
            date: formatDate(day.datetime),
            condition: day.conditions,
            day: dayOfTheWeek,
        };
        forecastDays.push(infoDay);
    }

    forecastDays.shift(); //removing the first element wich is the current day

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
            tempCel,
            minTempCel,
            maxTempCel,
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


//Convert fahrenheit to celcius
function convertToCelcius(data) {
    const celcius =  ((parseInt(data) - 32) * 5/9).toFixed(1);
    return celcius;
};
 