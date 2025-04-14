declare const process: {
  env: {
    [key: string]: string | undefined;
  }
};

export const environment = {
  production: false,
  apiUrl: process.env['ANGULAR_APP_API_URL'] || 'YOUR_API_URL',
  apiKey: process.env['ANGULAR_APP_API_KEY'] || 'YOUR_API_KEY'
}; 