  function read(k){
    cel = document.getElementById('celular');
    cel.value = cel.value + k;
  }
  
  function eliminar() {
    cel = document.getElementById('celular');
    cel.value = "";
  }
  
  function borrar() {
    cel = document.getElementById('celular');
    cel.value = cel.value.substring(0,cel.value.length-1);
  }
  
  function CrearEnlace(){
    cel = document.getElementById('celular').value;
    men = document.getElementById('mensaje').value;
    //men = "Hola.%0ATe saludo." //Salto de línea %0A, Espacio %20
    if(cel.length == 9){
      window.open("https://wa.me/51" + cel + "?text=" + men)
    }
    else {
      if (cel.length > 9) {
        window.open("https://wa.me/" + cel + "?text=" + men)
      }
      else {
        if (confirm ("Posiblemente falte números. Para omitir este mensaje presione ACEPTAR.")) {
          window.open("https://wa.me/51" + cel + "?text=" + men)
        }
      }
    }
  }