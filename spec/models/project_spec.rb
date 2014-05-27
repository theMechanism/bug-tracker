require 'spec_helper'

describe Project do
  it { should have_many :bugs }
  it { should validate_presence_of :name }  
  it { should belong_to :client }  

end
