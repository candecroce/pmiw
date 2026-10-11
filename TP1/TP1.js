let framesRun = [];
let logo;
let estado = "inicio";
let contador = 0;
let posX = 0;

function setup() {
  createCanvas(800, 600);
  frameRate(60);
}

function preload() {
  // Cargar los 16 frames (tile000.png a tile015.png) desde carpeta data/split
  for (let i = 0; i < 16; i++) {
    let nombre = "data/split/tile" + nf(i, 3) + ".png"; 
    framesRun[i] = loadImage(nombre);
  }
  logo = loadImage("data/logo.webp"); // ⚡ Ajustá extensión si tu logo es PNG/JPG
}

function draw() {
  background(0);

  // Dibujar piso de ladrillos procedural
  dibujarPiso();

  switch (estado) {
    case "inicio":
      animar(framesRun, 8, width/2, height/2 - 50);
      if (frameCount > 60) estado = "correr";
      break;

    case "correr":
      animar(framesRun, 6, posX, height/2 - 50);
      posX += 4; // movimiento en eje X
      if (posX > width) estado = "logo";
      break;

    case "logo":
      let yLogo = map(contador, 0, 60, -200, height/2 - 100);
      image(logo, width/2 - logo.width/2, yLogo);
      contador++;
      if (contador > 60) estado = "fin";
      break;

    case "fin":
      textAlign(CENTER);
      fill(255);
      textSize(32);
      text("Fin de la animación", width/2, height/2);
      text("Click para reiniciar", width/2, height/2 + 50);
      break;
  }
}

// Función genérica para animar arrays de frames
function animar(arrayFrames, vel, x, y) {
  let index = floor(frameCount / vel) % arrayFrames.length;
  image(arrayFrames[index], x, y);
}

// Función que retorna un valor (ejemplo: velocidad adaptada)
function velocidadAnimacion(base, factor) {
  return base * factor;
}

// Reinicio
function mousePressed() {
  if (estado === "fin") {
    estado = "inicio";
    posX = 0;
    contador = 0;
  }
}

// Función para dibujar piso de ladrillos
function dibujarPiso() {
  let ladrilloAncho = 50;
  let ladrilloAlto = 25;
  let filas = 3; // cantidad de filas de ladrillos

  for (let fila = 0; fila < filas; fila++) {
    for (let col = 0; col < width / ladrilloAncho; col++) {
      let x = col * ladrilloAncho;
      let y = height - (fila + 1) * ladrilloAlto;

      // Desplazar filas alternadas para efecto de ladrillos
      if (fila % 2 === 1) {
        x += ladrilloAncho / 2;
      }

      fill(180, 50, 50); // rojo ladrillo
      rect(x, y, ladrilloAncho, ladrilloAlto);
      stroke(0);
      line(x, y, x, y + ladrilloAlto); // líneas verticales
    }
    // línea horizontal
    stroke(0);
    line(0, height - (fila + 1) * ladrilloAlto, width, height - (fila + 1) * ladrilloAlto);
  }
}
