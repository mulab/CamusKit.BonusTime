window.onload = () => {
  const options = {
    bg_url: null,
    min: 1,
    max: 999,
  }

  const bg = document.querySelector('#bg-upload');
  bg.addEventListener('change', (e) => {
    const reader = new FileReader();
    console.log(reader);
    reader.readAsBinaryString(bg.files[0]);
    const formData  = new FormData();
    formData.append('smfile', bg.files[0]);
    fetch('https://sm.ms/api/upload', {
      method: 'POST',
      body: formData,
      mode: 'cors',
    }).then((res) => {
      res.json().then(res => {
        const data = res.data;
        const url = data.url;
        options.bg_url = url;
      });
    });
  });

  const min = document.querySelector('#min');
  min.addEventListener('change', () => {
    options.min = min.value;
  });

  const max = document.querySelector('#max');
  max.addEventListener('change', () => {
    options.max = max.value;
  });

  const form = document.querySelector('#form');
  const generated = document.querySelector('#generated');
  form.addEventListener('submit', (e) => {
    const href = window.location.href;
    const url = new URL('./', href);
    if (options.min === 0 || options.min) {
      url.searchParams.set('min', options.min);
    }
    if (options.max) {
      url.searchParams.set('max', options.max);
    }
    if (options.bg_url) {
      url.searchParams.set('bg_url', options.bg_url);  
    }

    generated.innerText = url.href;
    generated.setAttribute('href', url.href);
    e.preventDefault();
  });
}
