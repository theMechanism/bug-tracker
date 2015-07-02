module BugMailerAlert
  extend ActiveSupport::Concern

  def alert_mailer_of_relevant_changes
    handle_admin_change
    handle_status_change
  end

  private

  def handle_admin_change
    if self.admin_id_changed?
      old_ad_id = self.admin_id_was
      new_ad_id = self.admin_id
      
      BugMailer.alert_admin_assigned_to_bug(self, admin_id).deliver
      BugMailer.alert_admin_unassigned_from_bug(self, admin_id).deliver
    end
  end

  def handle_status_change
    if self.status_changed?
      case self.status 
      when 'Verify'
        BugMailer.alert_project_manager_that_bug_needs_verification(self)
      when 'Open'
        BugMailer.alert_admin_revert_to_open(self)
      when 'Closed'
        BugMailer.alert_admin_is_closed(self)
      end
    end
  end
end