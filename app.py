import os
import logging
from flask import Flask, render_template, request, flash, redirect, url_for
from methadone_converter import MethadoneConverter

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Create the app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-change-in-production")

# Initialize methadone converter
converter = MethadoneConverter()

@app.route('/', methods=['GET', 'POST'])
def index():
    """Main route for the methadone dosage converter."""
    conversion_result = None
    input_dosage = None
    
    if request.method == 'POST':
        try:
            # Get the dosage input from the form
            dosage_input = request.form.get('dosage', '').strip()
            
            if not dosage_input:
                flash('Please enter a dosage amount.', 'error')
                return render_template('index.html')
            
            # Convert to float
            input_dosage = float(dosage_input)
            
            if input_dosage <= 0:
                flash('Dosage must be a positive number.', 'error')
                return render_template('index.html', input_dosage=input_dosage)
            
            # Perform the conversion using methadone-converter
            conversion_result = converter.convert(input_dosage)
            
            app.logger.info(f"Converted dosage {input_dosage} mg with result: {conversion_result}")
            
        except ValueError:
            flash('Please enter a valid number for the dosage.', 'error')
            return render_template('index.html', input_dosage=dosage_input)
        except Exception as e:
            app.logger.error(f"Error during conversion: {str(e)}")
            flash(f'An error occurred during conversion: {str(e)}', 'error')
            return render_template('index.html', input_dosage=input_dosage)
    
    return render_template('index.html', 
                         conversion_result=conversion_result, 
                         input_dosage=input_dosage)

@app.route('/about')
def about():
    """About page with information about methadone conversion."""
    return render_template('about.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
