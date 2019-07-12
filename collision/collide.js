var GAME_FRAME_RATE =16;
var appContainer = document.getElementById('parentbox');
appContainer.style.width=800+'px';
appContainer.style.height=800+'px';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

new GameAnimation(appContainer).init();

function GameAnimation(parentElement) {
    var boxes = [];
    this.parentElement = parentElement;
    
    this.init = function() {
      console.log('init',this.parentElement);
      for(var i =1; i<=40; i++) {
        var box = new Box(getRandomInt(15,200),getRandomInt(15,200), this.parentElement);
        box.init();
        box.setcolor(getRandomInt(0,220), getRandomInt(0, 220),getRandomInt(0, 220))
        box.setmass();
        var collide;
        do{
            box.setPosition(getRandomInt(50,500), getRandomInt(10, 400));
            collide = false;
            for(var j = 0; j < boxes.length; j++){
                let anotherbox = boxes[j];
                let posx = (box.x + box.random/2) - (anotherbox.x + anotherbox.random/2);
                let posy = (box.y + box.random/2) - (anotherbox.y + anotherbox.random/2);
                let distance = Math.sqrt(Math.pow(posx, 2) + Math.pow(posy, 2)); 
                if(distance < (box.random + anotherbox.random) / 2 +7){
                    collide = true;
                    break;
                }
            }
        }while(collide);
        box.draw();
        boxes.push(box);
      } 
       setInterval(this.start.bind(this), GAME_FRAME_RATE);
    }
    
    this.start = function() {
      boxes.forEach(function(box, oldindex) {
        box.move();
        box.draw();
        box.boundarycollision();
        boxes.forEach(function(anotherbox, anotherindex) {
          if(oldindex == anotherindex){
              return;
          }
          let posx = (box.x + box.random/2) - (anotherbox.x + anotherbox.random/2);
          let posy = (box.y + box.random/2) - (anotherbox.y + anotherbox.random/2);
          let distance = Math.sqrt(Math.pow(posx, 2) + Math.pow(posy, 2)); 
          if(distance < (box.random + anotherbox.random) / 2){
              let tempX, tempY;
              tempX = box.dx;
              tempY = box.dy;
              box.dx = anotherbox.dx;
              box.dy = anotherbox.dy;
              anotherbox.dx = tempX;
              anotherbox.dy = tempY;
          }
      });
      });
    }
    
  }

  
function Box(x, y, parentElem) {
    this.x = x;
    this.y = y;
    this.element = null;
    this.dx =Math.random()<0.5?-2:2;
    this.parentElement = parentElem;
    this.dy =Math.random()<0.5?-2:2;
    
    this.init = function() {
      this.element = document.createElement('div');
      this.element.className = 'small-boxes';
      console.log(this.element)
      this.element.onclick=function(event){
        event.target.style.display='none';
      };
      this.parentElement.appendChild(this.element);
      
      return this;
    }
    
    
    this.move = function() {
      this.x += this.dx;
      this.y += this.dy;
      this.boundarycollision.bind(this);
     
      
      
    }

    
    this.draw = function() {
      this.element.style.top = this.y + 'px';
      this.element.style.left = this.x + 'px';
    }
    
    this.setPosition = function(x, y) {
      this.x = x;
      this.y = y;

    }

    this.setmass=function(){
      this.random=getRandomInt(10,25);
      this.element.style.width=this.random+'px';
      this.element.style.height=this.random+'px';
      this.boundarycollision.bind(this);
      
    }

    this.boundarycollision=function(){
      if(parseInt(this.x,10)>(parseInt(appContainer.style.width,10)-parseInt(this.element.style.width,10)))
      {
        this.dx*=-1;
        this.x=parseInt(appContainer.style.width)-parseInt(this.element.style.width);
      }
      if(parseInt(this.x)<=0){
        this.dx*=-1;
        this.x=0;
      }
      if(parseInt(this.y)>(parseInt(appContainer.style.height,10)-parseInt(this.element.style.height,10)))
      {
        this.dy*=-1;
        this.y=parseInt(appContainer.style.height)-parseInt(this.element.style.height);

      }
      if(parseInt(this.y)<=0)
      { 
        this.dy*=-1;
        this.y=0;
      }
      
    }
    
    

    this.setcolor=function(r,g,b){
      this.element.style.backgroundColor=`rgb(${r},${g},${b})`
    }

    
  }
  
  
  
  
  
 