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

exports.getUserProfile = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Përdoruesi nuk eksziton!" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Ndodhi një gabim gjatë marrjes së të dhënave!:", error);
    res.status(500).json({
      message: "Ndodhi një gabim gjatë marrjes së të dhënave!",
      error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "ID jo e saktë e përdoruesit!" });
    }

    const { firstName, lastName, email, phone } = req.body;

    const updateFields = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email && { email }),
      ...(phone && { phone }),
    };

    const user = await Users.findByIdAndUpdate({ _id: userId }, updateFields, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "Përdoruesi nuk ekziston!" });
    }

    return res
      .status(200)
      .json({ message: "Profili u modifikua me sukses!", user });
  } catch (error) {
    console.error("Ndodhi një gabim gjatë ruajtjes së të dhënave:", error);
    res.status(500).json({
      message: "Ndodhi një gabim gjatë ruajtjes së të dhënave!",
      error,
    });
  }
};

exports.updateUserPassword = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "ID jo e saktë e përdoruesit!" });
    }

    const { currentPassword, newPassword, confirmationPassword } = req.body;

    if (newPassword !== confirmationPassword) {
      return res.status(401).json({ message: "Fjalëkalimet nuk përputhen!" });
    }

    // ✅ Correct assignment
    const updateFields = {
      ...(newPassword && { password: newPassword }),
    };

    const user = await Users.findByIdAndUpdate({ _id: userId }, updateFields, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "Fjalëkalimi nuk ekziston!" });
    }

    return res
      .status(200)
      .json({ message: "Fjalëkalimi u modifikua me sukses!", user });
  } catch (error) {
    console.error("Ndodhi një gabim gjatë ruajtjes së të dhënave:", error);
    res.status(500).json({
      message: "Ndodhi një gabim gjatë ruajtjes së të dhënave!",
      error,
    });
  }
};
