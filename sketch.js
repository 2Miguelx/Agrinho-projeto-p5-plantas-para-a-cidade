let plantas = [];
let predios = [];
let maxPredios = 20;
let prediosNaCidade = 0;

function setup() {
  createCanvas(800, 400);
  noStroke();
  // Gerar plantas no campo
  for (let i = 0; i < 10; i++) {
    plantas.push({
      x: random(50, width / 2 - 50),
      y: random(100, height - 50),
      coletada: false
    });
  }
}

function draw() {
  // Fundo com gradiente suave
  background(100, 150, 200);

  // Tela dividida com cores suaves
  fill(144, 238, 144);
  rect(0, 0, width/2, height);
  fill(0, 102, 153);
  rect(width/2, 0, width/2, height);

  // Texto estilizado
  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Campo", width/4, 30);
  text("Cidade", 3*width/4, 30);

  // Desenhar plantas com detalhes
  fill(34, 139, 34);
  let plantasNoCampo = 0;
  for (let p of plantas) {
    if (!p.coletada) {
      ellipse(p.x, p.y, 15, 15);
      plantasNoCampo++;
    }
  }

  // Gerar prédios com alturas variadas na cidade
  while (predios.length < prediosNaCidade) {
    let novoX = random(width/2 + 20, width - 20);
    if (!predios.some(p => abs(p.x - novoX) < 12)) {
      let altura = random(50, 120); // altura variável
      predios.push({x: novoX, y: height - altura, altura: altura});
    }
  }

  // Desenhar prédios com tamanhos diferentes
  fill(128);
  for (let p of predios) {
    rect(p.x, p.y, 10, p.altura);
    //Adicionar janelas ou detalhes
    fill(250);
    for (let i = 0; i < p.altura; i += 10) {
      rect(p.x + 2, p.y + i + 1, 6, 4);
    }
    fill(128);
  }

  // Mostrar quantidade de plantas e prédios
  fill(0);
  textSize(14);
  noStroke();
  text("Plantas no campo: " + (10 - plantas.filter(p => p.coletada).length), 130, 40);
  text("Prédios na cidade: " + predios.length, width - 150, 40);
}

function mouseClicked() {
  // Transformar planta em prédio com altura aleatória
  for (let p of plantas) {
    if (!p.coletada && dist(mouseX, mouseY, p.x, p.y) < 10 && mouseX < width/2) {
      p.coletada = true;
      // Adiciona um prédio com altura aleatória
      let novoX = random(width/2 + 20, width - 20);
      let altura = random(50, 120);
      predios.push({x: novoX, y: height - altura, altura: altura});
    }
  }
}