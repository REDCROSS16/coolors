const cols = document.querySelectorAll('.col');

setRandomColors(true);

document.addEventListener('keydown', event => {
    event.preventDefault();
    if (event.code.toLocaleLowerCase() === 'space') {
        setRandomColors();
    }
})

document.addEventListener('click', event => {
    const type = event.target.dataset.type;
    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i' 
            ? event.target
            : event.target.children[0];

        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    } else if (type === 'copy') {

        copyToClipboard(event.target.textContent);
    }
})


function generateRandomColor() {
    const hexCodes = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++ ) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }
    return '#' + color;
}

function setRandomColors(isInitial) {

    const colors = isInitial ? getColorsFromHash() : [];

    cols.forEach((col, idx) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const btn = col.querySelector('button');
        
        if (isLocked) {
            colors.push(text.textContent);
            return;
        }

        const color = isInitial 
            ? colors[idx]
                ? colors[idx]
                : chroma.random() 
            : chroma.random();

        if (!isInitial) {
            colors.push(color);
        }
        
        setTextColor(text, color);
        setTextColor(btn, color);

        text.textContent = color;
        col.style.background = color;
    })

    updateColorsHash(colors);
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}


function copyToClipboard(text) {
    return navigator.clipboard.writeText(text);
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map(col => col.toString().substring(1))
    .join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map((color) =>  '#' + color)
        }

    return [];
}