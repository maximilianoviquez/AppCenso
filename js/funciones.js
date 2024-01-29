window.addEventListener("load", inicio);
let sistema = new Sistema();
let usuarioLogueado = null;
sistema.precargaDeDatos();
function inicio() {
    //Eventos de los botones
    document.querySelector("#btnRegistrar").addEventListener("click", registrar); 
    document.querySelector("#btnLogin").addEventListener("click", login);
    document.querySelector("#btnIngresarPC").addEventListener("click", agregarCenso);
    document.querySelector("#nuevoPC").addEventListener("click", nuevoCenso) 
    document.querySelector("#btnDesplegarCIPC").addEventListener("click", deployCenso) 
    document.querySelector("#btnEditarPC").addEventListener("click", editarCenso);
    document.querySelector("#btnEdicionPC").addEventListener("click", modificarDatosCenso);
    document.querySelector("#btnCancelPC").addEventListener("click", cancelarEditCenso);
    document.querySelector("#btnIngresarPI").addEventListener("click", agregarCensoInvitado);
    document.querySelector("#btnFinalizarCenso").addEventListener("click", censoFinalizado);
    document.querySelector("#mostrarInfoCenso").addEventListener("click", mostrarCantidadCensados);
    document.querySelector("#mostrarInfoCenso").addEventListener("click", porcentajeNoFinalizados);
    document.querySelector("#btnCensosPorDepartamento").addEventListener("click", CensosPorDepartamento);
    document.querySelector("#btnCancelarEliminarDatos").addEventListener("click", cancelarEliminarInvitado);
    //para buscar y editar una cedula en INVITADO
    document.querySelector("#btnBuscarPI").addEventListener("click", buscarCedulaInvitado);
    document.querySelector("#btnEditarPI").addEventListener("click", editarInvitado);
    document.querySelector("#btnCancelEditPI").addEventListener("click", cancelarEditInvitado);
    document.querySelector("#btnEnviarPI").addEventListener("click", modificarDatosInvitado);
    document.querySelector("#btnAsignarCensista").addEventListener("click", asignarCensista);
    document.querySelector("#btnBuscarEliminarCenso").addEventListener("click", mostrarEnEliminarCenso);
    document.querySelector("#btnEliminarDatos").addEventListener("click", eliminarCensoInvitado);
    ocultarDivs();
    //Eventos del Menu
    document.querySelector("#btnCensista").addEventListener("click", mostrarCensista);
    document.querySelector("#btnInvitado").addEventListener("click", mostrarInvitado);
    document.querySelector("#btnLogout").addEventListener("click", logout);
    document.querySelector("#salirInvitado").addEventListener("click", salirInvitado);
    document.querySelector("#salirLogin").addEventListener("click", salirUsuario);
    //carga de funciones en el evento Load
    cargarDepartamentos();
    cargarOcupacion();
    mostrarEnAsignarCenso();
    listaUsuarios();
    cargaListaDepartamentosInvitado(); 
}
function mostrarCensista() {//funcion para mostrar los divs del Usuario Censista
    mostrarDiv("divInicial");
    displayNone("div");
}

