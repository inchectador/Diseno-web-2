const openBtn = document.querySelector('.open-btn');
const closeBtn = document.querySelector('.close-btn');
const offcanvasMenu = document.querySelector('.offcanvas-menu')

openBtn.addEventListener('click', function(e) {
    e.preventDefault();
    offcanvasMenu.classList.add('active');
});

// esta función hace que cuando le demos click al botón de abrir menú se le añada al offcanvas menu la clase active

closeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    offcanvasMenu.classList.remove('active');
});

// esto, por su lado, hace que cuando le demos click al botón de cerrar le quite la clase active al offcanvas menu


// el e.preventDefault(); se pone para que el anchor no lleve a ningún sitio









// carrusel


const carrusel = document.querySelector(".carrusel-items");
// se selecciona el div que engloba a las imágenes

let maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth;
// esto es un cálculo de la distancia máxima que se puede mover hacia la izquierda restando el ancho visible del carrusel
// del ancho total del contenido del carrusel

let intervalo = null;
// esta variable se utilizará para el intervalo de tiempo

let step = 1;
// esta variable determina la cantidad de píxeles que se desplaza el carrusel

const start = () => {
  intervalo = setInterval(function () {
    carrusel.scrollLeft = carrusel.scrollLeft + step;
    if (carrusel.scrollLeft >= maxScrollLeft) {
      carrusel.scrollLeft = 0;
    
    }
  }, 10);
};
// start es una función que iniciamos para determinar el desplazamiento automático del carrusel
// dentro de ella determinamos setInterval, para ejecutar cada 10 milisegundos un bloque de código.
// Dentro se determina que el scrollLeft irá avanzando cada 10 milisegundos 1 step, y que si llega al final del scrollLeft,
// vuelva al principio

// esto último no funciona muy bien


const stop = () => {
  clearInterval(intervalo);
};

// esta función detiene el intervalo

carrusel.addEventListener("mouseover", () => {
  stop();
});

// esto hace que cuando pongamos el ratón encima del carrusel se detenga

carrusel.addEventListener("mouseout", () => {
  start();
});

// esto hace que el carrusel se reinicie después de haber estado en stop


start();





// modal


const openModal = document.querySelector('.hero__cta');
// se selecciona el boton para abrir el modal
const modal = document.querySelector('.modal');
// se selecciona el section del modal
const closeModal = document.querySelector('.modal__close');
// se selecciona el boton de cerrar modal

openModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('modal--show');
});

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('modal--show');
});






// carrusel portatiles 


const initSlider = () =>{
  const imageList = document.querySelector(".slider-wrapper .image-list")
  const sliderScrollbar = document.querySelector(".container .slider-scrollbar")
  const scrollbarThumb =  sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft =imageList.scrollWidth - imageList.clientWidth;

// esta función es para cuando hacemos click en la barra de desplazamiento y la movemos
  scrollbarThumb.addEventListener("mousedown", (e) => {
    // esta es la posición inicial del ratón cuando hace click en la barra de desplazamiento
      const startX = e.clientX;
      // esta es la posición de la barra de desplazamiento
      const thumbPosition = scrollbarThumb.offsetLeft
      // esta es la posición máxima que puede alcanzar la barra de desplazamiento
      const maxThumbPosition =sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

      // esta función maneja el movimiento del ratón 
      const handleMouseMove = (e) => {
        // esta constante calcula el cambio en la posición del ratón desde el click incial
          const deltaX = e.clientX -startX;
          // esta es la nueva posición de la barra
          const newPosition = thumbPosition + deltaX;
        // esta constante asegura que la nueva posición esté dentro de los límites
          const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newPosition));
          // esta constante calcula la nueva posición en la lista de imágenes
          const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft

          // el desplazamiento de la lista de imágenes y la posición de la barra se actualizan
          scrollbarThumb.computedStyleMap.left =`${boundedPosition}px`
          imageList.scrollLeft = scrollPosition
      }

      // función que detiene el seguimiento del movimiento cuando se deja de clickar
      const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
      }
      // permite detectar cuando el ratón se mueve y cuando se deja de pulsar
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

  });
  // esta constante actualiza la posición de la barra de desplazamiento
  const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left = `${thumbPosition}px`;
  }
  // Esta función actualiza la barra de desplazamiento al hacer scroll en la lista de imágenes
  imageList.addEventListener("scroll", () => {
      updateScrollThumbPosition();
  })
}
// esto hace que se vuelva a iniciar el slider cuando cambie de tamaño la página o se recarge
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);




// API de openWeather


const API_URL= `https://api.openweathermap.org/data/2.5/weather?lat=37.38&lon=-5.97&appid=2a4a6e539c4f35bf40246287d9011c9b`;
// esta es la URL de la API de OpenWeather con los parámetros concretos de Sevilla 

// nueva instancia HTTP, para realizar solicitudes HTTP
const xhr = new XMLHttpRequest();

function onRequestHandler(){
  // este if verifica si la solicitud es exitosas (status == 200) y si el estado es 4 (completado)
  if(this.status == 200 && this.readyState == 4){
    // convierte la respuesta, que saldrá en forma de JSON, en un objeto JavaScript
    const data = JSON.parse(this.response)

    // este es el div por el que saldrá la respuesta de la API
    const HTMLResponse = document.querySelector('.API');
    // generamos una variable con la temperatura en grados celsius
    let celsius = parseInt(`${data.main.temp}`) - 273;
    // generamos una cadena de texto con los datos obtenidos del JSON
    const tpl = (`<p class="data">${data.name}, ${celsius}ºC</p>`)
    // pasamos la cadena de texto al div
    HTMLResponse.innerHTML = tpl;
  }
}
// esto llamará a la función cuando se termine la solicitud
xhr.addEventListener('load', onRequestHandler);
// hace una solicitud get a la url de la Api
xhr.open('GET', `${API_URL}`);
// envía la solicitud
xhr.send();






// accordeon menu




let listElements = document.querySelectorAll('.link');
// seleccionamos todos los elementos link dentro de una variable, y así formarán un array

listElements.forEach(listElement => {
  // recorremos ese array con un forEach
    listElement.addEventListener('click', ()=>{
      // le añadimos un método de eventos, poniendo como condición para disparar ese evento un 'click' sobre los elementos li
        if (listElement.classList.contains('active')){
            listElement.classList.remove('active');

            // por un lado, decimos que si alguno de esos elementos tiene la clase active, se la quitamos
        }else{
            listElements.forEach (listE => {
                listE.classList.remove('active');

                // sino, lo que hacemos es recorrer otra vez el array para quitar todas las clases active
            })
            listElement.classList.toggle('active');

            // y por ultimo agrega o elimina la clase active al elemento actual según la tenga o no
        }
    })
});

// Este código hace que, básicamente, cuando vuelvas a pulsar sobre otro li la clase active se elimine si has abierto otro li antes



