class Project < ActiveRecord::Base
  validates_presence_of :name
	has_many :bugs,
    dependent: :destroy
  belongs_to :client
  belongs_to :admin
  
  validates :name, uniqueness: { scope: :client }, presence: true
  validates_associated :client

  validates :git_repo_url, format: { with: URI.regexp }, if: Proc.new { |a| a.git_repo_url.present? }, allow_nil: true
  validates :dev_server_url, format: { with: URI.regexp }, if: Proc.new { |a| a.dev_server_url.present? }, allow_nil: true

  validate :admin_is_project_manager

  def bug_count
    self.bugs.count
  end

  private 

  def admin_is_project_manager
    if self.admin 
      errors.add(:admin, "must be a project manager") unless self.admin.is_project_manager
    end
  end 
end
