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

  clear() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }


  DrawHistogramArea(width, height, x_start, y_start, margin_horizontal) {
    let histogram_x_start = width / 5 * 4;
    this.context.beginPath();
    this.context.strokeStyle = "#041FB9";
    this.context.moveTo( histogram_x_start + margin_horizontal , y_start + 1); 
    this.context.lineTo(histogram_x_start + margin_horizontal, height + y_start - 1);
    this.context.stroke();
    this.context.closePath();
    return histogram_x_start = width / 5 * 4 + margin_horizontal;
  }

  DrawChart(N, simulations, results, max_distance) {
    this.clear();
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height

    const margin_vertical = 30;
    const margin_horizontal = 30;

    const rect_width = canvasWidth - (margin_horizontal*2);
    const rect_height = canvasHeight - (margin_vertical*2);

    let rect_x_start = margin_horizontal;
    let rect_x_end = canvasWidth - margin_horizontal;

    let rect_y_start = margin_vertical;
    let rect_y_end = canvasHeight - margin_vertical;


    this.context.strokeStyle= "white";
    this.context.lineWidth = 2;

    //simulation rect (contains both simulation + histogram)
    this.context.beginPath();
    this.context.rect(margin_horizontal, margin_vertical, rect_width , rect_height);
    this.context.stroke();
    this.context.closePath();

    //histogram rect (inside simulation rect)
    let histogram_x_start = this.DrawHistogramArea(rect_width, rect_height, rect_x_start, rect_y_start, margin_horizontal);
    //console.log(histogram_x_start);

    const chart_width = histogram_x_start - rect_x_start;

    const x_steps = chart_width / N;

    const x = rect_x_start;
    const y = (rect_y_end + rect_x_start ) / 2;

    //console.log(max_distance / (rect_y_end - y) );   // 1 pixel value

    const y_steps = max_distance / (rect_y_end - y);   // 1 pixel value

    
    //draw lines
    this.context.lineWidth = 1;
    for (let i = 0; i < simulations; i++) {
      this.context.strokeStyle= getRandomColor();
      this.context.beginPath();
      this.context.moveTo(x, y);
      
      let curr_y = y;
      for (let j = 0; j < N; j++) {
        let increment = results[i][j+1]['increment'];
        this.context.lineTo( x + ((j+1) * x_steps), curr_y -= (increment / y_steps));
        this.context.stroke();
      }
      this.context.closePath();
    }

    //draw histogram
    let curr_x = histogram_x_start;
    this.context.lineWidth = 2;
    let dict = {};
    const histogram_width = rect_width - histogram_x_start;
    let max_frequency = 0;
    for (let i = 0; i < simulations; i++) {
      let initial_value = results[i][0]['value'];
      let final_value = results[i][N]['value'];
      let curr_y = Math.floor(y + ((initial_value - final_value) / y_steps));
      dict[curr_y] = (dict[curr_y] || 0) + 1;
      max_frequency = dict[curr_y] > max_frequency ? dict[curr_y] : max_frequency;
    }

    let histogram_rect_size = histogram_width / max_frequency;
    this.context.fillStyle= "#F68B08";
    for (const [key, value] of Object.entries(dict)) {
      
      this.context.beginPath();
      this.context.fillRect(curr_x, key, value * histogram_rect_size, 2.5);
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