class Bug < ActiveRecord::Base
	VALID_STATUS = ['Open', "Closed", "Verify"]
	validates_presence_of :description
	belongs_to :project,
 	  inverse_of: :bugs
 	validates_inclusion_of :status,
    	in: VALID_STATUS
end
