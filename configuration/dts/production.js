define('configuration/dts/production', ['configuration/production', 'Mobile/DTS/ApplicationModule'], function(baseConfiguration) {
    return mergeConfiguration(baseConfiguration, {
        modules: [
            new Mobile.DTS.ApplicationModule()
        ],
        connections: {
            'crm': {
                isDefault: true,
                offline: true,
                serverName: window.location.hostname,
                virtualDirectory: 'sdata',
                applicationName: 'slx',
                contractName: 'dynamic',
                port: window.location.port && window.location.port != 80 ? window.location.port : false,
                protocol: /https/i.test(window.location.protocol) ? 'https' : false,
                json: true
            }
        }
    });
});