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
  class Character {
    constructor(className, startingPosition, currentPosition) {
      this.className = className
      this.startingPosition = startingPosition
      this.currentPosition = currentPosition
    }
    addClass() {
      console.log(this.currentPosition)
      cells[this.currentPosition].classList.add(`${this.className}`)
    }
    removeClass() {
      cells[this.currentPosition].classList.remove(`${this.className}`)
    }
    releaseEnemy() {
      if (this.currentPosition !== this.startingPosition) {
        console.log('ghost in wrong spot')
        this.removeClass(this.currentPosition)
        this.currentPosition = this.startingPosition
      }
      console.log('currentPosition', this.currentPosition)
      console.log('startingPosition', this.startingPosition)
      console.log('className', this.className)
      this.addClass()
      const leaveHome = setInterval(() => {
        this.removeClass(this.currentPosition)
        this.currentPosition -= width
        if (this.currentPosition === 170) {
          this.addClass(this.currentPosition)
          clearInterval(leaveHome)
          
          
        } else {
          this.addClass(this.currentPosition)
        }
      }, 1000)
    }
    enemyMoves() {

    }
  }

  // class Enemy extends Character {
  //   constructor(className, startingPosition, currentPosition) {
  //     super(className, startingPosition, currentPosition)
  //   }
  //   releaseEnemy() {
  //     if (this.currentPosition !== this.startingPosition) {
  //       console.log('ghost in wrong spot')
  //       super.removeClass(this.currentPosition)
  //       this.currentPosition = this.startingPosition
  //     }
  //     console.log('line 161', this.currentPosition)
  //     console.log('line 162', this.startingPosition)
  //     console.log('line 163', this.className)
  //     super.addClass()
  //     const leaveHome = setInterval(() => {
  //       super.removeClass(this.currentPosition)
  //       this.currentPosition -= width
  //       if (this.currentPosition === 170) {
  //         super.addClass(this.currentPosition)
  //         clearInterval(leaveHome)
          
          
  //       } else {
  //         super.addClass(this.currentPosition)
  //       }
  //     }, 1000)
  //   }
  //   enemyMoves() {

  //   }
  // }

  const punk = new Character('punk', 270, 270)
  const cyborg1 = new Character('cyborg1', 210, 210)
  const biker1 = new Character('biker1', 230, 230)
  console.log(punk)
  console.log(cyborg1)
  console.log(biker1)

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
      punk.addClass()
    


      //starts movement of ghost after 3 seconds
      setTimeout(cyborg1.releaseEnemy, 3000)
      setTimeout(biker1.releaseEnemy, 6000)
    }
  }

  //player movment
  function handleMovement(e) {
    const checkMoveRight = cells[punk.currentPosition + 1].classList.contains('walls')
    const checkMoveLeft = cells[punk.currentPosition - 1].classList.contains('walls')
    const checkMoveUp = cells[punk.currentPosition - width].classList.contains('walls')
    const checkMoveDown = cells[punk.currentPosition + width].classList.contains('walls')
    const key = e.keyCode
    const up = 38
    const down = 40
    const left = 37
    const right = 39
    punk.removeClass()
    removeCoin()
    
    if (key === right && !checkMoveRight) {
      punk.currentPosition++
    } else if (key === left && !checkMoveLeft) {
      punk.currentPosition--
    } else if (key === up && !checkMoveUp) {
      punk.currentPosition -= width
    } else if (key === down && !checkMoveDown) {
      punk.currentPosition += width
    } else if (key === left && currentPosition === 200) {
      punk.currentPosition += width - 1
    } else if (key === right && currentPosition === 219) {
      punk.currentPosition -= width - 1
    }
    punk.addClass()
  } 
  
  

  //object to store movement for enemy
  const directions = {
    left: -1,
    right: +1,
    up: -width,
    down: +width,
  }
  const directionsArr = Object.keys(directions)
  
 
  //releases ghost 1 from home
  // function releaseGhost1() {
  //   if (ghost1Current !== 210) {
  //     console.log('ghost in wrong spot')
  //     removeGhost1(ghost1Current)
  //     removePunk(currentPosition)
  //     ghost1Current = 210
  //     currentPosition = startingPosition
  //     addPunk(currentPosition)
  //   }
  //   addGhost1(ghost1Start)
  //   const leaveHome = setInterval(() => {
  //     removeGhost1(ghost1Current)
  //     ghost1Current -= width
  //     if (ghost1Current === 170) {
  //       addGhost1(ghost1Current)
  //       clearInterval(leaveHome)
  //       return enemyMoves1
        
  //     } else {
  //       addGhost1(ghost1Current) 
  //     }
  //   }, 1000)
  // }

  // const enemyMoves1 = setInterval(() => {
  //   removeGhost1(ghost1Current)
  //   choosePosition(ghost1Current)
  //   addGhost1(ghost1Current)
  //   endRound(ghost1Current)
  // }, 5000)
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
  // function choosePosition(ghost) {
    
  //   const randPosition = Math.floor(Math.random() * directionsArr.length)
    
  //   const nextMove = ghost + directions[directionsArr[randPosition]]
    

  //   if (cells[nextMove].classList.contains('walls')) {
  //     console.log('contains wall', nextMove)
  //     choosePosition(ghost)
  //   } else if (cells[nextMove].classList.contains('enemyHome')){
  //     console.log('contains home', nextMove)
  //     choosePosition(ghost)
  //   } else {
  //     console.log('move ok', nextMove)
  //     ghost = nextMove
  //     console.log('updated pos', ghost)
  //     console.log('updated ghost 1?', ghost1Current)
      
  //   }
  // }

  //logic to end the round and takes argument of ghostcurrent location 

  // function endRound(ghost) {
  //   if (cells[ghost].classList.contains('punk')) {
  //     console.log(`${ghost} got punk`)
  //     lives -= 1
  //     livesLeft.innerText = lives
  //     clearInterval(enemyMoves1) 
  //     // clearInterval(enemyMoves2) 
  //     if (lives > 0) {
  //       resetRound()
  //     }
  //     if (lives <= 0) {
  //       finalScore.innerText = score
  //       gameOverScreen.style.display = 'block'
  //       score = 0
  //       lives = 3
  //     }
  //   }
  // }
//Function to move to the next level
  nextLevel()
  function nextLevel() {
    if (coins <= 0) {
      // clearInterval(enemyMoves1) 
      // clearInterval(enemyMoves2) 
      level += 1
      levelDisplay.innerText = level
      coins = 176
      addCoins()
      // resetRound(ghost1Current)
      // resetRound(ghost2Current)
    }
  }
  
  


  //! GAME FUNCTIONS
  //removes coins from game and adds 10 points to score
  function removeCoin() {
    if (cells[punk.currentPosition].classList.contains('coin')) {
      cells[punk.currentPosition].classList.remove('coin')
      score += 10
      coins -= 1
      scoreDisplay.innerText = score
    }
  } 
  // function resetRound() {
  //   removeGhost1(ghost1Current)
  //   // removeGhost2(ghost2Current)
  //   removePunk(currentPosition) 
  //   ghost1Current = ghost1Start
  //   // ghost2Current = ghost2Start
  //   currentPosition = startingPosition

  //   addPunk(startingPosition)
  //   releaseGhost1()
  //   // releaseGhost2()
  // }
 

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