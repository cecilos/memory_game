import { numbersArray,iconsArray } from "./theme.js";  

const logic = ()=>{
    //set some parameters first 
    let currentPlayer = 0;
    let turn = [];
    let movesCounter = 0;
    let matches = 0;
    let finalScores = [];
    let winner;
    let timer;

    //get the values from localStorage for the menu selections
    const theme = localStorage.getItem("theme");
    const players = localStorage.getItem("players");
    const grid = localStorage.getItem("grid");

    const cardBtn = document.querySelectorAll(".card_btn");

    //define how the game starts:

    const start = function (){
        //get the options selected on the menu page

        let numberMode = grid === "4x4" ? numbersArray.slice(0,16) : numbersArray;
        //the above selects a portion of the numbersArray for 4x4 or everything for a 6x6
        let iconsMode = grid === "4x4" ? iconsArray.slice(0,16) : iconsArray;
        let themeSelect = theme === "icons" ? iconsMode : numberMode;
        //shuffle the selected array. so we will put a code here
        const random = shuffle(themeSelect);

        const card = document.querySelectorAll(".card");


        //hide some of the cards depending on the selected grid
        if(grid === "4x4"){
            card.forEach(item => {
                if(item.classList.contains("hide-card")){
                    item.style.display = "none";
                }
            })
        }

        // if 6x6
        if(grid === "6x6"){
            cardBtn.forEach(item => {
                item.classList.remove("card_btn");
                item.classList.add("hard_card_btn")
            })
        }

        //incase it is a multiplayer mode
        for(let i = 1; i <= players; i++){
            newPlayer([i]);
        }


        //function for adding elements for multiplayer
        //for solo player the timer and moves will show 
        //for multiplayer we add new features and take out the timer and moves container
        function newPlayer(num){
            const timer = document.querySelector(".time_cont");
            const playerList = document.querySelector(".player_list");
            const movesCont = document.querySelector(".move_cont");
            const listItem = document.createElement("li");
            const playerHeader = document.createElement("h3");
            const playerScore = document.createElement("p");

            if(players > 1){
                movesCont.style.display = "none";
                timer.style.display = "none";
                playerHeader.innerText = "Player" + num;
                playerScore.innerText = 0;
                listItem.classList.add("player"); // write a css code for this class
                playerScore.classList.add("score");// write a css code for this class
                playerList.appendChild(listItem);
                listItem.appendChild(playerHeader);
                listItem.appendChild(playerScore);

            }
            else{//this is when a solo player is engaged
                startTimer(); //write a function for the start-timer 
            }
        }

        //start-timer function
        function startTimer(){
            const minute = document.querySelector(".mins");
            const second = document.querySelector(".secs");
            let mins = minute.textContent // stores the html text of the class mins
            let secs = 0; 

            // let's set the countdown
            timer = setInterval(function(){
                if(secs === 59){//define the milestones ie: 1: 59 -> 2:00
                    secs = "0" + 0;
                    second.textContent = secs;
                }
                else{
                    secs++;
                    second.textContent = (secs < 10) ? "0" + secs : secs;
                }

                if(secs === "0" + 0){//define the milestones
                    mins++;
                    minute.textContent = mins;

                }
            },1000)
        }//end of startTimer function

        //function for shuffle 
        //nb: using the function keyword allows for hoisting
        function shuffle(array){
            let currentIndex = array.length;
            let randomIndex;
            
            while(currentIndex != 0){
                //set randomIndex equal to any other element
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                //swap the randomIndex with the currentIndex using the destructuring syntax for arrays
                [array[currentIndex],array[randomIndex]] = [array[randomIndex],array[currentIndex]];

            }
            return array;
        }
    }

    start();//this is where invoke the start of game

    
}
logic();// the final place where the whole code runs 