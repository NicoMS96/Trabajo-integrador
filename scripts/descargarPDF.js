 
// Función para descargar el PDF
function descargarPDF() {
  // Seleccionar el elemento que se va a imprimir
  const elemento = document.getElementById("modalCotizBody");

  // Generar la imagen a partir del elemento seleccionado
  html2canvas(elemento).then((canvas) => {
    // Obtener la imagen generada en formato PNG
    const imgData = canvas.toDataURL('image/png');

    // Crear un objeto PDF
    const pdf = new jsPDF();

    // Definir las dimensiones de la página
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Agregar la imagen al PDF
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Descargar el archivo PDF
    pdf.save('cotizacion.pdf');
  });
}

// Agregar el listener al botón de "Guardar PDF"
const btnDescargaPDF = document.getElementById("descargaPDF");
btnDescargaPDF.addEventListener('click', descargarPDF);
