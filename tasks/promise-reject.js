module.exports = () => (
  new Promise((resolve, reject) => {
    console.log('testing - gonna wait 2 secs');
    setTimeout(reject, 2000);
  })
);
