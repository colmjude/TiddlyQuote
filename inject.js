var data = {
    url: document.URL,
    title: document.title,
    selection: window.getSelection().toString()
}

chrome.runtime.sendMessage(data, function(response) {
  console.log(response);
});