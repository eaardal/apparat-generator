import createRouter from '../infrastructure/routerFactory';
import log from '../infrastructure/logger';
import processIssueEvent from './issue';
import processPullRequestEvent from './pullRequest';
import processPullRequestReviewEvent from './pullRequestReview';
import processPullRequestReviewCommentEvent from './pullRequestReviewComment';

const { router, execute } = createRouter();

const processPingEvent = (req, res) => {
  res.status(200).send('Well hello there ;)');
};

const processUnhandledEvent = (req, res) => {
  res.status(400).send(`I can't handle "${req.get('X-GitHub-Event')}" events :(`);
};

router.post(
  '/hook',
  execute(async (req, res) => {
    if (!req.query.slackHook) {
      res
        .status(400)
        .send(
          'Querystring parameter "slackHook" is required. It should be set to Webhook URL as provided in the Setup Instructions when configuring a new Incoming WebHook integration in Slack.',
        );
      return;
    }

    const eventType = req.get('X-GitHub-Event');

    try {
      switch (eventType) {
        case 'ping':
          processPingEvent(req, res);
          break;
        case 'issues':
          await processIssueEvent(req, res);
          break;
        case 'pull_request':
          await processPullRequestEvent(req, res);
          break;
        case 'pull_request_review':
          await processPullRequestReviewEvent(req, res);
          break;
        case 'pull_request_review_comment':
          await processPullRequestReviewCommentEvent(req, res);
          break;
        default:
          processUnhandledEvent(req, res);
          break;
      }
    } catch (error) {
      log.error('Error occurred', error);

      res.status(500).json({ error: error || 'Unknown error' });
    }
  }),
);

router.get('/hook', (req, res) => {
  res.send('<a href="https://github.com/eaardal/octobiwan">How to use the /github/hook API</a>');
});

export default router;
