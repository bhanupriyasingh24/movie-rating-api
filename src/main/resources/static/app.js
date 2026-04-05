document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('movieSearch');
    const container = document.getElementById('movieContainer');
    const dropdown = document.getElementById('suggestionsDropdown');

    let debounceTimer;

    // --- NEW: Live Typing Event (Debounced to avoid overwhelming server) ---
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        const query = e.target.value.trim();
        
        if (query.length < 3) {
            dropdown.classList.add('hidden'); // Hide if less than 3 letters
            return;
        }

        debounceTimer = setTimeout(() => {
            fetchSuggestions(query);
        }, 400); // Waits 400 milliseconds after you stop typing
    });

    // Hide dropdown when clicking anywhere outside of it
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            dropdown.classList.add('hidden');
        }
    });

    // Original search button functionality
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            // If they just hit search blindly, fetch the very first suggestion it can find
            fetchAndRenderFirstMatch(query);
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) fetchAndRenderFirstMatch(query);
        }
    });

    // --- Fetch the List of Suggestions ---
    async function fetchSuggestions(query) {
        try {
            const response = await fetch(`/api/movies/search?query=${encodeURIComponent(query)}`);
            const data = await response.json();

            if (data.Response === "True" && data.Search) {
                renderDropdown(data.Search);
            } else {
                dropdown.classList.add('hidden');
            }
        } catch (err) {
            console.error("Error fetching suggestions:", err);
            dropdown.classList.add('hidden');
        }
    }

    // --- Paint the Dropdown Menu ---
    function renderDropdown(movies) {
        dropdown.innerHTML = ''; // Clear old list
        
        // Only show top 5-7 results to keep it clean
        const topMovies = movies.slice(0, 6);

        topMovies.forEach(movie => {
            const li = document.createElement('li');
            li.className = 'suggestion-item';
            
            const posterUrl = (movie.Poster && movie.Poster !== "N/A") 
                ? movie.Poster 
                : 'https://via.placeholder.com/40x60/191c23/6d28d9?text=?';

            li.innerHTML = `
                <img src="${posterUrl}" alt="Poster" class="suggestion-poster" />
                <div class="suggestion-text">
                    <span class="s-title">${movie.Title}</span>
                    <span class="s-year">${movie.Year}</span>
                </div>
            `;

            // When a specific movie is clicked in the list!
            li.addEventListener('click', () => {
                searchInput.value = movie.Title; // Fill the bar
                dropdown.classList.add('hidden'); // Hide dropdown
                fetchMovieDetails(movie.imdbID); // Get the full data
            });

            dropdown.appendChild(li);
        });

        dropdown.classList.remove('hidden'); // Show it
    }

    // --- Fetch the FINAL Full Details ---
    async function fetchMovieDetails(imdbId) {
        // Show loading state
        const originalBtnText = searchBtn.innerText;
        searchBtn.innerHTML = '<div class="loader"></div>';
        searchBtn.disabled = true;

        try {
            const response = await fetch(`/api/movies/details?id=${encodeURIComponent(imdbId)}`);
            const movie = await response.json();

            if (movie.Title) {
                renderMovie(movie);
            } else {
                renderError("Failed to load movie details.");
            }
        } catch (error) {
            console.error("Error fetching details:", error);
            renderError("Oops! Something went wrong.");
        } finally {
            searchBtn.innerText = originalBtnText;
            searchBtn.disabled = false;
        }
    }

    // Fallback if they just hit 'Search' without picking from dropdown
    async function fetchAndRenderFirstMatch(query) {
        dropdown.classList.add('hidden');
        const originalBtnText = searchBtn.innerText;
        searchBtn.innerHTML = '<div class="loader"></div>';
        searchBtn.disabled = true;
        
        try {
            // Do a bulk search, grab the very first ID, and load its details
            const bulkResp = await fetch(`/api/movies/search?query=${encodeURIComponent(query)}`);
            const bulkData = await bulkResp.json();
            
            if (bulkData.Response === "True" && bulkData.Search && bulkData.Search.length > 0) {
                const firstMovieId = bulkData.Search[0].imdbID;
                await fetchMovieDetails(firstMovieId);
            } else {
                renderError("Movie not found. Try spelling it differently.");
                searchBtn.innerText = originalBtnText;
                searchBtn.disabled = false;
            }
        } catch (err) {
            renderError("Oops! Error talking to server.");
            searchBtn.innerText = originalBtnText;
            searchBtn.disabled = false;
        }
    }

    // --- Paint the Movie Card ---
    function renderMovie(movie) {
        const posterUrl = (movie.Poster && movie.Poster !== "N/A") 
            ? movie.Poster 
            : 'https://via.placeholder.com/300x450/191c23/6d28d9?text=No+Poster';

        container.innerHTML = `
            <div class="movie-card">
                <div class="movie-poster">
                    <img src="${posterUrl}" alt="${movie.Title} poster" />
                </div>
                <div class="movie-info">
                    <h2 class="movie-title">${movie.Title}</h2>
                    
                    <div class="movie-meta">
                        <span class="year">${movie.Year}</span>
                        <div class="imdb-rating">
                            <span>★</span> ${movie.imdbRating}
                        </div>
                    </div>

                    <div class="movie-director">
                        <strong>Director:</strong> ${movie.Director}
                    </div>
                </div>
            </div>
        `;
    }

    function renderError(message) {
        container.innerHTML = `
            <div class="empty-state">
                <span class="icon">🔍</span>
                <p>${message}</p>
            </div>
        `;
    }
});
