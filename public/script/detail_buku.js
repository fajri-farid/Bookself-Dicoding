const params = new URLSearchParams(window.location.search);
const title = params.get("title");
const formattedtitle = title.replace(/-/g, " ");
const linkEdit = title.replace(/ /g, "-");
const encodedtitle = encodeURIComponent(linkEdit);
const editUrl = `edit-buku.html?title=${encodedtitle}`;

console.log("title:", title);
console.log("Formatted title:", formattedtitle);
console.log("Encoded title:", encodedtitle);

if (formattedtitle) {
  const dataBuku = JSON.parse(localStorage.getItem("bookData"));
  console.log(dataBuku);
  const buku = dataBuku.find((book) => book.title === formattedtitle);
  console.log(buku);

  if (buku) {
    document.getElementById("title").innerText = buku.title;
    document.getElementById("sinopsis").innerText = buku.sinopsis;
    document.getElementById("isComplete").innerText = buku.isComplete
      ? "sudah dibaca"
      : "belum dibaca";
    document.getElementById("year").innerText = buku.year;
    document.getElementById("genres").innerText = buku.genres.join(", ");
    document.getElementById("author").innerText = buku.author;
    document.getElementById("gambar").src = buku.gambar;

    const editLink = document.getElementById("editLink");
    editLink.href = editUrl;

    // Set toggle button text
    document.getElementById("toggleStatusText").innerText = buku.isComplete
      ? "Tandai Belum Dibaca"
      : "Tandai Sudah Dibaca";

    // Add event listener to the toggle status button
    document.getElementById("toggleStatusBtn").addEventListener("click", () => {
      toggleBookStatus(buku);
    });
  } else {
    document.getElementById("detailBuku").innerText =
      "Detail buku tidak ditemukan.";
  }
} else {
  document.getElementById("detailBuku").innerText =
    "title buku tidak ditemukan dalam parameter URL.";
}

function toggleBookStatus(buku) {
  // Toggle the isComplete status
  buku.isComplete = !buku.isComplete;

  // Update the localStorage with the new data
  const dataBuku = JSON.parse(localStorage.getItem("bookData"));
  const updatedDataBuku = dataBuku.map((book) =>
    book.title === buku.title ? buku : book
  );
  localStorage.setItem("bookData", JSON.stringify(updatedDataBuku));

  // Update the displayed status
  document.getElementById("isComplete").innerText = buku.isComplete
    ? "sudah dibaca"
    : "belum dibaca";

  // Update the button text
  document.getElementById("toggleStatusText").innerText = buku.isComplete
    ? "Tandai Belum Dibaca"
    : "Tandai Sudah Dibaca";

  // Log the action
  console.log("Status updated:", buku.isComplete);
}
