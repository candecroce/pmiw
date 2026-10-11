let imagenes = [];
let cargando = true;

let archivos = [
  "data/pantalla 1.jpeg",
  "data/pantalla 2.jpeg",
  "data/pantalla 3.jpeg",
  "data/pantalla 4.jpeg",
  "data/pantalla 5.jpeg",
  "data/pantalla 6.jpeg",
  "data/pantalla 7.jpeg",
  "data/pantalla 8.jpeg",
  "data/pantalla 9.jpeg",
  "data/pantalla 10.jpeg",
  "data/pantalla 11.jpeg",
  "data/pantalla 12.jpeg",
  "data/pantalla 13.jpeg",
  "data/pantalla 14.jpeg",
  "data/pantalla 15.jpeg"
];

let titulos = [
  "LONDRES, 1890",
  "LA CARTA MISTERIOSA",
  "LA PUERTA CERRADA",
  "LA APARICIÓN DE HYDE",
  "UNA INVESTIGACIÓN COMIENZA",
  "LA PERSECUCIÓN",
  "EL DOCTOR JEKYLL",
  "EL LABORATORIO",
  "EL EXPERIMENTO",
  "LA HUIDA",
  "EL DOMINIO DE HYDE",
  "DOS SOMBRAS",
  "FRENTE AL ESPEJO",
  "LA TRANSFORMACIÓN",
  "EL AMANECER"
];

let narraciones = [
  "Londres, 1890. Bajo la niebla y las luces de gas, la ciudad guarda un secreto.",
  "El doctor Jekyll encuentra una carta inquietante. El nombre de Hyde aparece en ella.",
  "En una calle oscura, una vieja puerta parece esconder algo terrible.",
  "Una figura cruza la niebla. Su presencia basta para helar la noche.",
  "Jekyll revisa cada pista y descubre que Hyde está más cerca de lo que imaginaba.",
  "Un misterioso hombre se aleja por las calles vacías de Londres.",
  "Durante el día, el doctor intenta conservar la calma y continuar con su vida.",
  "En su laboratorio, Jekyll prepara un experimento que podría cambiarlo todo.",
  "Convencido de que puede separar sus impulsos, Jekyll toma la pócima.",
  "Hyde huye por las calles mientras la niebla lo oculta de sus perseguidores.",
  "La criatura regresa. Cada vez parece más fuerte y difícil de controlar.",
  "Detrás del vidrio, dos siluetas se enfrentan: Jekyll lucha por resistir.",
  "Jekyll mira su reflejo, pero ya no está seguro de quién lo observa.",
  "La transformación se completa. Hyde ha tomado el control.",
  "Amanece sobre Londres. El secreto del doctor queda para siempre entre sus calles."
];

let duracionPantalla = 6000;

function preload() {
  // p5.js 1.5.0 carga las imágenes durante preload antes de iniciar draw().
  for (let i = 0; i < archivos.length; i++) {
    imagenes[i] = loadImage(
      archivos[i],
      () => {},
      (error) => console.error("No se pudo cargar " + archivos[i] + ":", error)
    );
  }
}

function setup() {
  createCanvas(800, 450);
  textFont("Georgia");
  cargando = false;
}

function draw() {
  background(0);

  if (cargando) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Cargando imágenes...", width / 2, height / 2);
    return;
  }

  if (imagenes.length === 0) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    text("No se cargaron las imágenes. Revisá sus nombres y ubicación.", width / 2, height / 2);
    return;
  }

  let indice = floor(millis() / duracionPantalla);
  indice = min(indice, imagenes.length - 1);

  dibujarImagen(imagenes[indice]);
  mostrarTexto(titulos[indice], narraciones[indice], indice + 1);
}

function dibujarImagen(img) {
  if (!img) return;

  let escala = max(width / img.width, height / img.height);
  let anchoRecorte = width / escala;
  let altoRecorte = height / escala;
  let xRecorte = (img.width - anchoRecorte) / 2;
  let yRecorte = (img.height - altoRecorte) / 2;

  image(
    img,
    0, 0, width, height,
    xRecorte, yRecorte, anchoRecorte, altoRecorte
  );
}

function mostrarTexto(titulo, narracion, numero) {
  noStroke();
  fill(0, 0, 0, 185);
  rect(0, height - 100, width, 100);

  fill(230, 190, 115);
  textAlign(RIGHT, TOP);
  textSize(14);
  text(numero + " / 15", width - 22, height - 88);

  textAlign(LEFT, TOP);
  textSize(20);
  text(titulo, 24, height - 85, width - 130, 28);

  fill(255);
  textSize(16);
  text(narracion, 24, height - 50, width - 48, 42);
}

