define('Mobile/DTS/Views/Defect/List', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Action',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    string,
    action,
    List
) {
    return declare('Mobile.DTS.Views.Defect.List', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.$descriptor %} <span class="p-defect-subject"> {%: $.Subject %} </span></h3>',
            '<h4>{%: $.Status %} | {%: $.VerTBF ? $.VerTBF : $$.noVersionText %} | {%: $.DefectType %}</h4>'
        ]),

        //Localization
        titleText: 'Defects',
        notAssignedText: 'Not assigned',
        editActionText: 'Edit',
        noVersionText: 'No VersionTBF',

        //View Properties
        expose: true,
        detailView: 'defect_detail',
        icon: 'content/images/icons/Defect_24x24.gif',
        id: 'defect_list',
        security: 'Entities/Defect/View',
        insertView: 'defect_edit',
        queryOrderBy: 'AssignedDate desc',
        querySelect: [
            'Subject',
            'Status',
            'VerTBF',
            'DefectType',
            'AssignedDate'
        ],
        queryInclude: [
            'AssignedTo'
        ],
        resourceKind: 'defects',
        allowSelection: true,
        enableActions: true,
        hashTagQueries: {
            // Defect Type 
            'defect': 'DefectType eq "Defect"',
            'task': 'DefectType eq "Task"',
            'change-request': 'DefectType eq "Change Request"',
            'feedback': 'DefectType eq "Feedback Item"',
            'feature': 'DefectType eq "Feature Request"',
            'submittal': 'DefectType eq "Submittal"',
            // Defect Status
            'new': 'Status eq "New"',
            'open': 'Status eq "Open"',
            'checked-in': 'Status eq "Checked In"',
            'deploy': 'Status eq "In Deployment"',
            'pending': 'Status eq "Pending"',
            'fixed': 'Status eq "Fixed"',
            'released': 'Status eq "Released"',
            'closed': 'Status eq "Closed"',
            'hold': 'Status eq "Holding in Queue"',
            'deferred': 'Status eq "Deferred"',
            'mine': function() {
                var app = window.App;
                if (app && app.context && app.context.user) {
                    return 'AssignedTo.User.Id eq "' + app.context['user']['$key'] + '"';
                }
            }
        },
        createActionLayout: function() {
            return this.actions || (this.actions = [{
                    id: 'edit',
                    icon: 'content/images/icons/edit_24.png',
                    label: this.editActionText,
                    action: 'navigateToEditView'
                }]
            );
        },

        formatSearchQuery: function(searchQuery) {
            return string.substitute(
                'DefectNumber like "%${0}%" or upper(Subject) like "${0}%" or VerTBF like "${0}"',
                [this.escapeSearchQuery(searchQuery.toUpperCase())]
            );
        }
    });
});
