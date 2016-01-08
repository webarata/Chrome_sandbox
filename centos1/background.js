var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(data) {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      var contents = xhr.responseText;
      console.log(contents);
    }
  }
};
var url = 'https://lists.centos.org/pipermail/centos-announce/';
xhr.open('GET', url, true);
xhr.send();
