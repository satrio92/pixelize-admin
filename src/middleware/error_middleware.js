const errorMiddleware = async (err, req, res, next) => {
  if(err.status >= 400 && err.status < 500 ) {
    res.status(err.status).json({ error: err.message.replace(/[;:\]\[=\-!'"<>,.}{+_|?/$#%^&*()@~`]/g, '') })
      .end();
  } else {
    res.status(500).json({ error: err })
      .end();
  }
}

export { errorMiddleware }