// vars
let result = document.querySelector('.result'),
  img_result = document.querySelector('.img-result'),
  // options = document.querySelector('.options'),
  save = document.querySelector('.save'),
  cropped = document.querySelector('.cropped'),
  dwn = document.querySelector('.download'),
  upload = document.querySelector('#file-input'),
  cropper = '';

// on change show image with crop options
upload.addEventListener('change', e =>
{
  if (e.target.files.length)
  {
    // start file reader
    const reader = new FileReader();
    reader.onload = e =>
    {
      if (e.target.result)
      {
        // create new image
        let img = document.createElement('img');
        img.id = 'image';
        img.src = e.target.result;
        // clean result before
        result.innerHTML = '';
        // append new image
        result.appendChild(img);
        // show save btn and options
        save.classList.remove('hide');
        // options.classList.remove('hide');
        // init cropper
        cropper = new Cropper(img, {
          autoCropArea: 1,
          // aspectRatio: 1,
          autoCrop: true,
          viewMode: 0,
          movable: false,
          zoomable: false,
          imageSmoothingEnabled: true,
          imageSmoothingQuality: 'high',
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }
});

// save on click
save.addEventListener('click', e =>
{
  e.preventDefault();
  // get result to data uri
  let imgSrc = cropper.getCroppedCanvas({
    height: 200,
    width: 1050,
    maxWidth: 1050,
    maxHeight: 200,
    fillColor: '#fff',
    // input value
    imageSmoothingEnabled: true,
    imageSmoothingQuality: 'high',
  }).toDataURL('image/jpeg', 1);
  // remove hide class of img
  cropped.classList.remove('hide');
  img_result.classList.remove('hide');
  // show image cropped
  cropped.src = imgSrc;
  dwn.classList.remove('hide');
  dwn.download = 'imagename.png';
  dwn.setAttribute('href', imgSrc);
});