const scene = document.querySelectorAll('#scene');
const progress1 = document.querySelectorAll('#strenght');
const progress2 = document.querySelectorAll('#power');
const btn = document.querySelectorAll('#btn');
const descr = document.querySelectorAll('#description');
const herous = document.querySelectorAll('.hero');
const codes = document.querySelectorAll('.text')
const obj = document.querySelectorAll('#object');
const streightText = document.querySelectorAll('#strenght-text');

const getData = async (url, list) => {
    let res = await fetch(url);
    res = await res.json();
    res.forEach(el => list.push(el));
};
const getLevels = async (url, list) => {
    let res = await fetch(url);
    res = await res.json();
    list.push(res["level-1"]);
    list.push(res["level-2"]);
    list.push(res["level-3"]);
};

let level = 0;
let currCode = '';
let codesArr = [];
let tasks = []; getData('db/codes.json', tasks);
let levels = []; getLevels('db/levels.json', levels);

const changeProgressStyle = el => {
    if (el.value > 0) {
        if (el.value/el.max*100 < 30) {
            el.classList.remove('strong');
            el.classList.remove('medium');
            el.classList.add('pure');
        } else if (el.value/el.max*100 < 70) {
            el.classList.remove('strong');
            el.classList.add('medium');
            el.classList.remove('pure');
        } else {
            el.classList.add('strong');
            el.classList.remove('medium');
            el.classList.remove('pure');
        }
    };
};

const showLevel = () => {
    console.log("I'm here!");
    for (let i = 0; i < levels.length; i++) {
        console.log(i === level);
        if (i === level) {
            elem = levels[i];
            console.log(elem);
            progress1.forEach(el => {
                el.value = elem.streight;
                el.max = elem.streight;
                changeProgressStyle(el);
            });
            streightText.forEach(el => el.textContent = elem.streight);
            scene.forEach(el => el.innerHTML = elem.task);
            return 1;
        };
    };
};

const showTask = (description='Введи код для выбранного героя, чтобы увидеть описание силы') => {
    descr.forEach(el => el.innerHTML = description);
};

const showError = description => {
    descr.forEach(el => el.innerHTML = description);
    obj.forEach(el => {
        el.src = 'captures/error.png';
        el.alt = 'Ошибка';
        el.classList.remove('hidden');
    });
};

const showPower = (heroInd, code) => {
    for (let i = 0; i < tasks.length; i++) {
        el = tasks[i];
        if (el.code === code) {
            if (el.hero === heroInd) {
                if (el.level === level) {
                    if (el.img) {
                        obj.forEach(elem => {
                            elem.src = el.img.src;
                            elem.alt = el.img.alt;
                            elem.classList.remove('hidden');
                        });
                    } else obj.forEach(elem => elem.classList.add('hidden'));
                    showTask(el.description);
                    progress2.forEach(elem => {
                        elem.value = el.power;
                        changeProgressStyle(elem);
                    });
                    currCode = el.code;
                    return 1;
                } else {
                    showError(`Пройди уровень ${level}, чтобы использовать данную силу.`);
                    return 1;
                };
            } else {
                showError("Этому герою данная сила не доступна.");
                return 1;
            };
        }
    };
    showError("Код неверный. Проверь свою запись и повтори попытку.");
    return 1;
};

const hideCodes = () => {
    codes.forEach(el => {
        el.classList.add('hidden');
        el.value = null;
    });
}

hideCodes();
showLevel();
showTask();

herous.forEach((el, ind) => {
    const hero = el.children[1];
    const code = el.children[2];
    hero.addEventListener('click', () => {
        hideCodes();
        code.classList.remove('hidden')
    });
    code.addEventListener('change', () => {
        showPower(ind, code.value);
    });
});

btn.forEach((butn) => {
    butn.addEventListener('click', () => {
        if (currCode) {
            if (codesArr.indexOf(currCode) === -1) {
                progress1.forEach(el => {
                    el.value -= progress2[0].value;
                    changeProgressStyle(el);
                    codesArr.push(currCode);
                });
                progress2.forEach(el => el.value = 0);
                currCode = "";
                showTask();
            } else showError("Эта сила уже использована.");
        };
        hideCodes();
    });
});