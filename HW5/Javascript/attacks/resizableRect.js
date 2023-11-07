class ResizableRectangle {

  constructor(larghezza, altezza) {
    this.element = document.createElement("div");
    this.element.classList.add("resizable-rectangle");
    this.element.style.width = larghezza + "px";
    this.element.style.height = altezza + "px";
    this.element.style.border = "1px solid black"; // Imposta una cornice nera
    document.body.appendChild(this.element);
    
    this.isDragging = false;
    this.initialX = 0;
    this.initialY = 0;

    // Aggiunta di un elemento canvas per il disegno
    this.canvas = document.createElement("canvas");
    this.canvas.width = larghezza;
    this.canvas.height = altezza;
    this.canvas.style.position = "absolute";
    this.element.appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");

    this.element.addEventListener("mousedown", (e) => this.iniziaTrascinamento(e));
    document.addEventListener("mousemove", (e) => this.trascina(e));
    document.addEventListener("mouseup", () => this.terminaTrascinamento());
  }


  iniziaTrascinamento(e) {
    this.isDragging = true;
    const rect = this.element.getBoundingClientRect();
    this.initialX = e.clientX - rect.left;
    this.initialY = e.clientY - rect.top;
    this.element.style.cursor = "grabbing";
  }

  trascina(e) {
    if (this.isDragging) {
      const x = e.clientX - this.initialX;
      const y = e.clientY - this.initialY;
      this.element.style.left = x + "px";
      this.element.style.top = y + "px";
    }
  }

  terminaTrascinamento() {
    this.isDragging = false;
    this.element.style.cursor = "move";
  }


  getScore(attacks, type) {
    let score = [];
    let prova = {};
    for (let i = 0; i < attacks.length; i++) {
      let sum = 0;
      switch(type) {
        case 'score':
          sum = attacks[i].reduce((a, b) => a + b, 0);
          score.push(sum);
          sum in prova ? prova[sum] += 1 : prova[sum] = 1;
          break;
        case 'frequency':
          sum = attacks[i].filter(x => x === -1).length
          score.push(sum);
          sum in prova ? prova[sum] += 1 : prova[sum] = 1;
          break;
        default:
          break;
      }
    }
    console.log(prova);
    //return score;
    return prova;
  }

  DrawHistogramArea(height, len) {
    this.context.beginPath();
    this.context.moveTo(len, 0); 
    this.context.lineTo(len, height);
    this.context.stroke();
    this.context.closePath();
  }


  DrawChart(systems, time, intervals, p) {
    console.log("number of systems : " + systems);
    console.log("Time T: " + time);
    console.log("N : " + intervals);
    console.log("probability : " + p);

    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;

    //this.DrawHistogramArea(canvasHeight, time);
    //this.DrawHistogramArea(canvasHeight, time/2);

    let systems_color = [];
    for (let i = 0; i < systems; i++) {
      systems_color.push(getRandomColor());
    }

    //this.context.lineWidth = 1;

    for (let i = 0; i < systems; i++) {
      let y = canvasHeight;   // Inizializza y al centro del rettangolo
      this.context.strokeStyle = systems_color[i];
      this.context.beginPath();
      this.context.moveTo(i * 10, y);
      this.context.lineTo(i * 10, 0);
      this.context.stroke();
      this.context.closePath();

      for (let j = 0; j < intervals; j++) {
        let random = Math.random().toFixed(2);
        //console.log(random <= p);
      }
    }
  }
  
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}