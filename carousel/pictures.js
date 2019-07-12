var parentBox= document.getElementsByClassName('carousel-image-wrapper');
var container= document.getElementsByClassName('carousel-container');



function arrowDiv(division,leftPosition){
    container[0].appendChild(division);
    division.style.position='absolute';
    division.style.backgroundColor='gray';
    division.style.zIndex='5';
    division.style.top=200+'px';
    division.style.left=leftPosition+'px';
}

var leftDiv=document.createElement('div');
var rightDiv=document.createElement('div');

arrowDiv(leftDiv,0);
arrowDiv(rightDiv,460);


var leftClick = document.createElement("img");
leftClick.setAttribute("src", "./images/left-arrow.png");
leftClick.setAttribute("height", "70");
leftClick.setAttribute("width", "40");
leftClick.setAttribute("alt", "left-arrow"); 
leftDiv.appendChild(leftClick);


var rightClick = document.createElement("img");
rightClick.setAttribute("src", "./images/right-arrow.png");
rightClick.setAttribute("height", "70");
rightClick.setAttribute("width", "40");
rightClick.setAttribute("alt", "right-arrow");
rightDiv.appendChild(rightClick);


var bulletDiv=document.createElement('div');
container[0].appendChild(bulletDiv);
bulletDiv.style.position='absolute';
bulletDiv.style.zIndex='5';
bulletDiv.style.top=475+'px';
bulletDiv.style.left=220+'px';

var buttonArray=[];

function bulletPoints(){
    
    button = document.createElement("button");
    button.style.height=10+'px';
    button.style.width=10+'px';
    button.style.marginRight=3+'px';
    button.style.borderRadius='50%';
    bulletDiv.appendChild(button);
    buttonArray.push(button);
    return button;

}


button1=bulletPoints();
button2=bulletPoints();
button3=bulletPoints();



new Image(parentBox).layout();



function Image(parentBox)
{

    this.parentBox=parentBox[0];
    var i=0;
    var imageChanger;
    
    leftClick.onclick=()=>
    {
        if( i!=0)
        {   clearInterval(imageChanger);
            buttonArray[i].style.backgroundColor='lightgray';
            buttonArray[i-1].style.backgroundColor='black';
            this.animateImage(i,i-1);
            
            i=i-1;
            
        }
        
    }

    rightClick.onclick=()=>
    {
            if(i!=2)
            {
             clearInterval(imageChanger);
             buttonArray[i].style.backgroundColor='lightgray';
             buttonArray[i+1].style.backgroundColor='black';
             this.animateImage(i,i+1);
                i=i+1;
            }
        }
    this.layout=function(){
        this.parentBox.style.marginLeft=0+'px';
        this.imageSlider();
        buttonArray[0].style.backgroundColor='black';
        
        
    }
    
    this.imageSlider=function()
    {   
        
        imageChanger=setInterval(()=>
            {
             
             index=i;
             nextIndex=(i+1)%3;
             clearInterval(imageChanger);
             this.animateImage(index,nextIndex);
             i=(i+1) % 3;

            
      
      
    
        },2000);

    }
    
    
    this.animateImage=function(ind,newInd)
    {   
                buttonArray[ind].style.backgroundColor='lightgray';
                buttonArray[newInd].style.backgroundColor='black';
                   let animation= setInterval(()=>{

                       if(newInd>ind){
                            this.parentBox.style.marginLeft=parseInt(this.parentBox.style.marginLeft,10)-((newInd-ind)*500)/100+'px';
                            if(Math.abs(parseInt(this.parentBox.style.marginLeft,10))>=newInd*500){
                                
                                clearInterval(animation);
                                this.imageSlider();

                            }
                       }
                       else if(newInd<ind)
                       {
                        this.parentBox.style.marginLeft=parseInt(this.parentBox.style.marginLeft,10)-((newInd-ind)*500)/100+'px';
                        if(Math.abs(parseInt(this.parentBox.style.marginLeft,10))<=newInd*500){
                            
                            clearInterval(animation);
                            this.imageSlider();
                        }
                       }
                       
                    },1);
        
        }
}


