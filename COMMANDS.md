# Quick Commands Reference - Voter ID Card Generator

## 🚀 Getting Started

### Initial Setup (First Time Only)

```bash
# Navigate to project directory
cd d:\Django\india_voter

# Activate virtual environment
.\myenv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create database migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create admin user (optional, already created as admin/admin123)
python manage.py createsuperuser
```

## ▶️ Running the Server

### Start Development Server
```bash
cd d:\Django\india_voter
.\myenv\Scripts\activate
python manage.py runserver
```

**Server URL:** http://127.0.0.1:8000/

### Run on Different Port
```bash
python manage.py runserver 8080
```

### Run Server Publicly (for testing on LAN)
```bash
python manage.py runserver 0.0.0.0:8000
```

## 🔑 Admin Access

### Login Credentials
- **URL:** http://127.0.0.1:8000/admin/
- **Username:** admin
- **Password:** admin123

### Change Admin Password
```bash
python manage.py shell
from django.contrib.auth.models import User
u = User.objects.get(username='admin')
u.set_password('newpassword')
u.save()
exit()
```

## 🗄️ Database Management

### Create New Migration
```bash
python manage.py makemigrations
```

### Apply Migrations
```bash
python manage.py migrate
```

### Migrate Specific App
```bash
python manage.py migrate voter_card
```

### Show Migration Status
```bash
python manage.py showmigrations
```

### Reset Database (Delete and Recreate)
```bash
# Delete db.sqlite3
rm db.sqlite3  (Windows: del db.sqlite3)

# Recreate migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### Backup Database
```bash
# Simple copy
copy db.sqlite3 db.sqlite3.backup  (Windows)
cp db.sqlite3 db.sqlite3.backup    (Unix)

# Or export to JSON
python manage.py dumpdata > db.json

# Import from JSON
python manage.py loaddata db.json
```

## 🧪 Testing

### Run All Tests
```bash
python manage.py test
```

### Run Tests for Specific App
```bash
python manage.py test voter_card
```

### Run Tests with Verbose Output
```bash
python manage.py test -v 2
```

### Run Specific Test
```bash
python manage.py test voter_card.tests.VoterCardTestCase
```

## 🐚 Django Shell

### Start Interactive Shell
```bash
python manage.py shell
```

### Common Shell Commands
```python
# Import models
from voter_card.models import VoterCard

# Get all voter cards
VoterCard.objects.all()

# Get single card
VoterCard.objects.get(id=1)

# Filter cards
VoterCard.objects.filter(state='Maharashtra')

# Create new card
VoterCard.objects.create(
    first_name='John',
    father_name='Michael',
    date_of_birth='1995-05-15',
    address='123 Main St',
    voter_id_number='ABC1234567890',
    gender='Male',
    state='Maharashtra',
    serial_number='SN123'
)

# Update card
card = VoterCard.objects.get(id=1)
card.first_name = 'Jane'
card.save()

# Delete card
card = VoterCard.objects.get(id=1)
card.delete()

# Count records
VoterCard.objects.count()

# Exit shell
exit()
```

## 📦 Dependencies

### Install Requirements
```bash
pip install -r requirements.txt
```

### Create Requirements File
```bash
pip freeze > requirements.txt
```

### List Installed Packages
```bash
pip list
```

### Update Package
```bash
pip install --upgrade Django
```

## 🧹 Cleanup & Maintenance

### Collect Static Files
```bash
python manage.py collectstatic
```

### Collect Static Files (No Prompt)
```bash
python manage.py collectstatic --noinput
```

### Clean Old Files
```bash
python manage.py cleanupfromshellpluscommand
```

### Remove Pycache
```bash
# Windows
python -Bc -m compileall -b -q .

# Unix
find . -type d -name __pycache__ -exec rm -r {} +
```

## 📊 Database Inspection

### Create Database Diagram
```bash
python manage.py graph_models voter_card -o voter_models.png
```

### Inspect Database Schema
```bash
python manage.py inspectdb > models.py
```

### Show SQL Queries
```bash
python manage.py sqlmigrate voter_card 0001
```

## 🔍 Code Quality

### Check Code with Django
```bash
python manage.py check
```

### Run Linter
```bash
pip install pylint
pylint voter_card
```

### Format Code
```bash
pip install black
black voter_card/
```

## 🚀 Production Preparation

### Collect Static Files for Production
```bash
python manage.py collectstatic --noinput
```

### Create Superuser for Production
```bash
python manage.py createsuperuser
```

### Generate Secret Key
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Check Deployment Readiness
```bash
python manage.py check --deploy
```

## 📋 Common Issues & Solutions

### Issue: Port Already in Use
```bash
# Find process using port 8000
netstat -ano | findstr :8000

