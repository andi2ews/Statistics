avviaBtn.addEventListener("click", function() {
    const numeroSistemi = parseInt(document.getElementById("numeroSistemi").value);
    const numeroAttacchi = parseInt(document.getElementById("numeroAttacchi").value);

    console.log("numero sistemi : " + numeroSistemi);
    console.log("numero attacchi : " + numeroAttacchi);
    

    const systems = new Systems(numeroSistemi, numeroAttacchi);
    systems.generateAttacks();

    const rettangolo = new ResizableRectangle(numeroAttacchi + 100, 400);
    const rettangolo2 = new ResizableRectangle(numeroAttacchi + 100, 300);

    rettangolo.DrawChart(systems.systems, 'score');
    rettangolo2.DrawChart(systems.systems, 'frequency');
  });

