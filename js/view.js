$(function() {
  var stageWidth;
  var stageHeight;
  var context = $("canvas")[0].getContext('2d');
  var objectList;
  var timeout;
  var isMouseOnStage = false;
  var mouseX = 0;
  var mouseY = 0;
  var stats;
  
  var prms = {
    fps: 60,
    dotCount: 1000,
    dotV: 5,
    circleRadius: 50,
    dotRotationRandom: 0.1,
    dotRotationMouse: 10
  }
  
  function init(){
    
    // createStats
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    //document.body.appendChild( stats.domElement );

    // MouseEvent
    $("#first-view").bind("mousemove",function(e){
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOnStage = true;
    }).bind("mouseleave touchend touchcancel",function(e){
      isMouseOnStage = false;
    }).bind("touchstart",function(e){
       var touches = e.touches;
      if(touches[0]){
        var touch = touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;
        isMouseOnStage = true;
      }
    });

    $(window).resize(reset);
    reset();
  }
  
  
  function reset(){
    
    // CanvasFitting
    stageWidth = $("#first-view").width();
    stageHeight = $("#first-view").height();
    $("#first-view canvas").attr("width",stageWidth);
    $("#first-view canvas").attr("height",stageHeight);
    
    // resetTimer
    if(timeout){
      clearTimeout(timeout);
    }
    timeout = setTimeout(onEnterFrame, 1000/prms.fps);
    
    // createObjects
    objectList = [];
    for(var i = 0; i < prms.dotCount; i++){
      var x = Math.random() * stageWidth;
      var y = Math.random() * stageHeight;
      objectList.push(new Dot(x,y));
    }
  }
  
  function Dot(_x, _y){
    var hue = Math.random() * 360;
    this.color = "hsl("+Math.round(hue)+", 70%, 70%)";
   // console.log(this.color);
    this.x = _x;
    this.y = _y;
    this.v = prms.dotV;
    this.aRotation = 0;
    this.randomRotation = (Math.random() - 0.5)/20;
    
    this.rotation = Math.PI * 2 * Math.random();
    
  }
  Dot.prototype.tick = function(){
    
    // マウス位置に合わせて方向を変える
    if(isMouseOnStage){
      var distance = getDistance(this.x, this.y, mouseX, mouseY);
      if(distance > prms.circleRadius){
        
        this.aRotation = ((Math.atan2(mouseY - this.y,mouseX - this.x)) - this.rotation) % (Math.PI*2);
        if(this.aRotation > Math.PI){
          this.aRotation -= Math.PI * 2;
        }else if(this.aRotation < -Math.PI){
          this.aRotation += Math.PI * 2;
        }
        this.aRotation *= prms.dotRotationMouse / distance;
        this.rotation += this.aRotation;
        this.rotation += (Math.random() - 0.5) * Math.PI * prms.dotRotationRandom;
      }
    }
    
    //ランダムに方向を変える
    this.rotation += this.randomRotation;
    
    this.x += Math.cos(this.rotation) * this.v;
    this.y += Math.sin(this.rotation) * this.v;
    
    if(this.x < 0){
      // bounceLeftWall  
      this.rotation = Math.PI - this.rotation;
    }else if(this.x > stageWidth){
      // bounceRightWall
      this.rotation = Math.PI - this.rotation;
    }
    if(this.y < 0){
      this.rotation = -this.rotation;
      // bounceTopWall  
    }else if(this.y > stageHeight){
      this.rotation = -this.rotation;
      // bounceBottomWall
    }
    
  }
  
  function onEnterFrame(){
    stats.begin();
    
    var objectLen = objectList.length;
    var dot;
    
    context.fillStyle = "rgba(0,0,0,0.06)";
    context.fillRect(0,0,stageWidth,stageHeight);
    
    context.lineWidth = 0;
    for (var i = 0; i < objectLen; i++){
      dot = objectList[i];
      
    context.beginPath();
    context.strokeStyle = dot.color;
      
      context.moveTo(dot.x, dot.y);
      
      dot.tick();
      
      context.lineTo(dot.x, dot.y);
    context.stroke();
    }
    
    
    stats.end();
    
    // 次フレーム呼び出し
    timeout = setTimeout(onEnterFrame, 1000/prms.fps);
  }
  function getDistance(x1, y1, x2, y2){
    var xDist = x2 - x1;
    var yDist = y2 - y1;
    return Math.sqrt(xDist * xDist + yDist * yDist);
  }

  setTimeout(function(){
    init();
  },1000);
});