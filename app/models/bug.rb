class Bug < ActiveRecord::Base
  # see models/concerns folder for email callbacks
  # include ActiveModel::Dirty
  include BugMailerAlert

  belongs_to :admin
  belongs_to :project
  has_many :comments, 
    dependent: :destroy

	VALID_STATUS = ['Open', 'Verify', 'Closed']

  validates_presence_of :description, :name, :project
 	validates_inclusion_of :status, in: VALID_STATUS
  validates_associated :admin, allow_nil: true, presence: true
  validates_associated :project
  validate :ensure_valid_admin_id

  public 
  
  def project_manager
    self.project.admin
  end

  private 



  def ensure_valid_admin_id
    if self.admin_id && Admin.where(id: self.admin_id).empty?
      errors.add(:admin_id, "is invalid")
    end
  end

end
