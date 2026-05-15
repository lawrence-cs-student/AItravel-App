// middlewares/loggingMiddleware.js

export const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  
  console.log(`📤 [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  
  
  if (req.body && Object.keys(req.body).length > 0) {
    
    const safeBody = { ...req.body };
    if (safeBody.password) safeBody.password = '***HIDDEN***';
    if (safeBody.token) safeBody.token = '***HIDDEN***';
    console.log('📦 Request Body:', safeBody);
  }
  
  
  if (req.query && Object.keys(req.query).length > 0) {
    console.log('🔍 Query Params:', req.query);
  }
  
  
  if (req.params && Object.keys(req.params).length > 0) {
    console.log('📍 Route Params:', req.params);
  }
  
  
  if (req.userId) {
    console.log('👤 User ID:', req.userId);
  }
  
  
  const originalSend = res.send;
  res.send = function(data) {
    res.responseBody = data;
    return originalSend.call(this, data);
  };
  
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    const statusIcon = statusCode >= 400 ? '❌' : '✅';
    
    console.log(`${statusIcon} ${req.method} ${req.originalUrl} - ${statusCode} - ${duration}ms`);
    
    
    if (statusCode >= 400 && res.responseBody) {
      console.log('🚨 Error Response:', res.responseBody);
    }
  });
  
  next();
};