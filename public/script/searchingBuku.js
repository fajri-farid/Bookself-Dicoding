document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchResultsContainer = document.getElementById("searchResults");

  function displaySearchResults(results) {
    searchResultsContainer.innerHTML = "";

    results.forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.textContent = book.judul;
      searchResultsContainer.appendChild(bookElement);
    });
  }

  function searchBooks(searchTerm) {
    const bookData = JSON.parse(localStorage.getItem("bookData")) || [];
    const filteredBooks = bookData.filter((book) => {
      return book.judul.toLowerCase().includes(searchTerm);
    });

    displaySearchResults(filteredBooks);
  }

  function handleInputChange() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    localStorage.setItem("bookData", searchTerm);
    searchBooks(searchTerm);
  }

  searchInput.addEventListener("input", handleInputChange);

  const previousSearch = localStorage.getItem("bookData");
  if (previousSearch) {
    searchInput.value = previousSearch;
    searchBooks(previousSearch);
  }
});

function navigateToAddBook() {
  window.location.href = "tambah-buku.html";
}
