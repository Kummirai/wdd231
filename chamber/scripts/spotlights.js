const getSpotlights = async () => {
    try {
      const response = await fetch("./scripts/members.json");
      const data = await response.json();
      const members = data.businesses;
      const randomMembers = members.sort(() => 0.5 - Math.random()).slice(0, 3);
      let article = "";

      randomMembers.forEach(member => {
        article += `
          <div class="card">
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.tagline}</p>
          </div>
        `;
      });

      document.querySelector(".spotlight").innerHTML = article;

    } catch (error) {
      console.error("Error fetching members.json:", error);
    }
  };

  getSpotlights();