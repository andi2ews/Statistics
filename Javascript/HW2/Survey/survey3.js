var reader = new FileReader();
reader.onload = function(event) {
	var testo = event.target.result;
};
reader.readAsText(testo);
console.log('ciao');