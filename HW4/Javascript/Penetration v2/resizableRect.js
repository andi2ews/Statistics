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


  DrawChart(attacks, type) {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;

    let x = 0;                 // Inizializza x al centro del rettangolo
    this.context.lineWidth = 1;
    
    // set color line for all systems
    let systems_color = [];
    for (let i = 0; i < attacks.length; i++) {
      systems_color.push(getRandomColor());
    }

    //this.getScore(attacks);
    console.log(systems_color);

    this.DrawHistogramArea(canvasHeight, attacks[0].length);

    for (let i = 0; i < attacks.length; i++) {

      let y = canvasHeight;   // Inizializza y al centro del rettangolo
      this.context.strokeStyle = systems_color[i];
      this.context.beginPath();
      let frequency = 0;
      switch(type) {
        case 'score':
          y = canvasHeight / 2;
          break;
        default:
          break;
      }
      this.context.moveTo(0, y);


      for (let j = 0; j < attacks[0].length; j++) {
        switch(type) {
          case 'score':
            attacks[i][j] == 1 ? this.context.lineTo(j+1, y-=1) : this.context.lineTo(j+1, y+= 1);
            break; 
          case 'frequency':
            frequency++;
            attacks[i][j] == -1 ? this.context.lineTo(j+1, y-=1) : this.context.lineTo(j+1, y);
            break;
          case 'relative_frequency':
            let boh2;
            if (attacks[i][j] == -1) {
              frequency++;
              boh2 = (frequency / (j+1) );
            }
            this.context.lineTo(j+1, y - boh2 * 10);
            break;
          case 'ratio':
            let boh;
            if (attacks[i][j] == -1) {
              frequency++;
              boh = (frequency / (Math.sqrt(j+1)) )
            }
            this.context.lineTo(j+1, y - boh * 10);
            break;
          default:
            break;
        }
        this.context.stroke();
        
      }
      this.context.closePath();
    }

    // Draw Histogram
    let score = this.getScore(attacks, type);
    console.log('ciao');
    console.log(score);
    this.context.strokeStyle = 'red';
    for (const [key, value] of Object.entries(score)) {
      this.context.beginPath();
      let y;
      if (type === 'score')  y = ( canvasHeight / 2 ) - key;
      else y = canvasHeight - key;
      
      this.context.moveTo(attacks[0].length, y);
      this.context.lineTo(attacks[0].length + ( 10 * value ) , y);
      this.context.stroke();
      this.context.closePath();
    }


    for (let i = 0; i < score.length; i++) {
      
      this.context.beginPath();
      let y;
      if (type === 'score')  y = ( canvasHeight / 2 ) - score[i];
      else y = canvasHeight - score[i];
      
      this.context.moveTo(attacks[0].length, y);
      this.context.lineTo(attacks[0].length + 10, y);
      this.context.stroke();
      this.context.closePath();
    }
   }
  
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}