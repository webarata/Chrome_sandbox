var changeFontSize = function(fontSize) {
  chrome.tabs.executeScript(null, {
    "code": "document.body.style.fontSize = '" + fontSize + "pt'"
  });
};

document.getElementById('big').addEventListener('click', function() {
  changeFontSize('20');
});

document.getElementById('small').addEventListener('click', function() {
  changeFontSize('5');
});

