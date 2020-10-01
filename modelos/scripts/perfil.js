var mastografia=null;
var densitometria=null;
var papanicolao=null;
var dataUser=null;
var datosAgregar={};
var date = moment.utc().format();
var minDate = moment.utc(date).local().format("YYYY-MM-DD");

var reag_masto=`<div id="reagendarMasto-name"><b>MASTOGRAFIA</b></div>
<div class="d-flex row">
<div class="combobox">
<div class="cajas-texto">
    <input type="text" class="input-sd valido" id="reagendarMasto-fecha" data-parsley-required="true">
    <span class="floating-label">Fecha de tu cita</span>
</div>
</div>
<div class="combobox">
<div class="cajas-texto">
    <select id="reagendarMasto-Hora" class="input-sd valido" data-parsley-required="true" data-parsley-min = "1">
    <option hidden selected>Horarios disponibles</option>
    </select>
    <span class="floating-label">Hora de tu cita</span>
</div>
</div>
</div>`;

var reag_papa=`<div id="reagendarPapa-name"><b>PAPANICOLAOU</b></div> 
 <div class="d-flex row">
<div class="combobox">
<div class="cajas-texto">
    <input type="text" class="input-sd valido" id="reagendarPapa-fecha" data-parsley-required="true" >
    <span class="floating-label">Fecha de tu cita</span>
</div>
</div>
<div class="combobox">
<div class="cajas-texto">
    <select id="reagendarPapa-Hora" class="input-sd valido" data-parsley-required="true" data-parsley-min = "1">
    <option hidden selected>Horarios disponibles</option>
    </select>
    <span class="floating-label">Hora de tu cita</span>
</div>
</div>
</div>`;

var reag_densi=`<div id="reagendarDensi-name"><b>DENSITOMETRIA</b></div> 
 <div class="d-flex row">
<div class="combobox">
<div class="cajas-texto">
    <input type="text" class="input-sd valido" id="reagendarDensi-fecha" data-parsley-required="true">
    <span class="floating-label">Fecha de tu cita</span>
</div>
</div>
<div class="combobox">
<div class="cajas-texto">
    <select id="reagendarDensi-Hora" class="input-sd valido" data-parsley-required="true" data-parsley-min = "1">
    <option hidden selected>Horarios disponibles</option>
    </select>
    <span class="floating-label">Hora de tu cita</span>
</div>
</div>
</div>`;

