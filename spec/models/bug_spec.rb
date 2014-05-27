require 'spec_helper'

describe Bug do
  it { should validate_presence_of :description }  
  it { should belong_to :project } 
  it { should_not have_valid(:status).when('dsgufgdsuifgeg',12325,'', " ") }
  it { should have_valid(:status).when('Open','Closed','Verify') }
 
  it 'has a default status of Open' do

    project = FactoryGirl.create(:project, client_id: 1)
    bug = FactoryGirl.create(:bug, project_id: project.id)
    expect(bug.status).to eql('Open') 
  end
end
