class Admin < ActiveRecord::Base

  has_many :projects
  has_many :bugs
  has_many :comments

  validates_presence_of :name, :email

end
