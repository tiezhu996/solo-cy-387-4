from rest_framework.response import Response
from rest_framework.views import APIView

from .data import list_properties
from .serializers import PropertySerializer


class PropertyListView(APIView):
    def get(self, request):
        serializer = PropertySerializer(list_properties(), many=True)
        return Response(serializer.data)
