const botones = document.querySelector('#botones');
const nombreUsuario = document.querySelector('#nombreUsuario');
const contenidoProtegido = document.querySelector('#contenidoProtegido');
const formulario = document.querySelector('#formulario');
const inputChat = document.querySelector('#inputChat');

firebase.auth().onAuthStateChanged( user =>{
    if(user){
        console.log(user);
        botones.innerHTML = `
            <button class="btn btn-outline-danger" id='btnCerrarSesion'>Cerrar</button>
        `
        nombreUsuario.innerHTML = user.displayName;
        cerrarSesion();
        
        formulario.classList = 'input-group bg-success py-3 fixed-bottom container'
        contenidoChat(user);
    
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
        formulario.classList = 'input-group bg-success py-3 fixed-bottom container d-none'
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

const contenidoChat = (user) =>{
    contenidoProtegido.innerHTML = `
        <p class="text-center lead mt-5">Bienvenido ${user.email}</p>
    `
    formulario.addEventListener('submit', (e) =>{
        e.preventDefault();//al hacer peticion get, con prevent no recarga
        console.log(inputChat.value);
        //comprobamos si el usuario escribio algo
        if(!inputChat.value.trim()){
            console.log('input vacio');
            return;
        }
        //si en verdad escribio algo entonces: la siguiente promesa
        firebase.database().ref('chat/').push({
            texto: inputChat.value,
            uid: user.uid,
            fecha: Date.now()
        })
        .then(res => {console.log('mensaje guardado')})
        .catch(e => console.log(e))

        //limpiamos string 
        inputChat.value = "";
        
    })
}