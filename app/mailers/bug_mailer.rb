class BugMailer < ActionMailer::Base
  default from: "BugTracker@themechanism.com"

  def submit_email(bug)
    @bug = bug
    mail(to: "avi.fox-rosen@themechanism.com", subject: "A New Bug Has Been Added To #{@bug.project.name}")
  end

  def alert_admin_assigned_to_bug(bug, admin_id)
    @bug = bug
    @admin = Admin.find(admin_id)
    mail(to: @admin.email, subject: "You have been assigned a new bug.")
  end

  def alert_admin_unassigned_from_bug(bug, admin_id)
    @bug = bug
    @admin = Admin.find(admin_id)
    mail(to: @admin.email, subject: "You have been unassigned from a bug.")
  end

  def alert_project_manager_that_bug_needs_verification(bug)
    @bug = bug
    @admin = @bug.admin
    @project_manager = @bug.project.admin
    mail(to: @project_manager.email, subject: "#{@admin.name} submit a bug to verify.")
  end

  def alert_admin_revert_to_open(bug)
    @bug = bug
    @admin = @bug.admin
    @project_manager = @bug.project.admin
    mail(to: @admin.email, subject: "#{@project_manager.name} re-opened a bug after your submission.")
  end

  def alert_admin_is_closed(bug)
    @bug = bug
    @admin = @bug.admin
    @project_manager = @bug.project.admin
    mail(to: @admin.email, subject: "#{@project_manager.name} closed your bug. Nice.")
  end

  # TODO - do we need comment alerts? also an in-app mail or alert system, ala social network messages
end
