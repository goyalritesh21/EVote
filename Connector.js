api = {
    activities: [],
    url: 'http://172.31.75.200:8000/',
    getActivities(config) {
        fetch('http://172.31.75.200:8000/categories')
            .then(data => data.json())
            .then(parties => {
                for (const party in parties) {
                    this.activities.push(parties[party])
                }
                config.onSuccess(this.activities);
            })
            .catch(err => {
                config.onFailed(err);
            })
    },

};

module.exports = api;