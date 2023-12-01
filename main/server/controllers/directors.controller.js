import { pool } from "../db.js";

export const getDirectors = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM director");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDirector = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("SELECT * FROM director WHERE id = ?", [
      id,
    ]);
    if (result.length === 0)
      return res.status(404).json({
        message: "Director not found",
      });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createDirector = async (req, res) => {
  const { name, img, born } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO director(name, img, born) VALUES (?,?,?)",
      [name, img, born]
    );
    res.json({
      id: result.insertId,
      name,
      img,
      born,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateDirector = async (req, res) => {
  try {
    const result = await pool.query("UPDATE director SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDirector = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM director WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Director not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
