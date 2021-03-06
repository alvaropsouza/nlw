function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )  
}

populateUFs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    
    const ufValue = event.target.value

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false;
    } ) 
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Collect items

const itemsToColect = document.querySelectorAll(".items-grid li")

/*Easier way to select every item of a list u want, without using 'example.length; i++'*/
for(const item of itemsToColect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    // Add or remove a class with javascript '.toggle' do both(.add only add, .remove only remove)
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    // Verify if there's any item selected, (y)Grab the selected items
        const alreadySelected = selectedItems.findIndex( (item) =>  {
        const itemFound = item == itemId // Return true or false cause of double equals '=='(compares)
        return itemFound      
    } );
    
    // If this item is selected, remove from selection('selectItems')
    if(alreadySelected >= 0/*index position*/) {
        // Remove selection
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent   
        })
        selectedItems = filteredItems
    } else {
        // If not selected, add to selection
        selectedItems.push(itemId)
    } 

    // Update hidden input with selected items 
    collectedItems.value = selectedItems

}


