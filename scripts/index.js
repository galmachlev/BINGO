let currentRandomRoll; // המשתנה שיחזיק את המספר האקראי הנוכחי
let cells = document.querySelectorAll('td'); // מערך של כל התאים בטבלה
let usedNumbers = []; // מערך של המספרים שנמצאים בשימוש
let isGameStarted = false; // משתנה המציין אם המשחק התחיל(לאחר שהכפתור נלחץ בפעם הראשונה)
let isGameWon = false; // משתנה המציין אם המשחק הסתיים והמשתמש ניצח
let redCount = 0; // משתנה המציין את מספר התאים האדומים

//קריאה לפונקציה בכדי להתחיל את המשחקק ולהציג את המספרים בתאי הטבלה
displayNumbers();

//ball-container יצירת משתנה השומר את האלמנט של ה 
let ballContainer = document.querySelector('#ball-container');
ballContainer.style.visibility = 'hidden'; // נסתר בהתחלה

//btn יצירת משתנה השומר את האלמנט של ה 
let btn = document.querySelector("#btn");

//שיוך אירוע לחיצה על כפתור ההגרלה
btn.addEventListener('click', () => {
    let randomRoll = generateRandomNumber();
    let ball = document.createElement('span');
    ball.textContent = randomRoll;
    ball.className = 'ball';
    ballContainer.innerHTML = '';
    ballContainer.appendChild(ball);
    ballContainer.style.visibility = 'visible'; //הצגה לאחר לחיצה
    isGameStarted = true; //סימון שהמשחק התחיל
});

//שיוך אירוע לחיצה על כל אחד מתאי הטבלה
cells.forEach((cell) => cell.addEventListener("click", cellClickHandler));
