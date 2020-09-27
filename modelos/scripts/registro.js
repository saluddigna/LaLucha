//Main

function startCita(){
        var optionsAsString = "<option hidden selected>Selecciona una opción</option>";
        for(var i = 0; i < global.estados.length; i++) {
            optionsAsString += "<option value='"+global.estados[i].Id+"'>" + global.estados[i].Descripcion + "</option>";
        }
        $('#selectEstado').empty().append(optionsAsString );
        $('#btnObtenerUbicacion').click(function () {
            getUbicacion();
        });

        $("#selectEstado").change(function(){
            getClinicasByEstado();
        });

        $("#selectClinica").change(function(){
            idSucursal=parseFloat($(this).val());
            mastografia=getEstudio(3,idSucursal);
            densitometria=getEstudio(1,idSucursal);
            papanicolao=getEstudio(4,idSucursal);
        });

        var date = moment.utc().format();
        var minDate = moment.utc(date).local().format("YYYY-MM-DD");

        $('#fechaCita').attr('min' , minDate);
        $('#fechaCitaPapa_pkt1').attr('min' , minDate);
        $('#fechaCitaPapa_pkt2').attr('min' , minDate);
        $('#fechaCitaDensi_pkt2').attr('min' , minDate);

        $("#fechaCita").change(function(){
            var body={ListaHorarios:[{IdEstudio:3,IdSucursal:$("#selectClinica").val(),Fecha:$(this).val(),IdSubEstudioEncript:mastografia.data[0].Id}]}        
            getHorariosDisponibles(body,'#selectHorario');
        });
        $("#fechaCitaPapa_pkt1").change(function(){
            var body={ListaHorarios:[{IdEstudio:4,IdSucursal:$("#selectClinica").val(),Fecha:$(this).val(),IdSubEstudioEncript:papanicolao.data[0].Id}]}        
            getHorariosDisponibles(body,'#selectHorarioPapa_pkt1');
        });
        $("#fechaCitaPapa_pkt2").change(function(){
            var body={ListaHorarios:[{IdEstudio:4,IdSucursal:$("#selectClinica").val(),Fecha:$(this).val(),IdSubEstudioEncript:papanicolao.data[0].Id}]}        
            getHorariosDisponibles(body,'#selectHorarioPapa_pkt2');
        });
        $("#fechaCitaDensi_pkt2").change(function(){
            var body={ListaHorarios:[{IdEstudio:1,IdSucursal:$("#selectClinica").val(),Fecha:$(this).val(),IdSubEstudioEncript:densitometria.data[0].Id}]}        
            getHorariosDisponibles(body,'#selectHorarioDensi_pkt2');
        });
        
        // $('#fem').on('click',function(){ 
            
        // });
       
        // $('#mas').on('click',function(){ 
        //     if (!$("#mas").hasClass("active")) {
        //         $(this).addClass("active");
        //         $("#fem").removeClass("active");
        //     }
        // }); 

        $('#tiempoRestante').empty().append(moment().endOf('2020-10-19T09:00:00-06:00').fromNow());

}
function clickFem(){
    if (!$("#fem").hasClass("active")) {
        $("#fem").addClass("active");
        $("#mas").removeClass("active");
    } 
}

