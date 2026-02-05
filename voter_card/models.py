from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from datetime import date

class VoterCard(models.Model):
    """Model to store voter card details"""
    
    first_name = models.CharField(max_length=100)
    father_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    address = models.TextField()
    voter_id_number = models.CharField(max_length=20, unique=True)
    photo = models.ImageField(upload_to='voter_photos/')
    
    # Additional fields for Indian Voter ID
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], default='Male')
    state = models.CharField(max_length=100, default='')
    serial_number = models.CharField(max_length=50, default='')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.first_name} - {self.voter_id_number}"
    
    def get_age(self):
        """Calculate age from date of birth"""
        today = date.today()
        age = today.year - self.date_of_birth.year
        if (today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day):
            age -= 1
        return age
