const sql = require("./db.js");

// constructor
const Pompa = function(pompa) {
  this.numeroPompa = pompa.numeroPompa,
  this.filialeId = autista.filialeId,
  this.giacenza = pompa.giacenza
};

Pompa.create = (newPompa, result) => {
  sql.query("INSERT INTO pompa SET ?", newPompa, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created pompa: ", { id: res.insertId, ...newPompa });
    result(null, { id: res.insertId, ...newPompa });
  });
};

Pompa.getAll = result => {
  sql.query("SELECT * FROM pompa a ORDER BY a.numeroPompa ASC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pompa ", res);
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

Pompa.remove = (id, result) => {
  sql.query("DELETE FROM pompa WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Pompa with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted pompa with id: ", id);
    result(null, {res, id});
  });
};

module.exports = Pompa;
