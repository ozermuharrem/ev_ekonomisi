const session = require('express-session');
const Gider = require('../models/Gider');
const Gelir = require('../models/Gelir');
const Kategori = require('../models/Kategori');
const User = require('../models/User');
const excelJS = require("exceljs");
const vadeMiddleware = require('../middlewear/vadeMiddleware');
const cron = require('node-cron');


exports.getUserPage = async (req , res ) => {
    try {
        const user = await User.findOne({_id : req.session.userID});
        const veriGider = await Gider.find({user:req.session.userID}).sort('-createDate');
        const veriGelir = await Gelir.find({user:req.session.userID}).sort('-createDate');
        const kategori =  await Kategori.find();

        let giders = [];
        let gelirs = [];

        for(let ia in kategori){
            giders[ia] = await Gider.find({ $and : [{user:req.session.userID},{kategori : kategori[ia]._id} ] });
            gelirs[ia] = await Gelir.find({ $and : [{user:req.session.userID},{kategori : kategori[ia]._id} ] });
        }

        let giderTpl = [0,0,0,0,0,0,0,0,0,0,0,0];
        let gelirTpl = [0,0,0,0,0,0,0,0,0,0,0,0];

        let i = 0;
        let j = 0;

        while(giders[i] != null){
            j = 0;
            while(giders[i][j] != null)
            {
                giderTpl[i] += giders[i][j].tutar;
                j++;
            }
            i++;
        }
        // console.table(giderTpl);   //ok     
         i = 0;
         j = 0;


        while(gelirs[i] != null){
            j = 0;
            while(gelirs[i][j] != null)
            {
                gelirTpl[i] += gelirs[i][j].gelirTutar;
                j++;
            }
            i++;
        }

       res.status(200).render('userpage',{
            user,
            veriGider,
            kategori,
            page_name : "userpage",
            giderTpl,
            gelirTpl
        })
        
    } catch (error) {
        res.status(400).json({
            status : "başarısızzzzzzzzz",
            error
        })
        console.log(error);
    }
    
}

exports.getVeriGirisPage = async (req, res) => {
    try {
        const kategori = await Kategori.find(); //! buraya bakılacak
        res.status(200).render('veriGiris', {
            kategori
        });
    } catch (error) {
        res.status(404).json({
            status : "veriGiris Ekranına Ulaşılamadı",
            error,
        })
    }
}


exports.createGider = async (req, res) =>{

    try {
        const gider = await Gider.create({
            giderTuru   : req.body.giderTuru,
            description : req.body.description,
            tutar       : req.body.tutar,
            kategori    : req.body.kategori,
            user        : req.session.userID,
            vade        : req.body.vade,
        });
        req.flash("giderBasarili", "Kayıt Başarılı...");
        res.status(201).redirect('/userpage/veriGiris')
    }catch(error){
        req.flash("giderHata", "Kayıt Başarısız...");
        res.status(400).redirect('/userpage/veriGiris');
    }
}

exports.createGelir = async (req, res) =>{
    try {
        const gelir = await Gelir.create({
            gelirTuru        : req.body.gelirTuru,
            gelirDescription : req.body.gelirDescription,
            gelirTutar       : req.body.gelirTutar,
            kategori         : req.body.kategori,
            user             : req.session.userID,
        });
        req.flash("gelirBasarili", "Kayıt Başarılı...");
        res.status(201).redirect('/userpage/veriGiris')
    }catch(error){
        req.flash("gelirHata", "Kayıt Başarısız...");
        res.status(400).redirect('/userpage/veriGiris');
    }
}

