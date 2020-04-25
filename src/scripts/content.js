chrome.runtime.onMessage.addListener((req, sender, res) => {
	let searchTerm;
	let searchType;
	console.log("req", req);
	if (req.searchType === "trackTitle") {
		searchTerm = document.querySelectorAll(
			".playbackSoundBadge__title a span"
		)[1].innerText;
		searchType = "trackTitle";
	} else {
		searchTerm = document.querySelectorAll(
			".playbackSoundBadge__titleContextContainer"
		)[0].children[0].innerText;

		searchType = "username";
	}

	if (req.newTab) {
		chrome.runtime.sendMessage({
			newTab: true,
			searchType: searchType,
			searchTerm: searchTerm,
		});
	} else {
		chrome.runtime.sendMessage({
			searchType: searchType,
			searchTerm: searchTerm,
		});
	}
});
