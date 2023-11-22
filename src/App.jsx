import {  CircularProgress, Slide, TextField} from '@mui/material';
import './app.css';
import { useEffect, useState } from 'react';


function App() {
  const [cityName, setCityName] = useState('Rome');
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=189271b827844bff7388350c44848615&units=metric`
      )
      .then((res) => {
        if (res.status === 200) {
          error && setError(false);
          return res.json();
        }else{
          throw new Error('Something went Wrong')
        }
      })
      .then((data) => {
        console.log(data);
        setData(data)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [cityName, error])

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setCityName(e.target.value);
      setInputText('')
    }
  }

  return (
    <div className='bg_image'>
      {!loading ? (
          <> 
            <TextField
              variant="filled" 
              label="Search location" 
              className="input_weather" 
              error={error}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleSearch}
            />
            <h1 className='city_name'>{data.name}</h1>
            <div className="group">
              <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
              <h2>{data.weather[0].main}</h2>
            </div>

            <h3 className="temperature">{data.main.temp.toFixed(1)} °C</h3>

            <Slide direction="right" timeout={800} in={!loading}>
              <div className="box_container">
                <div className="box">
                  <p>Humidity</p>
                  <h3>{data.main.humidity.toFixed()}%</h3>
                </div>
                <div className="box">
                  <p>Wind</p>
                  <h3>{data.wind.speed.toFixed()} km/h</h3>
                </div>
                <div className="box">
                  <p>Feels Like</p>
                  <h3>{data.main.feels_like.toFixed()} °C</h3>
                </div>
              </div>
          </Slide>
          </>
        ) : (
          <CircularProgress/>
        )
      }
    </div>
  );
}

export default App;
