class Sistema {
    constructor() {
        this.censos = []; // esta es la lista de censados
        this.usuarios = []; // esta es la lista de censistas
        this.usuarioLogueado = null;
    }
    precargaDeDatos() {   
        //estos son los usuarios censistas
        let usuario1 = new Usuario("Juan"/* nombre*/, "Peralta"/*Usuario*/, "JuanP99"/*pass*/);
        let usuario2 = new Usuario("Guillermo", "Vieira", "GuilleVieira10");
        let usuario3 = new Usuario("Maximiliano", "Maximiliano10", "Maximiliano10");
        //aca los estamos agregando a la lista de usuarios censistas
        this.agregarUsuario( usuario1 );
        this.agregarUsuario( usuario2 );
        this.agregarUsuario( usuario3 );
        //Estos son los censos pre-cargados
        let censo1 = new Censo("47122265", "Juan Ignacio", "Couto", "27", "Montevideo", "Estudiante");
        let censo2 = new Censo("12345672", "Diego", "Forlan", "45", "Montevideo", "Dependiente");
        let censo3 = new Censo("23456783", "Luis", "Suarez", "36", "Salto", "Dependiente");
        let censo4 = new Censo("34567894", "Leonel", "Messi", "36", "San Jose", "Dependiente");
        let censo5 = new Censo("45678905", "Jose Ignacio", "Fernandez", "27", "Canelones", "Estudiante");
        let censo6 = new Censo("56789016", "Cristiano", "Ronaldo", "45", "Montevideo", "Independiente");
        let censo7 = new Censo("67890127", "Mateo", "Suarez", "36", "Artigas", "Dependiente");
        let censo8 = new Censo("78901238", "Leonel", "Messa", "36", "San Jose", "Independiente");
        let censo9 = new Censo("89012349", "Jose", "Diaz", "25", "Montevideo", "Estudiante");
        let censo10 = new Censo("90123450", "Jorge", "Botta", "16", "Maldonado", "Estudiante");
        let censo11 = new Censo("11234569", "Leonardo", "Sainz", "36", "Colonia", "Dependiente");
        let censo12 = new Censo("22345670", "Martin", "Mendez", "36", "Lavalleja", "Dependiente");
        let censo13 = new Censo("33456781", "Juan", "Gerez", "27", "Soriano", "No trabaja");
        let censo14 = new Censo("44567892", "Francisco", "Farias", "45", "Rivera", "Dependiente");
        let censo15 = new Censo("55678903", "Mathias", "Sellanes", "36", "Rio Negro", "Dependiente");
        let censo16 = new Censo("66789014", "Rafael", "Mendoza", "36", "Paysandu", "Dependiente");
        let censo17 = new Censo("77890125", "Maximiliano", "Perez", "15", "Montevideo", "Dependiente");
        let censo18 = new Censo("88901236", "Emiliano", "Fernandes", "45", "Montevideo", "Dependiente");
        let censo19 = new Censo("99012347", "Kylian", "Acosta", "36", "Flores", "Independiente");
        let censo20 = new Censo("10123456", "Paul", "Rodriguez", "36", "San Jose", "Independiente");
        let censo21 = new Censo("21234567", "Dominic", "Gonzalez", "17", "Tacuarembo", "Estudiante");
        let censo22 = new Censo("32345678", "Brian", "Albarracin", "45", "Cerro Largo", "Dependiente");
        let censo23 = new Censo("43456789", "Nelson", "Paez", "36", "Treinta y Tres", "No trabaja");
        let censo24 = new Censo("54567890", "Bruce", "Tesla", "36", "Rocha", "Dependiente");
        let censo25 = new Censo("65678901", "Arnold", "Perea", "27", "Montevideo", "Dependiente");
        let censo26 = new Censo("76789012", "Erik", "Lamela", "45", "Colonia", "Dependiente");
        let censo27 = new Censo("87890123", "Antony", "Sorin", "15", "Salto", "Estudiante");
        let censo28 = new Censo("98901234", "Leo", "DiCandia", "36", "San Jose", "No trabaja");
        let censo29 = new Censo("19012343", "Eduardo", "Pereira", "27", "Canelones", "Independiente");
        let censo30 = new Censo("20123454", "Gabriel", "Vazquez", "45", "Artigas", "Independiente");
        //acá estamos agregando el censado a la lista de censos
        this.agregarCenso( censo1 );
        this.agregarCenso( censo2 );
        this.agregarCenso( censo3 );
        this.agregarCenso( censo4 );
        this.agregarCenso( censo5 );
        this.agregarCenso( censo6 );
        this.agregarCenso( censo7 );
        this.agregarCenso( censo8 );
        this.agregarCenso( censo9 );
        this.agregarCenso( censo10 );
        this.agregarCenso( censo11 );
        this.agregarCenso( censo12 );
        this.agregarCenso( censo13 );
        this.agregarCenso( censo14 );
        this.agregarCenso( censo15 );
        this.agregarCenso( censo16 );
        this.agregarCenso( censo17 );
        this.agregarCenso( censo18 );
        this.agregarCenso( censo19 );
        this.agregarCenso( censo20 );
        this.agregarCenso( censo21 );
        this.agregarCenso( censo22 );
        this.agregarCenso( censo23 );
        this.agregarCenso( censo24 );
        this.agregarCenso( censo25 );
        this.agregarCenso( censo26 );
        this.agregarCenso( censo27 );
        this.agregarCenso( censo28 );
        this.agregarCenso( censo29 );
        this.agregarCenso( censo30 );
        // aca estamos asignando un censista al censado 
        //Usuario1
        censo1.censistaAsignado = usuario1;
        censo2.censistaAsignado = usuario3;
        censo3.censistaAsignado = usuario3;
        censo4.censistaAsignado = usuario1;
        censo5.censistaAsignado = usuario1;
        censo6.censistaAsignado = usuario1;
        censo7.censistaAsignado = usuario1;
        censo8.censistaAsignado = usuario1;
        censo9.censistaAsignado = usuario1;
        censo10.censistaAsignado = usuario1;
        //Usuario2
        censo11.censistaAsignado = usuario2;
        censo12.censistaAsignado = usuario2;
        censo13.censistaAsignado = usuario2;
        censo14.censistaAsignado = usuario2;
        censo15.censistaAsignado = usuario2;
        censo16.censistaAsignado = usuario2;
        censo17.censistaAsignado = usuario2;
        censo18.censistaAsignado = usuario2;
        censo19.censistaAsignado = usuario2;
        censo20.censistaAsignado = usuario2;
        //Usuario3
        censo21.censistaAsignado = usuario3;
        censo22.censistaAsignado = usuario3;
        censo23.censistaAsignado = usuario3;
        censo24.censistaAsignado = usuario3;
        censo25.censistaAsignado = usuario3;
        censo26.censistaAsignado = usuario3;
        censo27.censistaAsignado = usuario3;
        censo28.censistaAsignado = usuario3;
        censo29.censistaAsignado = usuario3;
        censo30.censistaAsignado = usuario3;
        //aqui se setean censos finalizado
        censo1.finalizado = true;
        censo2.finalizado = true;
        censo3.finalizado = true;
        censo4.finalizado = true;
        censo11.finalizado = true;
        censo12.finalizado = true;
        censo13.finalizado = true;
        censo14.finalizado = true;
        censo15.finalizado = true;
        censo16.finalizado = true;
        censo29.finalizado = true;
        censo30.finalizado = true;
    }
    agregarCenso(unCenso) { 
        this.censos.push(unCenso);
    }
    agregarUsuario(unUsuario) { 
        this.usuarios.push(unUsuario);
    }
    obtenerUsuarios() {
        return this.usuarios;
    }
    obtenerCenso() {
        return this.censos;
    }
    obtenerCensosPorValidar(){
        let lista = [];
        let censadosGenerales = this.censos;
        for(let i= 0; i < censadosGenerales.length;i++){
            let censoActual = censadosGenerales[i];
            if(censoActual.finalizado === false && censoActual.censistaAsignado === usuarioLogueado){
                lista.push(censoActual);
            }
        }
        return lista;
    }
    obtenerUsuariosNoLogeados(){
        let lista = [];
        let usuariosGenerales = this.usuarios;
        for(let i = 0; i < usuariosGenerales.length ; i++){
            let usuarioActual = usuariosGenerales[i];
            if(usuarioActual !== usuarioLogueado){
                lista.push(usuarioActual);
            }
        }
        return lista;
    }
    eliminarCenso(cedula){
        let censo = sistema.buscarCenso(cedula);
        if (censo) {
            let indiceArray = this.censos.indexOf(censo);
            if (indiceArray !== -1) {
                this.censos.splice(indiceArray, 1);
            }
        } 
    }
    buscarUsuario(userName) { 
        let usuario = null;
        for (let i = 0; i < this.usuarios.length && usuario === null; i++) {
            let usuarioActual = this.usuarios[i];
            if (usuarioActual.usuario.toLowerCase() === userName.toLowerCase()) {
                usuario = usuarioActual;
            }
        }
        return usuario;
    }
    buscarUsuarioNombre(unNombre) { 
        let usuario = null;
        for (let i = 0; i < this.usuarios.length && usuario === null; i++) {
            let usuarioActual = this.usuarios[i];
            if (usuarioActual.nombre.toLowerCase() === unNombre.toLowerCase()) {
                usuario = usuarioActual;
            }
        }
        return usuario;
    }
    buscarCenso(cedula) { 
        let censo = null;
        for (let i = 0; i < this.censos.length && censo === null; i++) {
            let censoActual = this.censos[i];
            if (censoActual.cedula === cedula) {
                censo = censoActual;
            }
        }
        return censo;
    }
    existeCenso(cedula) { 
        let censo = this.buscarCenso(cedula);
        return censo != null;
    }
    cedulaValida(unaCedula) { 
        let cedula = this.buscarCedula(unaCedula);
        return cedula;
    }
    mostrarNombreCenso(cedula) { 
        if (this.cedulaValida === true) {
            let censo = this.buscarCenso(cedula);
            let nombre;
            if (censo) {
                nombre = censo.nombre;
            }
            return nombre;
        }
    }
    loginValido(usuario, pass) { 
        let valido = false;
        for (let i = 0; i < this.usuarios.length && !valido; i++) {
            let usuarioActual = this.usuarios[i];
            if (usuarioActual.usuario.toLowerCase() === usuario.toLowerCase() && usuarioActual.pass === pass) {
                valido = true;
            }
        }
        return valido;
    }
    existeUsuario(userName) { 
        let usuario = this.buscarUsuario(userName);
        return usuario != null;
    }
    modificarCensoNoFinalizado(cedula, nuevoNombre, nuevoApellido, nuevoEdad, nuevoDepartamento, nuevoOcupacion) {
        let censo = sistema.buscarCenso(cedula);
        censo.nombre = nuevoNombre;
        censo.apellido = nuevoApellido;
        censo.edad = nuevoEdad;
        censo.departamento = nuevoDepartamento;
        censo.ocupacion = nuevoOcupacion;
    }
    buscarCedula(unaCedula) { 
        let cedula = null;
        for (let i = 0; i < this.cedulas.length && cedula === null; i++) {
            let cedulaActual = this.cedulas[i];
            if (cedulaActualcedulas.toLowerCase() === unaCedula.toLowerCase()) {
                cedula = cedulaActual;
            }
        }
        return cedula;
    }
    asignarUsuarioRandom( unCenso ){
        let randomUsuarioIndice = Math.floor(Math.random() * this.usuarios.length);
        let unUsuario = this.usuarios[randomUsuarioIndice];
        unCenso.censistaAsignado = unUsuario;
    }
    asignarCensista(cedula, usuario) { 
        let censo = this.buscarCenso(cedula);
        let censista = this.buscarUsuarioNombre(usuario);
        if (censo && censista) {
            censo.censistaAsignado = censista;
        }
    }
    obtenerFinalizados(){ 
        let censosFinalizados = []
        let censadosGenerales = this.censos;
        for(let i= 0; i < censadosGenerales.length;i++){
            let censoActual = censadosGenerales[i];
            if(censoActual.finalizado === true){
                censosFinalizados.push(censoActual);
            }
        }
        return censosFinalizados; 
    }
    cantidadFinalizados(){ 
        let censosFinalizados = []
        let censadosGenerales = this.censos;
        for(let i= 0; i < censadosGenerales.length;i++){
            let censoActual = censadosGenerales[i];
            if(censoActual.finalizado === true){
                censosFinalizados.push(censoActual);
            }
        }
        return censosFinalizados.length; 
    }
    cantidadNoFinalizados() { 
        let censosFinalizados = this.cantidadFinalizados();
        let censosNoFinalizados = this.censos.length - censosFinalizados;
        let porcentaje = (censosNoFinalizados / this.censos.length) * 100;
        return porcentaje;
    }
    obtenerCantidadPorDepartamento(departamento){ 
        let censosFinalizados = this.obtenerFinalizados();
        let resultados = [];
        
        for (let i = 0; i < censosFinalizados.length; i++) {
            let censoActual = censosFinalizados[i];
            if (censoActual.departamento === departamento) {
                resultados.push(censoActual);
            }
        }
        return resultados.length; 
    }
    obtenerMenoresPorDepartamento(departamento){ 
        let finalizados = this.obtenerFinalizados();
        let cantidadDepartamento = this.obtenerCantidadPorDepartamento(departamento);
        let menores = [];
        let resultado;
        for (let i = 0; i < finalizados.length; i++) {
            let censoActual = finalizados[i];
            if (censoActual.departamento === departamento && censoActual.edad < 18) {
                menores.push(censoActual);
            }
        }
        resultado = (menores.length / cantidadDepartamento) * 100;
        return resultado; 
    }
    obtenerMayoresPorDepartamento(departamento){ 
        let finalizados = this.obtenerFinalizados();
        let cantidadDepartamento = this.obtenerCantidadPorDepartamento(departamento);
        let mayores = [];
        let resultado;
        for (let i = 0; i < finalizados.length; i++) {
            let censoActual = finalizados[i];
            if (censoActual.departamento === departamento && censoActual.edad >= 18) {
                mayores.push(censoActual);
            }
        }
        resultado = (mayores.length / cantidadDepartamento) * 100;
        return resultado;
    }
    obtenerCantOcupacionDepartamento(departamento, ocupacion){ 
        let censos = this.censos;
        let resultados = [];
        for(let i = 0 ; i < censos.length ; i++){
            let censoActual = censos[i];
            if(censoActual.departamento === departamento && censoActual.ocupacion === ocupacion){
                resultados.push(censoActual);
            }
        }
        return resultados.length;
    }
    obtenerPorcentajeDepartamento(departamento){ 
        let totalDepartamento = []
        let censos = this.censos;
        for(let i = 0 ; i < censos.length ; i++){
            let censoActual = censos[i];
            if(censoActual.departamento === departamento){
                totalDepartamento.push(censoActual);
            }
        }
        let resultado = (totalDepartamento.length / censos.length) * 100;
        return resultado;
    }
}
let idSiguienteUsuario = 0;
class Usuario {
    constructor(nombre, usuario, pass) {
        this.id = idSiguienteUsuario++;
        this.nombre = nombre;
        this.usuario = usuario;
        this.pass = pass;
    }
}
class Censo {
    constructor(cedula, nombre, apellido, edad, departamento, ocupacion) {
        this.cedula = cedula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.departamento = departamento;
        this.ocupacion = ocupacion;
        this.censistaAsignado = null 
        this.finalizado = false;
    }
}