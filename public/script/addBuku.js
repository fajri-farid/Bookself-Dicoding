function simpanBuku() {
  const title = document.getElementById("judul").value;
  const sinopsis = document.getElementById("sinopsis").value;
  const author = document.getElementById("author").value;
  const year = parseInt(document.getElementById("year").value);
  const isComplete = document.getElementById("status").value !== "belum dibaca";
  const gambarInput = document.getElementById("gambar_buku").files[0];

  const genres = [];

  if (title && sinopsis && author && year && gambarInput) {
    const id = +new Date();

    const reader = new FileReader();

    reader.onload = function () {
      const gambar = reader.result;

      document
        .querySelectorAll('input[type="checkbox"][name="genre"]:checked')
        .forEach(function (checkbox) {
          genres.push(checkbox.value);
        });

      if (genres.length > 0) {
        const dataBuku = {
          id,
          title,
          sinopsis,
          author,
          year,
          gambar,
          isComplete,
          genres,
        };
        simpanKeLocalStorage(dataBuku);

        Toastify({
          text: "Buku berhasil disimpan!",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () {},
        }).showToast();
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
        resetForm();
      } else {
        Toastify({
          text: "Pilih setidaknya satu genre!",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () {},
        }).showToast();
      }
    };

    reader.readAsDataURL(gambarInput);
  } else {
    Toastify({
      text: "Harap semua field diisi!",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #ff6347, #ff0000)",
      },
      onClick: function () {},
    }).showToast();
  }
}

function resetForm() {
  document.getElementById("formBuku").reset();
  document.getElementById("preview").src = "";
  document.getElementById("preview").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"][name="genre"]'
  );
  let checkedCount = 0;

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        if (checkedCount >= 3) {
          this.checked = false;
          Toastify({
            text: "Anda hanya dapat mengisi 3 genre!",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, #ff6347, #ff0000)",
            },
            onClick: function () {},
          }).showToast();
        } else {
          checkedCount++;
        }
      } else {
        checkedCount--;
      }
    });
  });
});

function previewImage(input) {
  const preview = document.getElementById("preview");
  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    if (reader.readyState === FileReader.DONE) {
      preview.src = reader.result;
      preview.style.display = "block";
    }
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
    preview.style.display = "none";
  }
}

function simpanKeLocalStorage(dataBuku) {
  var existingData = JSON.parse(localStorage.getItem("bookData")) || [];

  existingData.push(dataBuku);

  localStorage.setItem("bookData", JSON.stringify(existingData));
}

function resetForm() {
  document.getElementById("formBuku").reset();
  document.getElementById("preview").src = "";
  document.getElementById("preview").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"][name="genre"]'
  );
  let checkedCount = 0;

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        if (checkedCount >= 3) {
          this.checked = false;
          Toastify({
            text: "anda hanya dapat mengisi 3 genre!",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, #ff6347, #ff0000)",
            },
            onClick: function () {},
          }).showToast();
        } else {
          checkedCount++;
        }
      } else {
        checkedCount--;
      }
    });
  });
});
