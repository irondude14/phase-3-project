class Pet
  attr_accessor :name

  @@all = []

  def initialize(name)
    @name = name
    @@all << self
  end

  def self.all
    @@all
  end
end

garfield = Pet.new('garfield')
p Pet.all