function folio_cancelada(){
    $('#folios_papa').hide();
    $('#folios_masto').hide();
    $('#folios_densi').hide();
    $('#acciones').hide();    
    $('#cita_cancelada').text("CANCELADA");
}
function startPerfil(){
    console.log('startPerfil');
    dataUser=JSON.parse(sessionStorage.getItem('dataUser'));
    console.log(dataUser);
    if(!dataUser){
        redirectLogin();
        return
    }else if(dataUser.length==0)
    {
        redirectLogin();
        return
    }
    refreshDataPerfil();
    

    $('#lentes-agregar').hide();
    $('#sumarEstudios').hide();

    $('#folios_masto').show();
    $('#folios_papa').show();
    $('#folios_densi').show();
    
    mastografia=getEstudio(3,dataUser.datosCita.clinica.IdSucursal);
    densitometria=getEstudio(1,dataUser.datosCita.clinica.IdSucursal);
    papanicolao=getEstudio(4,dataUser.datosCita.clinica.IdSucursal);


    $('#perfil-nombre').text(dataUser.datosPaciente.Nombre +" "+dataUser.datosPaciente.Paterno+" "+dataUser.datosPaciente.Materno);
    $('#perfil-correo').text(dataUser.datosPaciente.CorreoElectronico);
    $('#perfil-sexo').text(dataUser.datosPaciente.IdSexo == 1 ? "Mujer" : "Hombre");
    $('#perfil-fechaN').text(dataUser.datosPaciente.FechaNacimiento);
    $('#perfil-celular').text(dataUser.datosPaciente.Telefono);
    $('#perfil-paciente').text(dataUser.datosPaciente.Nombre +" "+dataUser.datosPaciente.Paterno+" "+dataUser.datosPaciente.Materno);

    $('#perfil-clincaReagendar').text(dataUser.datosCita.clinica.Direccion);

    console.log('LENGTH PERFIL',dataUser.datosCita.estudios.length)
    if(dataUser.datosCita.estudios.length==1){
        $('#reagendar-titulo').text("¿Cuándo deseas realizar tu Mastografía?");

        $('#folios_papa').hide();
        $('#folios_densi').hide();
        if(dataUser.datosCita.estatus){
            $('#lentes-agregar').hide();
            $('#sumarEstudios').show();

            $('#reagendarMasto-name').text(dataUser.datosCita.estudios[0].nombre);
            $('#folio_nombre_masto').text(dataUser.datosCita.estudios[0].nombre);
            $('#folio_masto').text(dataUser.datosCita.estudios[0].idCita);
            $('#perfil-fechaCita-masto').text(dataUser.datosCita.estudios[0].fecha+" "+dataUser.datosCita.estudios[0].hora);
        }else{
            $('#lentes-agregar').show();
            $('#sumarEstudios').hide();
            folio_cancelada()
        }
        $("#reagendar-inputs").empty();
        $("#reagendar-inputs").append(
            reag_masto
        );
        $("#reagendarMasto-fecha").datepicker({
            minDate: 0,
            dateFormat: 'dd-mm-yy',
            onSelect: function (a) {
                var body={ListaHorarios:[{IdEstudio:3,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:mastografia.data[0].Id}]}
                getHorariosDisponibles(body,'#reagendarMasto-Hora');
    
                $("#reagendarMasto-fecha").addClass("valido");
                $("#reagendarMasto-fecha").addClass("lleno")
            },
        });

        // $('#reagendarMasto-fecha').attr('min' , minDate);

        // $("#reagendarMasto-fecha").change(function(){
        //     var body={ListaHorarios:[{IdEstudio:3,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:mastografia.data[0].Id}]}
        //     getHorariosDisponibles(body,'#reagendarMasto-Hora');
        // });





    }else if(dataUser.datosCita.estudios.length==2){
        $('#folios_densi').hide();
        $('#lentes-agregar').show();
        $('#sumarEstudios').hide();
        if(dataUser.datosCita.estatus){
            $('#reagendarMasto-name').text(dataUser.datosCita.estudios[0].nombre);
            $('#folio_nombre_masto').text(dataUser.datosCita.estudios[0].nombre);
            $('#folio_masto').text(dataUser.datosCita.estudios[0].idCita);
            $('#perfil-fechaCita-masto').text(dataUser.datosCita.estudios[0].fecha+" "+dataUser.datosCita.estudios[0].hora);

            $('#reagendarPapa-name').text(dataUser.datosCita.estudios[1].nombre);
            $('#folio_nombre_papa').text(dataUser.datosCita.estudios[1].nombre);
            $('#folio_papa').text(dataUser.datosCita.estudios[1].idCita);
            $('#perfil-fechaCita-papa').text(dataUser.datosCita.estudios[1].fecha+" "+dataUser.datosCita.estudios[1].hora);
        }
        else{
            folio_cancelada()
        }

        $('#reagendar-titulo').text("¿Cuándo deseas realizar tus estudios?");

        $("#reagendar-inputs").empty();
        $("#reagendar-inputs").append(reag_masto);

        $("#reagendarMasto-fecha").datepicker({
            minDate: 0,
            dateFormat: 'dd-mm-yy',
            onSelect: function (a) {
                var body={ListaHorarios:[{IdEstudio:3,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:mastografia.data[0].Id}]}
                getHorariosDisponibles(body,'#reagendarMasto-Hora');
    
                $("#reagendarMasto-fecha").addClass("valido");
                $("#reagendarMasto-fecha").addClass("lleno")
            },
        });
        // $('#reagendarMasto-fecha').attr('min' , minDate);
        // $("#reagendarMasto-fecha").change(function(){
        //     var body={ListaHorarios:[{IdEstudio:3,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:mastografia.data[0].Id}]}
        //     getHorariosDisponibles(body,'#reagendarMasto-Hora');
        // });


        $("#reagendar-inputs").append(reag_papa);
        $('#reagendarPapa-fecha').datepicker({
            minDate: 0,
            dateFormat: 'dd-mm-yy',
            onSelect: function (a) {
                var body={ListaHorarios:[{IdEstudio:4,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:papanicolao.data[0].Id}]}
                getHorariosDisponibles(body,'#reagendarPapa-Hora');
                $("#reagendarPapa-fecha").addClass("valido");
                $("#reagendarPapa-fecha").addClass("lleno")
            },
        })
        // $('#reagendarPapa-fecha').attr('min' , minDate);
        // $("#reagendarPapa-fecha").change(function(){
        //     var body={ListaHorarios:[{IdEstudio:4,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:papanicolao.data[0].Id}]}
        //     getHorariosDisponibles(body,'#reagendarPapa-Hora');
        // });

    }else if(dataUser.datosCita.estudios.length==3){
        $('#lentes-agregar').show();
        $('#paquete-agregar').hide();

        if(dataUser.datosCita.estatus){
            $('#reagendarMasto-name').text(dataUser.datosCita.estudios[0].nombre);
            $('#folio_nombre_masto').text(dataUser.datosCita.estudios[0].nombre);
            $('#folio_masto').text(dataUser.datosCita.estudios[0].idCita);
            $('#perfil-fechaCita-masto').text(dataUser.datosCita.estudios[0].fecha+" "+dataUser.datosCita.estudios[0].hora);

            $('#reagendarPapa-name').text(dataUser.datosCita.estudios[1].nombre);
            $('#folio_nombre_papa').text(dataUser.datosCita.estudios[1].nombre);
            $('#folio_papa').text(dataUser.datosCita.estudios[1].idCita);
            $('#perfil-fechaCita-papa').text(dataUser.datosCita.estudios[1].fecha+" "+dataUser.datosCita.estudios[1].hora);

            $('#reagendarDensi-name').text(dataUser.datosCita.estudios[2].nombre);
            $('#folio_nombre_densi').text(dataUser.datosCita.estudios[2].nombre);
            $('#folio_densi').text(dataUser.datosCita.estudios[2].idCita);
            $('#perfil-fechaCita-densi').text(dataUser.datosCita.estudios[2].fecha+" "+dataUser.datosCita.estudios[2].hora);
        }else{
            folio_cancelada()
        }
        $('#reagendar-titulo').text("¿Cuándo deseas realizar tus estudios?");

        $("#reagendar-inputs").empty();
        $("#reagendar-inputs").append(reag_masto);
        $("#reagendarMasto-fecha").datepicker({
            minDate: 0,
            dateFormat: 'dd-mm-yy',
            onSelect: function (a) {
                var body={ListaHorarios:[{IdEstudio:3,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:mastografia.data[0].Id}]}
                getHorariosDisponibles(body,'#reagendarMasto-Hora');
    
                $("#reagendarMasto-fecha").addClass("valido");
                $("#reagendarMasto-fecha").addClass("lleno")
            },
        });
        // $('#reagendarMasto-fecha').attr('min' , minDate);
        // $("#reagendarMasto-fecha").change(function(){
        //     var body={ListaHorarios:[{IdEstudio:3,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:mastografia.data[0].Id}]}
        //     getHorariosDisponibles(body,'#reagendarMasto-Hora');
        // });


        $("#reagendar-inputs").append(reag_papa);
        $('#reagendarPapa-fecha').datepicker({
            minDate: 0,
            dateFormat: 'dd-mm-yy',
            onSelect: function (a) {
                var body={ListaHorarios:[{IdEstudio:4,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:papanicolao.data[0].Id}]}
                getHorariosDisponibles(body,'#reagendarPapa-Hora');
                $("#reagendarPapa-fecha").addClass("valido");
                $("#reagendarPapa-fecha").addClass("lleno")
            },
        })
        // $('#reagendarPapa-fecha').attr('min' , minDate);
        // $("#reagendarPapa-fecha").change(function(){
        //     var body={ListaHorarios:[{IdEstudio:4,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:papanicolao.data[0].Id}]}
        //     getHorariosDisponibles(body,'#reagendarPapa-Hora');
        // });

        $("#reagendar-inputs").append(reag_densi);
        $('#reagendarDensi-fecha').datepicker({
            minDate: 0,
            dateFormat: 'dd-mm-yy',
            onSelect: function (a) {
                var body={ListaHorarios:[{IdEstudio:1,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:densitometria.data[0].Id}]}
                getHorariosDisponibles(body,'#reagendarDensi-Hora');
                $("#reagendarDensi-fecha").addClass("valido");
                $("#reagendarDensi-fecha").addClass("lleno")
            },
        })
        // $('#reagendarDensi-fecha').attr('min' , minDate);
        // $("#reagendarDensi-fecha").change(function(){
        //     var body={ListaHorarios:[{IdEstudio:1,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:densitometria.data[0].Id}]}
        //     getHorariosDisponibles(body,'#reagendarDensi-Hora');
        // });

    }

    $('#perfil-clinica').text(dataUser.datosCita.clinica.Nombre);
    $('#perfil-dirClinica').text(dataUser.datosCita.clinica.Direccion);


    $('#perfil-telClinica').text(dataUser.datosCita.clinica.Telefonos);

    $('#perfil-HorarioAtencion').text(dataUser.datosCita.clinica.HorarioAtencion);

    $("#cancelarAceptar").hide();

    // $("#perfil-prep").empty();
    // $("#perfil-prep").append(`<b class="text-18">Preparación:</b><br><br>`)
    // $.each( dataUser.datosCita.estudios, function( key, value ) {
    //     var item=`<p class="text-16"><b>`+value.descripcion+`:</b> `+value.preparacion+`</p>`
    //     $("#perfil-prep").append(item)
    //   });

    showPreparaciones(dataUser);
}
function showPreparaciones(dataUser){
    if(dataUser.datosCita.estudios.length==1)
    {
        $("#preparacionPapa").addClass("d-none");
        $("#preparacionDensi").addClass("d-none");
    }else if(dataUser.datosCita.estudios.length==2)
    {
        $("#preparacionPapa").removeClass("d-none");
        $("#preparacionDensi").addClass("d-none");
    }else if(dataUser.datosCita.estudios.length==3)
    {
        $("#preparacionPapa").removeClass("d-none");
        $("#preparacionDensi").removeClass("d-none");
    }
}
function cancelarCita(){
    $(this).scrollTop(300);
    $("#tuFolio").addClass("d-none");
    $("#cancelarCita").removeClass("d-none");


}
function cerrarCancelar(){
    $("#tuFolio").removeClass("d-none");
    $("#cancelarCita").addClass("d-none");
    $("#cancelarAceptar").hide();
}
function reagendarCita(){
    $("#tuFolio").addClass("d-none");
    $("#reagendarCita").removeClass("d-none");
}

