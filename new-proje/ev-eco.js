/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ev-eco.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mozer <mozer@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/07 01:04:13 by mozer             #+#    #+#             */
/*   Updated: 2022/08/01 02:14:02 by mozer            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let gelir = [];
let gider = [];


if (localStorage.getItem("gelir") !== null){
	gelir = JSON.parse(localStorage.getItem("gelir"));
}



let giderSave = document.querySelector("#giderSave");
let gelirSave = document.querySelector("#gelirSave");
let kisi = document.querySelector("#kisi");
let tutar = document.querySelector("#tutar");
let gelirList = document.querySelector("#gelirList");
let dataList = document.querySelector("#dataList");
let gelirToplam = document.querySelector(".gelirToplam");
let sonuc = document.querySelector(".sonuc");
let toplam = 0;
let editId;
let isEditTask = false;

let giderDataList,
    aciklama,
    giderTutar,
    giderList,
    giderToplam,
	giderEditId,
	giderisEditTask = false;

giderDataList = document.querySelector("#giderDataList");
aciklama = document.querySelector("#aciklama");
giderTutar = document.querySelector("#giderTutar");
giderList = document.querySelector("#giderList");
gdrToplam = document.querySelector(".giderToplam");

let kira = 0;
let banka = 0;
let ulasim = 0;
let egitim_saglik = 0;
let diger = 0;

eventListener();
displayList();

function eventListener(){
    gelirSave.addEventListener("click",gelirEkle);
	giderSave.addEventListener("click",giderEkle);
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
   // let tmp = giderToplamGoster(0);
	sonuc.innerHTML = toplam;

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
		localStorage.setItem("gelir",JSON.stringify(gelir));
        grafikGoster();
    }

    e.preventDefault();
}

function deleteTask(id)
{
    let deleteId;

    for(let i in gelir)
    {
        if(gelir[i].id == id)
        {
            deleteId = i;
        }
    }
    gelir.splice(deleteId,1);

    toplamGoster();
	localStorage.setItem("gelir",JSON.stringify(gelir));
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

	localStorage.setItem("gelir",JSON.stringify(gelir));

}

/*  gider */ 


if(localStorage.getItem("gider") !== null)
	gider = JSON.parse(localStorage.getItem("gider"));



giderDisplayList();

function giderDisplayList(){
    giderList.innerHTML = "";

    for(index of gider)
    {
        let gdrList = 
        `<li class="task list-group-item">
            ${index.giderTur} 
            ${index.giderAciklama} 
            ${index.giderTutar}
            <div class="dropdown">
            <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-ellipsis"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a onclick="giderDeleteTask(${index.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash-can"></i> Sil</a></li>
                <li><a onclick='giderEditTask(${index.id}, "${index.giderTur}", "${index.giderAciklama}", ${index.giderTutar})' class="dropdown-item" href="#"><i class="fa-solid fa-pen"></i> Düzenle</a></li>
        </ul>
        </li>`
        giderList.insertAdjacentHTML("beforeend", gdrList);
    }
}

let giderValueClear = () => {
    aciklama.value = "";
    giderTutar.value = "";
}

let giderToplamGoster = (giderToplam) =>{
    giderToplam = 0;
    for(let i of gider)
    {
        giderToplam = giderToplam + i.giderTutar;
    }
    
   gdrToplam.innerHTML = giderToplam;

   return (giderToplam);
}

giderToplamGoster();

function giderEkle(e) {

	if(giderDataList.value == "" && aciklama.value == "" && giderTutar.value == "")
		alert("Lütfen Değerleri Tam ve Eksiksiz Giriniz");
	else{
		if(!giderisEditTask)
		{
			gider.push({
                "id" : gider.length+1,
                "giderTur" : giderDataList.value,
                "giderAciklama" : aciklama.value,
                "giderTutar" : parseInt(giderTutar.value)
            })
		}
		else{
            for(let lst of gider)
            {
                if(lst.id == giderEditId)
                {
                    lst.giderTur = giderDataList.value;
                    lst.giderAciklama = aciklama.value;
                    lst.giderTutar = parseInt(giderTutar.value);
                }
                giderisEditTask = false;
            }
        }
		giderValueClear();
		giderToplamGoster();
		giderDisplayList();
		localStorage.setItem("gider" , JSON.stringify(gider));
        giderKontrol();
	}
	e.preventDefault();
}

function giderDeleteTask(id)
{
    let deleteId;

    for(let i in gider)
    {
        if(gider[i].id == id)
        {
            deleteId = i;
        }
    }
    gider.splice(deleteId,1);

    giderToplamGoster();
    giderDisplayList();
	localStorage.setItem("gider" , JSON.stringify(gider));
    giderKontrol();
}

function giderEditTask(taskId,taskTur,taskAciklama,taskTutar){
    giderEditId = taskId;
    giderisEditTask = true;
    giderDataList.value = taskTur;
    giderDataList.focus();
    aciklama.value =  taskAciklama;
    aciklama.focus();
    giderTutar.value =  taskTutar;
    giderTutar.focus();

	localStorage.setItem("gider" , JSON.stringify(gider));
    giderKontrol();

}



let giderKontrol = () => {
    for(let is = 0 ; is <= gider.length - 1 ; is++)
    {
        if(gider[is].giderTur == "Kira")
        {
            kira = kira + gider[is].giderTutar; 
        }
        else if(gider[is].giderTur == "Banka")
        {
            banka = banka + gider[is].giderTutar; 
        }
        else if(gider[is].giderTur == "Ulaşım")
        {
            ulasim = ulasim + gider[is].giderTutar;
        }
        else if(gider[is].giderTur == "Eğitim & Sağlık")
        {
            egitim_saglik = egitim_saglik + gider[is].giderTutar;
        }
        else if(gider[is].giderTur == "Diğer Giderler")
        {
            diger = diger + gider[is].giderTutar;
        }
    }
    console.log(`kira :${kira}\nbanka : ${banka}\nulaşm : ${ulasim}\neğitim ve sağlık : ${egitim_saglik}\n diğer : ${diger}`);

}


// Grafik 
        toplamGoster();

        giderKontrol(); 

        const labels = [
            toplam,
            kira,
            banka,
            ulasim,
            egitim_saglik,
            diger
        ];
        const data = {
            labels: ['Gelir','Kira','Banka','Ulaşım','Eğitim & Sağlık','Diğer'],
            datasets: [{
            label: 'Aylık Durum Grafiği',
            backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(26, 224, 96)',
            'rgb(38, 64, 211)',
            'rgb(26, 255, 250)',
            'rgb(242, 19, 156)',
            'rgb(211, 234, 32)'
            ],
            data: [
                toplam,
                kira,
                banka,
                ulasim,
                egitim_saglik,
                diger
            ],
            }]
        };
    
        const config = {
            type: 'pie',
            data: data,
            options: {}
        };
   
            const myChart = new Chart(
            document.getElementById('myChart'),
            config,
        );
    
        // setInterval(giderKontrol(),5000);
