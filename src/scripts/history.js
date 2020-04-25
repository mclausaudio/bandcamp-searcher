function clearHistory() {
	chrome.storage.sync.clear();
	populateHistory("history");
}

function populateHistory(elementId, size) {
	const historyContainer = document.getElementById(elementId);
	chrome.storage.sync.get("history", (result) => {
		if (result.history && result.history.length !== 0) {
			let fiveRecent = result.history.reverse().slice(0, 5);

			if (size === "popup") {
				historyContainer.innerHTML =
					"<table class='table'>" +
					"<thead>" +
					"<tr>" +
					"<th scope='col'>#</th>" +
					"<th scope='col'>Term</th>" +
					"<th scope='col'>Options</th>" +
					"</tr>" +
					"</thead>" +
					"<tbody id='historyTable'>" +
					"</tbody>" +
					"</table>";

				fiveRecent.map((item, i) => {
					const newItem = `<tr><th scope="row">${
						item.entryNumber + 1
					}</th><td>${
						item.term
					}</td><td class="deleteContainer d-flex"><button class="delBtn btn btn-sm btn-outline-danger mr-2" data-id="${
						item.entryNumber
					}"><i class="fa fa-trash small"></i></button><button class="reSearchBtn btn btn-sm btn-outline-success" data-id="${
						item.entryNumber
					}"><i class="fa fa-search small"></i></button></td><tr>`;
					document.getElementById(
						"historyTable"
					).innerHTML += newItem;
				});
			} else {
				historyContainer.innerHTML =
					"<table class='table'>" +
					"<thead>" +
					"<tr>" +
					"<th scope='col'>#</th>" +
					"<th scope='col'>Type</th>" +
					"<th scope='col'>Search Term</th>" +
					"<th scope='col'>Date / Time</th>" +
					"<th scope='col'>Options</th>" +
					"</tr>" +
					"</thead>" +
					"<tbody id='historyTable'>" +
					"</tbody>" +
					"</table>";

				fiveRecent.map((item, i) => {
					const newItem = `<tr><th scope="row">${
						item.entryNumber + 1
					}</th><td>${item.type}</td><td>${item.term}</td><td>${
						item.date
					}</td><td class="deleteContainer d-flex"><button class="delBtn btn btn-outline-danger mr-2" data-id="${
						item.entryNumber
					}"><i class="fa fa-trash"></i></button><button class="reSearchBtn btn btn-outline-success" data-id="${
						item.entryNumber
					}"><i class="fa fa-search"></i></button></td><tr>`;
					document.getElementById(
						"historyTable"
					).innerHTML += newItem;
				});
			}
			// Loop and add delete button
			Array.from(document.getElementsByClassName("delBtn")).forEach(
				(btn) => {
					btn.addEventListener("click", (e) => {
						removeItem(e.target.attributes[1].nodeValue);
					});
				}
			);
			// Loop and add re-search button
			Array.from(document.getElementsByClassName("reSearchBtn")).forEach(
				(btn) => {
					btn.addEventListener("click", (e) => {
						console.log(e);
						const searchType = e.path[2].cells[1].innerText;
						const searchTerm = e.path[2].cells[2].innerText;
						chrome.storage.sync.get("history", (result) => {
							addItem(
								searchType,
								searchTerm,
								result.history,
								() => {
									reSearch(searchTerm);
								}
							);
						});
					});
				}
			);
		} else {
			historyContainer.innerHTML =
				"<div class='alert alert-secondary d-flex justify-content-center align-items-center'><p class='my-3'>No current user history &#128532;try making a search &#128513;</p></div>";
		}
	});
}

function addItem(searchType, searchTerm, oldHistory, callBack) {
	const newEntry = {
		type: searchType,
		term: searchTerm.replace(/[^A-Za-z0-9 ]/g, ""),
	};
	var today = new Date();
	var date =
		today.getMonth() +
		1 +
		"/" +
		today.getDate() +
		"/" +
		today.getFullYear();

	var time =
		today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date + " at " + time;
	newEntry.date = dateTime;
	newEntry.entryNumber = oldHistory.length;
	let newHistory = oldHistory;
	newHistory.push(newEntry);
	chrome.storage.sync.set({ history: newHistory }, callBack);
}

function removeItem(id) {
	chrome.storage.sync.get({ history }, (history) => {
		console.log("history", history);
		const newHistory = [];
		let idx = 0;
		history.history.forEach((item) => {
			if (item.entryNumber !== parseInt(id)) {
				item.entryNumber = idx;
				newHistory.push(item);
				idx++;
			}
		});
		console.log("newHistory", newHistory);
		chrome.storage.sync.set({ history: newHistory }, () => {
			populateHistory("history");
		});
	});
}

function reSearch(searchTerm) {
	chrome.runtime.sendMessage({
		newTab: true,
		searchTerm: searchTerm,
	});

	// If on the chrome index page, repopulate search results
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		const currentTab = tabs[0];
		if (currentTab.url.includes("index.html")) {
			populateHistory("history");
		}
		chrome.runtime.sendMessage({
			newTab: true,
			searchTerm: searchTerm,
		});
	});
}
