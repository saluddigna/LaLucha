var wto;
var delay = 1000

async function startCitaGratis() {
    $("#fechaCita").addClass("valido");
    $("#selectReferencia").addClass("valido");

    $("#selectEstado").on('change', function () {
        $("#selectClinica").prop('disabled', false)
        $("#fechaCita").prop('disabled', true)
        $("#selectHorario").prop('disabled', true)
        getClinicasByEstado();
    });

    await startDatesPicker()

    $("#selectClinica").prop('disabled', true)
    $("#fechaCita").prop('disabled', true)
    $("#selectHorario").prop('disabled', true)

    await loadEstados();


    $('#btnObtenerUbicacion').click(function () {
        getUbicacion();
    });

    $("#selectClinica").bind('change', function () {
        $.when(agregarLoadingInputs()).then(x => {
            changeSelectClinica(parseFloat($("#selectClinica").val()));
            quitarLoadingInputs()
        });
    });


    $('#chkPromo').on('change', function () {
        $('#check-error').text("")
        validaCitaGratis("#chkPromo")
    });

    $('#chkBeneficiarios').on('change', function () {
        $('#check-error').text("")
        validaCitaGratis("#chkBeneficiarios")
    });

    $('#chkEdad').on('change', function () {
        $('#check-error').text("")
        validaCitaGratis("#chkEdad")
    });


    $("#fechaCita").on('change', function () {
        $.when(agregarLoadingInputs()).then(x => {
            var body = { ListaHorarios: [{ IdEstudio: 3, IdSucursal: $("#selectClinica").val(), Fecha: $("#fechaCita").val(), IdSubEstudioEncript: mastografia.data[0].Id }] }
            getHorariosDisponibles(body, '#selectHorario');
            $("#fechaCita").addClass("valido");
            $("#fechaCita").addClass("lleno")
            validaCitaGratis("#fechaCita")
            quitarLoadingInputs();
        });
    })

    $("#selectHorario").on('change', function () {
        validaCitaGratis("#selectHorario")
    });

    $("#selectReferencia").on('blur change', function () {
        validaCitaGratis("#selectReferencia")
    });

    $("#cita_nombre").on('blur input', function () {
        $("#cita_siguiente").prop("disabled", true);
        validaCitaGratis("#cita_nombre")
    })

    $("#cita_app").on('blur input', function () {
        $("#cita_siguiente").prop("disabled", true);
        validaCitaGratis("#cita_app")
    })

    $("#cita_fechaNacimiento").on('blur input', function () {
        $("#cita_siguiente").prop("disabled", true);
        validaCitaGratis("#cita_fechaNacimiento")
    })

    $("#cita_telefono").on('blur input', function () {
        $("#cita_siguiente").prop("disabled", true);
        validaCitaGratis("#cita_telefono")
    })

    $("#cita_telefono_confirm").on('blur input', function () {
        $("#cita_siguiente").prop("disabled", true);
        validaCitaGratis("#cita_telefono_confirm")
    })

    $(document).on('blur', '.input-sd', function (e) {
        validaCitaGratis();
    })
    $("#cita_correo").on('blur input', function () {
        $("#cita_siguiente").prop("disabled", true);
        $("#cita_correo").addClass('loading');
        clearTimeout(wto);
        wto = setTimeout(function () {
            validaCitaGratis("#cita_correo")
            $("#cita_correo").removeClass('loading');
        }, delay);
    })

    $(document).on('focus', '#cita_fechaNacimiento', function () {
        var me = $("#cita_fechaNacimiento");
        me.inputmask();
    });
    $(":input").inputmask();
}

