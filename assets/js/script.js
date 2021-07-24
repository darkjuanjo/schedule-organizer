var currentdayEl = $("#currentDay");
var set_time = setInterval(() => {
    var date = moment().format("dddd, MMMM DD, Y hh:mm:ss A");
    currentdayEl.text(date);
}, 1000);