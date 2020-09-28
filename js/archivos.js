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
      paso++;
      setPaso();
      cambioPaso();
    }
  }
  else if(paso==3){
    saveValuesPago();
  } 
}

function anteriorPaso() {
  if(paso>1){
    paso--;
    setPaso();
    cambioPaso();
  }  
}


function setPaso() {
  var text = paso + " de 3";
  $("#pag").text(text);
}

function cambioPaso(){
  if(paso == 1) {
    $("#citas").load('./modelos/componentes/citaPaquetes.html',function(){
      $("#resumen_cita").load('./modelos/componentes/resumenCita.html',function(){
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
