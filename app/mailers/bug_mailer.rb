class BugMailer < ActionMailer::Base
  default from: "BugTracker@themechanism.com"
  def submit_email(bug)
    @bug = bug
    mail(to: "avi.fox-rosen@themechanism.com", subject: "A New Bug Has Been Added To #{@bug.project.name}")
  end

  def alert_admin_assigned_to_bug(bug, admin_id)
  end

  def alert_admin_unassigned_from_bug(bug, admin_id)
  end
end
