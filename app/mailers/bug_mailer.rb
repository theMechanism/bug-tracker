class BugMailer < ActionMailer::Base
  default from: "BugTracker@themechanism.com"
  def submit_email(bug)
    @bug = bug
    mail(to: "dev@themechanism.com", subject: "A New Bug Has Been Added To #{@bug.project.name}")
  end
end
