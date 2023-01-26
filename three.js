function useRequest(callback) {
  const value = document.querySelector('input').value;
  const adressUrl = 'https://picsum.photos/v2/list?limit=' + value;

  let xhr = new XMLHttpRequest();
  xhr.open('GET', adressUrl, true);
  
   xhr.onload = function() {
      if (value > 10 && value < 1) {
      console.log('Число вне диапазона от 1 до 10');
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
};

function displayResult(apiData) {
  const resultNumber = document.querySelector('.resultNumber');
  let cards = ''
  apiData.forEach(item => {
    const cardBlock = `
        <div class = 'card'>
          <img style="width: 100px; height: 100px;" src='${item.download_url}' class = 'card-image'/>
          <p>${item.author}</p>
        </div>
      `;
      cards = cards + cardBlock;    
  });
  resultNumber.innerHTML = cards;
}

const buttonNumber = document.querySelector('.buttonNumber');
buttonNumber.addEventListener('click', () => {
  useRequest(displayResult);
})