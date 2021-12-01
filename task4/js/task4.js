const scene = document.querySelectorAll('#scene');
const progress1 = document.querySelectorAll('#strenght');
const progress2 = document.querySelectorAll('#power');
const powerCont = document.querySelectorAll('#using-power');
const btn = document.querySelectorAll('#btn');
const descr = document.querySelectorAll('#description');
const herous = document.querySelectorAll('.hero');
const codes = document.querySelectorAll('.text')

const changeProgressStyle = (el) => {
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

const showPower = async (heroInd, code) => {
    // let res = await fetch('db/codes.json');
    // res = await res.json();
    // console.log(res);
    description = 'Введи код для выбранного героя, чтобы увидеть описание силы';
    descr.forEach((el) => el.textContent = description);
    progress2.forEach((el) => {
        el.value = 30;
        changeProgressStyle(el);
    });
};

const hideCodes = () => {
    codes.forEach((el) => {
        el.classList.add('hidden');
        el.value = null;
    });
}

hideCodes();
scene.forEach((el) => el.innerHTML = '<img src="captures/hero0.png" id="hero0">');
description = 'Введи код для выбранного героя, чтобы увидеть описание силы';
descr.forEach((el) => el.textContent = description);

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
        progress1.forEach((el) => {
            el.value -= progress2[0].value;
            changeProgressStyle(el);
        });
        hideCodes();
    });
});