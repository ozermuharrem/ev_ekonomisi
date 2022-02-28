let donem;
let ay;

donem = new Date(); 

console.log(donem.getMonth()); 

if(donem.getMonth() == 0)
{
    console.log("Ocak");
}
else if(donem.getMonth() == 1)
{
    ay = document.querySelector('.ay').innerHTML = "Şubat";
}
else if(donem.getMonth() == 2)
{
    ay = document.querySelector('.ay').innerHTML = "Mart";
}
else if(donem.getMonth() == 3)
{
    console.log("Nisan");
}
else if(donem.getMonth() == 4)
{
    console.log("Mayıs");
}
else if(donem.getMonth() == 5)
{
    console.log("Haziran");
}
else if(donem.getMonth() == 6)
{
    console.log("Temmuz");
}
else if(donem.getMonth() == 7)
{
    console.log("Ağustos");
}
else if(donem.getMonth() == 8)
{
    console.log("Eylül");
}
else if(donem.getMonth() == 9)
{
    console.log("Ekim");
}
else if(donem.getMonth() == 10)
{
    console.log("Kasım");
}
else if(donem.getMonth() == 11)
{
    console.log("Aralık");
} 

let input_aciklama = document.querySelector('.aciklama');

function addNewItem(e){
    if(input_aciklama.value === ''){
        alert('add new item');
    }
}

const gelir_form = document.querySelector('.gelir_form');
const aciklama = document.querySelector('.aciklama');
const number_input = document.querySelector('.number_input');
const deleteAll = document.querySelector('#deleteAll');
const task_list = document.querySelector('.task-list')

eventListener();

function eventListener(){
    gelir_form.addEventListener('submit',yeni_gelir_ekle);

}

function yeni_gelir_ekle(e)
{
    if(aciklama.value === '' && number_input.value === '')
    {
        alert('Lütfen Verileri Giriniz');
    }
    else if(aciklama.value === '')
    {
        alert('Lütfen Açıklamanızı Giriniz');
    }
    else if(number_input.value === '')
    {
        alert('Lütfen Gelirinizi Giriniz');
    }
    
    const li = document.createElement('li');

    li.className = 'list-group-item list-group-item-secondary';
    //li.appendChild(document.createTextNode(aciklama.value));
    li.appendChild(document.createTextNode(number_input.value));

    const a = document.createElement('a');

    a.classList = 'delete-item float-right';
    a.setAttribute('href','#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a); 

    task_list.appendChild(li);

    console.log(task_list)
    
    
    
    e.preventDefault();
}