// Connect to the APIs and make it happen :)// 👉 If you're using TMDB, put YOUR API KEY here:
const TMDB_API_KEY = "f46553b3eec77df2dccd1fd07e79b629";

// Helper for showing loading & errors
function setText(el, text) {
  if (!el) return;
  el.textContent = text;
}

document.addEventListener("DOMContentLoaded", () => {
  /* ----------------- 1. DOG API ----------------- */
  const dogBtn = document.getElementById("dog-btn");
  const dogImg = document.getElementById("dog-img");
  const dogStatus = document.getElementById("dog-status");

  dogBtn.addEventListener("click", async () => {
    setText(dogStatus, "Loading a good doggo...");
    dogImg.src = "";
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      dogImg.src = data.message;
      setText(dogStatus, "");
    } catch (err) {
      console.error(err);
      setText(dogStatus, "Could not load dog 😢");
    }
  });

  /* ----------------- 2. CAT API ----------------- */
  const catBtn = document.getElementById("cat-btn");
  const catImg = document.getElementById("cat-img");
  const catStatus = document.getElementById("cat-status");

  catBtn.addEventListener("click", async () => {
    setText(catStatus, "Summoning a cat...");
    catImg.src = "";
    try {
      const res = await fetch("https://api.thecatapi.com/v1/images/search");
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      if (!data[0] || !data[0].url) throw new Error("No cat image found");
      catImg.src = data[0].url;
      setText(catStatus, "");
    } catch (err) {
      console.error(err);
      setText(catStatus, "Could not load cat 😿");
    }
  });

  /* ----------------- 3. WEATHER (Open-Meteo) ----------------- */
  const weatherBtn = document.getElementById("weather-btn");
  const weatherOutput = document.getElementById("weather-output");

  weatherBtn.addEventListener("click", async () => {
    setText(weatherOutput, "Fetching current weather for Los Angeles...");
    try {
      const url =
        "https://api.open-meteo.com/v1/forecast?latitude=34.05&longitude=-118.24&current_weather=true";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      const cw = data.current_weather;
      if (!cw) throw new Error("No current weather in response");

      const { temperature, windspeed } = cw;
      setText(
        weatherOutput,
        `Temperature: ${temperature}°C | Wind: ${windspeed} km/h`
      );
    } catch (err) {
      console.error(err);
      setText(weatherOutput, "Could not load weather ☁️");
    }
  });

  /* ----------------- 4. CURRENCY (ExchangeRate API) ----------------- */
  const currencyBtn = document.getElementById("currency-btn");
  const currencyOutput = document.getElementById("currency-output");

  currencyBtn.addEventListener("click", async () => {
    setText(currencyOutput, "Fetching USD → EUR rate...");
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/USD");
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      if (data.result !== "success") throw new Error("API error");
      const eurRate = data.rates.EUR;
      setText(
        currencyOutput,
        `1 USD ≈ ${eurRate.toFixed(4)} EUR (via ExchangeRate API)`
      );
    } catch (err) {
      console.error(err);
      setText(currencyOutput, "Could not load exchange rate 💸");
    }
  });

  /* ----------------- 5. JOKE API ----------------- */
  const jokeBtn = document.getElementById("joke-btn");
  const jokeOutput = document.getElementById("joke-output");

  jokeBtn.addEventListener("click", async () => {
    setText(jokeOutput, "Loading a joke...");
    try {
      const res = await fetch(
        "https://v2.jokeapi.dev/joke/Any?type=single&safe-mode"
      );
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      setText(jokeOutput, data.joke || "No joke returned 🙃");
    } catch (err) {
      console.error(err);
      setText(jokeOutput, "Could not load joke 😅");
    }
  });

  /* ----------------- 6. GITHUB USER ----------------- */
  const githubInput = document.getElementById("github-username");
  const githubBtn = document.getElementById("github-btn");
  const githubOutput = document.getElementById("github-output");

  githubBtn.addEventListener("click", async () => {
    const username = (githubInput.value || "octocat").trim();
    githubOutput.innerHTML = "Loading profile...";

    try {
      const res = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}`
      );
      if (res.status === 404) {
        githubOutput.textContent = "User not found 😕";
        return;
      }
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();

      const {
        avatar_url,
        name,
        login,
        bio,
        public_repos,
        followers,
        html_url,
      } = data;

      githubOutput.innerHTML = `
        <img src="${avatar_url}" alt="${login}'s avatar" />
        <div>
          <h3>${name || login}</h3>
          <p>@${login}</p>
          <p>${bio || "No bio available."}</p>
          <p>Repos: ${public_repos} | Followers: ${followers}</p>
          <p><a href="${html_url}" target="_blank" rel="noopener noreferrer">View on GitHub</a></p>
        </div>
      `;
    } catch (err) {
      console.error(err);
      githubOutput.textContent = "Could not load GitHub user 🚧";
    }
  });

  /* ----------------- 7. MOVIES (TMDB) ----------------- */
  const moviesBtn = document.getElementById("movies-btn");
  const moviesList = document.getElementById("movies-list");

  moviesBtn.addEventListener("click", async () => {
    moviesList.innerHTML = "<li>Loading trending movies...</li>";

    if (!TMDB_API_KEY || TMDB_API_KEY === "PUT_YOUR_TMDB_API_KEY_HERE") {
      moviesList.innerHTML =
        "<li>⚠️ Add your TMDB API key in the JS panel first.</li>";
      return;
    }

    try {
      const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();

      const movies = data.results?.slice(0, 5) || [];
      if (movies.length === 0) {
        moviesList.innerHTML = "<li>No movies returned.</li>";
        return;
      }

      moviesList.innerHTML = movies
        .map(
          (movie) => `<li>${movie.title} (${movie.release_date || "N/A"})</li>`
        )
        .join("");
    } catch (err) {
      console.error(err);
      moviesList.innerHTML = "<li>Could not load movies 🎥</li>";
    }
  });

  /* ----------------- 8. BORED API (Activity) ----------------- */
  const activityBtn = document.getElementById("activity-btn");
  const activityOutput = document.getElementById("activity-output");
  const activityMeta = document.getElementById("activity-meta");

  activityBtn.addEventListener("click", async () => {
    setText(activityOutput, "Finding something fun to do...");
    setText(activityMeta, "");
    try {
      const res = await fetch("https://www.boredapi.com/api/activity");
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      const { activity, type, participants, price } = data;

      setText(activityOutput, activity || "No activity returned.");
      setText(
        activityMeta,
        `Type: ${type} | Participants: ${participants} | Price (0–1): ${price}`
      );
    } catch (err) {
      console.error("Activity API error:", err.message);
      setText(activityOutput, "Could not load activity 😴");
    }
  });
});
