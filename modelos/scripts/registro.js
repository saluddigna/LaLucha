global={};
global.clinicas=[];
global.estados=[];
configUrl='http://b7a0f3b3928a.ngrok.io/';
sesion='Basic bGFsdWNoYXNkOll2RF4mSGlCNmQ4N2FeWlh4d0Vo'
//Main
$(document).ready(function () {
    global.clinicas=getClinicas();
    global.estados=getEstados();

    var optionsAsString = "<option hidden selected>Selecciona una opción</option>";
    for(var i = 0; i < global.estados.length; i++) {
        optionsAsString += "<option value='" + global.estados[i].Id + "'>" + global.estados[i].Descripcion + "</option>";
    }
    $('#selectEstado').empty().append( optionsAsString );
    $('#btnObtenerUbicacion').click(function () {
        getUbicacion();
    });

    $("#selectEstado").change(function(){
        getClinicasByEstado();
    });
    $('#fechaCita').attr('min' , new Date().toISOString().split("T")[0]);
    $("#fechaCita").change(function(){
        getHorariosDisponibles();
    });
  });



  
//functions
function getHorariosDisponibles(){
    var fechaCita=$('#fechaCita').val();
    var body={ListaHorarios:[{IdEstudio:3,IdSucursal:46,Fecha:fechaCita,IdSubEstudioEncript:"17158"}]}
    var horarios=getHorarios(body)
    console.log(horarios)

    var optionsAsString = "<option hidden selected>Selecciona una opción</option>";
    for(var i = 0; i < horarios.length; i++) {
        optionsAsString += "<option value='" + horarios[i].Id + "'>" + horarios[i].Hora + "</option>";
    }
    $('#selectHorario').empty().append( optionsAsString );
}

function getClinicasByEstado(){
    var filter=$('#selectEstado').val();
    var clinicasFilter=global.clinicas.filter(x=>x.IdEstado==filter);
    var optionsAsString = "<option hidden selected>Selecciona una opción</option>";
    for(var i = 0; i < clinicasFilter.length; i++) {
        optionsAsString += "<option value='" + clinicasFilter[i].IdSucursal + "'>" + clinicasFilter[i].Nombre + "</option>";
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

//request
function getClinicas() {
    var arrClinicas = [];

    $.ajax({
        type: 'GET',
        url: configUrl+'clinica/allClinicas',
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', sesion);
        },
        async: false,
        success: function (response) {
            arrClinicas = response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

    return arrClinicas;
};

function getEstados() {
    var arrEstados = [];

    $.ajax({
        type: 'GET',
        url: configUrl+'clinica/estados',
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', sesion);
        },
        async: false,
        success: function (response) {
            arrEstados = response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

    return arrEstados;
};

function getHorarios(body) {
    var arrHorarios = [];

    $.ajax({
        type: 'POST',
        url: configUrl+'Citas/Citas2/HorariosDisponibles2',
        contentType: 'application/json',
        data: JSON.stringify(body),
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', sesion);
        },
        async: false,
        success: function (response) {
            arrHorarios = response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

    return arrHorarios.horarios[0].Horarios;
};

