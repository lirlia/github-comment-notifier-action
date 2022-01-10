# GitHub Comment Notifier to Slack (GitHub Actions)

[英語(Eng)](./README.md) | [日本語(JP)](./README_jp.md)

This repository exposes **a GitHub Action that converts GitHub comments on a pull request into Slack format and notifies Slack**.

## What you can do

Currently, there is no way to filter or condition notifications from GitHub to Slack. So if you have a repository with a lot of CI notifications, bot comments, etc., GitHub to Slack notifications can be very noisy.

By setting up a CI using this GitHub Action, you can notify Slack only of comments that are trapped by (or don't match) a specific condition.


### Example

For example, the following is an example of notifying only when the string [post slack] is present in a GitHub comment.

You can define a Yaml that looks like this This is a GitHub Action that runs when a PR Request comment and a review comment are made, and will only post to Slack comments that contain the phrase `[post slack]`.

```yaml
name: github-comment-to-slack

on:
  issue_comment:
    types:
      - created
  pull_request_review_comment:
    types:
      - created
jobs:
  github-comment-to-slack:
    name: GitHub comment to slack
    if: ${{ startsWith(github.event.comment.body, '[post slack]') }}
    runs-on: ubuntu-latest
    steps:
      - uses: lirlia/github-comment-notifier-to-slack@v1.0.0
        with:
          slack-webhook-url: ${{ secrets.MY_WEBHOOK_URL }}
```

With the above configuration, only test2's comment will be posted even if you make such a comment.

![post-slack](images/post-slack.png)
![test2-comment](images/test2-comment.png)

## Usage

```yaml
- uses: lirlia/github-comment-notifier-to-slack@v1.0.0
  with:
    # slack webhook url (recommend to use GitHub secret).
    # https://docs.github.com/ja/actions/security-guides/encrypted-secrets
    slack-webhook-url: ${{ secrets.MY_WEBHOOK_URL }}
    # color code (HEX) for slack attachment 
    slack-color: 'fffffff' # default: 24292f
```

### Full yaml

```yaml
name: github-comment-to-slack

on:
  issue_comment:
    types:
      - created
  pull_request_review_comment:
    types:
      - created
jobs:
  github-comment-to-slack:
    name: GitHub comment to slack
    if: ${{ startsWith(github.event.comment.body, '[post slack]') }}
    runs-on: ubuntu-latest
    steps:
      - uses: lirlia/github-comment-notifier-to-slack@v1.0.0
        with:
          slack-webhook-url: ${{ secrets.MY_WEBHOOK_URL }}
```

### Other conditions

Do not notify comments posted by `mybot`, but do notify if `[post slack]` is included in the body.

```yaml
if: ${{ github.event.sender.login ! = 'my-bot' || startsWith(github.event.comment.body, '[post slack]') }}
```

See the formula for how to use `if`.

- [Expressions - GitHub Docs](https://docs.github.com/ja/actions/learn-github-actions/expressions)

## What you can't do

Even if you change or delete a GitHub comment, the following will not take place

- Modify a comment notified to Slack.
- Delete a comment posted to Slack.

## :warning:Caution:warning:

This job will be launched every time a comment is posted, which may result in an unintentionally high cost charge. Please be careful.

## License

[License](./LICENSE)