var formValid = true;
//validaciones
async function validaCitaGratis(selector) {
    if (selector) {
        secuenciaValidacion(selector);
        if (selector == "#cita_correo") {
            if ($('#cita_correo').parsley().isValid()) {
                param = { correoElectronico: $("#cita_correo").val() }
                result = validaCorreoService(param)
                if (result == true) {
                    $("#correoExistente").text("El correo que nos proporcionaste ya ha sido utilizado.")
                    $("#cita_siguiente").prop("disabled", true);
                    formValid = false;
                    return
                }
                else {
                    formValid = true;
                    $("#correoExistente").empty()
                }
            }
        }
        else if (selector == "#cita_fechaNacimiento") {
            var value = isValidDate($("#cita_fechaNacimiento").val())
            if (!value) {
                $("#cita_siguiente").prop("disabled", true);
                formValid = false;
                return
            }
            else {
                formValid = true;
            }
            // console.log(value);
        }
    }

    if ((!$('#chkPromo').is(":checked"))) {
        $('#check-error').text("Para continuar, acepta estar de acuerdo en recibir novedades y promociones.")
        $("#cita_siguiente").prop("disabled", true);
        formValid = false;
        return
    }
    else
        formValid = true;

    if ((!$('#chkBeneficiarios').is(":checked"))) {
        $('#check-error').text("Para continuar, acepta estar de acuerdo que tu nombre aparezca dentro de la lista de personas que ha obtenido una mastografía sin costo.")
        $("#cita_siguiente").prop("disabled", true);
        formValid = false;
        return
    }
    else
        formValid = true;


    if ((!$('#chkEdad').is(":checked"))) {
        $('#check-error').text("Para continuar, debes aceptar que conoces la edad en la que se realiza este estudio.")
        $("#cita_siguiente").prop("disabled", true);
        formValid = false;
        return
    }
    else
        formValid = true;


    if ($('#form-registro').parsley().isValid() && formValid) {
        $("#cita_siguiente").prop("disabled", false);
        return true
    } else {

        $("#cita_siguiente").prop("disabled", true);
        return false
    }
}

//funciones
function getHorariosDisponibles(body, selector) {
    var horarios = getHorarios(body)
    var optionsAsString = "";
    if (horarios.length == 0) {
        optionsAsString = "<option hidden selected>Horarios agotados</option>";
        $(selector).prop('disabled', true)
    } else {
        optionsAsString = "<option hidden selected>Selecciona una opción</option>";
        $(selector).prop('disabled', false)
    }
    for (var i = 0; i < horarios.length; i++) {
        optionsAsString += "<option value='" + horarios[i].Id + "' data-hora='" + horarios[i].Hora + "'>" + horarios[i].Hora + "</option>";
    }
    $(selector).empty().append(optionsAsString);
}

function getClinicasByEstado() {
    var filter = $('#selectEstado').val();
    var clinicasFilter = global.clinicas.filter(x => x.IdEstado == filter);
    var optionsAsString = "<option hidden selected>Selecciona una opción</option>";
    for (var i = 0; i < clinicasFilter.length; i++) {
        optionsAsString += "<option value='" + clinicasFilter[i].IdSucursal + "' data-clinica-name='" + clinicasFilter[i].Nombre + "'>" + clinicasFilter[i].Nombre + "</option>";
    }
    $('#selectClinica').empty().append(optionsAsString);
}

