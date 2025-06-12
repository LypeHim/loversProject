//Intro Settings
function setCookie(nome, valor, dias) {
    const d = new Date();
    d.setTime(d.getTime() + (dias * 24 * 60 * 60 * 1000));
    document.cookie = `${nome}=${valor};expires=${d.toUTCString()};path=/`;
  }

  function getCookie(nome) {
    const nomeEQ = nome + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nomeEQ) === 0) return c.substring(nomeEQ.length);
    }
    return null;
  }

  function mostrarIntroSeNecessario() {
    if (getCookie("introJaVisto")) {
      document.getElementById('introOverlay').style.display = 'none';
      document.querySelector('main').style.display = 'block';
      return;
    }

    let progresso = 0;
    const barra = document.getElementById("progressBar");
    const texto = document.getElementById("percentText");
    const cuteArea = document.getElementById("cute-phrases");
    const cutePhrases = [
        'Preparando ambiente acolhedor...',
        'Carregando lembranças',
        'Preparando canto aconchegante',
        'Montando contador de tempo juntos...',
        'Finalizando...'
    ]

    const intervalo = setInterval(() => {
        progresso++;
        barra.style.width = progresso + "%";
        texto.textContent = progresso + "%";

        if (progresso <= 20) {
            cuteArea.textContent = cutePhrases[0];
        } else if (progresso <= 40) {
            cuteArea.textContent = cutePhrases[1];
        } else if (progresso <= 60) {
            cuteArea.textContent = cutePhrases[2];
        } else if (progresso <= 80) {
            cuteArea.textContent = cutePhrases[3];
        } else if (progresso <= 100) {
            cuteArea.textContent = cutePhrases[4];
        }

      if (progresso >= 100) {
        clearInterval(intervalo);
        document.getElementById('introOverlay').classList.add('fade-out');
        setTimeout(() => {
          document.getElementById('introOverlay').style.display = 'none';
          document.querySelector('main').style.display = 'block';
          setCookie("introJaVisto", "sim", 15); // não mostra por 3 dias
        }, 600);
      }
    }, 120); // tempo total ~6 segundos
  }

  document.addEventListener('DOMContentLoaded', mostrarIntroSeNecessario);

// Slick settings
$(document).ready(function(){
    $('.slider').slick({
      autoplay: true,
      dots: true,
      arrows: false,
      infinite: true,
      speed: 800,
      fade: true,
      cssEase: 'ease'
    });
});

//Time Together feature
const inicioRelacionamento = new Date('2024-01-13T18:00:00');

function updateCounter() {
  const agora = new Date();

  let anos = agora.getFullYear() - inicioRelacionamento.getFullYear();
  let meses = agora.getMonth() - inicioRelacionamento.getMonth();
  let dias = agora.getDate() - inicioRelacionamento.getDate();
  let horas = agora.getHours() - inicioRelacionamento.getHours();
  let minutos = agora.getMinutes() - inicioRelacionamento.getMinutes();
  let segundos = agora.getSeconds() - inicioRelacionamento.getSeconds();

  // Ajuste para valores negativos (ex: se ainda não completou o mês ou hora)
  if (segundos < 0) {
    segundos += 60;
    minutos--;
  }
  if (minutos < 0) {
    minutos += 60;
    horas--;
  }
  if (horas < 0) {
    horas += 24;
    dias--;
  }
  if (dias < 0) {
    const mesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);
    dias += mesAnterior.getDate();
    meses--;
  }
  if (meses < 0) {
    meses += 12;
    anos--;
  }

  //TODO: resolver essa questão dos (s's no final)
  document.getElementById('anos').innerText = `${anos} \nano`;
  document.getElementById('meses').innerText = `${meses} \nmeses`;
  document.getElementById('dias').innerText = `${dias} \ndias`;
  document.getElementById('horas').innerText = `${horas} \nhoras`;
  document.getElementById('minutos').innerText = `${minutos} \nminutos`;
  document.getElementById('segundos').innerText = `${segundos} \nsegundos`;

}

setInterval(updateCounter, 1000);
updateCounter();

//Funcionalidade das tabs:
const buttons = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

buttons.forEach(button => {
    button.addEventListener('click', () => {
    // Remover classes "active"
    buttons.forEach(btn => btn.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    // Ativar o clicado
    button.classList.add('active');
    document.getElementById(button.getAttribute('data-tab')).classList.add('active');
    });
});