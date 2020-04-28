const url = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
})

function fetchDogs(event){
    fetch(url)
    .then(resp => resp.json())
    .then(dogs => { 
        dogs.forEach(dog => renderDogsTable(dog)) })
}

function renderDogsTable(dog) {
    const table = document.getElementById("table-body")
    const tableRow = document.createElement("tr")
    const tableDataName = document.createElement("td")
    const tableDataBreed = document.createElement("td")
    const tableDataSex = document.createElement("td")
    const tableButton = document.createElement("button")
    table.appendChild(tableRow).append(tableDataName, tableDataBreed, tableDataSex, tableButton)
    tableDataName.innerText = dog.name
    tableDataBreed.innerHTML = dog.breed
    tableDataSex.innerHTML = dog.sex
    tableButton.innerHTML = "Edit Dog"
    tableButton.onclick = () => editDog(dog.name, dog.breed, dog.sex, dog.id)
}

function editDog(name, breed, sex, id) {
    const form = document.getElementById("dog-form")
    form.name.value = name
    form.breed.value = breed
    form.sex.value = sex
    form.reset()
    form.onsubmit = () => submitChangeDog(event, name.value, breed.value, sex.value, id, form)
}

function submitChangeDog(event, name, breed, sex, id, form) {
    event.preventDefault()
    const obj = {
        name: name,
        breed: breed,
        sex: sex
    }
    form.reset()
    fetch(`http://localhost:3000/dogs/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accepts: "application/json"
        },
        body: JSON.stringify(obj)
    }).then(fetchDogs())
}