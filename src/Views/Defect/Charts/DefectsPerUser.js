define('Mobile/DTS/Views/Defect/Charts/DefectsPerUser', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-style',
    'dojox/charting/Chart',
    'dojox/charting/plot2d/ClusteredBars',
    'dojox/charting/axis2d/Default',
    'dojox/charting/StoreSeries',
    'dojox/charting/widget/Legend',
    'dojox/charting/themes/Julie',
    'Mobile/DTS/Views/Chart'
], function(
    declare,
    lang,
    array,
    domStyle,
    Chart,
    PlotType,
    Default,
    StoreSeries,
    Legend,
    JulieTheme,
    ChartView
) {
    return declare('Mobile.DTS.Views.Defect.Charts.DefectsPerUser', [ChartView], {
        id: 'chart_defects_per_user',
        titleText: 'Defects Per User',
        querySelect: [
            'VerTBF',
            'DefectTotal',
            'NameLF'
        ],
        queryName: 'execute',
        queryArgs: {
            '_resultName': 'OpenDefectsPerUser'
        },
        queryOrderBy: '',
        resourceKind: 'mashups',
        resourcePredicate: "'MobileCharting'",
        applicationName: '$app',
        contractName: 'mashups',
        keyProperty: '$key',

        createChart: function (feedData) {
            var chart, store, data, labels;

            // Set custom height/width here- TODO: Auto calculate this?
            domStyle.set(this.contentNode, 'height', '800px');

            labels = this._labels(feedData);

            chart = new Chart(this.contentNode);
            chart.setTheme(JulieTheme);
            chart.addPlot('default', {
                type: PlotType,
                group: 'NameLF',
                markers: true,
                gap: 5,
                majorLabels: true,
                minorTicks: true,
                minorLabels: true,
                microTicks: true
            });

            store = this.get('store');

            chart.addAxis('x', { 
                vertical: true,
                title: 'User / Version To Be Fixed',
                labels: labels,
                labelFunc: function(formattedValue, rawValue) {
                    var item = labels[rawValue - 1];
                    return item && item.text;
                }
            });

            chart.addAxis('y', {
                title: 'Defect Total',
                titleOrientation: 'away'
            });

            chart.addSeries('User Defects', labels);

            chart.render();
            return chart;
        },
        createLegend: function() {
            return new Legend({chart: this.chart}, this.legendNode);
        },
        _labels: function(feedData) {
            var data = [], filteredData;
            filteredData = array.filter(feedData, function(item) { return item.DefectTotal > 0 ; });
            array.forEach(filteredData, function(item, index) {
                data.push({
                    y: item.DefectTotal,
                    text: item.NameLF + ' ' + item.VerTBF + ' (' + item.DefectTotal + ')',
                    value: index
                });
            }, this);

            return data;
        }
    });
});
