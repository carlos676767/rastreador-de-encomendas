
const converterTempereatura = (data: any) => {
    const p = document.querySelector("p") as HTMLParagraphElement
    const kelvin = data.main.temp
    const celsus = kelvin - 273.15
    p.innerHTML = celsus.toFixed(2)
}

const obterPaisENomeCidade = (data: any) => {
    const sys = data.sys.country
    const city = data.name
    console.log(sys, city);
    return data
}


const obterIcone = (data: any) => {
  const imagem = document.querySelector("img") as HTMLImageElement
  const iconCode = data
  imagem.src = iconCode
  console.log(iconCode);
  return data
}


const validaoInput = (city:string) => {
  return city === ''
}

const obterVentoAtual = (data: any) => {
  const obterVento = data.wind.speed
  console.log(obterVento);
  
  return data

  
}


const gerarFrase = () => {
  const cidaDE = document.querySelector("input")  as HTMLInputElement
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cidaDE.value}&appid=af1f563fdce202604e28dada8fafdc47`)
  .then(response => response.json())
  .then(data => {
    if (validaoInput(cidaDE.value)) {
      alert("Digite um nome de cidade")
    }else{
      obterPaisENomeCidade(data)
      converterTempereatura(data)
      obterIcone(data)
      obterVentoAtual(data)
      console.log(data);
      
    }
  })
  .catch(error => console.error('Erro:', error));
};

const button = document.querySelector("button") as HTMLButtonElement
button.addEventListener("click", () => {
  gerarFrase()
})

