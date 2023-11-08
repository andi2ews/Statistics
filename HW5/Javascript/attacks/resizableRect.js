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


  DrawHistogramArea(height, len) {
    this.context.beginPath();
    this.context.moveTo(len, 0); 
    this.context.lineTo(len, height);
    this.context.stroke();
    this.context.closePath();
  }


  DrawChart(M, time, intervals, interval_len, p) {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;

    this.DrawHistogramArea(canvasHeight, time);
    this.DrawHistogramArea(canvasHeight, time/2);

    let systems_color = [];
    for (let i = 0; i < M; i++) {
      systems_color.push(getRandomColor());
    }

    let scores = [];
    for (let i = 0; i < M; i++) {
      let score = [];
      let value = 0;
      let y = canvasHeight;   // Inizializza y al centro del rettangolo
      this.context.strokeStyle = systems_color[i];
      this.context.beginPath();
      this.context.moveTo(0, y);
      this.context.stroke();
      

      for (let j = 0; j < intervals; j++) {
        
        let random = Math.random().toFixed(2);
        
        if (random <= p) {
          value++;
          let x = (j+1) * interval_len;
          this.context.lineTo((j+1) * interval_len , y-=1);
        }
        else {
          this.context.lineTo((j+1) * interval_len , y);
        }
        score.push(value);
        this.context.stroke();
      }
      this.context.closePath();
      scores.push(score);
    }
    let tri = this.getScore(scores, time/2, interval_len);
    this.DrawHistogram(tri, canvasHeight, time/2, interval_len);

    tri = this.getScore(scores, time, interval_len);
    this.DrawHistogram(tri, canvasHeight, time, interval_len);
  }

  getScore(scores, time, interval_len) {
    let result = [];
    let index = time / interval_len;
    for (let i = 0; i < scores.length; i++) {
      result.push(scores[i][index-1]);
    }
    return result;
  }
    

  DrawHistogram(scores, height, time, interval_len) {
    let value = time / interval_len;
    let color = this.context.strokeStyle;
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 4;
    let obj = {};
    for (let i=0; i < scores.length; i++) {
      obj[scores[i]] = (obj[scores[i]] || 0) +1 ;
    }
    
    for (const [key, value] of Object.entries(obj)) {
      this.context.beginPath();
      let y;
      y = height - key;
      
      this.context.moveTo(time, y);
      this.context.lineTo(time + ( 5 * value ) , y);
      this.context.stroke();
      this.context.closePath();
    }
    this.context.strokeStyle = color;
    this.context.lineWidth = 1;
  }
  
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}