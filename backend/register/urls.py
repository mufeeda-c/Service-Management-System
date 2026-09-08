from django.urls import path
from .views import get_skills,Technician ,registerUser,loginUser,hello, csrfToken ,logoutUser,book_service, delete_service ,edit_service,get_services,get_service, get_inprogress_services ,get_completed_services ,get_pending_services,get_assigned_services

urlpatterns = [
    path('',registerUser ),
    path('login/',loginUser),
    path('hello/',hello),
    path('logout/', logoutUser),
    path('book_service/',book_service),
    path('get_services/',get_services),
    path('get_pending_services/',get_pending_services),
    path('get_assigned_services/',get_assigned_services),
    path('get_completed_services/',get_completed_services),
    path('get_inprogress_services/',get_inprogress_services),
    path('get_service/<int:id>',get_service),
    path('edit_service/<int:id>',edit_service),
    path('delete_service/<int:id>',delete_service),
    path('csrf/',csrfToken),
    path('skills/', get_skills, name='get-skills'),
    path('technician/',Technician)
]


