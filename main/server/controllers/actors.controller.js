import { pool } from "../db.js";

export const getActors = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM actor");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getActor = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("SELECT * FROM actor WHERE id = ?", [id]);
    if (result.length === 0)
      return res.status(404).json({
        message: "Actor not found",
      });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createActor = async (req, res) => {
  const { name, img, born } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO actor(name, img, born) VALUES (?,?,?)",
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

export const updateActor = async (req, res) => {
  try {
    const result = await pool.query("UPDATE actor SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteActor = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM actor WHERE id = ?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Actor not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
