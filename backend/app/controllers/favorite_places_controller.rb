class FavoritePlacesController < ApplicationController

  def index
    @favorite_places = FavoritePlace.all
  end

  def new
    @favorite_place = FavoritePlace.new
  end

  def create
  end

  private

  def favorite_places_params
    params.require(:favorite_places).permit(:latitude, :longitude, :place_name, :country, :postcode)
  end
end
