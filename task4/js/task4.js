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

const getData = async (url, list) => {
    let res = await fetch(url);
    res = await res.json();
    res.forEach(el => list.push(el));
};

let level = 1;
let currCode = '';
let codesArr = [];
let tasks = []; getData('https://raw.githubusercontent.com/iamgo100/task_shp/main/task4/db/codes.json', tasks);

const levels = {
    "1" : {
        streight: 240,
        src: "",
        alt: ""
    },
    "2" : {
        streight: 1120,
        src: "",
        alt: ""
    },
    "3" : {
        streight: 4000,
        src: "",
        alt: ""
    },
    "4" : {
        streight: 0,
        src: "",
        alt: ""
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

const showLevel = level => {
    if (level <= 3) {
        elem = levels[level.toString()];
        progress1.forEach(el => {
            el.value = elem.streight;
            el.max = elem.streight;
            changeProgressStyle(el);
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

const setDefault = () => {
    progress2.forEach(el => el.value = 0);
    currCode = "";
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
    setDefault();
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
        };
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

const modal = () => {
    if (level < 3) {
        modalText.textContent = `Молодцы! Вы прошли ${level} уровень! Продолжаем!`;
        wrapModal.classList.remove('hidden');
        setTimeout(() => wrapModal.classList.add('hidden'), 3000);
    } else {
        modalText.textContent = `Игра окончена! Вы освободили Драка!`;
        modalImg.classList.remove('hidden');
        wrapModal.classList.remove('hidden');
    };
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
                streightText.forEach(el => el.textContent = progress1[0].value);
                setDefault();
                showTask();
                if (progress1[0].value <= 0) {
                    modal();
                    level++;
                    showLevel(level);
                };
            } else {
                showError("Эта сила уже использована.");
            };
        };
        hideCodes();
        setDefault();
    });
});