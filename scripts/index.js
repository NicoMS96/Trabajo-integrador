let cards = document.getElementById("cards");
let añosExp;
let lstAñosExp = [];
let ruResult = [];
let cardId = 0;
$.ajax({
  /* desde url le pido que traiga 6 personas, de nacionalidades española, estadounidense, francesa y brasilera,
   y que solo me traiga nombre completo, foto y fecha nacimiento - edad (dob = date of birtday)*/
  url: 'https://randomuser.me/api/?results=6&nat=ES,US,FR,BR&inc=name,nat,dob,picture',
  dataType: 'json',
  success: function (data) {
    data.results.forEach(element => {
      ruResult.push(element);
      // realizo un calculo random que vaya del 1 al 9 para usarlo en el texto como año de experiencia
      añosExp = Math.ceil((Math.random() * 8));
      lstAñosExp.push(añosExp);
      // cuerpo de texto del personal completo que despues se muestra en el modal
      let textoLargo = `Gran artista de la industria. Con más de ${añosExp} años de experiencia en el arte del tatuaje, ${element.name.first} ha perfeccionado su técnica para crear diseños únicos y personalizados que se ajustan a las necesidades y deseos de sus clientes.
            La pasión de ${element.name.first} por la creatividad y el arte le ha llevado a crear algunas de las obras de arte corporales más impresionantes en la industria del tatuaje. Su atención al detalle y su habilidad para crear diseños originales han hecho que muchos de sus clientes vuelvan a él una y otra vez. 
            Entre las especialidades de ${element.name.first} se encuentran los tatuajes realistas, estilo acuarela, puntillismo, entre otros. Su capacidad para mezclar técnicas y estilos en un solo diseño lo convierte en uno de los tatuadores más versátiles en el mercado.
            Si buscas una experiencia de tatuaje única y personalizada, ${element.name.first} es la elección perfecta para ti. Su creatividad, profesionalismo y experiencia te aseguran un diseño de tatuaje que será una obra de arte en tu piel.`;

      // cuerpo del texto corto que es utilizado en las cards
      let textoCorto = textoLargo.substring(0, 120);

      cards.innerHTML += `<div class="card" style="width: 18rem;">
            <img src="${element.picture.large}" class="card-img-top mt-2" alt="Foto de una persona">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${element.name.first} ${element.name.last} <span class="fi fi-${element.nat.toLowerCase()}"></span> 
                </h5>
                <p class="card-text">${textoCorto}...</p>
                <a href="#" data-bs-toggle="modal" data-bs-target="#modalCards" onclick="abrirModal(this, event)" class="btn btn-primary card-btn" id="${cardId}">Ver más</a>
            </div>
        </div>`;
      cardId++;
    });
  }
});

function abrirModal(btn, e) {
  e.preventDefault();
  element = ruResult[btn.id];
  let textoLargo = `Gran artista de la industria. Con más de ${lstAñosExp[btn.id]} años de experiencia en el arte del tatuaje, ${element.name.first} ha perfeccionado su técnica para crear diseños únicos y personalizados que se ajustan a las necesidades y deseos de sus clientes.
            La pasión de ${element.name.first} por la creatividad y el arte le ha llevado a crear algunas de las obras de arte corporales más impresionantes en la industria del tatuaje. Su atención al detalle y su habilidad para crear diseños originales han hecho que muchos de sus clientes vuelvan a él una y otra vez. 
            Entre las especialidades de ${element.name.first} se encuentran los tatuajes realistas, estilo acuarela, puntillismo, entre otros. Su capacidad para mezclar técnicas y estilos en un solo diseño lo convierte en uno de los tatuadores más versátiles en el mercado.
            Si buscas una experiencia de tatuaje única y personalizada, ${element.name.first} es la elección perfecta para ti. Su creatividad, profesionalismo y experiencia te aseguran un diseño de tatuaje que será una obra de arte en tu piel.`;

  // Cargo datos al modal
  let tituloModal = document.getElementById("modalNombres");
  let modalBody = document.getElementById("modalBody");
  tituloModal.innerHTML = element.name.first + " " + element.name.last;
  modalBody.innerHTML = `<div class="d-flex align-items-center flex-column"> <img style="width:200px;" src=${element.picture.large} /> <p class="pt-2">${textoLargo} </p></div>`;
}


