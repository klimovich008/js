function check_group(contributions){
    if(contributions >  100)
      return "Gold";
    else
      if(contributions>10) return "Silver";
      return "Bronze";
  }

  $.getJSON( "https://api.github.com/repos/thomasdavis/backbonetutorials/contributors", function( data ) {
    var items = [];

    $.each( data, function( key, val ) {
      items.push("<tr class = 'line'>" + "<td id='" + key + "' >" + val.id + "</td> " + "<td>" + val.login + "</td> " + "<a><td>" + val.url + "</td> </a>" +"<td>" + val.contributions + "</td> "  +"<td class = 'Group' value='" + check_group(val.contributions) + "'>" + check_group(val.contributions) + "</td> " + "</tr>" );
    });         //document.body.append(elm);
    $( "<tbody/>",{
      html: items.join( "" )
    }).appendTo( "#table" );
  })
  function group_select(input){
    let elements = document.querySelectorAll('.line');
    for(i = 0; i < elements.length; i++)
    {
       group = elements[i].querySelector(".Group");
       group.innerHTML == input || input=="All" ? elements[i].style.display = "" : elements[i].style.display = "none";

    }

  }
  function sort_select(dir) {
  var  i, switching, b, shouldSwitch, dir, switchcount = 0;
  switching = true;
  while (switching) {
    switching = false;
    b = document.querySelectorAll('.line');
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (dir == "ASC") {
        if (b[i].querySelectorAll("td")[1].innerHTML.toLowerCase() >b[i+1].querySelectorAll("td")[1].innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "DESC") {
        if (b[i].querySelectorAll("td")[1].innerHTML.toLowerCase() < b[i+1].querySelectorAll("td")[1].innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "ASC") {
        dir = "DESC";
        switching = true;
      }
    }
  }
}
$(function() {
    sort_select("ASC");
});
