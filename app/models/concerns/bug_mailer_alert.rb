module BugMailerAlert
  extend ActiveSupport::Concern
  def self.alert_mailer_of_relevant_changes(bug, initial_bug)
    handle_admin_change(bug, initial_bug.admin_id)
    handle_status_change(bug, initial_bug.status)
  end

  def self.handle_admin_change(bug, init_admin)
    if bug.admin_id != init_admin
      BugMailer.alert_admin_assigned_to_bug(bug).deliver
      BugMailer.alert_admin_unassigned_from_bug(bug, init_admin).deliver
    end    
  end

  def self.handle_status_change(bug, init_status)
    if bug.status != init_status
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
end
