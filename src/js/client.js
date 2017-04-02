const util = require("./util");
const crypto = require("./crypto");

function oneoffError(message) {
  console.log(`Error: ${message}`);
}

function uploadFile(crypted_data, cb, err) {
  console.log("Upload file");
  util.getConfig((config) => {
    $.ajax({
      type: "POST",
      url: config.paste,
      data: {
        data: crypted_data.data
      },
      success: (response) => cb(response, crypted_data.key),
      error: (response) => {
        return err(`Error uploading: ${response}`);
      }
    });
  });
}

function getFile(id, cb) {
  console.log("Getting file");
  util.getConfig((config) => {
    $.ajax({
      type: "GET",
      url: `${config.get}${id}`,
      success: cb,
      complete: (xhr, status) => {
        if(xhr.status == 302) {
          return $.ajax({
            type: "GET",
            url: xhr.getResponseHeader("Location"),
            success: cb
          });
        }
      }
    });
  });
}

/////////////////////////////////////////
/////////////// view.html ///////////////
function buildURL(file, key, options="") {
  // get absolute url without final page
  // http://stackoverflow.com/questions/16417791/how-to-get-current-url-without-page-in-javascript-or-jquery
  let urlBase = url.substring(0, url.lastIndexOf('/')+1);

  return `#view${file}-${options}-${encodeURIComponent(key)}`;
}

// call on doc ready
// gets the file and its key, decrypts it, then downloads it
function getData(file, key) {
  key = decodeURIComponent(key);

  getFile(file, (response) => {
    let data = crypto.decryptFile(response, key);
    let base64data = `data:${data.mime};base64,${data.data}`;
  });
}

///////////////////////////////////////////
//////////////// index.html ///////////////
function previewFile(file, err) {
  let reader  = new FileReader();

  reader.addEventListener("load", () => {
    uploadFile(crypto.encryptFile(file, reader), (res, key) => {
      window.location.href = `/view.html#${res.filename}--${encodeURIComponent(key)}`;
    }, err);
  }, false);

  if(file) {
    reader.readAsDataURL(file._file);
  }
}


module.exports = {
  uploadHook: (file, done) => {
    previewFile(file, done);
    done("Uploaded");
  },
  view: getData
};
