const botones = document.querySelector('#botones');
const nombreUsuario = document.querySelector('#nombreUsuario');

firebase.auth().onAuthStateChanged((user) =>{
    if(user){
        console.log(user);
        botones.innerHTML = `
            <button class="btn btn-outline-danger">Cerrar</button>
        `
    }else{
        //console.log('No existe user');
        botones.innerHTML = /*html*/`
            <button class="btn btn-outline-success mr-2">Acceder</button>
        `
    }
})