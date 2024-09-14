const params = new URLSearchParams(window.location.search);
const title = params.get("title");
const formattedtitle = title.replace(/-/g, " ");

const dataBuku = JSON.parse(localStorage.getItem("bookData"));
const buku = dataBuku.find((book) => book.title === formattedtitle);

console.log(buku);

document.getElementById("title").value = buku.title;
document.getElementById("gambar_buku").src = buku.gambar;
document.getElementById("sinopsis").value = buku.sinopsis;
document.getElementById("author").value = buku.author;
document.getElementById("year").value = buku.year;
document.getElementById("isComplete").value = buku.isComplete
  ? "sudah dibaca"
  : "belum dibaca";

console.log(buku.gambar);
console.log("URL gambar buku:", buku.gambar);

buku.genres.forEach((genre) => {
  const checkbox = document.querySelector(`input[value="${genre}"]`);
  if (checkbox) {
    checkbox.checked = true;
  }
});

if (buku.gambar) {
  document.getElementById("preview").src = buku.gambar;
  document.getElementById("preview").style.display = "block";
}

function simpanEditBuku() {
  const titleBaru = document.getElementById("title").value;
  const sinopsis = document.getElementById("sinopsis").value;
  const author = document.getElementById("author").value;
  const year = parseInt(document.getElementById("year").value);
  const isCompleteValue = document.getElementById("isComplete").value;
  let isComplete;

  if (isCompleteValue === "sudah dibaca") {
    isComplete = true;
  } else if (isCompleteValue === "belum dibaca") {
    isComplete = false;
  }

  const gambarInput = document.getElementById("gambar_buku").files[0];
  const genres = [];

  document
    .querySelectorAll('input[type="checkbox"][name="genre"]:checked')
    .forEach(function (checkbox) {
      genres.push(checkbox.value);
    });

  if (
    titleBaru &&
    sinopsis &&
    author &&
    year &&
    isComplete !== undefined &&
    genres.length > 0
  ) {
    const index = dataBuku.findIndex((book) => book.title === formattedtitle);

    if (index !== -1) {
      const titleAsli = dataBuku[index].title;
      const timestamp = +new Date();

      if (gambarInput) {
        const reader = new FileReader();
        reader.onload = function () {
          const gambar = reader.result;

          dataBuku[index] = {
            id: timestamp,
            title: titleBaru,
            sinopsis,
            author,
            year,
            gambar,
            isComplete,
            genres,
          };

          localStorage.setItem("bookData", JSON.stringify(dataBuku));

          window.location.href =
            "index.html?title=" + encodeURIComponent(titleAsli);
        };

        reader.readAsDataURL(gambarInput);
      } else {
        dataBuku[index] = {
          id: timestamp,
          title: titleBaru,
          sinopsis,
          author,
          year,
          gambar: buku.gambar,
          isComplete,
          genres,
        };

        localStorage.setItem("bookData", JSON.stringify(dataBuku));
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
      }
    } else {
      alert("Buku tidak ditemukan.");
    }
  } else {
    alert("Mohon lengkapi semua field.");
  }
}

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

document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"][name="genre"]'
  );
  let checkedCount = 0;

  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      checkedCount++;
    }
  });

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

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");

  const formattedTitle = title.replace(/ /g, "-");

  const backButton = document.getElementById("backButton");
  backButton.href = `detail-buku.html?title=${encodeURIComponent(
    formattedTitle
  )}`;
});
