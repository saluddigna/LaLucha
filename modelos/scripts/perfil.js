function startPerfil(){
    var dataUser=JSON.parse(sessionStorage.getItem('dataUser'));
    console.log(dataUser);
    if(!dataUser){
        redirectLogin();
        return
    }else if(dataUser.length==0)
    {
        redirectLogin();
        return
    }
    var mastografia=getEstudio(3,dataUser.datosCita.clinica.IdSucursal);
    var densitometria=getEstudio(1,dataUser.datosCita.clinica.IdSucursal);
    var papanicolao=getEstudio(4,dataUser.datosCita.clinica.IdSucursal);
    var date = moment.utc().format();
    var minDate = moment.utc(date).local().format("YYYY-MM-DD");

    var reag_masto=` <div class="d-flex row">
    <div class="combobox">
    <div class="cajas-texto">
        <input type="date" class="input-sd valido" id="reagendarMasto-fecha">
        <span class="floating-label">Fecha de tu cita</span>
    </div>
    </div>
    <div class="combobox">
    <div class="cajas-texto">
        <select id="reagendarMasto-Hora" class="input-sd valido" >
        <option hidden selected>Horarios disponibles</option>
        </select>
        <span class="floating-label">Hora de tu cita</span>
    </div>
    </div>
    </div>`;

    var reag_papa=` <div class="d-flex row">
    <div class="combobox">
    <div class="cajas-texto">
        <input type="date" class="input-sd valido" id="reagendarPapa-fecha">
        <span class="floating-label">Fecha de tu cita</span>
    </div>
    </div>
    <div class="combobox">
    <div class="cajas-texto">
        <select id="reagendarPapa-Hora" class="input-sd valido" >
        <option hidden selected>Horarios disponibles</option>
        </select>
        <span class="floating-label">Hora de tu cita</span>
    </div>
    </div>
    </div>`;

    var reag_densi=` <div class="d-flex row">
    <div class="combobox">
    <div class="cajas-texto">
        <input type="date" class="input-sd valido" id="reagendarDensi-fecha">
        <span class="floating-label">Fecha de tu cita</span>
    </div>
    </div>
    <div class="combobox">
    <div class="cajas-texto">
        <select id="reagendarDensi-Hora" class="input-sd valido" >
        <option hidden selected>Horarios disponibles</option>
        </select>
        <span class="floating-label">Hora de tu cita</span>
    </div>
    </div>
    </div>`;




    $('#perfil-nombre').text(dataUser.datosPaciente.Nombre +" "+dataUser.datosPaciente.Paterno+" "+dataUser.datosPaciente.Materno);  
    $('#perfil-correo').text(dataUser.datosPaciente.CorreoElectronico);  
    $('#perfil-sexo').text(dataUser.datosPaciente.IdSexo == 1 ? "Mujer" : "Hombre");  
    $('#perfil-fechaN').text(dataUser.datosPaciente.FechaNacimiento);  
    $('#perfil-celular').text(dataUser.datosPaciente.Telefono); 
    $('#perfil-paciente').text(dataUser.datosPaciente.Nombre +" "+dataUser.datosPaciente.Paterno+" "+dataUser.datosPaciente.Materno); 

    $('#perfil-clincaReagendar').text(dataUser.datosCita.clinica.Direccion);  


    
    if(dataUser.datosCita.estudios.length==1){
        $('#reagendar-titulo').text("¿Cuándo deseas realizar tu Mastografía?");  

        $('#folios_papa').hide();
        $('#folios_densi').hide();
        $('#folio_nombre_masto').text(dataUser.datosCita.estudios[0].nombre);  
        $('#folio_masto').text(dataUser.datosCita.estudios[0].folio); 
        $('#perfil-fechaCita-masto').text(dataUser.datosCita.estudios[0].fecha+" "+dataUser.datosCita.estudios[0].hora);

        $("#reagendar-inputs").empty();
        $("#reagendar-inputs").append(
            reag_masto
        );

        $('#reagendarMasto-fecha').attr('min' , minDate);
        
        $("#reagendarMasto-fecha").change(function(){
            var body={ListaHorarios:[{IdEstudio:3,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:mastografia.data[0].Id}]}        
            getHorariosDisponibles(body,'#reagendarMasto-Hora');
        });    



    
         
    }else if(dataUser.datosCita.estudios.length==2){
        $('#folios_densi').hide();
        $('#folio_nombre_masto').text(dataUser.datosCita.estudios[0].nombre);  
        $('#folio_masto').text(dataUser.datosCita.estudios[0].folio); 
        $('#perfil-fechaCita-masto').text(dataUser.datosCita.estudios[0].fecha+" "+dataUser.datosCita.estudios[0].hora); 

        $('#folio_nombre_papa').text(dataUser.datosCita.estudios[1].nombre);  
        $('#folio_papa').text(dataUser.datosCita.estudios[1].folio);
        $('#perfil-fechaCita-papa').text(dataUser.datosCita.estudios[1].fecha+" "+dataUser.datosCita.estudios[1].hora); 

        
        $('#reagendar-titulo').text("¿Cuándo deseas realizar tus estudios?");  

        $("#reagendar-inputs").empty();
        $("#reagendar-inputs").append(reag_masto);
        $('#reagendarMasto-fecha').attr('min' , minDate);
        $("#reagendarMasto-fecha").change(function(){
            var body={ListaHorarios:[{IdEstudio:3,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:mastografia.data[0].Id}]}        
            getHorariosDisponibles(body,'#reagendarMasto-Hora');
        });    


        $("#reagendar-inputs").append(reag_papa);
        $('#reagendarPapa-fecha').attr('min' , minDate);   
        $("#reagendarPapa-fecha").change(function(){
            var body={ListaHorarios:[{IdEstudio:4,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:papanicolao.data[0].Id}]}        
            getHorariosDisponibles(body,'#reagendarPapa-Hora');
        });    

    }else{

        $('#folio_nombre_masto').text(dataUser.datosCita.estudios[0].nombre);  
        $('#folio_masto').text(dataUser.datosCita.estudios[0].folio); 
        $('#perfil-fechaCita-masto').text(dataUser.datosCita.estudios[0].fecha+" "+dataUser.datosCita.estudios[0].hora); 

        $('#folio_nombre_papa').text(dataUser.datosCita.estudios[1].nombre);  
        $('#folio_papa').text(dataUser.datosCita.estudios[1].folio); 
        $('#perfil-fechaCita-papa').text(dataUser.datosCita.estudios[1].fecha+" "+dataUser.datosCita.estudios[1].hora); 

        $('#folio_nombre_densi').text(dataUser.datosCita.estudios[2].nombre);  
        $('#folio_densi').text(dataUser.datosCita.estudios[2].folio); 
        $('#perfil-fechaCita-densi').text(dataUser.datosCita.estudios[2].fecha+" "+dataUser.datosCita.estudios[2].hora); 

        $('#reagendar-titulo').text("¿Cuándo deseas realizar tus estudios?");  

        $("#reagendar-inputs").empty();
        $("#reagendar-inputs").append(reag_masto);
        $('#reagendarMasto-fecha').attr('min' , minDate);
        $("#reagendarMasto-fecha").change(function(){
            var body={ListaHorarios:[{IdEstudio:3,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:mastografia.data[0].Id}]}        
            getHorariosDisponibles(body,'#reagendarMasto-Hora');
        });    


        $("#reagendar-inputs").append(reag_papa);
        $('#reagendarPapa-fecha').attr('min' , minDate);   
        $("#reagendarPapa-fecha").change(function(){
            var body={ListaHorarios:[{IdEstudio:4,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:papanicolao.data[0].Id}]}        
            getHorariosDisponibles(body,'#reagendarPapa-Hora');
        }); 

        $("#reagendar-inputs").append(reag_densi);
        $('#reagendarDensi-fecha').attr('min' , minDate);   
        $("#reagendarDensi-fecha").change(function(){
            var body={ListaHorarios:[{IdEstudio:1,IdSucursal:dataUser.datosCita.clinica.IdSucursal,Fecha:$(this).val(),IdSubEstudioEncript:densitometria.data[0].Id}]}        
            getHorariosDisponibles(body,'#reagendarDensi-Hora');
        }); 

    }
    
    $('#perfil-clinica').text(dataUser.datosCita.clinica.Nombre); 
    $('#perfil-dirClinica').text(dataUser.datosCita.clinica.Direccion); 

    
    $('#perfil-telClinica').text(dataUser.datosCita.clinica.Telefonos); 

    $('#perfil-HorarioAtencion').text(dataUser.datosCita.clinica.HorarioAtencion); 

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
}
function reagendarCita(){
    $("#tuFolio").addClass("d-none");
    $("#reagendarCita").removeClass("d-none");
}
function reagendar(){
    var body={}
    var dataUser=JSON.parse(sessionStorage.getItem('dataUser'));
    if(dataUser.datosCita.estudios.length==1){
    body={
        idCita:dataUser.datosCita.idCita,     
        Estudios : [
            {
                IdCitaSisPrev: dataUser.datosCita.estudios[0].idCitaSisPrev,
                Fecha: $("#reagendarMasto-fecha").val(),
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
                    Fecha: $("#reagendarMasto-fecha").val(),
                    HorarioText: $(':selected', '#reagendarMasto-Hora').attr("data-hora"),
                    IdHorario: parseInt($("#reagendarMasto-Hora").val())
                },
                {
                    IdCitaSisPrev: dataUser.datosCita.estudios[1].idCitaSisPrev,
                    Fecha: $("#reagendarPapa-fecha").val(),
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
    var result=ReagendarCita(body);
    console.log(result);

    sessionStorage.clear();
    sessionStorage.setItem('dataUser', JSON.stringify(result))
    startPerfil();

    $("#reagendarFechas").addClass("d-none");
    $("#reagendarFechas").removeClass("d-flex");
    $("#reagendarAceptar").removeClass("d-none");
}

function cerrarReagendar(){
    $("#tuFolio").removeClass("d-none");
    $("#reagendarCita").addClass("d-none");
    $("#reagendarAceptar").addClass("d-none");
}

function getHorariosDisponibles(body,selector){
    var horarios=getHorarios(body)
    var optionsAsString = "<option hidden selected>Selecciona una opción</option>";
    for(var i = 0; i < horarios.length; i++) {
        optionsAsString += "<option value='" + horarios[i].Id + "' data-hora='"+horarios[i].Hora+"'>" + horarios[i].Hora + "</option>";
    }
    $(selector).empty().append(optionsAsString);
}
function agregarPKT(){
    rutaAgregarPKT();
    $("#sumarEstudios").addClass("sumarPKT");
}
function agregarPKT2(){
    rutaPagarPKT();
}
function pagarPKT(){
    rutaPagoCompletado();
}

function Cancelar(){
    cancelarCita()
}