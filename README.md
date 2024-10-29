# Weather App

## Overview

This Weather App allows users to search for current weather information based on their desired location. It features a user-friendly interface that displays current conditions, temperature in both Celsius and Fahrenheit, and a 15-day weather forecast.

## Features

- **Location Search**: Users can enter a city name to fetch weather data.
- **Current Weather**: Displays the current temperature, weather condition, and high/low temperatures.
- **7-Day Forecast**: Provides a forecast for the next fifteen days.
- **Temperature Toggle**: Users can switch between Celsius and Fahrenheit.
- **Responsive Design**: The layout adapts to different screen sizes.

## Technologies Used

- HTML
- CSS
- JavaScript
- Fetch API for weather data
- Visual Crossing Weather API

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Open `index.html` in your web browser to view the application.

## Usage

1. **Enter a city name** in the input field.
2. **Click the search button** (magnifying glass icon) to retrieve the weather data.
3. **Toggle the temperature** between Celsius and Fahrenheit using the switch provided.

## Code Structure

- **index.html**: Main HTML file that contains the structure of the app.
- **styles.css**: Contains all styles for the application.
- **script.js**: Contains JavaScript code to handle fetching and displaying weather data.
- **getData.js**: Handles API requests and processes the fetched weather data.
- **display.js**: Manages the display of the weather data on the page.

## API Key

To use the Visual Crossing Weather API, you will need to sign up for an API key. Replace the `keyAPI` variable in the `getData.js` file with your own API key.

## License

This project is licensed under the MIT License.