function clickMas(){
    if (!$("#mas").hasClass("active")) {
        $("#mas").addClass("active");
        $("#fem").removeClass("active");
    }
}

 function loadValuesPacientes(){
    $('#cita_nombre').val(global.data.Nombre)
    $('#cita_app').val(global.data.Paterno);
    $('#cita_apm').val(global.data.Materno);
    $('#cita_fechaNacimiento').val(global.data.FechaNacimiento);
    // global.data.IdSexo=$("#fem").hasClass("active") ? 1 : 2;
    $('#cita_correo').val(global.data.CorreoElectronico);
    $('#cita_telefono').val(global.data.Telefono);
    global.data.Password=null;
}


 function loadValuesPaquetes(){
    if(global.data.IdEstado && global.data.IdSucursal){
        $('#selectEstado').val(global.data.IdEstado);
        getClinicasByEstado();
        $('#selectClinica').val(global.data.IdSucursal);
        idSucursal=global.data.IdSucursal;
    }
    else{
        return;
    }
    mastografia=getEstudio(3,idSucursal);
    densitometria=getEstudio(1,idSucursal);
    papanicolao=getEstudio(4,idSucursal);
    
    if(global.data.cita.Estudios[0]!=null){
        $('#fechaCita').val(global.data.cita.Estudios[0].Fecha)
         getHorariosDisponibles({ListaHorarios:[{IdEstudio:3,IdSucursal:parseInt(idSucursal),Fecha:global.data.cita.Estudios[0].Fecha,IdSubEstudioEncript:mastografia.data[0].Id}]},'#selectHorario');
        $('#selectHorario').val(global.data.cita.Estudios[0].IdHora)
    }
    
    if(global.data.cita.Estudios.length==3){
        togglePkt=true
        $("#pktMujer").toggle("d-none");
        $('#fechaCitaPapa_pkt2').val(global.data.cita.Estudios[1].Fecha)
        getHorariosDisponibles({ListaHorarios:[{IdEstudio:4,IdSucursal:parseInt(idSucursal),Fecha:global.data.cita.Estudios[1].Fecha,IdSubEstudioEncript:papanicolao.data[0].Id}]} ,'#selectHorarioPapa_pkt2');
        $('#selectHorarioPapa_pkt2').val(global.data.cita.Estudios[1].IdHora)

        $('#fechaCitaDensi_pkt2').val(global.data.cita.Estudios[2].Fecha)
        getHorariosDisponibles({ListaHorarios:[{IdEstudio:1,IdSucursal:parseInt(idSucursal),Fecha:global.data.cita.Estudios[2].Fecha,IdSubEstudioEncript:densitometria.data[0].Id}]} ,'#selectHorarioDensi_pkt2');
        $('#selectHorarioDensi_pkt2').val(global.data.cita.Estudios[2].IdHora)
    }
    else{
        if(global.data.cita.Estudios.length==2){
            togglePapa=true
            $("#pktPapa").toggle("d-none");
            $('#fechaCitaPapa_pkt1').val(global.data.cita.Estudios[1].Fecha);
            getHorariosDisponibles({ListaHorarios:[{IdEstudio:4,IdSucursal:parseInt(idSucursal),Fecha:global.data.cita.Estudios[1].Fecha,IdSubEstudioEncript:papanicolao.data[0].Id}]} ,'#selectHorarioPapa_pkt1');
            $('#selectHorarioPapa_pkt1').val(global.data.cita.Estudios[1].IdHora)
        }
    }
    
    // else if(global.data.cita.Estudios.length==2){
    //     togglePapa=true;
    //     $("#pktPapa").toggle("d-none");

    // }
}

function formatPhoneNumber(input, format) {
    // Strip non-numeric characters
    var digits = input.replace(/\D/g, '');

    // Replace each "X" with the next digit
    var count = 0;
    return format.replace(/X/g, function() {
        return digits.charAt(count++);
    });
}

function saveValuesPaciente(){

    global.data.Nombre=$('#cita_nombre').val();
    global.data.Paterno=$('#cita_app').val();
    global.data.Materno=$('#cita_apm').val();
    global.data.FechaNacimiento=$('#cita_fechaNacimiento').val();
    global.data.IdSexo=$("#fem").hasClass("active") ? "1" : "2";
    global.data.CorreoElectronico=$('#cita_correo').val();
    global.data.Telefono=$('#cita_telefono').val();
    global.data.Password=null;

    global.data.cita.Nombre=global.data.Nombre;
    global.data.cita.Paterno=global.data.Paterno;
    global.data.cita.Materno=global.data.Materno;
    global.data.cita.FechaNacimiento=global.data.FechaNacimiento;
    global.data.cita.IdSexo=parseInt(global.data.IdSexo);
    global.data.cita.CorreoElectronico=global.data.CorreoElectronico;
    global.data.cita.TelefonoCelular=global.data.Telefono;
    global.data.cita.IdSession=idSesion;
    global.data.cita.IdUsuario=3373;
    global.data.cita.OrigenCita=15;
    global.data.cita.IdSucursal=parseInt(global.data.IdSucursal);

        // global.dataClinica=$('#selectClinica').attr('data-clinica');
}

function validacionesPaquetes(){
    if(global.data.IdSucursal==null || global.data.IdSucursal==""){
        alerta("campo Clínica es requerido");
        return false;
    }
    else if(global.data.IdEstado==null || global.data.IdEstado==""){
        alerta("campo Estado Paterno es requerido");
        return false;
    }
    else if(togglePapa){
        if($("#fechaCitaPapa_pkt1").val()=="" || $("#selectHorarioPapa_pkt1").val()==""){
            alerta("Fecha y Hora de tu cita requeridos");
            return false;
        }
    }
    else if(togglePkt){
        if($("#fechaCitaPapa_pkt2").val()=="" || $("#selectHorarioPapa_pkt2").val()=="" || $("#fechaCitaDensi_pkt2").val()=="" || $("#selectHorarioDensi_pkt2").val()==""){
        alerta("Fecha y Hora de tu citas requeridos");
        return false;
        }
    }
    return true;
}

