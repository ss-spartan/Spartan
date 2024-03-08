const axios = require('axios');

class LastfmService {
    constructor(apiKey, apiSecret) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    async getRecentTracks(user) {
        const url = 'https://ws.audioscrobbler.com/2.0/';
        const params = {
            method: 'user.getrecenttracks',
            user,
            api_key: this.apiKey,
            format: 'json',
        };

        const response = await axios.get(url, { params });

        return response.data.recenttracks.track;
    }
}

module.exports = LastfmService;
