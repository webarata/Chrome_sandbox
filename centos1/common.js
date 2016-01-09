var MONTH_NAME = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// 当日から、検索するURLを決定する
var date = new Date();
var dateUrl = date.getFullYear() + '-' + MONTH_NAME[date.getMonth()] + '/date.html';
var url = 'https://lists.centos.org/pipermail/centos-announce/' + dateUrl;
