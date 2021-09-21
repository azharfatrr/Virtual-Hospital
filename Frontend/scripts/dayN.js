let loadPage = function() {
     let url = 'https://api.virtual-hospital.azharfatrr.me/v1/devices/12345';
     fetch(url)
          .then(response => response.json())
          .then(response => {
               const data = response.data;
               // console.log(data);
               let suhu = document.querySelector('.ind1');
               let nadi = document.querySelector('.ind3');
               let saturasi = document.querySelector('.ind2');

               suhu.innerHTML = `<div class="yellow"></div>
                    <div class="indikator1">Suhu tubuh</div>
                    <div class="nilai">${data.userTemp}\u00B0C</div>`;
               // suhu.innerHTML += `${data.userTemp}\u00B0C</div>`;

               saturasi.innerHTML = `<div class="yellow"></div>
                    <div class="indikator1">Denyut Nadi</div>
                    <div class="nilai">${data.userBpm} Bpm</div>`;
               // saturasi.innerHTML += `${data.userSpo2}%</div>`;

               nadi.innerHTML = `<div class="yellow"></div>
                    <div class="indikator1">Saturasi Oksigen</div>
                    <div class="nilai">${data.userSpo2}%</div>`;
               // nadi.innerHTML += `${data.userBpm} Bpm</div>`;
          })
};

loadPage();