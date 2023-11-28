class Ship {
    constructor(hull, firepower, accuracy){
        this.hull = hull || (Math.floor(Math.random() * (3)) + 3); //RANGE: Math.random() * (max - min) + min
        this.firepower = firepower ||  (Math.floor(Math.random() * (2)) + 2);
        this.accuracy = accuracy ||  (Math.floor(Math.random() * (.2)) + .6);
        this.isIntact= true; //Flag to indicate was destroyed
    }
    attack(target){

        if (Math.random() < this.accuracy) {
            USSAssembly.log('Sorry, Charlie! You missed!') 
        }else {target.hull -= this.firepower;
            USSAssembly.log(`Got'em!`)};

        if (Math.random() < target.accuracy){
            USSAssembly.log('Aliens returned fire, but they got no luck');
        }else {this.hull -= target.firepower; 
            USSAssembly.log('You have been hit on return volley!')}                 
    }

    log(message) {
        logContainer.innerHTML += `<p>${message}</p>`;
        logContainer.scrollTop = logContainer.scrollHeight;
    } 
        
}

const logContainer = document.getElementById('logContainer');
// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
//_ _ _ _ _ _ _ _ Ship Creation_ _ _ _ _ _ _ _ _ _ _ 

const USSAssembly = new Ship (20,5,.7)

function createAlienShips(numShips) {
    const alienShips = [];
    for(let i = 0; i < numShips; i++){
        const alienShip = new Ship();
        alienShips.push(alienShip);
    }
    return alienShips;
}


const numAlienShips = 6;
const numAlienShipsArray = createAlienShips(numAlienShips);
console.log(numAlienShipsArray)
console.log(USSAssembly);

// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
//_ _ _ _ _ _ _ _ Functionality_ _ _ _ _ _ _ _ _ _ _ 

function clearLog(){
    logContainer.innerHTML = '';
}

function updateAlienStatus () {
    statusParagraphAlien.textContent = `Alien Ship Hull: ${numAlienShipsArray[0].hull} | Firepower: ${numAlienShipsArray[0].firepower}`;
}

function clearAlienStatus () {
    statusParagraphAlien.textContent = ``;
}

function updateStatus() {
    statusParagraph.textContent = `USS Assembly Hull: ${USSAssembly.hull} | Firepower: ${USSAssembly.firepower}`;
}

const attackButton = document.querySelector('button');
attackButton.addEventListener('click', () => { 
    if (USSAssembly.hull > 0 && numAlienShipsArray.length > 0 && USSAssembly.isIntact) {
        USSAssembly.attack(numAlienShipsArray[0]);
        updateStatus(); 
        updateAlienStatus();
    
        if (numAlienShipsArray[0].hull <= 0) {
            numAlienShipsArray[0].isIntact = false;
            numAlienShipsArray.shift();
            updateStatus();
            clearAlienStatus();
            USSAssembly.log(`USS Assembly destroyed an alien ship. Remaining ships: ${numAlienShipsArray.length}`)
        }  if (USSAssembly.hull <= 0 ){
            clearLog();
            USSAssembly.log('You Lost the war! Maybe next time :/')

           
        }   if( numAlienShipsArray.length === 0 && USSAssembly.isIntact) {
                clearLog();
                updateStatus();
                clearAlienStatus();
                USSAssembly.log(`Congratulations! You won the war!`)
        }
    }     
});
    
const retreatButton = document.getElementById('retreatButton');
retreatButton.addEventListener('click', () => {
    USSAssembly.log('We are safe for now. Click Attack Alien to continue the fight');
    return;
})


