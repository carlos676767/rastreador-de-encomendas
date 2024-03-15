
const input = document.querySelector("input")  as HTMLInputElement
const button = document.querySelector("button") as HTMLButtonElement
const imagem = document.querySelector("img") as HTMLImageElement


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

const gerarFrase = () => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=af1f563fdce202604e28dada8fafdc47`)
  .then(response => response.json())
  .then(data => {

    obterPaisENomeCidade(data)
    converterTempereatura(data)
    const iconCode = data
    imagem.src = iconCode
    console.log(iconCode);
    
  })
  .catch(error => console.error('Erro:', error));
};


button.addEventListener("click", () => {
  gerarFrase()
})

