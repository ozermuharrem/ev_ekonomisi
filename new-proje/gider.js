
let gider = [];

if(localStorage.getItem("gider") !== null)
	gider = JSON.parse(localStorage.getItem("gider"));

let giderDataList,
    aciklama,
    giderTutar,
    giderSave,
    giderList,
    giderToplam,
	giderEditId,
	giderisEditTask = false;

giderDataList = document.querySelector("#giderDataList");
aciklama = document.querySelector("#aciklama");
giderTutar = document.querySelector("#giderTutar");
giderSave = document.querySelector("#giderSave");
giderList = document.querySelector("#giderList");
gdrToplam = document.querySelector(".giderToplam");

giderDisplayList();
eventListener();

function eventListener(){
	giderSave.addEventListener("click",giderEkle);
}

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

let giderToplamGoster = () =>{
    giderToplam = 0;
    for(let i of gider)
    {
        giderToplam = giderToplam + i.giderTutar;
    }
    
   gdrToplam.innerHTML = giderToplam;
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
	}
	e.preventDefault();
}

function giderDeleteTask(id)
{
    let deleteId;

    for(let i in gider)
    {
        if(gider[i].id == 1)
        {
            deleteId = i;
        }
    }
    gider.splice(deleteId,1);

    giderToplamGoster();
    giderDisplayList();
	localStorage.setItem("gider" , JSON.stringify(gider));
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
}
