chrome.runtime.onMessage.addListener((req, sender, res) => {
	// Open new tab with Bandcamp search URL
	console.log("Message", req);
	let searchTerm = req.searchTerm.replace(/[^A-Za-z0-9 ]/g, "");
	openBandcampSearch(searchTerm);
});

const openBandcampSearch = (term) => {
	chrome.tabs.create({
		url: `https://bandcamp.com/search?q=${term}`,
	});
};
