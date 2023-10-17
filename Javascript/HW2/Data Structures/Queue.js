class Queue {

    constructor() {
        this.queue = [];
    }

    insert(n) {
        this.queue.push(n);
    }

    extract() {
        if (this.queue.length > 0) {
            return this.queue.shift();
        }
    }

    has(n) {
        return this.queue.includes(n);
    }


    print() {
        console.log(this.queue);
    }

}


const queue = new Queue();
queue.insert(1);queue.insert(2);queue.insert(3);queue.insert(4);
console.log(queue.extract()); 
queue.print();