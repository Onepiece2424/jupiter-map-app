class FavoritePlacesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_favorite_place, only: %i[show edit update]

  def index
    @favorite_places = current_user.favorite_places
                                   .map { |p| { id: p.id, lat: p.latitude, lng: p.longitude, place_name: p.place_name } }
    render json: @favorite_places
  end

  def new
    @favorite_place = FavoritePlace.new
  end

  def create
    @favorite_place = FavoritePlace.create(latitude: params[:lat], longitude: params[:lng], country: params[:country], postcode: params[:postcode], user_id: current_user.id)
    render json: @favorite_place
  end

  def show
    @favorite_place = FavoritePlace.find(params[:id])
    render json: @favorite_place.as_json(methods: :image_url)
  end

  def edit; end

  def update
    if @favorite_place.update!(favorite_places_params)
      render json: @favorite_place, status: :ok
    else
      render json: { errors: @favorite_place.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def favorite_places_params
    params.require(:favorite_places).permit(:latitude, :longitude, :place_name, :country, :postcode, :description, :image)
  end

  def set_favorite_place
    @favorite_place = FavoritePlace.find(params[:id])
  end
end
