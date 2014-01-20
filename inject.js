var data = {
    url: document.URL,
    selection: window.getSelection().toString()
}

chrome.runtime.sendMessage(data, function(response) {
  console.log(response);
});