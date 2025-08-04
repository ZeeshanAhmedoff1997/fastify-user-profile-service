import { buildApp } from './app';

const app = buildApp();

app.ready((err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  app.listen({ port: Number(app.config.PORT), host: '0.0.0.0' }, (err) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  });
});
