module.exports = {
    attributes: {
        createdAt: false,
        updatedAt: false,
        autoPK: false,
        id:{
            type: 'string',
            required: true,
            unique: true,
            columnName: 'jobId',
        },
        partId:{
            type: 'integer',
            required: true,
            unique: true,
            columnName: 'partId',
        },
        qty:{
            type: 'integer',
            required: true,
            unique: false,
            columnName: 'qty',
        }
    },
        datastore: 'mysqlConn',
        tableName: 'jobs735'  
  }