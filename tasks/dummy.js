module.exports = (cb) => {
  console.log('testing - gonna wait 5 secs');
  setTimeout(() => cb(new Error('foo')), 5000);
};
