// Make an API request to get user data
fetch('/admin/get-users', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
.then(response => response.json())
.then(data => {
    const userList = document.getElementById('user-list');
    
    // Iterate through the user data and populate the table
    data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
        `;
        userList.appendChild(row);
    });
})
.catch(error => {
    console.error('Error fetching user data:', error);
});
