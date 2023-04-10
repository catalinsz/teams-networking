function getTeamsRequest() {
  return fetch("http://localhost:3000/teams-json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());
}

function createTeamsRequest(team) {
  return fetch("http://localhost:3000/teams-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  }).then((r) => r.json());
}

function getTeamsAsHTML(team) {
  return `
    <tr>
        <td>${team.promotion}</td>
        <td>${team.members}</td>
        <td>${team.name}</td>
        <td>${team.url}</td>
        <td></td>
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
    promotion: promotion,
    members: members,
    name: projectName,
    url: projectUrl,
  };
  createTeamsRequest(team).then(() => window.location.reload());
}

function initEvents() {
  $("#editForm").addEventListener("submit", formSubmit);
}

getTeamsRequest().then((teams) => {
  showTeams(teams);
});

initEvents();
