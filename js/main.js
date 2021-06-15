const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");

const updateUi = (data) => {
    // const cityDets = data.cityDets;
    // const weather = data.weather;

    // object destructuring of this above
    // getting properties from object and store in costant(same name)
    const { cityDets, weather } = data;

    // update detail templates
    details.innerHTML = `
    <h5 class="my-3">
        ${cityDets.EnglishName}
    </h5>
    <div class="my-3">
        ${weather.WeatherText}
    </div>
    <div class="display-4 my-4">
       <span>${weather.Temperature.Metric.Value} C</span>
       <span>&deg;</span>
    </div>
    `;

    // update the night and day image
    let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // const result = condition ? 'value 1' : 'value 2';

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    // let timeSrc = null;
    // if (weather.IsDayTime) {
    //     timeSrc = 'img/day.svg';
    // } else {
    //     timeSrc = 'img/night.svg';
    // }

    time.setAttribute('src', timeSrc);

    // remove d-none card class if present
    if (card.classList.contains("d-none")) {
        card.classList.remove('d-none');
    }
};


const cityForm = document.querySelector("form");

const updateCity = async (city) => {

    console.log(city);

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        // cityDets: cityDets,
        // weather: weather

        // object shorthand notation
        cityDets,
        weather
    };

};


cityForm.addEventListener("submit", e => {
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with the new city
    updateCity(city).then(data => updateUi(data))
        .catch(err => console.log(err));
});