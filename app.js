const cols = document.querySelectorAll('.col');

setRandomColors();

document.addEventListener('keydown', event => {
    event.preventDefault();
    if (event.code.toLocaleLowerCase() === 'space') {
        setRandomColors();
    }
})

document.addEventListener('click', event => {
    const type = event.target.dataset.type;
    console.log(type);
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

function setRandomColors() {
    const colors = [];

    cols.forEach(col => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const btn = col.querySelector('button');
        const color = chroma.random();
        
    
        if (isLocked) return;
        
        setTextColor(text, color);
        setTextColor(btn, color);

        text.textContent = color;
        col.style.background = color;
    })
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}


function copyToClipboard(text) {
    return navigator.clipboard.writeText(text);
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.toString();
}