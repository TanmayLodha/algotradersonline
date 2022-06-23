from django.urls import path
from .views import make_file, list_strategies, post_cred, execute_strategy, stop_strategy, get_paper_trades, \
    execute_paper_trade, stop_paper_trades, get_ltp, set_completed, set_active

urlpatterns = [
    path('api/strategies/', list_strategies, name='strategies'),
    path('api/strategies/<int:pk>', make_file, name='make_file'),
    path('api/post_cred/', post_cred, name='post_credentials'),
    path('api/execute/', execute_strategy, name='execute_strategy'),
    path('api/stop/', stop_strategy, name='stop_strategy'),
    path('api/paper_trade/', execute_paper_trade, name='execute_paper_trade'),
    path('api/get_trades/', get_paper_trades, name='get_paper_trades'),
    path('api/stop_trades/', stop_paper_trades, name='stop_paper_trades'),
    path('api/get_ltp/', get_ltp, name='get_ltp'),
    path('api/set_completed/', set_completed, name='set_completed'),
    path('api/set_active/', set_active, name='set_active'),

]
