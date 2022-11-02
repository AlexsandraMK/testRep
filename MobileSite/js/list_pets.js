function writeOnHtmlPagePetsList(UserId, PetName, PetAge, PetBreed, PetPhoto, PetId){
    let divItem = document.createElement("div")
    let divCard = document.createElement("div")
    let divCardText = document.createElement("div")
    let divPetName = document.createElement("div")
    let divPetDesc = document.createElement("div")
    let divPetAge = document.createElement("div")
    let divPetAgeTitle = document.createElement("div")
    let divPetAgeValue = document.createElement("div")
    let divPetBreed = document.createElement("div")
    let divPetBreedTitle = document.createElement("div")
    let divPetBreedValue = document.createElement("div")

    divItem.className = "list-item"
    divItem.id = "pet_" + UserId + "_" + PetId;
    //divA in divItem
    let divA = document.createElement("a")
    divA.className = "to-pet-profile"
    divA.href = "#"
    //divCard in divA
    divCard.className = "pet-card"
    let divCardImg = document.createElement("img")
    divCardImg.className = "pet-card-image"
    if(PetPhoto == "" || PetPhoto == null)
     {
     divCardImg.src = "/MobileSite/resourse/img.png"
     }
    else {
    divCardImg.src = PetPhoto //фото Ирочки
    }

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

    if(PetAge == null) divPetAge.style.visibility = "hidden"
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

function showListOfPets(user, pets_list)
{
 let count_of_pets = pets_list.object.length;

    for(let i = 0; i < count_of_pets; i++){
        writeOnHtmlPagePetsList(user.user_id, pets_list.object[i].pet_name, pets_list.object[i].pet_age, pets_list.object[i].breed_id, pets_list.object[i].photo, i);
    }
}

import { createRequest } from './klient.js';

let url = new URL(document.URL)
let pets_list
document.addEventListener("DOMContentLoaded", () => {

    let user = {
        user_id: url.searchParams.get("user_id")
    };

    pets_list = createRequest("/pets_list", user);
    pets_list = JSON.parse(pets_list);

    showListOfPets(user, pets_list)


});

document.getElementById("reg").onclick = function(){

                                         let pet =
                                         {
                                            user_id : url.searchParams.get("user_id"),
                                            name: document.getElementById("pet_name").value,
                                            gender: document.getElementById("pet_gender").selectedIndex,
                                            date_of_birth: document.getElementById("pet_date_of_birth").value,
                                            age:"",
                                            weight: "",
                                            breed_id: 1,
                                            photo: "",
                                            documents: "",
                                            id:""
                                         }

                                         let newPet = createRequest("/add_pet", pet) // Здесь Саша вернет id и возраст потом как нибудь
                                         newPet = JSON.parse(newPet);
                                         alert(newPet)

                                         pet.name = newPet.object.pet_name;
                                         pet.gender = newPet.object.pet_gender;
                                         pet.age = newPet.object.pet_age;
                                         pet.breed_name = newPet.object.breed_name;
                                         pet.photo = newPet.object.photo;

                                         writeOnHtmlPagePetsList(pet.user_id, pet.name, pet.age, pet.breed_name, pet.photo, pet.id)
                                       }

