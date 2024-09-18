let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn = true; // Player X , Player O
let count =0;
const winningPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turn = true;
    boxEnabled();
    msgContainer.classList.add("hide");
    count=0;
}

const gamedraw = () => {
    msg.innerText = "Game is Draw";
    msgContainer.classList.remove("hide");
    boxDisabled();
}

boxes.forEach((box) =>{
    box.addEventListener("click", () => {
        if(turn){    
            box.innerText = "O"; 
            turn=false;
        }
        else {
            box.innerText="X";
            turn = true;
        }
        box.disabled = true;     // this will not allow one box to change it content
        count++;
        let isWinner = checkWinner();
        if(count===9 && !isWinner){
            gamedraw();
            count=0;
        }
    });
});

const boxDisabled = () => {
    for(let box of boxes){
        box.disabled= true;
    }
}
const boxEnabled = () => {
    for(let box of boxes){
        box.disabled= false;
        box.innerText="";
    }
}
const showWinner = (winner) => {
    winner = winner=="O" ? "Player 1" : "Player 2"
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    boxDisabled();
}

const checkWinner = () => {
    for(let pattern of winningPattern){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val==pos2Val && pos2Val == pos3Val){
                showWinner(pos1Val);
                return true;
            }
           
        }
    }
}

newbtn.addEventListener("click" , resetGame);
resetbtn.addEventListener("click" , resetGame);