const formSection = document.querySelector('#form-section');
const goSomewhereBtn = document.querySelector('.go-somewhere-btn');
const form = document.querySelector('form');
const deleteBtn = document.querySelector('#delete-btn');
const origin = document.querySelector('input[name="origin"]');
const destination = document.querySelector('input[name="destination"]');
const destinationDate = document.querySelector('input[name="date"]');
const timestampNow = (Date.now()) / 1000;
const geoNamesURL = 'http://api.geonames.org/searchJSON?q=';
const username = "yeg003"
const weatherbitAPI = 'bc40d666d0864bca844fb7b0df332f8d';
const weatherbitURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const pixabayAPI = '16109521-0b4f37d858199cbe24a1285f2';
const pixabayAPIURL = "https://pixabay.com/api/?key="; 
const resultSection = document.querySelector('#result-section')


//smooth scroll event listener
const goSomewhere = goSomewhereBtn.addEventListener('click', function(e){
    e.preventDefault();
    formSection.scrollIntoView({behavior: 'smooth'});
})

//remove trip
deleteBtn.addEventListener('click', function(e){
    form.reset();
    formSection.classList.add('hidden');
    location.reload();
})

// submit form
form.addEventListener('submit',goSomewhereFunc)

export function goSomewhereFunc(e){
    e.preventDefault();
    const originValue = origin.value;
    const destinationValue = destination.value;
    const destinationDateValue = destinationDate.value;
    const timestamp = (new Date(destinationDateValue).getTime()) / 1000;

    Client.checkInput(originValue, destinationValue);

    getPlaceInfo(geoNamesURL, destinationValue, username )
    .then((cityData) =>{
        const cityLat = cityData.geonames[0].lat;
        const cityLong = cityData.geonames[0].lng;
        const country = cityData.geonames[0].countryName;
        const weatherData = getWeather(cityLat, cityLong, country, timestamp)
        console.log(cityData)
        return weatherData;
        
    }) 
    .then((weatherData)=> {
        const daysLeft = Math.round((timestamp - timestampNow)/ 86400);
        const userData = postData('http://localhost:3000/add', {originValue, destinationValue, destinationDateValue, weather: weatherData.data[15].temp * 9/5 + 32, daysLeft})
        return userData;
        
    })
    .then((userData)=>{
        updateUI(userData);
    })
}

// Fetch location from Geonames API
export const getPlaceInfo = async (geoNamesURL, destinationValue, username)=>{
    const res = await fetch(geoNamesURL + destinationValue + "&maxRows=10&" + "username=" + username);
    try{
        const cityData = await res.json();
        return cityData;
    } catch(error){
        console.log("error", error);
    }
}

// Fetch weather from Weatherbit API
export const getWeather = async(cityLat, cityLong,)=>{
    const req = await fetch(weatherbitURL + "lat=" +  cityLat + "&lon=" +  cityLong + "&key=" + weatherbitAPI);
    try {
        const weatherData = await req.json();
        return weatherData;
    } catch(error){
        console.log("error", error)
    }
}

// POST information to local server

export const postData = async (url = '', data = {}) =>{
    const req = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            depCity: data.originValue,
            arrCity: data.destinationValue,
            depDate: data.destinationDateValue,
            weather: data.weather,
            daysLeft: data.daysLeft
        })
    })
    try{
        const userData = await req.json();
        return userData;
    } catch(error){
        console.log('error'), error;
    }
}

// Updates UI with information from API

export const updateUI = async (userData) =>{
    resultSection.classList.remove("hidden");
    resultSection.scrollIntoView({behavior: "smooth"});

    const res = await fetch(pixabayAPIURL + pixabayAPI + "&q=" + userData.arrCity + "+city&image_type=photo");


    try{
        const imgLink = await res.json();
        const dateSplit = userData.depDate.split("_").reverse().join(" / ");
        document.querySelector("#destination-img").setAttribute('src', imgLink.hits[0].webformatURL);
        document.querySelector("#city").innerHTML = userData.arrCity;
        document.querySelector("#date").innerHTML = dateSplit;
        document.querySelector("#days-left").innerHTML = userData.daysLeft;
        document.querySelector("#destination-weather").innerHTML = userData.weather;

    }
    catch(error){
        console.log("error", error)
    }
}


export {goSomewhere}