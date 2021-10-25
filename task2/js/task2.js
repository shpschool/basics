const task = document.getElementById('task');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const buttons = document.getElementById('buttons');
let score = 0;

task.innerHTML = `<p>Привет друг! Ты готов повеселиться?</p>`
btn1.textContent = 'Готов!';
btn2.textContent = 'Нет, отмена';

const task2 = () => {
    task.innerHTML = `<p>А это задание №2</p>`
    btn1.textContent = 'А здесь я ответил неверно!';
    btn2.textContent = 'А здесь ответил верно!';
};
const task3 = () => {
    task.innerHTML = `<p>А это КОНЕЦ!</p><p>За этот мини-квест ты получил(а) ${score} баллов!</p>`
    buttons.classList.add('hidden');
};

btn1.addEventListener('click', () => {
    switch (btn1.textContent) {
        case 'Готов!':
            score += 1;
            task2();
            break
        case 'А здесь я ответил неверно!':
            task3();
            break
    }
});

btn2.addEventListener('click', () => {
    switch (btn2.textContent) {
        case 'Нет, отмена':
            task3();
            break
        case 'А здесь ответил верно!':
            score += 1;
            task3();
            break
    }
});