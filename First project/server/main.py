from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from frasesContainer import list_frases

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

list = ["🍎", "🍊", "🍇", "🍓", "🥝", "🍍", "🍉", "🫐"]

@app.get("/FruitsList")
def read_root():
    return list

@app.get("/FrasesList")
def read_root():
    return list_frases

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
