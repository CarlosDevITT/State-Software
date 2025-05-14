
window.addEventListener("scroll", function(){
  let header = document.querySelector('#header')
  header.classList.toggle('rolagem',window.scrollY > 0)
})

function menuShow() {
  let menuMobile = document.querySelector('.mobile-menu');
  if (menuMobile.classList.contains('open')) {
      menuMobile.classList.remove('open');
      document.querySelector('.icon').src = "assets/img/menu_white_36dp.svg";
  } else {
      menuMobile.classList.add('open');
      document.querySelector('.icon').src = "assets/img/close_white_36dp.svg";
  }
}

const topo = document.querySelector(".topo-do-site");
const image= document.querySelector(".img-topo-site");

const cursor ={
  isdragging: false,
  initialPosition: 0,

};

let currentImage = 1;

const updateImage = (direction) => {
   if(direction < 0 ) {
     
    currentImage += 1;

   }
   if(direction > 0) {
     currentImage -= 1
   }
     imagem.src = './img/${currentImage}.png'
};

topo.addEventListener("mouse", (event) => {
  cursor.isdragging = true;
  cursor.initialPosition = event.clientX;
})
topo.addEventListener("mouseup", () =>{
  curso.isdragging = false;
});

topo.addEventListener ("mousemove", ({ clientX }) => {
  if (!cursor.isdragging) return;

  const offest = curso.initialPosition - clientX;

  if(Math.abs(offest) >= 50){
    updateImage(offset);
    cursor.initialPosition = clientX;
  }
  
  
})