const bonus = document.getElementById('bonus');
const btn = document.getElementById('btn');
const code = document.getElementById('code');
const keyBox = document.getElementById('key');

const getData = async (list) => {
    let res = await fetch('db/codes.json').then(res => res.json());
    res.forEach(el => list.push(el));
};
let bonuses = []; getData(bonuses);

const showPrize = () => {
    document.getElementById('columns').classList.add('hidden');
    document.getElementById('finish').classList.remove('hidden');
    document.getElementById('prize').innerHTML = `
        <iframe
            src="https://trinket.io/embed/python/b83a2e8601?outputOnly=true&runOption=run&start=result"
            width="565" height="600" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen>
        </iframe>`;
};

const showBonus = (code) => {
    for (let i = 0; i < bonuses.length; i++) {
        elem = bonuses[i];
        if (elem.code == code) {
            if (elem.bonus === "prize") {
                showPrize();
                return true;
            }
            bonus.innerHTML = `<p>Получив заветный приз, используй клавиши <span class="bonus">${elem.bonus}</span> для получения бонуса ускорения или замедления.</p>`;
            return true;
        }
    }
    bonus.innerHTML = `<p>Код неверный. Проверь свою запись и повтори попытку.</p>`;
    return false;
};

const showKey = (code) => {
    let key = document.getElementById(code);
    if (key) key.classList.remove('hidden')
    else showBonus(code);
    let fullKey = keyBox.querySelector('.hidden');
    if (!fullKey) document.getElementById('next').classList.remove('hidden');
};

btn.addEventListener('click', () => showKey(code.value));