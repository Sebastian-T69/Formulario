export function valida(input){
    const tipoDeInput=input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
    console.log(input.parentElement);
    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML ="";
    }else{
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML=mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores=[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesDeError={
    nombre:{
        valueMissing:"Este campo no puede estar vacio cabron"
    },
    email:{
        valueMissing:"Este campo de email no puede estar vacio",
        typeMismatch:"El corro no es valido "},
    password:{
        valueMissing:"Este campo de contraceña no puede estar vacio",
        patternMismatch:"Al menos 6 caracteres maximo 12 debe contener una letra minuscula una letra mayuscula un numero y no puede contener caracteres especiales",
    },
    nacimiento:{
        valueMissing:"Este campo no puede estar vacio",
        customError:"Debes tener al manos 18 años",
    },
    numero:{
        valueMissing:"Este campo nno puede estar vacio",
        patternMismatch:"El numero requerido es de 10 numeros",
    },
    direccion:{
        valueMissing:"Este cempo nno puede estar vacio",
        patternMismatch:"La direccion requiere es de 10-40 caracteres",
    },
    ciudad:{
        valueMissing:"Este cempo nno puede estar vacio",
        patternMismatch:"La ciudad requiere es de 10-40 caracteres",
    },
    estado:{
        valueMissing:"Este cempo nno puede estar vacio",
        patternMismatch:"La estado requiere es de 10-40 caracteres",
    }

};

function mostrarMensajeDeError(tipoDeInput,input){
    let mensaje="";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]){
            console.log(input.validity[error])
            mensaje=mensajesDeError[tipoDeInput][error]
        }        
    });
    return mensaje;
}

const validadores={
    nacimiento:(input)=>validarNacimiento(input),
};


function validarNacimiento(input){
    const fechaCliente=new Date(input.value);
   
   let mensaje="";
   if(!mayorDeEdad(fechaCliente)){
    mensaje="Debes tener al menos 18 años de edad"
   }
   input.setCustomValidity(mensaje)
}
function mayorDeEdad(fecha){
    const fechaActual=new Date();
    const diferenciaFecha=new Date(fecha.getUTCFullYear()+18,fecha.getUTCMonth(),fecha.getUTCDate() );
    console.log(fecha,"  :   ",fechaActual);
    return ( diferenciaFecha<=fechaActual);
}