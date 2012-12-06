define('Mobile/DTS/Views/ComponentAreaCategoryIssueLookup', [
    'dojo/_base/declare',
    'argos/List',
    'argos/_SDataListMixin'
], function(
    declare,
    List,
    _SDataListMixin
) {

    return declare('Mobile.Mobile.Views.ComponentAreaCategoryIssueLookup', [List, _SDataListMixin], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.$descriptor %}</h3>'
        ]),

        //Localization
        titleText: '',

        //View Properties
        pageSize: 2600, // TODO: Implement paging - this is a 1mb payload on dts.
        expose: false,
        enableSearch: false,
        id: 'component_lookup',
        queryOrderBy: 'Component,Area,Category,Issue',
        querySelect: [
            'Component',
            'Area',
            'Category',
            'Issue'
        ],
        resourceKind: 'areaCategoryIssues',
        queryWhere: 'Component ne null',

        show: function(options) {
            this.active = options.where;

            options.where = false;

            this.inherited(arguments, [options]);
        },
        requestData: function() {
            if (this.cache)
            {
                this.processFeed();
            }
            else
            {
                this.inherited(arguments);
            }
        },
        processFeed: function(feed) {
            // assume order is preserved
            if (feed)
            {
                this.createCacheFrom(feed);
            }

            var cache = this.cache;

            if (cache && this.active) {
                if (this.active['Component']) {
                    cache = cache[this.active['Component']];
                }

                if (this.active['Area']) {
                    cache = cache[this.active['Area']];
                }

                if (this.active['Category']) {
                    cache = cache[this.active['Category']];
                }
            }

            feed = this.buildFeedFrom(cache);

            this.inherited(arguments, [feed]);
        },
        createCacheFrom: function(feed) {
            var feedLength, i, entry, component, area, category;

            feedLength = feed['$resources'].length;
            this.cache = {};

            for (i = 0; i < feedLength; i += 1) {
                entry = feed['$resources'][i];
                component = this.cache[entry['Component']] || (this.cache[entry['Component']] = {});
                area = component[entry['Area']] || (component[entry['Area']] = {});
                category = area[entry['Category']] || (area[entry['Category']] = {});

                category[entry['Issue']] = true;
            }
        },
        buildFeedFrom: function(segment) {
            var list = [];

            for (var n in segment) {
                list.push({
                    '$key': n,
                    '$descriptor': n
                });
            }

            return {'$resources': list};
        },
        hasMoreData: function () {
            return false;
        },
        refreshRequiredFor: function () {
            return true;
        }
    });
});

