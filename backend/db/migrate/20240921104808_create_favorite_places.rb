class CreateFavoritePlaces < ActiveRecord::Migration[7.0]
  def change
    create_table :favorite_places do |t|
      t.integer :latitude
      t.integer :longitude
      t.string :place_name
      t.string :country
      t.string :postcode
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
