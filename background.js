function load_func(filename) {
    console.log('In background');
    var contents = "";
    var links = [];
    function onInitFs(fs) {
      fs.root.getFile(filename, {}, function(fileEntry) {
        fileEntry.file(function(file) {
          var reader = new FileReader();
          reader.onloadend = function(e) {
            contents = this.result;
            console.log('Contents are : ' + contents);
            links = contents.split(" ");
            console.log('Links : ' + links[0]);
            var i;
            for (i = 0; i < links.length; i++) {
              chrome.tabs.create({"url": links[i]});
            }
          };
          reader.readAsText(file);
        }, errorHandler);
      }, errorHandler);

    }  
    
    function errorHandler(e) {
       var msg = '';

       switch (e.code) {
         case DOMError.QUOTA_EXCEEDED_ERR:
           msg = 'QUOTA_EXCEEDED_ERR';
           break;
         case DOMError.NOT_FOUND_ERR:
           msg = 'NOT_FOUND_ERR';
           break;
         case DOMError.SECURITY_ERR:
           msg = 'SECURITY_ERR';
           break;
         case DOMError.INVALID_MODIFICATION_ERR:
           msg = 'INVALID_MODIFICATION_ERR';
           break;
         case DOMError.INVALID_STATE_ERR:
           msg = 'INVALID_STATE_ERR';
           break;
         default:
           msg = 'Unknown Error' + e.code ;
           break;
      };

      console.log('Error: ' + msg);
    }
    window.webkitRequestFileSystem(window.TEMPORARY, 5*1024*1024, onInitFs, errorHandler);
}

function record_func() {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    console.log('In background');
    var text = "";
    var activeTab;
    var dt = new Date();
    var utcDate = dt.toString();
    utcDate = utcDate.replace(/\s+/g, '-');
    utcDate = utcDate.replace(/:/g, '-');
    var filename = utcDate + ".txt";
    console.log(filename);
    tabs.forEach(function(tab) {
        if (tab.active) { activeTab = tab }
        text += tab.url + " ";
    });

    function onInitFs(fs) {
      fs.root.getFile(filename, {create: true}, function(fileEntry) {
        fileEntry.createWriter(function(fileWriter) {
          fileWriter.onwriteend = function(e) {
            console.log('Write completed.');
          };
          fileWriter.onerror = function(e) {
            console.log('Write failed : ' + e.toString());
          };
          console.log('Before');
          var blob = new Blob([text], {type : 'text/plain'});
          console.log('After');
          fileWriter.write(blob);
        }, errorHandler);

      }, errorHandler);

    }

    function errorHandler(e) {
       var msg = '';

       switch (e.code) {
         case DOMError.QUOTA_EXCEEDED_ERR:
           msg = 'QUOTA_EXCEEDED_ERR';
           break;
         case DOMError.NOT_FOUND_ERR:
           msg = 'NOT_FOUND_ERR';
           break;
         case DOMError.SECURITY_ERR:
           msg = 'SECURITY_ERR';
           break;
         case DOMError.INVALID_MODIFICATION_ERR:
           msg = 'INVALID_MODIFICATION_ERR';
           break;
         case DOMError.INVALID_STATE_ERR:
           msg = 'INVALID_STATE_ERR';
           break;
         default:
           msg = 'Unknown Error' + e.code ;
           break;
      };

      console.log('Error: ' + msg);
    }
    window.webkitRequestFileSystem(window.TEMPORARY, 5*1024*1024, onInitFs, errorHandler);
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action", "URL" : text });
  });
}

var names = [];

function file_names(display) {
    console.log('In background fetching names');
    function onInitFs(fs) {
      var dirReader = fs.root.createReader();
      var entries = [];
	
      var readEntries = function() {
        dirReader.readEntries (function(results) {
          if (!results.length) {
            for (i = 0; i < entries.length; i++) {
              names[i] = entries[i].name;
            }
            console.log('Array : ' + names);
            display();
          } else {
            entries = entries.concat(results);
            readEntries();
          }
        }, errorHandler);
      };

      readEntries(); // Start reading dirs.
    }

    function errorHandler(e) {
       var msg = '';

       switch (e.code) {
         case DOMError.QUOTA_EXCEEDED_ERR:
           msg = 'QUOTA_EXCEEDED_ERR';
           break;
         case DOMError.NOT_FOUND_ERR:
           msg = 'NOT_FOUND_ERR';
           break;
         case DOMError.SECURITY_ERR:
           msg = 'SECURITY_ERR';
           break;
         case DOMError.INVALID_MODIFICATION_ERR:
           msg = 'INVALID_MODIFICATION_ERR';
           break;
         case DOMError.INVALID_STATE_ERR:
           msg = 'INVALID_STATE_ERR';
           break;
         default:
           msg = 'Unknown Error' + e.code ;
           break;
      };

      console.log('Error: ' + msg);
    }
    window.webkitRequestFileSystem(window.TEMPORARY, 5*1024*1024, onInitFs, errorHandler);
    console.log(names);
}
