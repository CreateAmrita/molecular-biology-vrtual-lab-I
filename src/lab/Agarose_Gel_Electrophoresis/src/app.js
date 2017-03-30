if(navigator.serviceWorker) {
	navigator
		.serviceWorker
		.register('./.././Agarose_Gel_Electrophoresis/service_worker_Agarose_Gel_Electrophoresis.js')
		.then(function(r) {
			console.log('NW  App now available offline');
		})
		.catch(function(e) {
			console.log('NW App NOT available offline');
			console.log(e);
		});
} else {
	console.log('Service workers are not supported');
}
