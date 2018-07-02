class GitHub {
    constructor() {
        this.getEnvVars();
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    getEnvVars() {
        fetch('env.json')
        .then(response => response.json())
        .then(env => {
            for (let prop in env) {
                this[prop] = env[prop]
            }
        })
        .catch(error => console.log(error));
    }

    async getUser(user) {
        let profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        let repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

        let profile = await profileResponse.json();
        let repos = await repoResponse.json();

        return {
            profile,
            repos
        };
    }
}