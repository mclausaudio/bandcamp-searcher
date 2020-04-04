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