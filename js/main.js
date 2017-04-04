var now = new Date();
var day_array = [1, 2, 4, 8, 16];
console.log('This application was made because of the scheduling system at our school is so shit.')
console.log('The images are not generated by me, they are being generated by novasoftware. They are the original schedule application creators')
console.log('Sincerly: Vorap, from [TheCorruptVoxel] team, ##TheCorruptVoxel on freenode')

function site_guide() {
  $('#schedule_container').append("<p>Welcome to Voraschem, the improved version of Novasoftware's 'Novaschem'. <br/><br/> To get started, please enter your four charachter long class ID and hit the submit button! <br/> This site will then store your class ID in your device and automatically load your schedule for the current day automatically! <br/><br/> Please report any bugs or give feed back <a href='https://github.com/TRSGuy/Improved-Novaschem/issues'>here</a>.  Thanks, and enjoy your stay</p>")
}

function time() {
    Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    };
    var week_number = (new Date()).getWeek();
    var day_number = now.getDay() - 1;
    var array_day = day_array[document.getElementById('day').value];
    return [week_number, array_day, day_number];
}

window.onresize = function(event) {
    main();
};

function main() {
    //This will be the main function that is going to be used for getting all the values and calling differnet functions. Will be trying to make as many small functions as possible so that I easily can reuse them
    var student_id = $('#person_id').val();
    if(student_id == '') {
      $("#submit_label").text("Please enter your class ID First")
    }
    else if (student_id.length < 4) {
      $("#submit_label").text("Please make sure that your class id is correct")
    }
    else {
      $("#submit_label").text("")
      var width = $("#schedule_container").width();
      var height = $('#schedule_container').height();
      var time_array = time();
      var day = time_array[1];
      var week = time_array[0];
      var school_id = '58700';
      document.cookie = "studentid=" + student_id +"; expires=Thu, 18 Dec 2018 12:00:00 UTC";
      grab_sched_links(school_id, student_id, week, day, height, width);
    }
};

function grab_sched_links(school_id, student_id, week, day, height, width) {
    var link = schedule_api(school_id, student_id, week, day, height, width);
    append_schedule(link, '#schedule_container')
}

function append_schedule(link, tag_id) {
    $(tag_id).attr('src', link);
}

function schedule_api(school_id ,user_id, week, day, height, width) {
    var schedule_link = 'http://www.novasoftware.se/ImgGen/schedulegenerator.aspx?format=png&schoolid=' + school_id + '/sv-se&type=-1&id=' + user_id + '&period=&week=' + week + '&mode=0&printer=0&colors=32&head=1&clock=1&foot=1&day=' + day + '&width=' + width + '&height=' + height + '&maxwidth=' + width + '&maxheight=' + height;
    return schedule_link;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return false;
}
window.onload = function() {
    if (time()[2] > 4) {
      $('#day').val(0);
    }
    else {
      $('#day').val(time()[2]);
    }
    if (getCookie('studentid') !== false ) {
        var tmptmp = $('#person_id').val(getCookie('studentid'));
        main();
    }
    else if (getCookie('studentid') == false) {
      site_guide();
    }
};

// TODO: HACK: PLEASE REMOVE BEFORE MERGING WITH THE MASTER BRANCH! IT'S FOR DEVELOPING PURPOUSES ONLY
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
