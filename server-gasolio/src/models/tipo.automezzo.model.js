const sql = require("./db.js");

// constructor
const TipoAutomezzo = function(tipoAutomezzo) {
  this.tipoAutomezzo = tipoAutomezzo.tipoAutomezzo;
};

TipoAutomezzo.create = (newTipoAutomezzo, result) => {
  sql.query("INSERT INTO tipo_automezzo SET ?", newTipoAutomezzo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tipoAutomezzo: ", { id: res.insertId, ...newTipoAutomezzo });
    result(null, { id: res.insertId, ...newTipoAutomezzo });
  });
};

TipoAutomezzo.getAll = result => {
  sql.query("SELECT * FROM tipo_automezzo f ORDER BY f.tipoAutomezzo ASC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tipoAutomezzo: ", res);
    result(null, res);
  });
};

TipoAutomezzo.updateById = (id, tipoAutomezzo, result) => {
  sql.query(
    "UPDATE tipo_automezzo SET tipoAutomezzo = ?",
    [tipoAutomezzo.tipoAutomezzo, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found TipoAutomezzo with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tipoAutomezzo: ", { id: id, ...tipoAutomezzo });
      result(null, { id: id, ...tipoAutomezzo });
    }
  );
};

TipoAutomezzo.remove = (id, result) => {
  sql.query("DELETE FROM tipo_automezzo WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found TipoAutomezzo with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tipoAutomezzo with id: ", id);
    result(null, res);
  });
};

module.exports = TipoAutomezzo;
