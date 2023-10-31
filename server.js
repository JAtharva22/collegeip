Server.js
const net=require('net')
const server = net.createServer();
server.on("connection",(socket)=>{
console.log("new client connection is 
made",socket.remoteAddress+":"+socket.remotePort);
socket.on("data",(data)=>{
console.log(data.toString());
})
socket.once("close",()=>{
console.log("Client connection is closed");
})
socket.on("error",(err)=>{
console.log("error")
})
socket.write('server:Hello connection successfully made<br>')
})
server.on("error",(err)=>{
if(err==='EADDRINUSE')
{
console.log('Address in use')
setTimeout(()=>{
server.close()
server.listen(PORT,HOST)
},1000)
}
else{
console.log('server failed')}
})
server.listen(9000,()=>{
console.log('opened server on %j',server.address().port)
})
const net = require('net'); 
const readline = require('readline'); 
const rl = readline.createInterface({ 
input: process.stdin, 
output: process.stdout 
}); 
const client = net.createConnection({ port: 9000 }, () => { 
console.log('CLIENT: I connected to the server.'); 
client.write('CLIENT: Hello this is client!'); 
}); 
client.on('data', (data) => { 
console.log(data.toString()); 
//client.end(); 
}); 
client.on('end', () => { 
console.log('CLIENT: I disconnected from the server.'); 
}) 
rl.on('line', (input) => { 
client.write(`CLIENT: ${input}`); 
});

