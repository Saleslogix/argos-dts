
define('Mobile/DTS/ApplicationModule', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'argos/ApplicationModule',
    'Mobile/DTS/Views/Defect/List',
    'Mobile/DTS/Views/Defect/Detail',
    'Mobile/DTS/Views/Defect/Edit',
    'Mobile/DTS/Views/Projects',
    'Mobile/DTS/Views/Builds',
    'Mobile/DTS/Views/ComponentAreaCategoryIssueLookup',
    'Mobile/SalesLogix/QuickNav',
    'Mobile/DTS/ApplicationViews'
], function(
    declare,
    lang,
    ApplicationModule,
    DefectList,
    DefectDetail,
    DefectEdit,
    ProjectsList,
    BuildsList,
    DependencyList,
    QuickNav,
    ApplicationViews
) {
    return declare('Mobile.DTS.ApplicationModule', [ApplicationModule], {
        constructor: function() {
            var original = QuickNav.prototype.createLayout;
            lang.extend(QuickNav, {
                createLayout: function() {
                    var layout = original.apply(this, arguments);
                    if (layout) {
                        layout.push({
                            'name': 'defect_list',
                            'view': 'defect_list',
                            'action': 'navigateToView',
                            'icon': '../argos-dts/content/images/icons/Defect_24x24.gif',
                            'title': 'Defects',
                            'security': 'Entities/Defect/View'
                        });
                    }

                    return layout;
                }
            });
        },
        loadViews: function(scene) {
            this.inherited(arguments);

            scene.registerViews(ApplicationViews);
        },
        loadToolbars: function() {
            this.inherited(arguments);
        },
        loadCustomizations: function() {
            this.inherited(arguments);
            this.registerCustomization('home/home', 'home', {
                at: true,
                type: 'insert',
                value: {
                    id: 'views',
                    children: [{
                        'name': 'defect_list',
                        'view': 'defect_list',
                        'action': 'navigateToView',
                        'default': true,
                        'icon': 'content/images/icons/Defect_24x24.gif',
                        'title': 'Defects'
                    }]
                } 
            });
            
        },
    });
});
