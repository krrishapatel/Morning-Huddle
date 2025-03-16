import openai
import os
from backend.models.load_data import DinersList

# Load API Key from environment variable
OPENAI_API_KEY = os.getenv("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")
openai.api_key = OPENAI_API_KEY

def generate_guest_insights(diner):
    """
    Uses OpenAI to generate insights for the restaurant staff.
    """
    # Extract relevant information from the diner object
    reviews = "\n".join([f"- {review.restaurant_name}: {review.content} (Rating: {review.rating})"
                         for review in diner.reviews]) if diner.reviews else "No reviews available."

    # Extract and format orders summary
    orders_summary = "No orders available."
    if diner.reservations:
        orders_summary = "\n".join([
            f"- {order.item} (Dietary Tags: {', '.join(order.dietary_tags) if order.dietary_tags else 'None'})"
            for reservation in diner.reservations
            for order in reservation.orders
        ])

    emails = "\n".join([f"- {email.subject}: {email.combined_thread}"
                        for email in diner.emails]) if diner.emails else "No emails available."

    # Create a detailed prompt for OpenAI
    prompt = f"""
    Guest: {diner.name}
    
    Previous Reviews:
    {reviews}
    
    Orders Summary:
    {orders_summary}
    
    Emails:
    {emails}
    
    Generate a short summary of how the restaurant staff should prepare for this guest, including personal preferences, dietary needs, and past experiences.
    """

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}]
        )
        return response["choices"][0]["message"]["content"]
    except Exception as e:
        return f"Error generating insights: {str(e)}"

