import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../WeatherContext";
import styled from "styled-components";

const API_KEY = "80b55c80758b129c0f7dab58cd526d35";
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

async function fetchWeather(city, unit) {
  try {
    const response = await axios.get(`${BASE_URL}?q=${city}&units=${unit}&appid=${API_KEY}`);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("City not found. Please enter a valid city name.");
    }
    throw new Error("Something went wrong. Please try again later.");
  }
}

function WeatherInfo() {
  const { city, unit, toggleUnit } = useContext(WeatherContext);
  const [dailyForecasts, setDailyForecasts] = useState([]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["weather", city, unit],
    queryFn: () => fetchWeather(city, unit),
    enabled: !!city,
    retry: false,
    refetchInterval: 30000,
  });

  useEffect(() => {
    if (data) {
      const forecasts = data?.data?.list;
      const groupedData = groupByDay(forecasts);

      const dailyData = Object.keys(groupedData).map((date) => {
        const dayData = groupedData[date];
        return {
          date,
          avgTemp: calculateAverage(dayData, "temp"),
          avgHumidity: calculateAverage(dayData, "humidity"),
          avgWindSpeed: calculateAverage(dayData, "windSpeed"),
          icon: dayData[0].weather[0].icon,
        };
      });

      setDailyForecasts(dailyData);
    }
  }, [data]);

  const groupByDay = (forecastList) => {
    const grouped = {};
    forecastList.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000);
      const dateString = date.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
      const formattedDate = `${dateString}   ${dayOfWeek}`;
      if (!grouped[formattedDate]) grouped[formattedDate] = [];
      grouped[formattedDate].push(forecast);
    });
    return grouped;
  };

  const calculateAverage = (data, type) => {
    const total = data.reduce((acc, curr) => {
      if (type === "temp") return acc + curr.main.temp;
      if (type === "humidity") return acc + curr.main.humidity;
      if (type === "windSpeed") return acc + curr.wind.speed;
      return acc;
    }, 0);
    return total / data.length;
  };

  const getTodayDate = () => {
    const today = new Date();
    const dateString = today.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });
    const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "short" });
    return `${dateString}   ${dayOfWeek}`;
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  return (
    <WeatherContainer>
      <CityTitle>{city}</CityTitle>
      <ForecastContainer>
        {dailyForecasts.slice(0, 5).map((forecast) => {
          const isToday = forecast.date === getTodayDate();
          return (
            <ForecastCard key={forecast.date} isToday={isToday}>
              <ForecastTitle>{forecast.date}</ForecastTitle>
              <WeatherIcon
                src={`https://openweathermap.org/img/wn/${forecast.icon}.png`}
                alt="Weather Icon"
              />
              <ForecastTemp>
                {forecast.avgTemp.toFixed(1)}°{unit === "metric" ? "C" : "F"}
              </ForecastTemp>
              <ForecastDetail>Humidity: {forecast.avgHumidity.toFixed(0)}%</ForecastDetail>
              <ForecastDetail>Wind: {forecast.avgWindSpeed.toFixed(1)} {unit === "metric" ? "m/s" : "mph"}</ForecastDetail>
            </ForecastCard>
          );
        })}
      </ForecastContainer>
      <ButtonContainer>
        <ToggleButton onClick={toggleUnit}>
          Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
        </ToggleButton>
      </ButtonContainer>
    </WeatherContainer>
  );
}

// Styled Components
const WeatherContainer = styled.div`
  background: linear-gradient(135deg, rgba(137, 207, 240, 0.65), rgba(173, 216, 230, 0.01));
  color: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  width: 100%;
`;

const CityTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

const ForecastContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;

const ForecastCard = styled.div`
  flex: 1 1 18%;
  background-color: ${({ isToday }) => (isToday ? "rgba(255, 255, 0, 0.3)" : "rgba(232, 227, 227, 0.07)")};
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  min-width: 150px;
  max-width: 200px;
  margin: 1rem;
`;

const ForecastTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
`;

const WeatherIcon = styled.img`
  width: 4rem;
  height: 4rem;
`;

const ForecastTemp = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 0.5rem;
`;

const ForecastDetail = styled.p`
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const ToggleButton = styled.button`
  background-color: rgba(244, 239, 239, 0.45);
  color: black;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background: rgb(248, 234, 234);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
`;

export default WeatherInfo;
