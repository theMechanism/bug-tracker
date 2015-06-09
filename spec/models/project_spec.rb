require 'spec_helper'

RSpec.describe Project, :type => :model do
  context 'valid factory' do
    it 'builds factory' do
      project = build(:project)

      p "#{project.errors.inspect}"
      expect(project).to be_a(Project)
    end
    # it { should have_many :bugs }
    # it { should validate_presence_of :name }  
    # it { should belong_to :client }  
  end
end