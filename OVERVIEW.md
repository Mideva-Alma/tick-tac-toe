
# Tic Tac Toe Web App Overview

## Features
- Multiple difficulty levels: Beginner (3x3), Medium (4x4), Hard (6x6)
- Play against another person or the computer (robot)
- Tracks and displays number of wins for each player
- Level-up system: Win 5 consecutive games at a level to unlock the next
- Simple, clean UI with dynamic board size

## Technologies Used
- HTML, CSS, JavaScript (runs in browser)

## File Structure
- index.html: Main HTML file
- src/style.css: Styling for the game
- src/script.js: Game logic and interactivity

## How It Works
1. User selects mode: Player vs Player or Player vs Computer.
2. User selects difficulty: Beginner (default), Medium, or Hard. Medium and Hard are locked until unlocked by winning 5 consecutive games at the previous level.
3. Players take turns marking X or O. In Player vs Computer mode, the robot plays as O.
4. Game checks for win/draw after each move. Win counters and consecutive win streaks update after each game.
5. When 5 consecutive wins are achieved at a level, the next level is unlocked.

## How to Run
Open `index.html` in your browser. No server or Python required.

## Testing
- Try all difficulty levels and both game modes (PvP and PvC).
- Confirm that Medium and Hard levels are locked until you win 5 consecutive games at the previous level.
- Check that the board resizes and win logic works for 3x3, 4x4, and 6x6 grids.
- Ensure win counters and messages update correctly.

## Debugging
- If the board does not render correctly, check the browser console for JavaScript errors.
- If levels do not unlock, ensure you are winning 5 games in a row without losing or drawing.
- For style/layout issues, verify that `src/style.css` is loaded and the board has the correct class (size-3, size-4, size-6).

## Code Comments
All major functions and logic in `src/script.js` are commented for clarity. Review the code for explanations of dynamic grid generation, win checking, and level-up logic.
