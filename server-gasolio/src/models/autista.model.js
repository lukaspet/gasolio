const sql = require("./db.js");

// constructor
const Autista = function(autista) {
  this.tesseraAutista = autista.tesseraAutista,
  this.cognome = autista.cognome,
  this.nome = autista.nome,
  this.filialeId = autista.filialeId
};

Autista.create = (newAutista, result) => {
  sql.query("INSERT INTO autista SET ?", newAutista, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created autista: ", { id: res.insertId, ...newAutista });
    result(null, { id: res.insertId, ...newAutista });
  });
};

Autista.getAll = result => {
  sql.query("SELECT * FROM autista a ORDER BY a.TesseraAutista ASC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("autista ", res);
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

Autista.remove = (id, result) => {
  sql.query("DELETE FROM autista WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Autista with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted autista with id: ", id);
    result(null, {res, id});
  });
};

module.exports = Autista;
