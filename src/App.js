import axios from "axios";
import { useState } from "react";
import "./App.css";
import City from "./Components/City/City";
import Weather from "./Components/Weather/Weather";

function App() {
  const [city, setCity] = useState();
  const [weather, setWeather] = useState();
  const [error, setError] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const getWeather = async (favoriteCity = "") => {
    const name = favoriteCity !== "" ? favoriteCity : city;
    console.log(name);
    console.log(favoriteCity);
    console.log(city);
    const options = {
      method: "GET",
      url: "https://forward-reverse-geocoding.p.rapidapi.com/v1/forward",
      params: { city: name },
      headers: {
        "X-RapidAPI-Key": "D01l3VMPOZmshwWiyXtTyv8EJLm0p1MhrXNjsnaXBbWZ2VVdbr",
        "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
      },
    };
    const cityDetails = await axios.request(options);
    if (Object.keys(cityDetails.data).length !== 0) {
      setError(false);
      const result = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${cityDetails.data[0].lat}&longitude=${cityDetails.data[0].lon}&current_weather=true`
      );
      setWeather(result);
    } else {
      setError(true);
    }
  };

  const goBack = () => {
    setCity("");
    setWeather("");
    setError(false);
  };

  const addOrRemoveFavorites = () => {
    const index = favorites.findIndex(f => f === city);
    console.log(index);
    if (index < 0) {
      setFavorites([...favorites, city.toLowerCase()]);
    } else {
      let array = [...favorites];
      array.splice(index, 1);
      setFavorites(array);
    }
  };

  return (
    <div className="App">
      {city && weather ? (
        <Weather
          weather={weather}
          city={city}
          goBack={goBack}
          addOrRemoveFavorites={addOrRemoveFavorites}
          favorites={favorites}
        />
      ) : (
        <City
          setCity={setCity}
          getWeather={getWeather}
          error={error}
          favorites={favorites}
        />
      )}
    </div>
  );
}

export default App;
