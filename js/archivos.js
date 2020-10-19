var cita = 0;
var paso = 0;

function saveAnalytics(event, category, label, value) {
  try {
    gtag('event', event, {
      'event_category': category,
      'event_label': label,
      'value': value
    });
  }
  catch (e) {
    console.log(e)
  }
}
$(document).ready(function () {
  saveAnalytics('entrarPagina','PonElPecho','Empezar cita');
  $(document).on("blur", ".cajas-texto .input-sd", function () {
    if ($(this).val() != "") {
      // console.log($(this).attr('id'));
      saveAnalytics('cambioDeCampo', 'PonElPecho', $(this).attr('name'));
      $(this).addClass("valido");
    } else {
      if($(this).attr('id')!="cita_fechaNacimiento")
        $(this).removeClass("valido");
    }
  });

  $("#infoCita").load('../modelos/componentes/infoCita.html', function () {
    if(citasGratis){
      $("#faq").load('../modelos/componentes/preguntas.html');
      $("#navegacionFree").removeClass('d-none');
      $("#navegacionCitas").addClass('d-none');
    }else {
      $("#navegacionFree").addClass('d-none');
      $("#navegacionCitas").removeClass('d-none');
    }
    });
  $("#formCita").load('../modelos/componentes/formCita.html', function () {
    saveAnalytics('entrarPagina', 'PonElPecho', 'Empezar cita');    
    $("#cita_regresar").hide();
    $(".overlay_loading").css("display", "flex")
    global.clinicas = getClinicas();
    global.estados = getEstados();
    paso = 1;
    setPaso();
    cambioPaso();
  });


});

function seguientePaso() {
  if (!citasGratis) {
    if (paso == 1) {
      saveAnalytics('formulario-cita', 'PonElPecho', '1-Escoge día y hora');
      var result = validacionesPaquetes();
      if (result) {
        history.pushState(null, null, 'datos-personales');
        $("#cita_regresar").show();
        saveValuesPaquetes()
        paso++;
        $("#navCita2").addClass('active');
        setPaso();
        cambioPaso();
      }
    }
    else if (paso == 2) {
      saveAnalytics('formulario-cita', 'PonElPecho', '2-Ingresa tus datos');
      saveValuesPaciente()
      var result = validacionesDatosPaciente();
      if (result) {
        history.pushState(null, null, 'verifica-paga');
        $("#cita_regresar").show();
        paso++;
        $("#navCita3").addClass('active');
        setPaso();
        cambioPaso();
      }
    }
    else if (paso == 3) {
      saveAnalytics('formulario-cita', 'PonElPecho', '3-Verifica y paga');

      // var result=validacionesDatosPago();
      // if(result){
      saveValuesPago();
      $("#cita_regresar").show();
      // }
    }
  }
  else{
    console.log('paso:'+paso)
    if (paso == 1) {
      // saveAnalytics('formulario-cita', 'PonElPecho', '1-Escoge día y hora');
      var result = validaCitaGratis();
      if (result) {
        history.pushState(null, null, 'datos-personales');
        $("#cita_regresar").show();
        saveDataCitaGratis()
        paso++;
        $("#navCita2").addClass('active');
        setPaso();
        cambioPaso();
      }
    }
    else if (paso == 2) {
      // saveAnalytics('formulario-cita', 'PonElPecho', '2-Ingresa tus datos');
      // var result = validaCitaGratis();
        history.pushState(null, null, 'registrar');
        $("#cita_regresar").show();
        $("#navCita3").addClass('active');
        paso++;
        setPaso();
        cambioPaso();
    }else if(paso==3){
      registrarCitaGratis();
    }
  }
}

function anteriorPaso() {
  if (paso > 1) {
    if (paso == 3) {
      history.pushState(null, null, 'datos-personales');
      $("#navCita3").removeClass('active');
    } else if (paso == 2) {
      history.pushState(null, null, '/pon-el-pecho/');
      $("#navCita2").removeClass('active');
    }
    paso--;
    setPaso();
    cambioPaso();
  } else {
    $("#cita_regresar").hide();
  }
}


