const body = document.body;

body.innerHTML = `
<div id="cont">
<label>Введи полученную фразу:</label>
<input id="answer-input">
<button id="btn">Отправить ответ</button>
<p></p>
<p id="answer"></p>
</div>
`

const input = document.getElementById('answer-input');
const btn = document.getElementById('btn');
const answer = document.getElementById('answer');

btn.addEventListener('click', () => {
    let answ = input.value;
    if (answ.toLowerCase() === 'красная звезда укажет путь к времени') {
        answer.textContent = 'Ответ верный. Условие след. задачи - вот.';
    } else {
        answer.textContent = 'Ответ неверный. Проверь свою запись и повтори попытку.';
    }
});
