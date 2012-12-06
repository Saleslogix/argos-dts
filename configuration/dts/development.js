define('configuration/dts/development', ['configuration/development', 'Mobile/DTS/ApplicationModule'], function(baseConfiguration, ApplicationModule) {
    return mergeConfiguration(baseConfiguration, {
        modules: [
            new ApplicationModule()
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
