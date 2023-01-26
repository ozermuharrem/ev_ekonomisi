const nodemailer = require('nodemailer');

function myTag(data) {
  const len = data.length;
  const tr_sart = "<tr>";
  const tr_end = "</tr>";
  const td = [];
  for(let i in data)
    td[i] = "<td>"+ data[i].giderTuru +"</td>"+"<td>"+data[i].description+"</td>"+"<td>"+data[i].tutar+"</td>"; 

  let tmp = "";
  let x = 0;
  while(x < len)
  {
    tmp += tr_sart+td[x]+tr_end;
    x++;
  }

  // We can even return a string built using a template literal
  return `${tmp}`;
}

module.exports = (users, data)=>{

  const output = myTag(data);
    const emailTmp = `

    <img src="https://www.w3schools.com/images/lamp.jpg" alt="">


    <h1>Ev Ekonomisi</h1>
    
    <h3>Merhaba ${users.name}</h3>
    
    <p>Eklemiş oludğunuz vadesi gelen faturalar aşağıda ki gibidir</p>
    
    <p>Biz sadece hatırlatmak istedik</p>
    
    <br>
    
    <hr>
    <table class="table">
    <thead>
      <tr>
        <th scope="col">Gider Turu</th>
        <th scope="col">Açıklma</th>
        <th scope="col">Tutar</th>
      </tr>
    </thead>
    <tbody>
        ${output}
    </tbody>
  </table>
    
    
    <h4>Saygılarımızla</h4>
    <p><a href="https://evekonomisi.ozermuharrem.com">evekonomisi.ozermuharrem.com</a></p>
   
    `
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: '**********@********',
            pass: '*******************'
        }
    });
      // send mail with defined transport object
      let info = transporter.sendMail({
        from: `"Ev Ekonomisi Vade Hatırlatma Servisi" <muharremozer505@gmail.com>`, // sender address
        to: users.email, // list of receivers
        subject: "✔ Ev Ekonomisi Vade Hatırlatma Servisi", // Subject line
        html: emailTmp, // html body
      });
    
      //console.log("Message sent: %s", info.messageId);
      //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}