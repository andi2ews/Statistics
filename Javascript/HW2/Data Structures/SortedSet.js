class SortedSet {

    constructor() {
        this.set = new Set();
    }

    add(n) {
        let i = 0;
        for (const item of this.set) {
            if (n < item) {
                let array = Array.from(this.set);
                array.splice(i, 0, n);
                this.set = new Set(array);
                return 0;
            }
            i++;
        }
        this.set.add(n);
    }

    remove(n) {
        let index = this.list.indexOf(n);
        if (index !== -1) {
            this.list.splice(index, 1);
        }
    }

    has(value) {
        return this.list.includes(value);
    }
}

var set = new SortedSet();
set.add(10);
set.add(5);
set.add(12);
set.add(41);
set.add(25);
set.add(33);
set.add(19);
console.log(set);
