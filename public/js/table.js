const Gold = 100;
const Silver = 10;
const Bronze = 0;

function checkGroup(contributions) {
  if (contributions > Gold)
    return "Gold";
  else
    if (contributions > Silver) return "Silver";
  return "Bronze";
}

function createModal(key, val) {
  $.getJSON("https://api.github.com/users/" + val.login, function (data) {
    modal = generateModalForm(key, data.company, data.location, data.email)
    $(modal).appendTo("#table");
  });
}
function start() {
  $.getJSON("https://api.github.com/repos/thomasdavis/backbonetutorials/contributors", function (data) {
    let items = [];
    let i = 0;
    let modal = "";
    $.each(data, function (key, val) {
      items.push("<tr class = 'line' style='cursor: grab;' data-toggle='modal' data-target='#user_" + key + "' >" + 
                    "<td id='" + key + "' >" + val.id + "</td> " + 
                    "<td>" + val.login + "</td> " + 
                    "<a><td>" + val.url + "</td> </a>" + 
                    "<td>" + val.contributions + "</td> " + 
                    "<td class = 'Group' value='" + checkGroup(val.contributions) + "'>" + checkGroup(val.contributions) + "</td> " 
                 + "</tr>");
      createModal(key, val);
    });

    $("<tbody/>", {
      html: items.join("")
    }).appendTo("#table");
  })
}



function generateModalForm(key, company, location, email) {
  modal = "<div class=\"modal fade\" id='user_" + key + "' tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" aria-hidden=\"true\">\r\n \
            <div class=\"modal-dialog modal-sm\">\r\n \
              <div class=\"modal-content\">\r\n \
                 <div class=\"col\">Company - " + company + "<\/div>\r\n \
                 <div class=\"col\">Location - " + location + "<\/div>\r\n \
                 <div class=\"col\">Email - " + email + "<\/div>\r\n \
              <\/div>\r\n \
            <\/div>\r\n \
          <\/div>"
  return modal;
}

function selectGroup(input) {
  let elements = document.querySelectorAll('.line');
  for (i = 0; i < elements.length; i++) {
    group = elements[i].querySelector(".Group");
    elements[i].style.display = group.innerHTML === input || input === "All" ? "" : "none";

  }

}
function sortTable(dir) {
  let i, switching, b, shouldSwitch, switchCount = 0;
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
      switchCount++;
    } else {
      if (switchCount === 0 && dir === "ASC") {
        dir = "DESC";
        switching = true;
      }
    }
  }
}




$(function () {
  start();
  sortTable("ASC");

});
