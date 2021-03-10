const sql = require("./db.js");

// constructor
const Automezzo = function(automezzo) {
  this.tagMezzo = automezzo.tagMezzo,
  this.targa = automezzo.targa,
  this.marcaModello = automezzo.marcaModello,
  this.tipoAutomezzoId = automezzo.tipoAutomezzoId,
  this.kmOre = automezzo.kmOre,
  this.freqTagliando = automezzo.freqTagliando,
  this.kmUltimoTagliando = automezzo.kmUltimoTagliando,
  this.scadenzaBollo = automezzo.scadenzaBollo,
  this.scadenzaAssicurazione = automezzo.scadenzaAssicurazione,
  this.scadenzaCollaudo = automezzo.scadenzaCollaudo,
  this.filialeId = automezzo.filialeId,
  this.kmUltimoRifornimento = automezzo.kmUltimoRifornimento,
  this.fringeBenefit = automezzo.fringeBenefit,
  this.accise = automezzo.accise,
  this.scadenzaTachigrafo = automezzo.scadenzaTachigrafo
};

Automezzo.create = (newAutomezzo, result) => {
  sql.query("INSERT INTO automezzo SET ?", newAutomezzo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created automezzo: ", { id: res.insertId, ...newAutomezzo });
    result(null, { id: res.insertId, ...newAutomezzo });
  });
};

Automezzo.getAll = result => {
  sql.query("SELECT * FROM automezzo a ORDER BY a.TagMezzo ASC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("automezzo ", res);
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

Automezzo.remove = (id, result) => {
  sql.query("DELETE FROM automezzo WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Automezzo with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted automezzo with id: ", id);
    result(null, {res, id});
  });
};

module.exports = Automezzo;