function setPaso() {
  var text = '';
  if (!citasGratis)
    text = paso + " de 3";
  else
    text = paso + " de 2";
  $("#pag").text(text);
  $(".overlay_loading").css("display", "none")
}

function cambioPaso() {
  // top.location.href = '#top';
  if (!citasGratis) {
    if (paso == 1)
      scrollTop("#bannerPrincipal");
    else
      scrollTop("#formCita");
    if (paso == 1) {
      $("#citas").load('../modelos/componentes/citaPaquetes.html', function () {
        if (window.innerWidth > 500) {
          $("#info-paquetes").load('../modelos/componentes/pkt.html', function () {
          });
        }
        else {
          $("#info-paquetes").load('../modelos/componentes/pktMovil.html', function () {
          });
        }
        $("#resumen_cita").load('../modelos/componentes/resumenCita.html', function () {
          $.when(agregarLoadingInputs()).then(x => {
            modalInactividad = setInterval(showModalSesion, intervaloMilisegundosInactividad);
            $("#content-paquetes").hide();
            $("#cita_regresar").hide();
            startCita();
            loadValuesPaquetes();
            startResumen()
            setTimeout(function () { quitarLoadingInputs(); }, 1000);
          });

        });
      });
    }
    else if (paso == 2) {
      $("#citas").load('../modelos/componentes/citaPaciente.html', function () {
        loadValuesPacientes();
      });
    } else if (paso == 3) {
      saveValuesPaciente();
      $("#citas").load('../modelos/componentes/pago.html', function () {
        $("#resumen_cita").load('../modelos/componentes/resumenCita.html', function () {
          startPago();
        });
      });
    }
  }
  else {
    // top.location.href = '#top';
    if (paso == 1)
      scrollTop("#bannerPrincipal");
    else
      scrollTop("#formCita");
    if (paso == 1) {
      $("#citas").load('../modelos/componentes/citaGratis.html', function () {
        $.when(agregarLoadingInputs()).then(x => {
          modalInactividad = setInterval(showModalSesion, intervaloMilisegundosInactividad);
          $("#cita_regresar").hide();
          startCitaGratis();
          loadValuesCitaGratis();
          setTimeout(function () { quitarLoadingInputs(); }, 1000);
        });
      });
    }
    else if (paso == 2) {
      $("#citas").load('../modelos/componentes/citaConfirmacion.html', function () {
        startConfirmacion();
      });
    } else if (paso == 3) {
      registrarCitaGratis();
    }

  }
}
function rutaAgregarPKT() {
  $.when(agregarLoadingInputs()).then(x => {
    $("#sumarEstudios").load('../modelos/componentes/agregarEstudio1.html', function () {
      startAddPkt()
      setTimeout(function () { quitarLoadingInputs(); }, 1000);
    });
  });
}

function cerrarAgregarPKTFinish() {
  $("#sumarEstudios").load('../modelos/componentes/agregarEstudio0.html', function () {
    $('#lentes-agregar').show();
    $('#paquete-agregar').hide();
  });
  $("#sumarEstudios").removeClass("sumarPKT");
}
function cerrarAgregarPKT() {
  $("#sumarEstudios").empty()
  $("#sumarEstudios").load('../modelos/componentes/agregarEstudioImg.html', function () {
    $('#lentes-agregar').hide();
    $('#paquete-agregar').show();
  });
  // $("#sumarEstudios").removeClass("sumarPKT");

}

function rutaPagarPKT() {
  $("#sumarEstudios").load('../modelos/componentes/agregarEstudio2.html', function () {
    $('#invalidCard').hide()
    $('#invalidDate').hide()
    $('#invalidCCV').hide()
    $("#invalidName").hide()
    $(":input").inputmask();
  });
}
function rutaPagoCompletado() {
  $("#sumarEstudios").load('../modelos/componentes/agregarEstudio3.html', function () {
    loadAgregarPagados();
    refreshDataPerfil()
  });
}
$(".preguntas-titulo").on("click", function () {
  // //console.log(this)
  $(this).find("i").toggleClass("icono-right-open");
  $(this).find("i").toggleClass("icono-down-open");
})





