chrome.runtime.onMessage.addListener((req, sender, res) => {
	let searchTerm;
	let searchType;
	if (req.searchType === "trackTitle") {
		searchTerm = document.querySelectorAll(
			".playbackSoundBadge__title a span"
		)[1].innerText;
		searchType = "track";
	} else {
		searchTerm = document.querySelectorAll(
			".playbackSoundBadge__titleContextContainer"
		)[0].children[0].innerText;

		searchType = "uploader";
	}

	chrome.runtime.sendMessage({
		searchType: searchType,
		searchTerm: searchTerm,
	});
});
