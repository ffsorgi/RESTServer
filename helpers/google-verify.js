const { OAuth2Client } = require('google-auth-library');

const id = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(id);

async function googleVerify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: id,
  });
  
  const {name, picture, email} = ticket.getPayload();

  return{
      name,
      img : picture,
      email
  }

}

module.exports = {
    googleVerify
}