function validaDatosReagendar(){
        $('#form-reagendar').parsley().validate();
        if ($('#form-reagendar').parsley().isValid()) {
          return true
        } else {
            console.log('not valid registro');
            return false
        }
    // if($("#reagendarMasto-fecha").val()=="" && $("#reagendarMasto-Hora").val()==""){
    //     console.log('fecha y hora masto es requerida')
    //     return false;
    // }
    // else if($("#reagendarPapa-fecha").val()=="" && $("#reagendarPapa-Hora").val()==""){
    //     console.log('fecha y hora papa es requerida')
    //     return false;
    // }
    // else if($("#reagendarDensi-fecha").val()=="" && $("#reagendarDensi-Hora").val()==null){
    //     console.log('fecha y hora desi es requerida')
    //     return false;
    // }
    // return true;
}
function reagendar(){
    var validacion = validaDatosReagendar()
    console.log(validacion)
    if(!validacion){
        return;
    }
    var body={}
    if(dataUser.datosCita.estudios.length==1){
    body={
        idCita:dataUser.datosCita.idCita,
        Estudios : [
            {
                IdCitaSisPrev: dataUser.datosCita.estudios[0].idCitaSisPrev,
                Fecha: moment($("#reagendarMasto-fecha").val()).format('YYYY-MM-DD'),
                HorarioText: $(':selected', '#reagendarMasto-Hora').attr("data-hora"),
                IdHorario: parseInt($("#reagendarMasto-Hora").val())
            }
        ]
        }
    }
    else if(dataUser.datosCita.estudios.length==2){
        body={
            idCita:dataUser.datosCita.idCita,
            Estudios: [
                {
                    IdCitaSisPrev: dataUser.datosCita.estudios[0].idCitaSisPrev,
                    Fecha: moment($("#reagendarMasto-fecha").val()).format('YYYY-MM-DD'),
                    HorarioText: $(':selected', '#reagendarMasto-Hora').attr("data-hora"),
                    IdHorario: parseInt($("#reagendarMasto-Hora").val())
                },
                {
                    IdCitaSisPrev: dataUser.datosCita.estudios[1].idCitaSisPrev,
                    Fecha:moment($("#reagendarPapa-fecha").val()).format('YYYY-MM-DD'), 
                    HorarioText: $(':selected', '#reagendarPapa-Hora').attr("data-hora"),
                    IdHorario: parseInt($("#reagendarPapa-Hora").val())
                }
            ]
        }
    }
    else{
        body={
            idCita:dataUser.datosCita.idCita,
            Estudios: [
                {
                    IdCitaSisPrev: dataUser.datosCita.estudios[0].idCitaSisPrev,
                    Fecha: $("#reagendarMasto-fecha").val(),
                    HorarioText: $(':selected', '#reagendarMasto-Hora').attr("data-hora"),
                    IdHorario: parseInt($("#reagendarMasto-Hora").val())
                },
                {
                    IdCitaSisPrev: dataUser.datosCita.estudios[1].idCitaSisPrev,
                    Fecha: $("#reagendarPapa-fecha").val(),
                    HorarioText: $(':selected', '#reagendarPapa-Hora').attr("data-hora"),
                    IdHorario: parseInt($("#reagendarPapa-Hora").val())
                },
                {
                    IdCitaSisPrev: dataUser.datosCita.estudios[2].idCitaSisPrev,
                    Fecha: $("#reagendarDensi-fecha").val(),
                    HorarioText: $(':selected', '#reagendarDensi-Hora').attr("data-hora"),
                    IdHorario: parseInt($("#reagendarDensi-Hora").val())
                }
            ]
        }
    }
    console.log(body);
    console.log(JSON.stringify(body));
    var result=ReagendarCita(body);
    console.log(result);

    // sessionStorage.clear();
    // sessionStorage.setItem('dataUser', JSON.stringify(result))
    // dataUser=JSON.parse(sessionStorage.getItem('dataUser'));
    // startPerfil();
    if(result!=null){
        $("#reagendarFechas").addClass("d-none");
        $("#reagendarFechas").removeClass("d-flex");
        $("#reagendarAceptar").removeClass("d-none");
    }
}

