class DefaultTextBuilder {
  withEmoji(emoji) {
    this.emoji = emoji;
    return this;
  }

  withHeader({ url, text }) {
    this.header = {
      url,
      text,
    };
    return this;
  }

  withUsername({ url, text }) {
    this.username = {
      url,
      text,
    };
    return this;
  }

  withRepository({ url, text }) {
    this.repository = {
      url,
      text,
    };
    return this;
  }

  withDescription(text) {
    this.description = text;
    return this;
  }

  build() {
    if (this.repository) {
      return (
        `${this.emoji} *<${this.header.url}|${this.header.text}>*
      <${this.username.url}|${this.username.text}> ${this.description} i <${this.repository.url}|${this.repository.text}>`
      );
    }

    return (
      `${this.emoji} *<${this.header.url}|${this.header.text}>*
      <${this.username.url}|${this.username.text}> ${this.description}`
    );
  }
}

export default DefaultTextBuilder;
