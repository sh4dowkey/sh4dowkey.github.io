// Load and render certificate and badge images from JSON
fetch("data/certificates.json")
  .then(res => res.json())
  .then(data => {
    const certGrid = document.getElementById("certificates-grid");
    const jobsimGrid = document.getElementById("jobsim-grid");
    const badgeGrid = document.getElementById("badges-grid");

    const createCard = (item, index = 0) => {
      const card = document.createElement("div");
      card.className = "cert-card";
      card.style.animationDelay = `${index * 200}ms`;

      const img = document.createElement("img");
      img.src = `assets/certificates/${item.file}`;
      img.alt = item.title || "Certificate Image";
      img.loading = "lazy";
      img.onclick = () => window.open(img.src, '_blank');

      const content = document.createElement("div");
      content.className = "cert-content";

      const title = document.createElement("h3");
      title.className = "cert-title";
      title.textContent = item.title || "Certificate";

      const issuer = document.createElement("p");
      issuer.className = "cert-issuer";
      issuer.textContent = item.issuer || "";

      content.appendChild(title);
      content.appendChild(issuer);

      card.appendChild(img);
      card.appendChild(content);

      return card;
    };

    // Certificates
    data.certificates.forEach((cert, index) =>
      certGrid.appendChild(createCard(cert, index))
    );

    // ✅ FIXED: Use correct jobsim data here
    data.jobsim.forEach((jobsim, index) =>
      jobsimGrid.appendChild(createCard(jobsim, index))
    );

    // Badges
    data.badges.forEach((badge, index) =>
      badgeGrid.appendChild(createCard(badge, index))
    );
  })
  .catch(err => console.error("❌ Failed to load certificates:", err));
