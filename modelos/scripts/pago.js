
$(document).ready(function () {
  if (Conekta)
    Conekta.setPublicKey(conektaKey);
})
function llenarInfo() {
  // $("#error-msg").text("");
  quitarLoading();
  $('#invalidCard').hide()
  $('#invalidDate').hide()
  $('#invalidCCV').hide()
  $("#invalidName").hide()

  $(":input").inputmask();

  //
  var dataConfirmacion = global.data;
  console.log(global.data)
  $('#nombrePX').text(dataConfirmacion.Nombre + ' ' + dataConfirmacion.Paterno + ' ' + dataConfirmacion.Materno);
  $('#fechaNacPX').text(dataConfirmacion.FechaNacimiento);
  $('#telefonoPX').text(dataConfirmacion.Telefono);
  $('#correoPX').text(dataConfirmacion.CorreoElectronico);
  $('#clinicaPX').text(global.dataClinica);
  if (global.data.cita.Estudios.length > 1)
    $("#pagoClinica").addClass("dis"); //disables
  else
    $("#pagoClinica").removeClass("dis"); //enables
}
function startPago() {
  startResumen();
  llenarInfo();
  $("#cita_siguiente").prop("disabled", true);
  $("#nameCard").on('keydown input change', function () { validacionesDatosPago() })
  $("#numCard").on('keydown input change', function () { validacionesDatosPago() })
  $("#mm").on('keydown input change', function () { validacionesDatosPago() })
  $("#aaaa").on('keydown input change', function () { validacionesDatosPago() })
  $("#ccv").on('keydown input change', function () { validacionesDatosPago() })
}

var tarjeta = false;
var expirationDate = false;
var validateCCV = false;
function validateConekta() {
  tarjeta = Conekta.card.validateNumber($('#numCard').val());
  expirationDate = Conekta.card.validateExpirationDate($('#mm').val(), $('#aaaa').val());
  validateCCV = Conekta.card.validateCVC($('#ccv').val());
  console.log(tarjeta, expirationDate, validateCCV)
  if (!tarjeta)
    $('#invalidCard').show()
  else if (!expirationDate)
    $('#invalidDate').show()
  else if (!validateCCV)
    $('#invalidCCV').show()
  else {
    $('#invalidCard').hide()
    $('#invalidDate').hide()
    $('#invalidCCV').hide()
    return true
  }
  return false
}
function saveValuesPago() {
  mostrarLoading();
  $("#error-msg").text("");
  if (tPago == 3) {
    if (!validateConekta()) {
      return;
    }
    var tokenParams = {
      card: {
        number: $('#numCard').val(),
        name: $('#nameCard').val(),
        exp_year: $('#aaaa').val(),
        exp_month: $('#mm').val(),
        cvc: $('#ccv').val(),
      }
    };
    Conekta.Token.create(tokenParams, successResponseHandlerRegistro, errorResponseHandlerRegistro);
  } else {
    registrarCita();
  }
}


var successResponseHandlerRegistro = function (token) {
  console.log(token)
  registrarCita(token.id);
};



var errorResponseHandlerRegistro = function (error) {
  $("#error-msg").text(error.message_to_purchaser);
  // setTimeout(function() { quitarLoading(); }, 1500);
  console.log(error, 'error')
};

var tPago = 3;
function tipoPago(tipo) {
  global.data.cita.TipoPago = tipo;
  if (tipo == 2) {
    tPago = tipo;
    startResumen();
    $("#pagoLinea").removeClass("active");
    $("#pagoClinica").addClass("active");
    $("#datosPagar").addClass("d-none");
    validacionesDatosPago();
  } else {
    tPago = tipo;
    startResumen();
    $("#pagoLinea").addClass("active");
    $("#pagoClinica").removeClass("active");
    $("#datosPagar").removeClass("d-none");
    validacionesDatosPago();
  }
};

