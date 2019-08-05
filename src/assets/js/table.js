function check_group(contributions) {
  if (contributions > 100)
    return "Gold";
  else
    if (contributions > 10) return "Silver";
  return "Bronze";
}
function do_modal(key, company, location, email) {
  modal = "    <div class=\"modal fade\" id='user_" + key + "' tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-sm\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"col\">Company - " + company + " <\/div>\r\n          <div class=\"col\">Location - " + location + "<\/div>\r\n          <div class=\"col\">Email - " + email + "<\/div>\r\n        <\/div>\r\n      <\/div>\r\n    <\/div>"
  return modal;
}
$.getJSON("https://api.github.com/repos/thomasdavis/backbonetutorials/contributors", function (data) {
  var items = [];
  var i = 0;
  let modal = "";
  $.each(data, function (key, val) {
    $.getJSON("https://api.github.com/users/" + val.login, function (data) {
      modal = do_modal(key, data.company, data.location, data.email)
      $(modal).appendTo("#table");
    });
    items.push("<tr class = 'line' style='cursor: grab;' data-toggle='modal' data-target='#user_" + key + "' >" + "<td id='" + key + "' >" + val.id + "</td> " + "<td>" + val.login + "</td> " + "<a><td>" + val.url + "</td> </a>" + "<td>" + val.contributions + "</td> " + "<td class = 'Group' value='" + check_group(val.contributions) + "'>" + check_group(val.contributions) + "</td> " + "</tr>");
  });         //document.body.append(elm);
  $("<tbody/>", {
    html: items.join("")
  }).appendTo("#table");
})
function group_select(input) {
  let elements = document.querySelectorAll('.line');
  for (i = 0; i < elements.length; i++) {
    group = elements[i].querySelector(".Group");
    group.innerHTML === input || input === "All" ? elements[i].style.display = "" : elements[i].style.display = "none";

  }

}
function sort_select(dir) {
  var i, switching, b, shouldSwitch, dir, switchcount = 0;
  switching = true;
  while (switching) {
    switching = false;
    b = document.querySelectorAll('.line');
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (dir === "ASC") {
        if (b[i].querySelectorAll("td")[1].innerHTML.toLowerCase() > b[i + 1].querySelectorAll("td")[1].innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir === "DESC") {
        if (b[i].querySelectorAll("td")[1].innerHTML.toLowerCase() < b[i + 1].querySelectorAll("td")[1].innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount === 0 && dir === "ASC") {
        dir = "DESC";
        switching = true;
      }
    }
  }
}
$(function () {
  sort_select("ASC");
});
