function clearDataPaquetes(){
    $("#fechaCita").val("")
    $("#fechaCitaPapa_pkt1").val("")
    $("#fechaCitaPapa_pkt2").val("")
    $("#fechaCitaDensi_pkt2").val("")

    clearSelects('#selectHorario');
    clearSelects('#selectHorarioPapa_pkt1');
    clearSelects('#selectHorarioPapa_pkt2');
    clearSelects('#selectHorarioDensi_pkt2');
}

function clearSelects(selector){
    var optionsAsString = "<option hidden selected>Selecciona una opción</option>";
    $(selector).empty().append(optionsAsString);
}

function disablekeys()
{
    return false;
}
async function startDatesPicker(){
    $('#dialog_link, ul#icons li').hover( function() { $(this).addClass('ui-state-hover'); }, function() { $(this).removeClass('ui-state-hover'); } );
    var fechaFinOctubre = new Date("2020-10-31 00:00:00");
    $("#fechaCita").datepicker({
        minDate: 0,
        maxDate: fechaFinOctubre,
        dateFormat: 'dd-mm-yy',
    });

    $('#fechaCitaPapa_pkt1').datepicker({
        minDate: 0,
        dateFormat: 'dd-mm-yy',
    })
    

    $('#fechaCitaPapa_pkt2').datepicker({
        minDate: 0,
        dateFormat: 'dd-mm-yy',
    })

    $('#fechaCitaDensi_pkt2').datepicker({
        minDate: 0,
        dateFormat: 'dd-mm-yy',
    })
}

