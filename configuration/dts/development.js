define('configuration/dts/development', ['configuration/development', 'Mobile/DTS/ApplicationModule'], function(baseConfiguration) {
    return mergeConfiguration(baseConfiguration, {
        modules: [
            new Mobile.DTS.ApplicationModule()
        ],
        connections: {
            'crm': {
                isDefault: true,
                offline: true,
                url: 'http://10.40.201.25/sdata_dts/slx/dynamic/-/',
                json: true
            }
        }
    });
});
