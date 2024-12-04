async function uploadImage(event) {
	event.preventDefault();
	try {
		const response = await fetch('/upload', {
			method: 'POST',
			body: new FormData(event.target)
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
		})
	} catch (err) {
		console.error(err);
	}
}

function handleUpload(event) {
	console.log(event);
}

function handleFileChange(event) {
	const file = event.target.files[0]; // Get the selected file
	console.log(event);
	console.log(event.target);
	console.log(event.target.files);
	if (file) {
		console.log(`File selected: ${file.name}`);
	} else {
		console.log('No file selected.');
	}
}