async function loadEstados(){
    var optionsAsString = "<option hidden selected>Selecciona una opción</option>";
        for(var i = 0; i < global.estados.length; i++) {
            optionsAsString += "<option value='"+global.estados[i].Id+"'>" + global.estados[i].Descripcion + "</option>";
        }
    $('#selectEstado').empty().append(optionsAsString );
}
async function startCita(){
        global.data.cita.TipoPago=3;
        $("#selectEstado").on('change', function(){
            //console.log('Estado')
            $("#selectClinica").prop('disabled',false) 
            $("#fechaCita").prop('disabled',true) 
            $("#selectHorario").prop('disabled',true) 
            getClinicasByEstado();
            validacionesPaquetes()
        });
        
        await startDatesPicker()

        $("#selectClinica").prop('disabled',true) 
        $("#fechaCita").prop('disabled',true) 
        $("#selectHorario").prop('disabled',true) 

        await loadEstados();
        
        
        $('#btnObtenerUbicacion').click(function () {
            getUbicacion();
        });

        $("#selectClinica").bind('change',function(){
            $.when( agregarLoadingInputs() ).then(x=>{
                changeSelectClinica(parseFloat($("#selectClinica").val()));
                validacionesPaquetes();
                quitarLoadingInputs()
              });    
        });

         $('#chk').on('change', function(){
            $('#check-error').text("")
             if(($('#chk').is(":checked"))){
                if(togglePapa)
                    quitarPKT(1);
                else if (togglePkt)
                    quitarPKT(2);      
             }
             validacionesPaquetes()
         });

         $('#chkTerminos').on('change', function(){
            $('#check-error').text("")
            validacionesPaquetes()
         });

         $('#chkEdad').on('change', function(){
            $('#check-error').text("")
            validacionesPaquetes()
         });


        //agregarPaquetes

        $("#fechaCita").on('change', function(){
            $.when( agregarLoadingInputs() ).then(x=>{
                var body={ListaHorarios:[{IdEstudio:3,IdSucursal:$("#selectClinica").val(),Fecha:$("#fechaCita").val(),IdSubEstudioEncript:mastografia.data[0].Id}]}        
                getHorariosDisponibles(body,'#selectHorario');
                $("#fechaCita").addClass("valido");
                $("#fechaCita").addClass("lleno")
                validacionesPaquetes()
                setTimeout(function() { quitarLoadingInputs(); }, 1000);
            });
        })
        $("#fechaCitaPapa_pkt1").on('change', function(){
            $.when( agregarLoadingInputs() ).then(x=>{
                var body={ListaHorarios:[{IdEstudio:4,IdSucursal:$("#selectClinica").val(),Fecha:$(this).val(),IdSubEstudioEncript:papanicolao.data[0].Id}]}        
                getHorariosDisponibles(body,'#selectHorarioPapa_pkt1');
                $("#fechaCitaPapa_pkt1").addClass("valido");
                $("#fechaCitaPapa_pkt1").addClass("lleno")
                validacionesPaquetes()
                setTimeout(function() { quitarLoadingInputs(); }, 1000);
            });
        })
        $("#fechaCitaPapa_pkt2").on('change', function(){
            $.when( agregarLoadingInputs() ).then(x=>{
                var body={ListaHorarios:[{IdEstudio:4,IdSucursal:$("#selectClinica").val(),Fecha:$(this).val(),IdSubEstudioEncript:papanicolao.data[0].Id}]}        
                getHorariosDisponibles(body,'#selectHorarioPapa_pkt2');
                $("#fechaCitaPapa_pkt2").addClass("valido");
                $("#fechaCitaPapa_pkt2").addClass("lleno")
                validacionesPaquetes()
                setTimeout(function() { quitarLoadingInputs(); }, 1000);
            });
        })
        $("#fechaCitaDensi_pkt2").on('change', function(){
            $.when( agregarLoadingInputs() ).then(x=>{
                var body={ListaHorarios:[{IdEstudio:1,IdSucursal:$("#selectClinica").val(),Fecha:$(this).val(),IdSubEstudioEncript:densitometria.data[0].Id}]}        
                getHorariosDisponibles(body,'#selectHorarioDensi_pkt2');
                $("#fechaCitaDensi_pkt2").addClass("valido");
                $("#fechaCitaDensi_pkt2").addClass("lleno")
                validacionesPaquetes()
                setTimeout(function() { quitarLoadingInputs(); }, 1000);
            });
        })
        

        $("#selectHorario").on('change', function(){
            // //console.log('selectHorario')
            saveValuesPaquetes();
            startResumen();
            $("#content-paquetes").show();
            validacionesPaquetes()
            scrollTop("#paquetes-top");
        });

        $("#selectHorarioPapa_pkt1").on('change', function(){
            // //console.log('selectHorario')
            saveValuesPaquetes();
            startResumen();
            validacionesPaquetes()
        });

        $("#selectHorarioPapa_pkt2").on('change', function(){
            // //console.log('selectHorario')
            saveValuesPaquetes();
            startResumen();
            validacionesPaquetes()
        });

        $("#selectHorarioDensi_pkt2").on('change', function(){
            // //console.log('selectHorario')
            saveValuesPaquetes();
            startResumen();
            validacionesPaquetes()
        });
        
        $('#tiempoRestante').empty().append(moment().endOf('2020-10-19T09:00:00-06:00').fromNow());



        


}
function clearPkts(){
    $('#fechaCitaPapa_pkt1').val("")
    $('#fechaCitaPapa_pkt2').val("")
    $('#fechaCitaDensi_pkt2').val("")

    $('#selectHorarioPapa_pkt1').empty()
    $('#selectHorarioPapa_pkt2').empty()
    $('#selectHorarioDensi_pkt2').empty()

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
    $("#cita_nombre").on('input', function(){
        validacionesDatosPaciente("#cita_nombre")
    })
    $("#cita_app").on('input', function(){
        validacionesDatosPaciente("#cita_app")
    })
    $("#cita_fechaNacimiento").on('input', function(){
        validacionesDatosPaciente("#cita_fechaNacimiento")
    })
    $("#cita_telefono").on('input', function(){
        validacionesDatosPaciente("#cita_telefono")
    })
    $("#cita_telefono_confirm").on('input', function(){
        validacionesDatosPaciente("#cita_telefono_confirm")
    })
    $("#cita_correo").on('input', function(){
        validacionesDatosPaciente("#cita_correo")
    })

    // $("#cita_correo").on("blur", function(){
        
    // })
    
    
    var date = moment.utc().format();
    var minDate = moment.utc(date).local().format("DD-MM-YYYY");
    $(":input").inputmask();
    $('#cita_nombre').val(global.data.Nombre)
    $('#cita_app').val(global.data.Paterno);
    $('#cita_apm').val(global.data.Materno);
    $('#cita_fechaNacimiento').val(global.data.FechaNacimiento);
    

    // $("#cita_fechaNacimiento").datepicker({
    //     maxDate: minDate,
    //     dateFormat: 'dd-mm-yy',
    //     onSelect: function (a) {
    //         $("#cita_fechaNacimiento").addClass("valido");
    //         $("#cita_fechaNacimiento").addClass("lleno")
    //     },
    // });
    $(document).on('click', '#cita_fechaNacimiento', function () { 
        // var me = $("#cita_fechaNacimiento");   
        // me.datepicker({
        //     showOn: 'focus',
        //     altFormat: "dd-mm-yy",
        //     dateFormat: "dd-mm-yy",
        //     maxDate: minDate
        // }).focus();
    }).on('focus', '#cita_fechaNacimiento', function () {
        var me = $("#cita_fechaNacimiento");
        me.inputmask();
    });

    if(global.data.IdSexo==2){
        $("#fem").removeClass("active");
        $("#mas").addClass("active");
        
    }else{
        $("#fem").addClass("active");
        $("#mas").removeClass("active");
    }
        
    // global.data.IdSexo=$("#fem").hasClass("active") ? 1 : 2;
    $('#cita_correo').val(global.data.CorreoElectronico);
    $('#cita_telefono').val(global.data.Telefono);
    global.data.Password=null;
    $(".cajas-texto .input-sd").addClass("valido");
    validacionesDatosPaciente()

}


 async function loadValuesPaquetes(){
    $("#selectClinica").prop('disabled',false) 
    $("#fechaCita").prop('disabled',false) 
    $("#selectHorario").prop('disabled',false) 
    await loadEstados()
    if(global.data.IdEstado && global.data.IdSucursal){
        //console.log(global.data.IdEstado)
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
        $("#content-paquetes").show();
    }
    
    if(global.data.cita.Estudios.length==3){
        agregarPKT();
        $('#fechaCitaPapa_pkt2').val(global.data.cita.Estudios[1].Fecha)
        getHorariosDisponibles({ListaHorarios:[{IdEstudio:4,IdSucursal:parseInt(idSucursal),Fecha:global.data.cita.Estudios[1].Fecha,IdSubEstudioEncript:papanicolao.data[0].Id}]} ,'#selectHorarioPapa_pkt2');
        $('#selectHorarioPapa_pkt2').val(global.data.cita.Estudios[1].IdHora)

        $('#fechaCitaDensi_pkt2').val(global.data.cita.Estudios[2].Fecha)
        getHorariosDisponibles({ListaHorarios:[{IdEstudio:1,IdSucursal:parseInt(idSucursal),Fecha:global.data.cita.Estudios[2].Fecha,IdSubEstudioEncript:densitometria.data[0].Id}]} ,'#selectHorarioDensi_pkt2');
        $('#selectHorarioDensi_pkt2').val(global.data.cita.Estudios[2].IdHora)
    }
    else{
        if(global.data.cita.Estudios.length==2){
            agregarPapa();
            $('#fechaCitaPapa_pkt1').val(global.data.cita.Estudios[1].Fecha);
            getHorariosDisponibles({ListaHorarios:[{IdEstudio:4,IdSucursal:parseInt(idSucursal),Fecha:global.data.cita.Estudios[1].Fecha,IdSubEstudioEncript:papanicolao.data[0].Id}]} ,'#selectHorarioPapa_pkt1');
            $('#selectHorarioPapa_pkt1').val(global.data.cita.Estudios[1].IdHora)
        }
    }
    validacionesPaquetes()
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
    global.data.cita.OrigenCita=30;
    global.data.cita.IdSucursal=parseInt(global.data.IdSucursal);

        // global.dataClinica=$('#selectClinica').attr('data-clinica');
}

