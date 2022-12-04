const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 7,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  let user = this;
  // salt를 이용해서 비밀번호 암호화한 후 보내줌
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    // 그 외에는 그냥 내보냄
    next();
  }
});

// 로그인 - 비밀번호 비교
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // 입력된 비밀번호와 데이터베이스에 있는 암호화된 비밀번호가 같은지 확인(비교) -> 평문을 암호화해서 비교
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch); // 즉, true
  });
};

// 로그인 - 토큰 생성
userSchema.methods.generateToken = function (cb) {
  var user = this;
  // jsonwebtoken을 이용해서 토큰 생성
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  // user._id + 'secretToken' = token 을 통해 토큰 생성
  // 토큰 해석을 위해 'secretToken' 입력 -> user._id 가 나옴
  // 토큰을 가지고 누구인지 알 수 있는 것
  user.token = token;

  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

// auth 인증 - 복호화 (토큰을 디코드)
userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, "secretToken", function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

module.exports = User = mongoose.model("User", userSchema);
