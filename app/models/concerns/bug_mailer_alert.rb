module BugMailerAlert
  extend ActiveSupport::Concern

  # this whole module is not working -- why?
  def alert_mailer_of_relevant_changes
    handle_admin_change
    handle_status_change
  end

  # private

  def handle_admin_change
    p "3"*80
    puts 'SHOULD SEE OLD + NEW ID NUMS #'

    if self.admin_id_changed?
      old_ad_id = self.admin_id_was
      new_ad_id = self.admin_id

      puts "old admin id: #{old_ad_id}"
      puts "new admin id: #{new_ad_id}"
      BugMailer.alert_admin_assigned_to_bug(self, new_ad_id).deliver
      BugMailer.alert_admin_unassigned_from_bug(self, old_ad_id).deliver
      true
    end
    true

  end

  def handle_status_change
    # if self.status_changed?
      case self.status 
      when 'Verify'
        BugMailer.alert_project_manager_that_bug_needs_verification(self).deliver
      when 'Open'
        BugMailer.alert_admin_revert_to_open(self).deliver
      when 'Closed'
        BugMailer.alert_admin_is_closed(self).deliver
      end
    # end
  end
end