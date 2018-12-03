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
    },
    ifVoted(data, config) {
        fetch(this.url + 'ifvoted', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(data => data.json())
            .then(res => {
                if (res.ACK !== 'SUCCESS') {
                    config.onFailed(res);
                    return;
                }
                config.onSuccess(res);
            })
            .catch(err => {
                config.onFailed(err);
            })
    },
    castVote(data, config) {
        fetch(this.url + 'vote', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(data),
        })
            .then(data => data.json())
            .then(res => {
                if (res.ACK !== 'SUCCESS') {
                    config.onFailed(res);
                    return;
                }
                config.onSuccess(res);
            })
            .catch(err => {
                config.onFailed(err);
            })
    }

};

module.exports = api;