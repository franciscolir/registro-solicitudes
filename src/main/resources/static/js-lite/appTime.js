let dateContainer = document.querySelector(".date-containerTime");
let clockContainer = document.querySelector(".clock-containerTime");
const weekdays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  
const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  

const dateClock = setInterval(function dateTime() {
  const today = new Date();
  let date = today.getDate();
  let day = weekdays[today.getDay()];
  let month = monthNames[today.getMonth()];

  let hours = today.getHours();
  let minutes = today.getMinutes();

  minutes = minutes < 10 ? "0" + minutes : minutes;

  dateContainer.innerHTML = `<p>${day}</p><p><span>${date}</span></p><p>${month}</p>`;
  clockContainer.innerHTML = `${hours}:${minutes}`;
}, 1000);