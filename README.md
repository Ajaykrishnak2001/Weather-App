# Weather Dashboard

A simple weather dashboard built using React, OpenWeatherMap API, and modern React features like hooks, functional components, and state management. The app allows users to search for a city and view its current weather details, including temperature, humidity, wind speed, and weather conditions.

## Features

### 1. Home Page (Weather Dashboard)
- Search for a city and view the current weather details.
- Displays temperature, humidity, wind speed, and weather conditions (e.g., sunny, rainy, etc.).
- Displays an appropriate weather icon using OpenWeatherMap API.

### 2. API Integration
- Integrated OpenWeatherMap API to fetch weather data.
- Implements API polling every 30 seconds to keep the data up-to-date.

### 3. Error Handling
- Gracefully handles errors like incorrect city names or network failures.
- Displays user-friendly error messages when issues occur.

### 4. Local Storage
- Saves the last searched city and loads its weather data when the user revisits the app.

### 5. Component Structure
- A separate component for the search input.
- A separate component for displaying weather information.
- A separate component for showing errors.

### 6. State Management
- Uses React Context API for managing global state.

## Bonus Features (Optional)
- Implements a 5-day weather forecast using an API endpoint.
- Allows users to toggle between Celsius and Fahrenheit.
- Uses React Query for data fetching and caching.

## Setup

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard

### 2.Install dependencies:
npm install

### 3.Run the development server:
npm run dev
