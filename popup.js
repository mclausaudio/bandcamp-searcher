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
			console.log(searchType);
			chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
				chrome.tabs.sendMessage(tabs[0].id, { searchType: searchType });
			});
		}
	},
	false
);
