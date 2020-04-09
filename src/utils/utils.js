const format_date = date => {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${date.getFullYear()}/${m <= 9 ? '0' + m : m}/${d <= 9 ? '0' + d : d}`;
};

function from_date_to_password(hash = 0) {
  return +(format_date(new Date()) + new Date().getHours()).split('/').join('') + hash;
}

function slug(msg_content) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')
  return msg_content.toString().toLowerCase().replace(p, c => b.charAt(a.indexOf(c)));
}

module.exports = {
  format_date,
  from_date_to_password,
  slug
};
