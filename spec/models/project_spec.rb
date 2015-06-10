require 'spec_helper'

RSpec.describe Project, :type => :model do
  let(:project) { FactoryGirl.create :project }
  
  context 'valid factory' do
    it 'builds factory' do
      expect(project).to be_a(Project)
    end
    
  end

  context "validations" do
    it { should have_many :bugs }
    it { should validate_presence_of :name }  
    it { should belong_to :client }  

    it "ensure admin is project manager" do
      valid_pm = project.admin.is_project_manager
      expect(valid_pm).to be(true)

      project.admin = create(:admin) #standard dev, not pm
      expect(project.valid?).to be(false)
    end

    it "ensure valid urls" do 
      invalid_url = 'not a url. derp'
      project.git_repo_url = invalid_url
      expect(project.valid?).to be(false)
    end

  end
end