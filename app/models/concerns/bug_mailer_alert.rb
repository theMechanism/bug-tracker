module BugMailerAlert
  extend ActiveSupport::Concern

  included do
    around_save :alert_admin_if_assigned_to_bug
  end

  def alert_admin_if_assigned_to_bug
    admin_changed = self.admin_id_changed?
    
    if admin_changed
      old_ad_id = self.admin_id_was
      new_ad_id = self.admin_id
      
      BugMailer.alert_admin_assigned_to_bug(bug, admin_id)
      BugMailer.alert_admin_unassigned_from_bug(bug, admin_id)
    end
  end
end