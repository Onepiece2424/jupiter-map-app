class FavoritePlacesController < ApplicationController
  before_action :authenticate_user!

  def index
    @favorite_places = FavoritePlace.all
  end

  def new
    @favorite_place = FavoritePlace.new
  end

  def create
    @favorite_place = FavoritePlace.create(latitude: params[:lat], longitude: params[:lng], country: params[:country], postcode: params[:postcode], user_id: current_user.id)
    render json: @favorite_place
  end

  private

  def favorite_places_params
    params.require(:favorite_places).permit(:latitude, :longitude, :place_name, :country, :postcode)
  end
end
