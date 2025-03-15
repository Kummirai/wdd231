const getMembersData = async () => {
    try {
      const response = await fetch("./scripts/members.json"); 
      const data = await response.json();
      const members =  data.businesses;
      console.log(members);
      function generateContent() {
        const listContainer = document.getElementById('list');
        const gridContainer = document.getElementById('grid');
        members.forEach(member => {
            const article = `
                <article>
                    <div class="org-name">
                        <h3>${member.name}</h3>
                        <p>${member.tagline}</p>
                    </div>
                    <div class="org-contact-info">
                        <div class="org-image">
                            <img src="${member.image}" alt="${member.name}">
                        </div>
                        <div class="org-contact">
                            <p><span>Email: </span>${member.email}</p>
                            <p><span>Phone: </span>${member.phone}</p>
                            <p><span>URL: </span><a href="#">${member.website}</a></p>
                            <p><span>Membership Level: </span>${member.membership_level}</p>
                            <p>${member.address}</p>
                        </div>
                    </div>
                </article>
            `;
            const listItem = `
                <li>
                    <div class="org-name">
                        <h3>${member.name}</h3>
                        <p>${member.tagline}</p>
                    </div>
                    <div class="org-contact-info">
                        <div class="org-contact">
                            <p><span>Email: </span>${member.email}</p>
                            <p><span>Phone: </span>${member.phone}</p>
                            <p><span>URL: </span><a href="#">${member.website}</a></p>
                            <p><span>Membership Level: </span>${member.membership_level}</p>
                            <p>${member.address}</p>
                        </div>
                    </div>
                </li>
            `;
            listContainer.innerHTML += listItem;
            gridContainer.innerHTML += article;
        });
    };

    generateContent();
      
    } catch (error) {
      console.error("Error fetching members.json:", error);
    }
  };
  
  getMembersData();
  

  function toggleView() {
    var listView = document.getElementById('list');
    var gridView = document.getElementById('grid');
    var toggleButton = document.querySelector('.toggle-btn');

    if (listView.style.display === "none") {
        listView.style.display = "block";
        gridView.style.display = "none";
        toggleButton.textContent = "Switch to Grid View"; 
    } else {
        listView.style.display = "none";
        gridView.style.display = "grid";
        toggleButton.textContent = "Switch to List View"; 
    }
}