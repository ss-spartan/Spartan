const SpartanFMService = (function () {
    let instance;

    function createInstance(apiKey, apiSecret) {
        const axios = require('axios');
        return {
            async getRecentTracks(user) {
                const url = 'https://ws.audioscrobbler.com/2.0/';
                const params = {
                    method: 'user.getrecenttracks',
                    user,
                    api_key: apiKey,
                    format: 'json',
                };

                const response = await axios.get(url, { params });
                return response.data.recenttracks.track;
            }
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance(process.env.LASTFM_API, process.env.LASTFM_API_SECRET);
            }
            return instance;
        }
    };
})();

module.exports = SpartanFMService.getInstance();
