 class MailPreview < MailView
    
  def alert_admin_assigned_to_bug
    @bug = Bug.first
    @admin_id = Admin.first.id
    BugMailer.alert_admin_assigned_to_bug(@bug, @admin_id) 
  end

  def alert_admin_unassigned_from_bug
    bug = Bug.first
    admin_id = Admin.last.id
    BugMailer.alert_admin_unassigned_from_bug(bug, admin_id)
  end

  def alert_project_manager_that_bug_needs_verification
    @bug = Bug.last
    BugMailer.alert_project_manager_that_bug_needs_verification(@bug)
  end

  def alert_admin_revert_to_open
  end

  def alert_admin_is_closed
  end
end