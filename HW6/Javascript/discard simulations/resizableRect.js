class ResizableRectangle {

  constructor(larghezza, altezza) {
    this.element = document.createElement("div");
    this.element.classList.add("resizable-rectangle");
    this.element.style.width = larghezza + "px";
    this.element.style.height = altezza + "px";
    this.element.style.border = "1px solid black"; 
    document.body.appendChild(this.element);
    
    this.isDragging = false;
    this.initialX = 0;
    this.initialY = 0;

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


  getScore() {
  }

  DrawGoalLine(width, height, attacks, P, S) {
    this.context.beginPath();
    this.context.strokeStyle = "red";
    this.context.fillStyle = "red";
    this.context.lineWidth = 3;
    this.context.moveTo(0, height/2 + (P*2)); 
    this.context.lineTo(attacks, height/2 + (P*2));
    this.context.fillText("P", attacks+1, height/2 + (P*2) + 10);
    this.context.stroke();
    this.context.closePath();

    this.context.beginPath();
    this.context.strokeStyle = "blue";
    this.context.fillStyle = "blue";
    this.context.lineWidth = 3;
    this.context.moveTo(0, height/2 - (S*2)); 
    this.context.lineTo(attacks, height/2 - (S*2));
    this.context.fillText("S", attacks+1, height/2 - (S*2) - 5);
    this.context.stroke();
    this.context.closePath();
  }

  DrawHistogramArea(width, height, attacks, P, S) {
    this.context.beginPath();
    this.context.strokeStyle = "black";
    this.context.moveTo(attacks, height);
    this.context.lineTo(attacks, 0);
    this.context.stroke();
    this.context.closePath();
  }

  DrawChart(systems, attacks, prob, P, S) {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    
    
    let cnt = 0;
    let maxJ= 0;

    for (let i = 0; i < systems; i++) {

      let penetration_score = 0;
      let security_score = 0;

      const penetration_color = getRandomColor();
      const security_color = getRandomColor();

      let y = canvasHeight/2;

      let Px = 0;
      let Py = y;

      let Sx = 0;
      let Sy = y;


      for (let j = 0; j < attacks; j++) {
        const random = Math.random();
        if (random <= prob) {
          penetration_score++;

          this.context.strokeStyle = penetration_color;
          this.context.beginPath();
          this.context.moveTo(Px, Py);
          this.context.lineTo(Px+=2, Py+=2);
          this.context.stroke();
          this.context.closePath();

          
          this.context.strokeStyle = security_color;
          this.context.beginPath();
          this.context.moveTo(Sx, Sy);
          this.context.lineTo(Sx+=2, Sy);
          this.context.stroke();
          this.context.closePath();
          
        }
        else {
          security_score++;
          this.context.strokeStyle = security_color;
          this.context.beginPath();
          this.context.moveTo(Sx, Sy);
          this.context.lineTo(Sx+=2, Sy-=2);
          this.context.stroke();
          this.context.closePath();
          
          this.context.strokeStyle = penetration_color;
          this.context.beginPath();
          this.context.moveTo(Px, Py);
          this.context.lineTo(Px+=2, Py);
          this.context.stroke();
          this.context.closePath();
          
        }

        if (penetration_score >= P) {
          cnt += 1;
          maxJ = maxJ < j ? j : maxJ;
          break;
        }

        else if (security_score >= S) {
          maxJ = maxJ < j ? j : maxJ;
          break;
        }
      }

    }
    this.DrawHistogramArea(canvasWidth, canvasHeight, maxJ*2, P, S);
    this.DrawGoalLine(canvasWidth, canvasHeight, maxJ*2, P, S);
    console.log(cnt);
    console.log(systems-cnt);

    this.context.beginPath();
    this.context.strokeStyle = "black";
    this.context.width = 5;
    this.context.moveTo(maxJ*2, canvasHeight/2 + (P*2));
    this.context.lineTo((maxJ*2) + (cnt*0.001), canvasHeight/2 + (P*2));

    this.context.moveTo(maxJ*2, canvasHeight/2 - (S*2));
    this.context.lineTo((maxJ*2) + ((systems - cnt)*0.001), canvasHeight/2 - (S*2));

    this.context.stroke()
    this.context.closePath();
  }
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}
