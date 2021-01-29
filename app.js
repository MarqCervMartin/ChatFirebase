const botones = document.querySelector('#botones');
const nombreUsuario = document.querySelector('#nombreUsuario');
const contenidoProtegido = document.querySelector('#contenidoProtegido');
const formulario = document.querySelector('#formulario');
const inputChat = document.querySelector('#inputChat');

const usuariosConectados = document.querySelector('#usuariosConectados');

firebase.auth().onAuthStateChanged( user =>{
    if(user){
        console.log(user);
        botones.innerHTML = `
            <button class="btn btn-outline-danger" id='btnCerrarSesion'>Cerrar</button>
        `
        nombreUsuario.innerHTML = user.displayName;
        cerrarSesion();
        //aparece formulario
        formulario.classList = 'input-group bg-success py-3 fixed-bottom container'
        guardarUsuario(user);
        contenidoChat(user);
        usersOnline(user);
    
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
    /*
    contenidoProtegido.innerHTML = `
        <p class="text-center lead mt-5">Bienvenido ${user.email}</p>
    `
    */
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

    //recorrer la base de datos firebase
    firebase.database().ref('chat').orderByChild('fecha')
        .on('child_added', query =>{
        //console.log(query.val()); para el caso del evento on
        console.log(query.val());
        const val = query.val();
        //console.log(query)
        //contenidoProtegido.innerHTML = '';
        if(val.uid === user.uid){
            contenidoProtegido.innerHTML += `
                <div class="d-flex justify-content-end">
                    <span class="badge rounded-pill bg-primary">${val.texto}</span>
                </div>
            `
        }else{
            contenidoProtegido.innerHTML += `
                <div class="d-flex justify-content-center">
                    <span class="badge rounded-pill bg-secondary">${val.texto}</span>
                </div>
            `
        }
        //scroll del chat
        contenidoProtegido.scrollTop = contenidoProtegido.scrollHeight;
        
    })
}

const usersOnline = (user) =>{

    //recorrer la base de datos firebase
    firebase.database().ref('usuarios')
        .once('value', query =>{
        usuariosConectados.innerHTML = '';
        query.forEach(element => {
            console.log(element.val());
            const val = element.val();
            
            if(val.uid === user.uid){
                usuariosConectados.innerHTML += `    
                    <button type="button" class="list-group-item list-group-item-action active">${val.nombre}
                        <span class="badge badge-dark badge-pill">${val.nuevosmensajes}</span>
                    </button>
                `
            }else{
                usuariosConectados.innerHTML += `    
                    <button type="button" class="list-group-item list-group-item-action">${val.nombre}
                        <span class="badge badge-dark badge-pill">${val.nuevosmensajes}</span>
                    </button>
                `
            }

        });
        /*
        */
    })
}


const guardarUsuario = (user) =>{
    usuario = {
        uid: user.uid,
        nombre: user.displayName,
        email: user.email,
        foto: user.photoURL,
        nuevosmensajes: 0
    }
    firebase.database().ref('usuarios/'+user.uid).set(usuario)
    .then(res => {console.log('mensaje guardado')})
    .catch(e => console.log(e))
}