const form = document.getElementById('form-clima');
const resultado = document.getElementById('resultado');
let map; 

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const cidade = document.getElementById('cidade').value;
    const apiKey = 'api key aqui openwhater';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;
    
    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error('Cidade não encontrada');

        const dados = await response.json();
        console.log(dados);

        resultado.innerHTML = '';

        const h3 = document.createElement('h3');
        h3.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${dados.name}, ${dados.sys.country}`;
        resultado.appendChild(h3);
        
        const pTemp = document.createElement('p');
        pTemp.innerHTML = `<i class="fa-solid fa-temperature-half"></i> <strong>Temperatura:</strong> ${dados.main.temp.toFixed(1)}°C`;
        resultado.appendChild(pTemp);
        
        const pSensacaoTermica = document.createElement('p');
        pSensacaoTermica.innerHTML = `<i class="fa-solid fa-temperature-arrow-down"></i> <strong>Sensação Térmica:</strong> ${dados.main.feels_like.toFixed(1)}°C`;
        resultado.appendChild(pSensacaoTermica);
        
        const pTempMin = document.createElement('p');
        pTempMin.innerHTML = `<i class="fa-solid fa-temperature-low"></i> <strong>Temp. Mínima:</strong> ${dados.main.temp_min.toFixed(1)}°C`;
        resultado.appendChild(pTempMin);
        
        const pTempMax = document.createElement('p');
        pTempMax.innerHTML = `<i class="fa-solid fa-temperature-high"></i> <strong>Temp. Máxima:</strong> ${dados.main.temp_max.toFixed(1)}°C`;
        resultado.appendChild(pTempMax);

        const pClima = document.createElement('p');
        pClima.innerHTML = `<i class="fa-solid fa-cloud"></i> <strong>Clima:</strong> ${dados.weather[0].description}`;
        resultado.appendChild(pClima);

        const pUmidade = document.createElement('p');
        pUmidade.innerHTML = `<i class="fa-solid fa-droplet"></i> <strong>Umidade:</strong> ${dados.main.humidity}%`;
        resultado.appendChild(pUmidade);
        
        const pPressao = document.createElement('p');
        pPressao.innerHTML = `<i class="fa-solid fa-gauge-high"></i> <strong>Pressão:</strong> ${dados.main.pressure} hPa`;
        resultado.appendChild(pPressao);

        const pVento = document.createElement('p');
        pVento.innerHTML = `<i class="fa-solid fa-wind"></i> <strong>Vento:</strong> ${dados.wind.speed} km/h`;
        resultado.appendChild(pVento);

        const longitude = document.createElement('p');
        longitude.innerHTML = `<i class="fa-solid fa-compass"></i> <strong>Longitude:</strong> ${dados.coord.lon}`;
        resultado.appendChild(longitude);

        const latitude = document.createElement('p');
        latitude.innerHTML = `<i class="fa-solid fa-globe"></i> <strong>Latitude:</strong> ${dados.coord.lat}`;
        resultado.appendChild(latitude);

        mostrarMapa(dados.coord.lat, dados.coord.lon, dados.name);

    } catch (erro) {
        resultado.innerHTML = `<p style="color:red;"><i class="fa-solid fa-triangle-exclamation"></i> Erro: ${erro.message}</p>`;
    }
});

function mostrarMapa(lat, lon, cidade) {
    const local = { lat: lat, lng: lon };
    
    if (!map) {
        map = new google.maps.Map(document.getElementById("map"), {
            center: local,
            zoom: 10,
        });
    } else {
        map.setCenter(local);
    }

    new google.maps.Marker({
        position: local,
        map: map,
    });
}

