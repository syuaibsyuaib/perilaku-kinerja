// =====================

// STEP 1

// URL = https://kinerjav2.pareparekota.go.id/C_atasan_2022/dt_bawahan
// Content-Type = application/x-www-form-urlencoded
// Body = draw=1&columns%5B0%5D%5Bdata%5D=0&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=1&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=2&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=3&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=4&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=5&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=6&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false&tahun=2022

// ambil semua data user dalam bentuk array
fetch("https://kinerjav2.pareparekota.go.id/c_atasan_2022/skp_bawahan")
  .then(res => {
    return res.text()
  })
  .then(hasil => {
    $('#tengah').html(hasil)
  })
  .then(resp => {
    var table;
    table = $('#tableSKPBawahan').DataTable({
      "searching": true,
      "processing": true, //Feature control the processing indicator.
      "serverSide": true, //Feature control DataTables' server-side processing mode.
      "order": [], //Initial no order.

      // Load data for the table's content from an Ajax source
      "ajax": {
        "url": "https://kinerjav2.pareparekota.go.id/C_atasan_2022/dt_bawahan",
        "type": "POST",
        "data": function (d) {
          d.tahun = 2022;
          d.length = 2000
        }
      },
      scrollY: 270,
      "scrollX": true,
      //Set column definition initialisation properties.
      "columnDefs": [{
        "width": "3%",
        className: "dt-center",
        "targets": [0], //first column / numbering column
        "orderable": false, //set not orderable
      }, {
        className: "dt-center",
        "width": "10%",
        "targets": [1],
        "createdCell": function (td, cellData, rowData, row, col) {
          $(td).css('text-align', 'left');
        }
      }, {
        "width": "10%",
        className: "dt-center",
        "orderable": false,
        "targets": [2]
      }, {
        "width": "25%",
        className: "dt-center",
        "orderable": false,
        "targets": [3]
      }, {
        "width": "10%",
        className: "dt-center",
        "orderable": false,
        "targets": [4]
      }, {
        "width": "10%",
        className: "dt-center",
        "orderable": false,
        "targets": [5]
      }, {
        "width": "5%",
        className: "dt-center",
        "orderable": false,
        "targets": [6]
      }],
      "drawCallback": function (settings) {
        $('.cekEselon').on('click', function () {
          var id = $(this).attr('id');
          var cek = $(this).is(":checked");

          $.post("https://kinerjav2.pareparekota.go.id/admin/c_user/update_eselon", {
            id: id,
            cek: cek
          }, function (res) {
            alert(res);

          });
        });
      }
    });
  })

fetch("https://kinerjav2.pareparekota.go.id/C_atasan_2022/dt_bawahan", {
  method: "post",
  body: "draw=1&columns%5B0%5D%5Bdata%5D=0&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=1&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=2&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=3&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=4&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=5&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=6&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=2000&search%5Bvalue%5D=&search%5Bregex%5D=false&tahun=2022",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})
  .then(res => {
    return res.json()
  })
  .then(resp => {
    console.log(resp.data)
    // $('#tengah').html(resp.data);
  })

//==== END ====


//tampilkan semua user ditabel
fetch("https://kinerjav2.pareparekota.go.id/c_atasan_2022/skp_bawahan")
  .then(res => {
    return res.text()
  })
  .then(hasil => {
    let hasil2 = hasil.replace("$('#tahun').val();", 2022 + ";d.length = 2000")
    let hasil3 = hasil2.replace(270, 570 + ", paging : false")
    $("#tengah").html(hasil3)
    return hasil3
  }).then(hasil2 => {
    let arr2 = [] //tampung ID user

    $('#tableSKPBawahan a:odd').each((e, n) => {
      arr2[e] = (/\d+/).exec($(n).prop('onclick'))[0]
      $(n).parent().append(arr2[e])
    })
  })
//==== END ====

//============ isi perilaku target RENCANA kinerja ========

let arr2 = [] //tampung ID user
$('#tableSKPBawahan a:odd').each((e, n) => {
    arr2[e] = (/\d+/).exec($(n).prop('onclick'))[0]
    $(n).parent().append(arr2[e])

    let formData = new FormData();

    formData.append("id_opmt_tahunan_skp", arr2[e]);
    formData.append("id_perilaku", e + 1);
    formData.append("ekspektasi", "Sesuai ekspektasi Pimpinan");

    $.ajax({
      url: "https://kinerjav2.pareparekota.go.id/c_atasan_2022/proses_update_ekspetasi",
      type: "POST",
      data: formData,
      contentType: false,
      cache: false,
      processData: false,
      success: function (data) {
        var res = JSON.parse(data);
        console.log(res.message)
        if (res.code == 1) {
          target_skp_bawahan(arr2[e]);
        }
      },
      error: function (err) {
        console.log(err.toString());
      }
    });
})
//==== END ====

//========== isi REALISASI kinerja =============
$('#tableSKPBawahan a:odd').each((e, n) => {
  arr[e] = (/\d+/).exec($(n).prop('onclick'))[0]
  let formRealisasi = new FormData();

  formRealisasi.append("id_opmt_tahunan_skp", arr[e]);
  formRealisasi.append("capaian_kinerja_organisasi", 2);
  formRealisasi.append("pola_distribusi", 2);
  formRealisasi.append("rating_hasil_kerja", 2);
  formRealisasi.append("rating_perilaku_kerja", 2);

  $.ajax({
    url: "https://kinerjav2.pareparekota.go.id/c_atasan_2022/proses_data_realisasi",
    type: "POST", // Type of request to be send, called as method
    data: formRealisasi,
    contentType: false,
    cache: false,
    processData: false,
    success: function (data) {
      var res = JSON.parse(data);
      // alert(res.message);
      console.log(res.message)
      if (res.code == 1) {
        realisasi_skp_bawahan(arr[e]);
      }
    },
    error: function (err) {
      console.log(err.toString());
    }
  })
})
//==== END ====

//===============================
//--PERILAKU
//--------------https://kinerjav2.pareparekota.go.id/c_atasan_2022/proses_input_penilaian

// let formPerilaku

// $("#ajxContent a:odd").each((n, el) => {
//   let isi = /\d+/.exec($(el).attr("onclick"))
//   console.log(isi[0])

//   formPerilaku = null
//   formPerilaku = new FormData();

//   formPerilaku.append("id", isi[0]);
//   formPerilaku.append("penilaian", penilaian);

//   $.ajax({
//     url: "https://kinerjav2.pareparekota.go.id/c_atasan_2022/proses_input_penilaian", // Url to which the request is send
//     type: "POST", // Type of request to be send, called as method
//     data: formPerilaku, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
//     contentType: false, // The content type used when sending data to the server.
//     cache: false, // To unable request pages to be cached
//     processData: false, // To send DOMDocument or non processed data file it is set to false
//     success: function (data) {
//       var res = JSON.parse(data);
//       console.log(res.message);
//       $('.close').click();
//       if (res.code == 1) {
//         nilai(isi[0], 1)
//       }
//     },
//     error: function (err) {
//       console.log(err.toString());
//     }
//   })
// })

//==========================================

// $('body').append(`<script src=""></script>`)

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
