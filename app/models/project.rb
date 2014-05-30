class Project < ActiveRecord::Base
	 validates_presence_of :name
	 has_many :bugs,
    	dependent: :destroy
    belongs_to :client,
 	  inverse_of: :projects
 	validates :name, uniqueness: { scope: :client }
end
