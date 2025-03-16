from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date

class Review(BaseModel):
    restaurant_name: str
    date: date
    rating: int = Field(..., ge=1, le=5)
    content: str

class Order(BaseModel):
    item: str
    dietary_tags: List[str]
    price: float

class Reservation(BaseModel):
    date: date
    number_of_people: int
    orders: List[Order]

class Email(BaseModel):
    date: date
    subject: str
    combined_thread: str

class Diner(BaseModel):
    name: str
    reviews: Optional[List[Review]] = None
    reservations: Optional[List[Reservation]] = None
    emails: Optional[List[Email]] = None

class DinersList(BaseModel):
    diners: List[Diner]