function registrarCita(token) {
  global.data.cita.EstatusLaboratorio = false;
  global.data.cita.CondicionFolios = 1000;
  global.data.cita.TipoPago = tPago;
  var precio=0;
  if(global.data.cita.Estudios.length==1){
    if(global.data.IdSucursal=="1" && global.data.cita.TipoPago!=3){
      precio=210.00;    
    }
    else if(global.data.IdSucursal!="1" && global.data.cita.TipoPago!=3){
      precio=220.00;
    }
    else if(global.data.cita.TipoPago==3)
      precio=150.00
  }
  else if(global.data.cita.Estudios.length==2){
      precio=300.00;
  }
  else if(global.data.cita.Estudios.length==3){
    precio=380.00
  }
  // var precio =  ? 150.00 : global.data.cita.Estudios.length == 2 ? 300.00 : 380.00;
  if (tPago == 3) {
    global.data.cita.TextoDeSuma = "Total por obtener tu cita en línea";
    global.data.cita.DatosPago = {
      Correo: global.data.CorreoElectronico,
      Nombre: $('#nameCard').val(),
      Precio: precio,
      Referencia: "",
      Telefono: global.data.Telefono,
      Token: token,
      conektaTokenId: ""
    }
  } else {
    global.data.cita.TextoDeSuma = "";
    global.data.cita.DatosPago = {
      Correo: null,
      Nombre: null,
      Precio: precio,
      Referencia: null,
      Telefono: null,
      Token: null,
      conektaTokenId: null
    }
  }
  global.perfil = Registro(global.data)
  console.log(JSON.stringify(global.data));
  if (global.perfil.datosPaciente != null) {

    console.log(JSON.stringify(global.perfil));
    sessionStorage.clear()
    sessionStorage.setItem('dataUser', JSON.stringify(global.perfil))
    clearGlobalData();
    setTimeout(function () { irPerfil("perfil"); }, 2500);

  } else {
    setTimeout(function () { quitarLoading(); }, 1500);
    $("#error-msg").text(global.perfil);
  }
}

function validacionesDatosPago() {
  if (tPago == 2) {
    $('#form-registro').parsley({
      excluded: '.pagar input'//, .datos-paciente input, .datos-paciente select,.confirmacionDatos input,.confirmacionDatos select 
    });
  } else {
    if (!changeName($("#nameCard").val())) {
      return
    }
    if (!validateConekta()) {
      $("#cita_siguiente").prop("disabled", true);
      return
    }
  }
  // $('#form-registro').parsley().validate();
  if ($('#form-registro').parsley().isValid()) {
    $("#cita_siguiente").prop("disabled", false);
    return true

  } else {
    console.log('not valid registro');
    $("#cita_siguiente").prop("disabled", true);
    return false
  }
}

function clearGlobalData() {
  global = {};
  global.data = {}
  global.data.cita = {};
  global.data.cita.Estudios = [];
  global.clinicas = [];
  global.estados = [];
  global.dataClinica = [];
  mastografia = null;
  densitometria = null;
  papanicolao = null;
  global.perfil = {};
}

function quitarLoading() {
  $("#paginador-registro").show()
  $("#pago-loading").hide()
  $("#pago-datos").show();
  top.location.href = '#top';
}
function mostrarLoading() {
  $("#paginador-registro").hide()
  $("#pago-loading").show()
  $("#pago-datos").hide()
  top.location.href = '#top';
}

function sonLetras(texto) {
  var regex = /^[a-zA-Z ]+$/;
  return regex.test(texto);
}
function changeName(value) {
  if (!sonLetras(value)) {
    $("#cita_siguiente").prop("disabled", true);
    $("#invalidName").show()
    return false;
  }
  else
    $("#invalidName").hide()
  return true;
}

function changeCard(value) {
  $("#invalidCard").hide()
}


function changeDate(value) {
  $("#invalidDate").hide()
}

function changeCCV(value) {
  $("#invalidCCV").hide()
}