function mostrarInvitado() {//funcion para mostrar los divs del Invitado
    mostrarDiv("div5");
    displayNone("div");
    displayNone("btnEditarPI");
    displayNone("btnCancelEditPI");
    displayNone("btnEnviarPI");
    formReset("formBuscarPI");
    formReset("formCensoPI");
    document.querySelector("#pCensistaAsignado").innerHTML = "Nombre: ";
    disabledFalse("ciBuscarInvitado");
    disabledFalse("btnBuscarPI");
    disabledFalse("ciInvitado");
    disabledFalse("nombrePI");
    disabledFalse("apellidoPI");
    disabledFalse("edadPI");
    disabledFalse("departamentosPI");
    disabledFalse("ocupacionPI");
    displayBlock("btnIngresarPI");
    cargaListaDepartamentosInvitado();
    displayNone("btnCancelarEliminarDatos");
    disabledFalse("CiEliminarCenso");
    disabledFalse("btnBuscarEliminarCenso");
    disabledFalse("btnCancelarEliminarDatos");
    disabledFalse("btnEliminarDatos");
    formReset("autoEliminarDatos");
    let texto = ""
    texto = `
    <tr>
        <td>Sin Datos</td>
    </tr>
    `
    document.querySelector("#eliminarCIcenso").innerHTML = texto;
}
function salirInvitado() { //funcion para salir del panel del invitado
    ocultarDivs();
    displayBlock("div");
}
function salirUsuario() { //funcion para salir del panel del Usuario censista
    ocultarDivs();
    displayBlock("div");
}
function registrar() { //funcion para registrar un usuario censista
    let nombre = document.querySelector("#nombre").value.trim();
    let userName = document.querySelector("#usuario").value.trim();
    let pass = document.querySelector("#pass").value.trim();

    if (nombre === "" || userName === "" || pass === "") {
        alert("Todos los campos son obligatorios");
    } else if (sistema.existeUsuario(userName)) {
        alert("Ya existe ese nombre de usuario");
    } else if (!passwordValida(pass)) {
        alert("La contraseña debe tener al menos 5 caracteres y una mayuscula.");
    } else {
        let usuario = new Usuario(nombre, userName, pass);
        sistema.agregarUsuario(usuario);
        alert("Usuario agregado correctamente");
        formReset("formRegistro");
    }
}
function agregarCensoInvitado() { //funcion para agregar un censo desde Invitado
    let cedula = document.querySelector("#ciInvitado").value.trim();
    cedula = cedula.replaceAll(/\D/g, '');
    let nombre = document.querySelector("#nombrePI").value.trim();
    let apellido = document.querySelector("#apellidoPI").value.trim();
    let edad = document.querySelector("#edadPI").value.trim();
    let departamento = document.querySelector("#departamentosPI").value;
    let ocupacion = document.querySelector("#ocupacionPI").value;
    if (nombre === "" || apellido === "" || edad === "" || cedula === "" || departamento === "Seleccione..." || ocupacion === "Seleccione...") {
        alert("Todos los campos son obligatorios");
    } else if (!cedulaValida(cedula)) {
        alert("La cedula ingresada no es valida.");
    } else if (isNaN(edad) || edad < 0 || edad > 130) {
        alert('La edad ingresada no es válida. Debe estar entre 0 y 130.');
    } else if (sistema.existeCenso(cedula)) {
        alert("ya existe una cédula para este censo!");
    } else {
        let censos = new Censo(cedula, nombre, apellido, edad, departamento, ocupacion);
        sistema.agregarCenso(censos);
        sistema.asignarUsuarioRandom(censos);
        alert("Censado agregado correctamente");
        formReset("formCensoPI");
        let censistaAsignado = censos.censistaAsignado.nombre;
        document.querySelector("#pCensistaAsignado").innerHTML = censistaAsignado;
        cargaListaDepartamentosInvitado();
    }
}
function buscarCedulaInvitado(){ //funcion para que el invitado busque su cedula si precompleto sus datos
    let cedula = document.querySelector("#ciBuscarInvitado").value.trim();
    cedula = cedula.replaceAll(/\D/g, '');
    let censo = sistema.buscarCenso(cedula);
    if(cedula === ""){
        alert("El campo no puede estar vacio!");
    } else if (!sistema.existeCenso(cedula)) {
        alert("No se encontró Cédula")
    } else if (censo.finalizado === true){
        alert("Este censo ya está finalizado!");
    } else {
        alert("Cedula encontrada!")
        let censo = sistema.buscarCenso(cedula);
        disabledTrue("ciInvitado");
        disabledTrue("nombrePI");
        disabledTrue("apellidoPI");
        disabledTrue("edadPI");
        disabledTrue("departamentosPI");
        disabledTrue("ocupacionPI");
        displayBlock("btnEditarPI");
        displayBlock("btnCancelEditPI");
        displayBlock("btnEnviarPI");
        displayNone("btnIngresarPI");
        disabledFalse("btnEditarPI");
        disabledTrue("btnEnviarPI");
        disabledFalse("btnCancelEditPI");
        document.querySelector("#ciInvitado").value = censo.cedula;
        document.querySelector("#nombrePI").value = censo.nombre;
        document.querySelector("#apellidoPI").value = censo.apellido;
        document.querySelector("#edadPI").value = censo.edad;
        document.querySelector("#departamentosPI").value = censo.departamento;
        document.querySelector("#ocupacionPI").value = censo.ocupacion;
        document.querySelector("#pCensistaAsignado").innerHTML = "Nombre: " + censo.censistaAsignado.nombre;
    }
}
function editarInvitado() { //funcion que habilita la edicion de los datos del invitado
    alert("Editar el censo");
    disabledFalse("nombrePI");
    disabledFalse("apellidoPI");
    disabledFalse("edadPI");
    disabledFalse("departamentosPI");
    disabledFalse("ocupacionPI");
    disabledTrue("btnEditarPI");
    disabledFalse("btnEnviarPI");
}
function cancelarEditInvitado(){ // funcion que cancela el ingreso de datos del invitado
    alert("Cancela Edición!");
    disabledFalse("ciBuscarInvitado");
    disabledFalse("btnBuscarPI");  
    disabledFalse("btnEditarPI");
    disabledFalse("ciInvitado");
    disabledFalse("nombrePI");
    disabledFalse("apellidoPI");
    disabledFalse("edadPI");
    disabledFalse("departamentosPI");
    disabledFalse("ocupacionPI");
    formReset("formBuscarPI");
    formReset("formCensoPI");
    document.querySelector("#pCensistaAsignado").innerHTML = "Nombre: ";
    displayNone("btnEditarPI");
    displayNone("btnEnviarPI");
    displayNone("btnCancelEditPI");
    displayBlock("btnIngresarPI");
}
function modificarDatosInvitado(){ //funcion que envia la edicion de los datos del invitado
    let cedula = document.querySelector("#ciBuscarInvitado").value.trim();
    let nombre = document.querySelector("#nombrePI").value.trim();
    let apellido = document.querySelector("#apellidoPI").value.trim();
    let edad = document.querySelector("#edadPI").value.trim();
    let departamento = document.querySelector("#departamentosPI").value;
    let ocupacion = document.querySelector("#ocupacionPI").value;
    if (nombre === "" || apellido === "" || edad === "" || departamento === "Seleccione..." || ocupacion === "Seleccione...") {
        alert("Todos los campos son obligatorios");
    } else if (isNaN(edad) || edad < 0 || edad > 130) {
        alert('La edad ingresada no es válida. Debe estar entre 0 y 130.');
    } else {
        sistema.modificarCensoNoFinalizado(cedula, nombre, apellido, edad, departamento, ocupacion);
        alert("Datos modificados!");
        disabledFalse("ciBuscarInvitado");
        disabledFalse("btnBuscarPI");  
        disabledFalse("ciInvitado");
        disabledFalse("nombrePI");
        disabledFalse("apellidoPI");
        disabledFalse("edadPI");
        disabledFalse("departamentosPI");
        disabledFalse("ocupacionPI");
        formReset("formBuscarPI");
        formReset("formCensoPI");
        document.querySelector("#pCensistaAsignado").innerHTML = "Nombre: ";
        displayNone("btnEditarPI");
        displayNone("btnEnviarPI");
        displayNone("btnCancelEditPI");
        disabledFalse("btnEditarPI");
        disabledFalse("btnEnviarPI");
        disabledFalse("btnCancelEditPI");
        displayBlock("btnIngresarPI");
        cargaListaDepartamentosInvitado();
    }
}
function cancelarEditCenso() { //funcion que cancela la edicion de un censo desde el panel de Usuario censista
    disabledFalse("cedulaPC");
    disabledFalse("nombrePC");
    disabledFalse("apellidoPC");
    disabledFalse("edadPC");
    disabledFalse("departamentosPC");
    disabledFalse("ocupacionPC");
    disabledFalse("nuevoPC");
    disabledFalse("censoAsignadoPC");
    disabledFalse("btnDesplegarCIPC");
    formReset("formCensoPC");
    formReset("formCedulaPC");
    displayBlock("btnEditarPC");
    disabledFalse("btnEditarPC");
    disabledFalse("nuevoPC");
    displayNone("div22");
    alert("Operacion Cancelada");
}
function modificarDatosCenso() { //funcion que envia la modificacion desde el panel de usuario censista
    let cedula = document.querySelector("#censoAsignadoPC").value.trim();
    let nombre = document.querySelector("#nombrePC").value.trim();
    let apellido = document.querySelector("#apellidoPC").value.trim();
    let edad = document.querySelector("#edadPC").value.trim();
    let departamento = document.querySelector("#departamentosPC").value;
    let ocupacion = document.querySelector("#ocupacionPC").value;
    if (nombre === "" || apellido === "" || edad === "" || cedula === "Seleccione..." || departamento === "Seleccione..." || ocupacion === "Seleccione...") {
        alert("Todos los campos son obligatorios");
    } else if (isNaN(edad) || edad < 0 || edad > 130) {
        alert('La edad ingresada no es válida. Debe estar entre 0 y 130.');
    } else {
        sistema.modificarCensoNoFinalizado(cedula, nombre, apellido, edad, departamento, ocupacion);
        document.querySelector("#nombrePC").value = nombre;
        document.querySelector("#apellidoPC").value = apellido;
        document.querySelector("#edadPC").value = edad;
        document.querySelector("#departamentosPC").value = departamento;
        document.querySelector("#ocupacionPC").value = ocupacion;
        disabledTrue("cedulaPC");
        disabledTrue("nombrePC");
        disabledTrue("apellidoPC");
        disabledTrue("edadPC");
        disabledTrue("departamentosPC");
        disabledTrue("ocupacionPC");
        disabledTrue("btnEdicionPC");
        disabledFalse("btnEditarPC");
        disabledFalse("btnFinalizarCenso");
        alert("Modificado con éxito!");
    }
}
function editarCenso() { //funcion que habilita la edicion de datos del panel de usuario censista
    alert("Editar el censo");
    disabledFalse("nombrePC");
    disabledFalse("apellidoPC");
    disabledFalse("edadPC");
    disabledFalse("departamentosPC");
    disabledFalse("ocupacionPC");
    disabledFalse("btnEdicionPC");
    disabledTrue("btnEditarPC");
    disabledTrue("btnFinalizarCenso");
}
function passwordValida(pass) { //funcion para validar la contraseña del usuario censista
    let tieneMinusculas = false;
    let tieneMayusculas = false;
    let tieneNumeros = false;
    if (pass.length >= 5) {
        for (let i = 0; i < pass.length && !(tieneMinusculas && tieneMayusculas && tieneNumeros); i++) {
            let cod = pass.charCodeAt(i);
            if (cod >= 97 && cod <= 122) {
                tieneMinusculas = true;
            } else if (cod >= 65 && cod <= 90) {
                tieneMayusculas = true;
            } else if (cod >= 48 && cod <= 57) {
                tieneNumeros = true;
            }
        }
    }
    return tieneMinusculas && tieneMayusculas && tieneNumeros;
}
function login() { //Cuando se hace el Login, se despliegan todos los divs del usuario censista
    let usuario = document.querySelector("#usuarioLogin").value.trim();
    let pass = document.querySelector("#passLogin").value.trim();
    if (sistema.loginValido(usuario, pass)) {
        sistema.usuarioLogueado = sistema.buscarUsuario(usuario);
        usuarioLogueado = sistema.usuarioLogueado;
        mostrarDiv("usuarioLogeado");
        displayBlock("div2");
        displayNone("div22");
        displayBlock("div3");
        displayBlock("div4");
        formReset("formCedulaPC");
        formReset("formCensoPC");
        disabledFalse("cedulaPC");
        disabledFalse("nuevoPC");
        disabledFalse("censoAsignadoPC");
        disabledFalse("btnDesplegarCIPC");
        //disabledFalse("btnIngresarCIPC")
        mostrarEnAsignarCenso(); 
        listaUsuarios();  
        alert("Usuario Logeado Correctamente!");
    } else {
        alert("Datos incorrectos");
    }
}
function logout() {
    mostrarDiv("divInicial");
    usuarioLogueado = null; 
}
function cargarDepartamentos() {// La funcion que carga los departamentos dinamicamente 
    let departamentos = ["Seleccione...", "Montevideo", "Artigas", "Canelones", "Cerro Largo", "Colonia",
        "Durazno", "Flores", "Florida", "Lavalleja", "Maldonado", "Paysandu", "Rio Negro",
        "Rivera", "Rocha", "Salto", "San Jose", "Soriano", "Tacuarembo", "Treinta y Tres"];
    let texto = "";
    for (let i = 0; i < departamentos.length; i++) {
        let departamentoActual = departamentos[i];
        texto += `<option>${departamentoActual}</option>`;
    }
    document.querySelector("#departamentosPC").innerHTML = texto;
    document.querySelector("#departamentosPI").innerHTML = texto;
    document.querySelector("#departamentosTablaVE").innerHTML = texto;
}
function cargarOcupacion() { // La funcion que carga las ocupaciones dinamicamente 
    //"Seleccione..." se valida en la funcion agregarCenso()
    let ocupacion = ["Seleccione...", "Dependiente", "Independiente", "Estudiante",
        "No trabaja"];
    let texto = "";
    for (let i = 0; i < ocupacion.length; i++) {
        let ocupacionActual = ocupacion[i]
        texto += `<option>${ocupacionActual}</option>`
    }
    document.querySelector("#ocupacionPC").innerHTML = texto;
    document.querySelector("#ocupacionPI").innerHTML = texto;
}
function validacionCedula(cedula){
    let seisDig = 0;
    let i = 0;
    if(cedula.length <= 6){
        for(i = cedula.length; i < 7; i++){
        cedula = '0' + cedula;
        }
    }
    for(let i = 0; i < 7; i++){
        seisDig += (parseInt("2987634"[i]) * parseInt(cedula[i])) % 10;
    }
    if(seisDig %10 === 0){
        return 0;
    }else{
        return 10 - seisDig % 10;
    }
}
function cedulaValida(cedula){
    cedula = limpiarCedula(cedula);
    let digito = cedula[cedula.length - 1];
    cedula = cedula.replace(/[0-9]$/, '');
    let esValida = false;
    if(digito == validacionCedula(cedula)){
        esValida = true;
    }
    return esValida;
}

