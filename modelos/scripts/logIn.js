function irOlvidar(tipo){
  if(tipo){
    $("#contenedorLogIn").load("./modelos/componentes/restablecer.html");
  }else{
    $("#ingresar").load("./modelos/componentes/ingresar.html");
  }
}
function recuperada(){
  data={correoElectronico:$('#recuperar-correo').val()}
  var resp=recuperarContra(data)
  console.log(resp);

  // $("#contenedorLogIn").load("./modelos/componentes/recuperada.html");
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

function cerrarSesion(){
  sessionStorage.clear();
  $('#seccion').load('../modelos/logIn.html',function(){
    removerClaseNav();
    $("#btnLogIn").addClass("active");
  });
}


