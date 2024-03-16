const converterTempereatura = (data: any) => {
  const p = document.getElementById("texto") as HTMLParagraphElement;
  const kelvin = data.main.temp;
  const celsus = kelvin - 273.15;
  p.innerHTML =  `<img src="" alt="icone" id="icone"> ${celsus.toFixed(2)}°C `;
};
let sys: any;
const obterPaisENomeCidade = (data: any) => {
const mostrarCity = document.getElementById("mostrarCity") as HTMLParagraphElement
  sys = data.sys.country;
  const city = data.name;
  mostrarCity.innerHTML = ` ${city}, ${sys}   <img src="" alt="bandeira" id="bandeiraP">`
  console.log(sys, city);
  return { data };
};

const obterIcone = (data: any) => {
  const imagem = document.getElementById("icone") as HTMLImageElement;
  const iconCode = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  imagem.src = iconCode;
  return data;
};

const validaoInput = (city: string) => {
  return city === "";
};

const obterVentoAtual = (data: any) => {
  const exibirVento = document.getElementById("exibirVento") as HTMLParagraphElement
  const obterVento = data.wind.speed;
  exibirVento.innerHTML = `${obterVento}Km/h`
  console.log(obterVento);
  return data;
};

const gerarInformacoes = () => {
  const cidaDE = document.querySelector("input") as HTMLInputElement;
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cidaDE.value}&appid=af1f563fdce202604e28dada8fafdc47`)
    .then((response) => response.json())
    .then((data) => {
      if (validaoInput(cidaDE.value)) {
        alert("Digite um nome de cidade");
      } else {
        obterPaisENomeCidade(data);
        converterTempereatura(data);
        obterIcone(data);
        obterVentoAtual(data);
        console.log(data);
        obterBandeiraPais();
        obterTempoMinimoEmaximo(data);
        obterhumidade(data)
      }
    })
    .catch((error) => console.error("Erro:", error));
};

const button = document.querySelector("button") as HTMLButtonElement;
button.addEventListener("click", () => {
  gerarInformacoes();
});

const obterBandeiraPais = () => {
  const bandeiraPais = document.getElementById("bandeiraP") as HTMLImageElement;
  fetch(`https://restcountries.com/v3.1/alpha/${sys}`)
    .then((response) => response.json())
    .then((data) => {
      bandeiraPais.src = data[0].flags.png;
    })
    .catch((erro) => {
      console.log(erro);
    });
};

const obterTempoMinimoEmaximo = (data: any) => {
  const max = document.getElementById("max") as HTMLParagraphElement
  const min = document.getElementById("min") as HTMLParagraphElement
  const tempoMaximo = data.main.temp_max;
  const tempoMinimo = data.main.temp_min;
  const valorTempoMaximoEmC = tempoMaximo - 273.15;
  max.innerHTML = `${valorTempoMaximoEmC.toFixed(2)}°C`
  const valorTempoMinimoEmC = tempoMinimo - 273.15;
  min.innerHTML =  `${valorTempoMinimoEmC.toFixed(2)}°C`
  return data;
};

const obterhumidade = (data: any) => {
  const exibirhumidade = document.getElementById("exibirhumidade") as HTMLParagraphElement
  const humidade = data.main.humidity
  exibirhumidade.innerHTML = `${humidade}%`
  return data
}