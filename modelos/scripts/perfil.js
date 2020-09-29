function startPerfil(){
    var dataUser=JSON.parse(sessionStorage.getItem('dataUser'));
    if(!dataUser){
        redirectLogin();
        return
    }

    $('#perfil-nombre').text(dataUser.datosPaciente.Nombre +" "+dataUser.datosPaciente.Paterno+" "+dataUser.datosPaciente.Materno);  
    $('#perfil-correo').text(dataUser.datosPaciente.CorreoElectronico);  
    $('#perfil-sexo').text(dataUser.datosPaciente.IdSexo == 1 ? "Mujer" : "Hombre");  
    $('#perfil-fechaN').text(dataUser.datosPaciente.FechaNacimiento);  
    $('#perfil-celular').text(dataUser.datosPaciente.Telefono); 
    $('#perfil-paciente').text(dataUser.datosPaciente.Nombre +" "+dataUser.datosPaciente.Paterno+" "+dataUser.datosPaciente.Materno); 
    
    if(dataUser.datosCita.estudios.length==1){
        $('#folios_papa').hide();
        $('#folios_densi').hide();
        $('#folio_nombre_masto').text(dataUser.datosCita.estudios[0].nombre);  
        $('#folio_masto').text(dataUser.datosCita.estudios[0].folio); 
        $('#perfil-fechaCita-masto').text(dataUser.datosCita.estudios[0].fecha+" "+dataUser.datosCita.estudios[0].hora);
         
    }else if(dataUser.datosCita.estudios.length==2){
        $('#folios_densi').hide();
        $('#folio_nombre_masto').text(dataUser.datosCita.estudios[0].nombre);  
        $('#folio_masto').text(dataUser.datosCita.estudios[0].folio); 
        $('#perfil-fechaCita-masto').text(dataUser.datosCita.estudios[0].fecha+" "+dataUser.datosCita.estudios[0].hora); 

        $('#folio_nombre_papa').text(dataUser.datosCita.estudios[1].nombre);  
        $('#folio_papa').text(dataUser.datosCita.estudios[1].folio);
        $('#perfil-fechaCita-papa').text(dataUser.datosCita.estudios[1].fecha+" "+dataUser.datosCita.estudios[1].hora); 

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

    showPreparaciones(); 
}
function showPreparaciones(){
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
    $("#reagendarFechas").addClass("d-none");
    $("#reagendarFechas").removeClass("d-flex");
    $("#reagendarAceptar").removeClass("d-none");
}
function cerrarReagendar(){
    $("#tuFolio").removeClass("d-none");
    $("#reagendarCita").addClass("d-none");
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