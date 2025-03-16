import json
from datetime import datetime
from models import DinersList

def load_data():
    try:
        with open("data/fine-dining-dataset.json") as f:
            data = json.load(f)
        return DinersList(**data)
    except Exception as e:
        print("Error loading data:", e)  # Debugging log
        return DinersList(diners=[])  # Return empty list if there's an error

def get_foh_insights(diners_list):
    insights = []
    for diner in diners_list.diners:
        for reservation in diner.reservations:
            insight = {
                "name": diner.name,
                "reservation_time": reservation.date.isoformat(),  # Ensure YYYY-MM-DD format
                "dietary_restrictions": list(set(tag for order in reservation.orders for tag in order.dietary_tags)),
                "special_occasions": [email.subject for email in diner.emails if "birthday" in email.subject.lower() or "anniversary" in email.subject.lower()],
                "notes": [review.content for review in diner.reviews],
                "orders": [{"item": order.item, "quantity": 1} for order in reservation.orders]
            }
            insights.append(insight)
    return insights