function cerrarReagendar(){
    $("#tuFolio").removeClass("d-none");
    $("#reagendarCita").addClass("d-none");
    $("#reagendarAceptar").addClass("d-none");
    irPerfil();
}


function agregarPKT(){
    rutaAgregarPKT();
    $("#sumarEstudios").addClass("sumarPKT");

}
function startAddPkt(){
    var date = moment.utc().format();
    var minDate = moment.utc(date).local().format("YYYY-MM-DD");
    $('#agregar-papa-fecha').attr('min' , minDate);
    $('#agregar-densi-fecha').attr('min' , minDate);

    $("#agregar-papa-fecha").change(function(){
        var body={ListaHorarios:[{IdEstudio:4,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:papanicolao.data[0].Id}]}
        getHorariosDisponibles(body,'#agregar-papa-hora');
    });
    $("#agregar-densi-fecha").change(function(){
        var body={ListaHorarios:[{IdEstudio:1,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:densitometria.data[0].Id}]}
        getHorariosDisponibles(body,'#agregar-densi-hora');
    });
}
function agregarPKT2(){
    saveHorarios();
    var valida=validacionesHorarios()
    console.log(dataAgregar);
    if(valida){
        rutaPagarPKT();
    }
}
function pagarPKT(){
    validaAgregarPago()
    Conekta.setPublicKey(conektaKey);
    if(!validateConekta()){
        console.log('errorValidacionesConekta')
        return;
      }
    saveAndPay()
    
}

