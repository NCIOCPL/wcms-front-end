//unchecks All if any other trial type or trial phase is checked
$(document).ready(function(){
var $trialtype = $('input[name="tt"]').not('#tt_all')
$('#tt_all').change(function () {
    if (this.checked) {
        $trialtype.prop('checked', false)
    }
});
$trialtype.change(function () {
    if (this.checked) {
        $('#tt_all').prop('checked', false)
    }
});

var $trialphase = $('input[name="tp"]').not('#tp_all')
$('#tp_all').change(function () {
    if (this.checked) {
        $trialphase.prop('checked', false)
    }
});
$trialphase.change(function () {
    if (this.checked) {
        $('#tp_all').prop('checked', false)
    }
});

});
