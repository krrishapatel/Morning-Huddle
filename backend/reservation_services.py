from dotenv import load_dotenv
import os
import openai
from backend.data.load_data import DinersList

# Load environment variables from .env file
load_dotenv()

# Get the OpenAI API key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
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
        # Make the API call to OpenAI
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that provides insights for restaurant staff."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=200  # Adjust as needed
        )
        return response["choices"][0]["message"]["content"]
    except Exception as e:
        # Log the error and return a fallback message
        print(f"Error generating insights: {str(e)}")
        return "Unable to generate insights at this time. Please check the guest's details manually."

# Example usage
if __name__ == "__main__":
    # Create a test Diner object
    diner = DinersList(
        diners=[
            {
                "name": "Emily Chen",
                "reviews": [
                    {
                        "restaurant_name": "French Laudure",
                        "date": "2023-11-15",
                        "rating": 5,
                        "content": "I visited last autumn, and it was unforgettable."
                    }
                ],
                "reservations": [
                    {
                        "date": "2024-05-20",
                        "number_of_people": 4,
                        "orders": [
                            {
                                "item": "Duck Confit",
                                "dietary_tags": ["gluten-free"],
                                "price": 45.0
                            }
                        ]
                    }
                ],
                "emails": [
                    {
                        "date": "2024-05-18",
                        "subject": "Gluten-Free Options",
                        "combined_thread": "Hello, I'm thrilled to return to French Laudure."
                    }
                ]
            }
        ]
    ).diners[0]

    # Generate insights
    insights = generate_guest_insights(diner)
    print(insights)
