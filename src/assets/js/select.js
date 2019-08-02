$(document).ready(function () {
  let x, i, j, selElmnt, a, b, c;
  x = document.getElementsByClassName('select');
  //debugger;
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName('select')[0];
    a = document.createElement('div');
    a.setAttribute('class', 'select_selected');
    let data = selElmnt.options[selElmnt.selectedIndex].dataset.key;
    if (data) {
      let z = document.createElement("span");
      z.classList.add('select-date');
      z.innerHTML = data;
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      a.appendChild(z);
      x[i].appendChild(a);
    } else {
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
    }
    b = document.createElement('div');
    b.setAttribute('class', 'select-items select-hide');
    for (j = 0; j < selElmnt.length; j++) {
      c = document.createElement('div');
      let data = selElmnt.options[j].dataset.key;
      if (data) {
        let z = document.createElement("span");
        z.innerHTML = data;
        z.classList.add('select-date');
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.appendChild(z);
      } else {
        c.innerHTML = selElmnt.options[j].innerHTML;
      }
      c.addEventListener('click', function(e) {
       // debugger;
          let y, i, k, s, h;
          s = this.parentNode.parentNode.getElementsByTagName('select')[0];
          h = this.parentNode.previousSibling;
          for (i = 0; i < s.length; i++) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              // y = this.parentNode.getElementsByClassName('same-as-selected');
              // for (k = 0; k < y.length; k++) {
              //   y[k].removeAttribute('class');
              // }
              //this.setAttribute('class', 'same-as-selected');
              break;
          }
          h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener('click', function(e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle('select-hide');
      this.classList.toggle('select-arrow-active');
    });
  }

  function closeAllSelect(elmnt) {
    let x, y, i, arrNo = [];
    x = document.getElementsByClassName('select-items');
    y = document.getElementsByClassName('select_selected');
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove('select-arrow-active');
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add('select-hide');
      }
    }
  }

  document.addEventListener('click', closeAllSelect);
});