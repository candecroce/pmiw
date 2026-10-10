const duracionPantalla = 6000;
const duracionFinal = 8000;
const duracionFundido = 800;
const imagenes = [];

let indiceActual = 0;
let modo = "historia";
let tiempoInicioPantalla = 0;
let tiempoCreditos = 0;
let sonidoActivo = false;
let musica;

const pantallas = [
  { archivo: "data/imagen01.jpeg", titulo: "LONDRES, 1890", texto: "Bajo la niebla y las luces de gas, Londres guarda un secreto." },
  { archivo: "data/imagen02.jpeg", titulo: "LA CARTA MISTERIOSA", texto: "El doctor Jekyll encuentra una carta inquietante. El nombre de Hyde aparece en ella." },
  { archivo: "data/imagen03.jpeg", titulo: "LA PUERTA CERRADA", texto: "En una calle oscura, una vieja puerta parece esconder algo terrible." },
  { archivo: "data/imagen04.jpeg", titulo: "LA APARICIÓN DE HYDE", texto: "Una figura cruza la niebla. Su presencia basta para helar la noche." },
  { archivo: "data/imagen05.jpeg", titulo: "UNA INVESTIGACIÓN COMIENZA", texto: "Jekyll revisa cada pista y descubre que Hyde está más cerca de lo que imaginaba." },
  { archivo: "data/imagen06.jpeg", titulo: "LA PERSECUCIÓN", texto: "Un misterioso hombre se aleja por las calles vacías de Londres." },
  { archivo: "data/imagen07.jpeg", titulo: "EL DOCTOR JEKYLL", texto: "Durante el día, el doctor intenta conservar la calma y continuar con su vida." },
  { archivo: "data/imagen08.jpeg", titulo: "EL LABORATORIO", texto: "En su laboratorio, Jekyll prepara un experimento que podría cambiarlo todo." },
  { archivo: "data/imagen09.jpeg", titulo: "EL EXPERIMENTO", texto: "Convencido de que puede separar sus impulsos, Jekyll toma la pócima." },
  { archivo: "data/imagen10.jpeg", titulo: "LA HUIDA", texto: "Hyde huye por las calles mientras la niebla lo oculta de sus perseguidores." },
  { archivo: "data/imagen11.jpeg", titulo: "EL DOMINIO DE HYDE", texto: "La criatura regresa. Cada vez parece más fuerte y difícil de controlar." },
  { archivo: "data/imagen12.jpeg", titulo: "DOS SOMBRAS", texto: "Detrás del vidrio, Jekyll lucha por resistir a la otra presencia." },
  { archivo: "data/imagen13.jpeg", titulo: "FRENTE AL ESPEJO", texto: "Jekyll descubre que aún puede elegir: luchar contra Hyde o dejarse dominar." },
  { archivo: "data/imagen14.jpeg", titulo: "FINAL: HYDE TOMA EL CONTROL", texto: "Jekyll cede ante su otra identidad. Hyde queda libre y desaparece entre la niebla." },
  { archivo: "data/imagen15.jpeg", titulo: "FINAL: EL AMANECER", texto: "Jekyll resiste la transformación. La noche termina y Londres despierta en silencio." }
];

const creditos = [
  "CRÉDITOS",
  "La extraña historia del Dr. Jekyll y Mr. Hyde",
  "Autor de la obra: Robert Louis Stevenson",
  "Relato visual con imágenes generadas mediante inteligencia artificial",
  "Trabajo Práctico #1",
  "Alumnas:",
  "Croce Candela",
  "Valentina del Valle Quintana"
];

function preload() {
  for (let i = 0; i < pantallas.length; i++) {
    imagenes[i] = loadImage(
      pantallas[i].archivo,
      () => {},
      (error) => console.error("No se pudo cargar " + pantallas[i].archivo, error)
    );
  }
  musica = loadSound("data/ambiente.wav");
}

function setup() {
  createCanvas(800, 450);
  textFont("Georgia");
  tiempoInicioPantalla = millis();
}

function draw() {
  if (modo === "creditos") {
    dibujarCreditos();
    dibujarBoton(18, 16, 120, 34, "REINICIAR");
    dibujarBoton(width - 160, 16, 142, 34, etiquetaSonido());
    return;
  }

  let transcurrido = millis() - tiempoInicioPantalla;

  if (modo === "historia" && transcurrido >= duracionPantalla) {
    if (indiceActual < 11) {
      indiceActual++;
      tiempoInicioPantalla = millis();
    } else {
      modo = "eleccion";
      indiceActual = 12;
      tiempoInicioPantalla = millis();
    }
    transcurrido = millis() - tiempoInicioPantalla;
  }

  if (modo === "final" && transcurrido >= duracionFinal) {
    iniciarCreditos();
    return;
  }

  background(0);
  dibujarImagen(imagenes[indiceActual], indiceActual);
  mostrarTexto(pantallas[indiceActual], indiceActual + 1, modo === "eleccion");

  if (modo === "eleccion") {
    dibujarBoton(250, height - 46, 140, 34, "LUCHAR");
    dibujarBoton(410, height - 46, 140, 34, "CEDER");
  }

  if (modo === "final") {
    dibujarBoton(18, 16, 120, 34, "REINICIAR");
    fill(255, 238, 205);
    textAlign(CENTER, TOP);
    textSize(12);
    text("Los créditos comenzarán automáticamente", width / 2, 22);
  }

  dibujarBoton(width - 160, 16, 142, 34, etiquetaSonido());
  aplicarFundido(transcurrido, modo === "final" ? duracionFinal : duracionPantalla);
}