// no funciona
$(document).ready(function () {
  $('#1').click(function (e) {
    e.preventDefault();
    alert("asd");
  });
});

// Enviar mail
$(document).ready(function () {
  $('#enviarMail').submit(function (event) {
    // Detener el envío del formulario normal
    event.preventDefault();

    // Enviar el formulario usando AJAX
    $.ajax({
      type: 'POST',
      url: 'https://formsubmit.co/93cb82c32ca4cf95c8febefe78285067',
      data: $(this).serialize()
    })
      .done(function (response) {
        // Manejar la respuesta del servidor
        console.log(response);
        // Opcionalmente, mostrar un mensaje de éxito
        alert('Formulario enviado correctamente!');
      })
      .fail(function (data) {
        // Manejar el error del servidor
        console.log(data);
        alert('Error al enviar el formulario');
      });
  });
});


let precioDolarBlue = 0;
// Utilizo otra API para obtener el precio del dolar blue (compra) para despues calcular cotizacion de tattoo 
$.ajax({
  url: 'https://www.dolarsi.com/api/api.php?type=valoresprincipales',
  dataType: 'json',
  success: function (data) {
    console.log(data[1].casa.nombre + " " + data[1].casa.compra);
    precioDolarBlue = data[1].casa.compra;
  }
});




// Variables para controlar el formulario
const form = document.getElementById('form-wizard');
const prev1 = document.getElementById('prev-2');
const prev2 = document.getElementById('prev-3');
const next1 = document.getElementById('next-1');
const next2 = document.getElementById('next-2');
const steps = form.querySelectorAll('fieldset');
let currentStep = 0;

// Funciones para avanzar y retroceder en los pasos
function showStep(step) {
  steps[currentStep].style.display = 'none';
  steps[step].style.display = 'block';
  currentStep = step;
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    showStep(currentStep + 1);
  }
}

function prevStep() {
  if (currentStep > 0) {
    showStep(currentStep - 1);
  }
}

// Event listeners para los botones de avanzar y retroceder
next1.addEventListener('click', nextStep);
next2.addEventListener('click', nextStep);
prev1.addEventListener('click', prevStep);
prev2.addEventListener('click', prevStep);

// Ocultar todos los pasos excepto el primero
for (let i = 1; i < steps.length; i++) {
  steps[i].style.display = 'none';
}


