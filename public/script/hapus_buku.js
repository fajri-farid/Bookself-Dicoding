function hapusBuku() {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");
  const formattedtitle = title.replace(/-/g, " ");

  if (confirm(`Apakah Anda yakin ingin menghapus buku "${formattedtitle}"?`)) {
    const dataBuku = JSON.parse(localStorage.getItem("bookData"));

    const index = dataBuku.findIndex((book) => book.title === formattedtitle);

    if (index !== -1) {
      dataBuku.splice(index, 1);

      localStorage.setItem("bookData", JSON.stringify(dataBuku));

      alert(`Buku "${formattedtitle}" telah berhasil dihapus.`);
      window.location.href = "index.html";
    } else {
      alert("Buku tidak ditemukan dalam data.");
    }
  }
}
