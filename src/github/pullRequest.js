import Slack from '../slack';
import GitHubTextBuilder from '../utils/GitHubTextBuilder';
import { processUnhandledEvent } from './common';

const openedPullRequest = async (req, res) => {
  const { title, html_url } = req.body.pull_request;

  const text = GitHubTextBuilder.buildPullRequestText({
    headline: 'Ny pull request',
    description: `opprettet pull requesten <${html_url}|${title}>`,
    emoji: ':sparkles:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const editedPullRequest = async (req, res) => {
  const { title, html_url } = req.body.pull_request;

  const text = GitHubTextBuilder.buildPullRequestText({
    headline: 'Oppdatert pull request',
    description: `oppdaterte pull requesten <${html_url}|${title}>`,
    emoji: ':nut_and_bolt:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const closedPullRequest = async (req, res) => {
  const { title, merged, base, html_url } = req.body.pull_request;

  const headline = merged
    ? 'Merget pull request'
    : 'Lukket pull request';

  const description = merged
    ? `merget pull requesten <${html_url}|${title}> inn i ${base.ref}`
    : `lukket pull requesten <${html_url}|${title}>`;

  const emoji = merged
    ? ':white_check_mark:'
    : ':no_entry_sign:';

  const text = GitHubTextBuilder.buildPullRequestText({
    headline,
    description,
    emoji,
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const reopenedPullRequest = async (req, res) => {
  const { title, html_url } = req.body.pull_request;

  const text = GitHubTextBuilder.buildPullRequestText({
    headline: 'Gjenåpnet pull request',
    description: `gjenåpnet pull requesten <${html_url}|${title}>`,
    emoji: ':recycle:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const processPullRequestEvent = async (req, res) => {
  const action = req.body.action;

  switch (action) {
    case 'opened':
      await openedPullRequest(req, res);
      break;
    case 'edited':
      await editedPullRequest(req, res);
      break;
    case 'closed':
      await closedPullRequest(req, res);
      break;
    case 'reopened':
      await reopenedPullRequest(req, res);
      break;
    default:
      processUnhandledEvent(req, res);
      break;
  }
};

export default processPullRequestEvent;
