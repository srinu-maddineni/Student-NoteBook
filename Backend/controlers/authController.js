import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../model/user.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required",
      });
    }

    // Verify Google ID Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture: pic } = payload;

    // Find user in database
    let user = await User.findOne({ googleId });

    if (!user) {
      // Check if user exists with the same email to link Google account
      user = await User.findOne({ email });
      if (user) {
        user.googleId = googleId;
        user.pic = pic || user.pic;
        await user.save();
      } else {
        // Create new user
        user = new User({
          googleId,
          email,
          name,
          pic: pic || "",
        });
        await user.save();
      }
    }

    // Sign local JWT token
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Authentication successful",
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        pic: user.pic,
      },
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};



export const userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        pic: user.pic,
      }

    });
  } catch (error) {
    console.error("User Details Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user details",
      error: error.message,
    });
  }
};  