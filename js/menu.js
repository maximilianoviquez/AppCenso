function ocultarDivs() {
    document.querySelector("#divInicial").style.display = "none";
    document.querySelector("#usuarioLogeado").style.display = "none";
    document.querySelector("#div2").style.display = "none";
    document.querySelector("#div3").style.display = "none";
    document.querySelector("#div4").style.display = "none";
    document.querySelector("#div5").style.display = "none";
}
function mostrarDiv(id) {
    ocultarDivs();
    document.querySelector("#" + id).style.display = "block";
}
function displayNone(id) {
    document.querySelector("#" + id).style.display = "none";
}
function displayBlock(id) {
    document.querySelector("#" + id).style.display = "block";
}
function disabledTrue(id) {
    document.querySelector("#" + id).disabled = true;
}
function disabledFalse(id) {
    document.querySelector("#" + id).disabled = false;
}
function formReset(id) {
    document.querySelector("#" + id).reset();
}
