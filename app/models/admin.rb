class Admin < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :projects
  has_many :bugs
  has_many :comments

  validates_presence_of :name, :email

end
