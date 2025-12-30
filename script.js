let state = {
    name: "",
    money: 150,
    day: 1,
    skills: []
};

function startGame() {
    const nameInp = document.getElementById('player-name').value;
    if (!nameInp) return alert("Buddy, tell me your name first!");
    
    state.name = nameInp;
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    
    renderMainMenu();
}

function updateUI(msg) {
    document.getElementById('day-val').innerText = state.day;
    document.getElementById('money-val').innerText = state.money;
    document.getElementById('narration').innerText = msg;
    
    const list = document.getElementById('skills-list');
    list.innerHTML = state.skills.length ? "" : "<li>None</li>";
    state.skills.forEach(s => {
        let li = document.createElement('li');
        li.innerText = s;
        list.appendChild(li);
    });
}

function renderMainMenu() {
    updateUI(`Day ${state.day}: What is your move, ${state.name}?`);
    const container = document.getElementById('options-container');
    container.innerHTML = `
        <button onclick="handleAction('save')">Save Money</button>
        <button onclick="handleAction('friends')">Spend on Friends</button>
        <button onclick="handleAction('skills')">Learn Skills</button>
        <button onclick="handleAction('lend')">Lend to Friend</button>
    `;
}

function handleAction(action) {
    if (action === 'save') {
        nextDay("Good decision bro! You saved your money.");
    } else if (action === 'skills') {
        renderSkillShop();
    } else if (action === 'lend') {
        renderLendMenu();
    } else if (action === 'friends') {
        renderPicnicMenu();
    }
}

// --- Skill Logic ---
function renderSkillShop() {
    updateUI("Meet Kareem at AR Software Hub. Pick a course!");
    const container = document.getElementById('options-container');
    container.innerHTML = `
        <button onclick="buySkill('c++ basic', 20)">C++ Basic (₹20)</button>
        <button onclick="buySkill('MS Excel', 25)">MS Excel (₹25)</button>
        <button style="grid-column: span 2" onclick="renderMainMenu()">⬅ Back</button>
    `;
}

function buySkill(skill, cost) {
    if (state.skills.includes(skill)) {
        alert("You already learned " + skill);
    } else if (state.money >= cost) {
        state.money -= cost;
        state.skills.push(skill);
        nextDay(`${skill} added to your resume!`);
    } else {
        alert("Not enough money!");
    }
}

// --- Lend/Nitesh Logic ---
function renderLendMenu() {
    updateUI("Nitesh needs ₹50 for medical treatment. Help him?");
    const container = document.getElementById('options-container');
    container.innerHTML = `
        <button onclick="helpNitesh('blood')">Donate Blood (+₹30)</button>
        <button onclick="helpNitesh('give')">Give ₹50</button>
        <button onclick="renderMainMenu()">Save Money</button>
    `;
}

function helpNitesh(type) {
    if (type === 'blood') {
        state.money += 30;
        nextDay("Thanks for donating blood bro! You got ₹30.");
    } else if (type === 'give') {
        if (state.money >= 50) {
            state.money -= 50;
            nextDay("Good decision buddy, you helped a friend.");
        } else {
            alert("Not enough money!");
        }
    }
}

// --- Picnic/Friends Logic ---
function renderPicnicMenu() {
    updateUI("Picnic time at Juhu Beach! Want to work or chill?");
    const container = document.getElementById('options-container');
    container.innerHTML = `
        <button onclick="picnicAction('earn')">Earn using Skill</button>
        <button onclick="picnicAction('spend')">Just Spend ₹50</button>
    `;
}

function picnicAction(type) {
    if (type === 'earn') {
        if (state.skills.length === 0) {
            updateUI("You have no skills bro!");
            setTimeout(renderMainMenu, 2000);
        } else {
            let totalEarned = 0;
            state.skills.forEach(s => { totalEarned += 10; });
            state.money += totalEarned;
            nextDay(`You taught your skills and earned ₹${totalEarned}!`);
        }
    } else {
        if (state.money >= 50) {
            state.money -= 50;
            nextDay("Money spent in picnic. Side hustle is the best journey, try that next time!");
        } else {
            alert("Not enough money!");
        }
    }
}

function nextDay(msg) {
    if (state.day >= 7) {
        document.getElementById('game-container').innerHTML = `
            <h1>Journey Over!</h1>
            <p>Final Balance: <strong>₹${state.money}</strong></p>
            <p>Skills: ${state.skills.join(", ") || "None"}</p>
            <button onclick="location.reload()">Restart Game</button>
        `;
    } else {
        state.day++;
        renderMainMenu();
        document.getElementById('narration').innerText = msg;
    }
}
