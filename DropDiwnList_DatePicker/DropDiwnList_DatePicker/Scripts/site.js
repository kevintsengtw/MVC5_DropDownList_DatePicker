;
$(function () {

    DateDropDownList();
});

function DateDropDownList() {

    var digitalMonthNames = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    var $NormalDateDDL = $('input.Date-DropDownList');

    $NormalDateDDL.dateDropDowns({
        dateFormat: 'yy-MM-DD',
        monthNames: digitalMonthNames,
        taiwanCalendarYear: $NormalDateDDL.data("taiwancalendaryear") === 'True',
        yearStart: $NormalDateDDL.data("yearstart"),
        yearEnd: $NormalDateDDL.data("yearend"),
        yearOption: $NormalDateDDL.data("yearoption"),
        monthOption: $NormalDateDDL.data("monthoption"),
        dayOption: $NormalDateDDL.data("dayoption")
    });

    var targetID = $NormalDateDDL.attr('id');

    $.validator.setDefaults({
        ignore: [targetID]
    });

    // For AgeRange Validation.
    $.validator.unobtrusive.adapters.add(
        "agerangevalidation",
        ["minage", "maxage"],
        function (options) {
            options.rules["agerangevalidation"] = options.params;
            if (options.message) {
                options.messages["agerangevalidation"] = options.message;
            }
        });

    $.validator.addMethod("agerangevalidation", function (value, elements, params) {
        if (value) {
            var valDate = new Date(value);
            var lessThenMinAge = (new Date().getFullYear() - valDate.getFullYear()) < parseInt(params.minage);
            var greaterThenMaxAge = (new Date().getFullYear() - valDate.getFullYear()) > parseInt(params.maxage);
            if (lessThenMinAge || greaterThenMaxAge) {
                return false;
            }
        }
        return true;
    });

    // For MinAge Validation
    $.validator.unobtrusive.adapters.add(
        "minagevalidation",
        ["minage"],
        function (options) {
            options.rules["minagevalidation"] = options.params;
            if (options.message) {
                options.messages["minagevalidation"] = options.message;
            }
        }
    );

    $.validator.addMethod("minagevalidation", function (value, elements, params) {
        if (value) {
            var birthDate = new Date(value);
            var today = new Date();
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age >= parseInt(params.minage, 10);
        }
        return true;
    });

    // For MaxAge Validation
    $.validator.unobtrusive.adapters.add(
        "maxagevalidation",
        ["maxage"],
        function (options) {
            options.rules["maxagevalidation"] = options.params;
            if (options.message) {
                options.messages["maxagevalidation"] = options.message;
            }
        }
    );

    $.validator.addMethod("maxagevalidation", function (value, elements, params) {
        if (value) {
            var birthDate = new Date(value);
            var today = new Date();
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age <= parseInt(params.maxage, 10);
        }
        return true;
    });
}