import url from 'url';

export const constructFullUrl = req =>
  url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl,
  });
