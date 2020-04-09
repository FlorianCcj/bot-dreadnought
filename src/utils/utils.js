const format_date = date => {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${date.getFullYear()}/${m <= 9 ? '0' + m : m}/${d <= 9 ? '0' + d : d}`;
};

function from_date_to_password(hash = 0) {
  return +(format_date(new Date()) + new Date().getHours()).split('/').join('') + hash;
}

module.exports = {
  format_date,
  from_date_to_password
};
