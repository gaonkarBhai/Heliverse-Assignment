import Teams from "../models/teamModel.js";

// creating ateam
export const createTeam = async (req, res) => {
  try {
    const { name, members } = req.body;
    if (!name || !members)
      return res
        .status(400)
        .json({ success: false, error: "Please add all the fields." });
    const team = await Teams.create(req.body);
    res.status(201).json({ team,success: true });
  } catch (error) {
    res.status(500).json({ success:false });
  }
};

// getting a team
export const getSingleTeam = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ success: false, error: "ID is required" });
    const team = await Teams.findById(id).populate("members");
    res.status(201).json({ team,success: true });
  } catch (error) {
    res.status(500).json({ success:false });
  }
};
