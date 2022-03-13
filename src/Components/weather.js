import axios from 'axios';
import { memo, useCallback, useEffect, useState } from 'react';

const toQueryString = (obj) => {
  const parts = [];
  for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
          parts.push(`${encodeURIComponent(i)}=${encodeURIComponent(obj[i])}`);
      }
  }
  return parts.join('&');
}

// https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}
// units=metric&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}
// id=1&name=foo &weather[0].description=bar&weather[0].main=baz
// console.log(toQueryString({id: 1, name: 'foo'}));

const Weather = () => {

  const [state, setState] = useState({weather: null});
  const pollWeather = useCallback((location) => {
    let url = 'http://api.openweathermap.org/data/2.5/weather?';
    const params = {
      lat: location.coords.latitude,
      lon: location.coords.longitude
    };
    url += toQueryString(params);
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    // This is our API key; please use your own!
    url += `&appid=${apiKey}`;

    axios.get(url) //, {params})
      .then(response => {
        console.log('response ', response);
        setState({weather: response.data});
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
        console.log('weather -> ', state.weather);
      });
  }, [state.weather]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pollWeather);
    console.log('polling weather', navigator);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


 

  let content = <div></div>;

    if (state.weather) {
      const weather = state.weather;
      const temp = (weather.main.temp - 273.15) * 1.8 + 32;
      content = <div>
                  <p>{weather.name}</p>
                  <p>{temp.toFixed(1)} degrees fahrenheit</p>
                </div>;
    } else {
      content = <div className='loading'>loading weather...</div>;
    }
    return (
      <div>
        <h1>Weather</h1>
        <div className='weather'>
          {content}
        </div>
      </div>
    );
}

export default memo(Weather);
