require 'spec_helper'

RSpec.describe Client, :type => :model do

  let(:client) { FactoryGirl.create :client }

  context 'valid factory' do
    it 'builds factory' do
      expect(client).to be_a(Client)
    end
  end

  context 'dependents' do
    it 'destroys associated projects, bugs, comments on destroy' do
      p_count = Project.all.count
      b_count = Bug.all.count
      c_count = Comment.all.count
      p = client.projects.create(name: 'big project')
      b = p.bugs.create(description: 'bug', name:'buggy bug')
      c = b.comments.create(content: 'foo', admin: create(:admin))

      expect(Project.all.count).to eq(p_count + 1)
      expect(Bug.all.count).to eq(b_count + 1)
      expect(Comment.all.count).to eq(c_count + 1)
      
      client.destroy!
      
      expect(Project.all.count).to eq(p_count)
      expect(Bug.all.count).to eq(b_count)
      expect(Comment.all.count).to eq(c_count)
    end
  end
end


