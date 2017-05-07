function record() {
  chrome.extension.getBackgroundPage().record_func();
}

function load(file_name) {
  chrome.extension.getBackgroundPage().load_func(file_name);
}

function display() {
  var names = chrome.extension.getBackgroundPage().names;
  var droplist = document.getElementById("files");
  var i = 0;
  for ( i = 0; i < names.length; i++) {
    var option = document.createElement("option");
    option.text = names[i];
    droplist.add(option);
  }
}

function get_file_names() {
  chrome.extension.getBackgroundPage().file_names(display);
}

document.addEventListener('DOMContentLoaded', function() {
    var button1  = document.getElementById('record');
    var button2  = document.getElementById('load');
    var button3  = document.getElementById('open');
    button1.addEventListener('click', function() {
        record();
    });
    button2.addEventListener('click', function() {
      get_file_names();
    });
    
    button3.addEventListener('click', function() {
    var droplist = document.getElementById('files');
    var file_name = droplist.options[droplist.selectedIndex].text;
    load(file_name);
    });
});


