import * as yup from 'yup';

const loginSchema = yup.object().shape({
  username: yup.string().trim().required(),
  password: yup.string().required(),
});

const chatSchema = (message) => yup.object().shape({
  body: yup.string().trim().required(message),
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

export { loginSchema, chatSchema, newChannelSchema };
