const { getMessages } = require('../utils/i18n');
const knex = require('../database/db');
const jwt = require('jsonwebtoken');

const lang = 'es';
const messages = getMessages(lang);

exports.login = async (req, res) => {
  const { identifier } = req.body;

  if (!identifier || identifier.trim() === '') {
    const msg = messages.login.required;
    console.log(msg);
    return res.status(400).json({ message: msg });
  }

  let inputType;
  if (identifier.includes('@')) {
    inputType = 'email';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(identifier)) {
      const msg = messages.login.email.invalid;
      console.log(msg);
      return res.status(400).json({ message: msg });
    }
  } else {
    inputType = 'phone';
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(identifier)) {
      const msg = messages.login.phone.invalid;
      console.log(msg);
      return res.status(400).json({ message: msg });
    }
  }

  try {
    let user = await knex('agents')
      .where(builder => builder.where('email', identifier).orWhere('phone', identifier))
      .first();

    let userType = 'agent';

    if (!user) {
      user = await knex('partners')
        .where(builder => builder.where('email', identifier).orWhere('phone', identifier))
        .first();

      userType = 'partner';
    }

    if (!user) {
      const msg = messages.login[inputType].error;
      console.log(msg);
      return res.status(404).json({ message: msg });
    }

    const successMsg = messages.login[inputType].success;
    console.log(`${successMsg} (${userType})`);

    return res.json({
      message: successMsg,
      userType,
      maskedIdentifier: maskIdentifier(identifier),
    });

  } catch (error) {
    console.error('Error interno del servidor', error);
    return res.status(500).json({ message: messages.login.server_error });
  }
};

function maskIdentifier(identifier) {
  if (identifier.includes('@')) {
    const [name, domain] = identifier.split('@');
    return `${name.substring(0, 2)}***@${domain}`;
  } else {
    return `***${identifier.slice(-3)}`;
  }
}
