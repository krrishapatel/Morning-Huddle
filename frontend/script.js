<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Morning Huddle</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 20px;
            font-size: 2.5rem;
        }
        .search-container {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            align-items: center; /* Ensure all elements are vertically aligned */
        }
        #search,
        .date-picker,
        .search-button {
            height: 40px;
            padding: 8px 12px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
            font-family: 'Arial', sans-serif;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: border-color 0.3s, box-shadow 0.3s;
        }
        #search {
            flex: 1; /* Take up remaining space */
        }
        #search:focus,
        .date-picker:focus {
            border-color: #007bff;
            outline: none;
        }
        .date-picker {
            background-color: white;
            cursor: pointer;
        }
        .search-button {
            height: 40px;
            padding: 8px 20px; /* Adjusted padding */
            border: none;
            background-color: #007bff;
            color: white;
            cursor: pointer;
            font-size: 14px; /* Match font size */
        }
        .search-button:hover {
            background-color: #0056b3;
        }
        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        .tab {
            flex: 1;
            padding: 10px;
            text-align: center;
            background-color: #007bff;
            color: white;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .tab:hover {
            background-color: #0056b3;
        }
        .tab.active {
            background-color: #0056b3;
        }
        .tab-content {
            display: none;
            flex-direction: column;
            gap: 15px;
        }
        .tab-content.active {
            display: flex;
        }
        .insight-card {
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .insight-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .insight-card h3 {
            margin: 0;
            color: #007bff;
            font-size: 1.5rem;
        }
        .insight-card p {
            margin: 5px 0;
            color: #555;
        }
        .insight-card p strong {
            color: #333;
        }
        .vip {
            border-left: 5px solid gold;
        }
        .dietary-restriction {
            border-left: 5px solid #28a745;
        }
        .special-occasion {
            border-left: 5px solid #dc3545;
        }
        .fade-in {
            animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        /* Creative Enhancements */
        .search-container {
            position: relative;
        }
        .search-container::before {
            content: "🔍";
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #888;
            pointer-events: none;
        }
        #search {
            padding-left: 32px; /* Add space for the search icon */
        }
        .date-picker {
            background-color: #f9f9f9;
        }
        .search-button {
            height: 55px;
            padding: 8px 20px;
            border: none;
            background-color: #007bff;
            color: white;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
        }
        .search-button:hover {
            background-color: #0056b3; /* Darker shade on hover */
        }
        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        .tab {
            flex: 1;
            padding: 10px;
            text-align: center;
            background-color: #007bff;
            color: white;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s;
            font-size: 14px; /* Match font size */
            font-weight: bold; /* Match font weight */
        }
        .tab:hover {
            background-color: #0056b3;
        }
        .tab.active {
            background-color: #0056b3;
        }
        .tab-content {
            display: none;
            flex-direction: column;
            gap: 15px;
        }
        .tab-content.active {
            display: flex;
        }
        .insight-card {
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .insight-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .insight-card h3 {
            margin: 0;
            color: #007bff;
            font-size: 1.5rem;
        }
        .insight-card p {
            margin: 5px 0;
            color: #555;
        }
        .insight-card p strong {
            color: #333;
        }
        .vip {
            border-left: 5px solid gold;
        }
        .dietary-restriction {
            border-left: 5px solid #28a745;
        }
        .special-occasion {
            border-left: 5px solid #dc3545;
        }
        .fade-in {
            animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        /* Creative Enhancements */
        .search-container {
            position: relative;
        }
        .search-container::before {
            content: "🔍";
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #888;
            pointer-events: none;
        }
        #search {
            padding-left: 32px; /* Add space for the search icon */
        }
        .date-picker {
            background-color: #f9f9f9;
        }

        <style>
         .orders-summary {
             margin-bottom: 20px; /* Add space below the order summary */
         }

        .orders-summary-item {
            margin-bottom: 10px; /* Add space between each order item */
        }

        .guest-insights {
            margin-top: 50px; /* Add space above the guest insights */
        }

        .guest-insight {
            margin-top: 15px; /* Add space between each guest insight */
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
        }

        .guest-insight p {
            margin: 5px 0; /* Add space between lines in guest insights */
        }

        .guest-insight strong {
            display: block; /* Ensure guest names are on their own line */
            margin-bottom: 5px; /* Add space below guest names */
        }
    </style>

    <style>
        .orders-summary-heading {
            margin-bottom: 20px; /* Add space below the Orders Summary heading */
        }
        .orders-summary-item {
            margin-bottom: 10px; /* Add space between each order item */
        }
        .guest-insights-heading {
            margin-top: 20px; /* Add space above the Guest Insights heading */
        }
        .guest-insight {
            margin-top: 15px; /* Add space between each guest insight */
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
        }
        .guest-insight p {
            margin: 5px 0; /* Add space between lines in guest insights */
        }
        .guest-insight strong {
            display: block; /* Ensure guest names are on their own line */
            margin-bottom: 5px; /* Add space below guest names */
        }
    </style>

    </style>
</head>
<body>
<h1>Morning Huddle</h1>
<div class="search-container">
    <input type="text" id="search" placeholder="Search by name, dietary restrictions, or special occasions...">
    <input type="date" id="date-search" class="date-picker">
    <button onclick="filterByDate()" class="search-button">Search by Date</button>
</div>

<div class="tabs">
    <div class="tab active" onclick="showTab('all-reservations')">All Reservations</div>
    <div class="tab" onclick="showTab('vip-guests')">VIP Guests</div>
    <div class="tab" onclick="showTab('dietary-restrictions')">Dietary Restrictions</div>
    <div class="tab" onclick="showTab('special-occasions')">Special Occasions</div>
    <div class="tab" onclick="showTab('orders-summary')">Orders Summary</div>
</div>

<div id="all-reservations" class="tab-content active"></div>
<div id="vip-guests" class="tab-content"></div>
<div id="dietary-restrictions" class="tab-content"></div>
<div id="special-occasions" class="tab-content"></div>
<div id="orders-summary" class="tab-content"></div>

<script src="script.js"></script>
</body>
</html>
