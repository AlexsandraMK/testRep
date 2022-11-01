export function writeOnHtmlPagePetsList(UserId, PetName, PetAge, PetBreed, PetPhoto, PetId){
    divItem = document.createElement("div")
    divCard = document.createElement("div")
    divCardText = document.createElement("div")
    divPetName = document.createElement("div")
    divPetDesc = document.createElement("div")
    divPetAge = document.createElement("div")
    divPetAgeTitle = document.createElement("div")
    divPetAgeValue = document.createElement("div")
    divPetBreed = document.createElement("div")
    divPetBreedTitle = document.createElement("div")
    divPetBreedValue = document.createElement("div")

    divItem.className = "list-item"
    divItem.id = "pet_" + UserId + "_" + PetId;
    //divA in divItem
    divA = document.createElement("a")
    divA.className = "to-pet-profile"
    divA.href = "#"
    //divCard in divA
    divCard.className = "pet-card"
    divCardImg = document.createElement("img")
    divCardImg.className = "pet-card-image"
    divCardImg.src = PetPhoto //фото Ирочки
    //divCardText in divCard
    divCardText.className = "pet-card-text"
    //divPetName and divPetDesc in divCardText
    divPetName.className = "pet-card-name" //Ирочка
    divPetName.textContent = PetName
    divPetDesc.className = "pet-card-description"
    //divPetAge and divPetBreed in divPetDesc
    divPetAge.className = "pet-card-age-line one-line"
        //divPetAgeTitle and divPetAgeValue in divPetAge
        divPetAgeTitle.className = "pet-card-desc-title" //Возраст
        divPetAgeTitle.textContent = "Возраст"
        divPetAgeValue.className = "pet-card-desc-value" //22
        divPetAgeValue.textContent = PetAge
        //--
    divPetBreed.className = "pet-card-breed-line one-line"
        //divPetBreedTitle and divPetBreedValue in divPetBreed
        divPetBreedTitle.className = "pet-card-breed-title pet-card-desc-title" //Порода
        divPetBreedTitle.textContent = "Порода"
        divPetBreedValue.className = "pet-card-breed-value pet-card-desc-value" //Человек-разумный
        divPetBreedValue.textContent = PetBreed
        //--

    // compose 
    //divPetBreed Compose
    divPetBreed.appendChild(divPetBreedTitle)
    divPetBreed.appendChild(divPetBreedValue)
    //divPetBreed Compose
    divPetAge.appendChild(divPetAgeTitle)
    divPetAge.appendChild(divPetAgeValue)
    //divPetDesc Compose
    divPetDesc.appendChild(divPetAge)
    divPetDesc.appendChild(divPetBreed)
    //divCardText Compose
    divCardText.appendChild(divPetName)
    divCardText.appendChild(divPetDesc)
    //divCardImg and divCardText in divCard
    divCard.appendChild(divCardImg)
    divCard.appendChild(divCardText)
    //divCard in divA
    divA.appendChild(divCard)
    //divA in divItem
    divItem.appendChild(divA)
    //search and add in pets_list
    document.getElementById("list_pets").appendChild(divItem)
    //move plus to end
    document.getElementById("list_pets").appendChild(document.getElementById("plus"))
}