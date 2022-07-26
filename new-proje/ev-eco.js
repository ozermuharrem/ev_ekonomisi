/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ev-eco.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mozer <mozer@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/07 01:04:13 by mozer             #+#    #+#             */
/*   Updated: 2022/07/26 03:13:16 by mozer            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let gelir = [];/*= [{
    "id" : 1,
    "tur" : "Maaş",
    "kisi" : "Muharrem",
    "tutar" : 1750
},
{
    "id" : 2,
    "tur" : "Maaş",
    "kisi" : "Betül",
    "tutar" : 11500
}]*/;

let gelirSave = document.querySelector("#gelirSave");
let kisi = document.querySelector("#kisi");
let tutar = document.querySelector("#tutar");
let gelirList = document.querySelector("#gelirList");
let dataList = document.querySelector("#dataList");
let gelirToplam = document.querySelector(".gelirToplam");
//let deleteTask = document.querySelector("")
let toplam = 0;
let editId;
let isEditTask = false;
eventListener();
displayList();

function eventListener(){
    gelirSave.addEventListener("click",gelirEkle);

}

function displayList(){

    gelirList.innerHTML = "";

    for(let index of gelir)
    {
        let list = 
        `<li class="task list-group-item">
            ${index.tur} 
            ${index.kisi} 
            ${index.tutar}
            <div class="dropdown">
            <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-ellipsis"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a onclick="deleteTask(${index.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash-can"></i> Sil</a></li>
                <li><a onclick='editTask(${index.id}, "${index.tur}", "${index.kisi}", ${index.tutar})' class="dropdown-item" href="#"><i class="fa-solid fa-pen"></i> Düzenle</a></li>
        </ul>
        </li>`

        gelirList.insertAdjacentHTML("beforeend",list);
    }

}

let inputValueClear = () =>{
    kisi.value = "";
    tutar.value = "";
}

let toplamGoster = () =>{
    toplam = 0;
    for(let i of gelir)
    {
        toplam = toplam + i.tutar;
    }
    
    gelirToplam.innerHTML = toplam;
}

toplamGoster();


function gelirEkle(e){ 
    if(dataList.value == "" || kisi.value == "" || tutar.value == "")
        alert("Lütfen Değerleri Tam ve Eksiksiz Giriniz");
    else{
        if(!isEditTask)
        {
            gelir.push({
                "id" : gelir.length+1,
                "tur" : dataList.value,
                "kisi" : kisi.value,
                "tutar" : parseInt(tutar.value)
            })
        }
        else{
            for(let lst of gelir)
            {
                if(lst.id == editId)
                {
                    lst.tur = dataList.value;
                    lst.kisi = kisi.value;
                    lst.tutar = parseInt(tutar.value);
                }
                isEditTask = false;
            }
        }
 
        inputValueClear();
        toplamGoster();
        displayList();
    }

    e.preventDefault();
}

function deleteTask(id)
{
    let deleteId;

    for(let i in gelir)
    {
        if(gelir[i].id == 1)
        {
            deleteId = i;
        }
    }
    gelir.splice(deleteId,1);

    toplamGoster();
    displayList();
}

function editTask(taskId,taskTur,taskKisi,taskTutar){
    editId = taskId;
    isEditTask = true;
    dataList.value = taskTur;
    dataList.focus();
    kisi.value =  taskKisi;
    kisi.focus();
    tutar.value =  taskTutar;
    tutar.focus();

}