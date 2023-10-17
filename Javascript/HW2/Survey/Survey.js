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
    //console.table(arrObj);
    return arrObj;
}

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
    console.table(table);
    
}

function getVariableContinousFrequency(survey, variable, intervals) {
    let table = [];
    for (let i = 1; i < survey.length; i++) {
        value = parseFloat(survey[i][variable]);
        if (isNaN(value)) {
            intervals['blank'] += 1;
            continue;
        }
        for (const interval in intervals) {
            if (value >= parseFloat(interval.substring(0, 4)) & 
                value < parseFloat(interval.substring(6, 11))) {
                    intervals[interval] += 1;
                    break;
            }
        }
    }
    for (const [key, value] of Object.entries(intervals)) {
        row = {};
        row['interval'] = key;
        row['frequency'] = value;
        row['relative frequency'] = (value / (survey.length - 1)).toFixed(3);
        row['percentage frequency'] = (row['relative frequency'] * 100).toFixed(1) + '%';
        table.push(row);
    }
    console.table(table);
    
}

function getBivariateDistribution(survey, var1, var2) {
    let joinTable = [];
    let joinFrequencies = {};
    for (const row in survey) {
        let value1 = survey[row][var1];
        let value2 = survey[row][var2];
        let str = '' + value1 + ' : ' + value2;
        console.log(str);
        str in joinFrequencies ? joinFrequencies[str] += 1 : joinFrequencies[str] = 1;
    }
    for (const [key, value] of Object.entries(joinFrequencies)) {
        row = {};
        row['Age | Sex'] = key;
        row['Joint frequency'] = value;
        row['Joint relative frequency'] = (value / (survey.length - 1)).toFixed(3);
        row['Joint percentage frequency'] = (row['Joint relative frequency'] * 100).toFixed(1) + '%';
        joinTable.push(row);
    }
    console.table(joinTable);
    
}

let csvFile = document.getElementById('csv');
let output = document.getElementById('outputBox');

csvFile.addEventListener('change', () => {
    let survey;
    let fileReader = new FileReader();

    fileReader.readAsText(csvFile.files[0]);

    fileReader.onload = function() {
        survey = readCSV(fileReader.result);

        
        console.log('Qualitative variable : Most recent working position');
        getVariableFrequency(survey, 'Most recent working position');
        console.log(' ');

        console.log('Quantitative discrete : Enterpreneurial attitude (0-5)');
        getVariableFrequency(survey, 'Enterpreneurial attitude (0-5)');
        console.log(' ');

        console.log('Quantitative continous : height');
        let intervals = {
            '0.0 : 0.25' : 0,
            '0.25 : 0.50' : 0,
            '0.50 : 0.75' : 0,
            '0.75 : 1.00' : 0,
            '1.00 : 1.25' : 0,
            '1.25 : 1.50' : 0,
            '1.50 : 1.75' : 0,
            '1.75 : 2.00' : 0,
            '2.00 : 2.25' : 0,
            'blank' : 0
        };
        getVariableContinousFrequency(survey, 'height', intervals);
        console.log(' ');


        console.log('Qualitative: Sex');
        getVariableFrequency(survey, 'Sex');
        console.log(' ');

        console.log('Quantitative : Age');
        getVariableFrequency(survey, 'Age');
        console.log(' ');


        console.log('Bivariate Distribution: Sex | Age');
        getBivariateDistribution(survey, 'Age', 'Sex');
        console.log(' ');

    }
})
