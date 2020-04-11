//variables
let siguiente = document.querySelector("#siguiente");
let ingresar = document.querySelector("#btnIngresar");
let resultado = document.querySelector("#resultado");
let borrarTodo = document.querySelector("#btnBorrar");
var contador = 0;

//addEventListeners
eventsListener();


//funciones
function eventsListener(){
    siguiente.addEventListener('click', ()=>{
        const presupuesto = evaluarIngresoDePresupuesto();
    
    });
    
    ingresar.addEventListener('click', (evento)=>{
        evento.preventDefault();
        evaluarIngresoDeGasto();
    });

    resultado.addEventListener('click', (e)=>{
        e.preventDefault();
        if(e.target.className === 'borrar-elemento'){
            borrarDelLocalsotorage(e.target.parentElement.textContent);
            e.target.parentElement.remove();
        }
    });

    borrarTodo.addEventListener('click', borrar);

    document.addEventListener("DOMContentLoaded", localStorageListo);
}

function evaluarIngresoDePresupuesto(){
    let input_presupuesto = Number(document.querySelector("#input-presupuesto").value);

    if(input_presupuesto <= 0 ){
        alert("Ingresar nuevamente un presupuesto");
    }else{
        guardarPresupuestoEnLocalStorage(input_presupuesto)
        desabilitarSiguiente();
        mostrarFormularioGasto();
        mostrarPresupuesto(input_presupuesto);
        return input_presupuesto;
    }

}
function guardarPresupuestoEnLocalStorage(input_presupuesto){
    localStorage.setItem("presupuesto",JSON.stringify(input_presupuesto));
}

function desabilitarSiguiente(){
let siguiente = document.querySelector("#siguiente");
    siguiente.disabled = true;
}



function mostrarFormularioGasto() {
    let formulario = document.querySelectorAll("#formulario");
    let boton = document.querySelector("#btnIngresar");
    let botonB = document.querySelector("#btnBorrar");

    for(form of formulario){
        form.className = "form-group";
    }

    boton.className = "btn btn-primary";
    botonB.className = "btn btn-primary";

}

function mostrarPresupuesto(presupuesto){
    let presupuesto_resultado = document.querySelector("#presupuesto_resultado");
    let input_presupuesto = Number(document.querySelector("#input-presupuesto").value);

    presupuesto_resultado.innerHTML = "Presupuesto: "+presupuesto;

    if(presupuesto<= input_presupuesto/4){
        presupuesto_resultado.className = 'alert'+' '+'alert-danger';
    }else if(presupuesto <= input_presupuesto/2){
        presupuesto_resultado.className = 'alert'+' '+'alert-warning';
    }else{
         presupuesto_resultado.className = 'alert'+' '+'alert-success';
    }
}

function evaluarIngresoDeGasto(){
    let gasto = Number(document.querySelector("#input_gasto").value);
    
    if(gasto <= 0){
        alert("Ingresar nuevamente un gasto");
    }else{
        guardarGastoEnLocalStorage(gasto);
        let diferencia = diferenciaEntrePresupuestoYGasto();
        if(diferencia <=0 ){
            alert("Te quedaste sin presupuesto");
            habilitarSiguiente();
            evaluarIngresoDePresupuesto();
        }
        guardarPresupuestoEnLocalStorage(diferencia);
        mostrarPresupuesto(diferencia);
        mostrarGasto();
        guardarGastoMasDescripcionEnLocalStorage();
        limpiarInputs();
    }
}


function guardarGastoEnLocalStorage(gasto){
    let gastos;
    gastos = obtenerGastosLocalStorage();
    gastos.push(gasto);
    localStorage.setItem("gastos", JSON.stringify(gastos));
}

function obtenerGastosLocalStorage(){
    let gastos;
    
    if(localStorage.getItem('gastos') === null){
        gastos = [];
    }else{
        gastos = JSON.parse(localStorage.getItem('gastos'));
    }

    return gastos;
}
function diferenciaEntrePresupuestoYGasto(){
    let presupuesto = Number(localStorage.getItem('presupuesto'));
    let ultimo_gasto = ultimoGasto();
    let diferencia = presupuesto - ultimo_gasto;

    return diferencia;
}

function ultimoGasto(){
    let gasto = JSON.parse(localStorage.getItem('gastos'));
    let indice = gasto.length - 1;
    let ultimo_gasto = gasto[indice];
    return ultimo_gasto;
}

function mostrarGasto(){

    contador++;
    guardarContadorEnLocalstorage(contador);
    let gasto = ultimoGasto();
    const descripcion = document.querySelector("#descripcion").value;
    const lista = document.querySelector("#lista");
    const resultado = document.querySelector("#resultado");

    let div = document.createElement('div');
    div.id = 'gasto'+contador;
    div.className = 'alert'+' '+'alert-info';
    div.innerHTML = contador+'. '+'$- '+gasto+' '+'|| '+descripcion;

    let a = document.createElement('a');
    a.href = '#'
    a.className = 'borrar-elemento';
    a.innerHTML = 'x';

    div.appendChild(a);
    let texto = lista.appendChild(div);
    resultado.appendChild(texto);

}
function limpiarInputs(){
    document.querySelector("#input_gasto").value = "";
    document.querySelector("#descripcion").value = "";
}

function guardarContadorEnLocalstorage(contador){
    localStorage.setItem("contador",JSON.stringify(contador));
}
function guardarGastoMasDescripcionEnLocalStorage(){
    let cont = Number(localStorage.getItem("contador"));
    let texto = document.querySelector("#gasto"+cont).textContent;
    let textos;
    textos = obtenerGastosYDescripcionLocalStorage();
    textos.push(texto);
    localStorage.setItem("textos", JSON.stringify(textos));
}

function obtenerGastosYDescripcionLocalStorage(){
    let textos;
    
    if(localStorage.getItem('textos') === null){
        textos = [];
    }else{
        textos = JSON.parse(localStorage.getItem('textos'));
    }

    return textos;
}

//borrar del localStorage

function borrarDelLocalsotorage(texto){
    let textos, textoBorrar;

    textoBorrar = texto.substring(0, (texto.length) );
    textos = obtenerGastosYDescripcionLocalStorage();

    textos.forEach(function(texto, index){
        if(textoBorrar === texto){
            textos.splice(index, 1);
        }
    });
    localStorage.setItem('textos', JSON.stringify(textos));

}
//Obtener los datos del localStorage

function localStorageListo(){
    let textos = obtenerGastosYDescripcionLocalStorage();
    const descripcion = document.querySelector("#descripcion").value;
    const lista = document.querySelector("#lista");
    const resultado = document.querySelector("#resultado");
    let presupuesto = Number(localStorage.getItem("presupuesto"));
    mostrarPresupuesto(presupuesto);
    if(presupuesto > 0){
        mostrarFormularioGasto();
        desabilitarSiguiente();
    }

    textos.forEach(function(texto){

        
        let div = document.createElement('div');
        div.id = 'gasto'+contador;
        div.className = 'alert'+' '+'alert-info';
        div.innerHTML = texto.substring(0,(texto.length - 1));
    
        let a = document.createElement('a');
        a.href = '#'
        a.className = 'borrar-elemento';
        a.innerHTML = 'x';
    
        div.appendChild(a);
        let texto1 = lista.appendChild(div);
        resultado.appendChild(texto1);
    
    });

}
function borrar(){
 localStorage.removeItem('presupuesto');
 localStorage.removeItem('gastos');
 localStorage.removeItem('contador');
 localStorage.removeItem('textos');
}

function habilitarSiguiente(){
    let siguiente = document.querySelector("#siguiente");
        siguiente.disabled = false;
}

