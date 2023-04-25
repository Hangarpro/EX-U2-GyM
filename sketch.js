var w = window.innerWidth;
var h = window.innerHeight;  

function setup() {
  createCanvas(w, h);
  circle1 = width / 4;
  circle2 = width / 2;
  circle3 = (width / 4) * 3;
  aux = height / 2;
  r = 150;
}

function draw() {
  background(220);
  stroke("#FFFFFF");
  strokeWeight(2);

  let texto = "Punto Pendiente";
  textSize(24);
  textAlign(CENTER, CENTER);
  text(texto, width / 4, height / 1.38);
  circuloPuntoMedio(circle1, aux, r);

  let texto2 = "DDA";
  textSize(24);
  textAlign(CENTER, CENTER);
  text(texto2, width / 2, height / 1.38);
  circuloPuntoMedio(circle2, aux, r);

  let texto3 = "Bresenham";
  textSize(24);
  textAlign(CENTER, CENTER);
  text(texto3, width / 1.32, height / 1.38);
  circuloPuntoMedio(circle3, aux, r);

  n = parseInt(prompt("¿En cuántas lineas se dividirá la pizza?: "));
  angle = (2 * PI) / n;

  for (let i = 0; i < n; i++) {
    let lineX = circle1 + r * cos(i * angle);
    let lineY = aux + r * sin(i * angle);
    pointA = new punto(circle1, aux);
    pointB = new punto(lineX, lineY);
    drawPuntos(puntoPendiente(pointA, pointB));
  }
  for (let i = 0; i < n; i++) {
    let lineX = circle2 + r * cos(i * angle);
    let lineY = aux + r * sin(i * angle);
    pointA = new punto(circle2, aux);
    pointB = new punto(lineX, lineY);
    dda(pointA, pointB);
  }
  for (let i = 0; i < n; i++) {
    let lineX = circle3 + r * cos(i * angle);
    let lineY = aux + r * sin(i * angle);
    pointA = new punto(circle3, aux);
    pointB = new punto(lineX, lineY);
    bresenham(pointA, pointB);
  }

  noLoop();
}

function circuloPuntoMedio(x, y, radio) {
  let xAux = 0;
  let yAux = radio;
  let d = 1 - radio;

  while (xAux <= yAux) {
    point(x + xAux, y + yAux);
    point(x + yAux, y + xAux);
    point(x - xAux, y + yAux);
    point(x - yAux, y + xAux);
    point(x + xAux, y - yAux);
    point(x + yAux, y - xAux);
    point(x - xAux, y - yAux);
    point(x - yAux, y - xAux);

    if (d < 0) {
      d += 2 * xAux + 3;
    } else {
      d += 2 * (xAux - yAux) + 5;
      yAux--;
    }
    xAux++;
  }
}

function puntoPendiente(point1, point2) {
  puntos = [];
  plusX = 0;

  if (point1.x > point2.x) {
    plusX = -1;
  } else if (point1.x < point2.x) {
    plusX = 1;
  }

  if (point1.x === point2.x) {
    x = point1.x;

    if (point1.y > point2.y) {
      plusY = -1;
    } else {
      plusY = 1;
    }

    if (plusY == 1) {
      for (let y = point1.y; y < point2.y; y += plusY) {
        puntos.push(new punto(x, y));
      }
    } else {
      for (let y = point1.y; y > point2.y; y += plusY) {
        puntos.push(new punto(x, y));
      }
    }
  } else {
    m = (point2.y - point1.y) / (point2.x - point1.x);
    b = point1.y - m * point1.x;
    if (plusX == 1) {
      for (let x = point1.x; x < point2.x; x += plusX) {
        y = m * x + b;
        puntos.push(new punto(x, y));
      }
    } else {
      for (let x = point1.x; x > point2.x; x += plusX) {
        y = m * x + b;
        puntos.push(new punto(x, y));
      }
    }
  }
  return puntos;
}

function drawPuntos(puntos) {
  for (let punto of puntos) {
    punto.draw();
    print(punto.x);
  }
}

function dda(point1, point2) {
  let dx = point2.x - point1.x;
  let dy = point2.y - point1.y;
  let pasos = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
  let plusX = dx / pasos;
  let m = dy / pasos;
  let x = point1.x;
  let y = point1.y;

  for (let i = 0; i <= pasos; i++) {
    point(x, y);
    x += plusX;
    y += m;
  }
}

function bresenham(point1, point2) {
  let dx = abs(point2.x - point1.x);
  let dy = abs(point2.y - point1.y);
  let plusX = point1.x < point2.x ? 1 : -1;
  let plusY = point1.y < point2.y ? 1 : -1;
  let err = dx - dy;

  if (plusX == 1) {
    if (plusY == 1) {
      while (point1.x <= point2.x && point1.y <= point2.y) {
        point(point1.x, point1.y);
        let e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          point1.x += plusX;
        }
        if (e2 < dx) {
          err += dx;
          point1.y += plusY;
        }
      }
    } else if (plusY == -1) {
      while (point1.x <= point2.x && point1.y >= point2.y) {
        point(point1.x, point1.y);
        let e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          point1.x += plusX;
        }
        if (e2 < dx) {
          err += dx;
          point1.y += plusY;
        }
      }
    }
  } else if (plusX == -1) {
    if (plusY == 1) {
      while (point1.x >= point2.x && point1.y <= point2.y) {
        point(point1.x, point1.y);
        let e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          point1.x += plusX;
        }
        if (e2 < dx) {
          err += dx;
          point1.y += plusY;
        }
      }
    } else if (plusY == -1) {
      while (point1.x >= point2.x && point1.y >= point2.y) {
        point(point1.x, point1.y);
        let e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          point1.x += plusX;
        }
        if (e2 < dx) {
          err += dx;
          point1.y += plusY;
        }
      }
    }
  }
}

class punto {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    stroke("#FFFFFF");
    point(this.x, this.y);
  }
}
