document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('movieSearch');
    const container = document.getElementById('movieContainer');

    // Listen for Button Clicks
    searchBtn.addEventListener('click', performSearch);
    
    // Listen for pressing "Enter" on the keyboard
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    async function performSearch() {
        const query = searchInput.value.trim();
        if (!query) return;

        // Visual cue: Show loading animation on the button
        const originalBtnText = searchBtn.innerText;
        searchBtn.innerHTML = '<div class="loader"></div>';
        searchBtn.disabled = true;

        try {
            // The invisible phone call to the Receptionist!
            const response = await fetch(`/api/movies?search=${encodeURIComponent(query)}`);
            const movie = await response.json();

            // Decorating the screen with the returned data
            if (movie.Title) {
                renderMovie(movie);
            } else {
                renderError("Movie not found. Please try another title.");
            }
        } catch (error) {
            console.error("Error fetching movie:", error);
            renderError("Oops! Something went wrong trying to talk to the server.");
        } finally {
            // Put the button back to normal
            searchBtn.innerText = originalBtnText;
            searchBtn.disabled = false;
        }
    }

    function renderMovie(movie) {
        // Fallback placeholder just in case the movie has no poster
        const posterUrl = (movie.Poster && movie.Poster !== "N/A") 
            ? movie.Poster 
            : 'https://via.placeholder.com/300x450/191c23/6d28d9?text=No+Poster';

        // Injecting the movie details into the empty canvas
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
