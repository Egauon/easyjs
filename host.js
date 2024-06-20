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


	    conn.on('data', function(data){
      console.log(data)
    	 if(respondmap[data.context] != undefined){
    const result = respondmap[data.context](data.query);
    Promise.resolve(result).then((resolvedResult) => {
        conn.send({context: data.context, query: resolvedResult})
    }).catch((error) => {
        // Handle any errors here
    });
       }
    	})



  })
  })
  
  })



















