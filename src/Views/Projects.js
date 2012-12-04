define('Mobile/DTS/Views/Projects', [
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    string,
    List
) {

    return declare('Mobile.DTS.Views.Projects', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.Project %}</h3>'
        ]),

        //Localization
        titleText: 'Projects',

        //View Properties
        icon: '',
        id: 'project_list',
        queryOrderBy: 'Project',
        querySelect: [
            'Project'
        ],
        queryWhere: 'Retired ne true',
        resourceKind: 'slxprojects',

        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(Project) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});
