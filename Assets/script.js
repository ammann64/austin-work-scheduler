// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var now = dayjs().format('DD/MM/YYYY HH:mm A');
  var currentHour = Number(dayjs().format('HH'));
  var hourBlockEl = document.querySelectorAll('.time-block')
  var currentDayEl = document.getElementById('currentDay');

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  $('.saveBtn').on("click", function() {
    var containHour = this.parentElement;
    var hour = containHour.getAttribute('id');
    var descriptionEl = containHour.querySelector('.description');
    if (descriptionEl.value != null) {
      localStorage.setItem(hour, descriptionEl.value);
    }
  })

  for (h = 0; h < hourBlockEl.length; h++) {
    var thisHour = hourBlockEl[h];
    var hourId = thisHour.getAttribute('id');
    hourNum = hourId.slice(hourId.indexOf('-') + 1);
    if (hourNum < currentHour) {
      thisHour.setAttribute('class', 'row time-block past');
    }
    else if (hourNum == currentHour) {
      thisHour.setAttribute('class', 'row time-block present');
    }
    else if (hourNum > currentHour) {
      thisHour.setAttribute('class', 'row time-block future')
    }
    var descriptionEl = thisHour.querySelector('.description')
    descriptionEl.value = localStorage.getItem(hourId);
  }
    currentDayEl.textContent = now;
});
