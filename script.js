let cityName = document.querySelector(".weather-city");
let dateTime = document.querySelector(".date-time");
let w_forecast = document.querySelector(".weather-forecast");
let w_icon = document.querySelector(".weather-icon");
let w_temperature = document.querySelector(".weather-temprature");
let w_minTem = document.querySelector(".min");
let w_maxTem = document.querySelector(".max");

let w_feelsLike = document.querySelector(".weather-feels-like");
let w_humidity = document.querySelector(".weather-humidity");
let w_wind = document.querySelector(".weather-wind");
let w_pressure = document.querySelector(".weather-pressure");

let citySearch = document.querySelector(".weather-search");
let city="kanpur";

const getDate=(dt)=>{
  const curDate=new Date(dt*1000);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(curDate);
}
const getCountryName=(code)=>{
  return new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
}
citySearch.addEventListener("submit",(e)=>{
  e.preventDefault();
  let cityName=document.querySelector(".city-name");
  city=cityName.value;
  getWeatherData();
  cityName.value="";

});

const getWeatherData=async()=>{
  const ApiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7f591cf1950d5638f770fd41d4a1e265`;
  try{
    const res=await fetch(ApiUrl);
    const data=await res.json();
    console.log(data);
    const {main,name ,weather,wind,sys,dt}=data;
    
    cityName.innerHTML=`${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML=getDate(dt);
    console.log(weather[0].main);
    w_forecast.innerHTML=weather[0].main;
    
    
    w_temperature.innerHTML=`${main.temp}&#176`;
    w_minTem.innerHTML=`Min: ${main.temp_min.toFixed()}&#176`;
    w_maxTem.innerHTML=`Max: ${main.temp_max.toFixed()}&#176`;
    w_feelsLike.innerHTML=`${main.feels_like.toFixed(2)}&#176`;
    w_humidity.innerHTML=`${main.humidity}%`;
    w_wind.innerHTML=`${wind.speed} m/s`;
    w_pressure.innerHTML=`${main.pressure} hPa`;
    w_icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

  }
  catch(er){
    console.log("Api is Not Working");
    w_icon.innerHTML=`API is Not Working`;

  }
}
document.body.addEventListener("load",getWeatherData());