class Bug < ActiveRecord::Base

  belongs_to :admin
  belongs_to :project
  has_many :comments, dependent: :destroy

	VALID_STATUS = ['Open', 'Verify', 'Closed']

  validates_presence_of :description, :name, :project
 	validates_inclusion_of :status, in: VALID_STATUS
  validates_associated :admin, allow_nil: true, presence: true
  validates_associated :project
  validate :ensure_valid_admin_id

  around_save :alert_admin_if_assigned_to_bug

  def project_manager
    self.project.admin
  end

  private 

  def ensure_valid_admin_id
    if self.admin_id && Admin.where(id: self.admin_id).empty?
      errors.add(:admin_id, "is invalid")
    end
  end

  def alert_admin_if_assigned_to_bug
    admin_changed = self.admin_id_changed?
    
    if admin_changed
      old_ad_id = self.admin_id_was
      new_ad_id = self.admin_id
      #  call to mailer does not belong in model
      # alert system, have system listener, etc
      # check out: http://api.rubyonrails.org/classes/ActiveSupport/Notifications.html
      
      BugMailer.alert_admin_assigned_to_bug(bug, admin_id)
      BugMailer.alert_admin_unassigned_from_bug(bug, admin_id)

    end
  end
end
