const scene = document.getElementById('scene');
const progress1 = document.getElementById('strenght');
const progress2 = document.getElementById('power');
const btn = document.getElementById('btn');
const descr = document.getElementById('description');

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

descr.innerHTML = '<p>Это первое описание какой-либо силы</p>';
progress2.value = 27;
changeProgressStyle(progress2);

scene.innerHTML = '<img src="captures/hero0.png" id="hero0">';

btn.addEventListener('click', () => {
    progress1.value -= progress2.value;
    changeProgressStyle(progress1)
});