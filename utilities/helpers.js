const bcrypt = require('bcryptjs');
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;

exports.sendOtp = async (mobile) => {
    await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: `+91${mobile}`, channel: 'sms' });
}


exports.verifyOtp = async (mobile, otp) => {
  try {
    const verificationCheck = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: `+91${mobile}`, code: otp });

    return verificationCheck.status === 'approved';
  } catch (error) {
    throw error
  }
};

