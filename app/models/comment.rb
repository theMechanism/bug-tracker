class Comment < ActiveRecord::Base
  belongs_to :bug
  belongs_to :admin
end
