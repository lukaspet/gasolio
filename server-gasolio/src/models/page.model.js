const sql = require("./db.js");

// constructor
const Page = function(page) {
  this.name = page.name,
  this.link = page.link,
  this.icon = page.icon
};

Page.create = (newPage, result) => {
  sql.query("INSERT INTO page SET ?", newPage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created page: ", { id: res.insertId, ...newPage });
    result(null, { id: res.insertId, ...newPage });
  });
};

Page.getAll = result => {
  sql.query("SELECT * FROM page", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("page ", res);
    result(null, res);
  });
};

// Automezzo.updateById = (id, contact, result) => {
//   sql.query(
//     "UPDATE automezzo SET nome = ?, cognome = ?, telefonoFisso = ?, cellulare = ?, email = ?, ruoloId = ?, filialeId = ?, repartoId = ? WHERE id = ?",
//     [contact.nome, contact.cognome, contact.telefonoFisso, contact.cellulare, contact.email, contact.ruoloId, contact.filialeId, contact.repartoId, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Contact with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated contact: ", { id: id, ...contact });
//       result(null, { id: id, ...contact });
//     }
//   );
// };

Page.remove = (id, result) => {
  sql.query("DELETE FROM page WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Page with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted page with id: ", id);
    result(null, {res, id});
  });
};

module.exports = Page;
