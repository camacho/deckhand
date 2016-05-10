module.exports = () => (
  new Promise((resolve) => {
    console.log('testing - gonna wait 2 secs');
    setTimeout(resolve, 2000);
  })
);
