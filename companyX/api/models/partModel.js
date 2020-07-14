module.exports = {
    attributes: {
        createdAt: false,
        updatedAt: false,
        autoPK: false,
        id:{
            type: 'string',
            required: true,
            unique: true,
            columnName: 'userId',
        },
        partId:{
            type: 'integer',
            required: true,
            unique: true,
            columnName: 'partId',
        },
        jobName:{
            type: 'string',
            required: true,
            unique: true,
            columnName: 'jobName',
        },
        qty:{
            type: 'integer',
            required: true,
            unique: false,
            columnName: 'qty',
        }
    },
        datastore: 'mysqlConn',
        tableName: 'PartOrders'  
  }