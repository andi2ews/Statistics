const rettangolo= new ResizableRectangle(window.screen.width * 0.9, window.screen.height * 0.6);
rettangolo.clear();


button.addEventListener("click", function() {
    const time = parseInt(document.getElementById("time").value);
    const N = parseInt(document.getElementById("intervals").value);
    const time_step = time / N;
    const simulations = parseInt(document.getElementById("simulations").value);
    const initial_value = parseFloat(document.getElementById("initial_value").value);
    const mu = parseFloat(document.getElementById("mu").value);
    let sigma = parseFloat(document.getElementById("sigma").value);
    const theta = parseFloat(document.getElementById("theta").value);
    const a = parseInt(document.getElementById("a").value);
    const b = parseInt(document.getElementById("b").value);
    const sde = document.getElementById("sde").value;

    /*
    console.log("time : " + time);
    console.log("N : " + N);
    console.log("time step : " + time_step);
    console.log("simulations : " + simulations);
    console.log("initial_value : " + initial_value);
    console.log("mu : " + mu);
    console.log("sigma : " + sigma);
    console.log("theta : " + theta);
    console.log("a : " + a);
    console.log("b : " + b);
    console.log("sde : " + sde);
    */
    

    let [results, max_distance] = simulateSDE(time, N, time_step, simulations, initial_value, mu, sigma, theta, a, b, sde);
    rettangolo.DrawChart(N, simulations, results, max_distance);
    //console.log(results);
    //console.log(max_distance);
  });

  

  function simulateSDE(time, N, time_step, simulations, initial_value, mu, sigma, theta, a, b, sde) {
    let final = [];
    let max_distance = 0;
    for (let s = 0; s < simulations; s++) {
      let t = 0;
      let current_value = initial_value;
      let results = [{ t: t, value: current_value, increment: 0 }];

      for (let i = 1; i <= N; i++) {
        let dWt = Math.sqrt(time_step) * Math.random();
        let increment;
  
        switch(sde) {
          case SDE.Cox_Ingersoll_Ross:
            increment = (a * (b - current_value) * time_step) + sigma * Math.sqrt(current_value) * dWt;
            break;
          
          case SDE.Geometric_Brownian:
            increment = mu * current_value * time_step + sigma * current_value * dWt;
            //increment = (mu - sigma**2 / 2) * time_step + sigma * dWt;
            break;
          
          case SDE.Hull_White:
            increment = (theta - a * current_value) * time_step + sigma * dWt;
            break;
          
          case SDE.Ornstein_Uhlenbeck:
            //increment = theta * (mu - current_value) * time_step + sigma * dWt;
            increment = theta * (-1) * current_value * time_step + sigma * dWt;
            break;
          
          case SDE.Vasicek:
            increment = a * (b - current_value) * time_step + sigma * dWt;
            break;
  
          default:
            break;
        }
  
        t = time_step * i;
        current_value += increment;
        max_distance = Math.abs(current_value - initial_value) > max_distance ? Math.abs(current_value - initial_value) : max_distance;
        results.push({ t: t, value: current_value, increment: increment });
      }

      final.push(results);
    }
    
    return [final,max_distance];
   }
   