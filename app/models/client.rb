class Client < ActiveRecord::Base

  include Rails.application.routes.url_helpers
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :projects,
    	dependent: :destroy

  validates_uniqueness_of :name_of_co, :email

  def self.browser_facing_attrs
    clients = self.select([:id, :name_of_co, :name_of_primary_contact, :email, :misc_info, :phone])
    with_projects_and_admins = clients.map do |c| 
      projects = c.projects.map do |p| 
        p.attributes.merge!(p.project_manager_email).merge!(project_path: p.dashboard_uri)
      end
      c.attributes.merge(projects: projects)
    end
    with_projects_and_admins
  end

end
