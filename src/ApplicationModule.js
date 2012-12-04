
define('Mobile/DTS/ApplicationModule', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/ApplicationModule',
    'Mobile/DTS/Views/Defect/List',
    'Mobile/DTS/Views/Defect/Detail',
    'Mobile/DTS/Views/Defect/Edit',
    'Mobile/DTS/Views/Projects',
    'Mobile/DTS/Views/Builds',
    'Mobile/DTS/Views/ComponentAreaCategoryIssueLookup'
], function(
    declare,
    ApplicationModule,
    DefectList,
    DefectDetail,
    DefectEdit,
    ProjectsList,
    BuildsList,
    DependencyList
) {

    return declare('Mobile.DTS.ApplicationModule', [ApplicationModule], {
        loadViews: function() {
            this.inherited(arguments);

            this.registerView(new DefectList());
            this.registerView(new DefectDetail());
            this.registerView(new DefectEdit());

            this.registerView(new ProjectsList({
                expose: false
            }));

            this.registerView(new BuildsList({
                expose: false
            }));

            this.registerView(new DependencyList({
                expose: false
            }));
        },
        loadToolbars: function() {
            this.inherited(arguments);
        }
    });
});
