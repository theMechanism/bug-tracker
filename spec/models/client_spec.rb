require 'spec_helper'

RSpec.describe Client, :type => :model do
  context 'valid factory' do
    it 'builds factory' do
      client = build(:client)
      expect(client).to be_a(Client)
    end
  end
end


