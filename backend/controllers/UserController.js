import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

class UserController {
  static userRegistration = async (req, res) => {
    const { firstName, lastName, email, password, tc } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({"status":"failed", message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      if (firstName && lastName && email && password && tc) {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          tc,
        });

        await newUser.save();
        const savedUser = await User.findOne({ email });

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

        return res.status(201).json({"status":"success",  message: "Registration successful" ,"token":token});
      } else {
        return res.status(400).json({"status":"failed",  message: "Missing required fields" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({"status":"failed",  message: "All field are required" });
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body
      if (email && password) {
        const user = await User.findOne({ email: email })
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password)
          if ((user.email === email) && isMatch) {

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

            return res.status(200).json({"status":"success", message: "Login successful", "token": token });
          } else {
            return res.status(401).json({"status":"failed", message: "Invalid credentials",user });
          }
        } else {
          return res.status(401).json({"status":"failed", message: "User doesn't exist" });
        }
      } else {
        return res.status(400).json({"status":"failed", message: "Missing required fields" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error" });
    }
  };

 static userUpdate = async (req, res) => {
    try {
      const { firstName, lastName, email } = req.body;
      const userId = req.user.id;

      if (firstName && lastName && email) {
        const user = await User.findById(userId);

        if (!user) {
          return res.status(404).json({ status: "failed", message: "User not found" });
        }
  
        if (user.email !== email) {
          const alreadyUser = await User.findOne({ email: email });
          if (alreadyUser) {
            return res.status(400).json({ status: "failed", message: "User already exists" });
          }
        }
  
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
  
        await user.save();

        return res.status(200).json({ "status": "success", message: "User details updated successfully" });
      } else {
        return res.status(400).json({ "status": "failed", message: "Missing required fields" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "status": "failed", message: "Server Error" });
    }
  };

  static loggedInUser = async (req, res) => {
    try {
      res.send({ "user": req.user });
    } catch (error) {
      console.error(error);
    }
  };
}
export default UserController;

