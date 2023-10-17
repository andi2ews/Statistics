let csvFile = document.getElementById('csv');
let output = document.getElementById('outputBox');

csvFile.addEventListener('change', () => {
    let fileReader = new FileReader();

    fileReader.readAsText(csvFile.files[0]);

    fileReader.onload = function() {
        let arrObj = [];
        let lines = fileReader.result.split('\n');
        let headers = lines[0].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

        for (let i = 1; i < lines.length; i++) {

            let rowData = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            arrObj[i] = {};

            for (let j = 0; j < rowData.length; j++) {
                arrObj[i][headers[j]] = rowData[j];
            }
        }
        output.innerHTML = headers;
        console.table(arrObj);
    }
})