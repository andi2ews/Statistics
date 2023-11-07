avviaBtn.addEventListener("click", function() {
    const M = parseInt(document.getElementById("numeroSistemi").value);
    const T = parseInt(document.getElementById("Time").value);
    const N = parseInt(document.getElementById("Interval").value);
    const p = 0.5;
    const lambda = p * N / T;

    //console.log("M : " + M);
    //console.log("T : " + T);
    //console.log("N : " + N);
    //console.log("T/N : " + T/N);
    //console.log("lambda : " + lambda);
    //console.log("p : " + p);
    
    //console.log(lambda * (T/N));

    const rettangolo = new ResizableRectangle(T + T/2, 400);

    rettangolo.DrawChart(M, T, N, p);
    //rettangolo2.DrawChart(systems.systems, 'frequency');
  });

