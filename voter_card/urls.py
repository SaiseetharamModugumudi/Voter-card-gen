from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('create/', views.create_voter_card, name='create_voter_card'),
    path('card/<int:pk>/', views.view_voter_card, name='view_voter_card'),
    path('card/<int:pk>/edit/', views.edit_voter_card, name='edit_voter_card'),
    path('card/<int:pk>/delete/', views.delete_voter_card, name='delete_voter_card'),
    path('cards/', views.voter_cards_list, name='voter_cards_list'),
    path('search/', views.search_voter_card, name='search_voter_card'),
    path('api/card/<int:pk>/', views.voter_card_api, name='voter_card_api'),
]
