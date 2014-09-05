;
(function ($) {
    $.fn.dateDropDowns = function (options) {

        var defaults = {
            dateFormat: 'dd-mm-yy',
            monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            yearStart: ((new Date()).getFullYear() - 100).toString(), yearEnd: (new Date()).getFullYear().toString(),
            taiwanCalendarYear: false,
            yearOption: '',
            monthOption: '',
            dayOption: ''
        };
        var options = $.extend(defaults, options);

        return this.each(function () {
            var obj = $(this);
            var body = obj.html();

            var _container_name = obj.attr('id') + '_dateLists';
            var _container_name_day = _container_name + '_day';
            var _container_name_month = _container_name + '_month';
            var _container_name_year = _container_name + '_year';

            var _startDate = obj.val();
            var _date = new Date();
            var _seperator = (defaults.dateFormat.indexOf('/') > -1) ? '/' : '-';

            GetStartDate();
            AddLists();
            PopulateLists();
            SetupChangeHandlers();

            //=========================================================================
            function GetStartDate() {
                if (_startDate.length > 0) {
                    var _dateSections = defaults.dateFormat.split(_seperator);
                    var _dateParts = _startDate.split(_seperator);
                    var _newDate = new Date();

                    for (_x = 0; _x < _dateParts.length; _x++) {
                        if (_dateSections[_x].toLowerCase().indexOf('d') > -1) {
                            _newDate.setDate(_dateParts[_x]);
                        }
                        else if (_dateSections[_x].toLowerCase().indexOf('m') > -1) {
                            _newDate.setMonth(_dateParts[_x] - 1);
                        }
                        else if (_dateSections[_x].toLowerCase().indexOf('y') > -1) {
                            _newDate.setYear(_dateParts[_x]);
                        }
                    }

                    _date = _newDate;
                }
            }

            //=========================================================================
            function AddLists() {
                var _dateSections = defaults.dateFormat.split(_seperator);

                var _obj = obj;
                obj.replaceWith('<div id="' + _container_name + '"></div>');

                var $targetElement = $('#' + _container_name);

                for (_x = 0; _x < _dateSections.length; _x++) {

                    if (_dateSections[_x].toLowerCase().indexOf('d') > -1) {
                        $('<select></select>')
                            .attr({
                                'id': _container_name_day + '_list',
                                'name': _container_name_day + '_list',
                                'style': 'margin: 5px;'
                            })
                            .appendTo($targetElement);
                    }
                    else if (_dateSections[_x].toLowerCase().indexOf('m') > -1) {
                        $('<select></select>')
                            .attr({
                                'id': _container_name_month + '_list',
                                'name': _container_name_month + '_list',
                                'style': 'margin: 5px;'
                            })
                            .appendTo($targetElement);
                    }
                    else if (_dateSections[_x].toLowerCase().indexOf('y') > -1) {
                        $('<select></select>')
                            .attr({
                                'id': _container_name_year + '_list',
                                'name': _container_name_year + '_list',
                                'style': 'margin: 5px;'
                            })
                            .appendTo($targetElement);
                    }
                }

                $targetElement.append(_obj);
                obj.hide();
            }

            //=========================================================================

            function PopulateLists() {
                PopulateDayList();
                PopulateMonthList();
                PopulateYearList();
            }

            function PopulateDayList() {
                /// <summary>
                /// Populate Day List
                /// </summary>

                var _currentMonth = _date.getMonth() + 1;
                var _start = 1;

                _daysInMonth = GetMonthDays(_currentMonth, _date.getFullYear()) + 1;

                var $targetElement = $('#' + _container_name_day + '_list');
                var selectedDay = $targetElement.val();

                $targetElement.children().remove();
                $('<option></option>')
                    .attr('value', '').text(defaults.dayOption)
                    .appendTo($targetElement);

                for (_x = _start; _x < _daysInMonth; _x++) {
                    var _selected = _startDate.length > 0
                        ? (_date.getDate() == _x) ? 'selected="true"' : ''
                        : '';

                    $('<option ' + _selected + '></option>')
                        .attr('value', _x).text(_x).appendTo($targetElement);
                }

                if (selectedDay) {
                    var isOptionExists = $targetElement.find('option[value=' + selectedDay + ']').length > 0;
                    $targetElement.val(isOptionExists ? selectedDay : '');
                }
            }

            function GetMonthDays(prmMonth, prmYear) {
                /// <summary>
                /// Get the number of days for a given month
                /// </summary>
                /// <param name="prmMonth"></param>
                /// <param name="prmYear"></param>
                /// <returns type=""></returns>

                var _daysInMonth = 31;

                if (prmMonth == 4 || prmMonth == 6 || prmMonth == 9 || prmMonth == 11) {
                    _daysInMonth = 30;
                }
                else if (prmMonth == 2) {
                    _daysInMonth = (prmYear % 4) == 0 ? 29 : 28;
                }
                return _daysInMonth;
            }

            function PopulateMonthList() {
                /// <summary>
                /// Populate Month List
                /// </summary>

                var $targetElement = $('#' + _container_name_month + '_list');
                $targetElement.children().remove();
                $('<option></option>')
                    .attr('value', '').text(defaults.monthOption)
                    .appendTo($targetElement);

                for (_x = 0; _x < 12; _x++) {
                    var _selected = _startDate.length > 0
                        ? ((_date.getMonth()) == _x) ? 'selected="true"' : ''
                        : '';

                    $('<option ' + _selected + '></option>')
                        .attr('value', _x)
                        .text(defaults.monthNames[_x])
                        .appendTo($targetElement);
                }
            }

            function PopulateYearList() {
                /// <summary>
                /// Populate Year List
                /// </summary>

                var $targetElement = $('#' + _container_name_year + '_list');

                $targetElement.children().remove();

                $('<option></option>')
                    .attr('value', '').text(defaults.yearOption)
                    .appendTo($targetElement);

                var _yStart = parseInt(defaults.yearStart, 10);
                var _yEnd = parseInt(defaults.yearEnd, 10);

                if (_yEnd < _yStart) {
                    var temp = _yStart;
                    _yStart = _yEnd;
                    _yEnd = temp;
                }

                for (_x = _yEnd; _x >= _yStart; _x--) {
                    var _selected = _startDate.length > 0
                        ? ((_date.getFullYear()) == _x) ? 'selected="true"' : ''
                        : '';

                    $('<option ' + _selected + '></option>')
                        .attr('value', _x)
                        .text(defaults.taiwanCalendarYear ? _x - 1911 : _x)
                        .appendTo($targetElement);
                }
            }

            //=========================================================================   

            function SetupChangeHandlers() {

                var $daySelect = $('#' + _container_name_day + '_list');
                var $monthSelect = $('#' + _container_name_month + '_list');
                var $yearSelect = $('#' + _container_name_year + '_list');

                $daySelect.change(function () {
                    _date.setDate($daySelect.val());
                    CreateDate();
                });

                $monthSelect.change(function () {
                    var _newMonth = parseInt($monthSelect.val(), 10);
                    var _days = _date.getDate();

                    _daysInMonth = GetMonthDays(_newMonth + 1, _date.getFullYear());

                    if (_days > _daysInMonth) {
                        _days = _daysInMonth;
                    }

                    var _newDate = new Date(_date.getFullYear(), _newMonth, _days, 0, 0, 0, 0);
                    _date = _newDate;

                    PopulateDayList();
                    CreateDate();
                });

                $yearSelect.change(function () {
                    var _newYear = $yearSelect.val();
                    var _days = _date.getDate();
                    var _month = _date.getMonth();

                    _daysInMonth = GetMonthDays(_month + 1, _newYear);

                    if (_days > _daysInMonth) {
                        _days = _daysInMonth;
                    }

                    var _newDate = new Date(_newYear, _month, _days, 0, 0, 0, 0);
                    _date = _newDate;

                    PopulateDayList();
                    CreateDate();
                });
            }

            function CreateDate() {

                var $daySelect = $('#' + _container_name_day + '_list');
                var $monthSelect = $('#' + _container_name_month + '_list');
                var $yearSelect = $('#' + _container_name_year + '_list');

                var dayValue = $daySelect.val();
                var monthValue = $monthSelect.val();
                var yearValue = $yearSelect.val();

                var _newDate = defaults.dateFormat.toLowerCase();

                if (isEmpty(yearValue) && isEmpty(monthValue) && isEmpty(yearValue)) {
                    obj.val('');
                }
                else if (!isEmpty(yearValue) && !isEmpty(monthValue) && !isEmpty(dayValue)) {
                    var _days = parseInt(dayValue, 10);
                    var _month = parseInt(monthValue, 10) + 1;
                    var _year = parseInt(yearValue, 10);

                    var _dateFormat = defaults.dateFormat;

                    if (_dateFormat.indexOf('DD') > -1 && _days.toString().length < 2) {
                        _days = '0' + _days;
                    }
                    if (_dateFormat.indexOf('MM') > -1 && _month.toString().length < 2) {
                        _month = '0' + _month;
                    }

                    _newDate = _newDate.replace('dd', _days);
                    _newDate = _newDate.replace('mm', _month);
                    _newDate = _newDate.replace('yy', _year);

                    obj.val(_newDate);
                }
                else {
                    _newDate = _newDate.replace('dd', dayValue);
                    _newDate = _newDate.replace('mm', parseInt(monthValue, 10) + 1);
                    _newDate = _newDate.replace('yy', yearValue);

                    obj.val(_newDate);
                }
            }

            function isEmpty(str) {
                return (!str || 0 === str.length);
            }
        });
    };
})(jQuery);