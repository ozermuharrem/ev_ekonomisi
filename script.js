let donem;
let ay;
let para = [];
let tpl = 0;

donem = new Date();

if (donem.getMonth() == 0) {
  console.log("Ocak");
} else if (donem.getMonth() == 1) {
  ay = document.querySelector(".ay").innerHTML = "Şubat";
} else if (donem.getMonth() == 2) {
  ay = document.querySelector(".ay").innerHTML = "Mart";
} else if (donem.getMonth() == 3) {
  console.log("Nisan");
} else if (donem.getMonth() == 4) {
  console.log("Mayıs");
} else if (donem.getMonth() == 5) {
  console.log("Haziran");
} else if (donem.getMonth() == 6) {
  console.log("Temmuz");
} else if (donem.getMonth() == 7) {
  console.log("Ağustos");
} else if (donem.getMonth() == 8) {
  console.log("Eylül");
} else if (donem.getMonth() == 9) {
  console.log("Ekim");
} else if (donem.getMonth() == 10) {
  console.log("Kasım");
} else if (donem.getMonth() == 11) {
  console.log("Aralık");
}

let input_aciklama = document.querySelector(".aciklama");
const gelir_form = document.querySelector(".gelir_form");
const aciklama = document.querySelector(".aciklama");
const number_input = document.querySelector(".number_input");
const deleteAll = document.querySelector("#deleteAll");
const task_list = document.querySelector(".task-list");

eventListener();

function eventListener() {
  gelir_form.addEventListener("submit", yeni_gelir_ekle);
  task_list.addEventListener("click", deleteItem);
  deleteAll.addEventListener("click", deleteAllItem);
}

function yeni_gelir_ekle(e) {
  if (aciklama.value === "" && number_input.value === "") {
    alert("Lütfen Verileri Giriniz");
  } else if (aciklama.value === "") {
    alert("Lütfen Açıklamanızı Giriniz");
  } else if (number_input.value === "") {
    alert("Lütfen Gelirinizi Giriniz");
  }

  const li = document.createElement("li");

  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(aciklama.value + " ")) +
    li.appendChild(document.createTextNode(number_input.value));

  const a = document.createElement("a");

  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';

  li.appendChild(a);

  task_list.appendChild(li);

  

  para.push(parseInt(number_input.value));


  console.log(typeof para[0]);

  //clear input

  number_input.value = "";
  input_aciklama.value = "";

  console.log(li);

 

  tpl = 0;
  for (let index = 0; index < para.length; index++) {
    tpl += para[index];
  
  }
  console.log(tpl);

  e.preventDefault();
}

function deleteItem(e) {
  if (e.target.className === "fas fa-times") {
    e.target.parentElement.parentElement.remove();
  }

  e.preventDefault();
}

function deleteAllItem() {
  if (confirm("Eminmisiniz ?")) {
    task_list.innerHTML = ""; // birinci yöntem

    // ikinci yöntem
    /*
        task_list.childNodes.forEach(function(item){
            if(item.nodeType===1){
                item.remove();
            }
        }) */
  }
} 
let sonuc = 0;


for (let index = 0; index < para.length; index++) {
  sonuc += para[index];
  
}
console.log(sonuc);

var toplam_gelir = 10000;
var toplam_gider = {
  Kira: 2000,
  Kredi: 5000,
  Egitim: 2000,
};

console.log(toplam_gider.Kira);
// Grafik 

  const labels = [
    toplam_gelir,
    toplam_gider.Kira,
    toplam_gider.Kredi,
    toplam_gider.Egitim,
  ];
  const data = {
    labels: ['Gelir','Kira','Kredi','Eğitim'],
    datasets: [{
      label: 'Aylık Durum Grafiği',
      backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(218, 247, 166)' 
    ],
      data: [toplam_gelir, toplam_gider.Kira, toplam_gider.Kredi, toplam_gider.Egitim],
    }]
  };

  const config = {
    type: 'pie',
    data: data,
    options: {}
  };
    const myChart = new Chart(
      document.getElementById('myChart'),
      config
  );

