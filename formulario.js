const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input'); //Con los id se accede con el numeral.

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}


//Como queremos que el formulario se llene y no quede vacío hacemos que todos los valores sea falsos para que cuando sean ejecutados pasarlos a verdaderos.

const campos = {
    usuario: false,
    nombre: false,
    password: false,//solo es necesario hacerlo una vez, por eso solo usamos password una vez.
    correo: false,
    telefono: false,
}

const validarFormulario = (e) => {
    switch (e.target.name) { // En caso que el nombre del input sea (En este caso usuario) ejecute el codigo.
        //Esto unicamente funcionara cuando el name del imput sea usuario porque accedemos a el mediante el name.
        case "usuario": //Comprobamos con las expresiones regulares.
            //Con test estamos comprobando que la expresion sea correcta, 
            validarCampo(expresiones.usuario, e.target, 'usuario');

            break;

        case "nombre":

            validarCampo(expresiones.nombre, e.target, 'nombre');

            break;

        case "password":

            validarCampo(expresiones.password, e.target, 'password');
            validarPassword2();

            break;

        case "password2":

            validarPassword2();

            break;

        case "correo":

            validarCampo(expresiones.correo, e.target, 'correo');

            break;

        case "telefono":

            validarCampo(expresiones.telefono, e.target, 'telefono');

            break;
    }
}

//Para poder acceder a varias partes del codigo para poder usar el mismo codigo en varias funciones tenemos que agregar unos argumentos para que puedan ser dinamicos agregamos dichos argumentos.

//Utilizamos el valor expresion para ingregar a la funcion expresiones para ingresar a la expresion que querramos utilizar, para usar esto podería ser por ejemplo 8expresion.usuario9 para usuar la expresion usuario y poder validar, luego con el imput se saca del evento que a su vez es lo que estamos manejando (e.target), tambien el valor campo es el valor dinamico que cambiara si estamos ejecutando el usuario, correo o lo que sea.

//En resumen si en expresion colocamos la expresion que vamos a utilizar de la funcion de expresiones, e.target estamos ingreando el input pata que se ejecute el codigo. Por ultimo agregamos el nombre que se pasara a la variable campo.


const validarCampo = (expresion, input, campo) => {

    if (expresion.test(input.value)) {
        //con e.target.value ingresamos al valor que del evento (e) ingresado para poder comprobarlo. Si la expresion regular se cumple dara como resultado verdadero si no false.


        //Un template string es una plantilla literal que hace que podamos incrustar una variable en una cadena de texto.

        //Para poder usar un template string en Js se hace usando backtick (´´) y la palabra que se quiere usar como variable se hace asi: ${variable} para que podamos tomar el valor de la variable que estemos usando.

        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-incorrecto');

        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-correcto');

        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-times-circle');
            
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-check-circle');

        document.querySelector(`#grupo_${campo} .formulario_input_error`).classList.remove('formulario_input_error-activo');

        campos[campo] = true;

    }// si es falso
    else {
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-incorrecto');

        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-correcto');

        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-check-circle');

        document.querySelector(`#grupo_${campo} i`).classList.add('fa-times-circle');

        document.querySelector(`#grupo_${campo} .formulario_input_error`).classList.add('formulario_input_error-activo');
        //Para no copiar todo este codigo y poderlo hacer mas eficiente creamos la funcion validar campo para unicamente llamar una funcion y se pueda usar en todas las validaciones (inputs).

        campos[campo] = false;
    };
}

//debemos validar que el input password2 sea igual que password
const validarPassword2 = () => {
    //ingreamos a cada uno con un avariable:

    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');
    //es diferente)
    if (inputPassword1.value !== inputPassword2.value){

        document.getElementById(`grupo_password2`).classList.add('formulario_grupo-incorrecto');

        document.getElementById(`grupo_password2`).classList.remove('formulario_grupo-correcto');

        document.querySelector(`#grupo_password2 i`).classList.remove('fa-times-circle');

        document.querySelector(`#grupo_password2 i`).classList.add('fa-check-circle');

        document.querySelector(`#grupo_password2 .formulario_input_error`).classList.add('formulario_input_error-activo');

        campos[password] = true;

    } else {
        document.getElementById(`grupo_password2`).classList.remove('formulario_grupo-incorrecto');

        document.getElementById(`grupo_password2`).classList.add('formulario_grupo-correcto');

        document.querySelector(`#grupo_password2 i`).classList.add('fa-check-circle');

        document.querySelector(`#grupo_password2 i`).classList.remove('fa-times-circle');

        document.querySelector(`#grupo_password2 .formulario_input_error`).classList.remove('formulario_input_error-activo');

        campos[password] = true;
    }
}
//Para que cuando se modifique la primer contraseña se actualice password2 colocamos la variable validarPassword2 en password

//En este caso por cada input ejecutes el codigo.
inputs.forEach((input) => {//Funcion de tipo flecha.
    //Por cada input quiero agregar un event listener.
    input.addEventListener('keyup', validarFormulario);//Cuando presiona una tecla y es soltada se ejecuta el codigo de validar formulario.
    input.addEventListener('blur', validarFormulario);
    //Cuando se preciona afuera del imput se ejecuta validar formulario.
});


formulario.addEventListener('submit', (e) => {
    e.preventDefault(); //Para que no se envíen los datos.(previniendo)
// && = si.

//validamos los terminos y condiciones con el .checked.

const terminos = document.getElementById('terminos');


    if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked){ 
        formulario.reset();//reseteamos todos los campos del formulario.

        document.getElementById('formulario_mensaje-exito').classList.add('formulario_mensaje-exito_activo') ;
        //agregamos un time out para el mensaje de exito.
        setTimeout(()=> {
            document.getElementById('formulario_mensaje-exito').classList.remove('formulario_mensaje-exito_activo') ;
        }, 5000);

        //quitamos iconos de correcto.
        document.querySelectorAll('.formulario_grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario_grupo-correcto');
        });
    }else{
        document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
    
    }
})