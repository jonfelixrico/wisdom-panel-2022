export default {
  submittedByFormat: 'Submitted by {user} on {date}',
  receiveCount: 'Received 0 times | Received 1 time | Received {count} times',
  toDetailsPage: 'Show Details',
  authorFormatWithYear: 'by {user}, {year}',
  status: {
    pending: 'Pending Approval',
  },

  detailsPage: {
    title: 'Quote Details',
    authorFormat: 'Authored by {user}',
    submitterFormat: 'Submitted by {user} on {date}',

    pendingSection: {
      title: 'This submission is still pending!',
      message:
        'Pending quotes need a certain amount of votes for approval, and cannot be shown via the receive command until approved.',
      deadline: 'Voting is only open until {date}.',
      voteCount:
        'This quote has received {count} out of {total} vote. | This quote has received {count} out of {total} votes.',
      upvotedBy: 'Upvoted by {users}',
    },
  },
}
