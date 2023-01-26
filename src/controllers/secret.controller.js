function httpGetSecretLevel1(req, res) {
  return res.status(200).json({
    secret: "this is a level 1 secret",
  });
}

function httpGetSecretLevel2(req, res) {
  return res.status(200).json({
    secret: "this is a level 2 secret",
  });
}

function httpGetSecretLevel3(req, res) {
  return res.status(200).json({
    secret: "this is a level 3 secret",
  });
}

function httpGetSecretLevel4(req, res) {
  return res.status(200).json({
    secret: "this is a level 4 secret",
  });
}

function httpGetSecretLevel5(req, res) {
  return res.status(200).json({
    secret: "this is a level 5 secret",
  });
}

module.exports = {
  httpGetSecretLevel1,
  httpGetSecretLevel2,
  httpGetSecretLevel3,
  httpGetSecretLevel4,
  httpGetSecretLevel5,
};
