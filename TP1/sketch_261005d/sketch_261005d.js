let imagenes = [];
//let musica;

const duracionPantalla = 5000; // 5 segundos

// Arreglo con los nombres de las imágenes y el texto de cada pantalla.
const pantallas = [
  {
    archivo: "WhatsApp Image 2026-09-28 at 18.08.03.jpeg",
    titulo: "LONDRES, 1890",
    texto: "Entre la niebla y las luces de gas, Londres guarda secretos que nadie se atreve a revelar."
  },
  {
    archivo: "WhatsApp Image 2026-09-28 at 18.08.03 (1).jpeg",
    titulo: "LA CARTA MISTERIOSA",
    texto: "El doctor Jekyll encontró una carta inquietante. Alguien llamado Hyde aparecía ligado a su nombre."
  },
  {
    archivo: "WhatsApp Image 2026-09-28 at 18.08.03 (2).jpeg",
    titulo: "LA PUERTA CERRADA",
    texto: "En una calle oscura, una puerta vieja escondía la entrada a un misterio."
  },
  {
    archivo: "WhatsApp Image 2026-09-28 at 18.08.04 (1).jpeg",
    titulo: "UNA INVESTIGACIÓN COMIENZA",
    texto: "Jekyll revisó cada pista. Cuanto más leía, más difícil era apartar sus pensamientos de Hyde."
  },
  {
    archivo: "WhatsApp Image 2026-09-28 at 18.08.04 (2).jpeg",
    titulo: "LA APARICIÓN DE HYDE",
    texto: "Una figura cruzó la niebla. Su presencia bastó para helar la noche."
  },
  {
    archivo: "WhatsApp Image 2026-09-28 at 18.08.04 (3).jpeg",
    titulo: "EL DOCTOR JEKYLL",
    texto: "Durante el día, el doctor intentaba conservar la calma y seguir con su vida."
  },
  {
    archivo: "WhatsApp Image 2026-09-28 at 18.08.04.jpeg",
    titulo: "EL OTRO LADO",
    texto: "Pero al caer la noche, Hyde volvía a aparecer. Cada vez parecía más fuerte."
  },
  {
    archivo: "WhatsApp Image 2026-09-28 at 18.08.05 (1).jpeg",
    titulo: "EL EXPERIMENTO",
    texto: "Jekyll preparó una pócima convencido de que podía separar sus impulsos más oscuros."
  },
  {
    archivo: "WhatsApp Image 2026-09-28 at 18.08.05 (2).jpeg",
    titulo: "LA PERSECUCIÓN",
    texto: "Hyde huyó por las calles vacías. La niebla lo ocultó antes de que pudieran alcanzarlo."
  },
  {
    archivo: "WhatsApp Image 2026-09-28 at 18.08.05.jpeg",
    titulo: "EL LABORATORIO",
    texto: "Entre frascos y humo, el experimento seguía activo. Algo había cambiado para siempre."
  },
  {
    archivo: "WhatsApp Image 2026-09-28 at 18.08.06 (1).jpeg",
    titulo: "DOS SOMBRAS",
    texto: "Detrás del vidrio, dos siluetas se enfrentaron: una luchaba por resistir; la otra quería salir."
  },
  {
    archivo: "WhatsApp Image 2026-09-28 at 18.08.06 (2).jpeg",
    titulo: "FRENTE AL ESPEJO",
    texto: "Jekyll buscó su propio reflejo, pero ya no estaba seguro de quién lo miraba."
  },
  {
    archivo: "WhatsApp Image 2026-09-28 at 18.08.06 (3).jpeg",
    titulo: "LA TRANSFORMACIÓN",
    texto: "La noche cayó sobre Londres. Hyde tomó el control y salió a la calle."
  },
  {
    archivo: "WhatsApp Image 2026-09-28 at 18.08.06.jpeg",
    titulo: "EL DOMINIO DE HYDE",
    texto: "Jekyll comprendió que ya no podía controlar la transformación. Hyde se había vuelto más poderoso."
  },
  {
    archivo: "WhatsApp Image 2026-09-28 at 18.08.07.jpeg",
    titulo: "EL AMANECER",
    texto: "Cuando salió el sol, Londres volvió a despertar. Pero el secreto del doctor quedó para siempre entre sus calles."
  }
];

function preload() {
  // Carga las imágenes usando los nombres guardados en el arreglo.
  for (let i = 0; i < pantallas.length; i++) {
    imagenes[i] = loadImage(pantallas[i].archivo);
  }

  // Carga la música.
  musica = loadSound("musica.mp3");
}

function setup() {
  createCanvas(800, 450);
  textFont("Georgia");
}

function draw() {
  background(0);

  // Calcula qué pantalla mostrar según el tiempo transcurrido.
  let indice = floor(millis() / duracionPantalla);

  // Al terminar las 15 pantallas, mantiene la última en pantalla.
  indice = min(indice, pantallas.length - 1);

  dibujarImagenCompleta(imagenes[indice]);
  mostrarTexto(pantallas[indice].titulo, pantallas[indice].texto);
}

// Dibuja la imagen ocupando todo el canvas, sin deformarla.
function dibujarImagenCompleta(img) {
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

// Muestra el título y la narración de la pantalla actual.
function mostrarTexto(titulo, texto) {
  noStroke();
  fill(0, 0, 0, 190);
  rect(0, height - 105, width, 105);

  fill(230, 190, 115);
  textAlign(LEFT, TOP);
  textSize(20);
  text(titulo, 28, height - 88);

  fill(255);
  textSize(16);
  text(texto, 28, height - 55, width - 56, 45);
}

// El navegador necesita un clic o una tecla para permitir iniciar el audio.
function mousePressed() {
  iniciarMusica();
}

function keyPressed() {
  iniciarMusica();
}

// Inicia la música una sola vez.
//function iniciarMusica() {
  if (musica && !musica.isPlaying()) {
    musica.setVolume(0.35);
    musica.loop();
  }
}
