import Slack from '../slack';
import GitHubTextBuilder from '../utils/GitHubTextBuilder';
import { processUnhandledEvent } from './common';

const createdPullRequestReviewComment = async (req, res) => {
  const { title, html_url } = req.body.pull_request;

  const text = GitHubTextBuilder.buildPullRequestReviewCommentText({
    headline: 'Kommentar i pull request diskusjon',
    description: `kommenterte i diskusjonen på pull requesten <${html_url}|${title}>`,
    emoji: ':thinking_face:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const editedPullRequestReviewComment = async (req, res) => {
  const { title, html_url } = req.body.pull_request;

  const text = GitHubTextBuilder.buildPullRequestReviewCommentText({
    headline: 'Oppdatert kommentar i pull request diskusjon',
    description: `oppdaterte sin kommentar i diskusjonen på pull requesten <${html_url}|${title}>`,
    emoji: ':sweat_smile:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const deletedPullRequestReviewComment = async (req, res) => {
  const { title, html_url } = req.body.pull_request;

  const text = GitHubTextBuilder.buildPullRequestReviewCommentText({
    headline: 'Slettet kommentar i pull request diskusjon',
    description: `slettet sin kommentar i diskusjonen på pull requesten <${html_url}|${title}>`,
    emoji: ':grin:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const processPullRequestReviewEvent = async (req, res) => {
  const action = req.body.action;

  switch (action) {
    case 'created':
      await createdPullRequestReviewComment(req, res);
      break;
    case 'edited':
      await editedPullRequestReviewComment(req, res);
      break;
    case 'deleted':
      await deletedPullRequestReviewComment(req, res);
      break;
    default:
      processUnhandledEvent(req, res);
      break;
  }
};

export default processPullRequestReviewEvent;
