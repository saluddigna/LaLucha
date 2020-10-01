function irOlvidar(tipo){
  olvidarContra(tipo);
}


function validateData(){
  $('#form-login').parsley().validate();
    if ($('#form-login').parsley().isValid()) {
      return true
    } else {
        return false
    }
}
function recuperada(){
  var valida=validateData()
  if(valida){
    data={correoElectronico:$('#recuperar-correo').val()}
    var resp=recuperarContra(data)
    redirectRecuperada();
  }
}
function Login(){
    // $('#form-login').parsley({
    //   excluded: '#login-correo'
    // });
    $('#form-login').parsley().validate();
    if ($('#form-login').parsley().isValid()) {
      iniciarSesion()
    } else {
        console.log('not valid login');
    }

  // $('#login-form').parsley().on('field:validated', function() {
  //   // var ok = $('.parsley-error').length === 0;
  // })
  // .on('form:submit', function() {
  //   return iniciarSesion(); // Don't submit form for this demo
  // });
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
    $("#login-error").text("Error Usuario o Contraseña Incorrectos")
  }
  else if(dataUser.datosPaciente!=null){
    sessionStorage.setItem('dataUser', JSON.stringify(dataUser))
    irPerfil("perfil");
  }
  else{
    $("#login-error").text("Error Usuario o Contraseña Incorrectos")
    // alert("Error Usuario o Contraseña Incorrectos");
  }
  
}

function cerrarSesion(){
  sessionStorage.clear();
  redirectLogin();
}

function cambiarPass(){
  var valida=validateData()
  if(valida){
  data={
      id: getUrlParameter('recovery'),
      password: $('#recuperar-pass').val()
  }
  var resp=cambiarContra(data)
  console.log(resp);
  redirectCambiarContra();
}
}

