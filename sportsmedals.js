document.addEventListener('DOMContentLoaded', function () {
    fetch('sportsMedals.json')
        .then(response => response.json())
        .then(data => displayScoreboard(data))
        .catch(error => console.error('Error loading the scoreboard:', error));
});

function displayScoreboard(data) {
    const container = document.getElementById('scoreboard');
    data.forEach(sport => {
        const sportDiv = document.createElement('div');
        sportDiv.className = 'sport';

        const sportName = document.createElement('h2');
        sportName.textContent = sport.sport;
        sportDiv.appendChild(sportName);

        const table = document.createElement('table');
        table.className = 'table';
        const headerRow = table.insertRow();
        const headers = ['Medal', 'Winner'];
        headers.forEach(headerText => {
            let header = document.createElement('th');
            let textNode = document.createTextNode(headerText);
            header.appendChild(textNode);
            headerRow.appendChild(header);
        });

        sport.medals.forEach(medal => {
            let row = table.insertRow();
            let medalCell = row.insertCell();
            medalCell.textContent = medal.type;

            let winnerCell = row.insertCell();
            winnerCell.textContent = medal.winner;
        });

        sportDiv.appendChild(table);
        container.appendChild(sportDiv);
    });
}
