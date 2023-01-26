const express = require("express");
const passport = require("passport");

const {
  hasPermissionLevelOne,
  hasPermissionLevelTwo,
  hasPermissionLevelThree,
  hasPermissionLevelFour,
  hasPermissionLevelFive,
} = require("../middlewares/permissions");

const {
  httpGetSecretLevel1,
  httpGetSecretLevel2,
  httpGetSecretLevel3,
  httpGetSecretLevel4,
  httpGetSecretLevel5,
} = require("../controllers/secret.controller");

const secretRouter = express.Router();

secretRouter.get(
  "/level1",
  passport.authenticate("jwt", { session: false }),
  hasPermissionLevelOne,
  httpGetSecretLevel1
);
secretRouter.get(
  "/level2",
  passport.authenticate("jwt", { session: false }),
  hasPermissionLevelTwo,
  httpGetSecretLevel2
);
secretRouter.get(
  "/level3",
  passport.authenticate("jwt", { session: false }),
  hasPermissionLevelThree,
  httpGetSecretLevel3
);
secretRouter.get(
  "/level4",
  passport.authenticate("jwt", { session: false }),
  hasPermissionLevelFour,
  httpGetSecretLevel4
);
secretRouter.get(
  "/level5",
  passport.authenticate("jwt", { session: false }),
  hasPermissionLevelFive,
  httpGetSecretLevel5
);

module.exports = secretRouter;
