const prompt = document.getElementById('prompt');
const btn = document.getElementById('btn');
const code = document.getElementById('code');

const getData = async (url, list) => {
    let res = await fetch(url);
    res = await res.json();
    res.forEach(el => list.push(el));
};
let prompts = []; getData('db/codes.json', prompts);

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

const showPrompt = (code) => {
    for (let i = 0; i < prompts.length; i++) {
        el = prompts[i];
        if (el.code === code) {
            if (el.ctg === 'КТО' || el.ctg === 'ГДЕ') prompt1(el.ctg, el.src)
            else if (el.ctg === 'КАК') prompt2(el.src)
            else if (el.ctg === 'ПРИЗРАК') prompt3(el.question, el.src)
            else if (el.ctg === 'ДНК') {
                prompt.innerHTML = `<h3>Анализ ДНК</h3>
                <p>Для анализа ДНК нужна улика, содержащая частички преступника.
                Напиши в поле ниже название улики, которую мы нашли при первом осмотре места преступления.</p>
                <input id="ulika"><button id="btn3">Проверить улику</button>
                <p id="answer" class="question wide-prompt"></p>`;
                const ulika = document.getElementById('ulika');
                const btn3 = document.getElementById('btn3');
                const answer = document.getElementById('answer');

                btn3.addEventListener('click', () => {
                    if (ulika.value.toLowerCase() === "перчатка") {
                        answer.textContent = 'Преступник обнаружен. Его фамилия Джоватти.';
                    } else {
                        answer.textContent = "Улика не найдена в базе. Проверь свою запись и повтори попытку."
                    }
                });
            };
            return true;
        }
    }
    prompt.innerHTML = `<p>Код неверный. Проверь свою запись и повтори попытку.</p>`
    return false
};

btn.addEventListener('click', () => showPrompt(code.value));