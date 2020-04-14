chrome.runtime.onMessage.addListener((req, sender, res) => {
	console.log(req.searchTerm);
	let searchTerm = req.searchTerm.replace(/[^A-Za-z0-9 ]/g, "");
	console.log(searchTerm);
	openBandcampSearch(searchTerm);
});

const openBandcampSearch = (term) => {
	chrome.tabs.create({
		url: `https://bandcamp.com/search?q=${term}`,
	});
};

// chrome.runtime.onMessage.addListener((request, sender, response) => {
//   console.log(request);
//   console.log(sender);
//   console.log(response());
// });

// chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//   chrome.tabs.sendMessage(tabs[0].id, { name: 'Michael' }, () => {
//     console.log('helos')
//   })
// })
