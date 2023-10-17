class Stack {

    constructor() {
        this.stack = [];
    }

    insert(n) {
        this.stack.push(n);
    }

    extract() {
        if (this.stack.length > 0) {
            return this.stack.pop();
        }
    }

    has(n) {
        return this.stack.includes(n);
    }

    print() {
        console.log(this.stack);
    }

}

const stack = new Stack();

stack.insert('A');stack.insert('B');stack.insert('C');
stack.extract();
stack.extract();
console.log(stack.has('B'));
stack.print();