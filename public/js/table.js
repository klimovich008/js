const Gold = 100;
const Silver = 10;
const Bronze = 0;
let modals = ko.observableArray([]);
let contributors = ko.observableArray([]);

function createModal(key, val) {
  let buf;
  $.getJSON("https://api.github.com/users/" + val.login)
    .done(function (data) {
      modals.push(data);
    })
    .fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Request Failed: " + err);
    });
}
function start() {
  $.getJSON("https://api.github.com/repos/thomasdavis/backbonetutorials/contributors")
    .done(function (data) {
      $.each(data, function (key, val) {
        createModal(val.id, val);

      });
      contributors = ko.observableArray(data);
      ko.applyBindings({ contributors: contributors, modals: modals });
      sortTable("ASC");

    })
    .fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      alert("Request Failed: " + err);
    });

}
function selectGroup(input) {
  let elements = document.querySelectorAll('#contributorsTable .line');
  for (i = 0; i < elements.length; i++) {
    group = elements[i].querySelector(".Group");
    elements[i].style.display = group.innerHTML === input || input === "All" ? "" : "none";

  }

}
function sortTable(dir) {
  contributors.sort(function (left, right) { return left.login.toUpperCase() == right.login.toUpperCase() ? 0 : (left.login.toUpperCase() < right.login.toUpperCase() ? -1 : 1) });
  if (dir == "DESC")
    contributors.reverse();
}
$(function () {
  start();
});
