function onSearch(req, sender, sendResponse) {
	if (req.newTab) {
		return;
	}

	const searchType = req.searchType;
	const searchTerm = req.searchTerm.replace(/[^A-Za-z0-9ö ]/g, "");

	chrome.storage.sync.get("history", function (result) {
		if (result.history) {
			addItem(searchType, searchTerm, result.history, () => {
				populateHistory("history");
				launchBandcampSearchTab(req.searchType);
			});
		} else {
			addItem(searchType, searchTerm, [], () => {
				populateHistory("history");
				launchBandcampSearchTab(req.searchType);
			});
		}
	});
}

function launchBandcampSearchTab(searchType) {
	console.log(searchType);
	chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, {
			newTab: true,
			searchType: searchType,
		});
	});
}
