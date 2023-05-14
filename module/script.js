
const menuSelect = ()=>{
    const theme = document.querySelectorAll(".btn-theme");
    const playerNumber = document.querySelectorAll(".btn-player");
    const grid = document.querySelectorAll(".btn-grid");

    //set the default state of the data stored in the local browser
    localStorage.setItem("theme", "numbers");
    localStorage.setItem("players","1");
    localStorage.setItem("grid","4x4");
    //make an array from the selected nodelist for theme
    Array.from(theme).forEach(active => {
        active.addEventListener("click",(e)=>{
            const base = document.getElementById("theme-active");
            base.id = base.id.replace("theme-active","");
            active.id += "theme-active";
            console.log(active);

            if(e.target.value === "icons") {
                localStorage.setItem("theme","icons");
                console.log(localStorage);
            }
            if(e.target.value === "numbers"){
                localStorage.setItem("theme","numbers");
                console.log(localStorage);
            }
        })
        
        
    });

    Array.from(playerNumber).forEach(active => {
        active.addEventListener("click",(e) => {
            const base = document.getElementById("player-active");
            base.id = base.id.replace("player-active","");
            active.id += "player-active";

            switch(e.target.value){
                case "1":
                    localStorage.setItem("players", "1");
                    break;
                case "2":
                    localStorage.setItem("players", "2");
                    //console.log(localStorage)
                    break;
                case "3":
                    localStorage.setItem("players","3");
                    break;
                case "4":
                    localStorage.setItem("players","4");
                    break;
            }
        })

    } );

    Array.from(grid).forEach(active => {
        active.addEventListener("click",(e)=>{
            const base = document.getElementById("grid-active");
            base.id = base.id.replace("grid-active", "");
            active.id += "grid-active";

            if(e.target.value === "6x6"){
                localStorage.setItem("grid","6x6");
                console.log(localStorage);
                
            }

            if(e.target.value === "4x4"){
                localStorage.setItem("grid","4x4");
                console.log(localStorage);
            }
            /*else{
                localStorage.setItem("grid","4x4");
                console.log(localStorage);
            }*/
        })
    });
}

menuSelect();