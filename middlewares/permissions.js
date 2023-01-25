const permissions = {
  two: 2,
  three: 3,
  four: 4,
  five: 5,
};

function hasPermissionLevelOne(req, res, next) {
  if (req && req.user.permissionlevel === permissions.one) {
    return next();
  } else {
    return res.status(403).json({
      error: "Access denied.",
    });
  }
}

function hasPermissionLevelTwo(req, res, next) {
  if (req && req.user.permissionlevel === permissions.two) {
    return next();
  } else {
    return res.status(403).json({
      error: "Access denied.",
    });
  }
}

function hasPermissionLevelThree(req, res, next) {
  if (req && req.user.permissionlevel === permissions.three) {
    return next();
  } else {
    return res.status(403).json({
      error: "Access denied.",
    });
  }
}

function hasPermissionLevelFour(req, res, next) {
  if (req && req.user.permissionlevel === permissions.four) {
    return next();
  } else {
    return res.status(403).json({
      error: "Access denied.",
    });
  }
}

function hasPermissionLevelFive(req, res, next) {
  if (req && req.user.permissionlevel === permissions.five) {
    return next();
  } else {
    return res.status(403).json({
      error: "Access denied.",
    });
  }
}

module.exports = {
  hasPermissionLevelOne,
  hasPermissionLevelTwo,
  hasPermissionLevelThree,
  hasPermissionLevelFour,
  hasPermissionLevelFive,
};