function limpiarCedula(cedula){
    return cedula.replace(/\D/g, '');
}
//funcion para agregar un censo 
function agregarCenso() {
    let cedula = document.querySelector("#cedulaPC").value.trim();
    cedula = cedula.replaceAll(/\D/g, '');
    let nombre = document.querySelector("#nombrePC").value.trim();
    let apellido = document.querySelector("#apellidoPC").value.trim();
    let edad = document.querySelector("#edadPC").value.trim();
    let departamento = document.querySelector("#departamentosPC").value;
    let ocupacion = document.querySelector("#ocupacionPC").value;
    if (nombre === "" || apellido === "" || edad === "" || cedula === "" || departamento === "Seleccione..." || ocupacion === "Seleccione...") {
        alert("Todos los campos son obligatorios");
    } else if (!cedulaValida(cedula)) {
        alert("La cedula ingresada no es valida.");
    } else if (isNaN(edad) || edad < 0 || edad > 130) {
        alert('La edad ingresada no es válida. Debe estar entre 0 y 130.');
    } else if (sistema.existeCenso(cedula)) {
        alert("ya existe una cédula para este censo!");
    } else {
        let censos = new Censo(cedula, nombre, apellido, edad, departamento, ocupacion);
        sistema.agregarCenso(censos);
        censos.censistaAsignado = sistema.usuarioLogueado;
        alert("Censado agregado correctamente");
        disabledTrue("cedulaPC");
        disabledTrue("nombrePC");
        disabledTrue("apellidoPC");
        disabledTrue("edadPC");
        disabledTrue("departamentosPC");
        disabledTrue("ocupacionPC");
        displayNone("btnIngresarPC");
        displayBlock("btnEditarPC");
        displayBlock("btnEdicionPC");
        disabledTrue("btnEdicionPC");
        displayBlock("btnCancelPC");
        displayBlock("btnFinalizarCenso");
        formReset("formCedulaPC");
        mostrarEnAsignarCenso();
        document.querySelector("#cedulaPC").value = cedula;
        document.querySelector("#nombrePC").value = nombre;
        document.querySelector("#apellidoPC").value = apellido;
        document.querySelector("#edadPC").value = edad;
        document.querySelector("#departamentosPC").value = departamento;
        document.querySelector("#ocupacionPC").value = ocupacion;
        document.querySelector("#usuarioAutorizo").innerHTML = `Usuario Censista: ${censos.censistaAsignado.nombre}`;
        displayBlock("censoFinalizado");
    }
}
function nuevoCenso(){ 
    alert("Ingrese un Nuevo Censo!");
    displayBlock("cedulaPC"); 
    displayBlock("labelCI");    
    displayBlock("div22");
    displayNone("btnEditarPC");
    displayNone("btnEdicionPC");
    displayNone("btnCancelPC");
    displayNone("censoFinalizado");
    displayNone("btnFinalizarCenso");
    displayBlock("btnIngresarPC");
    displayBlock("btnCancelPC");
    disabledFalse("cedulaPC");
    disabledFalse("nombrePC");
    disabledFalse("apellidoPC");
    disabledFalse("edadPC");
    disabledFalse("departamentosPC");
    disabledFalse("ocupacionPC");
    disabledTrue("censoAsignadoPC");
    disabledTrue("btnDesplegarCIPC");
    disabledTrue("nuevoPC");
    formReset("formCensoPC");
    disabledFalse("formCensoPC");
}
//function para desplegar un censo
function deployCenso(){
    let cedula = document.querySelector("#censoAsignadoPC").value.trim();
    let censo = sistema.buscarCenso(cedula);
    if(cedula === "Seleccione..."){
        alert("Debe seleccionar una Cédula a Desplegar");
    } else {
        document.querySelector("#cedulaPC").value = censo.cedula;
        document.querySelector("#nombrePC").value = censo.nombre;
        document.querySelector("#apellidoPC").value = censo.apellido;
        document.querySelector("#edadPC").value = censo.edad;
        document.querySelector("#departamentosPC").value = censo.departamento;
        document.querySelector("#ocupacionPC").value = censo.ocupacion;
        document.querySelector("#usuarioAutorizo").innerHTML = "Usuario asignado: " + censo.censistaAsignado.nombre;
        displayBlock("div22");
        displayBlock("censoFinalizado");
        displayBlock("btnEdicionPC");
        displayBlock("btnEditarPC");
        displayBlock("btnCancelPC");
        displayBlock("btnFinalizarCenso");
        displayNone("cedulaPC");
        displayNone("labelCI"); 
        displayNone("btnIngresarPC");
        disabledTrue("cedulaPC");
        disabledTrue("nombrePC");
        disabledTrue("apellidoPC");
        disabledTrue("edadPC");
        disabledTrue("departamentosPC");
        disabledTrue("ocupacionPC");
        disabledTrue("btnEdicionPC");
        disabledTrue("censoAsignadoPC");
        disabledTrue("btnDesplegarCIPC");
        disabledTrue("nuevoPC");
        alert("Despliega Censo!");
    }
}
function censoFinalizado() { //funcion para dar finalizado un censo desde radios
    let cedula = document.querySelector("#cedulaPC").value;
    let censo = sistema.buscarCenso(cedula);
    let radioSi = document.querySelector("#radioSi");
    let radioNo = document.querySelector("#radioNo");
    if (radioSi.checked) {
        alert("El estado del censo es finalizado / validado");
        censo.finalizado = true;
        disabledFalse("cedulaPC");
        disabledFalse("nombrePC");
        disabledFalse("apellidoPC");
        disabledFalse("edadPC");
        disabledFalse("departamentosPC");
        disabledFalse("ocupacionPC");
        formReset("formCensoPC");
        formReset("formCedulaPC");
        displayBlock("btnEditarPC");
        disabledFalse("btnEditarPC");
        displayNone("div22");
        disabledFalse("nuevoPC");
        disabledFalse("censoAsignadoPC");
        disabledFalse("btnDesplegarCIPC");
        mostrarEnAsignarCenso();
    } else if (radioNo.checked) {
        alert("El estado del censo es No finalizado / No validado");
        disabledFalse("cedulaPC");
        disabledFalse("nombrePC");
        disabledFalse("apellidoPC");
        disabledFalse("edadPC");
        disabledFalse("departamentosPC");
        disabledFalse("ocupacionPC");
        formReset("formCensoPC");
        formReset("formCedulaPC");
        displayBlock("btnEditarPC");
        disabledFalse("btnEditarPC");
        disabledFalse("nuevoPC");
        disabledFalse("censoAsignadoPC");
        disabledFalse("btnDesplegarCIPC");
        mostrarEnAsignarCenso();
        displayNone("div22");
    }
}
function mostrarEnAsignarCenso() { //funcion que Muestra los censos asignados al usuario.
    let listaCensos = sistema.obtenerCensosPorValidar();
    let texto = `<option> Seleccione... </option>`;
    for(let i = 0 ; i < listaCensos.length ; i++){
        let censoActual = listaCensos[i]
        texto += `
        <option>${censoActual.cedula}</option>
        `
    }
    document.querySelector("#selectCensos").innerHTML = texto;
    document.querySelector("#censoAsignadoPC").innerHTML = texto;
}
function listaUsuarios() { //funcion que muestra los demas usuarios censistas
    let usuaries = sistema.obtenerUsuariosNoLogeados();
    let texto = "<option> Seleccione... </option>";
    for (let i = 0; i < usuaries.length; i++) {
        let usuariosActual = usuaries[i];
        texto += `<option>${usuariosActual.nombre}</option>`;
    }
    document.querySelector("#censistasDisponibles").innerHTML = texto;
}
function asignarCensista() { //funcion que reasigna un censo a otro usuario censista
    let cedula = document.querySelector("#selectCensos").value;
    let censistaDisponible = document.querySelector("#censistasDisponibles").value;
    if(cedula === "Seleccione..."){
        alert("Debe seleccionar una cedula");
    } else if(censistaDisponible === "Seleccione..."){
        alert("Debe seleccionar un censista");
    } else {
        sistema.asignarCensista(cedula, censistaDisponible);
        alert("Censista reasignado");
        formReset("formReasignar");
        formReset("formCedulaPC");
        formReset("formCensoPC");
        displayNone("div22");
        disabledFalse("nuevoPC");
        disabledFalse("censoAsignadoPC");
        disabledFalse("btnDesplegarCIPC");
        mostrarEnAsignarCenso();
    }
}
function mostrarEnEliminarCenso() { //funcion que muestra los datos en una tabla para que el invitado elimine su censo
    let cedula = document.querySelector("#CiEliminarCenso").value;
    cedula = cedula.replaceAll(/\D/g, '');
    let censo = sistema.buscarCenso(cedula);
    let texto = "";
    if (cedula === "") {
        alert("La cedula no puede estar vacia");
    } else if (!sistema.existeCenso(cedula)) {
        alert("No existe la cedula");
    } else if(censo.finalizado === true){
        alert("El censo está finalizado")
    } else {
        alert("Cedula encontrada");
        //le apago el input y el boton de buscar
        disabledTrue("CiEliminarCenso");
        disabledTrue("btnBuscarEliminarCenso");
        disabledFalse("btnCancelarEliminarDatos");
        displayBlock("btnCancelarEliminarDatos");
        texto = `
        <tr>
            <td>${censo.nombre}</td>
            <td>${censo.apellido}</td>
            <td>${censo.edad}</td>
            <td>${censo.ocupacion}</td>
            <td>${censo.departamento}</td>
        </tr>
        `;
        document.querySelector("#eliminarCIcenso").innerHTML = texto;
    }
}
function eliminarCensoInvitado() { //funcion para eliminar los datos del censo de un invitado
    let cedula = document.querySelector("#CiEliminarCenso").value;
    cedula = cedula.replaceAll(/\D/g, '');
    let texto = `
    <tr>
        <td coldspan=6 > Sindatos </td>
    </tr>
    `;
    if (cedula === "") {
        alert("La cedula no puede estar vacia");
    } else if (!sistema.existeCenso(cedula)) {
        alert("No existe la cedula");
    } else {
        sistema.eliminarCenso(cedula);
        formReset("autoEliminarDatos");
        alert("Censo eliminado correctamente");
        document.querySelector("#eliminarCIcenso").innerHTML = texto;
        cargaListaDepartamentosInvitado();
        //le prendo el input y el boton de buscar
        disabledFalse("CiEliminarCenso");
        disabledFalse("btnBuscarEliminarCenso");
        displayNone("btnCancelarEliminarDatos");
        disabledFalse("btnCancelarEliminarDatos");
    }
}
function cancelarEliminarInvitado(){
    alert("operacion cancelada")
    formReset("autoEliminarDatos");
    disabledFalse("CiEliminarCenso");
    disabledFalse("btnBuscarEliminarCenso");
    displayNone("btnCancelarEliminarDatos");
    let texto = ""
    texto = `
    <tr>
        <td>Sin Datos</td>
    </tr>
    `
    document.querySelector("#eliminarCIcenso").innerHTML = texto;
}
function mostrarCantidadCensados(){ //funcion para mostrar la cantidad de censados
    let finalized = sistema.cantidadFinalizados();
    document.querySelector("#personasCensadas").innerHTML = "Total de Personas censadas hasta el momento: " + finalized;
}
function porcentajeNoFinalizados(){ //funcion para mostrar el dato de porcentaje de no finalizados
    let notFinalized = sistema.cantidadNoFinalizados();
    notFinalized = Math.floor(notFinalized);
    document.querySelector("#personasPendientes").innerHTML = "Porcentaje de Personas Pendientes de validar: " + notFinalized + " %";
}
function CensosPorDepartamento(){ //funcion para mostrar los censos por departamento
    let departamento =  document.querySelector("#departamentosTablaVE").value;
    let texto = "";
    let cantDepartamento = sistema.obtenerCantidadPorDepartamento(departamento);
    let menoresDepartamento = sistema.obtenerMenoresPorDepartamento(departamento);
    let mayoresDepartamento = sistema.obtenerMayoresPorDepartamento(departamento);
    menoresDepartamento = Math.floor(menoresDepartamento);        
    mayoresDepartamento = Math.floor(mayoresDepartamento); 
    if(departamento === "Seleccione..."){
        alert("Seleccione un Departamento")
        texto = `
        <tr>
            <td>Sin datos</td>
            <td>Sin datos</td>
            <td>Sin datos</td>
        </tr>
        `
    }else if(cantDepartamento === 0){
        alert("No hay censados para este departamento")
        texto = `
        <tr>
            <td>Sin datos</td>
            <td>Sin datos</td>
            <td>Sin datos</td>
        </tr>
        `
    }else{
        texto = `
        <tr>
            <td>${cantDepartamento}</td>
            <td>${menoresDepartamento}</td>
            <td>${mayoresDepartamento}</td>
        </tr>
        ` 
    }
    document.querySelector("#tablaVisualizarInfo").innerHTML = texto;
}
function displayCensados(departamento){ //funcion que muestra las estadisticas por departamento por ocupacion
    let texto = "";
    let estadisticaEstudian = sistema.obtenerCantOcupacionDepartamento(departamento, "Estudiante"); 
    let estadisticasNoTrabajan = sistema.obtenerCantOcupacionDepartamento(departamento, "No trabaja");
    let estadisticasDependiente = sistema.obtenerCantOcupacionDepartamento(departamento, "Dependiente");
    let estadisticasIndependiente = sistema.obtenerCantOcupacionDepartamento(departamento, "Independiente");
    let DependienteIndependiente = estadisticasDependiente + estadisticasIndependiente;
    let porcentajeDep = sistema.obtenerPorcentajeDepartamento(departamento);
    porcentajeDep = Math.floor(porcentajeDep);
    texto += `
    <tr>
        <td>${departamento}</td>
        <td>${estadisticaEstudian}</td>
        <td>${estadisticasNoTrabajan}</td>
        <td>${DependienteIndependiente}</td>
        <td>${porcentajeDep}</td>
    </tr>
    `;
    return texto;
}
function cargaListaDepartamentosInvitado(){ //funcion que carga cada uno de los departamentos
    document.querySelector("#tablaListaCensados").innerHTML = "";
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("Montevideo");
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("Artigas");
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("Canelones");
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("Cerro Largo");
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("Colonia");
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("Durazno");
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("Flores");
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("Florida");
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("Lavalleja");
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("Maldonado");
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("Paysandu");
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("Rio Negro");
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("Rivera");
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("Rocha");
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("Salto");
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("San Jose");
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("Soriano");
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("Tacuarembo");
    document.querySelector("#tablaListaCensados").innerHTML += displayCensados("Treinta y Tres");
}