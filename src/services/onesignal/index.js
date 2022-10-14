export const handleSend = (title,message) => {
   
   var data = {
     app_id: "bd5fbb76-3c53-4caf-9843-777d23f84a17",
     headings: { "en": title },
     contents: { "en": message},
     included_segments: ["All"]
   };

   var headers = {
     "Content-Type": "application/json; charset=utf-8",
     "Authorization": "Basic NWIxYWU3OWUtODgwMS00NzVmLWE3MmYtZTZmYjNjNDljMjdi"
   };

   var options = {
     host: "onesignal.com",
     port: 443,
     path: "/api/v1/notifications",
     method: "POST",
     headers: headers
   };

   var https = require('https');
   var req = https.request(options, function (res) {
     res.on('data', function (data) {
         console.log(data)
     });
   });

   req.on('error', function (e) {
    console.log(data)
   });

   req.write(JSON.stringify(data));
   req.end();
 }