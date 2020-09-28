Conekta.setPublicKey(conektaKey);

function llenarTabla(){
  $("#tuplas").empty();
  if(global.data.cita.Estudios.length==1){
    var estudio = $("<td width='33%'> -" +  global.data.cita.Estudios[0].Nombre + "</td>)");
    var fecha = $("<td width='33%' align='center'>" + global.data.cita.Estudios[0].Fecha + " " +global.data.cita.Estudios[0].Hora+ "</td>)");
    var precio = $("<td width='33%' align='right'> $ 150.00 </td>)");
    $("#tuplas").append("<tr>");
    $("#tuplas").append(estudio);
    $("#tuplas").append(fecha);
    $("#tuplas").append(precio);
    $("#tuplas").append("</tr>");  
    $('#totalP').text("$ 150.00");  

  }
  else if (global.data.cita.Estudios.length==2){
    $.each(global.data.cita.Estudios, function(index, value) {              
      var estudio = $("<td width='33%'> -" +  value.Nombre + "</td>)");
      var fecha = $("<td width='33%' align='center'>" + value.Fecha + " " + value.Hora+ "</td>)");
      var precio = $("<td width='33%' align='right'> $ 150.00 </td>)");
      $("#tuplas").append("<tr>");
      $("#tuplas").append(estudio);
      $("#tuplas").append(fecha);
      $("#tuplas").append(precio);
      $("#tuplas").append("</tr>");
    })  
    $('#totalP').text("$ 300.00"); 
  }
  else if(global.data.cita.Estudios.length==3){
    $("#tuplas").append("<tr>");
    $("#tuplas").append("<td> Paquete Mujer: </td>)");
    $("#tuplas").append("<td></td>");
    $("#tuplas").append($("<td width='33%' align='right'> $ 380.00 </td>)"));
    $("#tuplas").append("</tr>");

    $.each(global.data.cita.Estudios, function(index, value) {              
          var estudio = $("<td width='33%'> -" +  value.Nombre + "</td>)");
          var fecha = $("<td width='33%' align='center'>" + value.Fecha + " " + value.Hora + "</td>)");
          $("#tuplas").append("<tr>");
          $("#tuplas").append(estudio);
          $("#tuplas").append(fecha);
          $("#tuplas").append("<td></td>");
          $("#tuplas").append("</tr>"); 
    })
    $('#totalP').text("$ 380.00");  
  }
}
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
  llenarTabla();
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
  if(tipoPago==3){
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

var tipoPago=3;
function tipoPago(tipo){
  if(tipo==2){
    tipoPago=3;
    $("#pagoLinea").removeClass("active");
    $("#pagoClinica").addClass("active");
    $("#datosPagar").addClass("d-none");
  }else{
    tipoPago=2;
    $("#pagoLinea").addClass("active");
    $("#pagoClinica").removeClass("active");
    $("#datosPagar").removeClass("d-none");
  }
};

function registrarCita(){
  global.data.cita.EstatusLaboratorio=false;
  global.data.cita.CondicionFolios=1000;
  global.data.cita.TipoPago=tipoPago;

  if(tipoPago==3){
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