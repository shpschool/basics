const images = document.getElementById('images');
const task = document.getElementById('task');
const btnAND = document.getElementById('and');
const btnOR = document.getElementById('or');
const btnNext = document.getElementById('next');
const buttons = document.getElementById('buttons');
let score = 0;
let ind = 0;

task.innerHTML = `<img src='captures/robot.png' alt='Картинка с роботом из ШП'> <p>Привет друг! Ты ты попал в страну Повторяндию. Чтобы из нее выбраться, тебе нужно правильно выбрать, 
                в каких случаях используется оператор AND, а в каких - OR.</p>
                <p>Читай задания и выбирай кнопку AND или OR, которая подходит в этом случае.</p>
                <p><strong>Готов?</strong></p>`;
btnNext.textContent = 'Готов!';
btnAND.classList.add("hidden");
btnOR.classList.add("hidden");
images.classList.add("hidden");

btnNext.addEventListener('click', async () => {
    let res = await fetch('db/tasks.json');
    res = await res.json();
    if (ind < res.length) {
        task.innerHTML = res[ind].task;
        btnAND.dataset.score = res[ind].AND;
        btnOR.dataset.score = res[ind].OR;
        images.innerHTML = res[ind].images;
        btnNext.classList.add("hidden");
        btnAND.classList.remove("hidden");
        btnOR.classList.remove("hidden");
        images.classList.remove('hidden');
        if (btnNext.textContent === "Готов!") btnNext.textContent = "Дальше";
    } else {
        task.innerHTML = `<h1>А это КОНЕЦ!</h1> <p>Ты все-таки выбрался из страны Повторяндии. Путь был долгий и не простой, но ты справился!</p><p>За этот мини-квест ты получил(а) ${score} баллов!</p>`
        buttons.classList.add('hidden');
        images.classList.add('hidden');
    };
});

const checking = async (answer) => {
    let res = await fetch('db/tasks.json');
    res = await res.json();
    if (answer) {
        task.innerHTML = res[ind].right;
        score += 1
    } else {
        task.innerHTML = res[ind].wrong;
    };
    ind++;
    btnNext.classList.remove("hidden");
    btnAND.classList.add("hidden");
    btnOR.classList.add("hidden");
    images.classList.add('hidden');
};

btnAND.addEventListener('click', () => {
    checking(Number(btnAND.dataset.score));
});

btnOR.addEventListener('click', () => {
    checking(Number(btnOR.dataset.score));
});