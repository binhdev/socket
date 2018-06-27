var express = require('express');
var app = express();
app.use(express.static("./public"));
app.set('view engine','ejs');
app.set('views','./views');
var server = require("http").Server(app);
var io = require('socket.io')(server);

server.listen(3000);
x = 0;
class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

io.on("connection", socket => {
    console.log("New client connected"), setInterval(
      () => randomPoint(socket), 25
    );
    socket.on("disconnect", () => console.log("Client disconnected"));
  });
  
  const randomPoint = async socket => {
    try {
      var points = [];
      for(i = 0; i < 25; i++){
        x += 0.1;
        y = Math.sin(x);
        var point = new Point(x, y);
        points.push(point);
      }
        socket.emit("server-send-data", {points: JSON.stringify(points) });
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
  };

  app.get('/', function(req, res){
      res.render('trangchu');
  });