exports.exportGider = async (req, res) => { 


    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet("Gider"); // New Worksheet
    const worksheetGelir = workbook.addWorksheet("Gelir"); // New Worksheet
  
  
  
  const user = await User.findOne({_id : req.session.userID});
  const kategori = await Kategori.findOne({slug:req.params.slug});
  const excelldata = await Gider.find({$and : [{user:req.session.userID},{kategori:kategori._id}]})
  const excelldataGelir = await Gelir.find({$and : [{user:req.session.userID},{kategori:kategori._id}]})
  
  worksheet.columns = [
  
      {headerFooter:{firstHeader: "Ev Ekonomisi", firstFooter: "mozer"}},
      { header: "#", key: "s_no", width: 10 },
      { header: "Dönem", key: "donem", width: 10 },
      { header: "Gider Türü", key: "giderTuru", width: 20 },
      { header: "Gider Açıklama", key: "description", width: 20 },
      { header: "Tutar", key: "tutar", width: 10 },
  ];
  
  worksheetGelir.columns = [
  
      {headerFooter:{firstHeader: "Ev Ekonomisi", firstFooter: "mozer"}},
      { header: "#", key: "s_no", width: 10 },
      { header: "Dönem", key: "donem", width: 10 },
      { header: "Gelir Türü", key: "gelirTuru", width: 20 },
      { header: "Gelir Açıklama", key: "gelirDescription", width: 20 },
      { header: "Tutar", key: "gelirTutar", width: 10 },
  ];
  // Looping through User data
  let counter = 1;
  excelldata.forEach((gider) => {
      gider.s_no = counter;
      gider.donem = req.params.slug;
      worksheet.addRow(gider); // Add data in worksheet
      counter++;
  });
  
  let sayac = 1;
  excelldataGelir.forEach((gelir) => {
      gelir.s_no = sayac;
      gelir.donem = req.params.slug;
      worksheetGelir.addRow(gelir); // Add data in worksheet
      sayac++;
  });
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  
  worksheetGelir.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
  try {
  res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename=evEkonomisi${req.params.slug}.xlsx`);
  
    return workbook.xlsx.write(res).then(() => {
      res.status(200);
  });
  } catch (err) {
      res.send({
      status: "error",
      message: "Something went wrong",
    });
    }
};

exports.getVeriDetay = async (req,res) => {
    try {
        const user = await User.findOne({_id : req.session.userID});
        const kategori = await Kategori.findOne({slug:req.params.slug});
        const veriGider = await Gider.find({$and : [{user:req.session.userID},{kategori:kategori._id}]})
        const veriGelir = await Gelir.find({$and : [{user:req.session.userID},{kategori:kategori._id}]})
        const donem = await Kategori.findById(req.params._id);

        let giderDetay = [];
        let gelirDetay = [];
        let kiraTpl = 0, bankaTpl = 0,egitim_sagikTpl= 0,ulasimTpl = 0,faturaTpl = 0,digerTpl = 0;
        let maasTpl = 0, pasifGelirTpl = 0,mevduatTpl = 0,dovizTpl = 0,kiymetliMadenTpl = 0, digerGelirTpl = 0;
        let kira = await Gider.find({$and : [{user:req.session.userID},{kategori:kategori._id},{giderTuru : 'Kira'}]});
        let banka = await Gider.find({$and : [{user:req.session.userID},{kategori:kategori._id},{giderTuru : 'Banka'}]});
        let egitim_saglik = await Gider.find({$and : [{user:req.session.userID},{kategori:kategori._id},{giderTuru : 'Egitim&Saglik'}]});
        let ulasim = await Gider.find({$and : [{user:req.session.userID},{kategori:kategori._id},{giderTuru : 'Ulaşım'}]});
        let fatura = await Gider.find({$and : [{user:req.session.userID},{kategori:kategori._id},{giderTuru : 'Fatura'}]});
        let diger = await Gider.find({$and : [{user:req.session.userID},{kategori:kategori._id},{giderTuru : 'Diger'}]});

        let maas = await Gelir.find({$and : [{user:req.session.userID},{kategori:kategori._id},{gelirTuru : 'Maaş'}]});
        let pasifGelir = await Gelir.find({$and : [{user:req.session.userID},{kategori:kategori._id},{gelirTuru : 'Pasif Gelir'}]});
        let mevduat = await Gelir.find({$and : [{user:req.session.userID},{kategori:kategori._id},{gelirTuru : 'Mevduat'}]});
        let doviz = await Gelir.find({$and : [{user:req.session.userID},{kategori:kategori._id},{gelirTuru : 'Döviz'}]});
        let kiymetliMaden = await Gelir.find({$and : [{user:req.session.userID},{kategori:kategori._id},{gelirTuru : 'Kıymetli Maden'}]});
        let digerGelir = await Gelir.find({$and : [{user:req.session.userID},{kategori:kategori._id},{gelirTuru : 'Diger Gelir'}]});


        for(let a in kira)
            kiraTpl += kira[a].tutar;
        giderDetay.push(kiraTpl);
        for(let b in banka)
            bankaTpl += banka[b].tutar;
        giderDetay.push(bankaTpl);
        for(let c in egitim_saglik)
            egitim_sagikTpl += egitim_saglik[c].tutar;
        giderDetay.push(egitim_sagikTpl);
        for(let d in ulasim)
            ulasimTpl += ulasim[d].tutar;
        giderDetay.push(ulasimTpl);
        for(let x in fatura)
            faturaTpl += fatura[x].tutar;
        giderDetay.push(faturaTpl);
        for(let e in diger)
            digerTpl += diger[e].tutar;
        giderDetay.push(digerTpl);
        
        for(let f in maas)
        maasTpl += maas[f].gelirTutar;
        gelirDetay.push(maasTpl);
        for(let g in pasifGelir)
            pasifGelirTpl += pasifGelir[g].gelirTutar;
        gelirDetay.push(pasifGelirTpl);
        for(let h in mevduat)
            mevduatTpl += mevduat[h].gelirTutar;
        gelirDetay.push(mevduatTpl);
        for(let j in doviz)
            dovizTpl += doviz[j].gelirTutar;
        gelirDetay.push(dovizTpl);
        for(let l in kiymetliMaden)
            kiymetliMadenTpl += kiymetliMaden[l].gelirTutar;
        gelirDetay.push(kiymetliMadenTpl);
        for(let m in digerGelir)
            digerGelirTpl += digerGelir[m].gelirTutar;
        gelirDetay.push(digerGelirTpl);
    
        let toplam = 0;
        let toplamGelir = 0;
        let genelDurum = 0;

        for(let i in veriGider){
            toplam += veriGider[i].tutar;
        }
        for(let i in veriGelir){
            toplamGelir += veriGelir[i].gelirTutar;
        }


        toplamGelir = toplamGelir.toFixed(2);
        toplam = toplam.toFixed(2);

        genelDurum =(toplamGelir - toplam).toFixed(2);
    
        res.status(200).render('getVeri',{
            user,
            veriGider,
            veriGelir,
            kategori,
            toplam,
            toplamGelir,
            genelDurum,
            donem,
            giderDetay,
            gelirDetay

        })
    } catch (error) {
        res.status(400).json({
            status : "tek sayfayı açamadık",
            error
        })
        console.log(error);
    }
}

exports.delete = async (req,res) => {
    try {

       const gider = await Gider.findOneAndRemove({_id:req.params._id});
       const gelir = await Gelir.findOneAndRemove({_id:req.params._id});


        res.status(200).redirect('/userpage')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
          });
        
    }
}

exports.update = async (req,res) => {
    try {
        const veriGiders = await Gider.findOne({_id : req.params._id});
        const veriGelir = await Gelir.findOne({_id : req.params._id});

        if(!veriGiders){
            veriGelir.gelirTuru = req.body.gelirTuru;
            veriGelir.gelirDescription = req.body.gelirDescription; 
            veriGelir.gelirTutar = req.body.gelirTutar;
            veriGelir.save();
        }else{
            veriGiders.giderTuru = req.body.giderTuru;
            veriGiders.description = req.body.description; 
            veriGiders.tutar = req.body.tutar;
            veriGiders.save();
        }
 
        res.status(200).redirect('/userpage')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
          });
        
    }
}