document.addEventListener('DOMContentLoaded', function () {
    fetch('medalTally.json')
        .then(response => response.json())
        .then(data => displayMedalTally(data))
        .catch(error => console.error('Error loading the medal tally:', error));
});

function displayMedalTally(data) {
    const container = document.getElementById('medalTally');
    const table = document.createElement('table');
    table.className = 'table';
    const headerRow = table.insertRow();
    const headers = ['College', 'Gold', 'Silver', 'Bronze'];
    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });

    Object.entries(data).forEach(([college, medals]) => {
        let row = table.insertRow();
        let cell = row.insertCell();
        let text = document.createTextNode(college);
        cell.appendChild(text);

        Object.values(medals).forEach(text => {
            let cell = row.insertCell();
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
        });
    });

    container.appendChild(table);
}