function aplicarFundido(transcurrido, duracion) {
  let opacidad = 0;
  if (transcurrido < duracionFundido) {
    opacidad = map(transcurrido, 0, duracionFundido, 255, 0);
  } else if (transcurrido > duracion - duracionFundido) {
    opacidad = map(transcurrido, duracion - duracionFundido, duracion, 0, 255);
  }
  if (opacidad > 0) {
    noStroke();
    fill(0, opacidad);
    rect(0, 0, width, height);
  }
}

function dibujarImagen(img, indice = -1) {
  if (!img || img.width === 0 || img.height === 0) return;

  const escala = max(width / img.width, height / img.height);
  const anchoRecorte = width / escala;
  const altoRecorte = height / escala;
  const xRecorte = (img.width - anchoRecorte) / 2;
  let yRecorte = (img.height - altoRecorte) / 2;
  if (indice === 6) yRecorte = 0;
  image(img, 0, 0, width, height, xRecorte, yRecorte, anchoRecorte, altoRecorte);
}

function mostrarTexto(pantalla, numero, esEleccion) {
  const altoPanel = esEleccion ? 140 : 105;
  const yPanel = height - altoPanel;

  noStroke();
  fill(0, 0, 0, 195);
  rect(0, yPanel, width, altoPanel);

  fill(230, 190, 115);
  textAlign(RIGHT, TOP);
  textSize(14);
  text(numero + " / 15", width - 24, yPanel + 12);

  fill(255);
  textAlign(LEFT, TOP);
  textSize(20);
  text(pantalla.titulo, 28, yPanel + 12, width - 100, 28);

  textSize(16);
  text(pantalla.texto, 28, yPanel + 43, width - 56, esEleccion ? 42 : 48);
}

function dibujarCreditos() {
  background(0);
  dibujarImagen(imagenes[14]);
  fill(0, 0, 0, 210);
  rect(0, 0, width, height);

  const espacio = 48;
  const yInicial = height + 20 - (millis() - tiempoCreditos) * 0.045;
  textAlign(CENTER, CENTER);
  noStroke();

  for (let i = 0; i < creditos.length; i++) {
    fill(i === 0 ? color(230, 190, 115) : color(255));
    textSize(i === 0 ? 30 : 19);
    text(creditos[i], 40, yInicial + i * espacio, width - 80, 40);
  }

  if (yInicial + creditos.length * espacio < -30) tiempoCreditos = millis();
}

function dibujarBoton(x, y, ancho, alto, etiqueta) {
  noStroke();
  fill(0, 0, 0, 210);
  rect(x, y, ancho, alto, 7);
  fill(255, 238, 205);
  textAlign(CENTER, CENTER);
  textSize(12);
  text(etiqueta, x + ancho / 2, y + alto / 2);
}

function sobreBoton(x, y, ancho, alto) {
  return mouseX >= x && mouseX <= x + ancho && mouseY >= y && mouseY <= y + alto;
}

function mousePressed() {
  if (sobreBoton(width - 160, 16, 142, 34)) {
    alternarSonido();
    return false;
  }

  if ((modo === "final" || modo === "creditos") && sobreBoton(18, 16, 120, 34)) {
    reiniciarHistoria();
    return false;
  }

  if (modo === "creditos") return false;

  if (modo === "eleccion") {
    if (sobreBoton(250, height - 46, 140, 34)) elegirFinal(14);
    if (sobreBoton(410, height - 46, 140, 34)) elegirFinal(13);
  }
}

function elegirFinal(indiceFinal) {
  indiceActual = indiceFinal;
  modo = "final";
  tiempoInicioPantalla = millis();
}

function iniciarCreditos() {
  modo = "creditos";
  tiempoCreditos = millis();
}

function reiniciarHistoria() {
  modo = "historia";
  indiceActual = 0;
  tiempoInicioPantalla = millis();
}

function etiquetaSonido() {
  return sonidoActivo ? "SONIDO: ACTIVADO" : "SONIDO: DESACTIVADO";
}

function alternarSonido() {
  if (!musica || !musica.isLoaded()) return;

  sonidoActivo = !sonidoActivo;
  if (sonidoActivo) {
    userStartAudio();
    musica.setVolume(0.25);
    musica.loop();
  } else {
    musica.stop();
  }
}




