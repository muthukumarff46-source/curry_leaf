import os
from werkzeug.utils import secure_filename
from flask import current_app

def save_file(file, folder):
    if not file:
        return None
    
    filename = secure_filename(file.filename)
    # Add timestamp to filename to make it unique
    import time
    filename = f"{int(time.time())}_{filename}"
    
    upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], folder)
    if not os.path.exists(upload_path):
        os.makedirs(upload_path)
        
    file_path = os.path.join(upload_path, filename)
    file.save(file_path)
    
    # Return relative path for DB
    return os.path.join('uploads', folder, filename).replace('\\', '/')
