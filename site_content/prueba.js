// Función para obtener las columnas guardadas del LocalStorage
function obtenerColumnas() {
    const columnasJSON = localStorage.getItem('columnas');
    return JSON.parse(columnasJSON) || []; // Si no hay datos, devuelve un array vacío
}

// Función para obtener las columnas guardadas del LocalStorage
function obtenerTarjetas() {
    const tarjetasJSON = localStorage.getItem('tarjetas');
    return JSON.parse(tarjetasJSON) || []; // Si no hay datos, devuelve un array vacío
}

// Función para guardar las columnas en el LocalStorage
function guardarColumnas(columnas) {
    const columnasJSON = JSON.stringify(columnas);
    localStorage.setItem('columnas', columnasJSON);
}
 
// Función para guardar las columnas en el LocalStorage
function guardarTarjetas(tarjetas) {
    const tarjetasJSON = JSON.stringify(tarjetas);
    localStorage.setItem('tarjetas', tarjetasJSON);
}

// Función para agregar una nueva columna a la lista
function agregarColumna(id, title) {
    const columnas = obtenerColumnas();
    columnas.push({ id, title });
    guardarColumnas(columnas);
}

// Función para agregar una nueva columna a la lista
function agregarTarjetaStorage(card, column, text) {
    const tarjetas = obtenerTarjetas();
    console.log(tarjetas)
    tarjetas.push({ card, column, text});
    guardarTarjetas(tarjetas);
}

// Función para editar una columna en la lista
function editarTarjeta(card, column, newText) {
    const tarjetas = obtenerTarjetas();  
    const tarjetaEditada = tarjetas.find(tarjeta => tarjeta.card === card);
    if (tarjetaEditada) {
      tarjetaEditada.text = newText;
      tarjetaEditada.column = column;  
      guardarTarjetas(tarjetas);
      console.log('Tarjeta editada:', tarjetaEditada);
    } else {
      console.log('Tarjeta no encontrada');
    }
  }


function addColumn()
{
    const container = document.getElementsByClassName("columns-container")[0]
    const cantCol = document.getElementsByClassName("column").length;
    const newCol = document.createElement("div");
    newCol.className = "column";
    newCol.id = `${cantCol}`;
    newCol.innerHTML = '<h6 id="columnTitle">Ingrese título</h6><div class="cardContainer"></div><button onClick="javascript:agregarTarjeta(name)" name='+cantCol+' class="newCard">+ Nueva tarjeta</button>';
    const btn = document.getElementById("btnColumns");
    container.removeChild(btn);
    container.appendChild(newCol);
    container.appendChild(btn);
    agregarColumna(cantCol, "Columna x");
}

function agregarTarjeta(name){
    const newCard = document.createElement("div");
    const container = document.getElementById(name);
    const cardContainer = container.getElementsByClassName("cardContainer")[0];
    const cardAmount = container.getElementsByClassName("card").length;
    newCard.className = "card";
    newCard.innerHTML = `<p class="card-text" contenteditable="true" id="`+name+`card`+cardAmount+
    `" column="`+name+
    `">Ingrese título</p>${dropDownButton(name+"card"+cardAmount)}`;
    const cardText = newCard.getElementsByClassName("card-text")[0];
    cardText.style.color = "#5b5b5b";
    cardText.addEventListener("keydown", () => {
        if(cardText.textContent == "Ingrese título"){
            cardText.textContent = "";
            cardText.style.color = "#1d1d1d";
        }
    });
    cardText.addEventListener("blur", () => {
        editarTarjeta(cardText.id, name, cardText.textContent); 
        cardText.toggleAttribute("contenteditable");
        cardText.style.color = "#1d1d1d";
        if(cardText.textContent == "")
        {
            cardText.textContent = "Ingrese título";
        };

    })
    if(cardContainer.getElementsByClassName("card").length > 2)
    {
        cardContainer.setAttribute("style", "overflow-y: auto; overflow-x: hidden;")
    }
    cardContainer.appendChild(newCard);
    cardText.focus();
    agregarTarjetaStorage(cardText.id, name, cardText.textContent);
};



function deleteCard(id)
{
    const cardId = id;
    const card = document.getElementById(cardId);
    const confirmMessage = 'Quiere borrar la tarjeta "'+card.textContent+'"?';
    const userConfirmed = window.confirm(confirmMessage);
    
    if (userConfirmed) {
        card.parentElement.remove();    
        localStorage.removeItem(cardId);
    } 
}

function timer()
{
    const fechaActual = new Date();
    const hora = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();
    const segundos = fechaActual.getSeconds();
    const dia = fechaActual.getDate();
    const mes  = fechaActual.getMonth();
    const año  = fechaActual.getFullYear();

    console.log(`Día: ${dia}/${mes}/${año} Hora actual: ${hora}:${minutos}:${segundos}`);
}

function dropDownButton(id)
{
    const botonDropDown = `<div class="dropdown">
    <button type="button" class="three-dots" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
     onclick="javascript:overflowCalc('${id}')">...</button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" onclick="javascript:editCard('${id}')">Editar</a>
                <a class="dropdown-item" href="#" onclick="javascript:deleteCard('${id}')">Borrar</a>
                <a class="dropdown-item" href="#" onclick="javascript:dueCard('${id}')">Agregar fecha</a>
            </div>
        </div>`;
    
    return botonDropDown;
}

function editCard(id)
{
    const cardText = document.getElementById(id);
    cardText.style.color = "#5b5b5b";
    cardText.toggleAttribute("contenteditable");
    cardText.focus();
}

function dueCard(id)
{
    console.log("hacelo");
}

function overflowCalc(id)
{
    const card = document.getElementById(id).parentElement;
    const cardContainer = card.parentElement;
    if(cardContainer.getElementsByClassName("card").length < 3)
    {
        cardContainer.setAttribute("style", "overflow-y: visible; overflow-x: visible;")
    }
}