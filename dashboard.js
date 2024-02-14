import { collection, getDoc, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

const db = window.db;


// Reference to the table body
const tableBody = document.getElementById('tallyTable').getElementsByTagName('tbody')[0];


const renderTable = (school, data) => {
    // Create a header row for the school
    const schoolRow = tableBody.insertRow();
    const schoolCell = schoolRow.insertCell(0);
    schoolCell.textContent = school;
    schoolCell.colSpan = 3; // Update colspan to 3 to accommodate the buttons
    schoolCell.style.fontWeight = 'bold';

    // Iterate over the medals for the school
    ['GOLD', 'SILVER', 'BRONZE'].forEach(medal => {
        const count = data[medal] || 0;
        const row = tableBody.insertRow();
        const cellMedal = row.insertCell(0);
        const cellCount = row.insertCell(1);
        const cellButtons = row.insertCell(2); // Cell for the buttons

        cellMedal.textContent = medal;
        cellCount.textContent = count;

        // Create increment and decrement buttons
        const incrementButton = document.createElement('button');
        incrementButton.textContent = '+';
        incrementButton.onclick = () => updateCount(school, medal, count + 1);
        cellButtons.appendChild(incrementButton);

        const decrementButton = document.createElement('button');
        decrementButton.textContent = '-';
        decrementButton.onclick = () => updateCount(school, medal, Math.max(count - 1, 0));
        cellButtons.appendChild(decrementButton);
    });
};

// Function to update the count in Firestore
const updateCount = (school, medal, updatedValue) => {
    const schoolDocRef = doc(db, 'TALLY', school);
    updateDoc(schoolDocRef, { [medal]: updatedValue }).then(() => {
        // Clear the table body before re-rendering
        tableBody.innerHTML = '';

        // Refresh the table to show the updated value
        schools.forEach(school => {
            const schoolDocRef = doc(db, 'TALLY', school);
            getDoc(schoolDocRef).then(docSnapshot => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    renderTable(school, data);
                } else {
                    console.log(`Document for ${school} does not exist!`);
                }
            });
        });
    });
};



const schools = ['CCAD', 'COS', 'SOM', 'CSS'];

schools.forEach(school => {
    const schoolDocRef = doc(db, 'TALLY', school);
    getDoc(schoolDocRef).then(docSnapshot => {
        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            renderTable(school, data);
        } else {
            console.log(`Document for ${school} does not exist!`);
        }
    });
});

