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
        answer.innerHTML = `
Ответ верный. Условие следующей задачи:<br>
<strong>Ты нашел пасхалку Джеймса Холлидэя!!!</strong> <br>
Теперь все ресурсы игры могут принадлежать тебе. Но для этого нужно еще кое-что сделать...<br>
Собери красные звезды с поля. Чтобы сделать это, закрась их <span id="color">ЖЕЛТЫМ</span> цветом.<br>
После отнеси их в Центр переработки энергии. Там подскажут, что делать дальше.
`;
    } else {
        answer.textContent = 'Ответ неверный. Проверь свою запись и повтори попытку.';
    }
});