function saveValuesPaquetes(){
    global.data.IdSucursal=$('#selectClinica').val();
    global.data.IdEstado=$('#selectEstado').val();
    global.dataClinica = $(':selected', '#selectClinica').attr("data-clinica-name");
    global.data.cita.Estudios=[];
    var estudio=null;
    estudio= {
        Cantidad: 1,
        Fecha: $('#fechaCita').val(),
        Hora: $(':selected', '#selectHorario').attr("data-hora"),
        IdHora: parseInt($('#selectHorario').val()),
        Id: parseInt(mastografia.data[0].Id),
        IdEstudio: parseInt(mastografia.data[0].EstudioID),
        Nombre: mastografia.data[0].Estudio,
        Descripcion: mastografia.data[0].Descripcion,
        Precio: parseFloat(mastografia.data[0].Precio),
        Preparacion: mastografia.data[0].Preparacion,
        EstatusDescuento: true
    };
    global.data.cita.Estudios.push(estudio);
    if(togglePapa){
        estudio= {
            Cantidad: 1,
            Fecha: $('#fechaCitaPapa_pkt1').val(),
            Hora: $(':selected', '#selectHorarioPapa_pkt1').attr("data-hora"),
            IdHora: parseInt($('#selectHorarioPapa_pkt1').val()),
            Id: parseInt(papanicolao.data[0].Id),
            IdEstudio: parseInt(papanicolao.data[0].EstudioID),
            Nombre: papanicolao.data[0].Estudio,
            Descripcion: papanicolao.data[0].Descripcion,
            Precio: papanicolao.data[0].Precio,
            Preparacion: papanicolao.data[0].Preparacion,
            EstatusDescuento: true
        };
        global.data.cita.Estudios.push(estudio);
    }
    else if(togglePkt){
        estudio= {
            Cantidad: 1,
            Fecha: $('#fechaCitaPapa_pkt2').val(),
            Hora: $(':selected', '#selectHorarioPapa_pkt2').attr("data-hora"),
            IdHora: parseInt($('#selectHorarioPapa_pkt2').val()),
            Id: parseInt(papanicolao.data[0].Id),
            IdEstudio: parseInt(papanicolao.data[0].EstudioID),
            Nombre: papanicolao.data[0].Estudio,
            Descripcion: papanicolao.data[0].Descripcion,
            Precio: papanicolao.data[0].Precio,
            Preparacion: papanicolao.data[0].Preparacion,
            EstatusDescuento: true
        };
        global.data.cita.Estudios.push(estudio);
        estudio= {
            Cantidad: 1,
            Fecha: $('#fechaCitaDensi_pkt2').val(),
            Hora: $(':selected', '#selectHorarioDensi_pkt2').attr("data-hora"),
            IdHora: parseInt($('#selectHorarioDensi_pkt2').val()),
            Id: parseInt(densitometria.data[0].Id),
            IdEstudio: parseInt(densitometria.data[0].EstudioID),
            Nombre: densitometria.data[0].Estudio,
            Descripcion: densitometria.data[0].Descripcion,
            Precio: densitometria.data[0].Precio,
            Preparacion: densitometria.data[0].Preparacion,
            EstatusDescuento: true
        };
        global.data.cita.Estudios.push(estudio);
    }

}



  
//functions


function quitarPKT(pkt){
    if(pkt==1){
        $("#pktPapa").toggle("d-none");
        $("#addPKT").prop("disabled", false);
        togglePapa=false;
    }else{
        $("#pktMujer").toggle("d-none");
        $("#addPapa").prop("disabled", false);
        togglePkt=false;

    }
};
var togglePapa=false;
function agregarPapa(){
    $("#pktPapa").toggle("d-none");
    $("#addPKT").prop("disabled", true);
    togglePapa=true;
    togglePkt=false;
};

var togglePkt=false;
function agregarPKT(){
    $("#pktMujer").toggle("d-none");
    $("#addPapa").prop("disabled", true);
    togglePapa=false;
    togglePkt=true;
};


