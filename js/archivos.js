var cita = 0;
var paso = 0;

$(document).ready(function () {
  $(document).on("blur", ".cajas-texto .input-sd", function () {
    if ($(this).val() != "") {
      $(this).addClass("valido");
    } else {
      $(this).removeClass("valido");
    }
  });
  
  $("#infoCita").load('./modelos/componentes/infoCita.html', function () {});
  $("#formCita").load('./modelos/componentes/formCita.html', function () {
    $("#cita_regresar").hide();
    global.clinicas=getClinicas();
    global.estados=getEstados();
    paso = 1;
    setPaso();
    cambioPaso();
  });


});

function seguientePaso() {
  if(paso==1){
    var result=validacionesPaquetes();
    if (result){
      $("#cita_regresar").show();
      saveValuesPaquetes()
      paso++;
      setPaso();
      cambioPaso();
    }
  }
  else if(paso==2){
    saveValuesPaciente()
    var result=validacionesDatosPaciente();
    if (result){
      $("#cita_regresar").show();
      paso++;
      setPaso();
      cambioPaso();
    }
  }
  else if(paso==3){
    var result=validacionesDatosPago();
    if(result){
      saveValuesPago();
      $("#cita_regresar").show();
    }
  } 
}

function anteriorPaso() {
  if(paso>1){
    paso--;
    setPaso();
    cambioPaso();
  }else{
    $("#cita_regresar").hide();
  }
}


function setPaso() {
  var text = paso + " de 3";
  $("#pag").text(text);
}

function cambioPaso(){
  top.location.href = '#top';
  if(paso == 1) {
    $("#citas").load('./modelos/componentes/citaPaquetes.html',function(){
      $("#resumen_cita").load('./modelos/componentes/resumenCita.html',function(){
        $("#content-paquetes").hide();
        startCita();
        loadValuesPaquetes();
        startResumen()
    });
  });
  } 
  else if (paso == 2) {
    $("#citas").load('./modelos/componentes/citaPaciente.html',function(){
      loadValuesPacientes();
    });
  } else if (paso == 3) {
    saveValuesPaciente();
    $("#citas").load('./modelos/componentes/pago.html',function(){
      $("#resumen_cita").load('./modelos/componentes/resumenCita.html',function(){
      startPago();
    });
  });
  }
}
function rutaAgregarPKT(){
  $("#sumarEstudios").load('./modelos/componentes/agregarEstudio1.html', function () {});
}
function cerrarAgregarPKT(){
  $("#sumarEstudios").load('./modelos/componentes/agregarEstudio0.html');
  $("#sumarEstudios").removeClass("sumarPKT");
}
function rutaPagarPKT(){
  $("#sumarEstudios").load('./modelos/componentes/agregarEstudio2.html', function () {});
}
function rutaPagoCompletado(){
  $("#sumarEstudios").load('./modelos/componentes/agregarEstudio3.html', function () {});
}
// function cambioPaso_notSave(){
//   if(paso == 1) {
//     $("#citas").load('./modelos/componentes/citaPaquetes.html',function(){
//       startCita();
//       loadValuesPaquetes();
//     });
//   } 
//   else if (paso == 2) {
//     $("#citas").load('./modelos/componentes/citaPaciente.html',function(){
//       loadValuesPacientes();
//     });
//   } else if (paso == 3) {
//     $("#citas").load('./modelos/componentes/pago.html',function(){
//       startPago();
//     });
//   }
// }
