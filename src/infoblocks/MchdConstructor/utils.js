export const formatDate = (value) => (value ? moment(value).tz("Europe/Moscow").format("DD.MM.YYYY") : "");
