document.addEventListener(
	"DOMContentLoaded",
	function () {
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
		function onclick(searchType) {
			chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
				chrome.tabs.sendMessage(tabs[0].id, { searchType: searchType });
			});
		}

		chrome.runtime.onMessage.addListener(onSearch);

		function onSearch(req, sender, sendResponse) {
			// console.log("req", req);
			// Check to see if history exists in storage
			const date = new Date();
			const newEntry = {
				date: date,
				type: req.searchType,
				term: req.searchTerm.replace(/[^A-Za-z0-9 ]/g, ""),
			};
			console.log(newEntry);
			chrome.storage.sync.get("history", function (result) {
				if (result.history) {
					let newHistory = result.history;
					newHistory.push(newEntry);

					chrome.storage.sync.set({ history: newHistory });
					chrome.storage.sync.get("history", (res) =>
						console.log("updated storage :::::", res)
					);
				} else {
					console.log("no history in storage");
				}
			});

			// populateHistory();
		}

		function populateHistory() {
			chrome.storage.sync.get(null, function (result) {
				console.log(result);
			});
		}
		//////////////////////////
	},
	false
);
