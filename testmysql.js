var mysql = require('mysql')
var con = mysql.createConnection({
    host: "127.0.0.1",
    port: 8889,
    user: "root",
    password: "root",
    database: "ewsm2m"
});

con.connect(function(err) {
    if (err) throw err;
    /*
    con.query("SELECT * FROM my_users", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
    */

    //checkIfUserExist("60162685737");
    const foo = Promise.resolve(checkIfUserExist("60162685747"));
    console.log(foo);  
});

async function checkIfUserExist(strUser) {
    var isExist = false;
    await con.query("SELECT * FROM my_users WHERE USER_PHONE = '" + strUser + "'", function (err, result, fields) {
        if (err)
            throw err;
        console.log(result[0]);
        if (result[0] === undefined) {
            isExist = false;
        }
        else {
            isExist = true;
        }
        Promise.resolve();
    });

    return isExist;
}