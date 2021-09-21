// async function getData() {
//      let url = 'https://api.virtual-hospital.azharfatrr.me/v1/devices/12345';
//      try {
//           let res = await fetch(url);
//           return await res.json();
//      } catch (error) {
//           console.log(error);
//      }
// }

const resetButton = document.querySelector('.back');
resetButton.addEventListener('click', function() {
     let url = 'https://api.virtual-hospital.azharfatrr.me/v1/devices/12345';
     fetch(url)
          .then(response => response.json())
          .then(response => {
               const data = response.data;
               // console.log(data);
               let suhu = document.querySelector('.suhu');
               let nadi = document.querySelector('.nadi');
               let saturasi = document.querySelector('.saturasi');

               suhu.innerHTML = `<p>${data.userTemp}\u00B0C</p>`;
               saturasi.innerHTML = `<p>${data.userSpo2}%</p>`;
               nadi.innerHTML = `<p>${data.userBpm} Bpm</p>`;
          })
});
