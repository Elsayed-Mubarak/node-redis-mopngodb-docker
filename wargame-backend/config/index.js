const privateKeySecret = `-----BEGIN RSA PRIVATE KEY-----
MIIEoQIBAAKCAQBwxluqfmaXXoTBh71rO2AnqU0p9HAexn5VbZv8uziIugdnHO5u
mpso7yKDKvZ3gcL1ahyUXlHp5WNTFiEA7ObOZAPs2BxkoKCq5qtNVAySm8uNreLH
c0R/JSiKKNyynPuaTW4m5Zo8j9hUbhYYDVhrdQUbUSA0F5TdLwhLkMKbHFCKChQo
IXY2S9GmBkN2cJIKI99mi0z8uMlsG80GT7pknzAoFNlA3anC4l6xfALQ4hWTYrRm
CHs2qZaIbZZsX78Wd+Nw7kMhfIUQTRo9WWKt5Yahe1Wq3MSwtgrKA+hZkPShxamC
Hh2e3fuuxJmUdqp3EEpvzzS+112wyT53tQotAgMBAAECggEAbH0F1eA/RULyJ1Mz
z6KQ/9aImuHBsnl1My18sAZTfoSndnSIkvI8bYaPBuwfqhu0t25bDAgoeP/pKxbQ
rRk5eDcS55eGyO8VYRMCnCNM7QTfLu6miQTEUiQm+bIRjeoiyO/QFa8vTy96Bs7Y
hk7gTo+GWB8VAcflt1n1euxJqfio58RreV/2kraYR0DVZk5Ac/7Z2oQsKa2tjAAr
j7lI5SoR3QikpUHqjQWJTcg+1XwrXfQSRP3AMr4+1iXqXs52IhSxO6WflKOSu9dh
/LFo3llrQggLKekd2TlH7YPyz536HffoVuidx3IAzuv64V+BN3LKCYd3/C1zIQWq
swORaQKBgQDLilUa1pfKnx64oDAKLnXv29Q/UoOZHr7/HYul6U36yW5y4omynr9S
tqPSt844Cdy6Q6tDw2cGpQa4GoYLWOeFaPP6vugJpRQkOs+xBFIBEagROpaWEUPT
dO2XC2P0IT12euYbxpR8ItiEhD6pnX8X5lV2edO6EU58ydNAhJ3QlwKBgQCN10h2
pLlZZQQKsqgNi28WG6Kr/HyvAuULSvmIisJq/85r83haGtwtt0okb0P0vXEvQRGG
o5bBTX+umlLWJvssafYDN6cdKJ49WOmVjBPCcl3jN5Ee/4o2MjY6VWrEk1f+MEkT
ztAozBZ0JkGl8aVvDFDkEl4QCq97D++/fvNP2wKBgHhBzhCiU2K66srIkjmhw7qo
1llnZitU2CIhEb4//vu6gZBNOnAXjRDQqjA4uxWu9gPzMUBDNh7d5/9kZGhV6cyP
+v7eRnhUWXcibE25ML5C8Vrkk84sezd3cVz5tN+ruAXFjSlCBb7mU6jP/bn3PP0g
8MOkLS1VRltCX5dSA3AXAoGATHq9JsPQ8OOn10DXnl4Fas1B3CxK6m7MI1eszrPK
+riti8V+qk77U2cWAilAYhFXmxwhoBBK9DWeV/38Fl50ZlFIBhoW8ID7OabcY/dg
nCLgfuhyRl2RH4HZfYCbDh1If9V3Qcfss2K/5KbQFPMDuanRX/iLYWjxj5BbPEzu
UqsCgYAVk8U2cAVNbsjBFnvhuY2pldFriPbqg2xJPTbsvKWhXNVhD+nNC7zw2tk6
FJqmCoUS7fJjBxuaOFNLdCIUp5BJ4EIc231KwFvxBneLQU0NHjwEIZT06LKIMaaN
25OYELubnTmN8VdBAOPj8Bn48JQIEyWSHr6oQJfStXfIit8kIA==
-----END RSA PRIVATE KEY-----`;

const publicKeySecret = `-----BEGIN PUBLIC KEY-----
MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBwxluqfmaXXoTBh71rO2An
qU0p9HAexn5VbZv8uziIugdnHO5umpso7yKDKvZ3gcL1ahyUXlHp5WNTFiEA7ObO
ZAPs2BxkoKCq5qtNVAySm8uNreLHc0R/JSiKKNyynPuaTW4m5Zo8j9hUbhYYDVhr
dQUbUSA0F5TdLwhLkMKbHFCKChQoIXY2S9GmBkN2cJIKI99mi0z8uMlsG80GT7pk
nzAoFNlA3anC4l6xfALQ4hWTYrRmCHs2qZaIbZZsX78Wd+Nw7kMhfIUQTRo9WWKt
5Yahe1Wq3MSwtgrKA+hZkPShxamCHh2e3fuuxJmUdqp3EEpvzzS+112wyT53tQot
AgMBAAE=
-----END PUBLIC KEY-----`;

const defaultTempTokenSecret = '40VUEA8T29nAF8Q9d4FcbgsUfxVreZ_-_=%4VRtddgdosvvv85227dds*@#ddf';


const envs = {
  production: 'production',
  development: 'development',
  staging: 'staging',
  test: 'test'
};

const currentEnv = process.env.NODE_ENV || envs.development;
const config = require(`./env/${currentEnv}.json`);


config.PRIVATEKEY = process.env.SECRET || privateKeySecret;
config.PUBLICKEY = process.env.SECRET || publicKeySecret;

config.tempTokenSecret = process.env.TEMP_TOKEN_SECRET || defaultTempTokenSecret;
config.envs = envs;
config.currentEnv = currentEnv;

config.isEmailVerificationRequired = true;
config.canSendEmail = true;
config.canUseCustomErrorPages = true;
config.canHttps = true;

// prevent public routes abuse and scanning
config.preventAbuse = true;
config.canTest = false;

// ENVIRONMENT specific
if (config.currentEnv === config.envs.development) {
  config.isEmailVerificationRequired = false;
  config.canSendEmail = false;
  config.canUseCustomErrorPages = false;
  config.canHttps = false;
  config.preventAbuse = false;
  config.canTest = true;
}
if (config.currentEnv === config.envs.test) {
  config.isEmailVerificationRequired = false;
  config.canSendEmail = true;
  config.canUseCustomErrorPages = false;
  config.canHttps = false;
  config.preventAbuse = false;
  config.canTest = true;
}



console.log(`===================== CONFIG [${currentEnv}] =====================`);

config.JWTsecret = process.env.SECRET || privateKeySecret;
config.tempTokenSecret = process.env.TEMP_TOKEN_SECRET || defaultTempTokenSecret;

config.email = {
  user: 'arcosec20@gmail.com',
  pass: '@Isec2020',
  user2: 'asc.wargames@gmail.com',
  pass2: '@asc2020'
}

module.exports = config;