function Cancelar(){
    body={
        idCita:dataUser.datosCita.idCita
    }
    var res=cancelarCitaService(body)
    console.log('repuestaCancelar:',res)
    sessionStorage.clear()
    sessionStorage.setItem('dataUser', JSON.stringify(res.perfil))
    dataUser=JSON.parse(sessionStorage.getItem('dataUser'));
    cerrarCancelar();
    startPerfil();
}

function getHorariosDisponibles(body,selector){
    var horarios=getHorarios(body)
    var optionsAsString="";
    console.log('RespuestaHorarios: '+horarios)
    if(horarios.length==0){
        optionsAsString = "<option hidden selected>Horarios agotados</option>";   
        $(selector).prop('disabled',true) 
    }else{
        optionsAsString = "<option hidden selected>Selecciona una opción</option>";
        $(selector).prop('disabled',false) 
    }
    for(var i = 0; i < horarios.length; i++) {
        optionsAsString += "<option value='" + horarios[i].Id + "' data-hora='"+horarios[i].Hora+"'>" + horarios[i].Hora + "</option>";
    }
    $(selector).empty().append(optionsAsString);
}


function saveHorarios(){
    dataAgregar=
    {
        idCita:dataUser.datosCita.idCita,
        TipoPago: 3,
        Estudios: [
            {
                Fecha: $("#agregar-papa-fecha").val(),
                Hora: $(':selected', '#agregar-papa-hora').attr("data-hora"),
                IdHora: parseInt($("#agregar-papa-hora").val()),
                Id: parseInt(papanicolao.data[0].Id),
                IdEstudio: 4
            },
            {
                Fecha: $("#agregar-densi-fecha").val(),
                Hora: $(':selected', '#agregar-densi-hora').attr("data-hora"),
                IdHora: parseInt($("#agregar-densi-hora").val()),
                Id: parseInt(papanicolao.data[0].Id),
                IdEstudio: 1
            }
        ],
        DatosPago: {
        }
    }
}
function saveAndPay(){
    console.log(dataAgregar);
      $("#error-msg").text("");

        var tokenParams = {
          card: {
            number: $('#numCard').val(),
            name: $('#nameCard').val(),
            exp_year: $('#aaaa').val(),
            exp_month: $('#mm').val(),
            cvc: $('#ccv').val(),
          }
        };
        dataAgregar.DatosPago.Nombre=$('#nameCard').val();
        Conekta.Token.create(tokenParams, successResponseHandler, errorResponseHandler);
}

