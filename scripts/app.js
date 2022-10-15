function init() {
  // ! STRATEGY FOR IMPLEMENTATION
    //start with grid to get the layout setup in a basic form, add better style last
    //add trader to grid and get functionality of movement working
    //add coins to grid and get trader to gather them
    //create start game popup with button to start game, and instructions (story?)
    //add ghost1 to starting position and get to leave box and randomly move around
    //add score update and life update function
    //add reset function when ghost catches trader and restart round if lives > 0, use alert for gameover
    //add powerUps to allow trader to eat ghost
    
    //add conditional if trader gets all the coins and move to next level, update level
    //add ghost 2 and 3 with random movement logic 
    //create gameover popup that shows score and high score
    //update ghost logic so they speed up with increased levels
    //update ghost logic so some can chase the trader easier


  // ? ELEMENTS
  //start button
  // high score
  // score
  // lives left
  // level
  const grid = document.querySelector('.grid')

  // ? VARIABLES
  // timer
  // score
  // lives
  // level

  // ? GRID VARIABLES
  const width = 20
  const height = 20
  const cellCount = width * height
  const cells = []
  //add if cells == this then add color or coins


  // ? CHARACTER VARIABLES
  //startingPosition = cell.data-index[]
  //currentPosition
  //ghost1Start
  //ghost2Start
  //ghost3Start
  //ghost1Current
  //ghost2Current
  //ghost3Current
  


  // ! GRID FUNCTIONS
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      //creates div
      const cell = document.createElement('div')
      //display index of the element
      cell.innerHTML = i
      //add index as data-id
      cell.dataset.index = i
      //appendchild to the grid
      grid.appendChild(cell)
      //push cell into an array
      cells.push(cell)
    }
  }
  createGrid()
  //conditional logic to create walls
  cells.some(cell => {
    const wall = cell.dataset.index
    //center walls
    if (wall % 10 === 0 && wall <= 70 || wall % 10 === 0 &&
      wall >= 110 && wall <= 160) {
      cell.classList.add('walls')
    }
    //top and bottom walls
    if (wall < 20 || wall > 379) {
      cell.classList.add('walls')
    }
    //side cells
    if (wall % 20 === 0 || 
      (wall % 20 !== 9 && wall % 10 === 9)) {
      cell.classList.add('walls')
    }
    if (wall % 20 === 6 && wall > 225 && wall < 247 || wall % 10 === 0 && wall > 289 && wall < 351) {
      cell.classList.add('walls')
    }
    if (wall > 41 && wall < 45  || wall > 45  && wall < 49
      || wall > 51 && wall < 55 || wall > 55 && wall < 58 || 
      wall > 61 && wall < 65  || wall > 65  && wall < 69
      || wall > 71 && wall < 75 || wall > 75 && wall < 78) {
      cell.classList.add('walls')
    }
    if (wall > 101 && wall < 105 || wall > 107 && wall < 113 ||
      wall > 115 && wall < 118 || wall > 140 && wall < 145 || wall > 146 && wall < 149 || 
      wall > 151 && wall < 154 || wall > 155 && wall < 159 || wall > 160 && wall < 165 || 
      wall > 175 && wall < 179 || wall > 180 && wall < 184 ||
      wall > 188 && wall < 190 || wall > 190 && wall < 193 || wall > 195 && wall < 199 || 
      wall > 220 && wall < 225 || wall > 235 && wall < 245 || wall > 247 && wall < 253 ||
      wall > 255 && wall < 259 || wall > 281 && wall < 285 || wall > 285 && wall < 295 ||
      wall > 295 && wall < 298 || wall > 320 && wall < 323 || wall > 325 && wall < 329 || 
      wall > 331 && wall < 335 || wall > 337 && wall < 342 || wall > 343 && wall < 349 || wall > 351 && wall < 357) {
      cell.classList.add('walls')
    }
    if (wall % 20 === 6 && wall > 86 && wall < 206 || wall % 10 === 4 && wall > 133 && wall < 195 ||
       wall % 20 === 1 && wall > 340) {
      cell.classList.add('walls')
    }
    if (wall % 20 === 8 && wall > 187 && wall < 268 || wall % 10 === 2 && wall > 211 && wall < 253) {
      cell.classList.add('walls')
    }
    if (wall == 304 || wall == 316 || wall == 114) {
      cell.classList.add('walls')
    }

    // if (!cell.classList.contains('walls')) {
    //   cell.style.backgroundColor = 'grey'
    // }
    
  })

  
    //for loop to create grid
    //width = 25
    //height = 28
    //add class and dataset with id, appendchild, push cell into array cells


   //function createRails
    // several for loop to create rails
    // add class rails to add styling
  
  //function loadCoins
    //add class coin to specified grid index

  //function removeCoins
    //remove class coin from specified grid index

  //function addPowerUps
    //add class powerUp to specified grid index
  //function removePowerUps
    //remove class powerUp from specified grid index

  // ! CHARCTER FUNCTIONS

  //function addtrader
    //add class trader to display the trader at start position
  
  //function removetrader
  //remove class trader from grid

  //function addGhost1
    //add class addGhost1 to display the addGhost1 at start position

  //function removeGhost1
    //remove class addGhost1 to display the addGhost1 at start position

  //function addGhost2
    //add class addGhost2 to display the addGhost2 at start position

  //function removeGhost2
    //add class addGhost2 to display the addGhost2 at start position

  //function addGhost3
    //add class addGhost3 to display the addGhost3 at start position

  //function removeGhost3
    //remove class addGhost3 to display the addGhost3 at start position

  //function getPowerUps
    //if (cointrader position === position of power up)
        //remove power up from screen
        //ghostsBlue()

  // !FUNCTIONS MOVEMENT

  //function traderMovement
    //downdown even listener
    //set movements to only go in allowed area
    //bonus to allow movement to go from appear form one side to another
    //check if grid trying to enter is === class wall
      //do nothing
    

  //function ghostMovement
    //ghostMoves = setInterval (timer makes the ghost move)
    //releaseGhost()
    //ghosts moves until it hits a wall
    //if it hits a wall randomly choose a new direction


    //if ghost is in start box
      //run releaseGhost function (assigns ghost specific starting movement to get out of start box)
    //if ghost is not in start box
      //run Math.random to choose a direction to move


  //! GAME FUNCTIONS

  //function getHighScore
    //get score from local storage on game load

  //function setHighScore
    //if high score is 0 or highscore is less than current score, then save score to high score with local storage
    // diplay new high score on the page

  //function endGame
      //display game over overlay with score and high score and a start button
    

  //function resetGame
    //when start button is clicked
      //lives = 3
      //display lives = 3
      //score = 0
      //display score = 0
      

  //function resetRound
    //loadCoins()
    //addPowerUps()
    //addAllGhosts()
    //addtrader()


    
  //function ghostsBlue
    //setInterval for 10 seconds
    //add class blue to ghosts
    //if ghost position === trader position
      //send ghost back to start
      //add 200 points to score
    //clear interval after 10 seconds

  //function getCoins
    //if class coin is true && trader position === coin position
      //add 10 points to score
      //remove coin class from grid


  //function releaseGhost
    //function ghostMoves

  //function startGame when start button is clicked
    //resetRound()
    
    //removePowerUps
    //startDelay = setTimeout delay start of game by 3 seconds
      //setTimeout for trader to 3 seconds
        //tradermovement()
      //releaseGhost1,2,3 = setTimeout 6,9,12 seconds
          //1 timeout function for each ghost.
          // ghostMovement()
      //
      //function checkCoins()
        //if grid has coin class 
          //increase score
        // if trader gathers all the coins === coins class is false
            //numOfCoins - subtract coin every time trader position === coin position
              //can get coins # from a loop by looping through array to cound coins
            //can use some method to check if coins are present
        //if numofcoins <= 0
          //increase level + 1
          //score += 500
          //resetRound()
          //startDelay
      //function checkPowerUps
        //
      //function checkEnemies()
      // if grid has ghost css class then (player dies)
        //stop ghost movement
        //stop player movement
        //decrease life by 1
          //if lives > 0
            //current position = start position
            //startDelay
          //if(lives === 0)
            //endgame()

        
    
    //Math.random to choose the direction the ghost moves
    //BONUS have some ghosts move towards the player
    




  // ? EVENTS
  //start game - run start game function and reset function
  //keydown to move trader




}

window.addEventListener('DOMContentLoaded', init)