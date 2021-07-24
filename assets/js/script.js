var currentdayEl = $("#currentDay");
var array_rowsEl = $(".row");
var set_time = setInterval(() => {
    var date = moment().format("dddd, MMMM DD, Y hh:mm:ss A");
    currentdayEl.text(date);
    check_date(date);
}, 1000);

var check_date = date => {
    for(var i = 0; i < array_rowsEl.length; i++)
    {
        var current_time = moment(date).format("h");
        var time = moment($(array_rowsEl[i]).find("p").text(), "hA").format("H");
        var working_id = $(array_rowsEl[i]).attr('id');
        var current_time = moment(date).format("H");
        delta = time - current_time;
        if(delta < 0)
        {
            $(array_rowsEl[i]).find("textarea")
            .addClass("past")
            .attr("readonly", true);
        }
        else if( delta == 0)
        {
            $(array_rowsEl[i]).find("textarea")
            .addClass("present")
            .attr("readonly", false);
        }
        else {
            $(array_rowsEl[i]).find("textarea")
            .addClass("future")
            .attr("readonly", false);
        }
    }
}