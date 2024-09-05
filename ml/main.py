from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pathlib import Path
import uvicorn
from PIL import Image
import numpy as np
import tensorflow as tf
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from bson import ObjectId
import bcrypt
import logging
import certifi
from pymongo import MongoClient



app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://localhost:3001"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOADS_DIR = "./uploads"

Path(UPLOADS_DIR).mkdir(parents=True, exist_ok=True)


# Setting up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# DB Configurations
MONGODB_CONNECTION_URL = "mongodb+srv://Kolitha:111222333@cluster0.zh7sqtw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = AsyncIOMotorClient(MONGODB_CONNECTION_URL, tlsCAFile=certifi.where())
db = client["TeaClones"]
user_collection = db["users"]

# Load model with handling for potential custom objects
def load_model_with_custom_objects(model_path, custom_objects=None):
    model = tf.keras.models.load_model(model_path, custom_objects=custom_objects)
    return model

def check_plant(model, image_path):
    # Open the image and preprocess it
    img = Image.open(image_path)
    img = img.resize((48, 48))  # Resize the image to match model input size
    img = np.array(img)  # Convert image to numpy array
    img = img / 255.0  # Normalize pixel values
    
    # Make prediction
    prediction = model.predict(np.expand_dims(img, axis=0))
    predicted_class_index = np.argmax(prediction)
    class_names = ['Type 25', 'Type 26', 'Type Purple']
    predicted_class = class_names[predicted_class_index]
    
    return predicted_class

@app.post("/predict-tea-plant")
async def upload_image(file: UploadFile = File(...)):
    try:
        # Save the uploaded file
        file_path = f"{UPLOADS_DIR}/{file.filename}"
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())
        
        # Load the model
        model_path = 'model_plant.h5'
        model = load_model_with_custom_objects(model_path, custom_objects=None)

        # Make prediction
        predicted_class = check_plant(model, file_path)
        
        return {"predicted_class": predicted_class}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    

class UserModel(BaseModel):
    first_name: str = Field(...)
    last_name: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    role: str = Field(...)
    avatar: str = Field(...)

class UserLoginModel(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)

class UserResponseModel(BaseModel):
    # id: str
    first_name: str
    last_name: str
    email: str
    role: str
    avatar: str

async def get_user_by_email(email: str):
    user = await user_collection.find_one({"email": email})
    if user:
        user['_id'] = str(user['_id'])
    return user

async def get_user_by_id(user_id: str):
    user = await user_collection.find_one({"_id": ObjectId(user_id)})
    if user:
        user['_id'] = str(user['_id'])
    return user

@app.post("/users", response_model=UserResponseModel)
async def create_user(user: UserModel):
    user_exists = await get_user_by_email(user.email)
    if user_exists:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    user.password = hashed_password.decode('utf-8')
    user_dict = jsonable_encoder(user)
    result = await user_collection.insert_one(user_dict)
    new_user = await get_user_by_id(result.inserted_id)
    logger.debug(f"New user created: {new_user}")
    return new_user

@app.post("/token")
async def login(form_data: UserLoginModel):
    user = await get_user_by_email(form_data.email)
    if not user or not bcrypt.checkpw(form_data.password.encode('utf-8'), user['password'].encode('utf-8')):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    user['_id'] = str(user['_id'])
    response_data = {"access_token": user['_id'], "token_type": "bearer", "user": user}
    logger.debug(f"User logged in: {response_data}")
    return response_data

@app.get("/users/{user_id}", response_model=UserResponseModel)
async def get_user(user_id: str):
    user = await get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/users/email/{email}", response_model=UserResponseModel)
async def get_user_by_email_endpoint(email: str):
    user = await get_user_by_email(email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user  

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