// var togglePapa=false;
// function agregarPapa(){
//     if(togglePapa==false) {
//         $("#pktPapa").toggle("d-none");
//         togglePapa=true;
//     }       
//     else if($("#fechaCitaPapa_pkt1").val()!="" && $("#selectHorarioPapa_pkt1").val()!=""){
//         $('#btnAgregarPapa').prop('disabled', true);
//     }
//     else{
//         alert('Debes Seleccionar Fecha y Hora para tu estudio');
//     }
    
//   };


  
//   var togglePkt=false;
//   function agregarPKT(){
//     if(togglePkt==false) {
//         $("#pktMujer").toggle("d-none");
//         togglePkt=true;
//     }else if($("#fechaCitaPapa_pkt2").val()!="" && $("#selectHorarioPapa_pkt2").val()!="" && $("#fechaCitaDensi_pkt2").val()!="" && $("#selectHorarioDensi_pkt2").val()!=""){
//         if(togglePapa){
//             $("#fechaCitaPapa_pkt1").val("");
//             $("#selectHorarioPapa_pkt1").val("");
//             $("#pktPapa").toggle("d-none");
//             togglePapa=false;
//             $('#btnAgregarPapa').prop('disabled', true);
//             $('#btnAgregarPkt').prop('disabled', true);
//         }
//         else{
//             $('#btnAgregarPkt').prop('disabled', true);
//         }
//     }else{
//         alert('Debes Seleccionar Fecha y Hora para tus estudios');
//     }
//   };
function alerta(msg){
    alert(msg);
}

function validacionesDatosPaciente(){
    if(global.data.cita.Nombre==null || global.data.cita.Nombre==""){
        alerta("campo Nombre es requerido");
        return false;
    }
    else if(global.data.cita.Paterno==null || global.data.cita.Paterno==""){
        alerta("campo Apellido Paterno es requerido");
        return false;
    }
    else if(global.data.cita.Materno==null || global.data.cita.Materno==""){
        alerta("campo Apellido Materno es requerido");
        return false;
    }
    else if(global.data.cita.FechaNacimiento==null || global.data.cita.FechaNacimiento==""){
        alerta("campo Fecha de Nacimiento es requerido");
        return false;
    }
    else if(global.data.cita.CorreoElectronico==null || global.data.cita.CorreoElectronico==""){
        alerta("campo Correo Electronico es requerido");
        return false;
    }
    else if(global.data.cita.TelefonoCelular==null || global.data.cita.TelefonoCelular==""){
        alerta("campo Telefono Celular es requerido");
        return false;
    }
    else if(global.data.cita.IdSucursal==null || global.data.cita.IdSucursal==""){
        alerta("campo Clínica es requerido");
        return false;
    }
    return true;

}

 function getHorariosDisponibles(body,selector){
    var horarios=getHorarios(body)
    var optionsAsString = "<option value='' hidden selected>Selecciona una opción</option>";
    for(var i = 0; i < horarios.length; i++) {
        optionsAsString += "<option value='" + horarios[i].Id + "' data-hora='"+horarios[i].Hora+"'>" + horarios[i].Hora + "</option>";
    }
    $(selector).empty().append(optionsAsString);
}

function getClinicasByEstado(){
    var filter=$('#selectEstado').val();
    var clinicasFilter=global.clinicas.filter(x=>x.IdEstado==filter);
    var optionsAsString = "<option hidden selected>Selecciona una opción</option>";
    for(var i = 0; i < clinicasFilter.length; i++) {
        optionsAsString += "<option value='" + clinicasFilter[i].IdSucursal +"' data-clinica-name='"+clinicasFilter[i].Nombre+"'>" + clinicasFilter[i].Nombre + "</option>";
    }
    $('#selectClinica').empty().append( optionsAsString );
}

  function getUbicacion(){
    navigator.geolocation.getCurrentPosition(success, error);
        function success(position) {
            var menorDistancia=null;
            var clinicaCercana=[];
            global.clinicas.map(clinica=>{
                var distancia=getDistanceKM(position.coords.latitude,position.coords.longitude,clinica.LatClinica,clinica.LngClinica);
                if(menorDistancia==null){
                    menorDistancia = distancia;
                }else if (parseFloat(distancia) < parseFloat(menorDistancia)) {
                    menorDistancia = distancia;
                    clinicaCercana = clinica
                }
            });
            $('#selectEstado').val(clinicaCercana.IdEstado.toString()).change();
        }
        function error(err) {
            console.log(err)
        }
  }

  function getDistanceKM(lat1, lon1, lat2, lon2) {
    rad = function (x) {
        return x * Math.PI / 180;
    }
    var R = 6378.137;
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d.toFixed(3);
}

