function initializeIntervals(intervals, k) {
    start = 0;
    for (let i = 1; i <= k; i++) {
        end = start + (1 / k);
        str = `[${start}, ${end})`;
        intervals[str] = [];
        start = end;
    }
}

function setInterval(intervals, k, random) {
    start = 0;
    for (let i = 1; i <= k; i++) {
        end = start + (1 / k);
        str = `[${start}, ${end})`;
        if (random >= start & random < end) {
            intervals[str].push(random);
            break;
        } 
        start = end;
    }
}


const randoms = [];
const n = 1000;
const k = 10;
const intervals = {};

initializeIntervals(intervals, k);

for (let i = 0; i < n; i++) {
    randoms.push(Math.random());
    setInterval(intervals, k, randoms[randoms.length-1]);
}

frequencies = {};
for (const value in intervals) {
    frequencies[value] = intervals[value].length
}
console.table(frequencies);