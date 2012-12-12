define('Mobile/DTS/Views/Defect/Charts/List', [
    'dojo/_base/declare',
    'dojo/store/Memory',
    'argos/List'
], function(
    declare,
    MemoryStore,
    List
) {
    return declare('Mobile.DTS.Views.Defect.Charts.List', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.$descriptor %}</h3>',
            '<h4>type: {%: $.type %}</h4>'
        ]),

        // View properties
        id: 'chart_defect_list',
        titleText: 'Defect Chart List',

        enableSearch: false,
        hideSearch: true,

        createStore: function() {
            return new MemoryStore({
                data: { 
                    identifier: '$key',
                    label: 'charts',
                    items: [
                        { $key: 'chart_defects_per_project', $descriptor: 'defects per project', type: 'pie' },
                        { $key: 'chart_defects_per_user', $descriptor: 'defects per user', type: 'bar' }
                    ]
                }
            });
        },
        navigateToDetailView: function(key, descriptor) {
            this.detailView = key;
            this.inherited(arguments);
        }
    });
});
