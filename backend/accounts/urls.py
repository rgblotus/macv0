from django.urls import path
from .views import RegisterView, LoginView, LogoutView, ProfileView, csrf_token_view, protected_view

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('csrf/', csrf_token_view, name='csrf_token'),
    path('protected/', protected_view, name='protected_view'),
]