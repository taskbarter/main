---
description: This page shows the changes we made in the Taskbarter.com website.
---

# Changelog

## Alpha v0.0.2

### Added

* **Task View**
  * Allow users to view tasks even without authentication.
  * Display task state \(Completed, Assigned, Paused etc.\) on top of the task.
* **Edit Task**
  * Allow task owner to edit task. Headlines and Task points cannot be changed as some people would have engaged with task already.
  * Change task visibility.
    * Pause Task: Hide it from public feed. No user can view it except the task owner.
    * Remove Task: Mark the task as Archived and refund the task owner.
    * Unpause Task: Display it on public feed and allow users to send proposals.
  * Add helper buttons on task points for mobile users.

### Fixed

* **Task View**
  * Do not allow users to view 'Paused, Archived or Completed' tasks except the task owner.
* **Proposals**
  * Do not allow users to send proposals to tasks except for 'Pending Proposals' ones. Add backend as well as frontend validation. 

### Changed

* **Add Task**
  * Skills have new UI. Multiple skills can be selected and at max 3 are allowed to be selected. Users can also search skills in real-time.

## Alpha v0.0.1

### Added

* **Authentication**
  * Login
  * Register \(with confirmation\)
* **Explore Tasks**
  * Search Tasks
  * View task details in popup
  * Infinite Scroll
* **Add Tasks**
  * Define Points
  * Add rich text for description
  * Add a headline
  * Search Skills from list
  * Realtime Error Logging
* **Send Proposals**
  * Choose task, then click on 'Send Proposal' and type in the text to send proposal.
  * Send Message with the proposal to the task poster
  * Task poster cannot send proposals to himself
* **Messages**
  * Implement WebSocket to maintain live connection between the server and the client
  * Load Conversations
  * Load Messages separately and keep them in the view \(Redux store\).
  * Indicate 'Typing' when user is typing.
  * Proposal message has separate styling.
  * Task owner can accept, reject or negotiate with the proposal sender.
* **Notifications**
  * Send live notifications to relevant user.
  * Clicking on notification must redirect to related page.
  * Refresh notifications frequently for customer engagement.
* **Work on Task**
  * Allow users to send updates on task work page.
  * Allow task doer to submit work.
  * Allow task owner to respond to submitted work with either Acceptance or Rejection.
  * Send notification for every update on the work page.
  * On acceptance, both users will no longer be allowed to send updates on the work page.
* **Points System**
  * On publishing task, task points from the task poster's account must be deducted.
  * On acceptance of the work, the task doer will get decided task points.
  * On task removal, the task owner must be refunded with the task points. Only unstarted tasks are allowed to be removed.



