define('Mobile/DTS/Views/Chart', [
    'dojo/_base/declare',
    'dojo/aspect',
    'dojo/_base/lang',
    'dojo/_base/Deferred',
    'argos/View',
    'argos/Store/SData',
    'argos/ScrollContainer'
], function(
    declare,
    aspect,
    lang,
    Deferred,
    View,
    SDataStore,
    ScrollContainer
) {
    return declare('Mobile.DTS.Views.Chart', [View], {
        id: 'generic_chart_view',
        titleText: 'Generic Chart View',
        components: [
            {name: 'scroller', type: ScrollContainer, components:[
                {name: 'scroll', tag: 'div', components: [
                    {name: 'content', tag: 'div', attrs:{'class': 'chart-content'}, attachPoint: 'contentNode'},
                    {name: 'legend', tag: 'div', attrs:{'class': 'chart-legend'}, attachPoint: 'legendNode'}
                ]}
            ]}
        ],

        // Store Options
        querySelect: null, 
        queryName: null,
        queryArgs: null,
        queryOrderBy: null,
        resourceKind: null,
        resourcePredicate: null,
        contractName: null,
        keyProperty: null, 
        applicationName: null,
        position: 0,
        pageSize: 100,

        store: null,

        // Chart Properties
        chart: null,
        chartData: null,
        chartLabels: null,
        chartRendered: false,
        chartHasData: false,
        legend: null,
        legendHandle: null,
        _dataDeferred: null,

        onStartup: function() {
            this.inherited(arguments);
            this.chartData = [];

            this._dataDeferred = new Deferred();
            this.getData();
        },
        onTransitionTo: function() {
            this.inherited(arguments);

            if (this.chart) {
                return;
            }
            
            this._dataDeferred.then(lang.hitch(this, function(data) {
                this.chart = this.createChart(data);
                if (this.chart) {
                    aspect.after(this.chart, 'render', lang.hitch(this, function() {
                        this.legend = this.createLegend();
                    }));
                }
            }), function(err) {
                console.error(err);
            });
        },
        createChart: function(data) {
            // Override chart rendering code here
            // Should return a chart object (dojox)
        },
        createLegend: function() {
            // Override legend rendering code here
            // this.chart will be available
            // Should return a legend object (dojox)
        },
        getData: function() {
            var store, queryOptions, queryResults;
            queryOptions = {
                count: this.pageSize,
                start: this.position
            };

            store = this.get('store');
            queryResults = store.query(null, queryOptions);

            Deferred.when(queryResults, lang.hitch(this, this._onQuerySuccess, queryResults), lang.hitch(this, this._onQueryError));
        },
        _onQuerySuccess: function(queryResults, items) {
            var total = queryResults.total;

            queryResults.forEach(lang.hitch(this, this._processItem));

            var left = -1;
            if (total > -1) {
                left = total - (this.position + this.pageSize);
            }

            if (left > 0) {
                this.position = this.position + this.pageSize; 
                this.getData();
            } else {
                // Signal complete
                this._dataDeferred.callback(this.chartData);
            }
        },
        _processItem: function(item) {
            this.chartData.push(item);
        },
        _onQueryError: function(queryOptions, error) {
        },
        createStore: function() {
            var store = new SDataStore({
                service: this.getConnection(),
                resourceKind: this.resourceKind,
                resourcePredicate: this.resourcePredicate,
                contractName: this.contractName,
                select: this.querySelect,
                queryName: this.queryName,
                queryArgs: this.queryArgs,
                orderBy: this.queryOrderBy,
                idProperty: this.keyProperty,
                scope: this
            });

            if (this.applicationName) {
                // TODO: SDK should allow setting of applicationName 
                aspect.around(store, '_createFeedRequest', lang.hitch(this, function(orig) {
                    var appName = this.applicationName;
                    return function(query, queryOptions) {
                        var request = orig.call(store, query, queryOptions);
                        request.setApplicationName(appName);
                        return request;
                    };
                }));
            }

            return store;
        },
        _getStoreAttr: function() {
            return (this.store = this.createStore());
        }
    });
});
