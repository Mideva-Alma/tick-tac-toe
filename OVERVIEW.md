# Prompt-Powered Kickstart: Building a Beginner’s Toolkit for JavaScript Web Apps

## 1. Title & Objective
**Title:** Prompt-Powered Kickstart: Building a Beginner’s Toolkit for JavaScript Web Apps
**Objective:** Learn how to build a browser-based game using vanilla JavaScript, HTML, and CSS. The end goal is to render a fully interactive Tic Tac Toe game with multiple difficulty levels and a level-up system.

## 2. Quick Summary of the Technology
**What is it?**
JavaScript is a versatile programming language used for client-side web development. HTML provides structure, and CSS handles styling.
**Where is it used?**
Used in nearly all modern web applications for interactivity and UI logic.
**Real-world example:**
Games, calculators, and interactive forms on websites.

## 3. System Requirements
- OS: Linux/Mac/Windows
- Tools: Any modern browser (Chrome, Firefox, Edge, etc.), VS Code or any text editor
- No external packages required

## 4. Installation & Setup Instructions
1. Clone or download this repository from GitHub.
2. Open the project folder in your code editor.
3. Open `index.html` in your browser to run the game.

## 5. Minimal Working Example
This project is a fully working Tic Tac Toe game with:
- Beginner (3x3), Medium (4x4), and Hard (6x6) grid options
- Player vs Player and Player vs Computer modes
- Win tracking and level-up system

**Code Example:**
See `src/script.js` for the main game logic. All functions are commented for clarity.

**Expected Output:**
A playable Tic Tac Toe game in your browser. The board and UI update as you play, and new levels unlock as you win.

## 6. AI Prompt Journal
Unfortunately i used Github copitot and id does not store the peevious chat logs unless you download them 
_Example:_
Prompt: “How do I generate a dynamic grid in JavaScript that goes with level dificulties eg 3by 3 grid for the first one as it grown as long are the payer has 5 concecutive wins he can be abe to unlock level dificulties easyy medium and hard?”
AI helped me scaffold the board rendering and win logic for different grid sizes.

## 7. Common Issues & Fixes
- Board not rendering: Check browser console for JavaScript errors.
- Levels not unlocking: Ensure you win 5 games in a row at the current level.
- CSS not applying: Make sure `src/style.css` is loaded and linked in `index.html`.

## 8. References
- [MDN Web Docs: JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [MDN Web Docs: HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN Web Docs: CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript Tic Tac Toe Tutorial (YouTube)](https://www.youtube.com/results?search_query=javascript+tic+tac+toe)

---
**Testing & Debugging**
- Try all difficulty levels and both game modes (PvP and PvC).
- Confirm that Medium and Hard levels are locked until you win 5 consecutive games at the previous level.
- Check that the board resizes and win logic works for 3x3, 4x4, and 6x6 grids.
- Ensure win counters and messages update correctly.

**Code Comments**
All major functions and logic in `src/script.js` are commented for clarity. Review the code for explanations of dynamic grid generation, win checking, and level-up logic.
