function init() {
  // ! STRATEGY FOR IMPLEMENTATION
    //add powerUps to allow trader to eat ghost
    //add ghost 2 and 3 with random movement logic 
    //update ghost logic so they speed up with increased levels
    //update ghost logic so some can chase the trader easier


  // ? ELEMENTS
  const welcomeScreen = document.querySelector('.welcomeScreen')
  const gameOverScreen = document.querySelector('.gameOverScreen')
  const scoreDisplay = document.getElementById('score')
  const livesLeft = document.getElementById('lifeLeft')
  const levelDisplay = document.getElementById('level')
  const grid = document.querySelector('.grid')
  const finalScore = document.getElementById('finalScore')

  // ? VARIABLES
  // timer
  let highScore = 0
  let score = 0
  let lives = 3
  let coins = 176
  let level = 1

  // ? GRID VARIABLES
  const width = 20
  const height = 20
  const cellCount = width * height
  const cells = []
  


  // ? CHARACTER VARIABLES
  const startingPosition = 270
  let currentPosition = startingPosition
  const ghost1Start = 210
  let ghost1Current = ghost1Start
  
  const ghost2Start = 230
  let ghost2Current = ghost2Start
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
    addPunk(startingPosition)
    
  }
  createGrid()
  //conditional logic to create walls and add coins
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
    if (wall % 20 === 0 && wall < 181 || wall % 20 === 0 && wall > 219 ||
      wall % 20 !== 9 && wall % 10 === 9 && wall < 200 ||
      wall % 20 !== 9 && wall % 10 === 9 && wall > 238) {
      cell.classList.add('walls')
    }
    if (wall % 20 === 6 && wall > 225 && wall < 247 || wall % 10 === 0 && wall > 289 && wall < 351) {
      cell.classList.add('walls')
    }
    if (wall > 41 && wall < 45 || wall > 45  && wall < 49 || wall > 51 && wall < 55 || 
      wall > 55 && wall < 58 || wall > 61 && wall < 65 || wall > 101 && wall < 105 || 
      wall > 65  && wall < 69 || wall > 107 && wall < 113 || wall > 71 && wall < 75 || wall > 75 && wall < 78 ||
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
    if (wall == 304 || wall == 316 || wall == 114 || wall == 234 || wall == 254) {
      cell.classList.add('walls')
    }
    //adds style to enemy home
    if (wall == 190 || wall > 208 && wall < 212 || 
      wall > 228 && wall < 232) {
      cell.classList.add('enemyHome')
    }
   
    //adds coins to grid
    // if (!cell.classList.contains('walls') && !cell.classList.contains('enemyHome')) {
    //   cell.classList.add('coin')
    // }
  })
  addCoins()
  function addCoins() {
    cells.some((cell) => {
      if (!cell.classList.contains('walls') && !cell.classList.contains('enemyHome')) {
        cell.classList.add('coin')
      }
    })
  }
  
  //function addPowerUps
    //add class powerUp to specified grid index
  //function removePowerUps
    //remove class powerUp from specified grid index

  // ! CHARCTER FUNCTIONS
 
  function addPunk(position) {
    cells[position].classList.add('punk')
  }
  function removePunk(position) {
    cells[position].classList.remove('punk')
  }
  
  function addGhost1(position) {
    cells[position].classList.add('cyborg1')
  }

  function removeGhost1(position) {
    cells[position].classList.remove('cyborg1')
  }

  function addGhost2(position) {
    cells[position].classList.add('biker1')
  }
  function removeGhost2(position) {
    cells[position].classList.remove('biker1')
  }

  //function addGhost3
    //add class addGhost3 to display the addGhost3 at start position

  //function removeGhost3
    //remove class addGhost3 to display the addGhost3 at start position

  //function getPowerUps
    //if (cointrader position === position of power up)
        //remove power up from screen
        //ghostsBlue()

  // !FUNCTIONS MOVEMENT
  function startGame(e) {
    if (e.target.id === 'startBtn') {
      gameOverScreen.style.display = 'none'
      welcomeScreen.style.display = 'none'
      lives = 3
      livesLeft.innerText = lives
      score = 0
      scoreDisplay.innerText = score
      level = 1
      levelDisplay.innerText = level
      addCoins()

      //starts movement of ghost after 3 seconds
      setTimeout(releaseGhost1, 3000)
      // setTimeout(releaseGhost2, 6000)
    }
  }
  // function mobilizeGhosts() {
  //   releaseGhost(ghost1Current)
  //   releaseGhost(ghost2Current)
  // }
  
  //player movment
  function handleMovement(e) {
    const checkMoveRight = cells[currentPosition + 1].classList.contains('walls')
    const checkMoveLeft = cells[currentPosition - 1].classList.contains('walls')
    const checkMoveUp = cells[currentPosition - width].classList.contains('walls')
    const checkMoveDown = cells[currentPosition + width].classList.contains('walls')
    const key = e.keyCode
    const up = 38
    const down = 40
    const left = 37
    const right = 39
    removePunk(currentPosition)
    removeCoin()
    if (key === right && !checkMoveRight) {
      currentPosition++
    } else if (key === left && !checkMoveLeft) {
      currentPosition--
    } else if (key === up && !checkMoveUp) {
      currentPosition -= width
    } else if (key === down && !checkMoveDown) {
      currentPosition += width
    } else if (key === left && currentPosition === 200) {
      currentPosition += width - 1
    } else if (key === right && currentPosition === 219) {
      currentPosition -= width - 1
    }
    addPunk(currentPosition)
    nextLevel()
  } 
  
  

  //object to store movement for enemy
  const directions = {
    left: -1,
    right: +1,
    up: -width,
    down: +width,
  }
  const directionsArr = Object.keys(directions)
  
  let enemyMoves1
  //releases ghost 1 from home
  function releaseGhost1() {
    if (ghost1Current !== 210) {
      console.log('ghost in wrong spot')
      removeGhost1(ghost1Current)
      removePunk(currentPosition)
      ghost1Current = 210
      currentPosition = startingPosition
      addPunk(currentPosition)
    }
    addGhost1(ghost1Start)
    const leaveHome = setInterval(() => {
      removeGhost1(ghost1Current)
      ghost1Current -= width
      if (ghost1Current === 170) {
        addGhost1(ghost1Current)
        clearInterval(leaveHome)
        enemyMoves1 = setInterval(() => {
          removeGhost1(ghost1Current)
          ghost1Current = choosePosition(ghost1Current)
          console.log('updated ghost 1?', ghost1Current)
          addGhost1(ghost1Current)
          endRound(ghost1Current)
        }, 750)
        
      } else {
        addGhost1(ghost1Current) 
      }
    }, 1000)
  }

 
  ///moves ghost1 on interval, chooses direction, and prevents enemy from making illegal moves

 

  //Ghost 2 movement
  // function releaseGhost2() {
  //   if (ghost2Current !== 230) {
  //     console.log('ghost in wrong spot')
  //     removeGhost2(ghost2Current)
  //     ghost2Current = 230
  //   }

  //   addGhost2(ghost2Start)
  //   const leaveHome = setInterval(() => {
  //     removeGhost2(ghost2Current)
  //     ghost2Current -= width
  //     if (ghost2Current === 170) {
  //       addGhost2(ghost2Current)
  //       clearInterval(leaveHome)
  //       return enemyMoves2
        
  //     } else {
  //       addGhost2(ghost2Current) 
  //     }
  //   }, 1000)
  // }

  ///moves ghost2 on interval, chooses direction, and prevents enemy from making illegal moves
  // const enemyMoves2 = setInterval(() => {
  //   removeGhost2(ghost2Current)
  //   choosePosition(ghost2Current)
  //   addGhost2(ghost2Current)
  //   endRound(ghost2Current)
  // }, 1000)

   //choose the position based on a random direction
  function choosePosition(ghost) {
    
    let randPosition = Math.floor(Math.random() * directionsArr.length)
    
    let nextMove = ghost + directions[directionsArr[randPosition]]

    
    while (cells[nextMove].classList.contains('walls') || cells[nextMove].classList.contains('enemyHome')) {
      randPosition = Math.floor(Math.random() * directionsArr.length)
      nextMove = ghost + directions[directionsArr[randPosition]]
    }
    return nextMove
  }

  //logic to end the round and takes argument of ghostcurrent location 

  function endRound(ghost) {
    if (cells[ghost].classList.contains('punk')) {
      console.log(`${ghost} got punk`)
      lives -= 1
      livesLeft.innerText = lives
      clearInterval(enemyMoves1) 
      // clearInterval(enemyMoves2) 
      if (lives > 0) {
        resetRound()
      }
      if (lives <= 0) {
        finalScore.innerText = score
        gameOverScreen.style.display = 'block'
        score = 0
        lives = 3
      }
    }
  }
  //Function to move to the next level
  
  function nextLevel() {
    if (coins <= 0) {
      clearInterval(enemyMoves1) 
      // clearInterval(enemyMoves2) 
      level += 1
      levelDisplay.innerText = level
      coins = 176
      addCoins()
      resetRound()
      // resetRound(ghost2Current)
    }
  }
  
  


  //! GAME FUNCTIONS
  //removes coins from game and adds 10 points to score
  function removeCoin() {
    if (cells[currentPosition].classList.contains('coin')) {
      cells[currentPosition].classList.remove('coin')
      score += 10
      coins -= 1
      scoreDisplay.innerText = score
      console.log(coins)
    }
  } 
  function resetRound() {
    removeGhost1(ghost1Current)
    // removeGhost2(ghost2Current)
    removePunk(currentPosition) 
    ghost1Current = ghost1Start
    // ghost2Current = ghost2Start
    currentPosition = startingPosition

    addPunk(startingPosition)
    releaseGhost1()
    // releaseGhost2()
  }
 

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
      //loadCoins()
      //addAllGhosts()
      //addPunk()
      

  
    
    
    


    
  //function ghostsBlue
    //setInterval for 10 seconds
    //add class blue to ghosts
    //if ghost position === trader position
      //send ghost back to start
      //add 200 points to score
    //clear interval after 10 seconds


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

    




  // ? EVENTS
  //start game - run start game function and reset function
  document.addEventListener('keydown', handleMovement)
  document.addEventListener('click', startGame)
  


}

window.addEventListener('DOMContentLoaded', init)