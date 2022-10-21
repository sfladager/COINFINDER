# COINFINDER

This game was created for my first project for General Assembly. We were given one week to independently build a grid based game utilizing Javascript, CSS, and HTML. I chose pac-man from a list of games and called it Coin Finder. In the game you control a punk and there are 4 cyborgs trying to catch the punk. Bitcoins are placed on the grid, and as the punk, you need to collect them all to win the round to move on to the next level. If a cyborg catches you, the round is over and you lose a life. Catch as many bitcoins as you can to set the high score.

![welcome-popUp](assets/screenshots/welcome-popUp.png)
![game-screen](assets/screenshots/game-screen.png)
![gameOver](assets/screenshots/gameOver.png)

# Demo

Play Coin Finder → [Demo](https://sfladager.github.io/COINFINDER/)

# Features
- High score tracking using local storage.
- Start game pop up, and game over pop up.
- Sound effects for collecting coins, next level advancement, and losing a life.
- Round resets when all coins are collected or when punk is captured. Coins only loaded at the next level.
- Sized for screen 600 x 600 px and up. Uses a media query to adjust the grid if the screen is over 992 x 992px. Game stays centered. 

# Brief
- The player should be able to clear at least one board.
- The player’s score should be displayed at the end of the game

# Planning
I started creating a wire-frame for HTML/CSS in Figma. I had never used Figma before, and I found it very helpful, and easy to use. I put some basic HTML & CSS ideas to help with implementation. Once I was happy with my wireframe, I moved on to pseudo coding the javascript. This part was more difficult than I thought, as there are so many ways to go about it, and the pseudocode grew quickly.
[wire-frame](assets/wire-frame.png)


# Build

# The game grid
My first milestone to complete was to create a grid and the game map. The picture on the right shows the early phase of the map. I created the grid with javascript using a for loop, and I positioned the grid with display: flex, and flex-wrap. I started adding the class wall to the grid using conditional logic. The picture to the right is where I left off for the day.
[early-phase-grid](/assets/Screenshots/early-phase-grid.png)

I chose to go with a 20 x 20 grid for the project. 
```
const width = 20
const height = 20
const cellCount = width * height
const cells = []
```
This is the for loop used to create the grid. Each cell was pushed in an array to be referenced for styling the grid and movement.

```
function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      //creates div
      const cell = document.createElement('div')
      //display index of the element (used for troubleshooting)
      // cell.innerHTML = i
      //add index as data-id
      cell.dataset.index = i
      //appendchild to the grid
      grid.appendChild(cell)
      //push cell into an array
      cells.push(cell)
    }
  }
```
The walls and enemy home were added to the grid with conditional logic and the .some() array method and using the add class method to the desired grid cells. I later realized I could have used an array and a for loop to add the map as desired, and the added benefit would have been easier map customization for different levels. 
```
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
```

The bitcoins were added to the map in a function with a conditional statement to add the coins on any cell that wasn’t  a wall or enemy home. The function is used on game load, start, and at the next level. 
```
function addCoins() {
    cells.some((cell) => {
      if (!cell.classList.contains('walls') && !cell.classList.contains('enemyHome')) {
        cell.classList.add('coin')
      }
    })
  }
```

# Characters
The characters were added by removing and adding the class to each cell. I created each function manually for each character. I first focused on getting the game to function with the punk and 1 cyborg, with the thought of adding the remaining enemies later. This was my biggest mistake, as I ended up hard coding a lot of things. I should have focused on utilizing classes and objects from the beginning.
addClass and removeClass function shown below
```
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
  ```

  # Punk Movement
  This was my second major milestone. A function was created for the punk movement that had an event listener when each arrow key was pressed down, and conditional logic was given in the function to prevent the punk from going through walls or off grid. The punk could also move from 1 side of the screen to the other. 

  ```
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
  ```

# Enemy Movement
This was the third major milestone. The enemy movement uses a setTimeout function to release each enemy 1 by 1 which is then cleared after the enemy exits the home. The timeout function is activated when the start button is pressed or the round is reset. A setInterval timer is then activated which begins moving the enemy in random directions.

```
function releaseGhost1() {
    if (ghost1Current !== ghost1Start) {
      removeGhost1(ghost1Current)
      ghost1Current = ghost1Start
    }
    addGhost1(ghost1Start)
    leaveHome1 = setInterval(() => {
      removeGhost1(ghost1Current)
      ghost1Current -= width
      if (ghost1Current === 170) {
        addGhost1(ghost1Current)
        clearInterval(leaveHome1)
        enemyMoves1 = setInterval(() => {
          removeGhost1(ghost1Current)
          ghost1Current = choosePosition(ghost1Current)
          addGhost1(ghost1Current)
          endRound(ghost1Current)
        }, 1000)

      } else {
        addGhost1(ghost1Current)
      }
    }, 1000)
  }
```
The choosePosition function chooses a random cell that borders the current cell and choose one of the cells that does not contain class ‘walls’ or ‘enemyHome’. I had to add a conditional here to check if an enemy has captured the punk and apply the endRound function which also clears the timers. I didn’t have this check here initially, and the game kept crashing because the while loop would run infinitely when the enemies were put back home. This solved the problem. 

```
function choosePosition(ghost) {
    let randPosition = Math.floor(Math.random() * directionsArr.length)
    let nextMove = ghost + directions[directionsArr[randPosition]]

    while (cells[nextMove].classList.contains('walls') || 
    cells[nextMove].classList.contains('enemyHome')) {
      randPosition = Math.floor(Math.random() * directionsArr.length)
      nextMove = ghost + directions[directionsArr[randPosition]]
      if (cells[ghost].classList.contains('punk')){
        endRound()
      } 
      if (cells[nextMove] === 200) {
        console.log('move to cell 219')
        nextMove += width - 1
      } else if (cells[nextMove] === 219) {
        console.log('move to cell 200')
        nextMove -= width - 1
      }
    }
    return nextMove
  }
```

# Ending the round or the game
To end the round a conditional was added to check when the enemy moves into a new position if the cell contains class ‘punk’. If the punk is in the cell a life is lost, and all timers are cleared. Another check occurs to see if lives > 0 or lives <= 0 to determine what action to take next. If lives > 0 the round is reset and the game continues. If lives <=0 the game is stopped and the game over popup appears. You might notice an excessive use of the stopTimers function, and this is because I found not every timer was cleared in certain situations, so I was generous with the function to prevent infinite loops. 

```
function endRound(ghost) {
    if (cells[ghost].classList.contains('punk')) {
      lostRoundAudio.play()
      lives -= 1
      livesLeft.innerText = lives
      stopTimers()
      if (lives > 0) {
        stopTimers()
        resetRound()
      }
      if (lives <= 0) {
        stopTimers()
        setHighScore(score)
        finalScore.innerText = score
        gameOverScreen.style.display = 'block'
        score = 0
        lives = 3
      }
    }
  }
```

# Reset round
This function was created to reset the position of all the characters to their starting position and also set the timer to release the enemies again.
```
 function resetRound() {
    stopTimers()
    removeGhost1(ghost1Current)
    removeGhost2(ghost2Current)
    removeGhost3(ghost3Current)
    removeGhost4(ghost4Current)
    removePunk(currentPosition)
    ghost1Current = ghost1Start
    ghost2Current = ghost2Start
    ghost3Current = ghost3Start
    ghost4Current = ghost4Start
    currentPosition = startingPosition
    addPunk(startingPosition)
    setTimeout(releaseGhost1, 1000)
    setTimeout(releaseGhost2, 3000)
    setTimeout(releaseGhost3, 5000)
    setTimeout(releaseGhost4, 7000)
  }
```