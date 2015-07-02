module BugMailerAlert
  extend ActiveSupport::Concern
  def self.alert_mailer_of_relevant_changes(bug, initial_admin)
    handle_admin_change(bug, initial_admin)
    handle_status_change(bug)
  end

  def self.handle_admin_change(bug, init_admin)
    if bug.admin_id != init_admin
      BugMailer.alert_admin_assigned_to_bug(bug, bug.admin_id).deliver
      BugMailer.alert_admin_unassigned_from_bug(bug, init_admin).deliver
      true
    end
    true

  end

  def self.handle_status_change(bug)
      case bug.status
      when 'Verify'
        BugMailer.alert_project_manager_that_bug_needs_verification(bug).deliver
      when 'Open'
        BugMailer.alert_admin_revert_to_open(bug).deliver
      when 'Closed'
        BugMailer.alert_admin_is_closed(bug).deliver
      end
  end
end
