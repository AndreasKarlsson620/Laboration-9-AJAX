$(document).ready(() => {

	//let key = 'DQwsy'; // API key
	let key = "Kd2MF";

	console.log('Script started.');

	// Request API key
	let requestButton = $('#requestButton');
	requestButton.on('click', event => {
		requestButton.disabled = "disabled";
		const url = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
		const settings =
		{
			method: 'GET'
		}
		let jqXHR = $.ajax(url, settings);
		jqXHR.done(requestOnSuccess).fail(requestOnFailure);
	}) // requestButton click

	// Add book to database
	let addButton = $('#addButton');
	addButton.on('click', event => {
		addButton.disabled = "disabled";
		let title = $('#title').val();
		let author = $('#author').val();
		const url = 'https://forverkliga.se/JavaScript/api/crud.php?op=insert&key=' + key + '&title=' + title + '&author=' + author;
		console.log(url);
		const settings =
		{
			method: 'GET'
		}
		let jqXHR = $.ajax(url, settings);
		jqXHR.done(addOnSuccess).fail(addOnFailure);
	}) // addButton click

	// View books in database
	let viewButton = $('#viewButton');
	viewButton.on('click', event => {
		viewButton.disabled = "disabled";
		const url = 'http://forverkliga.se/JavaScript/api/crud.php?op=select&key=' + key;
		const settings =
		{
			method: 'GET'
		}
		let jqXHR = $.ajax(url, settings);
		jqXHR.done(viewOnSuccess).fail(viewOnFailure);
	}) // viewButton click

	// Modify book in database
	let modifyButton = $('#modifyButton');
	modifyButton.on('click', event => {
		modifyButton.disabled = "disabled";
		const url = 'http://forverkliga.se/JavaScript/api/crud.php?op=update&key=' + key + '&id=' + id + '&title=' + title + '&author=' + author;
		const settings =
		{
			method: 'GET'
		}
		let jqXHR = $.ajax(url, settings);
		jqXHR.done(modifyOnSuccess).fail(modifyOnFailure);
	}) // modifyButton click

	// Delete book
	let deleteButton = $('#deleteButton');
	deleteButton.on('click', event => {
		deleteButton.disabled = "disabled";
		const url = 'http://forverkliga.se/JavaScript/api/crud.php?key=' + key + '&op=delete&id=' + id;
		const settings =
		{
			method: 'GET'
		}
		let jqXHR = $.ajax(url, settings);
		jqXHR.done(deleteOnSuccess).fail(deleteOnFailure);
	}) // deleteButton click
}); // document ready

// onSuccess: Request API key
let requestTries = 0;
function requestOnSuccess(data)
{
	console.log('AJAX onSuccess. The data string is: ', data);
	let object = JSON.parse(data);
	console.log('The object is: ', object);
	if (object.status == "success")
	{
		key = object.key;
		console.log("API key:" + key);
		$('#apiKey').html("")
		.css("background-color", "green")
		.html("API key:" + key);
	}
	else
	{
		console.log("Failed to get API key");
		$('#apikey').html("")
		.css("background-color", "red")
		.html("Failed to get API key");
		while (requestTries < 5)
		{
			requestTries++;
			makeRequestAgain();
		}
	}
	requestButton.disabled = "";
}
// makeRequestAgain: Request API key
function makeRequestAgain()
{
	const url = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
	const settings =
	{
		method: 'GET'
	}
	jqXHR = $.ajax(url, settings);
	jqXHR.done(requestOnSuccess).fail(requestOnFailure);
}
// onFailure: Request API key
function requestOnFailure(message)
{
	console.log('AJAX onFailure', message);
	requestButton.disabled = "";
}

// onSuccess: Add book to database
let addTries = 0;
function addOnSuccess(data)
{
	console.log('AJAX onSuccess. The data string is: ', data);
	let object = JSON.parse(data);
	console.log('The object is: ', object);
	if (object.status == "success")
	{
		console.log("Managed to add book to database.");
		$('#addResultDiv').html("")
		.css("background-color", "green")
		.html("Managed to add book: " + title + " by " + author + " to database.");
	}
	else
	{
		console.log("Failed to add book to database.");
		$('#addResultDiv').html("")
		.css("background-color", "red")
		.html("Failed to add book: " + title + " by " + author + " to database.");
		while (addTries < 5)
		{
			addTries++;
			makeAddAgain();
		}
	}
	addButton.disabled = "";
}
// makeAddAgain: Add book to database
function makeAddAgain()
{
	const url = 'https://forverkliga.se/JavaScript/api/crud.php?op=insert&key=' + key + '&title=' + title + '&author=' + author;
	console.log(url);
	const settings =
	{
		method: 'GET'
	}
	let jqXHR = $.ajax(url, settings);
	jqXHR.done(addOnSuccess).fail(addOnFailure);
}
// onFailure: Add book to database
function addOnFailure(message)
{
	console.log('AJAX onFailure', message);
	addButton.disabled = "";
}

