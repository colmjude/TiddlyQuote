var data = {
    selection: window.getSelection().toString()
}

chrome.runtime.sendMessage(data, function(response) {
  console.log(response);
});