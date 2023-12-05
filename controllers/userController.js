import User from "./../models/userModel.js";

// getting all users
export const getAllUsersQuery = async (req, res) => {
  try {
    const { page, limit, domain, gender, available } = req.query;
    const query = {};
    if (domain) {
      query.domain = domain;
    }
    if (gender) {
      query.gender = gender;
    }
    if (available !== undefined) {
      query.available = available;
    }
    // console.log(query);
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json({ users, success: true });
    // console.log(users);
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
};

// // getting all users
export const getAllUsers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const users = await User.find({})
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json({ users, success: true });
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
};

// getting single user

export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ id });
    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
};

export const getSingleUserByName = async (req, res) => {
  const { name } = req.params;
  try {
    const user = await User.find({
      $or: [
        { first_name: { $regex: new RegExp(name, "i") } },
        { last_name: { $regex: new RegExp(name, "i") } },
      ],
    });
    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
};

// creating new user
export const createNewUser = async (req, res) => {
  try {
    console.log(req.body);
    const {
      id,
      first_name,
      last_name,
      email,
      gender,
      avatar,
      domain,
      available,
    } = req.body;
    if (
      !id ||
      !first_name ||
      !last_name ||
      !email ||
      !gender ||
      !avatar ||
      !domain ||
      !available
    ) {
      return res
        .status(400)
        .json({ success: false, msg: "fields are missing" });
    }
    const user = await User.create(req.body);
    res
      .status(200)
      .json({ user, success: true, msg: "user created successfully" });
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
};

// updating new user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, msg: "id must be required" });
    }
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res
      .status(200)
      .json({ user, success: true, msg: "user updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
};

// deleting new user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, msg: "id must be required" });
    }
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, msg: "user deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
};
