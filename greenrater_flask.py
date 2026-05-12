
import os
from markupsafe import escape
import main
from flask import Flask
from flask import request, render_template, redirect, url_for, session


# Flask App setup (lines 9-21) created and functions guided using https://flask.palletsprojects.com/en/stable/tutorial/
def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY=os.environ.get('SECRET_KEY', 'dev'),
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    os.makedirs(app.instance_path, exist_ok=True)

    # HOME PAGE
    @app.route("/", methods = ["GET", "POST"])
    def index():

        if request.method == "POST":
            park_name = request.form.get("park_name")
            session["park_name"] = park_name

            rating_accessibility = int(request.form.get("rating_accessibility"))
            rating_social_equity = int(request.form.get("rating_social_equity"))
            rating_connection_to_nature = int(request.form.get("rating_connection_to_nature"))
            rating_community_consideration = int(request.form.get("rating_community_consideration"))
            rating_park_features = int(request.form.get("rating_park_features"))
            

            print(f"YABABABABBABA {rating_accessibility},{rating_social_equity}, {rating_connection_to_nature}")
            score_breakdown = main.rate_greenspace(rating_accessibility, rating_social_equity, rating_connection_to_nature, rating_community_consideration, rating_park_features)
            
            session["score"] = float(score_breakdown["score"])
            session["score_breakdown"] = score_breakdown
            session["park_name"] = park_name


            return redirect(url_for("results"))
        return render_template("index.html")

    @app.route('/results', methods =["GET", "POST"])
    def results():
        park_name = session["park_name"]
        score_breakdown = session["score_breakdown"]
        score = session["score"]
        rating_category =main.rating_category(score)
        return render_template("results.html", park_name=park_name, score_breakdown=score_breakdown,score=score, rating_category = rating_category)

    @app.route('/portfolio', methods =["GET", "POST"])
    def portfolio():
        return render_template("portfolio.html")

    @app.route("/process", methods = ["GET", "POST"])
    def process():
        return render_template("process.html")
    
    @app.route("/about", methods = ["GET", "POST"])
    def about():
        return render_template("about.html")
    
    @app.route("/calculation-info", methods = ["GET", "POST"])
    def calculation_info():
        return render_template("calculation-info.html")



    return app
if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

