
import { createContext, useState, useEffect } from "react";

// Create the context
export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [city, setCity] = useState(() => {
    try {
      const savedCity = localStorage.getItem("city");
      return savedCity || ""; // If not found, return an empty string
    } catch (error) {
      console.error("Error accessing localStorage for city:", error);
      return "";
    }
  });
  
  const [unit, setUnit] = useState(() => {
    try {
      const savedUnit = localStorage.getItem("unit");
      return savedUnit || "metric"; // Default to Celsius ("metric")
    } catch (error) {
      console.error("Error accessing localStorage for unit:", error);
      return "metric";
    }
  });

  useEffect(() => {
    try {
      if (city) {
        localStorage.setItem("city", city);
      }
    } catch (error) {
      console.error("Error saving city to localStorage:", error);
    }
  }, [city]);

  useEffect(() => {
    try {
      if (unit) {
        localStorage.setItem("unit", unit);
      }
    } catch (error) {
      console.error("Error saving unit to localStorage:", error);
    }
  }, [unit]);

  const toggleUnit = () => {
    setUnit(prevUnit => (prevUnit === "metric" ? "imperial" : "metric"));
  };


  const [error, setError] = useState(null); 
  return (
    <WeatherContext.Provider value={{ city, setCity, unit, toggleUnit,error,
        setError}}>
      {children}
    </WeatherContext.Provider>
  );
}