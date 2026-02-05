from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.contrib import messages
from .models import VoterCard
from .forms import VoterCardForm
import json

def index(request):
    """Home page view"""
    voter_cards_count = VoterCard.objects.count()
    context = {
        'voter_cards_count': voter_cards_count,
    }
    return render(request, 'voter_card/index.html', context)

@require_http_methods(["GET", "POST"])
def create_voter_card(request):
    """Create a new voter card"""
    if request.method == 'POST':
        form = VoterCardForm(request.POST, request.FILES)
        if form.is_valid():
            voter_card = form.save()
            messages.success(request, 'Voter card created successfully!')
            return redirect('view_voter_card', pk=voter_card.pk)
        else:
            # Return form with errors
            context = {'form': form, 'errors': form.errors}
            return render(request, 'voter_card/create.html', context)
    else:
        form = VoterCardForm()
    
    context = {'form': form}
    return render(request, 'voter_card/create.html', context)

def view_voter_card(request, pk):
    """Display voter card"""
    voter_card = get_object_or_404(VoterCard, pk=pk)
    context = {'voter_card': voter_card}
    return render(request, 'voter_card/view.html', context)

def voter_cards_list(request):
    """List all voter cards"""
    voter_cards = VoterCard.objects.all()
    context = {'voter_cards': voter_cards}
    return render(request, 'voter_card/list.html', context)

@require_http_methods(["GET", "POST"])
def edit_voter_card(request, pk):
    """Edit a voter card"""
    voter_card = get_object_or_404(VoterCard, pk=pk)
    
    if request.method == 'POST':
        form = VoterCardForm(request.POST, request.FILES, instance=voter_card)
        if form.is_valid():
            form.save()
            messages.success(request, 'Voter card updated successfully!')
            return redirect('view_voter_card', pk=voter_card.pk)
        else:
            context = {'form': form, 'voter_card': voter_card, 'errors': form.errors}
            return render(request, 'voter_card/edit.html', context)
    else:
        form = VoterCardForm(instance=voter_card)
    
    context = {'form': form, 'voter_card': voter_card}
    return render(request, 'voter_card/edit.html', context)

@require_http_methods(["POST"])
def delete_voter_card(request, pk):
    """Delete a voter card"""
    voter_card = get_object_or_404(VoterCard, pk=pk)
    voter_card.delete()
    messages.success(request, 'Voter card deleted successfully!')
    return redirect('voter_cards_list')

def search_voter_card(request):
    """Search voter cards"""
    query = request.GET.get('q', '')
    voter_cards = []
    
    if query:
        voter_cards = VoterCard.objects.filter(
            first_name__icontains=query
        ) | VoterCard.objects.filter(
            voter_id_number__icontains=query
        ) | VoterCard.objects.filter(
            father_name__icontains=query
        )
    
    context = {
        'voter_cards': voter_cards,
        'query': query,
    }
    return render(request, 'voter_card/search.html', context)

def voter_card_api(request, pk):
    """API endpoint to get voter card data as JSON"""
    try:
        voter_card = VoterCard.objects.get(pk=pk)
        data = {
            'id': voter_card.id,
            'first_name': voter_card.first_name,
            'father_name': voter_card.father_name,
            'date_of_birth': voter_card.date_of_birth.strftime('%d/%m/%Y'),
            'address': voter_card.address,
            'voter_id_number': voter_card.voter_id_number,
            'gender': voter_card.gender,
            'state': voter_card.state,
            'serial_number': voter_card.serial_number,
            'age': voter_card.get_age(),
            'photo_url': voter_card.photo.url if voter_card.photo else '',
        }
        return JsonResponse(data)
    except VoterCard.DoesNotExist:
        return JsonResponse({'error': 'Voter card not found'}, status=404)
