require 'spec_helper'

RSpec.describe Bug, :type => :model do
  context "has valid factory" do
    it "so buggy" do
      bug = build(:bug)
      expect(bug).to be_a(Bug)
    end
    it { should validate_presence_of :description }  
    it { should belong_to :project } 
    it { should_not have_valid(:status).when('dsgufgdsuifgeg',12325,'', " ") }
    it { should have_valid(:status).when('Open','Closed','Verify') }
 
  end
end
