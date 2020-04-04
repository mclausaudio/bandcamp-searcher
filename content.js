chrome.runtime.onMessage.addListener((req, sender, res) => {
  let title = document.querySelectorAll('.playbackSoundBadge__title a span')[1].innerText;

  console.log(title)
})

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