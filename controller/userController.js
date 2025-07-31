const Users = require("../model/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
};

exports.logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Connecting to MongoDB...");
    const user = await Users.findOne({ email, password });

    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found!", type: "error" });
    }

    return res.status(200).send(user);
  } catch (error) {
    console.error("Error in logIn:", error.message, error.stack);
    return res
      .status(500)
      .send({ message: "Internal server error", type: "error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const { firstName, lastName, email, phone, password } = req.body;

    const updateFields = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email && { email }),
      ...(phone && { phone }),
      ...(password && { password }),
    };

    const user = await Users.findByIdAndUpdate({ _id: userId }, updateFields, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully!", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "An error occurred!", error });
  }
};
