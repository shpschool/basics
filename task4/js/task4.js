const scene = document.getElementById('scene');
const progress1 = document.getElementById('strenght');
const progress2 = document.getElementById('power');
const powerCont = document.getElementById('using-power');
const btn = document.getElementById('btn');
const descr = document.getElementById('description');
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
    description = '<p>Введи код для выбранного героя, чтобы увидеть описание силы</p>';
    descr.innerHTML = description;
    progress2.value = 30;
    changeProgressStyle(progress2);
};

const hideCodes = () => {
    codes.forEach((el) => {
        el.classList.add('hidden');
        el.value = null;
    });
}

hideCodes();
scene.innerHTML = '<img src="captures/hero0.png" id="hero0">';
descr.innerHTML = '<p>Введи код для выбранного героя, чтобы увидеть описание силы</p>';

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

btn.addEventListener('click', () => {
    progress1.value -= progress2.value;
    changeProgressStyle(progress1);
    hideCodes();
});