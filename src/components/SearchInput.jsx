import { useState, useContext } from "react";
import { WeatherContext } from "../WeatherContext";
import styled from "styled-components"; 

function SearchInput() {
  const [input, setInput] = useState("");
  const { setCity } = useContext(WeatherContext);

  const handleSearch = () => {
    if (input.trim()) {
      setCity(input);
      setInput("");
    }
  };

  return (
    <SearchContainer>
      <SearchInputField
        type="text"
        placeholder="Enter city name..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </SearchContainer>
  );
}

// Styled Components
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg,rgba(36, 188, 231, 0.59),rgba(244, 238, 239, 0.7));
  border-radius: 1rem;
  box-shadow: 0 10px 20px rgba(15, 13, 13, 0.2);
  transition: transform 0.3s;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 1rem;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack the input and button vertically */
    gap: 0.5rem;
    max-width: 90%; /* Allow the search bar to take up more space on smaller screens */
  }
`;

const SearchInputField = styled.input`
  padding: 1rem;
  border: 2px solid rgba(11, 11, 11, 0.59);
  border-radius: 0.75rem;
  width: 100%;
  max-width: 300px;
  font-size: 1.125rem;
  background: rgba(239, 226, 226, 0);
  color: white; /* Keeps the typed text white */
  backdrop-filter: blur(10px);
  outline: none;
  transition: all 0.3s;
  text-align: center;
  box-shadow: 0 4px 8px rgba(236, 23, 23, 0.1);

  &::placeholder {
    color: black; /* Makes placeholder text black */
    opacity: 1; /* Ensures full visibility */
  }

  @media (max-width: 768px) {
    max-width: 80%; /* Take up full width on mobile */
    font-size: 1rem; /* Adjust font size for smaller screens */
  }
`;

const SearchButton = styled.button`
  background: rgba(255, 255, 255, 0.4);
  color: black;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: rgb(239, 238, 238);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem; /* Adjust padding for smaller buttons */
    font-size: 1rem; /* Adjust font size */
  }
`;

export default SearchInput;
