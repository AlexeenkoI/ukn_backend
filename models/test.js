var db = require('../dbconn');

module.exports = class Test{
    Get(){
        console.log("Start Get Test");
        return new Promise((resolve, reject) =>{
            db.query('CALL sel()',(err, rows) => {
                if(err) return reject(err);
                return resolve(rows);
            })
        })
    }
}