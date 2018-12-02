api = {
    activities: [],
    count: [],
    url: 'http://172.31.75.200:8000/',
    getActivities(config) {
        fetch(this.url + 'categories')
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
    getCount(config) {
        fetch(this.url + 'livecount')
            .then(data => data.json())
            .then(liveresult => {
                this.count = [];
                for (const party in liveresult) {
                    this.count.push(liveresult[party]);
                }
                config.onSuccess(this.count);
            })
            .catch(err => {
                config.onFailed(err);
            })
    }

};

module.exports = api;