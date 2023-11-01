function readCSV(csvString) {
    let arrObj = [];
    let lines = csvString.split('\n');
    let headers = lines[0].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    for (let i = 1; i < lines.length; i++) {

        let rowData = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        arrObj[i] = {};

        for (let j = 0; j < rowData.length; j++) {
            arrObj[i][headers[j]] = rowData[j];
        }
    }
    return arrObj;
}



let csvFile = document.getElementById('csv');
let output = document.getElementById('outputBox');

csvFile.addEventListener('change', () => {
    let survey;
    let fileReader = new FileReader();

    fileReader.readAsText(csvFile.files[0]);

    fileReader.onload = function() {
        survey = readCSV(fileReader.result);

        let attributes = ['height', 'weight', 'Age'];
        let intervals = [
            [[0.0, 1.0], [1.0, 1.50], [1.50, 1.60], [1.60, 1.70], [1.70, 1.80], [1.80, 1.90], [1.90, 2.0], [2.0, 300]], //height
            [[0, 50], [50, 60], [60,  70], [70, 80], [80, 90], [90, 101],], //weight
            [[0, 20], [20, 25], [25, 30], [30, 100]] //age
        ];

        getVariableFrequency(survey, 'Sports');
        multivariateDistribution(survey, attributes);
        multivariateContinous(survey, attributes, intervals);
        
    }
})


function getVariableFrequency(survey, variable) {
    let table = [];
    let frequencies = {};
    for (let i = 1; i < survey.length; i++) {
        value = survey[i][variable];
        value in frequencies ? 
            frequencies[value] = frequencies[value] + 1 : frequencies[value] = 1;
    }
    for (const [key, value] of Object.entries(frequencies)) {
        row = {};
        row['value'] = key;
        row['frequency'] = value;
        row['relative frequency'] = (value / (survey.length - 1)).toFixed(3);
        row['percentage frequency'] = (row['relative frequency'] * 100).toFixed(1) + '%';
        table.push(row);
    }

     table.sort((a, b) => {
        const valueA = a.value;
        const valueB = b.value;

        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
    });
    console.table(table);
    return table;
}



function multivariateDistribution(survey, attributes) {
    if (attributes.length < 2) {
      throw new Error("La funzione richiede almeno due attributi.");
    }
    let joinTable = [];
    let joinFrequencies = {};
  
    survey.forEach(row => {
        const str = attributes.map(attribute => row[attribute]).join(" ");
        str in joinFrequencies ? joinFrequencies[str] += 1 : joinFrequencies[str] = 1;
    });
    for (const row in joinFrequencies) {
        let strings = row.split(' ');
        entry = {};
        for (let i = 0; i < attributes.length; i++) {
            const attr = attributes[i];
            const value = strings[i];
            entry['attribute' + i] = attr;
            entry['value' + i] = value;
        }
        let value = joinFrequencies[row];
        entry['frequency'] = value;
        entry['relative frequency'] = (value / (survey.length - 1)).toFixed(3);
        entry['percentage frequency'] = (entry['relative frequency'] * 100).toFixed(1) + '%';
        joinTable.push(entry);
        
    }
    console.table(joinTable);
    return joinTable;
}


function multivariateContinous(survey, attributes, intervals) {
    if (attributes.length !== intervals.length) {
      throw new Error("La lista di attributi e la lista di intervalli devono avere la stessa dimensione.");
    }
  
    const table = [];
    const risultato = {};

    for (const row in survey) {
        let str = '';
      for (let i = 0; i < attributes.length; i++) {
        const attributo = attributes[i];
        const intervalliAttributo = intervals[i];
        
        for (const intervallo of intervalliAttributo) {
          const [inizio, fine] = intervallo;
          const chiave = `${attributo} [${inizio}-${fine})`;

          if (survey[row][attributo] >= inizio && survey[row][attributo] < fine) {
            str = str.concat(`${chiave}:`);
            break;
          }
          
        }
        
      }
      str in risultato ? risultato[str] += 1 : risultato[str] = 1;
    }

    for (const row in risultato) {
        let strings = row.split(':');
        entry = {};
        for (let i = 0; i < attributes.length; i++) {
            const [attr, inter] = strings[i].split(' ');
            entry['attribute' + i] = attr;
            entry['interval' + i] = inter;
        }
        let value = risultato[row];
        entry['frequency'] = value;
        entry['relative frequency'] = (value / (survey.length - 1)).toFixed(3);
        entry['percentage frequency'] = (entry['relative frequency'] * 100).toFixed(1) + '%';
        table.push(entry);
        
    }
    console.table(table);
    return table;
}