function validacionesPaquetes(){
    //console.log('entre validaciones paquetes>>>')
    if(!togglePapa && !togglePkt){
        if((!$('#chk').is(":checked"))){
            $('#check-error').text("Para continuar, debes indicar si deseas agregar uno de los beneficios extras.")
            $( "#cita_siguiente" ).prop( "disabled", true );
            return false
        }
        $('#form-registro').parsley({
            excluded: '.paquete1 input, .paquete1 select, .paquete2 input, .paquete2 select'//, .datos-paciente input, .datos-paciente select,.confirmacionDatos input,.confirmacionDatos select 
        });
    }else if(togglePapa){
        $('#form-registro').parsley({
            excluded: '.paquete2 input, .paquete2 select '//, .datos-paciente input, .datos-paciente select,.confirmacionDatos input,.confirmacionDatos select 
        });
    }
    else{
        $('#form-registro').parsley({
            excluded: '.paquete1 input, .paquete1 select '//, .datos-paciente input, .datos-paciente select,.confirmacionDatos input,.confirmacionDatos select 
        });
    }
    if((!$('#chkTerminos').is(":checked"))){
        $('#check-error').text("Para continuar, acepta nuestro Aviso de Privacidad junto con Términos y Condiciones.")
        $( "#cita_siguiente" ).prop( "disabled", true );
        return false
    }

    if((!$('#chkEdad').is(":checked"))){
        $('#check-error').text("Para continuar, debes aceptar que conoces la edad en la que se realiza este estudio.")
        $( "#cita_siguiente" ).prop( "disabled", true );
        return false
    }

    if ($('#form-registro').parsley().isValid()) {
    $( "#cita_siguiente" ).prop( "disabled", false );
      return true
    } else {
        $( "#cita_siguiente" ).prop( "disabled", true );
        //console.log('not valid registro');
        return false
    }
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
    $( "#cita_siguiente" ).prop( "disabled", true );

}



  
//functions


