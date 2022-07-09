import type { RequestHandler } from "express";

const getUserById: RequestHandler = (req, res) =>
  res.send({ errs: [], data: { id: req.params.id, name: "äh dings" } });

export default { getUserById };
