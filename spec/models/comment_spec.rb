require 'spec_helper'

RSpec.describe Comment, :type => :model do

  context "has valid factory" do
    it 'builds with valid associations' do
      comment = create(:comment)
      expect(comment).to be_a(Comment)
    end
  end
end
