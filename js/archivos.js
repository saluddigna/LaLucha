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
     $(".overlay_loading").css("display", "flex")
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
      $("#navCita2").addClass('active');
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
      $("#navCita3").addClass('active');
      setPaso();
      cambioPaso();
    }
  }
  else if(paso==3){
    // var result=validacionesDatosPago();
    // if(result){
      saveValuesPago();
      $("#cita_regresar").show();
    // }
  } 
}

function anteriorPaso() {
  if(paso>1){
    if(paso==3){
      $("#navCita3").removeClass('active');
    }else if (paso==2){
      $("#navCita2").removeClass('active');
    }
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
  $(".overlay_loading").css("display", "none")
}

function cambioPaso(){
  // top.location.href = '#top';
  if(paso==1)
    scrollTop("#bannerPrincipal");
  else
    scrollTop("#formCita");
  if(paso == 1) {
    $("#citas").load('./modelos/componentes/citaPaquetes.html',function(){
      if(window.innerWidth>500){
        $("#info-paquetes").load('./modelos/componentes/pkt.html',function(){
        });
      }
      else{
        $("#info-paquetes").load('./modelos/componentes/pktMovil.html',function(){
        });
      }
      $("#resumen_cita").load('./modelos/componentes/resumenCita.html',function(){
        $.when( agregarLoadingInputs() ).then(x=>{    
          $("#content-paquetes").hide();
          $("#cita_regresar").hide();
          startCita();
          loadValuesPaquetes();
          startResumen()
          setTimeout(function() { quitarLoadingInputs(); }, 1000);
        });
        
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
  $.when( agregarLoadingInputs() ).then(x=>{    
  $("#sumarEstudios").load('./modelos/componentes/agregarEstudio1.html', function () {
    startAddPkt()
    setTimeout(function() { quitarLoadingInputs(); }, 1000);
  });
});
}

function cerrarAgregarPKTFinish(){
  $("#sumarEstudios").load('./modelos/componentes/agregarEstudio0.html',function(){
    $('#lentes-agregar').show();
    $('#paquete-agregar').hide();
  });
  $("#sumarEstudios").removeClass("sumarPKT");
}
function cerrarAgregarPKT(){
  $("#sumarEstudios").empty()
  $("#sumarEstudios").load('./modelos/componentes/agregarEstudioImg.html',function(){
    $('#lentes-agregar').hide();
    $('#paquete-agregar').show();
  });
  // $("#sumarEstudios").removeClass("sumarPKT");

}

function rutaPagarPKT(){
  $("#sumarEstudios").load('./modelos/componentes/agregarEstudio2.html', function () {
    $('#invalidCard').hide()
    $('#invalidDate').hide()
    $('#invalidCCV').hide()
    $("#invalidName").hide()
    $(":input").inputmask();
  });
}
function rutaPagoCompletado(){
    $("#sumarEstudios").load('./modelos/componentes/agregarEstudio3.html', function () {
    loadAgregarPagados();
    refreshDataPerfil()
  });
}
$(".preguntas-titulo").on("click", function(){
  // //console.log(this)
    $(this).find("i").toggleClass("icono-right-open");
    $(this).find("i").toggleClass("icono-down-open");
})







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
