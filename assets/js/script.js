// DOM'S ELEMENT
const city = document.getElementById('city');
const weatherDiv = document.getElementById('weather');
const air__pollution = document.getElementById('air__pollution');


const details__container = document.getElementById('details__container');
const img__container = document.getElementById('img__container');




const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const form = document.getElementById('form');


form.addEventListener('submit', formSubmit)

details__container.classList.add('active')
img__container.classList.add('active')


// FORM SUBMIT
function formSubmit(e){
    e.preventDefault();


    const latitudeVal = latitude.value;
    const longitudeVal = longitude.value;

    if (!latitude.value || !longitude.value) {
        details__container.classList.add('active')
        img__container.classList.add('active')
    }else {
        details__container.classList.remove('active')
        img__container.classList.remove('active')
    }

    weather(latitudeVal, longitudeVal)
    airPollution(latitudeVal, longitudeVal)
    
    latitude.value = ""
    longitude.value = ""
}




// WEATHER DETAILS
function weather(lat, lon){

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=219583af9b85a1bacc250d5387a12ddd`)
    .then(res => res.json())
    .then(data => {

        
        city.innerHTML = `
            <h2>Location Details</h2>
            <div><span>city:</span> ${data.name}</div>
        `;

        const mainDetails = data.main

        weatherDiv.innerHTML = `
            <h2>Weather Details</h2>
            <div><span>Pressure:</span> ${mainDetails.pressure }</div>
            <div><span>Humidity:</span> ${mainDetails.humidity }</div>
            <div><span>Temp:</span> ${mainDetails.temp}</div>
        `;
    })
    .catch(err => {
        console.log(err);
    })
}



// AIR POLLUTION DETAILS
function airPollution(lat, lon){

    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=219583af9b85a1bacc250d5387a12ddd`)
    .then(res => res.json())
    .then(data => {
        const datas = data.list


        


        let airPollutionDetails = ''

        datas.forEach(val => {
            const airComponent = val.components

            airPollutionDetails += `
                <h2>Air Pollution Details</h2>
                <div><span>CO:</span> ${airComponent.co}</div>
                <div><span>NH3:</span> ${airComponent.nh3}</div>
                <div><span>NO:</span> ${airComponent.no}</div>
                <div><span>NO2:</span> ${airComponent.no2}</div>
                <div><span>O3:</span> ${airComponent.o3}</div>
                <div><span>PM2_5:</span> ${airComponent.pm2_5}</div>
                <div><span>PM10:</span> ${airComponent.pm10}</div>
                <div><span>SO2:</span> ${airComponent.so2}</div>
            `;
        });

        air__pollution.innerHTML = airPollutionDetails
    })
    .catch(err => {
        console.log(err);
    })

}