function getUbicacion() {
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
        var menorDistancia = null;
        var clinicaCercana = [];
        global.clinicas.map(clinica => {
            var distancia = getDistanceKM(position.coords.latitude, position.coords.longitude, clinica.LatClinica, clinica.LngClinica);
            if (menorDistancia == null) {
                menorDistancia = distancia;
            } else if (parseFloat(distancia) < parseFloat(menorDistancia)) {
                menorDistancia = distancia;
                clinicaCercana = clinica
            }
        });
        $('#selectEstado').val(clinicaCercana.IdEstado.toString()).change();
        $('#selectClinica').val(clinicaCercana.IdSucursal.toString()).change();

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

function changeSelectClinica(idSucursal) {
    $("#fechaCita").prop('disabled', false)
    $("#selectHorario").prop('disabled', true)
    idSucursal = idSucursal;
    mastografia = getEstudio(3, idSucursal);
    clearDataPaquetes();
}

function clearSelects(selector) {
    var optionsAsString = "<option hidden selected>Selecciona una opción</option>";
    $(selector).empty().append(optionsAsString);
}

function disablekeys() {
    return false;
}
async function startDatesPicker() {
    $('#dialog_link, ul#icons li').hover(function () { $(this).addClass('ui-state-hover'); }, function () { $(this).removeClass('ui-state-hover'); });
    var fechaFinOctubre = new Date("2020-10-31 00:00:00");
    $("#fechaCita").datepicker({
        minDate: 0,
        // maxDate: fechaFinOctubre,
        dateFormat: 'dd-mm-yy',
    });

}

async function loadEstados() {
    var optionsAsString = "<option hidden selected>Selecciona una opción</option>";
    for (var i = 0; i < global.estados.length; i++) {
        optionsAsString += "<option value='" + global.estados[i].Id + "'>" + global.estados[i].Descripcion + "</option>";
    }
    $('#selectEstado').empty().append(optionsAsString);
}

async function quitarLoading() {
    await $("#paginador-registro").show()
    await $("#pago-loading").hide()
    scrollTop("#formCita");
    return true

}
async function mostrarLoading() {
    await $("#paginador-registro").hide()
    await $("#pago-loading").show()
    await $("#pago-datos").hide()
    scrollTop("#formCita");
    return true
}



function registrarCitaGratis() {
    $.when(mostrarLoading()).then(x => {
        global.data.cita.EstatusLaboratorio = false;
        global.data.cita.CondicionFolios = 1000;
        global.data.cita.TipoPago = 2;
        var precio = 0;
        global.data.cita.mastoGratis = true
        global.data.cita.TextoDeSuma = "";
        global.data.cita.DatosPago = {
            Correo: null,
            Nombre: null,
            Precio: precio,
            Referencia: null,
            Telefono: null,
            Token: null,
            conektaTokenId: null
        }
        console.log("Data-Registro: " + JSON.stringify(global.data));
        global.perfil = Registro(global.data)
        if (global.perfil.datosPaciente != null) {
            console.log("Data-Perfil: " + JSON.stringify(global.perfil));
            sessionStorage.clear()
            sessionStorage.setItem('dataUser', JSON.stringify(global.perfil))
            clearGlobalData();
            setTimeout(function () { quitarLoading(); }, 1000);
            localStorage.setItem("cita_creada", 1);
            irPerfil("perfil");
        } else {
            paso--;
            setPaso();
            setTimeout(function () { quitarLoading(); }, 1000);
            //   saveAnalytics('error-pago','PonElPecho',global.perfil)
            $("#error-msg").text("Ha ocurrido un error al agendar tu cita - " + global.perfil);
        }
    });
}

function startConfirmacion() {
    var clinicaInfo = global.clinicas.filter(x => x.IdSucursal == parseInt(global.data.IdSucursal));
    quitarLoading();
    var dataConfirmacion = global.data;
    $('#nombrePX').text(dataConfirmacion.Nombre + ' ' + dataConfirmacion.Paterno + ' ' + dataConfirmacion.Materno);
    $('#fechaNacPX').text(dataConfirmacion.FechaNacimiento);
    $('#telefonoPX').text(dataConfirmacion.Telefono);
    $('#correoPX').text(dataConfirmacion.CorreoElectronico);
    $('#clinicaPX').text(clinicaInfo[0].Nombre + ' - ' + clinicaInfo[0].Direccion);
    $("#cita_siguiente").prop("disabled", false);
}

function saveDataCitaGratis() {
    global.data.IdSucursal = $('#selectClinica').val();
    global.data.IdEstado = $('#selectEstado').val();
    global.dataClinica = $(':selected', '#selectClinica').attr("data-clinica-name");
    global.data.cita.Estudios = [];
    var estudio = null;
    estudio = {
        Cantidad: 1,
        Fecha: $('#fechaCita').val(),
        Hora: $(':selected', '#selectHorario').attr("data-hora"),
        IdHora: parseInt($('#selectHorario').val()),
        Id: parseInt(mastografia.data[0].Id),
        IdEstudio: parseInt(mastografia.data[0].EstudioID),
        Nombre: mastografia.data[0].Estudio,
        Descripcion: mastografia.data[0].Descripcion,
        Precio: 0,//parseFloat(mastografia.data[0].Precio),
        Preparacion: mastografia.data[0].Preparacion,
        EstatusDescuento: true
    };
    global.data.cita.Estudios.push(estudio);

    global.data.Nombre = $('#cita_nombre').val();
    global.data.Paterno = $('#cita_app').val();
    global.data.Materno = $('#cita_apm').val();
    global.data.FechaNacimiento = $('#cita_fechaNacimiento').val();
    global.data.IdSexo = $("#fem").hasClass("active") ? "1" : "2";
    global.data.CorreoElectronico = $('#cita_correo').val();
    global.data.Telefono = $('#cita_telefono').val();
    global.data.Password = null;

    global.data.cita.Nombre = global.data.Nombre;
    global.data.cita.Paterno = global.data.Paterno;
    global.data.cita.Materno = global.data.Materno;
    global.data.cita.FechaNacimiento = global.data.FechaNacimiento;
    global.data.cita.IdSexo = parseInt(global.data.IdSexo);
    global.data.cita.CorreoElectronico = global.data.CorreoElectronico;
    global.data.cita.TelefonoCelular = global.data.Telefono;
    global.data.cita.IdSession = idSesion;
    global.data.cita.IdUsuario = 3373;
    global.data.cita.OrigenCita = 30;
    global.data.cita.IdSucursal = parseInt(global.data.IdSucursal);
    global.data.cita.Referencia = $(':selected', '#selectReferencia').attr("text-referecia");
    global.data.cita.ReferenciaId = $('#selectReferencia').val();


    $("#cita_siguiente").prop("disabled", true);
}


async function startDatesPicker() {
    $('#dialog_link, ul#icons li').hover(function () { $(this).addClass('ui-state-hover'); }, function () { $(this).removeClass('ui-state-hover'); });
    var fechaFinOctubre = new Date("2020-10-31 00:00:00");
    $("#fechaCita").datepicker({
        minDate: 0,
        maxDate: fechaFinOctubre,
        dateFormat: 'dd-mm-yy',
    });
}

async function loadValuesCitaGratis() {
    $("#selectClinica").prop('disabled', false)
    $("#fechaCita").prop('disabled', false)
    $("#selectHorario").prop('disabled', false)
    await loadEstados()
    if (global.data.IdEstado && global.data.IdSucursal) {
        $('#selectEstado').val(global.data.IdEstado);
        getClinicasByEstado();
        $('#selectClinica').val(global.data.IdSucursal);
        idSucursal = global.data.IdSucursal;
    }
    else {
        return;
    }
    mastografia = getEstudio(3, idSucursal);
    $('#fechaCita').val(global.data.cita.Estudios[0].Fecha)
    getHorariosDisponibles({ ListaHorarios: [{ IdEstudio: 3, IdSucursal: parseInt(idSucursal), Fecha: global.data.cita.Estudios[0].Fecha, IdSubEstudioEncript: mastografia.data[0].Id }] }, '#selectHorario');
    $('#selectHorario').val(global.data.cita.Estudios[0].IdHora)
    $('#cita_nombre').val(global.data.Nombre);
    $('#cita_app').val(global.data.Paterno);
    $('#cita_apm').val(global.data.Materno);
    $('#cita_fechaNacimiento').val(global.data.FechaNacimiento);

    if (global.data.IdSexo == 2) {
        $("#fem").removeClass("active");
        $("#mas").addClass("active");

    } else {
        $("#fem").addClass("active");
        $("#mas").removeClass("active");
    }
    $('#cita_correo').val(global.data.CorreoElectronico);
    $('#cita_telefono').val(global.data.Telefono);
    $('#cita_telefono_confirm').val(global.data.Telefono);
    global.data.Password = null;
    $('#selectReferencia').val(global.data.cita.ReferenciaId)
    $(".cajas-texto .input-sd").addClass("valido");
    validaCitaGratis()
}


function secuenciaValidacion(selector) {
    console.log(selector);
    if (selector == '#selectClinica') {
        $("#selectEstado").parsley().validate();
        $("#selectClinica").parsley().validate();

    }
    else if (selector == "#fechaCita") {
        $("#selectEstado").parsley().validate();
        $("#selectClinica").parsley().validate();
        $("#fechaCita").parsley().validate();
    }
    else if (selector == "#selectHorario") {
        $("#selectEstado").parsley().validate();
        $("#selectClinica").parsley().validate();
        $("#fechaCita").parsley().validate();
        $("#selectHorario").parsley().validate();
    }
    else if (selector == "#cita_nombre") {
        $("#selectEstado").parsley().validate();
        $("#selectClinica").parsley().validate();
        $("#fechaCita").parsley().validate();
        $("#selectHorario").parsley().validate();
        $("#cita_nombre").parsley().validate();
    }
    else if (selector == "#cita_app") {
        $("#selectEstado").parsley().validate();
        $("#selectClinica").parsley().validate();
        $("#fechaCita").parsley().validate();
        $("#selectHorario").parsley().validate();
        $("#cita_nombre").parsley().validate();
        $("#cita_app").parsley().validate();
    }
    else if (selector == "#cita_apm") {
        $("#selectEstado").parsley().validate();
        $("#selectClinica").parsley().validate();
        $("#fechaCita").parsley().validate();
        $("#selectHorario").parsley().validate();
        $("#cita_nombre").parsley().validate();
        $("#cita_app").parsley().validate();
        $("#cita_apm").parsley().validate();
    }
    else if (selector == "#cita_fechaNacimiento") {
        $("#selectEstado").parsley().validate();
        $("#selectClinica").parsley().validate();
        $("#fechaCita").parsley().validate();
        $("#selectHorario").parsley().validate();
        $("#cita_nombre").parsley().validate();
        $("#cita_app").parsley().validate();
        $("#cita_apm").parsley().validate();
        $("#cita_fechaNacimiento").parsley().validate();
    }
    else if (selector == "#cita_telefono") {
        $("#selectEstado").parsley().validate();
        $("#selectClinica").parsley().validate();
        $("#fechaCita").parsley().validate();
        $("#selectHorario").parsley().validate();
        $("#cita_nombre").parsley().validate();
        $("#cita_app").parsley().validate();
        $("#cita_apm").parsley().validate();
        $("#cita_fechaNacimiento").parsley().validate();
        $("#cita_telefono").parsley().validate();
        $("#cita_telefono_confirm").parsley().validate();
    }
    else if (selector == "#cita_telefono_confirm") {
        $("#selectEstado").parsley().validate();
        $("#selectClinica").parsley().validate();
        $("#fechaCita").parsley().validate();
        $("#selectHorario").parsley().validate();
        $("#cita_nombre").parsley().validate();
        $("#cita_app").parsley().validate();
        $("#cita_apm").parsley().validate();
        $("#cita_fechaNacimiento").parsley().validate();
        $("#cita_telefono").parsley().validate();
        $("#cita_telefono_confirm").parsley().validate();
    }
    else if (selector == "#cita_correo") {
        $("#selectEstado").parsley().validate();
        $("#selectClinica").parsley().validate();
        $("#fechaCita").parsley().validate();
        $("#selectHorario").parsley().validate();
        $("#cita_nombre").parsley().validate();
        $("#cita_app").parsley().validate();
        $("#cita_apm").parsley().validate();
        $("#cita_fechaNacimiento").parsley().validate();
        $("#cita_telefono").parsley().validate();
        $("#cita_telefono_confirm").parsley().validate();
        $("#cita_correo").parsley().validate();
    }
    else if (selector == "#selectReferencia") {
        $("#selectEstado").parsley().validate();
        $("#selectClinica").parsley().validate();
        $("#fechaCita").parsley().validate();
        $("#selectHorario").parsley().validate();
        $("#cita_nombre").parsley().validate();
        $("#cita_app").parsley().validate();
        $("#cita_apm").parsley().validate();
        $("#cita_fechaNacimiento").parsley().validate();
        $("#cita_telefono").parsley().validate();
        $("#cita_telefono_confirm").parsley().validate();
        $("#cita_correo").parsley().validate();
        $("#selectReferencia").parsley().validate();
    }
    else if (selector == "#chkPromo") {
        $("#selectEstado").parsley().validate();
        $("#selectClinica").parsley().validate();
        $("#fechaCita").parsley().validate();
        $("#selectHorario").parsley().validate();
        $("#cita_nombre").parsley().validate();
        $("#cita_app").parsley().validate();
        $("#cita_apm").parsley().validate();
        $("#cita_fechaNacimiento").parsley().validate();
        $("#cita_telefono").parsley().validate();
        $("#cita_telefono_confirm").parsley().validate();
        $("#cita_correo").parsley().validate();
        $("#selectReferencia").parsley().validate();
        $("#chkPromo").parsley().validate();
    }
    else if (selector == "#chkBeneficiarios") {
        $("#selectEstado").parsley().validate();
        $("#selectClinica").parsley().validate();
        $("#fechaCita").parsley().validate();
        $("#selectHorario").parsley().validate();
        $("#cita_nombre").parsley().validate();
        $("#cita_app").parsley().validate();
        $("#cita_apm").parsley().validate();
        $("#cita_fechaNacimiento").parsley().validate();
        $("#cita_telefono").parsley().validate();
        $("#cita_telefono_confirm").parsley().validate();
        $("#cita_correo").parsley().validate();
        $("#selectReferencia").parsley().validate();
        $("#chkPromo").parsley().validate();
        $("#chkBeneficiarios").parsley().validate();
    }
    else if (selector == "#chkEdad") {
        $("#selectEstado").parsley().validate();
        $("#selectClinica").parsley().validate();
        $("#fechaCita").parsley().validate();
        $("#selectHorario").parsley().validate();
        $("#cita_nombre").parsley().validate();
        $("#cita_app").parsley().validate();
        $("#cita_apm").parsley().validate();
        $("#cita_fechaNacimiento").parsley().validate();
        $("#cita_telefono").parsley().validate();
        $("#cita_telefono_confirm").parsley().validate();
        $("#cita_correo").parsley().validate();
        $("#selectReferencia").parsley().validate();
        $("#chkPromo").parsley().validate();
        $("#chkBeneficiarios").parsley().validate();
        $("#chkEdad").parsley().validate();
    }

}
function clickFem() {
    saveAnalytics('cambioDeCampo', 'entrada-texto', 'Paso 5: Elegir Sexo');
    console.log('thisF')

    if (!$("#fem").hasClass("active")) {
        $("#fem").addClass("active");
        $("#mas").removeClass("active");
    }
}

function clickMas() {
    console.log('thisM')
    saveAnalytics('cambioDeCampo', 'entrada-texto', 'Paso 5: Elegir Sexo');
    if (!$("#mas").hasClass("active")) {
        $("#mas").addClass("active");
        $("#fem").removeClass("active");
    }
}

var date = moment.utc().format();
var minDate = moment.utc(date).local().format("DD-MM-YYYY");

function isValidDate(s) {
    var re = new RegExp("[0-9-]+$");
    if (re.test(s)) {
        var bits = s.split('-');
        if (bits[2] < 1900) {
            $("#invalidDate").text("Fecha Invalida, el año no puede ser menor a 1900")
            return false
        }
        else if (s > minDate) {
            $("#invalidDate").text("Fecha Invalida, la fecha de nacimiento no puede ser mayor a la fecha actual")
            return false
        }
        else {
            $("#invalidDate").empty()
            return true
        }
    } else{
        $("#invalidDate").text("Ingresa una fecha válida, ejemplo: 25-06-1990")
        return false
    }
}