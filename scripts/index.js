let cards = document.getElementById("cards");
let añosExp;
let lstAñosExp = [];
let ruResult = [];
let cardId = 0;
$.ajax({
    /* desde url le pido que traiga 6 personas, de nacionalidades española, estadounidense, francesa y brasilera,
     y que solo me traiga nombre completo, foto y fecha nacimiento - edad (dob = date of birtday)*/
    url: 'https://randomuser.me/api/?results=6&nat=ES,US,FR,BR&inc=name,nat,dob,picture,id',
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
                <a href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="abrirModal(this, event)" class="btn btn-primary card-btn" id="${cardId}">Ver más</a>
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
    tituloModal.innerHTML = element.name.first+" "+element.name.last;
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

$(document).ready(function(){
    $('#enviarMail').submit(function(event){
       // Detener el envío del formulario normal
       event.preventDefault();
 
       // Enviar el formulario usando AJAX
       $.ajax({
          type: 'POST',
          url: 'https://formsubmit.co/93cb82c32ca4cf95c8febefe78285067',
          data: $(this).serialize()
       })
       .done(function(response){
          // Manejar la respuesta del servidor
          console.log(response);
          // Opcionalmente, mostrar un mensaje de éxito
          alert('Formulario enviado correctamente!');
       })
       .fail(function(data){
          // Manejar el error del servidor
          console.log(data);
          alert('Error al enviar el formulario');
       });
    });
 });
 

let precioDolarBlue;
// Utilizo otra API para obtener el precio del dolar blue (compra) para despues calcular cotizacion de tattoo 
$.ajax({
    url: 'https://www.dolarsi.com/api/api.php?type=valoresprincipales',
    dataType: 'json',
    success: function (data) {
        console.log(data[1].casa.nombre + " " + data[1].casa.compra);
        precioDolarBlue = data[1].casa.compra;
    }
});

