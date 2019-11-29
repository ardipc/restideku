exports.sanitize = (str) => {
	str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
  return str.trim();
};

exports.dateNow = () => {
	return new Date().toISOString().slice(0,10);
};

exports.dateTimeNow = () => {
	return new Date().toISOString().slice(0, 19).replace('T'," ");
};