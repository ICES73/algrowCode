const socket = io();
var zip = new JSZip();

const buttonDonload = document.querySelector(".download-file");
var zipfile = "";

socket.on("file", (file) => {
  if (file == "nill") {
    console.log("Waiting for host to share files...");
  } else {
    var array = [];
    const blob = new Blob([file]);
    zip.loadAsync(blob).then(function () {
      zip.generateAsync({ type: "blob" }).then((blob) => {
        zipfile = blob;
        // saveAs(blob, "hello.zip");
      });
      Object.keys(zip.files).forEach(function (filename) {
        zip.files[filename].async("string").then(function (fileData) {
          array.push({ path: `${filename}`, data: fileData });
        });
      });
    });
    console.log(array);
  }
});

buttonDonload.addEventListener("click", () => {
  if (zipfile == "") {
    console.log("File have't been rcvd..");
  } else {
    saveAs(zipfile, "code.zip");
  }
});
