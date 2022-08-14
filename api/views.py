from rest_framework import viewsets, routers
from shiftan.models import User, Store, Group, Shift_Range, Tmp_Work_Schedule, Work_Schedule, Schedule_Template
from .serializers import UserSerializer, StoreSerializer, GroupSerializer, Shift_RangeSerializer, Tmp_Work_ScheduleSerializer, Work_ScheduleSerializer, Schedule_TemplateSerializer 

class UserApi(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        L_id = self.request.query_params.get('id')

        if L_id:
            queryset = queryset.filter(user_id=L_id)
        return queryset

class StoreApi(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

class GroupApi(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class Shift_RangeApi(viewsets.ModelViewSet):
    queryset = Shift_Range.objects.all()
    serializer_class = Shift_RangeSerializer

class Tmp_Work_ScheduleApi(viewsets.ModelViewSet):
    queryset = Tmp_Work_Schedule.objects.all()
    serializer_class = Tmp_Work_ScheduleSerializer

class Work_ScheduleApi(viewsets.ModelViewSet):
    queryset = Work_Schedule.objects.all()
    serializer_class = Work_ScheduleSerializer

class Schedule_TemplateApi(viewsets.ModelViewSet):
    queryset = Schedule_Template.objects.all()
    serializer_class = Schedule_TemplateSerializer

router = routers.DefaultRouter()
router.register(r'user', UserApi)
router.register(r'store', StoreApi)
router.register(r'group', GroupApi)
router.register(r'shift_range', Shift_RangeApi)
router.register(r'tmp_work_schedule', Tmp_Work_ScheduleApi)
router.register(r'work_schedule', Work_ScheduleApi)
router.register(r'schedule_template', Schedule_TemplateApi)