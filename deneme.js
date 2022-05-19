function ft_itoaa(strToInt)
{
    let numara;
    let i = 0;
    while(i <= strToInt.lengt)
    {
      if(strToInt[i] <= 'A' && strToInt[i] >= 'Z')
      {
        console.log("bloga girdi");
        i++;
      }
    }
    return (numara)
  }

  let aht = "Mbc 123";

//   let mhr = ft_itoaa(aht);

//   console.log(mhr);

if(aht[0] >= 'A' || aht[0] <= 'Z' )
{
    console.log("true");
}
else
{
    console.log("fales");
}