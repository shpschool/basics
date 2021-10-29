const prompt = document.getElementById('prompt');
const btn = document.getElementById('btn');
const code = document.getElementById('code');

const wrongAnsw = () => {
    prompt.innerHTML = `<p>Код неверный. Проверь свою запись и повтори попытку.</p>`
};

const prompt1 = (ctg, src) => {
    prompt.innerHTML = `<h3>Подсказка категории "${ctg}"</h3>
        <p>Посмотри на картинку и сделай свои выводы.</p>
        <img class="prompt-img" src="captures/${src}">`;
};

const prompt2 = (src) => {
    prompt.innerHTML = `<h3>Подсказка категории "КАК"</h3>
        <p>Посмотри на картинку и расшифруй анаграмму, чтобы получить подсказку.
        <br><span class="small"><strong>Примечание.</strong> Анаграмма - это новое "слово", полученное путем перестановки букв в исходном слове.
        <br>Тебе нужно получить иходное слово, чтобы понять подсказку.</span></p>
        <img class="wide-prompt" src="captures/${src}">`;
};

const prompt3 = (question, src) => {
    prompt.innerHTML = `<h3>Подсказка от призрака</h3>
        <p>Ты задаешь призраку вопрос:
        <br><span class="question">${question}</span>
        <br>Призрак ответил тебе при помощи спиритической доски.</p>
        <img class="wide-prompt" src="captures/${src}">`;
};

btn.addEventListener('click', () => {
    switch (code.value) {
        case '212361':
            prompt1('КТО', '212361.jpg');
            break;
        case '690108':
            prompt1('КТО', '690108.png');
            break;
        case '645057':
            prompt1('КТО', '645057.jpg');
            break;
        case '963726':
            prompt1('КТО', '963726.png');
            break;
        case '455817':
            prompt1('ГДЕ', '455817.png');
            break;
        case '180858':
            prompt1('ГДЕ', '180858.jpg');
            break;
        case '780126':
            prompt1('ГДЕ', '780126.jpg');
            break;
        case '839846':
            prompt2('839846.png');
            break;
        case '105471':
            prompt2('105471.png');
            break;
        case '482703':
            prompt2('482703.png');
            break;
        case '387672':
            question = 'КАК преступник украл драгоценные тыквы?';
            prompt3(question, '387672.png');
            break;
        case '484848':
            question = 'КАК преступник украл драгоценные тыквы?';
            prompt3(question, '484848.png');
            break;
        case '501726':
            question = 'КТО украл драгоценные тыквы?';
            prompt3(question, '501726.png');
            break;
        case '602140':
            question = 'КТО посмел украсть драгоценные тыквы?';
            prompt3(question, '602140.png');
            break;
        case '603034':
            prompt.innerHTML = `<h3>Анализ ДНК</h3>
                <p>Для анализа ДНК нужна улика, содержащая частички преступника.
                Напиши в поле ниже название улики, которую мы нашли при первом осмотре места преступления.</p>
                <input id="ulika"><button id="btn2">Проверить улику</button>
                <p id="answer" class="question"></p>`;
            const ulika = document.getElementById('ulika');
            const btn2 = document.getElementById('btn2');
            const answer = document.getElementById('answer');

            btn2.addEventListener('click', () => {
                if (ulika.value.toLowerCase() === "перчатка") {
                    answer.textContent = 'Преступник обнаружен. Его фамилия Джоватти.';
                };
            });
            break;
        default:
            wrongAnsw();
            break;
    }
});