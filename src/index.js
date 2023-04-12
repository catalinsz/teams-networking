let allTeams = [];

function getTeamsRequest() {
  return fetch("http://localhost:3000/teams-json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(r => r.json());
}

function createTeamsRequest(team) {
  return fetch("http://localhost:3000/teams-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  }).then(r => r.json());
}

function deleteTeamsRequest(id) {
  return fetch("http://localhost:3000/teams-json/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  }).then(r => r.json());
}

function getTeamsAsHTML(team) {
  return `
    <tr>
        <td>${team.promotion}</td>
        <td>${team.members}</td>
        <td>${team.name}</td>
        <td>${team.url}</td>
        <td>
            <a data-id="${team.id}" class="link-btn remove-btn">✖</a>
            <a data-id="${team.id}" class="link-btn edit-btn">&#9998</a>
        </td>
    </tr>
    `;
}

function showTeams(teams) {
  const html = teams.map(getTeamsAsHTML);
  $("table tbody").innerHTML = html.join("");
}

function $(selector) {
  return document.querySelector(selector);
}

function formSubmit(e) {
  e.preventDefault();

  const promotion = $("#promotion").value;
  const members = $("#members").value;
  const projectName = $("#projectName").value;
  const projectUrl = $("#projectUrl").value;

  const team = {
    promotion,
    members,
    name: projectName,
    url: projectUrl
  };
  createTeamsRequest(team).then(() => window.location.reload());
}

function deleteTeam(id) {
  deleteTeamsRequest(id).then(status => {
    if (status.success) {
      window.location.reload();
    }
  });
}

function startEdit(id) {
  const team = allTeams.find(team => team.id === id);

  $("#promotion").value = team.promotion;
  $("#members").value = team.members;
  $("#projectName").value = team.name;
  $("#projectUrl").value = team.url;
}

function initEvents() {
  $("#editForm").addEventListener("submit", formSubmit);

  $("table tbody").addEventListener("click", e => {
    if (e.target.matches("a.remove-btn")) {
      const id = e.target.dataset.id;
      deleteTeam(id);
    } else if (e.target.matches("a.edit-btn")) {
      const id = e.target.dataset.id;
      editTeam(id);
    }
  });
}

getTeamsRequest().then(teams => {
  allTeams = teams;
  showTeams(teams);
});

initEvents();
