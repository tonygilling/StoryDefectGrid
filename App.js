Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    gatherData: function (records) {
        if (records.stories === null) {
            return  ;
        }
        if (records.defects === null) {
            return  ;
        }
        //console.log(records) ;
        var artefacts = records.stories.concat(records.defects); 
        //console.log(artefacts);
        this.add({
            xtype: 'rallygrid',
            store: Ext.create('Rally.data.custom.Store', {
                data: artefacts,
                pageSize: 99
            }),
            columnCfgs: [
                {
                    text: 'FormattedID', dataIndex: 'FormattedID'
                },
                {
                    text: 'Name', dataIndex: 'Name'
                },
                {
                    text: 'Release', dataIndex: 'Release'
                },
                {
                    text: 'Schedule State', dataIndex: 'ScheduleState'
                }
            ]
        });
        
  
    },

    launch: function() {
        var filter = Ext.create('Rally.data.QueryFilter', {
            property: 'ScheduleState',
            operator: '=',
            value: 'Defined'
        //})
        //.and(
        //{
        //   property: 'Release',
        //    operator: '=',
        //    value: 'Release1'
        });
        var records = {
            stories:null,
            defects:null
        };
        var storyStore = Ext.create('Rally.data.WsapiDataStore', {
            model: 'User Story',
            autoLoad:true,
            listeners: {
                load: function(store, data, success) {
                    records.stories = data;
                    this.gatherData(records);
                },
                scope:this
            },
            filters: [
                filter
            ],
            fetch: [
                'FormattedID',
                'Name',
                'Release',
                'ScheduleState'
            ]
        });
         console.log(storyStore);
        
        var defectStore = Ext.create('Rally.data.WsapiDataStore', {
            model: 'Defect',
            autoLoad:true,
            listeners: {
                load: function(store, data, success) {
                    records.defects = data;
                    this.gatherData(records);
                },
                scope:this
            },
            filters: [
                {
                    property: 'ScheduleState',
                    operator: '=',
                    value: 'Defined'
                }
            ],
            fetch: [
                'FormattedID',
                'Name',
                'ScheduleState'
            ]
        });
        // console.log(defectStore);
    }
});
