module.exports = function(io){

  var express = require('express');
  var router = express.Router();

  
  const history = [];

  
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Collaborative Drawing' });
  });

  

  io.on('connection',(socket)=>{
    
    console.log('A user connected');

    
    console.log('Fetching new user"s canvas')
    for(let item of history)
      socket.emit('update_canvas',item);

    
    socket.on('update_canvas',function(data){

      
      history.push(data);

      
      socket.broadcast.emit('update_canvas',data);
    });
  })
  
  return router;
}