let porcentajes = 0;
let precioTattoo = 0;
// validar cotizacion 
$(document).ready(function () {
  precio = $("#precio");

  $("#color").click(() => {
    if ($("#color").is(':checked')) {
      porcentajes += 0.1;
    }
    else {
      porcentajes -= 0.1;
    }
    totalTattoo(precioTattoo, porcentajes);
  })

  $("#personalizado").click(() => {
    if ($("#personalizado").is(':checked')) {
      porcentajes += 0.2;
    }
    else {
      porcentajes -= 0.2;
    }
    totalTattoo(precioTattoo, porcentajes);
  })

  $("#anestesia").click(() => {
    if ($("#anestesia").is(':checked')) {
      precioTattoo += 8;
    }
    else {
      precioTattoo -= 8;
    }
    totalTattoo(precioTattoo, porcentajes);
  })


  let tamañoAnterior = null;

  $("#tamaño").change(() => {
    const tamañoSeleccionado = Number($("#tamaño").val());

    precioTattoo -= tamañoAnterior;

    precioTattoo += tamañoSeleccionado;

    tamañoAnterior = tamañoSeleccionado;
    totalTattoo(precioTattoo, porcentajes);
  });

  let detalleAnterior = null;
  $("#detalles").change(() => {
    const detalleSeleccionado = Number($("#detalles").val());

    porcentajes -= detalleAnterior;

    porcentajes += detalleSeleccionado;

    detalleAnterior = detalleSeleccionado;
    totalTattoo(precioTattoo, porcentajes);
  });

  let estiloAnterior = null;
  $("#estilo").change(() => {
    const estiloSeleccionado = Number($("#estilo").val());

    precioTattoo -= estiloAnterior;

    precioTattoo += estiloSeleccionado;

    estiloAnterior = estiloSeleccionado;
    totalTattoo(precioTattoo, porcentajes);
  });

  let lugarAnterior = null;
  $("#lugar").change(() => {
    const lugarSeleccionado = Number($("#lugar").val());

    precioTattoo -= lugarAnterior;

    precioTattoo += lugarSeleccionado;

    lugarAnterior = lugarSeleccionado;
    totalTattoo(precioTattoo, porcentajes);
  });

  let precioTotal;
  totalTattoo = function (precioTattoo, porcentajes) {
    precioBase = precioTattoo;
    precioTotal = precioTattoo * (1 + porcentajes);
    precio.text(`$${(precioTattoo * (1 + porcentajes)).toFixed("2")}`);
  }


  // Agregar controlador de eventos al botón Cotizar
  $('#form-wizard').on('submit', function (event) {
    event.preventDefault();

    let tamaño = Number($('#tamaño').val());
    let detalles = Number($('#detalles').val());
    let estilo = Number($('#estilo').val());
    let lugar = Number($('#lugar').val());
    let opcTamaño = $('#tamaño option:selected').text();
    let opcDetalles = $('#detalles option:selected').text();
    let opcLugar = $('#lugar option:selected').text();
    let opcColor = $('#color').is(":checked") ? "Si" : "No";
    let porcColor = $('#color').is(":checked") ? 0.1 : 0;
    let opcEstilo = $('#estilo option:selected').text();
    let opcPerso = $('#personalizado').is(":checked") ? "Si" : "No";
    let porcPerso = $('#personalizado').is(":checked") ? 0.2 : 0;
    let opcAnestesia = $('#anestesia').is(":checked") ? "Si" : "No";
    let anestesia = $('#personalizado').is(":checked") ? 8 : 0;
     
    totalTattoo(precioTattoo, porcentajes);

    //if (validarCotizacion(tamaño, detalles, estilo, lugar)) {
    let divDatos = $("#datosResumen");
    divDatos.html(`<div class="d-flex justify-content-between"> 
                      <span>Tamaño: ${opcTamaño} </span><span>$${tamaño}</span>
                    </div>
                    <div class="d-flex justify-content-between"> 
                      <span>Color: ${opcColor} </span><span>10% ($${(precioBase * porcColor).toFixed("2")})</span>
                    </div>
                    <div class="d-flex justify-content-between"> 
                      <span>Detalles: ${opcDetalles} </span><span>${(detalles * 100)}% ($${(precioBase * detalles).toFixed("2")})</span>
                    </div>
                    <div class="d-flex justify-content-between"> 
                      <span>Estilo: ${opcEstilo} </span><span>$${estilo}</span>
                    </div>
                    <div class="d-flex justify-content-between"> 
                      <span>Diseño personalizado?: ${opcPerso} </span><span>10% ($${(precioBase * porcPerso).toFixed("2")})</span>
                    </div>
                    <div class="d-flex justify-content-between"> 
                      <span>Lugar: ${opcLugar} </span><span>$${lugar}</span>
                    </div>
                    <div class="d-flex justify-content-between"> 
                      <span>Anestesia?: ${opcLugar} </span><span>$${anestesia}</span>
                    </div>
                    <div class="d-flex justify-content-between"> 
                      <span> </span><span>Precio total: $${(precioTotal).toFixed("2")}</span>
                    </div>
                    `);


    // }

  });
});



let validarCotizacion = function (tamaño, detalles, estilo, lugar) {
  let valido = true;
  let mensaje = "";

  if (tamaño == "") {
    valido = false;
    mensaje += "Seleccione el tamaño del tattoo. \n";
  }
  if (detalles == "") {
    valido = false;
    mensaje += "Ingrese detalles sobre el diseño del tattoo. \n";
  }
  if (estilo == "") {
    valido = false;
    mensaje += "Seleccione el estilo del tattoo. \n";
  }
  if (lugar == "") {
    valido = false;
    mensaje += "Seleccione el lugar donde quiere el tattoo. \n";
  }

  if (!valido) {
    alert(mensaje);
  }

  return valido;
}
