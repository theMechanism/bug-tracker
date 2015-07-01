 class MailPreview < MailView
  # include Rails.application.routes.url_helpers
    # Pull data from existing fixtures
    def alert_admin_assigned_to_bug
      @bug = Bug.first
      @admin_id = Admin.first.id
      BugMailer.alert_admin_assigned_to_bug(@bug, @admin_id) 
    end
  end