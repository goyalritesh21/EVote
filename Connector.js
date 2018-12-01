api = {
    activities: [],
    url: 'http://172.31.75.200:8000/',
    getActivities(config) {
        fetch('http://172.31.75.200:8000/categories')
            .then(data => data.json())
            .then(cats => {
                for (const cat in cats) {
                    this.activities.push(cats[cat])
                }
                config.onSuccess(this.activities);
            })
            .catch(err => {
                config.onFailed(err);
            })
    },

};

module.exports = api;