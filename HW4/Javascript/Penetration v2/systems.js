class Systems {

    constructor(number_systems, number_attacks) {
        this.systems = [];
        this.prob = [];
        for (let i = 0; i < number_systems; i++) {
            this.systems.push([]);
            for (let j = 0; j < number_attacks; j++) {
                this.systems[i].push(0);
            }
            this.prob.push(Math.random().toFixed(2));
        }
        console.log(this.prob);
    }

    generateAttacks() {
        
        for (let i = 0; i < this.systems[0].length; i++) {

            for (let j = 0; j < this.systems.length; j++) {
                let random = Math.random().toFixed(2);
                this.systems[j][i] = random <= this.prob[j] ? -1 : 1;
            }
        }
    }

  }