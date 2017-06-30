import '../styles/image_viewer.css'

const button = document.createElement('button');
button.innerText = 'Click';
button.onclick = () => {
    console.log("Dynamic Import of 'Image_Viewer'")
    System.import(/* webpackChunkName: "image_viewer" */ './image_viewer').then(module => {
        console.log("Module loaded")
        module.default();
    })
}

document.body.appendChild(button);