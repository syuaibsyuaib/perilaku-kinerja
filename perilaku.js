$('.navbar-static-top').append(`<button class="navbar-custom-menu btn btn-danger" style="height:50px;width:165px" onclick="ambil(this)">IMPORT PERILAKU</button>`)

var arrperilaku = {}, arrIdUser = {}, arr = []
var nip = {}

//ambil id dan nama bawahan masukkan ke arr
$("#ajxContent a").each((n, el) => {
  let isi = /\d+/.exec($(el).attr("onclick"))
  arrIdUser[isi[0]] = $("#ajxContent td:nth-child(4)").eq(n + 1).html()
})

arr.push(arrIdUser)

//masukkan nip ke arr yang akan dikirim
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
