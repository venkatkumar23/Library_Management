let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");
let options = {
    method: "GET"
};
spinnerEl.classList.add("d-none");

function g(result) {
    let {
        title,
        imageLink,
        author
    } = result;
    let div = document.createElement("div");
    div.classList.add("text-center", "col", "col-6", "d-flex", "flex-column");
    searchResults.appendChild(div);
    let image = document.createElement("img");
    image.src = imageLink;
    image.classList.add("image");
    div.appendChild(image);

    let authorName = document.createElement("p");
    authorName.textContent = author;
    div.appendChild(authorName);
}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");
    for (let result of searchResults) {
        g(result);
    }
}

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchResults.textContent = "";
        spinnerEl.classList.remove("d-none");
        let value = searchInput.value;
        let url = "https://apis.ccbp.in/book-store?title=" + value;
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                if (jsonData.total === 0) {
                    let mainHeading = document.createElement("h1");
                    mainHeading.textContent = "No results found";
                    mainHeading.classList.add("ki");
                    searchResults.appendChild(mainHeading);
                } else {
                    let mainHeading = document.createElement("h1");
                    mainHeading.textContent = "Popular Books";
                    mainHeading.classList.add("ki");
                    searchResults.appendChild(mainHeading);
                    displayResults(search_results);
                }
            });
    }
});
