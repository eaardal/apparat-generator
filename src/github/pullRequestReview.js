import Slack from '../slack';
import GitHubTextBuilder from '../utils/GitHubTextBuilder';
import { processUnhandledEvent } from './common';

const getHeadlineForReviewState = (req) => {
  switch (req.body.review.state) {
    case 'changes_requested':
      return 'Forbedringsforslag på pull request';
    case 'commented':
      return 'Kommentar på pull request';
    case 'approved':
      return 'Godkjent pull request';
    default:
      return 'Kommentar på pull request';
  }
};

const getDescriptionForReviewState = (req) => {
  switch (req.body.review.state) {
    case 'changes_requested':
      return 'foreslo endringer på pull requesten';
    case 'commented':
      return 'kommenterte på pull requesten';
    case 'approved':
      return 'godkjente pull requesten';
    default:
      return 'kommenterte på pull requesten';
  }
};

const getEmojiForReviewState = (req) => {
  switch (req.body.review.state) {
    case 'changes_requested':
      return ':hugging_face:';
    case 'commented':
      return ':thinking_face:';
    case 'approved':
      return ':heart_eyes:';
    default:
      return ':thinking_face:';
  }
};

const submittedPullRequestReview = async (req, res) => {
  const { title, html_url } = req.body.pull_request;

  const headline = getHeadlineForReviewState(req);
  const description = getDescriptionForReviewState(req);
  const emoji = getEmojiForReviewState(req);

  const text = GitHubTextBuilder.buildPullRequestReviewText({
    headline,
    description: `${description} <${html_url}|${title}>`,
    emoji,
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const editedPullRequestReview = async (req, res) => {
  const { title, html_url } = req.body.pull_request;

  const text = GitHubTextBuilder.buildPullRequestReviewText({
    headline: 'Oppdatert kommentar på pull request',
    description: `oppdaterte sin kommentaren på pull requesten <${html_url}|${title}>`,
    emoji: ':nut_and_bolt:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const dismissedPullRequestReview = async (req, res) => {
  const { title, html_url } = req.body.pull_request;

  const text = GitHubTextBuilder.buildPullRequestReviewText({
    headline: 'Avsluttet pull request review',
    description: `avsluttet review på pull requesten <${html_url}|${title}>`,
    emoji: ':no_entry_sign:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const processPullRequestReviewEvent = async (req, res) => {
  const action = req.body.action;

  switch (action) {
    case 'submitted':
      await submittedPullRequestReview(req, res);
      break;
    case 'edited':
      await editedPullRequestReview(req, res);
      break;
    case 'dismissed':
      await dismissedPullRequestReview(req, res);
      break;
    default:
      processUnhandledEvent(req, res);
      break;
  }
};

export default processPullRequestReviewEvent;
