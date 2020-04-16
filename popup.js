document.addEventListener(
	"DOMContentLoaded",
	function () {
		// Check history on load, if there is data load it to DOM
		populateHistory("history");

		document.getElementById("username").addEventListener(
			"click",
			() => {
				onclick("trackTitle");
			},
			false
		);
		document.getElementById("trackTitle").addEventListener(
			"click",
			() => {
				onclick("username");
			},
			false
		);
		document
			.getElementById("clearHistory")
			.addEventListener("click", clearHistory),
			false;

		function onclick(searchType) {
			chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
				chrome.tabs.sendMessage(tabs[0].id, { searchType: searchType });
			});
		}

		chrome.runtime.onMessage.addListener(onSearch);

		function onSearch(req, sender, sendResponse) {
			const newEntry = {
				type: req.searchType,
				term: req.searchTerm.replace(/[^A-Za-z0-9 ]/g, ""),
			};
			chrome.storage.sync.get("history", function (result) {
				if (result.history) {
					console.log("history exists");
					addItem(newEntry, result.history, () => {
						populateHistory("history");
					});
				} else {
					console.log("No history in storage");
					addItem(newEntry, [], () => {
						populateHistory("history");
					});
				}
			});
		}

		function addItem(newEntry, oldHistory, callBack) {
			var today = new Date();
			var date =
				today.getMonth() +
				1 +
				"/" +
				today.getDate() +
				"/" +
				today.getFullYear();

			var time =
				today.getHours() +
				":" +
				today.getMinutes() +
				":" +
				today.getSeconds();
			var dateTime = date + " at " + time;
			newEntry.date = dateTime;
			newEntry.entryNumber = oldHistory.length + 1;
			let newHistory = oldHistory;
			newHistory.push(newEntry);
			chrome.storage.sync.set({ history: newHistory }, callBack);
		}

		function populateHistory(elementId) {
			const historyContainer = document.getElementById(elementId);
			chrome.storage.sync.get("history", (result) => {
				if (result.history) {
					let tenRecent = result.history.reverse().slice(0, 10);
					historyContainer.innerHTML = "";
					tenRecent.forEach((item, i) => {
						const newItem = `<p>${item.entryNumber}: ${item.type} - "${item.term}" | ${item.date}</p>`;
						historyContainer.innerHTML += newItem;
					});
				} else {
					historyContainer.innerHTML =
						"<p>No current user history &#128532;</p><p>Try making a search</p>";
				}
			});
		}

		function clearHistory() {
			chrome.storage.sync.clear();
			populateHistory("history");
		}
	},
	false
);
