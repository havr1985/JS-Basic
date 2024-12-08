const addForm = document.forms['form'];
const pairList = document.getElementById('pairList');
const sortNameBtn = document.getElementById('sortName');
const sortValueBtn = document.getElementById('sortValue');
const deleteBtn = document.getElementById('delete');

const pairRegex = /^\s*([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)\s*$/;
let pairs =[];


function updateList() {
    pairList.innerText = '';
    pairs.forEach(({ name, value }) => {
        const option = document.createElement('option');
        option.innerText = `${name} = ${value}`;
        pairList.appendChild(option);
    });
}

addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = addForm.textInput.value.trim();
    const match = input.match(pairRegex);
    if (match) {
        const name = match[1].trim();
        const value = match[2].trim();
        pairs.push({ name, value });
        addForm.textInput.value = '';
        updateList();
    } else {
        alert('Invalid format. Please use "name=value".');
    }
});

sortNameBtn.addEventListener('click', () => {
    pairs.sort((a, b) => a.name.localeCompare(b.name));
    updateList();
});

sortValueBtn.addEventListener('click', () => {
    pairs.sort((a, b) => a.value.localeCompare(b.value));
    updateList();
});

deleteBtn.addEventListener('click', () => {
    const selectedIndices = Array.from(pairList.selectedOptions).map(option =>
        Array.from(pairList.options).indexOf(option)
    );
    pairs = pairs.filter((_, index) => !selectedIndices.includes(index));
    updateList();
});
