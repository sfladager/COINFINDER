# COINFINDER

This game was created for my first project in the General Assembly Software Engineering Immersive Course. We were given one week to independently build a grid based game utilizing JavaScript, CSS, and HTML. I chose pac-man from a list of games and called it Coin Finder. In the game you control a punk and there are 4 cyborgs trying to catch the punk. Bitcoins are placed on the grid, and as the punk, you need to collect them all to win the round to move on to the next level. If a cyborg catches you, the round is over and you lose a life. Catch as many bitcoins as you can to set the high score.


![welcome-popUp](/assets/Screenshots/welcome-popUp.png)
![game-screen](/assets/Screenshots/game-screen.png)
![GameOver](/assets/Screenshots/GameOver.png)

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
- The player’s score should be displayed at the end of the game.

# Technologies Used
JavaScript:
- Created DOM elements.
- setTimeout at start of game to delay ghosts actions.

CSS:
- Grid created with flex box.
- Toggling classes on and off to add style.

HTML:
- Overlays for start screen and game over screen.
- Audio elements for sound effects.


# Planning
I started creating a wire-frame for HTML/CSS in Figma. I had never used Figma before, and I found it very helpful, and easy to use. I put some basic HTML & CSS ideas to help with implementation. Once I was happy with my wireframe, I moved on to pseudo coding the JavaScript. This part was more difficult than I thought, as there are so many ways to go about it, and the pseudocode grew quickly.
![wire-frame](/assets/Screenshots/wireframe.png)
A gif below shows the length of the pseudocode. 
![pseudocode](https://media.giphy.com/media/QHA9OTGqAWIurGQlj3/giphy.gif)

# Build

## Game grid
My first milestone to complete was to create a grid and the game map. The picture on the right shows the early phase of the map. I created the grid with JavaScript using a for loop, and I positioned the grid with display: flex, and flex-wrap. I started adding the class wall to the grid using conditional logic. The picture below is where I left off for the day.

![early-phase-grid](/assets/Screenshots/early-phase-grid.png)

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

The bitcoins were added to the map in a function with a conditional statement to add the coins on any cell that wasn’t a wall or enemy home. The function below was used on game load, start, and at the next level. 

```

function addCoins() {
    cells.some((cell) => {
      if (!cell.classList.contains('walls') && !cell.classList.contains('enemyHome')) {
        cell.classList.add('coin')
      }
    })
  }
  
```

## Characters
The punks were added by removing and adding the class to each cell. I manually created each function for each character. I first focused on getting the game to function with the punk and 1 cyborg, with the intention of adding the remaining enemies later. This was my biggest mistake, as I ended up hard coding a lot of things. I should have focused on utilizing classes and objects from the beginning. Below is an example of the code used to add and remove sprites from the screen.

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

 ## Punk Movement
The second major milestone was creating a function to make the punk move within the game grid. An event listener was created to listen when an arrow key was pressed down, and conditional logic was given in the function to prevent the punk from going through walls or off grid. The punk could also move from 1 side of the screen to the other. The function used for this is called handleMovement and is shown below.

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

## Enemy Movement
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
The choosePosition function (displayed below) chooses a random cell that borders the current cell and chooses one of the cells that does not contain class ‘walls’ or ‘enemyHome’. Conditional logic was added here to check if an enemy has captured the punk and apply the endRound function which also clears the timers. I didn’t have this check here initially, and the game kept crashing because the while loop would run infinitely when the enemies were put back home. The conditional check solved the problem. 

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

## Ending the round or the game
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

## Reset round
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

## Remove Coins and Increase Score
The removeCoin function checks if the class coin exists and then removes the coin from the cell. 10 points are added to the global variable score, and 1 coin is removed from the global variable coins. The score is updated on the screen and the current score is checked against the high score. If the score is greater than the high score, then the high score will also get updated. A coin sound is played every time a coin is collected. This function is added to the player movement so it’s executed every time the player moves.

```

function removeCoin() {
    if (cells[currentPosition].classList.contains('coin')) {
      cells[currentPosition].classList.remove('coin')
      score += 10
      coins -= 1
      scoreDisplay.innerText = score
      setHighScore(score)
      highScoreDisplay.innerHTML = getHighScore()
      audio.play()
    }
  }
  
```
## Next Level
The nextLevel function is executed in the player movement function. Every time the player moves the function checks if ‘coins’ variable is <= 0. If the statement becomes true next level sound is executed, the level is increased, coins are reloaded and the round is reset. 
```

 function nextLevel() {
    if (coins <= 0) {
      stopTimers()
      nextLevelAudio.play()
      level += 1
      levelDisplay.innerText = level
      coins = 176
      addCoins()
      resetRound()
    }
  }
  
  ```
## Start Game
When the game loads the start game pop up appears with instructions and a start button. An event listener is added to the button, and when the button is clicked the function is executed. It is also used to start the game on the game over screen, so it also resets all variables to starting values, checks to make sure timers are stopped, adds the coins to the grid, and resets the round, which also activates the enemies. 
```

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
      stopTimers()
      addCoins()
      resetRound()
    }
  }
  
  ```

# Challenges
- Initially coming up with the structure of the code to make everything work together, and getting the enemies to move in the game. Pseudocoding made the project seem overwhelming at first. Breaking the project down step by step and starting with the essentials helped me move forwards.
- Implementing multiple ghosts with the way I wrote the code. Since I did not utilize classes well, a lot of repetitive code was needed, which made things confusing. Getting the timers to work properly became complex, and I had to add a lot of redundant code to ensure all timers were stopped when needed. 
- Troubleshooting why the game was crashing after 4 enemies were moving. Crashes appeared to be random. This was due to timers not working as intended.
- Producing a fully functional game required a lot of functions that I had never seen before. I came up with an idea and tested to see if it would work. With the use of console.log I was guided to a solution to all of my problems. This is where I really learned the value of logging everything. Console.log helped me discover what my functions were actually doing when they didn’t work as I planned, and by doing this I was able to find a solution to my problem.

# Wins
- Solving the issue of infinite loops caused by the choosePosition function running wild due to timers not being completely stopped before starting again.
- Having a fully functioning game with a start/game over pop up, levels increasing, and rounds resetting properly. I saw previous projects did not have levels, or complete start, stop, reset functions, so I made it a goal to include this functionality.
- Game dynamically resizes for different sized screens. 
- I am passionate about the crypto industry, so I was happy to include a crypto related theme into the pacman game. 

# Key learnings
- One of my biggest lessons was the importance of objects and classes. I should have included them in my initial plan, and used them from the start. Having a well put together plan is critical. I planned to add classes and objects after I finished the game with 1 enemy, but I found that was not such an easy task with the way I coded things. 
- Dynamic code reduces the amount of code needed, and makes troubleshooting much easier. The importance of “DRY” became obvious.
- More comfortable with DOM elements and event listeners

# Bugs
- To my knoweldge the game is bug free.

# Future improvements
- I started writing a version 2 of the game utilizing classes with the goal of reducing the amount of code used. I plan on finishing this to improve my knowledge of classes and objects.
- In version 2 I need to change the way I use timers, so I want to make them more dynamic and easier to clear. I also want to be able to decrement the interval for the enemy movement as the level increases.
- Next plan is to add enemy movement logic to get the enemy to chase the punk.
- Add the power ups for the punk to capture the ghosts and send them back home.
- Add a bonus coin for the punk to capture each round. 
- Option to select a player from a list of players or use your own NFT as a player
- Improved visual appeal
