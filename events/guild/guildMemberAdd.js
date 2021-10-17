const db = require("quick.db");
const bldd2 = new db.table('bldd2');

const bldd = new db.table('bldd');

module.exports =  async (Discord, client, member) => {
    
       let fetched = bldd.get(`blacklist_${member}`) 
       let fetched2 = bldd2.get(`blacklist_${member1}`) 
       if (!fetched) {
       client.users.get(fetched2).send("Masz blackliste byczqu!");
      
               console.log("ta")
       }
       
}