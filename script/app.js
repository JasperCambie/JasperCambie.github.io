function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getForecast(lat, lon);
    getAPI(lat, lon);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        getForecast(50.8321792, 3.2555007999999996);
        getAPI(50.8321792, 3.2555007999999996);
    }
}

function getAPI(lat, lon){
    var n = new Date().getMonth() + 1;
    var d = new Date().getDate();
    var h = new Date().getHours();
    var m = new Date().getMinutes();
    let history = []
    for (i = 1974; i < 2019; i++) 
    {
        fetch(
            `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/f0c0a1b24f10659eb732c0b0e4b6b8c7/${lat},${lon},${i}-${n}-${d}T${h}:${m}:00+01:00?lang=nl&units=si`)
            .then((Response) => Response.json())
            .then(function(data){
                console.log(data);

                let usefull = data.currently.temperature;

                // var float = parseFloat(usefull);
                // history.push(float);
                
                history.push(usefull)

                history.sort();

                console.log(history);

                let max = `${Math.max(...history)} °C`;
                const maximum = document.querySelector(".js-warm");
                maximum.innerHTML = max;

                let min = `${Math.min(...history)} °C`;
                const minimum = document.querySelector(".js-koud");
                minimum.innerHTML = min;    
            })
        
    }
}

function getForecast(lat, lon){
	fetch(
		`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/382871f5cabf1894e7e91370e0c432f9/${lat},${lon}?units=si`)
        .then((Response) => Response.json())
        .then(function(data){
            console.log(data);

            let voorspel = data.minutely.summary;
            const predict = document.querySelector(".js-voorspelling");
            predict.innerHTML = voorspel;

            let temp = `${data.currently.temperature} °C`;
            const temperature = document.querySelector(".js-temperatuur");
            temperature.innerHTML = temp;

            let icon = `<img src="img/${data.currently.icon}.svg" class="c-image-svg" alt="${data.currently.icon}">`;
            const image = document.querySelector(".js-icoon");
            image.innerHTML = icon;
            
        }) 
        .catch(function(error) {
            console.log(error);
        });   
}

document.addEventListener('DOMContentLoaded', function() {
    getForecast(50.8027841, 3.2097454);
    // getAPI(50.8027841, 3.2097454);
    getLocation()
    
});