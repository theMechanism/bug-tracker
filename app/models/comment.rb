class Comment < ActiveRecord::Base
  belongs_to :bug
  belongs_to :admin

  validates_associated :bug, :admin
  validates_presence_of :content, :bug, :admin
end
