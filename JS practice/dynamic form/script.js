const div = document.getElementById('second');
const ip = document.querySelector('input');
const btn1 = document.getElementById('b1')
const btn2 = document.getElementById('b2')
const optn = document.getElementById('type');

btn1.addEventListener('click', (event) => {
    const val = ip.value;
    ip.value = '';

    const vardiv = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');

    label.textContent = val;
    input.type = optn.value;

    vardiv.appendChild(label);
    vardiv.appendChild(input);
    div.appendChild(vardiv)

    btn2.addEventListener('click', () => {
        div.removeChild(vardiv);
    });

    input.focus();
})


