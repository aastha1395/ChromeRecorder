chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('In background');
    var contents = "";
    var links = [];
    function onInitFs(fs) {
      fs.root.getFile('log.txt', {}, function(fileEntry) {
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
});

