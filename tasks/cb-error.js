module.exports = (cb) => {
  console.log('testing - gonna wait 2 secs');
  setTimeout(() => cb(new Error('foo')), 2000);
};
