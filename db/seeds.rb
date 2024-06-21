# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create!(
    username: "test",
    password: "test"
)

garlon = Product.create!(
  name: "Garlon 3a",
  epa_reg: "62719-37"
)

aquaneat = Product.create!(
  name: "AquaNeat",
  epa_reg: "228-365"
)

competitor = Product.create!(
  name: "Competitor",
  epa_reg: ""
)

hilight = Product.create!(
  name: "Hi-Light",
  epa_reg: ""
)

shelf1 = Shelf.create!(number: 1)
shelf2 = Shelf.create!(number: 2)
shelf3 = Shelf.create!(number: 3)
shelf4 = Shelf.create!(number: 4)
shelf5 = Shelf.create!(number: 5)