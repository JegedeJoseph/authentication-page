from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from supabase_client import supabase
from schemas import UserSignup, UserLogin, ForgotPassword, ResetPassword
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="School Dev Team Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # this is for the vercel front url
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/signup")
async def signup(user: UserSignup):
    try:
        # Creation of  user in Supabase Auth
        auth_response = supabase.auth.sign_up({
            "email": user.email,
            "password": user.password,
            "options": {
                "data": {"name": user.name}   # names stored in meatdata
            }
        })
        
        return {
            "message": "Signup successful. Please check your email to verify your account.",
            "user": auth_response.user
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/login")
async def login(user: UserLogin):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": user.email,
            "password": user.password
        })
        return {
            "access_token": response.session.access_token,
            "refresh_token": response.session.refresh_token,
            "user": response.user
        }
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid credentials")

@app.post("/forgot-password")
async def forgot_password(data: ForgotPassword):
    try:
        supabase.auth.reset_password_for_email(data.email, {
            "redirectTo": "https://your-frontend-url.vercel.app/reset-password"  #  Change this!
        })
        return {"message": "Password reset link sent to your email"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/reset-password")
async def reset_password(data: ResetPassword):
    try:
        # This endpoint should be called with the access token from the reset link
        
        response = supabase.auth.update_user({"password": data.password})
        return {"message": "Password updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Backend is running"}