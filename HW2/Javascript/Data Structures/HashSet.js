const set = new Set();

set.add(1); set.add(2); set.add(3);
set.delete(3);

// there is no get and set in Set

console.log(set.has(10));
console.log(set.has(1));

let size = set.size;

for (const item of set) {
    console.log(item);
    if (item === 1) {
        continue
    }
    else {
        console.log('break');
        break;
    }
}

console.log(set);