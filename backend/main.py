from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services import load_data, get_foh_insights

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/insights")
def get_insights():
    diners_list = load_data()
    insights = get_foh_insights(diners_list)
    return {"insights": insights}


from datetime import date

@app.get("/daily-huddle")
def daily_huddle():
    diners_data = DinersList.load_from_json(DATASET_PATH)
    today = date.today()
    todays_reservations = []

    for diner in diners_data.diners:
        for reservation in diner.reservations:
            if reservation.date == today:
                todays_reservations.append({
                    "name": diner.name,
                    "is_vip": diner.is_vip,
                    "insights": generate_guest_insights(diner)
                })

    return {"reservations": todays_reservations}
