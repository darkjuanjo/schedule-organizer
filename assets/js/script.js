var currentdayEl = $("#currentDay");
var array_rowsEl = $(".row");
var storage;
var date = moment().format("dddd, MMMM DD, Y hh:mm:ss A");
var set_time = setInterval(() => {
    date = moment().format("dddd, MMMM DD, Y hh:mm:ss A");
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

// var buttons = $("saveBtn")
$(".saveBtn").on("click", function() {
    let element = $(this).closest("div[id]");
    let id = $(element).attr("id");
    let text_area = $(element).find("textarea");
    let task = $(element).find("textarea").val();
    let current_button = this;
    if($(text_area).val() === "")
    {
        $(current_button).removeClass("save_ok");
        $(current_button).removeClass("save_err");
    }
    
    if($(text_area).hasClass("past") == false)
    {
     save(id, task, current_button);
    }
 } );

 $("textarea").on("change", function(){
    var button = $(this).closest("div[id]").find(".saveBtn");
    var id = $(this).closest("div[id]").attr('id');
    var task = $(this).val();
    var same = samevalue(storage,id,task);
        if(!same)
        {
        $(button).removeClass("save_ok");
        $(button).removeClass("save_err");
        }
        else{
            $(button).addClass("save_ok");
        }
})

 var save = (id, task, button) => {
    storage = JSON.parse(localStorage.getItem("schedule")) || [];
    var data = {
        id: id,
        task: task
    };
    try {
        if(storage.length !== 0)
        {
            var position = inlist(storage, id);
                if(position != -1)
                {
                    if(task !== "")
                    {
                    storage[position].task = task;
                    }
                    else {
                        storage = removeitem(storage, position);
                    }
                }
                else {
                    if(task!== "")
                    {
                    storage.push(data);
                    }
                }
        }
        else{
            if(task!= "")
            {
            storage.push(data);
            }
        }
         localStorage.setItem("schedule", JSON.stringify(storage));
         if(storage.length !== 0 && task!== "")
         {
         $(button).addClass("save_ok")
         }
    }
    catch{
        alert("Error Saving!");
        $(button).addClass("save_err");
    }
};

var inlist = (array, id) => {

    for(let i = 0; i < array.length; i++){
        if(array[i].id === id)
        {
         return i   
        }
    }
    return -1
};

var samevalue = (array, id, task) => {

    for(let i = 0; i < array.length; i++){
        if(array[i].id === id)
        {
            if(array[i].task === task)
         return true   
        }
    }
    return false
};

var removeitem = (array, position) => {
    var new_array = [];
    for(let i = 0; i < array.length; i++)
    {
        if(i !== position)
        {
            new_array.push(array[i]);
        }
    }

    return new_array;
};

var load = () => {
    storage = JSON.parse(localStorage.getItem("schedule")) || [];
    // console.log(elements);
    if(storage.length !== 0)
    {
        for(let outer = 0; outer < storage.length; outer++)
        {
            for(let inner = 0; inner < array_rowsEl.length; inner++)
            {
                if($(array_rowsEl[inner]).attr('id') === storage[outer].id){
                    $(array_rowsEl[inner]).find("textarea").val(storage[outer].task);
                    $(array_rowsEl[inner])
                    .closest("div[id]")
                    .find(".saveBtn")
                    .addClass("save_ok");
                }
            }
        }
    }
}

load();
check_date(date);