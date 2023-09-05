// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var now = dayjs().format('DD/MM/YYYY HH:mm A'); //Sets the day to a variable while formatting it for display
  var currentHour = Number(dayjs().format('HH')); //gets the current hour as a number
  var hourBlockEl = document.querySelectorAll('.time-block') //selects all the time blocks as a NodeList
  var currentDayEl = document.getElementById('currentDay'); //gets the element that will display the current day/time
  $('.saveBtn').on("click", function() { //when the save button is clicked
    var containHour = this.parentElement; //gets the containing hour block of the save button is clicked
    var hour = containHour.getAttribute('id'); //gets the hour id for the containing block
    var descriptionEl = containHour.querySelector('.description'); //gets the element that contains the text input
    if (descriptionEl.value != null) { //if there is input entered
      localStorage.setItem(hour, descriptionEl.value); //saves the input to local storage with a key under the hour id
    }
  })

  for (h = 0; h < hourBlockEl.length; h++) { //loops through the length of the hour block node list
    var thisHour = hourBlockEl[h]; //gets the current hour
    var hourId = thisHour.getAttribute('id'); //gets the id of the current hour
    hourNum = hourId.slice(hourId.indexOf('-') + 1); //gets the index of the dash, then slices off everything before and up to the dash to just have the number
    if (hourNum < currentHour) { //if the hour is in the past
      thisHour.setAttribute('class', 'row time-block past'); //apply the past class for css
    }
    else if (hourNum == currentHour) { //if the hour is the same as the current hour
      thisHour.setAttribute('class', 'row time-block present'); //apply the present class for css
    }
    else if (hourNum > currentHour) { //if the hour is in the future
      thisHour.setAttribute('class', 'row time-block future') //apply the future class for css
    }
    var descriptionEl = thisHour.querySelector('.description') //gets the description element of the current iteration
    descriptionEl.value = localStorage.getItem(hourId); // displays any existing saved description in local storage
  }
    currentDayEl.textContent = now; //displays the current day
});
