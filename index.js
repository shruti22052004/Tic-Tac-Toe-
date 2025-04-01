const boxes=document.querySelectorAll(".box");
const gameinfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");
let currentplayer;
let gamegrid;
const winningpositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//let's creat a function to initialise the game:
function initgame(){
    currentplayer="x";
    gamegrid=["","","","","","","","",""];
    //ui pr empty karna parega boxes ko
    boxes.forEach((box,index)=>{
    box.innerText="";
    boxes[index].style.pointerEvents="all";

    //initialise box with css properties again
    box.classList=`box box${index+1}`
})
    newGameBtn.classList.remove("active");
    gameinfo.innerText=`Current Player - ${currentplayer}`;

}
initgame();

function swapturn(){
    if(currentplayer==="x"){
        currentplayer="o";

    }
    else{
        currentplayer="x"
    }
    //ui update
    gameinfo.innerText=`Current Player - ${currentplayer}`;
}

function checkgameover(){
    let answer="";

    winningpositions.forEach((position)=>{
        //all 3 boxes should be non emptyand exactly same in value
        if((gamegrid[position[0]]!=="" || gamegrid[position[1]]!=="" || gamegrid[position[2]]!=="")
        && (gamegrid[position[0]]===gamegrid[position[1]]) && (gamegrid[position[1]]===gamegrid[position[2]])){
    //chech if winner is x
    if(gamegrid[position[0]]==="x")
    answer="x";
else
answer="o";

//disable pointer events
boxes.forEach((box)=>{
    box.style.pointerEvents="none";
})

//now we know x/o is a winner
boxes[position[0]].classList.add("win");
boxes[position[1]].classList.add("win");
boxes[position[2]].classList.add("win");

}
    });
    //it means we have a winner
    if(answer!==""){
        gameinfo.innerText=`winner player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
    }

    //let'check whether there is tie
    let fillcount=0;
    gamegrid.forEach((box)=>{
        if(box!=="")
            fillcount++
    });

    //if board is filled,game is tie
    if(fillcount === 9){
        gameinfo.innerText="Game Tied!";
        newGameBtn.classList.add("active")

    }

}

  


function handleclick(index){
    if(gamegrid[index]===""){
        boxes[index].innerText=currentplayer;
        gamegrid[index]=currentplayer;
        boxes[index].style.pointerEvents="none";
        //swap karo turn ko
        swapturn();
        //check karo koi jeet to nahi gaya
        checkgameover();
    }
}
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleclick(index);
    })
}); 

newGameBtn.addEventListener('click',initgame);

