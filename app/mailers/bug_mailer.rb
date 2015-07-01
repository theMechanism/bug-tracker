class BugMailer < ActionMailer::Base
  include Rails.application.routes.url_helpers
  default from: "BugTracker@themechanism.com"
  def submit_email(bug)
    @bug = bug
    mail(to: "avi.fox-rosen@themechanism.com", subject: "A New Bug Has Been Added To #{@bug.project.name}")
  end

  def alert_admin_assigned_to_bug(bug, admin_id)
    
    @bug = bug
    @url = dashboard_bug_url(@bug)
    p '#'*80
    p 'did we get url?'
    p "#{@url.inspect}"
    @admin = Admin.find(admin_id)
    mail(to: @admin.email, subject: "You have been assigend a new bug.")
  end

  def alert_admin_unassigned_from_bug(bug, admin_id)
  end
end
# BugMailer.alert_admin_assigned_to_bug(Bug.first, 1)