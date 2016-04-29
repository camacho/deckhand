module.exports = function dummy() {
  return new Promise((resolve) => {
    console.log('testing - gonna wait 5 secs');
    setTimeout(resolve, 5000);
  });
};
