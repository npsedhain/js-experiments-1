BodyWidth=350;
BodyHeight=600;
var body=document.getElementById('body-canvas');
body.width=BodyWidth;
body.height=BodyHeight;
var context= body.getContext('2d');
context.fillStyle='black';
var imageObj = new Image();
imageObj.src='images/background.png'
var start=new Image();
start.src='images/start.png';
var pipeup=new Image();
pipeup.src='images/uppipe.jpg'
var pipedown=new Image();
pipedown.src='images/downpipe.jpg'
var midflap=new Image();
midflap.src='images/bird.png'
var base=new Image();
base.src='images/base.png'
var over=new Image();
over.src='images/gameover.png';
var die=new Audio('images/die.wav');
var wing=new Audio('images/wing.wav');
var point=new Audio('images/point.wav');



imageObj.onload = () => {
    context.drawImage(imageObj,0,0,body.width,body.height);
};
context.fillRect(0,0,body.width,body.height);

start.onload = () => {

    context.drawImage(start,80,120,184,264);
}



document.addEventListener('click',starter);

var score=0;
var bird;
if(localStorage.getItem('key')==null){
localStorage.setItem('key',`0`);
}


var interval;


function starter()
{

bird=new Bird();    
document.removeEventListener('click',starter);
context.drawImage(imageObj,0,0,body.width,body.height);
context.drawImage(base,0,500,BodyWidth,BodyHeight-500);
pipeArray=[]

pipe1=new Pipe()
pipeArray.push(pipe1);


document.onclick=()=>{
    
        //bird.y-=65;
        bird.speed=-4;
        wing.play();
    
}

interval=setInterval(()=>{

    var pipe=new Pipe();
    pipeArray.push(pipe);
    
},4000);

motion();

}


function newCanvas(){
    context.clearRect(0,0,body.width,body.height);
    context.fillStyle='black';
    //context.fillRect(0,0,body.width,body.height);
    context.drawImage(imageObj,0,0,body.width,body.height);
    context.drawImage(base,0,500,BodyWidth,BodyHeight-500);
    bird.birdDraw();
}


var bg=0;
var baseSpeed=0.3;
var animator;
function motion(){
    animator=window.requestAnimationFrame(motion);
    newCanvas();
    for(var i=pipeArray.length - 1 ; i >= 0 ; i--){
        pipeArray[i].move();
        pipeArray[i].pipeDraw();
        context.drawImage(base,bg,500,BodyWidth,BodyHeight-500)
        context.drawImage(base,bg+BodyWidth,500,BodyWidth,BodyHeight-500)
        bg=bg-baseSpeed;
        if (bg<-200){
            bg=0;
        }
        
        if(points(pipeArray[i],bird)){
            
            gameOver();

            break;
        }
        
    }
    bird.move();
}


function gameOver(){
    context.drawImage(over,90,220,170,70);
    context.font = "20px Arial";
    context.fillStyle='white';
    
    if(score>localStorage.getItem('key')){
        console.log(score);
        
        localStorage.removeItem('key');
        localStorage.setItem('key',`${score}`);
       
    }
    context.fillStyle='white';
    context.fillText('High Score:'+localStorage.getItem('key'),115,320);
    context.fillText('Press \'R\' to restart',95,350);
    document.onkeydown=function(event){
        if(event.code=='KeyR'){
            pipeArray=[];
            score=0;
            clearInterval(interval);
            starter();
        }
    }
}


