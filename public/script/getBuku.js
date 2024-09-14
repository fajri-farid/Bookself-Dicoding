const bookData = JSON.parse(localStorage.getItem("bookData")) || [];
const searchInput = document.getElementById("searchInput");

function displayAllBooks(books) {
  const sudahDibacaList = document.getElementById("sudahDibaca");
  const belumDibacaList = document.getElementById("belumDibaca");
  const notFoundContainer = document.getElementById("notFound");

  console.log("Books Data:", books);

  sudahDibacaList.innerHTML = "";
  belumDibacaList.innerHTML = "";
  notFoundContainer.innerHTML = "";

  if (books.length === 0) {
    notFoundContainer.style.display = "block";
    const notFoundImage = document.createElement("img");
    notFoundImage.src = "assets/not-found.png";
    notFoundImage.alt = "Data not found";
    notFoundContainer.appendChild(notFoundImage);
  } else {
    notFoundContainer.style.display = "none";
    books.forEach((book) => {
      const bookContainer = document.createElement("div");
      bookContainer.classList.add("book-container");

      let titleLimit = 13;
      let genreLimit = 17;
      if (window.innerWidth >= 640 && window.innerWidth < 768) {
        titleLimit = 15;
        genreLimit = 14;
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        titleLimit = 10;
        genreLimit = 15;
      } else if (window.innerWidth >= 1024) {
        titleLimit = 15;
        genreLimit = 17;
      }

      const truncatedTitle =
        book.title.length > titleLimit
          ? book.title.substring(0, titleLimit) + "..."
          : book.title;

      const truncatedGenre =
        book.genres.join(", ").length > genreLimit
          ? book.genres.join(", ").substring(0, genreLimit) + "..."
          : book.genres.join(", ");

      const formattedTitle = book.title.replace(/ /g, "-");
      const detailUrl = `detail-buku.html?title=${encodeURIComponent(
        formattedTitle
      )}`;

      const text = `
        <a href="${detailUrl}">
          <img src="${
            book.gambar
          }" width="200px" alt="Gambar Buku" class="book-image">
          <p class="font-bold text-xl" id="title">${truncatedTitle}</p>
          <p id="genre">${truncatedGenre}</p>
          <p>${book.isComplete ? "sudah dibaca" : "belum dibaca"}</p>
        </a>`;

      bookContainer.innerHTML = text;

      console.log("Book:", book.title, "isComplete:", book.isComplete);

      if (book.isComplete) {
        console.log("Appending to sudahDibacaList");
        sudahDibacaList.appendChild(bookContainer);
      } else {
        console.log("Appending to belumDibacaList");
        belumDibacaList.appendChild(bookContainer);
      }
    });
  }
}

function filterBooks() {
  const searchText = searchInput.value.toLowerCase().trim();
  console.log("Search Text:", searchText);

  let filteredBooks = bookData;

  if (searchText !== "") {
    filteredBooks = filteredBooks.filter((book) =>
      book.title.toLowerCase().includes(searchText)
    );
  }

  displayAllBooks(filteredBooks);
}

searchInput.addEventListener("input", filterBooks);
window.addEventListener("resize", filterBooks);

displayAllBooks(bookData);
