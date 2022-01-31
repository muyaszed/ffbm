module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'bd253981c9960801cfc8b434afcf7634'),
  },
});
