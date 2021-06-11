const API_KEY = '6e9738862136b69a870893515671fe8b';
//Recibe la data del usuario 'su pocisión'
const fetchData = (position) => {
    const {
        latitude,
        longitude
    } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?unit=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then((response) => response.json())
        .then(data=> setWeatherData(data))
   
}
const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate(),
    }
    //Con Object.keys nos devuelve las llave del objeto
    Object.keys(weatherData).forEach( key => {
        //Settear la info de nuestro HTML
        document.getElementById(key).textContent = weatherData[key];
    } );

    cleanUp();
}

const cleanUp = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');
    loader.style.display = 'none';
    container.style.display = 'flex';
}
//Como obtener date en JS
const getDate = () => {
    let date = new Date();
    //sI YA TIENE DOS CARACTERES LE SACAMOS EL 0 Y SI NO LOS TIENE SE DEJA PUESTO
    return `${date.getDate()}-${('0'+ (date.getMonth()+1)).slice(-2)}-${date.getFullYear()}`;
}



const onLoad = () => {
    //Nos proporciona el browser para tener la ubicación del usuario
    navigator.geolocation.getCurrentPosition(fetchData);
}