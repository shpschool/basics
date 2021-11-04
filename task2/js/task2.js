const task = document.getElementById('task');
const btnAND = document.getElementById('and');
const btnOR = document.getElementById('or');
const buttons = document.getElementById('buttons');
let score = 0;
let ind = 0;

task.innerHTML = `<p>Привет друг! Ты ты попал в страну Повторяндию. Чтобы из нее выбраться, тебе нужно правильно выбрать, 
                в каких случаях используется оператор AND, а в каких - OR.</p>
                <p>Читай задания и выбирай кнопку AND или OR, которая подходит в этом случае.</p>
                <p><strong>Готов?</strong></p>`;
btnAND.textContent = 'Готов!';
btnOR.classList.add("hidden");

const loadTask = async () => {
    let res = await fetch('db/tasks.json');
    res = await res.json();
    if (ind < res.length) {
        task.innerHTML = res[ind].task;
        btnAND.dataset.score = res[ind].AND;
        btnOR.dataset.score = res[ind].OR;
        ind++;
    } else {
        task.innerHTML = `<p>А это КОНЕЦ!</p><p>За этот мини-квест ты получил(а) ${score} баллов!</p>`
        buttons.classList.add('hidden');
    };
};

btnAND.addEventListener('click', () => {
    if (btnAND.textContent === 'Готов!') {
        loadTask(0);
        btnAND.textContent = 'AND';
        btnOR.textContent = 'OR';
        btnOR.classList.remove("hidden");
    } else {
        score += Number(btnAND.dataset.score);
        loadTask();
    };
});

btnOR.addEventListener('click', () => {
    score += Number(btnOR.dataset.score);
    loadTask();
});