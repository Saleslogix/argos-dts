define('Mobile/DTS/Views/Defect/Detail', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/query',
    'dojo/dom-class',
    'Mobile/SalesLogix/Format',
    'argos/ErrorManager',
    'argos/Detail',
    'dojo/NodeList-manipulate',
    'argos/_SDataDetailMixin'
], function(
    declare,
    lang,
    query,
    domClass,
    format,
    ErrorManager,
    Detail,
    nodeListManipulate,
    _SDataDetailMixin
) {

    return declare('Mobile.DTS.Views.Defect.Detail', [Detail, _SDataDetailMixin], {
        //Localization
        areaText: 'area',
        assignedDateText: 'assigned date',
        assignedToText: 'assigned to',
        categoryText: 'category',
        componentText: 'component',
        issueText: 'issue',
        subjectText: 'subject',
        moreDetailsText: 'More Details',
        loadingText: 'loading...',
        statusText: 'status',
        priorityText: 'priority',
        severityText: 'severity',
        vertbfText: 'version tbf',
        descriptionText: 'description',
        solutionText: 'solution',
        stepsText: 'steps',
        workaroundText: 'workaround',
        napriorityText: 'NA priority',
        verfoundText: 'ver found',
        frequencyText: 'frequency',
        tagsText: 'tags',
        tfsidText: 'tfs id',
        sourceText: 'source',
        defecttypeText: 'type',

        //View Properties
        id: 'defect_detail',
        editView: 'defect_edit',
        security: 'Entities/Defect/View',
        querySelect: [
            'Area',
            'AssignedDate',
            'AssignedTo/OwnerDescription',
            'Category',
            'Component',
            'Issue',
            'Subject',
            'DefectNumber',
            'Status',
            'Priority',
            'Severity',
            'VerTBF',
            'Description',
            'Solution',
            'Steps',
            'Workaround',
            'NAPriority',
            'VerFound',
            'Frequency',
            'Tags',
            'TFSID',
            'DefectType',
            'Source'
        ],
        resourceKind: 'defects',

        setNodeText: function(node, value) {
            domClass.remove(node, 'content-loading');

            query('span', node).text(value);
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                title: this.detailsText,
                name: 'DetailsSection',
                children: [
                {
                    label: this.subjectText,
                    name: 'Subject',
                    property: 'Subject'
                },{
                    label: this.defecttypeText,
                    name: 'DefectType',
                    property: 'DefectType'
                },{
                    label: this.sourceText,
                    name: 'Source',
                    property: 'Source'
                },{
                    label: this.assignedToText,
                    name: 'AssignedTo.OwnerDescription',
                    property: 'AssignedTo.OwnerDescription'
                },{
                    label: this.assignedDateText,
                    name: 'AssignedDate',
                    property: 'AssignedDate',
                    renderer: format.date
                },{
                    label: this.componentText,
                    name: 'Component',
                    property: 'Component'
                },{
                    label: this.areaText,
                    name: 'Area',
                    property: 'Area'
                },{
                    label: this.categoryText,
                    name: 'Category',
                    property: 'Category'
                },{
                    label: this.issueText,
                    name: 'Issue',
                    property: 'Issue'
                },{
                    label: this.statusText, 
                    name: 'Status',
                    property: 'Status'
                },{
                    label: this.priorityText, 
                    name: 'Priority',
                    property: 'Priority'
                },{
                    label: this.napriorityText,
                    name: 'NAPriority',
                    property: 'NAPriority'
                },{
                    label: this.severityText, 
                    name: 'Severity',
                    property: 'Severity'
                },{
                    label: this.frequencyText, 
                    name: 'Frequency',
                    property: 'Frequency'
                },{
                    label: this.vertbfText, 
                    name: 'VerTBF',
                    property: 'VerTBF'
                },{
                    label: this.verfoundText, 
                    name: 'VerFound',
                    property: 'VerFound'
                },{
                    label: this.tagsText, 
                    name: 'Tags',
                    property: 'Tags'
                },{
                    label: this.tfsidText, 
                    name: 'TFSID',
                    property: 'TFSID'
                }
                ]
            },{
                title: this.moreDetailsText,
                name: 'MoreDetailsSection',
                collapsed: true,
                children: [{
                    label: this.descriptionText,
                    name: 'Description',
                    property: 'Description'
                },{
                    label: this.solutionText,
                    name: 'Solution',
                    property: 'Solution'
                },{
                    label: this.stepsText,
                    name: 'Steps',
                    property: 'Steps'
                },{
                    label: this.workaroundText,
                    name: 'Workaround',
                    property: 'Workaround'
                }
                ]
            }]);
        }
    });
});
