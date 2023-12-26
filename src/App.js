import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedStatement, setSelectedStatement] = useState("");

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setStates([]);
    setCities([]);
    setSelectedStatement("");
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setCities([]);
    setSelectedStatement("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedStatement("");
  };

  const getCountriesData = async () => {
    try {
      const data = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      const res = await data.json();
      setCountries(res);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatesData = async () => {
    try {
      const data = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      );
      const res = await data.json();
      setStates(res);
    } catch (err) {
      console.error(err);
    }
  };

  const getCitiesData = async () => {
    try {
      const data = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      );
      const res = await data.json();
      setCities(res);
    } catch (err) {
      console.error(err);
    }
  };

  const generateSelectedStatement = () => {
    if (selectedCountry && selectedState && selectedCity) {
      const statement = (
        <>
          You selected{" "}
        <span className="bold-text">{selectedCity}</span>,{" "}
        <span className="dull-text">{selectedState}</span>,{" "}
        <span className="dull-text">{selectedCountry}</span>
        </>
      );
      setSelectedStatement(statement);
    }
  };

  useEffect(() => {
    getCountriesData();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getStatesData();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      getCitiesData();
    }
  }, [selectedState]);

  useEffect(() => {
    generateSelectedStatement();
  }, [selectedCountry, selectedState, selectedCity]);

  return (
    <div className="App">
      <h1>Select Location</h1>
      <div>
        <select onChange={handleCountryChange} value={selectedCountry}>
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select onChange={handleStateChange} value={selectedState}>
          <option value="" disabled>
            Select State
          </option>
          {states.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select onChange={handleCityChange} value={selectedCity}>
          <option value="" disabled>
            Select City
          </option>
          {cities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <p>{selectedStatement}</p>
    </div>
  );
}
