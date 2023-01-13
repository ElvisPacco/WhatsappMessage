var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if ( aname < bname ) return -1;
      else if ( aname == bname ) return 0;
      else return +1;
  });
  var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  for(i = 2; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(num){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputTxt.value !== '') {
    //var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    var utterThis = new SpeechSynthesisUtterance(num);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

inputForm.onsubmit = function(event) {
  event.preventDefault();

  speak();

  inputTxt.blur();
}

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
  rateValue.textContent = rate.value;
}

voiceSelect.onchange = function(){
  speak();
}

function speakNumber (num){
  const synth = window.speechSynthesis
      const utterThis = new SpeechSynthesisUtterance(num)
      utterThis.voice = voices[2];
      utterThis.rate = 1;
      utterThis.lang = 'es-ES';
      synth.speak(utterThis);
}

function read(k){
  cel = document.getElementById('celular');
  cel.value = cel.value + k;
  //No se escuchará 
  //speak(k);
  speakNumber(k);
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
  //men = document.getElementById('mensaje').value.split('\n');
  men = document.getElementById('mensaje').value.replaceAll("\n","%0A");
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
