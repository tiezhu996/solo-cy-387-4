from app.constants.enums import HOUSE_STATUS

# 样例数据按模型字段命名保存，对外字段映射由 PropertySerializer 负责
SAMPLE_PROPERTIES = [
    {
        'id': 1,
        'community': '海棠公寓',
        'region': '滨江区',
        'layout': '两室一厅',
        'area': 76,
        'rent': 5200,
        'deposit': 5200,
        'payment': '月付',
        'facilities': ['空调', '洗衣机', '宽带'],
        'status': HOUSE_STATUS[0],
        'landlord_phone': '13800000001',
    },
    {
        'id': 2,
        'community': '梧桐里',
        'region': '西湖区',
        'layout': '一室一厅',
        'area': 48,
        'rent': 3900,
        'deposit': 3900,
        'payment': '季付',
        'facilities': ['冰箱', '宽带'],
        'status': HOUSE_STATUS[1],
        'landlord_phone': '13800000002',
    },
]


def list_properties():
    """获取房源列表，当前返回样例数据，后续可替换为数据库查询。"""
    return list(SAMPLE_PROPERTIES)
