let gider = [];

let giderDataList,
    aciklama,
    giderTutar,
    giderSave,
    giderList,
    giderToplam;

giderDataList = document.querySelector("#giderDataList");
aciklama = document.querySelector("#aciklama");
giderTutar = document.querySelector("#giderTutar");
giderSave = document.querySelector("#giderSava");
giderList = document.querySelector("#giderList")

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
                <li><a onclick="deleteTask(${index.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash-can"></i> Sil</a></li>
                <li><a onclick='editTask(${index.id}, "${index.giderTur}", "${index.giderAciklama}", ${index.giderTutar})' class="dropdown-item" href="#"><i class="fa-solid fa-pen"></i> Düzenle</a></li>
        </ul>
        </li>`

        giderList.insertAdjacentHTML("beforeend", gdrList);
    }

}

let giderValueClear = () => {
    aciklama.value = "";
    giderTutar.value = "";
}

let toplamGoster = () =>{
    giderToplam = 0;
    for(let i of gider)
    {
        giderToplam = giderToplam + i.giderTutar;
    }
    
   gelirToplam.innerHTML = toplam;
}

toplamGoster();

