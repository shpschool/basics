const scene = document.querySelectorAll('#scene');
const progress1 = document.querySelectorAll('#strenght');
const progress2 = document.querySelectorAll('#power');
const btn = document.querySelectorAll('#btn');
const descr = document.querySelectorAll('#description');
const herous = document.querySelectorAll('.hero');
const codes = document.querySelectorAll('.text')
const obj = document.querySelectorAll('#object');
const streightText = document.querySelectorAll('#strenght-text');
const wrapModal = document.getElementById("wrap-modal");
const modalImg = document.getElementById("herous");
const modalText = document.getElementById("modal-h1");
const nextBtn = document.getElementById('#next-btn')

const getData = async (url, list) => {
    let res = await fetch(url);
    res = await res.json();
    res.forEach(el => list.push(el));
};

let level = 1;
let currCode = '';
let codesArr = [];
let tasks = []; getData('db/codes.json', tasks);

const levels = {
    "1" : {
        maxPower: 30,
        streight: 240,
        src: "captures/level1.png",
        alt: "Уровень 1. Дракула под замком и в цепях"
    },
    "2" : {
        maxPower: 50,
        streight: 600,
        src: "captures/level2.png",
        alt: "Уровень 2. Дракула просто в цепях"
    },
    "3" : {
        maxPower: 100,
        streight: 1600,
        src: "captures/level3.png",
        alt: "Уровень 3. Ловушка Ван Хельсинга"
    }
};

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

const hideCodes = () => {
    codes.forEach(el => {
        el.classList.add('hidden');
        el.value = null;
    });
}

const modal = () => {
    if (level === 1) {
        modalText.textContent = `Молодцы! Вы прошли 1 уровень! Но Драк все еще не на свободе! Продолжай бороться с ловушкой Ван Хельсинга!`;
        wrapModal.classList.remove('hidden');
    } else if (level === 2) {
        modalText.textContent = `Молодцы! Вы прошли 2 уровень и освободили Драка! Но пойдете ли вы дальше, на бонусный уровень?..\nРазрушите ли вы ловушку Ван Хельсинга, чтобы в нее больше никто не попал?`;
        wrapModal.classList.remove('hidden');
    } else {
        modalText.textContent = `Игра окончена! Вы освободили Драка и разрушили ловушку! Спасибо за помощью ребята!`;
        modalImg.classList.remove('hidden');
        wrapModal.classList.remove('hidden');
    };
};

const showLevel = level => {
    if (level <= 3) {
        elem = levels[level.toString()];
        progress1.forEach(el => {
            el.value = elem.streight;
            el.max = elem.streight;
            changeProgressStyle(el);
        });
        progress2.forEach(el => {
            el.max = elem.maxPower;
        });
        streightText.forEach(el => el.textContent = elem.streight);
        scene.forEach(el => {
            el.src = elem.src;
            el.alt = elem.alt;
        });
    } else {
        document.getElementById('main').classList.add('hidden');
    }
};

const showTask = (description='Введи код для выбранного героя, чтобы увидеть описание силы') => {
    descr.forEach(el => el.innerHTML = description);
};

const showError = description => {
    progress2.forEach(el => el.value = 0);
    currCode = "";
    descr.forEach(el => el.innerHTML = description);
    obj.forEach(el => {
        el.src = 'captures/error.png';
        el.alt = 'Ошибка';
        el.classList.remove('hidden');
    });
};

const treatmentError = (status) => {
    switch (status) {
        case 2:
            showError(`Пройди уровень ${level}, чтобы использовать данную силу.`)
            break;
        case 3:
            showError("Этому герою данная сила не доступна.")
            break;
        case 4:
            showError("Код неверный. Проверь свою запись и повтори попытку.")
            break;
        case 5:
            showError("Эта сила уже использована.");
            hideCodes();
            break;
    };
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
                } else return 2;
            } else return 3;
        };
    };
    return 4;
};

hideCodes();
showLevel(level);
showTask();

herous.forEach((el, ind) => {
    const hero = el.children[1];
    const code = el.children[2];
    hero.addEventListener('click', () => {
        hideCodes();
        code.classList.remove('hidden')
    });
    code.addEventListener('change', () => {
        let status = showPower(ind, code.value)
        if (status !== 1) treatmentError(status);
    });
});

nextBtn.addEventListener('click', () => wrapModal.classList.add('hidden'));

btn.forEach((butn) => {
    butn.addEventListener('click', () => {
        if (currCode) {
            if (codesArr.indexOf(currCode) === -1) {
                progress1.forEach(elem => {
                    elem.value -= progress2[0].value;
                    changeProgressStyle(elem);
                    codesArr.push(currCode);
                });
                streightText.forEach(elem => elem.textContent = progress1[0].value);
                showTask();
                hideCodes();
                obj.forEach(elem => elem.classList.add('hidden'));
                progress2.forEach(elem => elem.value = 0);
                currCode = "";
                if (progress1[0].value <= 0) {
                    modal();
                    level++;
                    showLevel(level);
                };
            } else treatmentError(5);
        };
    });
});