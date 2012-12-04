define('Mobile/DTS/Views/Defect/Edit', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Validator',
    'Sage/Platform/Mobile/ErrorManager',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
    lang,
    string,
    format,
    validator,
    ErrorManager,
    Edit
) {

    return declare('Mobile.DTS.Views.Defect.Edit', [Edit], {
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
        solutionText: 'solution',
        stepsText: 'steps',
        workaroundText: 'workaround',
        napriorityText: 'NA priority',
        verfoundText: 'ver found',
        buildfoundText: 'build found',
        frequencyText: 'frequency',
        tagsText: 'tags',
        sourceText: 'source',
        defecttypeText: 'type',

        //View Properties
        entityName: 'Defect',
        id: 'defect_edit',
        insertSecurity: 'Entities/Defect/Add',
        updateSecurity: 'Entities/Defect/Edit',
        querySelect: [
            'Area',
            'AssignedDate',
            'AssignedTo/OwnerDescription',
            'Category',
            'Component',
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
            'BuildFound',
            'Frequency',
            'Tags',
            'DefectType',
            'Source'
        ],
        resourceKind: 'defects',

        init: function() {
            this.inherited(arguments);

            this.connect(this.fields['Component'], 'onChange', this.onComponentChange);
            this.connect(this.fields['Area'], 'onChange', this.onAreaChange);
            this.connect(this.fields['Category'], 'onChange', this.onCategoryChange);
        },
        processTemplateEntry: function(entry) {
            this.inherited(arguments);
        },
        onComponentChange: function(value, field) {
            this.fields['Issue'].clearValue();
            this.fields['Category'].clearValue();
            this.fields['Area'].clearValue();
        },
        onAreaChange: function(value, field) {
            this.fields['Issue'].clearValue();
            this.fields['Category'].clearValue();
        },
        onCategoryChange: function(value, field) {
            this.fields['Issue'].clearValue();
        },
        formatAreaQuery: function(value) {
            return {
                'Component': value // dependent value
            };
        },
        formatCategoryQuery: function(value) {
            return {
                'Component': this.fields['Component'].getValue(),
                'Area': value // dependent value
            };
        },
        formatIssueQuery: function(value) {
            return {
                'Component': this.fields['Component'].getValue(),
                'Area': this.fields['Area'].getValue(),
                'Category': value // dependent value
            };
        },
        includeIfValueExists: function(value) {
            return value;
        },
        createLayout: function() {
            return this.layout || (this.layout = [
               {
                    label: this.subjectText,
                    name: 'Subject',
                    property: 'Subject',
                    type: 'text'
                },{
                    label: this.defecttypeText,
                    name: 'DefectType',
                    property: 'DefectType',
                    title: this.defecttypeText,
                    type: 'picklist',
                    picklist: 'Defect Type',
                    orderBy: 'text asc'
                },{
                    label: this.sourceText,
                    name: 'Source',
                    property: 'Source',
                    title: this.sourceText,
                    type: 'picklist',
                    picklist: 'Defect Source',
                    orderBy: 'text asc'
                },{
                    label: this.assignedToText,
                    name: 'AssignedTo',
                    property: 'AssignedTo',
                    textProperty: 'OwnerDescription',
                    type: 'lookup',
                    view: 'owner_list'
                },{
                    label: this.assignedDateText,
                    name: 'AssignedDate',
                    property: 'AssignedDate',
                    renderer: format.date,
                    type: 'date'
                },{
                    label: this.componentText,
                    name: 'Component',
                    property: 'Component',
                    title: this.componentText,
                    type: 'lookup',
                    requireSelection: false,
                    valueKeyProperty: false,
                    valueTextProperty: false,
                    view: 'component_lookup'
                },{
                    label: this.areaText,
                    name: 'Area',
                    property: 'Area',
                    title: this.areaText,
                    type: 'lookup',
                    requireSelection: false,
                    dependsOn: 'Component',
                    valueKeyProperty: false,
                    valueTextProperty: false,
                    where: this.formatAreaQuery.bindDelegate(this),
                    view: 'component_lookup'
                },{
                    label: this.categoryText,
                    name: 'Category',
                    property: 'Category',
                    title: this.categoryText,
                    type: 'lookup',
                    requireSelection: false,
                    dependsOn: 'Area',
                    valueKeyProperty: false,
                    valueTextProperty: false,
                    where: this.formatCategoryQuery.bindDelegate(this),
                    view: 'component_lookup'
                },{
                    label: this.issueText,
                    name: 'Issue',
                    property: 'Issue',
                    title: this.issueText,
                    type: 'lookup',
                    requireSelection: false,
                    dependsOn: 'Category',
                    valueKeyProperty: false,
                    valueTextProperty: false,
                    where: this.formatIssueQuery.bindDelegate(this),
                    view: 'component_lookup'
                },{
                    label: this.statusText,
                    name: 'Status',
                    property: 'Status',
                    title: this.statusText,
                    type: 'picklist',
                    picklist: 'Defect Status',
                    orderBy: 'text asc'
                },{
                    label: this.priorityText,
                    name: 'Priority',
                    property: 'Priority',
                    title: this.priorityText,
                    type: 'picklist',
                    picklist: 'Defect Priority',
                    orderBy: 'text asc'
                },/*{
                    label: this.napriorityText,
                    name: 'NAPriority',
                    property: 'NAPriority',
                    title: this.napriorityText,
                    type: 'lookup'
                },*/{
                    label: this.severityText,
                    name: 'Severity',
                    property: 'Severity',
                    title: this.severityText,
                    type: 'picklist',
                    picklist: 'Defect Severity',
                    orderBy: 'text asc'
                },{
                    label: this.frequencyText,
                    name: 'Frequency',
                    property: 'Frequency',
                    title: this.frequencyText,
                    type: 'picklist',
                    picklist: 'Defect Frequency',
                    orderBy: 'text asc'
                },{
                    label: this.verfoundText,
                    name: 'VerFound',
                    property: 'VerFound',
                    title: this.verfoundText,
                    type: 'lookup',
                    textProperty: 'Project',
                    view: 'project_list'
                },{
                    label: this.buildfoundText,
                    name: 'BuildFound',
                    property: 'BuildFound',
                    title: this.buildfoundText,
                    type: 'lookup',
                    textProperty: 'BuildName',
                    view: 'build_list'
                },{
                    label: this.vertbfText,
                    name: 'VerTBF',
                    property: 'VerTBF',
                    title: this.vertbfText,
                    type: 'lookup',
                    textProperty: 'Project',
                    view: 'project_list'
                },{
                    label: this.tagsText,
                    name: 'Tags',
                    property: 'Tags',
                    title: this.tagsText,
                    type: 'picklist',
                    picklist: 'Defect Tags',
                    orderBy: 'text asc'
                },{
                    label: this.descriptionText,
                    name: 'Description',
                    property: 'Description',
                    noteProperty: false,
                    title: this.descriptionText,
                    type: 'note',
                    view: 'text_edit'
                },{
                    label: this.solutionText,
                    name: 'Solution',
                    property: 'Solution',
                    noteProperty: false,
                    title: this.solutionText,
                    type: 'note',
                    view: 'text_edit'
                },{
                    label: this.stepsText,
                    name: 'Steps',
                    property: 'Steps',
                    noteProperty: false,
                    title: this.stepsText,
                    type: 'note',
                    view: 'text_edit'
                },{
                    label: this.workaroundText,
                    name: 'Workaround',
                    property: 'Workaround',
                    title: this.workaroundText,
                    type: 'text',
                }
            ]);
        }
    });
});
