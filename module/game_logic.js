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

        //modify the width of the players div
        if(document.querySelectorAll(".player").length === 3){
            document.querySelectorAll(".player").forEach(item =>{
                item.style.width = "30%";
            })
        }
        else if(document.querySelectorAll(".player").length === 4){
            document.querySelectorAll(".player").forEach(item => {
                item.style.width = "23%";
            });
        }

        // put the icons or numbers in the card-btn
        cardBtn.forEach((icon,i)=> {//the (icon,i) are the two args
            //the first is the array element and the second is the index
            const number = `<p class=${random[i]}>${random[i]}</p>`;//take out visibility later

            //define what happens if it is a number or icon
            //the number variable above defines what happens if
            //it is a number

            if(theme !== "icons"){
            
                icon.innerHTML = number;
            }
            else{
                icon.innerHTML = random[i];
                
            }
            //trial
            
        });
        //possible placement of restart game here:
        restartGame();//this is what hides everything 
        //cardEventListener is called in the restartGame fnx
        //and does the magic
    }//end of start function

    //write restart function later
    function restartGame(){
        //
        const cards = Array.from(document.querySelectorAll(".card"));
        const random = shuffle(cards);
        const playerTurn = document.querySelectorAll(".player");
        const  playerCont = document.querySelectorAll(".player-container");
        const restartBtn = document.querySelectorAll(".restart");
        const gridList = document.querySelector(".grid");
        const moves = document.querySelector(".move");
        const scores = document.querySelectorAll(".score");
        const soloPlayerMod = document.querySelector(".single_player");
        const multiPlayerMod = document.querySelector(".multiplayer");



        turn = [];
        currentPlayer = 0;
        movesCounter = 0;
        matches = 0;
        finalScores = [];
        winner;

        //reset all visible features of the game 
        moves.innerText = 0;
        soloPlayerMod.style.display = "none";
        multiPlayerMod.style.display = "none";

        playerCont.forEach(el => {
            el.remove();
        })

        scores.forEach(score => {
            score.textContent = 0;
        });

        random.forEach(card => {
            gridList.append(card);
        })

        cardBtn.forEach(card => {
            card.classList.remove("open","show","match");
            card.addEventListener("click",cardEventListener)
        });

        restartBtn.forEach(el => {
            el.addEventListener("click",()=>{
                restartGame();
                clearInterval(timer);
                startTimer();
                document.querySelector(".mins").textContent = "0";
                document.querySelector(".secs").textContent = "00";
            });
        });

        //
        playerTurn.forEach(el => {
            el.classList.remove("player_turn");
        });

        if(players > 1){
            playerTurn[0].classList.add("player_turn");
        }



    }


    //implement an event listener on the cards 
    function cardEventListener(e){
        const moves = document.querySelector(".move");
        const player = document.querySelectorAll(".player");
        const score = document.querySelectorAll(".score");

        if(!e.target.classList.contains("show")){
            e.target.classList.add("open","show");
            turn.push(e.target.children)
            //we injected a child element to the card-btn 
            //so whenever we click a card-btn 
            //we push the child into the array turn 

        }

        cardBtn.forEach(item => {
            if(item.classList.contains("open")){
                item.removeEventListener("click",cardEventListener);
            }
        }); //once card is clicked remove the eventlistener

        //the content of variable turn : turn = [[a],[b]]
        //so to access first element of turn: turn[0][0] ; ans = a

        if(turn.length === 2){
            let turn1 = turn[0][0];
            let turn2 = turn[1][0]; //returns <i></i>
            if(turn1.classList.value !== turn2.classList.value)
            {
                turn1.parentElement.classList.add("wrong");
                turn2.parentElement.classList.add("wrong");
                //add wrong class to show that it is wrong

                cardBtn.forEach(btn => {
                    btn.removeEventListener("click",cardEventListener);
                }); // remove cursor

                setTimeout(()=>{
                    turn1.parentElement.classList.remove("open","show","wrong");
                    turn2.parentElement.classList.remove("open","show","wrong");

                    turn = [] //set turn to default of empty array 
                    //since the two cards are not matched

                    cardBtn.forEach(btn => {
                        if(!btn.classList.contains("match")){
                            btn.addEventListener("click",cardEventListener);
                        }
                    })
                },1000);


            }
            else{
                matches++ //the if condition : not met
                //else condition : met , then the two cards match
                //so add 1 to the match value
                setTimeout(()=>{
                    turn1.parentElement.classList.add("match");
                    turn2.parentElement.classList.add("match");

                    turn = []; //empty the turn array if they match

                },0);

                //to be continued: if cards clicked are matching 
                //what logic must follow
                if(players > 1){
                    score[currentPlayer].textContent++;
                }


            }//end of else 

            //moves for solo
            if(players <= 1 && turn.length === 2){
                movesCounter++;
                moves.textContent = movesCounter;
            }

            //if solo player is done playing 
            if(players <= 1 && grid === "4x4" && matches === 8){
                soloPlayerScore(moves.textContent);
                document.querySelector(".single_player").style.display = "flex";

            }
            else if(players <= 1 && grid === "6x6" && matches === 18){
                soloPlayerScore(moves.textContent);
                document.querySelector(".single_player").style.display = "flex";
            }

            //if multiplayer is done playing 

            if(players > 1 && grid === "4x4" && matches === 8){
                document.querySelector(".multiplayer").style.display = "flex";
                
                score.forEach(item => {
                    finalScores.push(parseInt(item.textContent));

                });

                winner = Math.max(...finalScores);

                //
                for (let i = 0; i < players; i++){
                    multiplayerScore([i]);
                }
            }
        }

        //second condition 
        if(turn.length === 2 && players > 1){
            player[currentPlayer].classList.remove("player_turn");
            currentPlayer++;
            if(players > currentPlayer){
                player[currentPlayer].classList.add("player_turn");
            }
            else{
                currentPlayer = 0;
                player[currentPlayer].classList.add("player_turn");
            }
        }



    }//end of cardEventListener

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
                playerHeader.innerText = "Player " + num;
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

        //define soloplayer results here
        function soloPlayerScore(moves){
            const fTime = document.querySelector(".time_rcont");
            const fMove = document.querySelector(".moves_rcont");
            const time = document.querySelector(".timer");
            const movesCount = document.querySelector(".move");

            fTime.textContent = time.textContent;
            fMove.textContent = movesCount.textContent;

            clearInterval(timer);//stops the time
        }


        //define multiplayer results here
        function multiplayerScore(num){
            const multiplayerScore = document.querySelector(".winner_result");
            const playerList = document.querySelector(".players_result");
            const player = document.querySelectorAll(".player-container");
            const score = Array.from(document.querySelectorAll(".score"));

            const listItem = document.createElement("li");
            const playerName = document.createElement("p");
            const playerScore = document.createElement("p");
            const copyofScore = finalScores.filter((item,i)=> finalScores.indexOf(item) !== i);
            const highestScore = Math.max(...finalScores);

            playerName.innerText = `Player ${parseInt(num) + 1}`;
            playerScore.innerText = score[num].textContent + " Pairs";

            //define the heading 
            if(winner === parseInt(score[num].textContent)){
                listItem.classList.add("winner");
                playerScore.style.color = "#fcfcfc";
                
                if(highestScore === Math.max(...copyofScore)){
                    multiplayerScore.innerText = "It's a tie!";
                }
                else{
                    multiplayerScore.innerText = `Player ${parseInt(num) + 1} wins!`;
                }
            }
            //
            if(player.length < players){
                listItem.classList.add("player-container");
                playerName.classList.add("player-name");
                playerScore.classList.add("player-score");
                playerList.appendChild(listItem);
                listItem.appendChild(playerName);
                listItem.appendChild(playerScore);
            }



        }//endoffunction

//define start function here
start();

} //end of main function . now invoke it below 


logic();// the final place where the whole code runs 
