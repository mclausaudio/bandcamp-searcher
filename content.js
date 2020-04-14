chrome.runtime.onMessage.addListener((req, sender, res) => {
	let searchTerm;

	if (req.searchType === "trackTitle") {
		console.log("inside trackTitle");
		searchTerm = document.querySelectorAll(
			".playbackSoundBadge__titleContextContainer"
		)[0].children[0].innerText;
	} else {
		console.log("inside username");
		searchTerm = document.querySelectorAll(
			".playbackSoundBadge__title a span"
		)[1].innerText;
	}

	chrome.runtime.sendMessage({ searchTerm: searchTerm });
});

// window.onload = () => {
//   const button = document.createElement('button');
//   button.id = "button";
//   button.textContent = "Make dark"
//   document.querySelector('.header__left').append(button)

//   button.addEventListener('click', () => changeStyles())
// }

// function changeStyles() {
//   document.getElementById('content').style.backgroundColor = "black"

//   fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then(res => res.json())
//     .then(json => console.log(json))
// }

// playbackSoundBadge__title
