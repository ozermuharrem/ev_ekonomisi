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