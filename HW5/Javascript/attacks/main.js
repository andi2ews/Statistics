avviaBtn.addEventListener("click", function() {
    const M = parseInt(document.getElementById("numeroSistemi").value);
    const T = parseInt(document.getElementById("Time").value);
    const N = parseInt(document.getElementById("Interval").value);
    const average_attacks = parseInt(document.getElementById("lambda").value);  //numero medio di attacchi per il tempo totale
    const interval_len = T/N;
    const e = 2.71828;
    const lambda = average_attacks / N;    //numero medio di attacchi per intervallo




    // P(1) = p = e^(-λ) * λ
    const p = Math.pow(e, -lambda) * lambda; 
    

    const rettangolo = new ResizableRectangle(T + T/10, 400);
    rettangolo.DrawChart(M, T, N, interval_len, p);
  });

