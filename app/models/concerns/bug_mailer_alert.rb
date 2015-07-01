module BugMailerAlert
  extend ActiveSupport::Concern

  included do
    after_save :handle_admin_change
    after_save :handle_status_change

  end

  def handle_admin_change
    admin_changed = self.admin_id_changed?
    
    if admin_changed
      old_ad_id = self.admin_id_was
      new_ad_id = self.admin_id
      
      BugMailer.alert_admin_assigned_to_bug(self, admin_id).deliver
      BugMailer.alert_admin_unassigned_from_bug(self, admin_id).deliver
    end
  end

  def handle_status_change
    if self.status_changed?
      # p '#'*80
      # p 'fires on create. derp'
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