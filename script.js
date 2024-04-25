let currentTurn = 0;
let gameOver = false;

// playerturns = even numbers
// ai turns = odd numbers

const button1 = document.getElementById("sq1");
const button2 = document.getElementById("sq2");
const button3 = document.getElementById("sq3");
const button4 = document.getElementById("sq4");
const button5 = document.getElementById("sq5");
const button6 = document.getElementById("sq6");
const button7 = document.getElementById("sq7");
const button8 = document.getElementById("sq8");
const button9 = document.getElementById("sq9");

const box = document.querySelector(".box")

let buttonList = [
    button1, button2, button3, button4, button5, button6, button7, button8, button9,
];

gameplay(); //function call

function gameplay(){ //function definition
     buttonList.forEach(button =>{
        button.onclick = () => { //arrow function
            let Ptag = button.children[0];
            if(currentTurn % 2 == 0){ //modulus checking for even
                currentTurn++; //iterator
                Ptag.innerHTML = "X";
                button.diasbled = true;
                button.style.backgroundImage = "url(./tick.png)";
                button.style.backgroundSize = "cover";
                buttonList.splice(buttonList.indexOf(button),1);
                checkwin();
                if(gameOver == false)
                   aiturn(buttonList)
            }
        }
     });
}


function aiturn(list){
    if(list.length > 0){
        let random = Math.floor(Math.random() * list.length);
        let aiChoice = list [random]
        aiChoice.disabled = true;
        list.splice(buttonList.indexOf(aiChoice),1);
        let Ptag = aiChoice.children[0];
        Ptag.innerHTML = "O";
        aiChoice.style.backgroundSize = "cover";
        aiChoice.style.backgroundImage = "url(./tock.png)";
        currentTurn++;
        checkwin();
    }
}





function checkwin(){
    if(
        button1.textContent.trim() == "X" && button2.textContent.trim() == "X" && button3.textContent.trim() == "X"  ||//X Horizontal
        button4.textContent.trim() == "X" && button5.textContent.trim() == "X" && button6.textContent.trim() == "X"  ||
        button7.textContent.trim() == "X" && button8.textContent.trim() == "X" && button9.textContent.trim() == "X"  ||

        //vartical user cases
        button1.textContent.trim() == "X" && button4.textContent.trim() == "X" && button7.textContent.trim() == "X"  ||//X Vertical
        button2.textContent.trim() == "X" && button5.textContent.trim() == "X" && button8.textContent.trim() == "X"  ||
        button3.textContent.trim() == "X" && button6.textContent.trim() == "X" && button9.textContent.trim() == "X"  ||
        //diagonal user cases
        button1.textContent.trim() == "X" && button5.textContent.trim() == "X" && button9.textContent.trim() == "X" ||//X Diagonal
        button3.textContent.trim() == "X" && button5.textContent.trim() == "X" && button7.textContent.trim() == "X" 
    ){
        gameOver = true;
        endGame ("You have");
    }

    else if(
        button1.textContent.trim() == "O" && button2.textContent.trim() == "O" && button3.textContent.trim() == "O"  ||//O Horizontal
        button4.textContent.trim() == "O" && button5.textContent.trim() == "O" && button6.textContent.trim() == "O"  ||
        button7.textContent.trim() == "O" && button8.textContent.trim() == "O" && button9.textContent.trim() == "O"  ||
         //vartical AI cases
        button1.textContent.trim() == "O" && button4.textContent.trim() == "O" && button7.textContent.trim() == "O"  ||//O Vertical
        button2.textContent.trim() == "O" && button5.textContent.trim() == "O" && button8.textContent.trim() == "O"  ||
        button3.textContent.trim() == "O" && button6.textContent.trim() == "O" && button9.textContent.trim() == "O"  ||
        //diagonal AI cases
        button1.textContent.trim() == "O" && button5.textContent.trim() == "O" && button9.textContent.trim() == "O" ||//O Diagonal
        button3.textContent.trim() == "O" && button5.textContent.trim() == "O" && button7.textContent.trim() == "O"  
    ){
        gameOver = true;
        endGame("AI has");
    }else{
    if (buttonList.length == 0){
        gameOver = true;
        endGame("no one")
    }
   }
}

function endGame(winner){
    buttonList.forEach(button => {
        button.diasbled = true
    });
    //create winner text, tells user who won
    const word = document.createElement('h1');
    word.classList.add("winner-text");
    word.innerHTML = winner + " won!";
    box.appendChild(word);

    //create reset button
    const reset = document.createElement('button');
    reset.classList.add("reset-button");
    reset.innerHTML = "Play again?";
    box.appendChild(reset);

    //resets game
    reset.onclick = () => {
        currentTurn = 0;
        gameOver = false;
        buttonList.splice(0, buttonList.length);
        buttonList = [button1, button2, button3, button4, button5, button6, button7, button8, button9];
        box.removeChild(reset);
        box.removeChild(word);

        buttonList.forEach(element => {
            element.children[0].innerHTML = "";
            element.disabled = false;
            element.style.backgroundImage = null;
            element.style.backgroundSize = null;
        });
        gameplay();
    }
}