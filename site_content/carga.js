import data from '/elements.json' assert { type: 'json' };
import './prueba.js'
function setItems()
{  
    guardarColumnas(data["columns"]);
    guardarTarjetas(data["cards"]);
}

setItems()

function loadColumns()
{
    const container = document.getElementsByClassName("columns-container")[0];
    const columns = obtenerColumnas();
    const btn = document.getElementById("btnColumns");
    container.removeChild(btn);
    columns.forEach(column => {
        const newCol = createColumn(column); 
        container.appendChild(newCol);
    })
    container.appendChild(btn);

}

function createColumn(column)
{
    const newCol = document.createElement("div");
    newCol.className = "column";
    newCol.id = column.id;
    newCol.innerHTML = '<h6 id="columnTitle" >'+column.title+
    '</h6><div class="cardContainer"></div><button onClick="javascript:agregarTarjeta(name)" ' 
    +'name='+column.id+' class="newCard">+ Nueva tarjeta</button>';
    return newCol;
}

function loadCards()
{
    const cards = obtenerTarjetas();
    cards.forEach(card => {
        const newCard = createCard(card); 
        const actualColumn = document.getElementById(card.column);
        const cardContainer = actualColumn.getElementsByClassName("cardContainer")[0];
        const cardText = newCard.getElementsByClassName("card-text")[0];
        cardText.addEventListener("blur", () => {
            editarTarjeta(cardText.id, card.column, cardText.textContent); 
            cardText.toggleAttribute("contenteditable");
            cardText.style.color = "#1d1d1d";
            if(cardText.textContent == "")
            {
                cardText.textContent = "Ingrese título";
            };
        })
        cardContainer.appendChild(newCard);
    })
}

function createCard(card)
{
    const newCard = document.createElement("div");
    newCard.className = "card";
    const cardTitle= card.text;
    const dropDown = dropDownButton("b"+card.card)
    newCard.innerHTML = `<p class="card-text" id="`+card.card+`" column="`
    +card.column+`">`+cardTitle+`</p>`+dropDown;
    newCard.setAttribute("draggable","true");
    return newCard
}

function dropDownButton(id)
{
    const botonDropDown = `<div class="dropdown">
    <button type="button" class="three-dots" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
    onclick="javascript:overflowCalc('${id.substring(1)}')">...</button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" onclick="javascript:editCard('${id.substring(1)}')">Editar</a>
                <a class="dropdown-item" href="#" onclick="javascript:deleteCard('${id.substring(1)}')">Borrar</a>
                <a class="dropdown-item" href="#" onclick="javascript:dueCard('${id.substring(1)}')">Agregar fecha</a>
            </div>
        </div>`;
    
    return botonDropDown;
}

function initializeDragAndDrop() {
    const cards = document.querySelectorAll('.card');
    const containers = document.querySelectorAll('.column');
  
    cards.forEach(card => {
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);
    });
  
    containers.forEach(container => {
        container.addEventListener('dragover', dragOver);
        container.addEventListener('dragenter', dragEnter);
        container.addEventListener('dragleave', dragLeave);
        container.addEventListener('drop', drop);
    });
  
    let draggedCard = null;
  
    function dragStart(event) {
        draggedCard = this;
        setTimeout(() => {
            this.style.display = 'none';
        }, 0);
    }
  
    function dragEnd() {
        draggedCard.style.display = 'block';
        draggedCard = null;
    }
  
    function dragOver(event) {
        event.preventDefault();
    }
  
    function dragEnter(event) {
        event.preventDefault();
        this.classList.add('dragover');
    }
  
    function dragLeave() {
        this.classList.remove('dragover');
    }
  
    function drop() {
        const cardCon = this.getElementsByClassName("cardContainer")[0];
        cardCon.appendChild(draggedCard);
        const cardText = draggedCard.getElementsByClassName("card-text")[0];
        console.log(cardText)
        console.log(cardText.column)
        editarTarjeta(cardText.id, cardText.column, cardText.textContent);
        cardCon.classList.remove('dragover');
    }
  }


loadColumns()
loadCards()


initializeDragAndDrop();

