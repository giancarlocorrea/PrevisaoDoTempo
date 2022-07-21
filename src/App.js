import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [alerta, setAlerta] = useState("");
  const APIKey = "895284fb2d2c50a520ea537456963d9c";
  const unidadeMedida = "metric";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unidadeMedida}&lang=pt_br&appid=${APIKey}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          switch (response.data.weather[0].description) {
            case "nublado":
              //alert("nublado");
              break;
            default:
          }

          setData(response.data);
          setAlerta("");
          console.log(response.data);
        })
        .catch(() => {
          setAlerta("Cidade inexistente");
        });
    }
  };

  const primeiraLetra = (palavra) => {
    return palavra[0].toUpperCase() + palavra.substring(1);
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Digite a Cidade"
          type="text"
        />
        <div className="alert">
          <p>{alerta}</p>
        </div>
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>

          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? (
              <p>{primeiraLetra(data.weather[0].description)}</p>
            ) : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Sensação</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidade</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} KM/h</p>
              ) : null}
              <p>Vento</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
