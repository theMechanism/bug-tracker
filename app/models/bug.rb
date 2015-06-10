class Bug < ActiveRecord::Base

  belongs_to :admin
  belongs_to :project
  #,
    #inverse_of: :bugs,
    #dependent: :destroy

	VALID_STATUS = ['Open', 'Closed', 'Verify']

  validates_presence_of :description, :name
 	validates_inclusion_of :status, in: VALID_STATUS
  validates_associated :project, allow_nil: false
  validates_associated :admin, allow_nil: true

end
