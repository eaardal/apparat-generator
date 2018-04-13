export const processUnhandledEvent = (req, res) => {
  res
    .status(400)
    .send(
      `I can't handle "${req.body.action}" actions for "${req.get('X-GitHub-Event')}" events :(`,
    );
};

