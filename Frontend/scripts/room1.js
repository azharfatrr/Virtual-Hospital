const resetButton = document.querySelector('.back');
resetButton.addEventListener('click', function() {
     let url = 'https://api.virtual-hospital.azharfatrr.me/v1/devices/12345';
     fetch(url)
          .then(response => response.json())
          .then(response => {
               const data = response.data;
               // console.log(data);
               let suhuRuangan = document.querySelector('.checkbox1');
               let kelembapan = document.querySelector('.checkbox2');

               suhuRuangan.innerHTML = `${data.roomTemp}\u00B0C`;
               kelembapan.innerHTML = `${data.roomRh}%`;
          })
});