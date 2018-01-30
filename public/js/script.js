$(".button-collapse").sideNav();

//Dropmenu
$('.ui.dropdown').dropdown();

//Script date pour date de naissance

// define variables
var nativePicker = document.querySelector('.nativeDatePicker');
var fallbackPicker = document.querySelector('.fallbackDatePicker');
var fallbackLabel = document.querySelector('.fallbackLabel');

var yearSelect = document.querySelector('#year');
var monthSelect = document.querySelector('#month');
var daySelect = document.querySelector('#day');

// hide fallback initially
fallbackPicker.style.display = 'none';
fallbackLabel.style.display = 'none';

// test whether a new date input falls back to a text input or not
var test = document.createElement('input');
test.type = 'date';

// if it does, run the code inside the if() {} block
if(test.type === 'text') {
  // hide the native picker and show the fallback
  nativePicker.style.display = 'none';
  fallbackPicker.style.display = 'block';
  fallbackLabel.style.display = 'block';

  // populate the days and years dynamically
  // (the months are always the same, therefore hardcoded)
  populateDays(monthSelect.value);
  populateYears();
}

function populateDays(month) {
  // delete the current set of <option> elements out of the
  // day <select>, ready for the next set to be injected
  while(daySelect.firstChild){
    daySelect.removeChild(daySelect.firstChild);
  }

  // Create variable to hold new number of days to inject
  var dayNum;

  // 31 or 30 days?
  if(month === 'January' || month === 'March' || month === 'May' || month === 'July' || month === 'August' || month === 'October' || month === 'December') {
    dayNum = 31;
  } else if(month === 'April' || month === 'June' || month === 'September' || month === 'November') {
    dayNum = 30;
  } else {
  // If month is February, calculate whether it is a leap year or not
    var year = yearSelect.value;
    (year - 2016) % 4 === 0 ? dayNum = 29 : dayNum = 28;
  }

  // inject the right number of new <option> elements into the day <select>
  for(i = 1; i <= dayNum; i++) {
    var option = document.createElement('option');
    option.textContent = i;
    daySelect.appendChild(option);
  }

  // if previous day has already been set, set daySelect's value
  // to that day, to avoid the day jumping back to 1 when you
  // change the year
  if(previousDay) {
    daySelect.value = previousDay;

    // If the previous day was set to a high number, say 31, and then
    // you chose a month with less total days in it (e.g. February),
    // this part of the code ensures that the highest day available
    // is selected, rather than showing a blank daySelect
    if(daySelect.value === "") {
      daySelect.value = previousDay - 1;
    }

    if(daySelect.value === "") {
      daySelect.value = previousDay - 2;
    }

    if(daySelect.value === "") {
      daySelect.value = previousDay - 3;
    }
  }
}

function populateYears() {
  // get this year as a number
  var date = new Date();
  var year = date.getFullYear();

  // Make this year, and the 100 years before it available in the year <select>
  for(var i = 0; i <= 100; i++) {
    var option = document.createElement('option');
    option.textContent = year-i;
    yearSelect.appendChild(option);
  }
}

// when the month or year <select> values are changed, rerun populateDays()
// in case the change affected the number of available days
yearSelect.onchange = function() {
  populateDays(monthSelect.value);
}

monthSelect.onchange = function() {
  populateDays(monthSelect.value);
}

//preserve day selection
var previousDay;

// update what day has been set to previously
// see end of populateDays() for usage
daySelect.onchange = function() {
  previousDay = daySelect.value;
}

//Téléphone Francais
var cleave = new Cleave('.cleave-tel', {
    phone: true,
    phoneRegionCode: 'FR'
});

/** Récupération de la ville et code postale avec vicopo*/

jQuery(function($) {
    var _5 = $('#code'),
        _4 = $('#city'),
        _9 = $('#output');
    var _2 = {};
    var _12 = (~(location.protocol + '').indexOf('s') ? 'https' : 'http') + '://vicopo.selfbuild.fr';
    _5.keyup(function() {
        var _0 = $(this).val();
        if (/^[^0-9]/.test(_0)) {
            _5.val('');
            _4.val(_0).focus().trigger('keyup')
        }
    });
    _4.keyup(function() {
        var _0 = $(this).val();
        if (/^[0-9]/.test(_0)) {
            _4.val('');
            _5.val(_0).focus().trigger('keyup')
        }
    });

    function _10(_13) {
        _9.html(_13.map(function(_3) {
            return '<div class="item"><a href="#">' + _3.code + ' &nbsp; ' + _3.city + '</a></div>';
        }).join(''))
    }
    $.each(['code', 'city'], function(i, _1) {
        var _11 = $('#' + _1).on('keyup', function() {
            var _0 = _11.val();
            if (_0.length > 1) {
                _2[_1] = _2[_1] || {};
                if (_2[_1][_0]) {
                    _10(_2[_1][_0])
                }
                var _3 = {};
                _3[_1] = _0;
                $.getJSON(_12, _3, function(_6) {
                    _2[_1][_6.input] = _6.cities;
                    if (_11.val() == _6.input) {
                        _10(_6.cities)
                    }
                })
            }
        })
    });
    $(document).on('click', '#output a', function(e) {
        var _8 = $(this).text();
        var _7 = _8.indexOf(' ');
        if (~_7) {
            _5.val(_8.substr(0, _7));
            _4.val(_8.substr(_7).trim());
            _9.empty()
        }
        e.preventDefault();
        e.stopPropagation();
        return false
    })
});

