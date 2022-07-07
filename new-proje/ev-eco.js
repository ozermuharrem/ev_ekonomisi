/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ev-eco.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mozer <mozer@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/07 01:04:13 by mozer             #+#    #+#             */
/*   Updated: 2022/07/07 03:29:14 by mozer            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let gelir = [{
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
}];

let gelirSave = document.querySelector("#gelirSave");
let kisi = document.querySelector("#kisi");
let tutar = document.querySelector("#tutar");
let gelirList = document.querySelector("#gelirList");
let dataList = document.querySelector("#dataList");
let gelirToplam = document.querySelector(".gelirToplam");
let toplam = 0;

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
        `<li class="list-group-item">
            <span>${index.tur} </span>
            <span>${index.kisi} </span>
            <span>${index.tutar} </span>
        </li>`

        gelirList.insertAdjacentHTML("beforeend",list);
    }

}

let inputValueClear = () =>{
    kisi.value = "";
    tutar.value = "";
}

let toplamGoster = () =>{

    for(let i of gelir)
    {
        toplam = toplam + i.tutar;
    }
    gelirToplam.innerHTML = toplam;
}
toplamGoster();
function gelirEkle(e){ 

    console.log("tıkladın beni zalim");

    if(dataList.value == "" || kisi.value == "" || tutar.value == "")
        alert("Lütfen Değerleri Tam ve Ekksiksiz Giriniz");
    else{
        gelir.push({
            "id" : gelir.length+1,
            "tur" : dataList.value,
            "kisi" : kisi.value,
            "tutar" : parseInt(tutar.value)
        })
        inputValueClear();
        displayList();
    }

    toplamGoster();

    console.log(toplam);
    e.preventDefault();

    console.log(gelir);
}




