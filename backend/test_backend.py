import requests
import json
import time

BASE_URL = "http://localhost:8000/api/auth/"

def print_response(response, name="Response"):
    print(f"\n{name} - Status: {response.status_code}")
    print("Headers:", response.headers)
    try:
        print("Body:", json.dumps(response.json(), indent=2))
    except json.JSONDecodeError:
        print("Body (non-JSON):", response.text)
    print("-" * 80)

def test_auth_flow():
    # 1. Register a new user
    print("=== Testing Registration ===")
    register_data = {
        "email": "test@example.com",
        "password": "securepassword123",
        "password2": "securepassword123",
        "first_name": "Test",
        "last_name": "User"
    }
    register_response = requests.post(f"{BASE_URL}register/", json=register_data)
    print_response(register_response, "Registration")
    
    # 2. Login with new credentials
    print("=== Testing Login ===")
    login_data = {
        "email": "test@example.com",
        "password": "securepassword123"
    }
    login_response = requests.post(f"{BASE_URL}login/", json=login_data)
    print_response(login_response, "Login")
    
    # Extract tokens
    access_token = login_response.json().get('access')
    refresh_token = login_response.json().get('refresh')
    
    # 3. Access protected profile
    print("=== Testing Protected Profile ===")
    headers = {"Authorization": f"Bearer {access_token}"}
    profile_response = requests.get(f"{BASE_URL}profile/", headers=headers)
    print_response(profile_response, "Profile")
    
    # 4. Test token refresh
    print("=== Testing Token Refresh ===")
    refresh_data = {"refresh": refresh_token}
    refresh_response = requests.post("http://localhost:8000/api/token/refresh/", json=refresh_data)
    print_response(refresh_response, "Token Refresh")
    
    if refresh_response.status_code == 200:
        new_access_token = refresh_response.json().get('access')
        
        # 5. Use new access token
        print("=== Testing with Refreshed Token ===")
        new_headers = {"Authorization": f"Bearer {new_access_token}"}
        profile_response2 = requests.get(f"{BASE_URL}profile/", headers=new_headers)
        print_response(profile_response2, "Profile with Refreshed Token")
    else:
        print("Skipping refreshed token test due to refresh failure")
    
    # 6. Test logout
    print("=== Testing Logout ===")
    logout_data = {"refresh": refresh_token}
    logout_response = requests.post(f"{BASE_URL}logout/", json=logout_data, headers=headers)
    print_response(logout_response, "Logout")
    
    # 7. Verify token is invalidated
    print("=== Testing Invalidated Token ===")
    invalid_response = requests.get(f"{BASE_URL}profile/", headers=headers)
    print_response(invalid_response, "Invalid Token Check")

if __name__ == "__main__":
    print("=== Starting Backend Tests ===")
    print("Make sure server is running: python manage.py runserver")
    test_auth_flow()
    print("=== Testing Complete ===")