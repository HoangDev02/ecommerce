const userModel = require("../models/user.model");
const refreshTokens = require("../models/refreshTokens");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
// Cấu hình Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Sử dụng Gmail, hoặc thay thế bằng dịch vụ email khác
  auth: {
    user: "lecanhhoang123@gmail.com", // Email của bạn
    pass: "qlmq ivcy iwcg unfc", // Mật khẩu email hoặc mã ứng dụng
  },
});
const userController = {
  getUser: async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  getUsers: async (req, res, next) => {
    try {
      const users = await userModel.find();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      await userModel.findByIdAndDelete(req.params.id);
      res.status(200).send("delete user success");
    } catch (error) {
      next(error);
    }
  },
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30s" }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

  isRegister: async (req, res, next) => {
    try {
      const existingUser = await userModel.findOne({
        username: req.body.username,
      });
      if (existingUser) {
        return res.status(500).json("User already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      const user = await newUser.save();

      // Gửi email xác nhận
      const mailOptions = {
        from: "lecanhhoang123@gmail.com",
        to: newUser.email,
        subject: "Chào mừng đến với ecommerce!",
        text: `Chào ${newUser.username},
      
        Chúc mừng bạn đã trở thành thành viên mới của chúng tôi tại ecommerce! Chúng tôi rất hào hứng được chào đón bạn.
        
        Tại ecommerce, chúng tôi cam kết mang đến cho bạn những trải nghiệm tốt nhất với ecommerce:
        
        - [Tính Năng 1]
        - [Tính Năng 2]
        - [Lợi Ích Đặc Biệt]
        
        Nếu bạn cần bất kỳ sự hỗ trợ nào, vui lòng liên hệ với chúng tôi qua lecanhhoang123@gmail.com. Đội ngũ của chúng tôi luôn sẵn lòng hỗ trợ bạn.`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(500).json("Error in sending email");
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json(user);
        }
      });
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  isLogin: async (req, res, next) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(301).send("User does not exist");
      }

      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(404).send("Wrong username or password");
      }

      const accessToken = userController.generateAccessToken(user);
      const refreshToken = userController.generateRefreshToken(user);

      //save mongodb
      const newRefreshTokenDB = new refreshTokens({
        refreshToken: refreshToken,
        accessToken: accessToken,
        // token: refreshToken
      });
      await newRefreshTokenDB.save();
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Chỉ gửi cookie qua HTTPS trong production
        path: "/",
        sameSite: "strict",
      });

      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  },

  refreshAccessToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You're not authenticated");

    const dbToken = await refreshTokens.findOne({ refreshToken });
    if (!dbToken) return res.status(403).json("Refresh Token is not valid!");

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");

      const newAccessToken = userController.generateAccessToken(user);
      const newRefreshToken = userController.generateRefreshToken(user);

      // Xóa refreshToken cũ sau khi tạo thành công token mới
      await refreshTokens.findByIdAndDelete(dbToken._id);

      // Lưu refreshToken mới vào cơ sở dữ liệu
      const newRefreshTokenDB = new refreshTokens({
        refreshToken: newRefreshToken,
        accessToken: newAccessToken,
      });
      await newRefreshTokenDB.save();

      // Gửi refreshToken mới qua cookie
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Sử dụng secure cookie nếu ở môi trường production
        path: "/",
        sameSite: "strict",
      });

      res
        .status(200)
        .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
  },
  changePassword: async (req, res, next) => {
    try {
      const { username, oldPassword, newPassword } = req.body;
      
      // Tìm người dùng dựa trên username
      const user = await userModel.findOne({ username: username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Kiểm tra mật khẩu cũ
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
      }

      // Mã hóa mật khẩu mới
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Cập nhật mật khẩu mới vào cơ sở dữ liệu
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: "Mật khẩu đã được thay đổi" });
    } catch (err) {
      next(err);
    }
  },
  logOut: async (req, res) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) return res.status(401).json("No authorization header");
    const token = authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json("No token to logout");
  
    // Delete the user's token from the database
    const deletedToken = await refreshTokens.deleteOne({ accessToken: token });
  
    if (deletedToken.deletedCount === 0) {
      return res.status(404).json("Token not found");
    }
  
    res.status(200).json("Logged out successfully!");
  },
};

module.exports = userController;
