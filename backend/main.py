from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

class FAQ(BaseModel):
    title: str
    content: str
    imageUrl: str

# In-memory storage for FAQs
faqs = {}

@app.get("/faqs", response_model=List[FAQ])
def get_faqs():
    return list(faqs.values())

@app.get("/faqs/{faq_id}", response_model=FAQ)
def get_faq(faq_id: int):
    faq = faqs.get(faq_id)
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return faq

@app.post("/faqs", response_model=FAQ)
def create_faq(faq: FAQ):
    new_id = max(faqs.keys(), default=0) + 1
    faqs[new_id] = faq
    return faq

@app.put("/faqs/{faq_id}", response_model=FAQ)
def update_faq(faq_id: int, faq: FAQ):
    if faq_id not in faqs:
        raise HTTPException(status_code=404, detail="FAQ not found")
    faqs[faq_id] = faq
    return faq

@app.delete("/faqs/{faq_id}", response_model=FAQ)
def delete_faq(faq_id: int):
    if faq_id not in faqs:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return faqs.pop(faq_id)
