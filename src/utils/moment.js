export default (time: Number): String => {
  const date = new Date(time);

  return `${date.getHours()} : ${date.getMinutes()}`;
};
