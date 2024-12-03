document.getElementById("searchBtn").addEventListener("click", () => {
  const ip = document.getElementById("ipInput").value;

  fetch(`https://ipapi.co/${ip}/json/`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("ip").textContent = data.ip;
      document.getElementById(
        "location"
      ).textContent = `${data.city}, ${data.region}, ${data.country_name}`;

      const utcOffset = data.utc_offset;
      const formattedTimezone = `UTC${utcOffset.slice(0, 3)}:${utcOffset.slice(
        3
      )}`;
      document.getElementById("timezone").textContent = formattedTimezone;

      document.getElementById("isp").textContent = data.org;

      const lat = data.latitude;
      const lon = data.longitude;

      let map = L.map("map").setView([lat, lon], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      L.marker([lat, lon])
        .addTo(map)
        .bindPopup(
          `Location: ${data.city}, ${data.region}, ${data.country_name}`
        )
        .openPopup();
    })
    .catch((err) => {
      console.error("Error fetching IP details:", err);
    });
});
