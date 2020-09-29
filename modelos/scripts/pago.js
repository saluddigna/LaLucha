
$(document).ready(function () {
  if(Conekta)
    Conekta.setPublicKey(conektaKey);
})
function llenarInfo(){
  $(":input").inputmask();
  
//
  var dataConfirmacion=global.data;
  console.log(global.data)
  $('#nombrePX').text(dataConfirmacion.Nombre+' '+dataConfirmacion.Paterno+' '+dataConfirmacion.Materno);  
  $('#fechaNacPX').text(dataConfirmacion.FechaNacimiento);  
  $('#telefonoPX').text(dataConfirmacion.Telefono);  
  $('#correoPX').text(dataConfirmacion.CorreoElectronico);  
  $('#clinicaPX').text(global.dataClinica);  
  if(global.data.cita.Estudios.length>1)
    $("#pagoClinica").addClass("dis"); //disables
  else
    $("#pagoClinica").removeClass("dis"); //enables
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
  console.log(token)
    registrarCita(token.id);
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

function registrarCita(token){
  global.data.cita.EstatusLaboratorio=false;
  global.data.cita.CondicionFolios=1000;
  global.data.cita.TipoPago=tPago;
  var precio= global.data.cita.Estudios.length==1 ? 150.00 : global.data.cita.Estudios.length==2 ? 300.00 : 380.00;
  if(tPago==3){
      global.data.cita.TextoDeSuma="Total por obtener tu cita en línea";
      global.data.cita.DatosPago={
      Correo:global.data.CorreoElectronico,
      Nombre:$('#nameCard').val(),
      Precio: precio,
      Referencia:"",
      Telefono:global.data.Telefono,
      Token:token,
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
  console.log(JSON.stringify(global.data));
  if(global.perfil.datosPaciente!=null){
    alerta("Registro Correcto")
    console.log(JSON.stringify(global.perfil));
    sessionStorage.clear()
    sessionStorage.setItem('dataUser', JSON.stringify(global.perfil))
    clearGlobalData();
    irPerfil("perfil");
  }else{
    alerta('Error al registrar cita, Intentalo mas tarde')
  }
}

function validacionesDatosPago(){
  if(tPago==2){
    $('#form-registro').parsley({
        excluded: '.pagar input'//, .datos-paciente input, .datos-paciente select,.confirmacionDatos input,.confirmacionDatos select 
    });
  }
  $('#form-registro').parsley().validate();
  if ($('#form-registro').parsley().isValid()) {
    return true
  } else {
      console.log('not valid registro');
      return false
  }
}

function clearGlobalData(){
  global={};
  global.data={}
  global.data.cita={};
  global.data.cita.Estudios=[];
  global.clinicas=[];
  global.estados=[];
  global.dataClinica=[];
  mastografia=null;
  densitometria=null;
  papanicolao=null;
  global.perfil={};
}