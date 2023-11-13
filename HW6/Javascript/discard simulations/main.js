avviaBtn.addEventListener("click", function() {
    const systems = document.getElementById('systems').value;
    const attacks = document.getElementById('attacks').value;
    const prob = document.getElementById('p').value;

    const P = 60
    const S = 60
    const rettangolo = new ResizableRectangle(400, 350);

    rettangolo.DrawChart(systems, attacks, prob, P, S);
  });

