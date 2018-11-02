var db = require('../../dbconn');
var crypto = require('crypto');

module.exports = class Authorizer {
    constructor() {
        this._tableName = 'tokens';
    }

    _generateToken(){
        return crypto.randomBytes(32).toString('hex');
    }
    insertOrUpdateToken(userId){

        return new Promise ((resolve, reject) => {
            const token = this._generateToken();
            const sql = `INSERT INTO ${this._tableName} (user_id, token, expires_date) VALUES ('${userId}', '${token}', UNIX_TIMESTAMP(now()) + 86400) ON DUPLICATE KEY UPDATE token = '${token}', expires_date = UNIX_TIMESTAMP(now()) + 86400`;           
            console.log(sql);
            db.query(sql,(err,result) => {
                        if(err) return reject(err);
                        return resolve({id : userId, token : token});
                    })
        })
    }

    checkToken(userId, token){         
        return new Promise ((resolve, reject) => {
            const sql =`SELECT COUNT(*) as nums FROM ${this._tableName} WHERE user_id ='${userId}' AND token = '${token}' AND expires_date > UNIX_TIMESTAMP(now())`;
        db.query(sql,(err,result) => {                    
                    if(err) return reject(err);
                    return resolve(result);
                })
            })
    }


}