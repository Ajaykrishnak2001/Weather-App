import { WeatherProvider } from "./WeatherContext";
import SearchInput from "./components/SearchInput";
import WeatherInfo from "./components/WeatherInfo";
import ErrorMessage from "./components/ErrorMessage";
import './App.css'; 

function App() {
  return (
    <WeatherProvider>
      <div className="app-container">
        <h1 className="app-title">
          Weather App 🌤
        </h1>
        <SearchInput />
        <ErrorMessage />
        <WeatherInfo />
      </div>
    </WeatherProvider>
  );
}

export default App;
