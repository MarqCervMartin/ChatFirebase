const botones = document.querySelector('#botones');
const nombreUsuario = document.querySelector('#nombreUsuario');
const contenidoProtegido = document.querySelector('#contenidoProtegido');

firebase.auth().onAuthStateChanged( user =>{
    if(user){
        console.log(user);
        botones.innerHTML = `
            <button class="btn btn-outline-danger" id='btnCerrarSesion'>Cerrar</button>
        `
        nombreUsuario.innerHTML = user.displayName;
        cerrarSesion();
        contenidoProtegido.innerHTML = `
            <p class="text-center lead mt-5">Bienvenido ${user.email}</p>
        `
    }else{
        console.log('No existe user');
        botones.innerHTML = /*html*/`
            <button class="btn btn-outline-success mr-2" id='btnAcceder'>Acceder</button>
        `
        iniciarSesion();
        nombreUsuario.innerHTML = 'Chat'
        contenidoProtegido.innerHTML = `
            <p class="text-center lead mt-5">Debes iniciar sesión</p>
        `
    }
})

const cerrarSesion = () => {
    const btnCerrarSesion = document.querySelector('#btnCerrarSesion');
    btnCerrarSesion.addEventListener('click', () =>{
        firebase.auth().signOut();
    })
}

const iniciarSesion = () =>{
    const btnAcceder = document.querySelector('#btnAcceder');
    btnAcceder.addEventListener('click', async() =>{
        //console.log('Me diste click en acceder');
        try{
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider)
        }catch(error){
            console.log(error)
        }
    })
}