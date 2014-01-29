var id = 0;



// VMware上のCentOS6で動作させたときの例
// 8888番ポートでクライアントの接続を待ち受ける
var ws = require('websocket.io');
var server = ws.listen(3000, function () {
  console.log('[ Server running ]');
});

// クライアントからの接続イベントを処理
server.on('connection', function(socket) {
    console.log("conecct");
    socket.send('{"type":"id","id":"'+id+'"}');
    id++;
    server.clients.forEach(function(client) {
	if (client!=null) {
	    client.send('{"type":"regist","id":"'+id+'"}');
	}
    });


  // クライアントからのメッセージ受信イベントを処理
  socket.on('message', function(data) {
    //console.log('[' + data + ']');
    
    // 受信したメッセージを全てのクライアントに送信する
    server.clients.forEach(function(client) {
	if (client!=null) {
	    client.send(data);
	}
    });
  });
});

var _PORT = 24603;
var _HOST = '192.168.7.183';
//var _HOST = '127.0.0.1';

var _dgram = require('dgram');
var _server = _dgram.createSocket('udp4');

_server.on('listening', function () {
    var address = _server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

_server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
   // io.sockets.emit('message', {value: message+""} );
});

_server.bind(_PORT, _HOST);