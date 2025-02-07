async function loadRSS() {
    const response = await fetch("https://masonyoungblood.github.io/rss.xml");
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");

    const items = xml.querySelectorAll("item");
    let html = "";

    items.forEach(el => {
        let title = el.querySelector("title").textContent;
        let link = el.querySelector("link").textContent;
        let description = el.querySelector("description").textContent;
        let image = el.querySelector("enclosure")?.getAttribute("url") || "https://via.placeholder.com/150";

        html += `
            <div class="rss-item">
                <img src="${image}" alt="Article Image">
                <div class="rss-text">
                    <h3><a href="${link}" target="_blank">${title}</a></h3>
                    <p>${description}</p>
                </div>
            </div>
        `;
    });

    document.querySelectorAll(".rss-feed-container").forEach(container => {
        container.innerHTML = html;
    });
}

loadRSS();
