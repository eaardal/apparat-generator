import Slack from '../slack';
import createRouter from '../infrastructure/routerFactory';
import log from '../infrastructure/logger';

const { router, execute } = createRouter();

router
  .post(
    '/',
    execute(async (req, res) => {
      console.log('TRIGGERED!');
      res.send('Ping from slash command!');
    }),
  )
  .get(
    '/',
    execute(async (req, res) => {
      res.send('Halleu');
    }),
  );

export default router;
