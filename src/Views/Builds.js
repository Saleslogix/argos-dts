define('Mobile/DTS/Views/Builds', [
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    string,
    List
) {

    return declare('Mobile.DTS.Views.Builds', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.BuildName %} | {%: $.C_Project.Project %}</h3>'
        ]),

        //Localization
        titleText: 'Builds',

        //View Properties
        icon: '',
        id: 'build_list',
        queryOrderBy: 'BuildName',
        querySelect: [
            'BuildName',
            'C_Project/Project'
        ],
        queryInclude: [
            'C_Project'
        ],
        queryWhere: 'IsAvailable eq true',
        resourceKind: 'projectBuilds',

        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(BuildName) like "%${0}%" or upper(C_Project.Project) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});
