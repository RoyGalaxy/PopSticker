import UserModel from "../models/User.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (userId) => {
  // Generate a random token
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

// Route for login user
const loginUser = async (req,res) => {
  try { 
    const { email, password } = req.body

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid User" });
    }
    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid Password" });
   }

    const token = createToken(user._id)

    return res.status(200).json({ success: true, message: "Login successful", token }); // Return the user object in the response
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Route for user registration
const registerUser = async (req,res) => {
  try {
    const { name, email, password } = req.body

    console.log(name, email, password)

    // Check if user already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Validate email and strong password
    if(!validator.isEmail(email)){
      return res.status(400).json({success: false, message: "Invalid Email"})
    }else if(validator.isEmpty(password)){ 
      return res.status(400).json({success: false, message: "Password cannot be empty"})
     }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id)

    return res.status(201).json({ success: true, message: "User registered successfully", token }); // Return the user object in the response

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Route for Admin login
const adminLogin = async (req,res) => {
  try {
    const { email, password } = req.body

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password, process.env.JWT_SECRET)
      return res.status(200).json({ success: true, message: "Login Successful", token });
    }else{
      return res.status(401).json({ success: false, message: "Invalid Credentials" });
    }

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export { loginUser, registerUser, adminLogin }