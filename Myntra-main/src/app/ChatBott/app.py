# app.py
from flask import Flask, request, jsonify, render_template
import datetime

app = Flask(__name__)

def wishMe():
    hour = int(datetime.datetime.now().hour)
    if 0 <= hour < 12:
        return "Good Morning!"
    elif 12 <= hour < 18:
        return "Good Afternoon!"
    else:
        return "Good Evening!"

@app.route('/')
def serve_html():
    return render_template('index.html')

@app.route('/greet', methods=['GET'])
def greet():
    return jsonify({'message': f"{wishMe()} I am Maya, your virtual fashion companion! What's your name?"})

@app.route('/analyze', methods=['POST'])
def analyze_fashion_preference():
    data = request.get_json()
    query = data.get('query', '').lower()

    fashion_advice = {
        "casual outing": "For a casual outing, you can go with a pair of blue jeans, a white t-shirt, and some comfortable sneakers. You can also add a denim jacket if it’s a bit chilly.",
        "formal event": "For a formal event, you can never go wrong with a classic black suit or a little black dress. Pair it with polished shoes and minimalistic accessories for an elegant look.",
        "summer": "In summer, opt for light and breathable fabrics like cotton or linen. A sundress, shorts, and a tank top, or a loose-fitting shirt can keep you cool and stylish.",
        "winter": "In winter, layering is key. You can wear a thermal top, followed by a sweater, and finish with a stylish coat. Don’t forget to accessorize with a scarf, gloves, and a beanie to stay warm.",
        "black color": "Black is a versatile color that goes well with almost any color. For a classic look, pair black with white. For a bold look, you can combine black with red or yellow.",
        "navy blue": "Navy blue pairs well with neutrals like white, beige, and gray. You can also add a pop of color with yellow or coral accessories.",
        "beach vacation": "For a beach vacation, go for lightweight and airy clothing like a swimsuit, cover-up, shorts, tank tops, and flip-flops. Don’t forget to pack a hat and sunglasses for sun protection.",
        "job interview": "For a job interview, a well-fitted suit in a neutral color like black, navy, or gray is ideal. Pair it with a crisp white shirt and polished shoes. For a business casual environment, a blazer with slacks or a pencil skirt works well.",
        "fashion trends": "Currently, oversized blazers, high-waisted jeans, and statement accessories are trending. Pastel colors and sustainable fashion are also gaining popularity.",
        "denim jacket": "A denim jacket is very versatile. You can wear it over a summer dress, with a pair of skinny jeans and a t-shirt, or even over a hoodie for a casual look.",
        "look taller": "To look taller, opt for high-waisted pants or skirts, vertical stripes, and monochrome outfits. Avoid oversized clothing and go for well-fitted pieces.",
        "pear-shaped body": "For a pear-shaped body, emphasize your upper body by wearing bright colors and patterns on top. A-line skirts and dresses can balance your proportions, and darker shades on the bottom can be slimming.",
        "wardrobe essentials": "Some wardrobe essentials include a white shirt, a pair of well-fitted jeans, a little black dress, a blazer, comfortable sneakers, and classic black heels.",
        "outfit planning": "Plan your outfits based on your schedule. Mix and match versatile pieces. For example, a blazer can be worn with jeans for a casual look or with a skirt for a more formal outfit. Lay out your outfits the night before to save time in the morning."
    }

    response = "I'm not sure about that combination. Could you ask about a different color or style?"
    for key in fashion_advice:
        if key in query:
            response = fashion_advice[key]
            break

    return jsonify({'response': response})

if __name__ == "__main__":
    app.run(debug=True)
