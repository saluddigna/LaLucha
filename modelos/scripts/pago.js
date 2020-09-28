Conekta.setPublicKey(conektaKey);

function llenarInfo(){
  var dataConfirmacion=global.data;
  console.log(global.data)
  $('#nombrePX').text(dataConfirmacion.Nombre+' '+dataConfirmacion.Paterno+' '+dataConfirmacion.Materno);  
  $('#fechaNacPX').text(dataConfirmacion.FechaNacimiento);  
  $('#telefonoPX').text(dataConfirmacion.Telefono);  
  $('#correoPX').text(dataConfirmacion.CorreoElectronico);  
  $('#clinicaPX').text(global.dataClinica);  
}
function startPago(){
  startResumen();
  llenarInfo();
}


function saveValuesPago(){
  var tokenParams = {
    card: {
      number: $('#numCard').val(),
      name: $('#nameCard').val(),
      exp_year: $('#aaaa').val(),
      exp_month: $('#mm').val(),
      cvc: $('#ccv').val(),     
    }
  };
  if(tPago==3){
    Conekta.Token.create(tokenParams, successResponseHandler, errorResponseHandler);
  }else{
    registrarCita();
  }
}
var successResponseHandler = function(token) {
  registrarCita();
  };



var errorResponseHandler = function(error) {
  alerta('Error al registrar cita, Intentalo mas tarde')
  console.log(error,'error')
};

var tPago=3;
function tipoPago(tipo){
  if(tipo==2){
    tPago=tipo;
    $("#pagoLinea").removeClass("active");
    $("#pagoClinica").addClass("active");
    $("#datosPagar").addClass("d-none");
  }else{
    tPago=tipo;
    $("#pagoLinea").addClass("active");
    $("#pagoClinica").removeClass("active");
    $("#datosPagar").removeClass("d-none");
  }
};

function registrarCita(){
  global.data.cita.EstatusLaboratorio=false;
  global.data.cita.CondicionFolios=1000;
  global.data.cita.TipoPago=tPago;

  if(tPago==3){
    global.data.cita.TextoDeSuma="Total por obtener tu cita en línea";
    global.data.cita.DatosPago={
      Correo:global.data.CorreoElectronico,
      Nombre:$('#nameCard').val(),
      Precio:0,
      Referencia:"",
      Telefono:global.data.Telefono,
      Token:"tok_test_visa_4242",
      conektaTokenId:""
    }
  }else{
    global.data.cita.TextoDeSuma="";
    global.data.cita.DatosPago={
      Correo: null,
      Nombre:null,
      Precio:null,
      Referencia:null,
      Telefono:null,
      Token:null,
      conektaTokenId:null
    }
  }
  global.perfil=Registro(global.data)
  if(global.perfil.datosPaciente!=null){
    alerta("Registro Correcto")
    console.log(JSON.stringify(global.perfil));
    sessionStorage.clear()
    sessionStorage.setItem('dataUser', JSON.stringify(global.perfil))
    irPerfil("perfil");
  }else{
    alerta('Error al registrar cita, Intentalo mas tarde')
  }
}