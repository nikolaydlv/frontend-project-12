import * as yup from 'yup';

const registrationSchema = (nameMsg, passwordMsg, equalMsg, requiredMsg) => yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, nameMsg)
    .max(20, nameMsg)
    .required(requiredMsg),

  password: yup
    .string()
    .trim()
    .min(6, passwordMsg)
    .required(requiredMsg),

  passwordConfirmation: yup
    .string()
    .trim()
    .oneOf([yup.ref('password')], equalMsg)
    .required(requiredMsg),
});

const loginSchema = (message) => yup.object().shape({
  username: yup
    .string()
    .trim()
    .required(message),

  password: yup
    .string()
    .required(message),
});

const chatSchema = (message) => yup.object().shape({
  body: yup
    .string()
    .trim()
    .required(message),
});

const newChannelSchema = (channels, doubleMsg, lengthMsg) => yup.object().shape({
  channelName: yup
    .string()
    .trim()
    .notOneOf(channels.map((channel) => channel.name), doubleMsg)
    .min(3, lengthMsg)
    .max(20, lengthMsg)
    .required(lengthMsg),
});

export {
  registrationSchema,
  loginSchema,
  chatSchema,
  newChannelSchema,
};
