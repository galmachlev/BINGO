//פונקציה שיוצרת מספר רדנומלי חדש ומחזירה אותו
function generateRandomNumber() {
    currentRandomRoll = Math.floor(Math.random() * 100) + 1; // יצירת מספר אקראי בין 1 ל-100
    return currentRandomRoll;
}

//פונקציה שמפעילה את היצירת מספר רנדומלי ומציבה בתאי הטבלה + מוודאת שאין כפילות במספרים שבטבלה
function displayNumbers() {
    for (let i = 0; i < cells.length; i++) {
      let randomNumber = generateRandomNumber(); // יצירת מספר רנדומלי עבור כל תא בטבלה
          
      // בדיקה שהמספר לא נמצא כבר בשימוש
      while (usedNumbers.includes(randomNumber)) {
        randomNumber = generateRandomNumber(); // במידה וכן יצירת מספר אקראי חדש
      }
  
      usedNumbers.push(randomNumber); // הוספת המספר למערך המספרים שנמצאים בשימוש
      cells[i].textContent = randomNumber; // הצגת המספר בתוך התא
    }
  }
  
//פונקציה שמוודאת שהמשתמש ניצח אם הצליח למצוא שורה שלמה או טור שלם
function checkWin() {
    for (let row = 0; row < 7; row++) {
        let greenRowCount = 0;
        let greenColCount = 0;

        for (let col = 0; col < 7; col++) {
            let cellRow = document.getElementById(`cell-${row}-${col}`);
            let cellCol = document.getElementById(`cell-${col}-${row}`);
            //בדיקה והחזרת אמת במידה ובשורה יש 7 תאים ירוקים
            if (cellRow.style.backgroundColor === 'lightgreen') {
                greenRowCount++;
                if (greenRowCount === 7) {
                    return true;
                }
            }
            //בדיקה והחזרת אמת במידה ובטור יש 7 תאים ירוקים
            if (cellCol.style.backgroundColor === 'lightgreen') {
                greenColCount++;
                if (greenColCount === 7) {
                    return true;
                }
            }
        }
    }
    return false;
}

//פונקציה שמופעלת לאחר לחיצה על תא מסוים בטבלה ועושה פעולות בהתאם לתנאים
function cellClickHandler(event) {
    if (!isGameStarted) {
        alert(`You need to click the draw number button first`); // הודעה אם השחקן לחץ על תא לפני שהמשחק התחיל
        return;
    }

    let clickedCell = event.target; // התא שנלחץ
    let clickedCellValue = parseInt(clickedCell.innerText); // הערך שבתוך התא שנלחץ ממורה ממחרוזת למספר שלם

    if (currentRandomRoll === undefined) {
        return;
    }

    if (clickedCellValue === currentRandomRoll) {
        clickedCell.style.backgroundColor = 'lightgreen'; // השתנה אם התא שנלחץ מכיל את המספר האקראי
    } else {
        clickedCell.style.backgroundColor = 'red'; // השתנה אם התא שנלחץ אינו מכיל את המספר האקראי
        redCount++;
        if (redCount === 3) {
            alert('Game over, you revealed 3 red cells. Better luck next time!'); // הודעה אם השחקן חשף 3 תאים אדומים
            resetGame(); // איפוס המשחק
        }
    }

    if (!isGameWon && checkWin()) {
        isGameWon = true; // סימון שהמשחק ניצח
        alert('Congratulations! You won!'); // הודעה אם השחקן ניצח
        animateConfetti(); // קריאה לפונקציה להפעלת האנימציה של זיקוקים
    }
}

//פונקציה שיוצרת את האנימציה של הקונפטי בעת ההכרזה על ניצחון
function animateConfetti() {
    let container = document.querySelector('#body');

    for (let i = 0; i < 100; i++) {
        let confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        container.appendChild(confetti);
    }
}

//פונקציה שמגרילה צבעים רנדומליים בשביל הקונפטי
function getRandomColor() {
    let colors = ["#ffcc00", "#ff6699", "#66ccff", "#99ff99", "#ff99cc"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
//פונקציה שיוצרת את הקונפטי
function animateConfetti() {
    let container = document.querySelector("#body");
  
    for (let i = 0; i < 100; i++) {
      let confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = getRandomNumber(0, 100) + "vw";
      confetti.style.animationDelay = getRandomNumber(0, 3) + "s";
      confetti.style.setProperty("--confetti-color", getRandomColor());//קריאה לפונקציה שמגרילה צבעים
      container.appendChild(confetti);
    }
}

//פונקציה שאחראית לאיפוס המשחק והחזרתו למצב תחילה
function resetGame() {
    usedNumbers = [];
    cells.forEach((cell) => {
        cell.style.backgroundColor = '';
    });
    currentRandomRoll = undefined;
    isGameStarted = false;
    redCount = 0;
    isGameWon = false;
    document
        .querySelector('#result')
        .innerHTML = '';
    let container = document.querySelector('.container');
    container.innerHTML = '';
}