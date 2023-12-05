export default {
  translation: {
    name: 'Hexlet Chat',
    entry: 'Войти',
    exit: 'Выйти',
    registration: 'Регистрация',
    makeRegistration: 'Зарегистрироваться',
    noAccount: 'Нет аккаунта?',
    invalidFeedback: 'Неверные имя пользователя или пароль',
    pageNotFound: 'Страница не найдена',
    redirect: 'Но вы можете перейти ',
    mainPage: 'на главную страницу',
    channelsTitle: 'Каналы',
    newMessage: 'Новое сообщение',
    messageBody: 'Сообщение не может быть пустым',
    send: 'Отправить',
    cancel: 'Отменить',

    registrationRules: {
      name: 'От 3 до 20 символов',
      password: 'Не менее 6 символов',
      passwordEquality: 'Пароли должны совпадать',
    },

    placeholders: {
      login: 'Ваш ник',
      username: 'Имя пользователя',
      password: 'Пароль',
      passwordConfirmation: 'Подтвердите пароль',
      newMessage: 'Введите сообщение...',
    },

    messagesCounter: {
      messages_zero: 'Нет сообщений',
      messages_one: '{{count}} сообщение',
      messages_few: '{{count}} сообщения',
      messages_many: '{{count}} сообщений',
    },

    modal: {
      add: 'Добавить канал',
      toggle: 'Переключатель режимов',
      rename: 'Переименовать',
      renameChannel: 'Переименовать канал',
      remove: 'Удалить',
      removeChannel: 'Удалить канал',
      confirm: 'Уверены?',
      unique: 'Должно быть уникальным',
      lengthParams: 'От 3 до 20 символов',
    },

    errors: {
      invalidFeedback: 'Неверные имя пользователя или пароль',
      userExist: 'Такой пользователь уже существует',
      required: 'Обязательное поле',
    },
  },
};
