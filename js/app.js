// Search input
const SEARCH_USER = document.getElementById('searchUser');
let github = new GitHub();
let ui = new UI();

// Search input event listener
SEARCH_USER.addEventListener('keyup', e => {
    // Get input text
    let userText = e.target.value;

    // If not blank call GitHub API
    if (userText !== '') {
        github.getUser(userText)
        .then(data => {
            if (data.profile.message === 'Not Found') {
                // Show alert
                ui.showAlert('User not found', 'alert alert-danger');
                ui.clearProfile();
            } else {
                // Show profile
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
            }
        })
    } else {
        // Clear profile
        ui.clearProfile();
    }
});
