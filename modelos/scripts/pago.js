
// $(document).ready(function () {
//   // if (Conekta)
//   //   Conekta.setPublicKey(conektaKey);
// })
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
  //console.log(global.data)
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
  Conekta.setPublicKey(conektaKey);
  $("#cita_siguiente").prop("disabled", true);
  $("#nameCard").on('input', function () { validacionesDatosPago("#nameCard") })
  $("#numCard").on('input', function () { validacionesDatosPago("#numCard") })
  $("#mm").on('input', function () { validacionesDatosPago("#mm") })
  $("#aaaa").on('input', function () { validacionesDatosPago("#aaaa") })
  $("#ccv").on('input', function () { validacionesDatosPago("#ccv") })
}

var tarjeta = false;
var expirationDate = false;
var validateCCV = false;
function validateConekta() {
  tarjeta = Conekta.card.validateNumber($('#numCard').val());
  expirationDate = Conekta.card.validateExpirationDate($('#mm').val(), $('#aaaa').val());
  validateCCV = Conekta.card.validateCVC($('#ccv').val());
  //console.log(tarjeta, expirationDate, validateCCV)
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

function validateConektaBySelector(selector) {
  if(selector=='#numCard'){
    if (!Conekta.card.validateNumber($('#numCard').val())){
      $('#invalidCard').show()
      return false;
    }
    else{
      $('#invalidCard').hide()
      return true;
    }
  }
  else if(selector=='#mm' || selector=='#aaaa'){
    if (!Conekta.card.validateExpirationDate($('#mm').val(), $('#aaaa').val())){
      $('#invalidDate').show();
      return false;
    }
    else{
      $('#invalidDate').hide()
      return true;
    }
  }
  else if(selector=="#ccv"){
    if (!Conekta.card.validateCVC($('#ccv').val())){
      $('#invalidCCV').show()
      return false
    }
    else{
      $('#invalidCCV').hide()
      return true
    }
  }
}

function saveValuesPago() {
  $.when( mostrarLoading() ).then(x=>{   
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
  });
}


var successResponseHandlerRegistro = function (token) {
  //console.log(token)
  registrarCita(token.id);
};



var errorResponseHandlerRegistro = function (error) {
  $("#error-msg").text(error.message_to_purchaser);
  // setTimeout(function() { quitarLoading(); }, 1500);
  //console.log(error, 'error')
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
    $("#datosPagarClinica").removeClass("d-none");
    validacionesDatosPago();
  } else {
    tPago = tipo;
    startResumen();
    $("#pagoLinea").addClass("active");
    $("#pagoClinica").removeClass("active");
    $("#datosPagar").removeClass("d-none");
    $("#datosPagarClinica").addClass("d-none");
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
      saveAnalytics('citaRealizadaDesgloce','PonElPecho','En clínica')  
    }
    else if(global.data.IdSucursal!="1" && global.data.cita.TipoPago!=3){
      precio=220.00;
      saveAnalytics('citaRealizadaDesgloce','PonElPecho','En clínica')
    }
    else if(global.data.cita.TipoPago==3)
      precio=150.00;
      saveAnalytics('citaRealizadaDesgloce','PonElPecho','En linea: Mastográfia')
  }
  else if(global.data.cita.Estudios.length==2){
      precio=300.00;
      saveAnalytics('citaRealizadaDesgloce','PonElPecho','En linea: Masto + Papa')
  }
  else if(global.data.cita.Estudios.length==3){
    precio=380.00;
    saveAnalytics('citaRealizadaDesgloce','PonElPecho','En linea: Paquete Mujer')
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
  //console.log("DATOS-REGISTRO",global.data)
  //console.log(JSON.stringify(global.data));
  global.perfil = Registro(global.data)
  if (global.perfil.datosPaciente != null) {
    if(tPago==3){
      saveAnalytics('citaRealizada','PonElPecho','pago-acreditado',precio);
      saveAnalytics('formulario-cita','PonElPecho','4 - Pago completado || Mi perfil', precio)
    }else{
      saveAnalytics('citaRealizada','PonElPecho','pago-clinica');
      saveAnalytics('formulario-cita','PonElPecho','4 - Pago completado || Mi perfil', precio)
    }
    // //console.log(JSON.stringify(global.perfil));
    sessionStorage.clear()
    sessionStorage.setItem('dataUser', JSON.stringify(global.perfil))
    clearGlobalData();
    setTimeout(function () { quitarLoading(); }, 1500);
    localStorage.setItem("cita_creada", 1);
    irPerfil("perfil");
  } else {
    setTimeout(function () { quitarLoading(); }, 1500);
    saveAnalytics('error-pago','PonElPecho',global.perfil)
    $("#error-msg").text(global.perfil);
  }
}

function validacionesDatosPago(selector) {
  if(selector){
    if(tPago == 3){
      if(selector=="#nameCard"){
        if (!changeName($("#nameCard").val())) {
          //console.log(!changeName($("#nameCard").val()))
          return
        }
      }
      else{
        if(!validateConektaBySelector(selector)){
          $("#cita_siguiente").prop("disabled", true);
          return
        }
      }
    }
    else if (tPago == 2) {
      $('#form-registro').parsley({
        excluded: '.pagar input'//, .datos-paciente input, .datos-paciente select,.confirmacionDatos input,.confirmacionDatos select 
      });
    } 
    $(selector).parsley().validate();
    if ($('#form-registro').parsley().isValid()) {
        $("#cita_siguiente").prop("disabled", false);
        return true
      } else {
        //console.log('not valid registro');
        $("#cita_siguiente").prop("disabled", true);
        return false
      }
  }else{
    if(tPago == 3){
        if (!changeName($("#nameCard").val())) 
          return
        if(!validateConekta()){
          $("#cita_siguiente").prop("disabled", true);
          return
        }
    }
    else if (tPago == 2) {
      $('#form-registro').parsley({
        excluded: '.pagar input'//, .datos-paciente input, .datos-paciente select,.confirmacionDatos input,.confirmacionDatos select 
      });
    } 
    $('#form-registro').parsley().validate();
    if ($('#form-registro').parsley().isValid()) {
      $("#cita_siguiente").prop("disabled", false);
      return true
    } else {
      //console.log('not valid registro');
      $("#cita_siguiente").prop("disabled", true);
      return false
    }
  }

  // $('#form-registro').parsley().validate();
  // if ($('#form-registro').parsley().isValid()) {
  //   $("#cita_siguiente").prop("disabled", false);
  //   return true

  // } else {
  //   //console.log('not valid registro');
  //   $("#cita_siguiente").prop("disabled", true);
  //   return false
  // }
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

async function quitarLoading() {
  await $("#paginador-registro").show()
  await $("#pago-loading").hide()
  await $("#pago-datos").show();
  // top.location.href = '#top';
  scrollTop("#formCita");
  return true

}
async function mostrarLoading() {
  await $("#paginador-registro").hide()
  await $("#pago-loading").show()
  await $("#pago-datos").hide()
  // top.location.href = '#top';
  scrollTop("#formCita");
  return true
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