module.exports = (io) => {
  io.on('connection', (socket) => { // 웹소켓 연결 시
    console.log('Socket initiated!');
    // socket.on('newScoreToServer', (data) => { // 클라이언트에서 newScoreToServer 이벤트 요청 시
    //   io.emit('newScoreToClient', data);
    // });
    // Join Room
    socket.on('join:room', function(data) {
      console.log("join");
      console.log(data);

      socket.join('room' + data.roomId);
    });
    // Broadcast to room
    socket.on('send:message', function(data) {
      console.log("send");
      console.log(data);
      console.log(socket.id);
      console.log(data.roomId);
      socket.join('room' + data.roomId);
      io.sockets.in('room' + data.roomId).emit('send:message', data.message);
    });


  });
};
