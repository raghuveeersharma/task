import User from "../modals/user.modal.js";
export async function postUser(req, res) {
  try {
    const { name, age } = req.body;
    if (!name | !age) {
      res.status(404).json({ message: "all fields are required!!" });
    }
    const result = await User.create({ name, age });
    console.log(result);
    res.status(201).json({ message: "user creatd successfully", user: result });
  } catch (error) {
    console.log("error in postUser controller", error);
  }
}

export async function getUsers(req, res) {
  try {
    const users = await User.find();
    if (!users) res.status(404).json({ message: "no data found" });
    res
      .status(200)
      .json({ message: "data fetched successfully!!", users: users });
  } catch (error) {
    console.log("error in getUsers", error);
  }
}

export async function getUser(req, res) {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    if (!user) res.status(404).json({ message: "user not found!" });
    res.status(200).json({ message: "user fetched", user: user });
  } catch (error) {
    console.log("error in getUser", error);
  }
}

export async function deleteUser(req, res) {
  try {
    const { _id } = req.params;
    const result = await User.findByIdAndDelete(_id);
    if (!result) return res.status(404).json({ message: "user not found" });
    res.status(200).json({
      message: "user deleted successfully!!",
    });
  } catch (error) {
    console.log("error in deletUser comtroller", error);
  }
}

export async function updateUser(req, res) {
  try {
    const { _id } = req.params;
    const { name, age } = req.body;
    if (!name | !age) {
      res.status(404).json({ message: "all fields are required!!" });
    }
    const result = await User.findByIdAndUpdate(
      _id,
      { name, age },
      { new: true }
    );
    if (!result) res.status(404).json({ message: "user not found to update" });
    res.status(200).json({
      message: "user update successfully",
      user: result,
    });
  } catch (error) {
    console.log("error in updateUser controller", error);
  }
}
