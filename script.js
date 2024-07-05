var serverconn = '';
var webvalue = '';
var webconn = '';
var webconnected = false;
        
        console.log(window.location.href)
async function fetchCellValue() {
	
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQdO0e7_vV7Vz_CGvvHSlq3LnbZzkfG9dRhK8X3cE3flxF7K7LRbkV2H4qyKWX0DPjrkuVaEUVceC-w/pubhtml?' + Date.now();


    try {
    console.log("aight")
	
        const response = await fetch(sheetUrl, { cache: 'no-store' });
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Assuming the cell you want is in the first table, first row, first cell (A1)
	
        const cellValue = doc.querySelector('table tbody tr td').innerText;
        console.log(cellValue)
       servervalue = cellValue;
       //servervalue = 'ae76defd-9fb7-482c-bd3b-370ddfe89319'
        
        
        
                // Function to dynamically load a script
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

        // Usage
        return new Promise((resolve, reject)=>{loadScript('https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js', function() {
            // Your code to use the dynamically loaded script
            console.log('Script loaded and executed.');
            // Assuming your script defines a function called `myFunction`
            var peer = new Peer();
             console.log('peer made');
            peer.on('open', function(id) {
            console.log(servervalue)
            console.log("1")
            
            function serverconnect(){
              console.log("conn attempt made")
              serverconn = peer.connect(servervalue);
              console.log("conn made")
              serverconn.on('open', function(){
              console.log("Server Connection Succeeded")
              
               serverconn.send({context:'EasyJSWebsiteRequest', query: window.location.href})
               serverconn.on('data', function(data){
               console.log(data)
               if(data.query != "closed"){
                webvalue = data.query;
               } else{
                alert("Website is Currently Closed")
               }

               })
              })
              serverconn.on('error', function(){
               console.log("Server Connection Failed")
               return false;
              })
              serverconn.on('close', function(){
                console.log("Server Connection Closed")
                webconn = peer.connect(webvalue);
                webconn.on('open', function(){
                  console.log("Website Connection Succeeded!")
                  resolve()
                  return true;
                })
                webconn.on('error', function(){
                  console.log("Website Connection Failed.")
                  return false;
                })
              })
            }
            
            if(webvalue == ''){
              console.log("2")
            	return serverconnect();
            }else{
            	webconn = peer.connect(webvalue);
              webconn.on('open', function(){
                console.log("3")
                console.log("Website Connection Succeeded!")
                resolve()
              })
              webconn.on('error', function(){
                console.log("Website Connection From Previous ID Failed, Checking For New ID")
                return serverconnect();
                
              })
              }
              })
            })
            
            }
            )
            

              
						

    } catch (error) {
        console.error('Could not get server information:', error);
}
}



async function Ask(context, query, stayconnect) {
    stayconnect = stayconnect || false;
  console.log("Ask1")
    if (!webconnected) {
        await fetchCellValue();
    }
      console.log("Ask2")

    return new Promise((resolve, reject) => {
        webconn.send({ context: context, query: query });

        // Wrap event listeners in promises
        const onData = new Promise((res, rej) => {
            webconn.on("data", function (data) {
            console.log("HORRAY")
              console.log("Ask3")
                if (data.context == context) {
                    if (!stayconnect) {
                        webconn.close();
                        console.log("Connection closed");
                    }
                    
                    res(data.query);
                }
            });
            webconn.on("error", function () {
                if (!stayconnect) {
                    webconn.close();
                    console.log("Connection closed");
                }
                rej();
            });
        });

        // Handle resolving and rejecting the promise
        onData.then((data)=>resolve(data)).catch(reject);
    });
}