var tarjeta=false;
var expirationDate=false;
var validateCCV=false;

function validateConekta(){
  tarjeta=Conekta.card.validateNumber($('#numCard').val());
  expirationDate=Conekta.card.validateExpirationDate( $('#mm').val(), $('#aaaa').val());
  validateCCV=Conekta.card.validateCVC($('#ccv').val());
  console.log(tarjeta,expirationDate,validateCCV)
  if(!tarjeta)
    $('#invalidCard').show()
  else if(!expirationDate)
    $('#invalidDate').show()
  else if(!validateCCV)
    $('#invalidCCV').show()
  else{
    $('#invalidCard').hide()
    $('#invalidDate').hide()
    $('#invalidCCV').hide()
    return true
  }
  return false
}

var successResponseHandler = function(token) {
    console.log(token)
    agregarEstudiosCita(token.id);
  };



var errorResponseHandler = function(error) {
  $("#error-msg").text(error.message_to_purchaser);
  // setTimeout(function() { quitarLoading(); }, 1500);
  console.log(error,'error')
};

function quitarLoading(){
    $("#pago-loading").hide()
    $("#pago-datos").show();
 }
  function mostrarLoading(){
    $("#pago-loading").show()
    $("#pago-datos").hide()
 }

 function sonLetras(texto){
   var regex = /^[a-zA-Z ]+$/;
   return regex.test(texto);
 }
 function changeName(value){
   if(!sonLetras(value))
     $("#invalidName").show()
   else
     $("#invalidName").hide()
 }

 function changeCard(value){
     $("#invalidCard").hide()
 }


 function changeDate(value){
   $("#invalidDate").hide()
 }

 function changeCCV(value){
   $("#invalidCCV").hide()
 }

 function agregarEstudiosCita(token){
    dataAgregar.DatosPago.Correo=dataUser.datosPaciente.CorreoElectronico;
    dataAgregar.DatosPago.Precio=250.00;
    dataAgregar.DatosPago.Referencia="";
    dataAgregar.DatosPago.Telefono=dataUser.datosPaciente.Telefono;
    dataAgregar.DatosPago.Token=token;
    dataAgregar.DatosPago.conektaTokenId="";
    // console.log(dataAgregar);

    var res=agregarEstudiosService(dataAgregar);
    console.log('respuestaAgregar',res);
    sessionStorage.clear()
    sessionStorage.setItem('dataUser', JSON.stringify(res))
    dataUser=JSON.parse(sessionStorage.getItem('dataUser'));
    rutaPagoCompletado();
    startPerfil()
    // setTimeout(function() { startPerfil(); }, 1000);
 }

 function validacionesHorarios(){
    $('#form-pago-perfil').parsley().validate();
    if ($('#form-pago-perfil').parsley().isValid()) {
      return true
    } else {
        console.log('not valid registro');
        return false
    }
 }
 function validaAgregarPago(){
    $('#form-pago-perfilP2').parsley().validate();
    if ($('#form-pago-perfilP2').parsley().isValid()) {
      return true
    } else {
        console.log('not valid registro');
        return false
    }
 }

 function loadAgregarPagados(){
    $('#folio_papa_pagada').text(dataUser.datosCita.estudios[1].idCita)
    $('#fecha_papa_pagada').text(dataUser.datosCita.estudios[1].fecha+" "+dataUser.datosCita.estudios[1].hora)

    $('#folio_densi_pagada').text(dataUser.datosCita.estudios[2].idCita)
    $('#fecha_densi_pagada').text(dataUser.datosCita.estudios[2].fecha+" "+dataUser.datosCita.estudios[2].hora)
 }

 function refreshDataPerfil(){
    body={correoElectronico:dataUser.datosPaciente.CorreoElectronico}
    console.log(body)
    dataUser=getPerfil(body)
    sessionStorage.clear();
    sessionStorage.setItem('dataUser', JSON.stringify(dataUser))
}
function irLentes(){
    top.location.href = 'https://lentes.salud-digna.org';
}