// onSuccess: View books in database
let viewTries = 0;
function viewOnSuccess(data)
{
	console.log('AJAX onSuccess. The data string is: ', data);
	let object = JSON.parse(data);
	console.log('The object is: ', object);

	if (object.status == "success")
	{
		console.log("Succeeded in adding books to the web page.");
		$('#viewResultDiv').html("")
		.css("background-color", "green")
		.html("Succeeded in adding books to the web page.");
		const header = '<tr>'
			+' <th>Id</th> <th>Title</th>'
			+' <th>Author</th>'
			+' <th>Updated</th> </tr>';
		$('#resultTable').html(header);
		object.data.forEach (book => {
			console.log('object.data.foreach', book);
			let idElement = `<td>${book.id}</td>`;
			let titleElement = `<td>${book.title}</td>`;
			let authorElement = `<td>${book.author}</td>`;
			let updatedElement = `<td>${book.updated}</td>`;
			let container = $(`<tr> </tr>`);
			container.html(`${idElement} ${titleElement} ${authorElement} ${updatedElement}`);
			$('#resultTable').append(container);
		})
	}
	else
	{
		console.log("Failed to add books to the web page.");
		$('#viewResultDiv').html("")
		.css("background-color", "red")
		.html("Failed to add books to the web page.");
		while (viewTries <= 5)
		{
			viewTries++;
			makeViewAgain();
		}
	}
	viewButton.disabled = "";
}
// makeViewAgain: View books in database
function makeViewAgain()
{
	const url = 'http://forverkliga.se/JavaScript/api/crud.php?op=select&key=' + key;
	const settings =
	{
		method: 'GET'
	}
	let jqXHR = $.ajax(url, settings);
	jqXHR.done(viewOnSuccess).fail(viewOnFailure);
}
// onFailure: View books in database
function viewOnFailure(message)
{
	console.log('AJAX onFailure', message);
	viewButton.disabled = "";
}

// onSuccess: Modify book in database
let modifyTries = 0;
function modifyOnSuccess(data)
{
	console.log('AJAX onSuccess. The data string is: ', data);
	let object = JSON.parse(data);
	console.log('The object is: ', object);

	if (object.status == "success")
	{
		console.log("Succeeded in modifying book in database.");
		$('#modifyResultDiv').html("")
		.css("background-color", "green")
		.html("Succeeded in modifying book in database.");
	}
	else
	{
		console.log("Failed to modify book in database.");
		$('#modifyResultDiv').html("")
		.css("background-color", "red")
		.html("Failed to modify book in database.");
		while (modifyTries < 5)
		{
			modifyTries++;
			makeModifyAgain();
		}
	}
	modifyButton.disabled = "";
}
// makeModifyAgain: Modify book in database
function makeModifyAgain()
{
	const url = 'http://forverkliga.se/JavaScript/api/crud.php?op=update&key=' + key + '&id=' + id + '&title=' + title + '&author=' + author;
	const settings =
	{
		method: 'GET'
	}
	let jqXHR = $.ajax(url, settings);
	jqXHR.done(modifyOnSuccess).fail(modifyOnFailure);
}
// onFailure: Modify book in database
function modifyOnFailure(message)
{
	console.log('AJAX onFailure', message);
	modifyButton.disabled = "";
}

// onSuccess: Delete book
let deleteTries = 0;
function deleteOnSuccess(data)
{
	console.log('AJAX onSuccess. The data string is: ', data);
	let object = JSON.parse(data);
	console.log('The object is: ', object);
	if (object.status == "success")
	{
		console.log("Managed to delete book in database.");
		$('#deleteResultDiv').html("")
		.css("background-color", "green")
		.html("Managed to delete book in database.");
	}
	else
	{
		console.log("Failed to delete book in database.");
		$('#deleteResultDiv').html("")
		.css("background-color", "red")
		.html("Failed to delete book in database.");
		while (deleteTries < 5)
		{
			deleteTries++;
			makeDeleteAgain();
		}
	}
	deleteButton.disabled = "";
}
// makeDeleteAgain: Delete book
function makeDeleteAgain()
{
	const url = 'http://forverkliga.se/JavaScript/api/crud.php?key=' + key + '&op=delete&id=' + id;
	const settings =
	{
		method: 'GET'
	}
	let jqXHR = $.ajax(url, settings);
	jqXHR.done(deleteOnSuccess).fail(deleteOnFailure);
}
// onFailure: Delete book
function deleteOnFailure(message)
{
	console.log('AJAX onFailure', message);
	deleteButton.disabled = "";
}
