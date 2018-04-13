import Slack from '../slack';
import GitHubTextBuilder from '../utils/GitHubTextBuilder';
import { processUnhandledEvent } from './common';

const openedIssue = async (req, res) => {
  const text = GitHubTextBuilder.buildIssueText({
    headline: 'Ny issue',
    description: 'åpnet issue',
    emoji: ':sparkles:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const editedIssue = async (req, res) => {
  const text = GitHubTextBuilder.buildIssueText({
    headline: 'Endret issue',
    description: 'endret issue',
    emoji: ':nut_and_bolt:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const closedIssue = async (req, res) => {
  const text = GitHubTextBuilder.buildIssueText({
    headline: 'Lukket issue',
    description: 'lukket issue',
    emoji: ':no_entry_sign:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const reopenedIssue = async (req, res) => {
  const text = GitHubTextBuilder.buildIssueText({
    headline: 'Gjenåpnet issue',
    description: 'gjenåpnet issue',
    emoji: ':recycle:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const processIssueEvent = async (req, res) => {
  const action = req.body.action;

  switch (action) {
    case 'opened':
      await openedIssue(req, res);
      break;
    case 'edited':
      await editedIssue(req, res);
      break;
    case 'closed':
      await closedIssue(req, res);
      break;
    case 'reopened':
      await reopenedIssue(req, res);
      break;
    default:
      processUnhandledEvent(req, res);
      break;
  }
};

export default processIssueEvent;
