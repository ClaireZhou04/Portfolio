
const searchInput = document.querySelector('.form-control[aria-label="Search"]');
const suggestionsBox = document.querySelector('.suggestions-box');


function fetchSearchHistory(query = '') {
    fetch('search-history.php?q=' + encodeURIComponent(query))
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            suggestionsBox.innerHTML = ''; 

            if (data.length > 0) {
                data.forEach(item => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('suggestion-item');
                    suggestionItem.textContent = item;
                    suggestionItem.addEventListener('click', () => {
                        searchInput.value = item;
                        suggestionsBox.innerHTML = '';
                    });
                    suggestionsBox.appendChild(suggestionItem);
                });

                suggestionsBox.style.display = 'block'; 
            } else {
                suggestionsBox.style.display = 'none';
            }
        })
        .catch(error => console.error('Error fetching search history:', error));
}

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    fetchSearchHistory(query);
});

searchInput.addEventListener('focus', () => {
    fetchSearchHistory();
});

document.addEventListener('click', (event) => {
    if (!searchInput.contains(event.target) && !suggestionsBox.contains(event.target)) {
        suggestionsBox.style.display = 'none';
    }
});










const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("q");
const searchResultsContainer = document.getElementById("search-results");

if (query) {
    const matchingBooks = books.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase())
    );

    
    if (matchingBooks.length > 0) {
        matchingBooks.forEach(book => {
            const bookElement = document.createElement("div");
            bookElement.classList.add("book", "booksize");
            bookElement.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>Genre: ${book.genre}</p>
                <p>Price: $${book.price.toFixed(2)}</p>
                <button type="button" onclick="addToCart(${book.id})">Add to Cart</button>
            `;
            searchResultsContainer.appendChild(bookElement);
        });
    } else {
        searchResultsContainer.innerHTML = "<p>No books found matching your search query.</p>";
    }
} else {
    searchResultsContainer.innerHTML = "<p>Please enter a search query.</p>";
}
