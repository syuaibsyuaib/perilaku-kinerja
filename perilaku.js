//$('body').append('<script src="https://raw.githubusercontent.com/syuaibsyuaib/perilaku-kinerja/master/perilaku.js"></script>')

$('.navbar-static-top').append(`<button class="navbar-custom-menu btn btn-danger" style="height:50px;width:165px" onclick="ambil(this)">IMPORT PERILAKU</button>`)

var arrperilaku = {}, arrIdUser = {}, arr = []
var nip = {}

//ambil id dan nama bawahan masukkan ke arr
$("#ajxContent a").each((n, el) => {
  let isi = /\d+/.exec($(el).attr("onclick"))
  arrIdUser[isi[0]] = [$("#ajxContent td:nth-child(4)").eq(n + 1).html()]
})

// console.log((Object.entries(arrIdUser)))
//loop over arrIdUser
for (let i = 0; i < (Object.entries(arrIdUser)).length; i++) {
  let urlPerilaku = `https://kinerjav2.pareparekota.go.id/c_atasan_2022/penilaian_perilaku/${(Object.entries(arrIdUser))[i][0]}/1`
  fetch(urlPerilaku)
    .then(res => {
      return res.text()
    })
    .then(resp => {
      let baris = $(resp).find('td:nth-child(3)')
      let obj = {}
      for (let j = 0; j < baris.length - 1; j++) {
        let isiHasilPenilaian = baris.eq(j + 1).html()  //deskripsi hasil penilaian
        let idPenilaian = ($(resp).find('a').eq(j).attr('onclick')).match(/(?<=\()\d{4}/g)[0] //id nya
        let kodeJenisPenilaian = ($(resp).find('a').eq(j).attr('onclick')).match(/(?<=,)\d{1}/g)[0] //kode jenis penilaian. contoh : BEROREIENTASI PELAYANAN = 1
        obj[idPenilaian] = [kodeJenisPenilaian, isiHasilPenilaian]
      }

      arrIdUser[(Object.entries(arrIdUser))[i][0]].push(obj)
      // console.log(arrIdUser)

      return arrIdUser // {2781 : ['makmur', {1181 : [1, "Menerima pendapat dan saran dalam menyelesaikan pekerjaan."]}]}
    })
    .then(respx => {
      if (i == (Object.entries(respx)).length - 1) {
        //masukkan nip ke arr yang akan dikirim
        console.log(Object.entries(respx))
  
        arr.push(respx)
        nip["NIP"] = (/\d+/).exec($(".info").html())[0]
        arr.push(nip)
    
        // console.log(Object.entries(arr[0]))
        let urlScript = "https://script.google.com/macros/s/AKfycbw4laf_ELwwqh4tBeaXa2VUmRnUfJyPpilC42QymSxx3NCt4rLS2zA6aacW9OwpZFbF/exec"
        fetch(urlScript, {
          method: 'post',
          body: JSON.stringify(arr)
        })
          .then(res => {
            return res.json()
          })
          .then(resp => {
            console.log(resp)
          })
      }
    })

   
}







function ambil() {
  //AMBIL perilaku dari GOOGLE SHEET ke E-KINERJA
  fetch(urlScript, {
    method: 'post',
    body: JSON.stringify({ "pesan": "ambil", "nip": nip["NIP"] })
  })
    .then(res => {
      return res.json()
    })
    .then(resp => {
      //ambil html bootstrap perilaku
      arrDeskripsiPenilaian = resp
      //dari google sheet
      console.log(arrDeskripsiPenilaian)


      for (let p = 0; p < arrDeskripsiPenilaian.length; p++) {
        let urlPerilaku = `https://kinerjav2.pareparekota.go.id/c_atasan_2022/penilaian_perilaku/${Object.entries(arr[0])[p][0]}/1`
        // let urlPerilaku = `https://kinerjav2.pareparekota.go.id/c_atasan_2022/penilaian_perilaku/${arrDeskripsiPenilaian[1][p]}/1`

        fetch(urlPerilaku)
          .then(res => {
            return res.text()
          })
          .then(resphtml => {
            //ambil id perilaku dari html
            console.log()
            let objIdJenisdanPenilaian = {}
            let arrIdPenilaian = resphtml.match(/\(\d+(?=,)/g)
            let arrIdJenisPenilaian = resphtml.match(/,\d+/g)
            for (let m = 0; m < arrIdJenisPenilaian.length; m++) {
              objIdJenisdanPenilaian[(arrIdPenilaian[m]).substring(1)] = (arrIdJenisPenilaian[m]).substring(1)
            }

            // console.log(objIdJenisdanPenilaian)
            let arrIdJenisdanPenilaian = Object.entries(objIdJenisdanPenilaian)
            //kirim penilaian yang diambil dari google sheet ke url perilaku
            let urlPenilaian = "https://kinerjav2.pareparekota.go.id/c_atasan_2022/proses_input_penilaian"

            let formPenilaian = new FormData()
            // let arrId = []

            for (let l = 0; l < arrDeskripsiPenilaian.length; l++) { //ulangi sebanyak user
              if (arrDeskripsiPenilaian[l][0] == Object.entries(arr[0])[p][0]) { //jika iduser g.sheet == iduser html
                for (let n = 1; n < arrDeskripsiPenilaian[l].length; n++) {
                  for (let v = 0; v < arrIdJenisdanPenilaian.length; v++) {
                    if (arrDeskripsiPenilaian[l][n][1] == arrIdJenisdanPenilaian[v][1] * 1) {
                      // console.log(arrIdJenisdanPenilaian[v])
                      // console.log(arrDeskripsiPenilaian[l][n])
                      formPenilaian.append("id", arrIdJenisdanPenilaian[v][0])
                      formPenilaian.append("penilaian", arrDeskripsiPenilaian[l][n][0])

                      fetch(urlPenilaian, {
                        method: "post",
                        body: formPenilaian
                      })
                        .then(hasil => {
                          return hasil.text()
                        })
                        .then(hasil2 => {
                          console.log(hasil2)
                        })
                        .catch(err => {
                          console.log(err)
                        })
                    }
                  }
                };
              }
            }
            // console.log(arrId)
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
    .catch(err => {
      console.log(err)
    })
}
