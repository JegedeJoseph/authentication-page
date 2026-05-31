import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase_client import supabase
from schemas import UserSignup, UserLogin, ForgotPassword, ResetPassword
from dotenv import load_dotenv

load_dotenv()

raw_frontend = os.getenv("VERCEL_URL") or os.getenv("FRONTEND_URL")
if raw_frontend:
    FRONTEND_URL = raw_frontend if raw_frontend.startswith("http") else f"https://{raw_frontend}"
else:
    FRONTEND_URL = "http://localhost:3000"

app = FastAPI(title="School Dev Team Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Backend is running"}


@app.post("/signup")
async def signup(user: UserSignup):
    try:
       
        response = supabase.auth.sign_up(
            credentials={
                "email": user.email,
                "password": user.password,
                "options": {
                    "data": {"name": user.name}
                }
            }
        )

        if response.user is None:
            raise HTTPException(
                status_code=400,
                detail="Signup failed. The email may already be registered."
            )

        return {
            "message": "Signup successful. Please check your email to verify your account.",
            "user": {
                "id": response.user.id,
                "email": response.user.email,
            }
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/login")
async def login(user: UserLogin):
    try:
       
        response = supabase.auth.sign_in_with_password(
            credentials={
                "email": user.email,
                "password": user.password,
            }
        )

        if response.session is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials. Please check your email and password."
            )

        return {
            "access_token": response.session.access_token,
            "token_type": "bearer",
            "user": {
                "id": response.user.id,
                "email": response.user.email,
            }
        }

    except HTTPException:
        raise
    except Exception as e:
       
        raise HTTPException(status_code=401, detail=str(e))


@app.post("/forgot-password")
async def forgot_password(data: ForgotPassword):
    try:
        
        supabase.auth.reset_password_for_email(
            email=data.email,
            redirect_to=f"{FRONTEND_URL}/reset-password"
        )
        return {"message": "If that email exists, a password reset link has been sent."}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/reset-password")
async def reset_password(data: ResetPassword):
    
    try:
        response = supabase.auth.update_user(
            attributes={"password": data.password}
        )

        if response.user is None:
            raise HTTPException(
                status_code=400,
                detail="Password reset failed. Your reset link may have expired."
            )

        return {"message": "Password updated successfully. You can now log in."}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))