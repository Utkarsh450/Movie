const userModels = require("../models/user.models")

const bcrypt  = require("bcryptjs")
const jwt = require("jsonwebtoken")
async function Login(req, res) {

  try {

    const { email, password } = req.body

    const user = await userModels.findOne({ email })

    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
      id: user._id,
      email: user.email
    })

  } catch (err) {

    res.status(500).json({ msg: "Server error" })

}

}




async function Register(req, res) {

  try {

    const { email, password } = req.body

    const existingUser = await userModels.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModels.create({
      email,
      password: hashedPassword
    })

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({
      id: user._id,
      email: user.email
    })

  } catch (err) {

    res.status(500).json({ msg: "Server error" })

  }
}
async function Me(req, res) {

  try {

    const user = req.user;

    res.status(200).json({
      id: user._id,
      email: user.email
    });

  } catch (err) {

    res.status(500).json({
      message: "Server error"
    });

  }

}

async function Logout(req, res) {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    res.status(200).json({
      message: "Logged out successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
}

module.exports = { Login, Register, Logout, Me}