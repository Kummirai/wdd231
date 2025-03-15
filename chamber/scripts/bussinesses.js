const cardContainer = document.querySelector(".orgs");
console.log(cardContainer);

let card = "";

const getMembersData = async () => {
    try {
      const response = await fetch("./scripts/members.json"); 
      const data = await response.json();
      const members =  data.businesses;
      console.log(members);
      members.map((member)=>{
        card += `
                    <article>
                        <div class="org-name">
                            <h3>${member.name}</h3>
                            <p>${member.tagline}</p>
                        </div>
                        <div class="org-contact-info">
                            <div class="org-image">
                                <img src="images/org-image.webp" alt=${member.name}>
                            </div>
                            <div class="org-contact">
                                <p><span>Email: </span>${member.email}{</p>
                                <p><span>PHONE: </span>${member.phone}</p>
                                <p><span>URL: </span><a href="#">${member.website}</a></p>
                                <p>${member.membership_level}</p>
                                <p>${member.address}</p>
                            </div>
                        </div>
                    </article>
        `;
      })
      cardContainer.innerHTML = card;
      
    } catch (error) {
      console.error("Error fetching members.json:", error);
    }
  };
  
  getMembersData();
  