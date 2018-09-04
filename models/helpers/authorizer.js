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
            const sql = `INSERT INTO ${this._tableName} (user_id, token, expires_date) VALUES ('${userId}', '${token}', NOW() + INTERVAL 1 DAY)  ON DUPLICATE KEY UPDATE token = '${token}', expires_date = NOW() + INTERVAL 1 DAY`;
            db.query(sql,(err,result) => {
                        if(err) return reject(err);
                        return resolve({id : userId, token : token});
                    })
        })
    }

    checkToken(userId, token){
        return new Promise ((resolve, reject) => {
        db.query(`SELECT COUNT(*) as nums FROM ${this._tableName} WHERE user_id ='${userId}' AND token = '${token}' AND expires_date > NOW()`,
                (err,result) => {
                    if(err) return reject(err);
                    return resolve(result);
                })
            })
    }


}