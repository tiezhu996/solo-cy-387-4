from rest_framework.response import Response
from rest_framework.views import APIView

from app.constants.enums import HOUSE_STATUS, REPAIR_TYPES


class MetaOptionsView(APIView):
    """统一对外提供枚举选项，前端不再各自维护房屋状态与报修类型。"""

    def get(self, request):
        return Response({
            'houseStatus': list(HOUSE_STATUS),
            'repairTypes': list(REPAIR_TYPES),
        })
