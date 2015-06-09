require 'spec_helper'

# describe Bug do
#   it { should validate_presence_of :description }  
#   it { should belong_to :project } 
#   it { should_not have_valid(:status).when('dsgufgdsuifgeg',12325,'', " ") }
#   it { should have_valid(:status).when('Open','Closed','Verify') }
 
#   it 'has a default status of Open' do

#     project = FactoryGirl.create(:project, client_id: 1)
#     bug = FactoryGirl.create(:bug, project_id: project.id)
#     expect(bug.status).to eql('Open') 
#   end
# end


RSpec.describe Bug, :type => :model do
  context "has valid factory" do
    it "so buggy" do
      bug = build(:bug)
      expect(bug).to be_a(Bug)
      # expect(Bug.is_project_manager).to be(false)
    end
    
    # it "creates a project manager" do
    #   pm = create(:project_manager)
    #   expect(pm).to be_a(Bug)
    #   expect(pm.is_project_manager).to be(true)
    # end
  end
end