function startDatesPickerPerfil(){
    $("#reagendarMasto-fecha").datepicker({
        minDate: 0,
        dateFormat: 'dd-mm-yy',
        onSelect: function (a) {
            var body={ListaHorarios:[{IdEstudio:3,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:mastografia.data[0].Id}]}
            getHorariosDisponibles(body,'#reagendarMasto-Hora');

            $("#reagendarMasto-fecha").addClass("valido");
            $("#reagendarMasto-fecha").addClass("lleno")
        },
    });
    // $("#fechaCita").prop('disabled', true);
    // $( "#fechaCita" ).datepicker( "option", "disabled", true );
    $('#reagendarPapa-fecha').datepicker({
        minDate: 0,
        dateFormat: 'dd-mm-yy',
        onSelect: function (a) {
            var body={ListaHorarios:[{IdEstudio:4,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:papanicolao.data[0].Id}]}
            getHorariosDisponibles(body,'#reagendarPapa-Hora');
            $("#reagendarPapa-fecha").addClass("valido");
            $("#reagendarPapa-fecha").addClass("lleno")
        },
    })
    $('#reagendarDensi-fecha').datepicker({
        minDate: 0,
        dateFormat: 'dd-mm-yy',
        onSelect: function (a) {
            var body={ListaHorarios:[{IdEstudio:1,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:densitometria.data[0].Id}]}
            getHorariosDisponibles(body,'#reagendarDensi-Hora');
            $("#reagendarDensi-fecha").addClass("valido");
            $("#reagendarDensi-fecha").addClass("lleno")
        },
    })
}
function descargarTicket() {
    $("#acciones").hide();
    $(".cerrarSesion").hide()
    let folio = document.getElementById("miPerfil")
    let ventana = window.open('', 'PRINT', 'height=400,width=600')
    //ventana.document.write('<html><head><title>' + document.title + '</title>')
    ventana.document.write('<link rel="stylesheet" href="./modelos/css/estilos.css">')
    ventana.document.write('</head><body >')
    ventana.document.write(folio.innerHTML)
    ventana.document.write('</body></html>')
    ventana.document.close()
    ventana.focus()
    setTimeout(() => {
        ventana.print()
    }, 2000)
    this.dialog = false

    $("#acciones").show();
    $(".cerrarSesion").show()

}