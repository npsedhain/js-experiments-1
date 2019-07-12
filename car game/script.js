const BodyWidth=300;
const BodyHeight=700;
var body=document.getElementById('body-canvas');
body.width=BodyWidth;
body.height=BodyHeight;
let offset =0;
var score=0;
var updateCar=[];
var context= body.getContext('2d');
context.fillStyle='black';
context.fillRect(0,0,body.width,body.height);
var bool=false;

if(localStorage.getItem('carkey')==null)
{
    localStorage.setItem('carkey',`0`);
}

bodyLayout();

function initialPage()
{
    
    context.font = "30px Arial";
    context.fillStyle='#2dd';
    context.fillText('WANT TO START?',20,350);
    context.font = "20px Arial";
    context.fillStyle='white';
    context.fillText('Press \"Space\" key To Start',27,390);
    context.fillStyle='red';
    context.fillText('\'A\'=> Left',100,420);
    context.fillText('\'D\'=> Right',100,450);
    document.addEventListener('keydown',(event)=>{
        if(event.code=='Space'){
            starter();
        }
    });
}

initialPage();

var player;
var push;

function starter()
{

player=new Cars('isplayer');
updateCar.push(player);
 
push=setInterval(()=>{
var car=new Cars('isenemy'); 
updateCar.push(car);   
},4000);
mainLoop();

}


var animator;

function mainLoop()
{
    bodyLayout();
    player.draw();
    animator=window.requestAnimationFrame(mainLoop);
    offset += 5;
    for(i=updateCar.length-1;i>=0;i--)
    {
        updateCar[i].move();
        updateCar[i].draw();
        if(i!=0){

        if(updateCar[i].collision(player))
        {
            restart();
            break;
        }
        updateCar[i].delcheck(i);
        }

    }

    
}



function bodyLayout()
{
    
    context.fillStyle='black';
    context.fillRect(0,0,body.width,body.height);
    context.moveTo(BodyWidth/3,0);
    context.lineTo(BodyWidth/3,BodyHeight);
    context.moveTo(2*(BodyWidth/3),0);
    context.lineTo(2*(BodyWidth/3),BodyHeight);
    context.setLineDash([30,35]);
    context.lineDashOffset = offset;
    //console.log(offset);
    context.strokeStyle='white';
    context.stroke();
    context.font = "20px Arial";
    context.fillStyle='white';
    context.fillText(score,10,30);
}


function restartLayout(){
    //context.clearRect(0,0,BodyWidth,BodyHeight);
    //context.fillStyle='black';
    //context.fillRect(0,0,body.width,body.height);
    context.font = "45px Arial";
    context.fillStyle='yellow';
    context.fillText('Game Over!!!',16,270);
    context.font = "25px Arial";
    context.fillStyle='red';
    context.fillText('High Score:'+localStorage.getItem('carkey'),75,350);
    context.fillText('Your Score:'+score,75,310);
    context.fillStyle='#2dd';
    context.fillText('WANT TO RESTART?',25,390);
    context.fillStyle='white';
    context.font = "15px Arial";
    context.fillText('Press \"R\" key To Start',70,430);
}


function restart()
{   
    console.log(player);
    if(score>localStorage.getItem('carkey')){
        localStorage.removeItem('carkey');
        localStorage.setItem('carkey',`${score}`);
       
    }
    restartLayout();
    
    
    document.onkeydown=function(event){
        if(event.code=='KeyR'){
            clearInterval(push);
            updateCar=[]; 
            score=0;      
            starter();
        }

    }
}