function quitarPKT(pkt){
    clearPkts();
    if(pkt==1){
        $(".displayPKT .pktSoloEnLinea.papa").css("display", "none");
        $("#pktPapa, .quitarPKT_papa").toggle("d-none");
        $("#addPKT").prop("disabled", false);
        $("#addPapa").show()

        togglePapa=false;
        saveValuesPaquetes();
        startResumen();
    }else{
        $(".displayPKT .pktSoloEnLinea.densi").css("display", "none");
        $("#pktMujer, .quitarPKT_densi").toggle("d-none");
        $("#addPapa").prop("disabled", false);
        $("#addPKT").show()
        togglePkt=false;
        saveValuesPaquetes();
        startResumen();

    }
};
var togglePapa=false;
function agregarPapa(){
    $('#chk').prop('checked',false)
    $("#addPapa").hide()
    $(".pktPapa, .quitarPKT_papa").toggle("d-none");
    $(".displayPKT .pktSoloEnLinea.papa").css("display", "flex");
    $("#addPKT").prop("disabled", true);
    togglePapa=true;
    togglePkt=false;
    validacionesPaquetes()
};

var togglePkt=false;
function agregarPKT(){
    $('#chk').prop('checked',false)
    $("#pktMujer, .quitarPKT_densi").toggle("d-none");
    $(".displayPKT .pktSoloEnLinea.densi").css("display", "flex");
    $("#addPapa").prop("disabled", true);
    $("#addPKT").hide()
    togglePapa=false;
    togglePkt=true;
    validacionesPaquetes()

};


function alerta(msg){
    alert(msg);
}

function validacionesDatosPaciente(selector){
    console.log("form-paciente",$('#form-registro').parsley().isValid())
    if(selector){
        if(selector=="#cita_telefono" || selector=="#cita_telefono_confirm"){
            $("#cita_telefono_confirm").parsley().validate();
            $("#cita_telefono").parsley().validate();
        }
        else
            $(selector).parsley().validate();
            
        if ($('#form-registro').parsley().isValid()) {
            // if(selector=="#cita_correo"){
                param={correoElectronico: $("#cita_correo").val()}
                result=validaCorreoService(param)
                console.log(result);
                if(result==true){
                    $("#correoExistente").text("El correo que nos proporcionaste ya ha sido utilizado.")
                    $( "#cita_siguiente" ).prop( "disabled", true );
                    return
                }
                else{
                    $("#correoExistente").empty()
                    // $( "#cita_siguiente" ).prop( "disabled", false );

                }
            // }
        }
    }
    if ($('#form-registro').parsley().isValid()) {
      $( "#cita_siguiente" ).prop( "disabled", false );
      return true
    } else {
        //console.log('not valid registro');
        $( "#cita_siguiente" ).prop( "disabled", true );
        return false
    }
}

 function getHorariosDisponibles(body,selector){
    var horarios=getHorarios(body)
    var optionsAsString="";
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
            //console.log(err)
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

function changeSelectClinica(idSucursal){
    $("#fechaCita").prop('disabled',false) 
    $("#selectHorario").prop('disabled',true)
    idSucursal=idSucursal;
    mastografia=getEstudio(3,idSucursal);
    densitometria=getEstudio(1,idSucursal);
    papanicolao=getEstudio(4,idSucursal)
    // //console.log(mastografia,densitometria,densitometria)
    clearDataPaquetes();
}
function verInstrucciones(){
    $('#datosTelefono').toggleClass("d-none");
}