// - On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.

document.addEventListener("DOMContentLoaded", () => {
    console.log("Hello")
    fetchDogs()
})

function fetchDogs() {
    fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(dogArray => {
        const tableBody = document.getElementById("table-body")
        tableBody.innerText = ""
        dogArray.forEach(dog => {
            renderDogs(dog, tableBody)
        })})
}

function renderDogs(dog, tableBody) {
    const tr = document.createElement("tr")
    const tdName = document.createElement("td")
    tdName.innerText = dog.name
    const tdBreed = document.createElement("td")
    tdBreed.innerText = dog.breed
    const tdSex = document.createElement("td")
    tdSex.innerText = dog.sex
    const tdButton = document.createElement("td")
    const button = document.createElement("button")
    button.innerText = "Edit Dog"

    tdButton.appendChild(button)
    tr.append(tdName, tdBreed, tdSex, tdButton)
    tableBody.appendChild(tr)

    button.onclick = () => editDog(dog)
}

// - Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.

function editDog(dog) {
    let form = document.getElementById("dog-form")
    form.name.value = dog.name
    form.breed.value = dog.breed
    form.sex.value = dog.sex

    form.onsubmit = () => submitForm(event, form, dog)
    // form.addEventListener("submit", () => {submitForm(event, form, dog)})

    }

// - On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).

function submitForm(event, form, dog) { 
    event.preventDefault()   
    let obj = {
        name: form.name.value,
        breed: form.breed.value,
        sex: form.sex.value
    }
    form.reset()
    fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accepts: "application/json"
        },
        body: JSON.stringify(obj)
    })
    .then(fetchDogs())
    
}