from rest_framework import viewsets, routers, generics
from django.contrib.auth import get_user_model
from django_filters import rest_framework as filters
from shiftan.models import User, Store, Group, Shift_Range, Tmp_Work_Schedule, Work_Schedule, Schedule_Template
from .serializers import UserSerializer, StoreSerializer, GroupSerializer, Shift_RangeSerializer, Tmp_Work_ScheduleSerializer, Work_ScheduleSerializer, Schedule_TemplateSerializer, workSerializer 
from django_filters import rest_framework as filters
from rest_framework import status, viewsets
from rest_framework.response import Response

User = get_user_model()

class UserApi(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = '__all__'

    def get_queryset(self):
        queryset = User.objects.all()
        L_id = self.request.query_params.get('id')

        if L_id:
            queryset = queryset.filter(user_id=L_id)
        return queryset

class BulkCreateWork_ScheduleView(generics.CreateAPIView):
    serializer_class = Work_ScheduleSerializer(many = True)

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True
        return super(BulkCreateWork_ScheduleView, self).get_serializer(*args, **kwargs)

class StoreApi(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = '__all__'

class GroupApi(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = '__all__'

class Shift_RangeApi(viewsets.ModelViewSet):
    queryset = Shift_Range.objects.all()
    serializer_class = Shift_RangeSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = '__all__'

class Tmp_Work_ScheduleApi(viewsets.ModelViewSet):
    queryset = Tmp_Work_Schedule.objects.all()
    serializer_class = Tmp_Work_ScheduleSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = '__all__'
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data,list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def delete(self, request):
                Tmp_Work_Schedule.objects.filter(shift_range_FK=self.request.GET.get('fk')).delete()
                return Response('success')

class Work_ScheduleApi(viewsets.ModelViewSet):
    queryset = Work_Schedule.objects.all()
    serializer_class = Work_ScheduleSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = '__all__'
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data,list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def _perform_update(self, elm): #上書き保存する関数（未完成）
        start = elm.pop('start_time', [])
        stop = elm.pop('stop_time', [])
        fk = elm.pop('user_FK', [])
        pk = Work_Schedule.objects.update(**elm)
        db_instance = Work_Schedule.objects.filter(pk=pk).first()
        # db_instance.tag.clear()
        # db_instance.tag.add(*tags)
        print('Work_Schedule.objects')
        print(Work_Schedule.objects.filter(pk=pk).query)
        print('elm')
        print(elm)
        print('置き換えまえ')
        print(db_instance.user_FK)
        print('置き換え後')
        print(fk)
        Work_Schedule.objects.filter(pk=pk).query.start_time = start
        Work_Schedule.objects.filter(pk=pk).query.stop_time = stop
        Work_Schedule.objects.filter(pk=pk).query.user_FK = fk
    
    def put(self, request): # shiftrange fk を与えると、そのFKに属するWork_Scheduleを削除する関数
        data = request.data
        serialized = self.serializer_class(data=data, many=isinstance(data, list))
        serialized.is_valid(raise_exception=True)
        print(serialized.data)
        if isinstance(data, list):  # Update multiple elements
            for elm in serialized.data:
                self._perform_update(elm)
        else:  # Update one element
            self._perform_update(serialized.data)
        return Response({'msg': 'updated'})

    def delete(self, request):
                Work_Schedule.objects.filter(shift_range_FK=self.request.GET.get('fk')).delete()
                return Response('success')

        

class Schedule_TemplateApi(viewsets.ModelViewSet):
    queryset = Schedule_Template.objects.all()
    serializer_class = Schedule_TemplateSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = '__all__'
    
class Work_SchedulesApi(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = workSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = '__all__'



router = routers.DefaultRouter()
router.register(r'user', UserApi)
router.register(r'store', StoreApi)
router.register(r'group', GroupApi)
router.register(r'shift_range', Shift_RangeApi)
router.register(r'tmp_work_schedule', Tmp_Work_ScheduleApi)
router.register(r'work_schedule', Work_ScheduleApi)
router.register(r'schedule_template', Schedule_TemplateApi)
router.register(r'work_schedules', Work_SchedulesApi)