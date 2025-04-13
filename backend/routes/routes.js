const express = require("express");
const router = express.Router();
const notesModel = require("../models/notes.js");
const jwt = require("jsonwebtoken");

const bodyparser = require("body-parser");

const bcrypt = require("bcryptjs");

const { v4: uuidv4 } = require("uuid");

const contactDetails = require("../models/contactform.js");

const signup = require("../models/register.js");

const verifyToken = require("../middleware/auth.js");

const upload = require("../middleware/multer.js");

const verifyEmail = require("../services/nodemailer/verifyEmail.js");

const forgetPasswordEmail = require("../services/nodemailer/forget-password-mail.js");

router.get("/notes", async (req, res) => {
  let page = Number(req.query.page) || 1;
  let limit = 5;
  let skip = (page - 1) * limit;

  const totalNotes = await notesModel.count();
  const notes = await notesModel.find().limit(limit).skip(skip);
  if (notes) {
    res
      .status(200)
      .json({ msg: "success", notesData: notes, Total: totalNotes });
  } else {
    res.status(404).json({ msg: "failed to load data" });
  }
});

router.get("/single-notes/:id", async (req, res) => {
  try {
    const singleNotes = await notesModel.findOne({ _id: req.params.id });

    res.status(200).json({ msg: "success", singleNotes: singleNotes });
  } catch (error) {
    res.status(404).json({ msg: "Notes not found" });
  }
});

router.post("/contact", async (req, res) => {
  const { name, email, mobileNo, subject, message } = req.body;

  let contactData = new contactDetails({
    name: name,
    email: email,
    mobileNo: mobileNo,
    subject: subject,
    message: message,
  });
  contactData
    .save()
    .then(() => {
      res.status(201).json(contactData);
    })
    .catch((err) => {
      res.status(404).json("some error occured");
    });
});

router.post("/register", async (req, res) => {
  const uniqeUsername = await signup.find({ username: req.body.username });

  const uniqeEmail = await signup.find({ email: req.body.email });

  if (uniqeUsername.length != 0 && uniqeEmail.length != 0) {
    res
      .status(404)
      .json({ usernameEmail: "username and email already exists." });
  } else if (uniqeUsername.length != 0) {
    res.status(404).json({ username: "username already exists." });
  } else if (uniqeEmail.length != 0) {
    res.status(404).json({ email: "email already exists." });
  } else if (req.body.password === req.body.cpassword) {
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const { username, email, is_admin } = req.body;

    const signupData = new signup({
      username: username,
      email: email,
      password: hashPassword,
    });
    signupData
      .save()
      .then((response) => {
        verifyEmail(response.email, response._id);

        res.status(200).json(signupData);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  } else {
    res.status(404).json({ msg: "password and confirm password not matched" });
  }
});

router.get("/verify-email/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const verify_status = await signup.findOne({ _id: id });
    if (verify_status.is_verify === false) {
      const verified = await signup.updateOne(
        { _id: id },
        { $set: { is_verify: true } }
      );
      res.redirect("http://localhost:3000/verify-success?isVerify=success");
    } else {
      res.redirect("http://localhost:3000/");
    }
  } catch (err) {
    res.status(501).json({ msg: "error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const matchedUser = await signup.findOne({ username: username });
  if (matchedUser) {
    const checkPassword = await bcrypt.compare(password, matchedUser.password);
    if (checkPassword) {
      if (matchedUser.is_verify === true) {
        const token = jwt.sign({ matchedUser }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });

        res
          .status(201)
          .json({ msg: "login succesfull", token: token, user: matchedUser });
      } else {
        res.status(400).json({ msg: "Please verify your email first" });
      }
    } else {
      res.status(400).json({ msg: "username and password not matched" });
    }
  } else {
    res.status(400).json({ msg: "username and password not matched" });
  }
});

router.post("/send-reset-password-link", async (req, res) => {
  const email = req.body.email;
  const checkEmailInDb = await signup.findOne({ email: email });
  if (checkEmailInDb) {
    const token = uuidv4();

    const add_token = signup
      .updateOne({ email: email }, { $set: { token: token } })
      .then((response) => {
        forgetPasswordEmail(email, token);

        res.status(200).json({ msg: "Password reset link has been sent" });
      })
      .catch((err) => {
        res.status(500).json({ msg: "Can’t send email now,try again letter" });
      });
  } else {
    res.status(500).json({ msg: "Entered Email not exists" });
  }
});

router.post("/forget-password/:token", async (req, res) => {
  const token = req.params.token;
  const password = req.body.password;
  const cpassword = req.body.cpassword;
  if (password === cpassword) {
    const newhashPassword = await bcrypt.hash(req.body.password, 10);
    const updatedpassword = signup
      .updateOne(
        { token: token },
        { $set: { password: newhashPassword, token: "" } }
      )
      .then(() => {
        res.status(200).json({ msg: "password reset successfull" });
      })
      .catch((err) => {
        res.status(501).json({ msg: "error" });
      });
  } else {
    res.status(500).json({ msg: "password and confirm password not matched" });
  }
});

router.post("/search/:key", async (req, res) => {
  const Key = req.params.key;

  const searched = await notesModel.find({
    $or: [
      { title: { $regex: Key, $options: "i" } },
      { subject: { $regex: Key, $options: "i" } },
    ],
  });

  if (searched.length !== 0) {
    res.status(200).json({ msg: "success", search: searched });
  } else {
    res.status(501).json({ msg: "error" });
  }
});

router.post(
  "/upload-notes",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "notesfile", maxCount: 1 },
  ]),
  (req, res) => {
    if (req.fileValidationError) {
      res.status(400).json({ msg: "invaild file type" });
    }

    const { title, subject, className } = req.body;

    const notes = new notesModel({
      title: title,
      img_src: req.files.image[0].filename,
      file_src: req.files.notesfile[0].filename,
      subject: subject,
      Class: className,
    })
      .save()
      .then(() => {
        res.status(200).json({ msg: "success" });
      })
      .catch((err) => {
        res.status(500).json({ msg: "failed" });
      });
  }
);

router.delete("/delete-notes/:id", (req, res) => {
  const Id = req.params.id;

  const deletedNotes = notesModel
    .deleteOne({ _id: Id })
    .then(() => {
      res.status(200).json({ msg: "success" });
    })
    .catch((err) => {
      res.status(501).json({ msg: "error" });
    });
});

router.delete("/delete-userquery/:id", (req, res) => {
  const Id = req.params.id;

  const deletedQuery = contactDetails
    .deleteOne({ _id: Id })
    .then(() => {
      res.status(200).json({ msg: "success" });
    })
    .catch((err) => {
      res.status(501).json({ msg: "error" });
    });
});

module.exports = router;
