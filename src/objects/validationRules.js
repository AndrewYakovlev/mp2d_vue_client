export const wbValidationRules = {
  name: [{ required: true, message: "Введите наименование", trigger: "blur" }],
  token: [{ required: true, message: "Введите токен", trigger: "blur" }],
  account_id: [
    { required: true, message: "Выберите акканут", trigger: "change" },
  ],
};
export const ozonValidationRules = {
  name: [{ required: true, message: "Введите наименование", trigger: "blur" }],
  token: [{ required: true, message: "Введите токен", trigger: "blur" }],
  client_id: [
    { required: true, message: "Введите Client-ID", trigger: "blur" },
  ],
  account_id: [
    { required: true, message: "Выберите акканут", trigger: "change" },
  ],
};
export const sberValidationRules = {
  name: [{ required: true, message: "Введите наименование", trigger: "blur" }],
  token: [{ required: true, message: "Введите токен", trigger: "blur" }],
  _id: [{ required: true, message: "Введите ID", trigger: "blur" }],
  account_id: [
    { required: true, message: "Выберите акканут", trigger: "change" },
  ],
};
export const ymValidationRules = {
  name: [{ required: true, message: "Введите наименование", trigger: "blur" }],
  code: [
    {
      required: true,
      message: "Получите и введите код подтверждения",
      trigger: "blur",
    },
  ],
  client_id: [
    { required: true, message: "Введите CampaignId", trigger: "blur" },
  ],
  account_id: [
    { required: true, message: "Выберите акканут", trigger: "change" },
  ],
};
export const dgValidationRules = {
  name: [{ required: true, message: "Введите наименование", trigger: "blur" }],
  token: [{ required: true, message: "Введите токен", trigger: "blur" }],
  partner_id: [
    { required: true, message: "Введите Partner ID", trigger: "blur" },
  ],
};
