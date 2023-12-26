function CrearEnlace(){
  cel = document.getElementById('celular').value;
  //men = document.getElementById('mensaje').value.split('\n');
  men = document.getElementById('mensaje').value.replaceAll("\n","%0A");
  //men = "Hola.%0ATe saludo." //Salto de línea %0A, Espacio %20
  modoEnvio = document.querySelectorAll('input[name=modo]');
  mod = "web";
  if(modoEnvio[1].checked){
    mod = "api";
  }

  if(cel.length == 9){
    window.open(`https://${mod}.whatsapp.com/send?phone=51${cel}&text=${men}`)
  }
  else {
    if (cel.length > 9) {
      window.open(`https://${mod}.whatsapp.com/send?phone=${cel}&text=${men}`)
    }
    else {
      if (confirm ("Posiblemente falte números. Para omitir este mensaje presione ACEPTAR.")) {
        window.open(`https://${mod}.whatsapp.com/send?phone=51${cel}&text=${men}`)
      }
    }
  }
}

function CrearConcatenar(){
    cel = document.getElementById('celular').value;
    //men = document.getElementById('mensaje').value.split('\n');
    men = document.getElementById('mensaje').value.replaceAll("\n","%0A");
    //men = "Hola.%0ATe saludo." //Salto de línea %0A, Espacio %20
  
    if(cel.length == 9){
      concat = "https://wa.me/51[CELDA_CELULAR]?text=" + men
    }
    else {
      if (cel.length > 9) {
        concat = "https://wa.me/[CELDA_CELULAR]?text=" + men
      }
      else {
        if (confirm ("Posiblemente falte números. Para omitir este mensaje presione ACEPTAR.")) {
            concat = "https://wa.me/51[CELDA_CELULAR]?text=" + men
        }
      }
    }
    concat = '=HIPERVINCULO(CONCATENAR("' + concat + '"))';
    concat = concat.replaceAll('[','";').replaceAll(']',';"');
    document.getElementById('concatenar').value = concat;   
  }

  function CrearConcatenarApi(){
  cel = document.getElementById('celular').value;
  //men = document.getElementById('mensaje').value.split('\n');
  men = document.getElementById('mensaje').value.replaceAll("\n","%0A");
  //men = "Hola.%0ATe saludo." //Salto de línea %0A, Espacio %20

  if(cel.length == 9){
    concat = "https://api.whatsapp.com/send?phone=51[CELDA_CELULAR]&text=" + men
  }
  else {
    if (cel.length > 9) {
      concat = "https://api.whatsapp.com/send?phone=[CELDA_CELULAR]&text=" + men
    }
    else {
      if (confirm ("Posiblemente falte números. Para omitir este mensaje presione ACEPTAR.")) {
          concat = "https://api.whatsapp.com/send?phone=51[CELDA_CELULAR]&text=" + men
      }
    }
  }
  concat = '=HIPERVINCULO(CONCATENAR("' + concat + '"))';
  concat = concat.replaceAll('[','";').replaceAll(']',';"');
  document.getElementById('concatenar').value = concat;   
}

function PresionarEnter(e){
  if (e.keyCode === 13) {
    e.preventDefault();
    CrearEnlace();
  }
}