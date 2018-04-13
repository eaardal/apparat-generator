import createRouter from '../infrastructure/routerFactory';
import generateApparat from './generator';

const { router, execute } = createRouter();

router
  .post(
    '/',
    execute(async (req, res) => {
      const result = {
        text: await generateApparat(),
        response_type: 'in_channel',
      };
      res.send(result);
    }),
  )
  .get(
    '/',
    execute(async (req, res) => {
      res.send(await generateApparat());
    }),
  );

export default router;
