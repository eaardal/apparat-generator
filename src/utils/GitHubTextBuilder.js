import DefaultTextBuilder from './DefaultTextBuilder';

class GitHubTextBuilder {
  static buildPullRequestText(data, body) {
    return new DefaultTextBuilder()
      .withEmoji(data.emoji)
      .withHeader({
        url: body.pull_request.html_url,
        text: data.headline,
      })
      .withUsername({
        url: body.pull_request.user.html_url,
        text: body.pull_request.user.login,
      })
      .withDescription(data.description)
      .withRepository({
        url: body.repository.html_url,
        text: body.repository.full_name,
      })
      .build();
  }

  static buildClosedPullRequestText(data, body) {
    return new DefaultTextBuilder()
      .withEmoji(data.emoji)
      .withHeader({
        url: body.pull_request.html_url,
        text: data.headline,
      })
      .withUsername({
        url: body.pull_request.user.html_url,
        text: body.pull_request.user.login,
      })
      .withDescription(data.description)
      .build();
  }

  static buildIssueText(data, body) {
    return new DefaultTextBuilder()
      .withEmoji(data.emoji)
      .withHeader({
        url: body.issue.html_url,
        text: data.headline,
      })
      .withUsername({
        url: body.issue.user.html_url,
        text: body.issue.user.login,
      })
      .withDescription(data.description)
      .withRepository({
        url: body.repository.html_url,
        text: body.repository.full_name,
      })
      .build();
  }

  static buildPullRequestReviewCommentText(data, body) {
    return new DefaultTextBuilder()
      .withEmoji(data.emoji)
      .withHeader({
        url: body.review.user.html_url,
        text: data.headline,
      })
      .withUsername({
        url: body.review.user.html_url,
        text: body.review.user.login,
      })
      .withDescription(data.description)
      .withRepository({
        url: body.repository.html_url,
        text: body.repository.full_name,
      })
      .build();
  }

  static buildPullRequestReviewText(data, body) {
    return new DefaultTextBuilder()
      .withEmoji(data.emoji)
      .withHeader({
        url: body.pull_request.html_url,
        text: data.headline,
      })
      .withUsername({
        url: body.review.user.html_url,
        text: body.review.user.login,
      })
      .withDescription(data.description)
      .withRepository({
        url: body.repository.html_url,
        text: body.repository.full_name,
      })
      .build();
  }
}

export default GitHubTextBuilder;
