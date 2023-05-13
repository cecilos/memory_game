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

    
}