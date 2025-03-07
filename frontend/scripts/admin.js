document.addEventListener("DOMContentLoaded", ()=>{
    fetchUserRequests();
    fetchTopUsers();
    fetchTopTopics();

});
async function fetchTopUsers() {
    try {
        const response = await fetch('http://localhost:3000/topusers',{
            method: "GET"
        }); // Replace with your backend route for top users
        const data = await response.json();
        console.log("Top Users:", data);
        renderTopUsers(data);
    } catch (error) {
        console.error('Error fetching top users:', error);
    }
}
function renderTopUsers(users) {
    const topUsersList = document.getElementsByClassName("topUsersList")[0];
    topUsersList.innerHTML = ''; // Clear any existing content

    if (users.length < 1) {
        topUsersList.innerHTML = `<p>No top users available</p>`;
    } else {
        users.map(user => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${user.userName}</strong>  ${user.totalScan} Scans`;
            topUsersList.appendChild(listItem);
        });
    }
}
async function fetchTopTopics() {
    try {
        const response = await fetch('http://localhost:3000/topic',{
            method:"GET"
        }); // Replace with your backend route for top topics
        const data = await response.json();
        console.log("Top Topics:", data);
        renderTopTopics(data);
    } catch (error) {
        console.error('Error fetching top topics:', error);
    }
}
function renderTopTopics(topics) {
    const topTopicsList = document.getElementsByClassName("topTopicsList")[0];
    topTopicsList.innerHTML = ''; // Clear any existing content

    if (topics.length < 1) {
        topTopicsList.innerHTML = `<p>No common searched topics available</p>`;
    } else {
        topics.map(topic => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `${topic.topic} (${topic.count} searches)`;
            topTopicsList.appendChild(listItem);
        });
    }
}

async function fetchUserRequests() {
    try {
        const response = await fetch('http://localhost:3000/getcreditrequest'); // Replace with your backend route
        const data = await response.json();
        console.log(data);
        // Handle successful data retrieval
        renderRequests(data);
    } catch (error) {
        console.error('Error fetching user requests:', error);
    }
}

function renderRequests(users) {
    const mainDiv=document.getElementById("creditReq");
    // mainDiv.innerHTML = '';
    console.log(mainDiv);
    if(users.length<1)
    {
        mainDiv.innerHTML=`<p>No request</p>`
    }
    else{
         users.map(user => {
        const requestDiv=document.createElement("div");
        requestDiv.classList.add("request");
        requestDiv.setAttribute('data-key', user.userId);
 
         requestDiv.innerHTML = `
             <h3>${user.userName}</h3>
             <p>Current Credits: ${user.credits}</p>
             <p>Assign Credits: 
                 <input type="number" id="creditInput-${user.userId}" min="1" value="0">
             </p>
             <div class="decision-Btn">
                 <button class="approve" onclick="approveUser('${user.userId}')" >Approve</button>
                 <button class="reject" onclick="rejectUser('${user.userId}')" >Reject</button>
             </div>
         `;
 
         mainDiv.appendChild(requestDiv);
     });
    }
}

async function approveUser(userId) {
    const creditInput = document.getElementById(`creditInput-${userId}`);
    const assignedCredits = creditInput.value; 


    console.log(`User ID: ${userId}, Assigned Credits: ${assignedCredits}`);

try {
    const response=await fetch(`http://localhost:3000/approve/?userId=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            credits: assignedCredits,
        })
    });
    const data=await response.json()  ;
    if(response.status === 200)
        {
            console.log("SUCCESSFULLY CRTEDITED");
        } 
} catch (error) {
    console.error(error);
}
}

async function rejectUser(userId) {

    try {
        const response=await fetch(`http://localhost:3000/decline/?userId=${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data=await response.json()  ;
        if(response.status === 200)
            {
                console.log("SDeclined Request");
            } 
    } catch (error) {
        console.error(error);
    }
    // console.log(`User ID ${userId} rejected`);
}