var respondmap = {}
var EasyJS = {};






function Get(name, location){
	var previous = localStorage.getItem(name);
  if(previous != undefined){
  	location = previous
    return true;
  }else{
  	return false;
  }
}

function Save(name, location){
	localStorage.setItem(name, location);
  
}






function Respond(context, funct){

	respondmap[context] = funct;

}



 function loadScript(url, callback) {
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = url;

          // Bind the event to the callback function.
          // For older browsers, use `onreadystatechange`.
          // For modern browsers, use `onload`.
          script.onreadystatechange = function () {
            if (this.readyState === 'complete') {
              
              return callback();
            }
          };

          script.onload = callback;
          

          // Append the script to the head
          document.head.appendChild(script);
        }





loadScript('https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js', function(){



var peer = new Peer()
peer.on('open', function(id) {
	console.log('My peer ID is: ' + id);
  EasyJS["id"] = id;
  
  peer.on('connection', function(conn) {


conn.on('data', async function(data) { // Make this function async
      console.log(data);
      datastr = JSON.stringify(data);
      const date = new Date();
          datestring = "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] "
          document.getElementById("console").innerHTML += '<div style="width:100%;margin:1%;border-bottom:solid;border-color:rgba(0,0,0,.1);">' + datestring + '<span style="font-weight: bold;">' + datastr + '</span></div>'

      if (respondmap[data.context] != undefined) {
        try {
          const result = await respondmap[data.context](data.query); // Await the async function
          console.log("Result: " + result);
          const date = new Date();
          datestring = "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] "
          document.getElementById("console").innerHTML += '<div style="width:100%;margin:1%;border-bottom:solid;border-color:rgba(0,0,0,.1)">' + datestring + result + '</div>'
          conn.send({ context: data.context, query: result });
        } catch (error) {
          console.error("Error processing data:", error);
        } finally {
          conn.close();
        }
      }
    });



  })
  })
  
  })

















