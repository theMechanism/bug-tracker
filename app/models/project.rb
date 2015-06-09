class Project < ActiveRecord::Base
  validates_presence_of :name
	has_many :bugs,
    dependent: :destroy
  belongs_to :client
  
  validates :name, uniqueness: { scope: :client }, presence: true
  validates_associated :client

  validates :git_repo_url, format: { with: URI.regexp }, if: Proc.new { |a| a.git_repo_url.present? }, allow_nil: true
  validates :dev_server_url, format: { with: URI.regexp }, if: Proc.new { |a| a.dev_server_url.present? }, allow_nil: true
end
