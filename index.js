/*
 * @FilePath     : /games/舒尔特方格/index.js
 * @Author       : kunighting
 * @Date         : 2025-05-27 14:59:30
 * @LastEditTime : 2025-05-27 15:00:39
 * @Description  : 
 */
let numbers = [];
let currentNumber = 1;
let timerInterval;
let startTime;
let isPlaying = false;

function createGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    shuffleArray(numbers);

    numbers.forEach(num => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = num;
        cell.onclick = () => checkNumber(cell, num);
        grid.appendChild(cell);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame() {
    resetGame();
    isPlaying = true;
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 100);
    document.getElementById('startBtn').textContent = '重新开始';
}

function resetGame() {
    clearInterval(timerInterval);
    document.getElementById('time').textContent = '0.0';
    currentNumber = 1;
    isPlaying = false;
    createGrid();
    document.getElementById('startBtn').textContent = '开始游戏';
}

function updateTimer() {
    if (isPlaying) {
        const elapsed = (Date.now() - startTime) / 1000;
        document.getElementById('time').textContent = elapsed.toFixed(1);
    }
}

function getGrade(time) {
    if (time <= 20) return 'S级 - 超神! 你的注意力非常集中!';
    if (time <= 30) return 'A级 - 优秀! 继续保持!';
    if (time <= 45) return 'B级 - 良好! 还有提升空间!';
    if (time <= 60) return 'C级 - 一般! 需要多加练习!';
    return 'D级 - 加油! 建议每天练习10分钟!';
}

function showModal(time, grade) {
    document.getElementById('finalTime').textContent = `用时: ${time}秒`;
    document.getElementById('finalGrade').textContent = `评级: ${grade}`;
    document.getElementById('scoreModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('scoreModal').style.display = 'none';
}

function checkNumber(cell, num) {
    if (!isPlaying) return;

    if (num === currentNumber) {
        cell.classList.add('correct');
        currentNumber++;

        if (currentNumber > 25) {
            clearInterval(timerInterval);
            isPlaying = false;
            const finalTime = parseFloat(document.getElementById('time').textContent);
            const grade = getGrade(finalTime);
            showModal(finalTime, grade);
        }
    }
}

// 初始化游戏
createGrid();