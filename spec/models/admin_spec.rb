require 'spec_helper'

RSpec.describe Admin, :type => :model do
  context "has valid factory" do
    it "creates a regular admin" do
      admin = build(:admin)
      expect(admin).to be_a(Admin)
    end
    
    it "creates a project manager" do
      pm = create(:project_manager)
      expect(pm).to be_a(Admin)
    end
  end
end
