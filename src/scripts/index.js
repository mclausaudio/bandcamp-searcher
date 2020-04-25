document.addEventListener(
	"DOMContentLoaded",
	function () {
		// // Make sure you're on SoundCloud
		// chrome.tabs.query({ active: true, currentWindow: true }, function (
		// 	tabs
		// ) {
		// 	var currentTab = tabs[0];
		// 	if (currentTab.url.includes("soundcloud")) {
		// 		document.getElementById("searchControls").style.display =
		// 			"block";
		// 		document.getElementById("errorContainer").style.display =
		// 			"none";
		// 	}
		// });
		// Check history on load, if there is data load it to DOM or load 'no history' message
		populateHistory("history");

		// Listen for button clicks
		// document.getElementById("username").addEventListener(
		//   "click",
		//   () => {
		//     onclick("username");
		//   },
		//   false
		// );
		// document.getElementById("trackTitle").addEventListener(
		//   "click",
		//   () => {
		//     onclick("trackTitle");
		//   },
		//   false
		// );
		document
			.getElementById("clearHistory")
			.addEventListener("click", clearHistory),
			false;

		function onclick(searchType) {
			chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
				chrome.tabs.sendMessage(tabs[0].id, { searchType: searchType });
			});
		}

		// chrome.runtime.onMessage.addListener(onSearch);
	},
	false
);
