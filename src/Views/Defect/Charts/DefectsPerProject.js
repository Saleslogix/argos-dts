define('Mobile/DTS/Views/Defect/Charts/DefectsPerProject', [
    'dojo/_base/declare',
    'dojo/aspect',
    'dojo/_base/lang',
    'dojo/store/Observable',
    'dojox/charting/Chart',
    'dojox/charting/plot2d/Pie',
    'dojox/charting/StoreSeries',
    'dojox/charting/widget/Legend',
    'dojox/charting/action2d/Tooltip',
    'dojox/charting/themes/Julie',
    'argos/View',
    'argos/Store/SData'
], function(
    declare,
    aspect,
    lang,
    Observable,
    Chart,
    PiePlot,
    StoreSeries,
    Legend,
    Tooltip,
    ChartTheme,
    View,
    SDataStore
) {
    return declare('Mobile.DTS.Views.Defect.Charts.DefectsPerProject', [View], {
        id: 'chart_defects_per_project',
        titleText: 'Defects Per Project',
        components: [
            {name: 'content', tag: 'div', attrs:{'class': 'chart-content'}, attachPoint: 'contentNode'},
            {name: 'legend', tag: 'div', attrs:{'class': 'chart-legend'}, attachPoint: 'legendNode'}
        ],
        querySelect: [
            'name',
            'value'
        ],
        queryName: 'executeMetric',
        queryArgs: {
            '_filterName': 'VerTBF'
        },
        queryOrderBy: '',
        resourceKind: 'defects',
        keyProperty: '$key',
        store: null,
        _getStoreAttr: function() {
            return this.store || (this.store = this.createStore());
        },
        chart: null,
        chartRendered: false,
        chartHasData: false,
        legendHandle: null,
        onTransitionTo: function() {
            this.inherited(arguments);
            if (this.chart) {
                return;
            }

            var chart, store;

            chart = new Chart(this.contentNode, {
                title: 'Defects Per Project'
            });
            chart.setTheme(ChartTheme);

            chart.addPlot('default', {
                type: PiePlot,
                radius: 100,
                fontColor: 'black',
                labelStyle: 'columns',
                labelWiring: 'ccc'
            });

            store = this.get('store');

            aspect.after(store, '_onRequestFeedSuccess', lang.hitch(this, function() {
                this.chartHasData = true;
            }));

            chart.addSeries('name', new StoreSeries(store, {query: null}, function(item) {
                var o = {
                    y: item.value,
                    text: item.value + ' - ' + (item.$descriptor || '(null)')
                };
                return o;
            })); 

            aspect.after(chart, 'render', lang.hitch(this, function() {
                this.chartRendered = true;
            }));

            chart.render();
            this.chart = chart;

            this.legendHandle = setInterval(lang.hitch(this, function(){
                this.createLegend();
            }), 500);
        },
        createLegend: function() {
            if (this.chartHasData && this.chartRendered) {
                clearInterval(this.legendHandle);

                var legend = new Legend({chart: this.chart, horizontal: true}, this.legendNode);
                legend.startup();
            }
        },
        createStore: function() {
            // return an sdata store wrapped in an observable (required by dojox/charting/StoreSeries)
            var store = new SDataStore({
                service: this.getConnection(),
                resourceKind: this.resourceKind,
                select: this.querySelect,
                queryName: this.queryName,
                queryArgs: this.queryArgs,
                orderBy: this.queryOrderBy,
                idProperty: this.keyProperty,
                scope: this
            });
            return new Observable(store);
        }
    });
});
