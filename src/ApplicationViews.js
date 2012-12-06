define('Mobile/DTS/ApplicationViews', {
    'defect_list': {type: 'Mobile/DTS/Views/Defect/List'},
    'defect_detail': {type: 'Mobile/DTS/Views/Defect/Detail'},
    'defect_edit': {type: 'Mobile/DTS/Views/Defect/Edit'},
    'project_list': {type:'Mobile/DTS/Views/Projects', props: {tier: 1}},
    'build_list': {type: 'Mobile/DTS/Views/Builds', props: {tier: 1}},
    'component_lookup': {type: 'Mobile/DTS/Views/ComponentAreaCategoryIssueLookup', props: {tier: 1}}
});
