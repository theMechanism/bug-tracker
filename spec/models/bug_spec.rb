require 'spec_helper'

RSpec.describe Bug, :type => :model do

  let(:bug) { FactoryGirl.create :bug }
  
  context "has valid factory" do
    it "so buggy" do
      expect(bug).to be_a(Bug)
    end 
  end

  context 'validations' do 
    it { should validate_presence_of :description }  
    it { should belong_to :project } 
    it { should_not have_valid(:status).when('dsgufgdsuifgeg',12325,'', " ") }
    it { should have_valid(:status).when('Open','Closed','Verify') }

    it 'accepts associated admin' do
      bug.admin = create(:admin)
      expect(bug.valid?).to be(true)
    end

    it 'requires associated project' do
      bug.project = nil
      expect(bug.valid?).to be(false)
    end
  end
end
