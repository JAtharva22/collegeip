
const list = document.querySelector('ul');
const input = document.querySelector('input');
const button = document.querySelector('button');

function handleClick(event) {
    const myItem = input.value;
    input.value = '';

    const listItem = document.createElement('li');
    const listText = document.createElement('span');
    const listBtn = document.createElement('button');

    listItem.appendChild(listText);
    listText.textContent = myItem;
    listItem.appendChild(listBtn);
    listBtn.textContent = 'Delete';
    list.appendChild(listItem);

    listBtn.addEventListener('click', () => {
    list.removeChild(listItem);
    });

    input.focus();
}

function handleEnter(event) {
    if (event.type === "keydown" && event.key === "Enter") {
        handleClick();
    }
}

button.addEventListener('click', handleClick);
input.addEventListener("keydown", handleEnter);