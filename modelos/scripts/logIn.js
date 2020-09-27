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
function iniciarSesion(){
  var data={
    CorreoElectronico:$('#login-correo').val(),
    Pass: $('#login-contrasena').val()
  }
  var dataUser=[];
  dataUser= LoginService(data);
  console.log(JSON.stringify(dataUser));
  sessionStorage.clear()
  if(dataUser.estatus==false || dataUser==null){
    alert("Error Usuario o Contraseña Incorrectos");
  }
  else if(dataUser.datosPaciente!=null){
    sessionStorage.setItem('dataUser', JSON.stringify(dataUser))
    irPerfil("perfil");
  }
  else{
    alert("Error Usuario o Contraseña Incorrectos");
  }
}