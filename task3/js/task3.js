const prompt = document.getElementById('prompt');
const btn = document.getElementById('btn');
const code = document.getElementById('code');

const wrongAnsw = () => {
    prompt.innerHTML = `<p>Код неверный. Проверь свою запись и повтори попытку.</p>`
};

const prompt1 = (ctg, src) => {
    prompt.innerHTML = `<h3>Подсказка категории "${ctg}"</h3>
        <p>Посмотри на картинку и сделай свои выводы.</p>
        <img id="prompt-img" src="captures/${src}">`;
};

btn.addEventListener('click', () => {
    switch (code.value) {
        case '212361':
            prompt1('КТО', '212361.jpg');
            break;
        case '690108':
            prompt1('КТО', '690108.png');
            break;
        default:
            wrongAnsw();
            break;
    }
});