class SortedList {

    constructor() {
        this.list = [];
    }

    insert(n) {
        for (let i= 0; i < this.list.length; i++) {
            if (n < this.list[i]) {
                this.list.splice(i, 0, n);
                return 0;
            }
        }
        this.list.push(n);
    }

    remove(n) {
        let index = this.list.indexOf(n);
        if (index !== -1) {
            this.list.splice(index, 1);
        }
    }

    get(index) {
        if (index >= this.list.length) {
            return 'index out of boundz';
        }
        return this.list[index];
    }

    // set function doesnt exist for Sorted List

    isPresent(value) {
        return this.list.includes(value);
    }
}

var sortedList = new SortedList();
sortedList.insert(10);
sortedList.insert(20);
sortedList.insert(7);
sortedList.insert(12);
sortedList.insert(21);
sortedList.insert(99);
sortedList.insert(15);
sortedList.insert(4);
sortedList.insert(77);
sortedList.insert(3);

console.log(sortedList);

sortedList.remove(200);
sortedList.remove(77);
sortedList.remove(3);
console.log(sortedList);

console.log(sortedList);
console.log(sortedList.isPresent(200));

sortedList.list.forEach((n => {
    console.log(n);
}))

