export const parseFormData = (data: any, keepFormData?: boolean): FormData => {
  const bodyFormData = new FormData();
  Object.keys(data).forEach((key: string) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((value: any) => {
        bodyFormData.append(`${key}[]`, value);
      });
    } else {
      bodyFormData.append(key, data[key]);
    }
  });
  return bodyFormData;
};
