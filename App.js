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
        console.log(records)  
    },

    launch: function() {
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
      //   console.log(storyStore);
        
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
        
    
        
        var myGrid = Ext.create('Ext.grid.Panel', {
            title: 'Stuff',
            store: null,
            columns: [
                { text: 'FormattedID',  dataIndex: 'FormattedID' },
                { text: 'Name', dataIndex: 'Name', },
                { text: 'ScheduleState', dataIndex: 'ScheduleState' }
            ]
        });
        this.add(myGrid);
    }
});
