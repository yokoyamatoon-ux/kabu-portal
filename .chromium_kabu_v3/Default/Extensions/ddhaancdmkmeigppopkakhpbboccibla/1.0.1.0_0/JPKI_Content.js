var extensionVersion = chrome.runtime.getManifest().version;

var url = location.href;

document.addEventListener("launchJPKIApp",
   function(event) {
         var receiptmessage = event.detail;
         var rlen = receiptmessage.length;
         var getparameters = `,"version":"` + extensionVersion + `","url":"` + url + `"}`;
         var grantmessage = receiptmessage.substr(0,rlen - 1) + getparameters;
         //var sendmessage = Object.assign(receiptmessage, grantmessage);
         chrome.runtime.sendMessage({
            type: "launch",
            message: grantmessage
         },
         function(response) {
            if(response != null) {
               var cevent = new CustomEvent("recvJPKIMsg",{"bubbles":true,"detail":JSON.stringify(response)});
            } else {
               var replacer = ['mode'];
               try {
                  var json = JSON.parse(event.detail);
                  var obj = JSON.stringify(json, replacer, "\t");
                  var jsonMessage = JSON.parse(obj);
                  jsonMessage.result = "1";
                  jsonMessage.errcode = "EW004JC200";
                  
               } catch(e) {
                  var jsonMessage = {"result":"1","errcode":"EW004JC200"};
               }
               var cevent = new CustomEvent("recvJPKIMsg",{"bubbles":true,"detail":JSON.stringify(jsonMessage)});
            }
            window.document.dispatchEvent(cevent);
         });
   }, false);

window.addEventListener("beforeunload", event => {
   chrome.runtime.sendMessage({type: "close", message: "05"}, res => {});
}, false);