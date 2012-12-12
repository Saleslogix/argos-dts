define('Mobile/DTS/ApplicationViews', {
    // Defect Views
    'defect_list': {type: 'Mobile/DTS/Views/Defect/List'},
    'defect_detail': {type: 'Mobile/DTS/Views/Defect/Detail'},
    'defect_edit': {type: 'Mobile/DTS/Views/Defect/Edit'},

    // Lookup views
    'project_list': {type:'Mobile/DTS/Views/Projects', props: {tier: 1}},
    'build_list': {type: 'Mobile/DTS/Views/Builds', props: {tier: 1}},
    'component_lookup': {type: 'Mobile/DTS/Views/ComponentAreaCategoryIssueLookup', props: {tier: 1}},

    // Charting
    'chart_defect_list': {type: 'Mobile/DTS/Views/Defect/Charts/List', props: {tier: 1}},
    'chart_defects_per_project': {type: 'Mobile/DTS/Views/Defect/Charts/DefectsPerProject', props: {tier: 1}},
    'chart_defects_per_user': {type: 'Mobile/DTS/Views/Defect/Charts/DefectsPerUser', props: {tier: 1}}
});