# Kill process
taskkill /PID <PID> /F

# Or use different port
python manage.py runserver 8001
```

### Issue: ModuleNotFoundError
```bash
# Activate virtual environment
.\myenv\Scripts\activate

# Reinstall packages
pip install -r requirements.txt
```

### Issue: Database Locked
```bash
# Delete lock file
rm db.sqlite3-shm
rm db.sqlite3-wal

# Or reset database
python manage.py migrate --run-syncdb
```

### Issue: Static Files Not Loading
```bash
# Collect static files
python manage.py collectstatic --noinput

# Check STATIC_ROOT in settings.py
```

### Issue: Media Files Not Loading
```bash
# Check MEDIA_ROOT and MEDIA_URL in settings.py
# Ensure media folder exists
mkdir media
mkdir media/voter_photos
```

## 📱 Development Tips

### Enable Debug Mode
```python
# In voter_project/settings.py
DEBUG = True
```

### Disable Debug Mode (Production)
```python
# In voter_project/settings.py
DEBUG = False
```

### Auto-reload on Code Changes
```bash
# Already enabled in development
python manage.py runserver
```

### Live Reload (requires django-extensions)
```bash
pip install django-extensions
python manage.py runserver --use-reloader
```

## 🔐 Security Commands

### Change Secret Key
```python
# Generate new key
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())

# Update in voter_project/settings.py
SECRET_KEY = 'your-new-secret-key'
```

### Reset Passwords
```bash
python manage.py changepassword admin
```

### Check Security Issues
```bash
python manage.py check --deploy
```

## 📊 Analytics & Monitoring

### Count Models
```bash
python manage.py shell
from voter_card.models import VoterCard
print(f"Total voters: {VoterCard.objects.count()}")
```

### Export Data
```bash
# Dump to JSON
python manage.py dumpdata > backup.json

# Dump specific model
python manage.py dumpdata voter_card.VoterCard > voters.json
```

### Import Data
```bash
python manage.py loaddata backup.json
```

## 🛠️ Useful Django Management Commands

### Show All Commands
```bash
python manage.py help
```

### Show Help for Specific Command
```bash
python manage.py help runserver
```

### Create App
```bash
python manage.py startapp appname
```

### Create Super User
```bash
python manage.py createsuperuser
```

### Change User Password
```bash
python manage.py changepassword username
```

### Clear Sessions
```bash
python manage.py clearsessions
```

## 📞 Documentation & Help

### Django Documentation
```
https://docs.djangoproject.com/
```

### View Settings
```bash
python manage.py diffsettings
```

### Show Template Directories
```bash
python manage.py shell
from django.template.engine import Engine
for dir in Engine.get_default().template_dirs:
    print(dir)
```

## 🎯 Useful File Paths

```
# Project root
d:\Django\india_voter\

# Settings file
d:\Django\india_voter\voter_project\settings.py

# Database
d:\Django\india_voter\db.sqlite3

# Media uploads
d:\Django\india_voter\media\voter_photos\

# Static files
d:\Django\india_voter\static\

# Templates
d:\Django\india_voter\templates\
```

## ⚙️ Configuration

### Access Settings
```python
from django.conf import settings
print(settings.DEBUG)
print(settings.ALLOWED_HOSTS)
print(settings.DATABASES)
```

### Environment Variables
```bash
# Set environment variable
set DJANGO_SECRET_KEY=your-secret-key

# Use in settings.py
import os
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')
```

---

## 📝 Notes

- Always activate virtual environment before running commands
- Use `python manage.py` for all Django commands
- Remember to migrate after model changes
- Test all changes before deploying
- Keep backups of database
- Update requirements.txt after installing new packages

---

**Last Updated:** February 5, 2026  
**Project:** Voter ID Card Generator
