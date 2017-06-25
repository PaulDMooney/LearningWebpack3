import '../styles/image_viewer.css'

const button = document.createElement('button');
button.innerText = 'Click';
button.onclick = () => {
    System.import('./image_viewer').then(module => {
        module.default();
    })
}

document.body.appendChild(button);