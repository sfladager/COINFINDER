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
  const audio = document.getElementById('audio')
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
  
  let randomMoves
  let leaveHome
  


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
  }

  class Enemy extends Character {
    constructor(className, startingPosition, currentPosition) {
      super(className, startingPosition, currentPosition)
    }
    releaseEnemy() {
      if (this.currentPosition !== this.startingPosition) {
        console.log('ghost in wrong spot')
        this.removeClass(this.currentPosition)
        this.currentPosition = this.startingPosition
      }
      
      this.addClass()
      leaveHome = setInterval(() => {
        console.log('after interval', this.currentPosition)
        this.removeClass()
        this.currentPosition -= width
        console.log('1st move', this.currentPosition)
        if (this.currentPosition === 170) {
          this.addClass()
          clearInterval(leaveHome)
          console.log('interval cleared', this.currentPosition)
          this.enemyMoves()
        } else if (cells[this.currentPosition].classList.contains('punk')) {
          clearInterval(leaveHome)
        } else {
          this.addClass()
        }
      }, 1000)
    }
    enemyMoves() {
      randomMoves = setInterval(() => {
        console.log('random moves start', this.currentPosition)
        this.removeClass()
        this.currentPosition = this.choosePosition(this.currentPosition)
        if (cells[this.currentPosition].classList.contains('punk')) {
          clearInterval(randomMoves)
          this.endRound()

        }
        this.addClass()
      }, 1000)      
    }
    choosePosition(position) {
      let randPosition = Math.floor(Math.random() * directionsArr.length)
      let nextMove = position + directions[directionsArr[randPosition]]

      while (cells[nextMove].classList.contains('walls') || cells[nextMove].classList.contains('enemyHome')) {
        randPosition = Math.floor(Math.random() * directionsArr.length)
        nextMove = position + directions[directionsArr[randPosition]]
        console.log(nextMove)
      }
      return nextMove
    }
    endRound() {
      lives -= 1
      livesLeft.innerText = lives
      clearInterval(randomMoves)
      clearInterval(leaveHome)
      if (lives > 0) {
        this.resetRound()
      }
      if (lives <= 0) {
        finalScore.innerText = score
        gameOverScreen.style.display = 'block'
        score = 0
        lives = 3
      }
    }
    resetRound() {
      this.removeClass()
      this.currentPosition = this.startingPosition
      this.addClass()
      this.releaseEnemy()
    }
  }

  const punk = new Character('punk', 270, 270)
  const cyborg1 = new Enemy('cyborg1', 210, 210)
  const biker1 = new Enemy('biker1', 230, 230)
  
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
      cyborg1.addClass() 
      biker1.addClass()
      
      //starts movement of ghost after 3 seconds
      setTimeout(() => cyborg1.releaseEnemy(), 3000)
      setTimeout(() => biker1.releaseEnemy(), 6000)
    }
  }
  //object to store movement for enemy
  const directions = {
    left: -1,
    right: +1,
    up: -width,
    down: +width,
  }
  const directionsArr = Object.keys(directions)

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
    } else if (key === left && punk.currentPosition === 200) {
      punk.currentPosition += width - 1
    } else if (key === right && punk.currentPosition === 219) {
      punk.currentPosition -= width - 1
    }
    punk.addClass()
    nextLevel()
  } 
  

  
//Function to move to the next level
  function nextLevel() {
    if (coins <= 0) {
      // clearInterval(enemyMoves1)
      // clearInterval(enemyMoves2)
      // clearInterval(enemyMoves3)
      // clearInterval(enemyMoves4)
      level += 1
      levelDisplay.innerText = level
      coins = 176
      addCoins()
      resetRound()
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
      audio.play()
    }
  }
 
  function resetRound() {
    // removeGhost1(ghost1Current)
    // removeGhost2(ghost2Current)
    punk.removeClass()
    // ghost1Current = ghost1Start
    // ghost2Current = ghost2Start
    punk.currentPosition = punk.startingPosition

    punk.removeClass()
    cyborg1.releaseGhost()
    biker1.releaseGhost()
    
  }
 

  //function getHighScore
    //get score from local storage on game load

  //function setHighScore
    //if high score is 0 or highscore is less than current score, then save score to high score with local storage
    // diplay new high score on the page



  // ? EVENTS
  //start game - run start game function and reset function
  document.addEventListener('keydown', handleMovement)
  document.addEventListener('click', startGame)
  


}

window.addEventListener('DOMContentLoaded', init)