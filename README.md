# Weather-Now Application

**Weather-Now** is a modern web application that provides real-time weather updates for any location. Users can search for cities, view current weather conditions, and see forecasts. The app leverages public weather APIs to deliver accurate and up-to-date information.

## Key Features

- **Live Weather Data:** Instantly fetches current temperature, humidity, wind speed, and more.
- **Forecasts:** Displays hourly and daily weather predictions.
- **Location Search:** Find weather details for any city worldwide.
- **Responsive Design:** Optimized for desktop and mobile devices.

## Technologies Used

- Frontend: React.js (or your chosen framework)
- API: OpenWeatherMap or similar weather API
- Styling: CSS/SCSS, Tailwind, or Material UI

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   npm start
   ```

## Usage

- Enter a city name in the search bar.
- View current weather and forecast details.
- Switch between metric and imperial units.

## Ai

- I have used Wrap Ai, It is cli based Ai agent.
- I have asked it to create a good responsive and clean ui for weather application using tailwindcss
- I coded for search and suggestions and asked ai to improve it and it has improved.
- I coded the skeleton loading for one card and asked ai to do the rest for me and used next js dynamic loading just like lazyloading to keep is as clean and intuitive.
  - It has build the ui for me and i have made a few changes on layout for 7Day forcast and current weather
- I have asked to fetch the weather data and passed down all the neccesary variables need and asked it to help me with WMO code mapping it took care of types and weather codes and created a new class as weatherService and called took care of fetching.
