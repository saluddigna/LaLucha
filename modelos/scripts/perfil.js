function startPerfil(){
    var dataUser=JSON.parse(sessionStorage.getItem('dataUser'));
    console.log(JSON.parse(sessionStorage.getItem('dataUser')));
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
    }else if(dataUser.datosCita.estudios.length==2){
        $('#folios_densi').hide();
        $('#folio_nombre_masto').text(dataUser.datosCita.estudios[0].nombre);  
        $('#folio_masto').text(dataUser.datosCita.estudios[0].folio); 
        $('#folio_nombre_papa').text(dataUser.datosCita.estudios[1].nombre);  
        $('#folio_papa').text(dataUser.datosCita.estudios[1].folio); 

    }else{
        $('#folio_nombre_masto').text(dataUser.datosCita.estudios[0].nombre);  
        $('#folio_masto').text(dataUser.datosCita.estudios[0].folio); 
        $('#folio_nombre_papa').text(dataUser.datosCita.estudios[1].nombre);  
        $('#folio_papa').text(dataUser.datosCita.estudios[1].folio); 
        $('#folio_nombre_densi').text(dataUser.datosCita.estudios[2].nombre);  
        $('#folio_densi').text(dataUser.datosCita.estudios[2].folio); 

    }
    $('#perfil-clinica').text(dataUser.datosCita.nombreClinica); 
    $('#perfil-dirClinica').text(dataUser.datosCita.direccion); 
    // $('#perfil-telClinica').text(dataUser.datosCita.nombreClinica); 
    // perfil-dirClinica
    
   
    
}