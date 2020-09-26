function irOlvidar(tipo){
  if(tipo){
    $("#contenedorLogIn").load("./modelos/componentes/restablecer.html");
  }else{
    $("#ingresar").load("./modelos/componentes/ingresar.html");
  }
}
function recuperada(){
  $("#contenedorLogIn").load("./modelos/componentes/recuperada.html");
}