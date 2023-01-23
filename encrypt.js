let textInput = document.getElementById("text-input");
let textOutput = document.getElementById("output");
let botonEncriptar = document.getElementById("encriptar");
let botonDesencriptar = document.getElementById("desencriptar");
let botonCopiar = document.getElementById("boton-copiar");
let mensajeOutputArea = document.getElementById("mensaje-output-area");
let modal = document.getElementById("modal");
let botonModal = document.createElement("button");
let textoEncriptado;
let textoDesencriptado;
botonCopiar.style.display = "none";

function validarMayusculas(texto) {
  var result = !/[A-Z]/.test(texto);
  if (result) {
    return false;
  } else {
    createModal();
    return true;
  }
}

function validarAcentuacion(texto) {
  var result = /[^\u0000-\u007F]/.test(texto);
  if (result) {
    createModal();
    return true;
  }
  return false;
}

function validarString(texto) {
  var result = /[^a-zA-Z\u00C0-\u017F\s]/.test(texto);
  if (texto === "") {
    createModal();
    return true;
  }
  if (result) {
    createModal();
    return true;
  }
  return false;
}

function validacionesEncriptacion(texto) {
  let valAecentuacion = validarAcentuacion(texto);
  let valMayusculas = validarMayusculas(texto);
  let valString = validarString(texto);
  if (
    valAecentuacion === false &&
    valMayusculas === false &&
    valString === false
  ) {
    textoDesencriptado = encriptar(texto);
    mostrarSalidaTextoEncriptado(textoDesencriptado);
  }
}

function validacionesDesencriptacion(texto) {
  let valAecentuacion = validarAcentuacion(texto);
  let valMayusculas = validarMayusculas(texto);
  let valString = validarString(texto);
  if (
    valAecentuacion === false &&
    valMayusculas === false &&
    valString === false
  ) {
    textoDesencriptado = desencriptar(texto);
    mostrarSalidaTextoDesencriptado(textoDesencriptado);
  }
}

function mostrarSalidaTextoEncriptado(texto) {
  textOutput.value = texto;
}

function mostrarSalidaTextoDesencriptado(texto) {
  textOutput.value = texto;
}

function createModal() {
  let miDiv = document.getElementById("modal-box");
  let miDiv2 = document.createElement("div");
  botonModal.setAttribute("id", "boton-modal");
  miDiv2.setAttribute("id", "modal");
  botonModal.innerText = "Aceptar";
  let miH1 = document.createElement("h1");
  let miH2 = document.createElement("h1");
  miH1.innerText = "Error";
  miH2.innerText =
    "El texto debe ser en su totalidad una cadena de texto en minúsculas y sin acentos.";
  miDiv2.appendChild(miH1);
  miDiv2.appendChild(miH2);
  miDiv2.appendChild(botonModal);
  miDiv.appendChild(miDiv2);
  botonEncriptar.disabled = true;
}

function encriptar(texto) {
  let textoArray = texto.split("");
  let newTextoArray = [];
  textoArray.map((x) => {
    if (x === "a") x = "ai";
    if (x === "e") x = "enter";
    if (x === "i") x = "imes";
    if (x === "o") x = "ober";
    if (x === "u") x = "ufat";
    newTextoArray.push(x);
  });
  let newString = newTextoArray.join("");
  textInput.value = "";
  return newString;
}

function desencriptar(texto) {
  let textoArray = texto.split("");
  let newTextoArray = [];
  for (let i = 0; i < textoArray.length; i++) {
    if (textoArray[i] === "i") {
      newTextoArray.push("i");
      i = i + 4;
    }
    if (textoArray[i] === "e") {
      newTextoArray.push("e");
      i = i + 5;
    }
    if (textoArray[i] === "a") {
      newTextoArray.push("a");
      i = i + 2;
    }
    if (textoArray[i] === "u") {
      newTextoArray.push("u");
      i = i + 4;
    }
    if (textoArray[i] === "a") {
      newTextoArray.push("a");
      i = i + 2;
    }
    if (textoArray[i] === "e") {
      newTextoArray.push("e");
      i = i + 5;
    }
    if (textoArray[i] === "o") {
      newTextoArray.push("o");
      i = i + 4;
    }
    if (textoArray[i] === "u") {
      newTextoArray.push("u");
      i = i + 4;
    }
    if (textoArray[i] === "i") {
      newTextoArray.push("i");
      i = i + 4;
    }
    if (textoArray[i] === "o") {
      newTextoArray.push("o");
      i = i + 4;
    }
    newTextoArray.push(textoArray[i]);
  }
  let newString = newTextoArray.join("");
  textInput.value = "";
  return newString;
}

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}

botonModal.onclick = () => {
  location.reload();
};

botonEncriptar.onclick = () => {
  validacionesEncriptacion(textInput.value);
  botonCopiar.style.display = "";
  mensajeOutputArea.style.display = "none";
  textOutput.style.backgroundImage = "none";
};

botonDesencriptar.onclick = () => {
  validacionesDesencriptacion(textInput.value);
  //desencriptar(textInput.value);
  botonCopiar.style.display = "";
  mensajeOutputArea.style.display = "none";
  textOutput.style.backgroundImage = "none";
};

botonCopiar.onclick = () => {
  copyTextToClipboard(textOutput.value);
  textOutput.value = "";
  botonCopiar.style.display = "none";
  mensajeOutputArea.style.display = "";
  textOutput.style.backgroundImage = "";
};
