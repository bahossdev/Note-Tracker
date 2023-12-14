// Custom middleware that logs out the type and path of each request to the server
const clog = (req, res, next) => {
  const yellow = '\x1b[33m';
  const cyan = '\x1b[36m';
  const red = '\x1b[31m';
  const green = '\x1b[92m';
  const reset = '\x1b[0m';

  switch (req.method) {
    case 'GET': {
      console.info(`📒 ${yellow}${req.method} request to ${req.path}` + reset);
      break;
    }
    case 'POST': {
      console.info(`📘 ${cyan}${req.method} request to ${req.path}` + reset);
      break;
    }
    case 'DELETE': {
      console.info(`📕 ${red}${req.method} request to ${req.path}` + reset);
      break;
    }
    default:
      console.log(`📗 ${green}${req.method} request to ${req.path}` + reset);
  }

  next();
};

exports.clog = clog;
