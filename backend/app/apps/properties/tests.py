from rest_framework.test import APIClient, APISimpleTestCase

EXPECTED_FIELDS = ['id', 'community', 'region', 'layout', 'area', 'rent', 'deposit', 'payment', 'facilities', 'status', 'landlordPhone']

EXPECTED_PROPERTIES = [
    {'id': 1, 'community': '海棠公寓', 'region': '滨江区', 'layout': '两室一厅', 'area': 76, 'rent': 5200, 'deposit': 5200, 'payment': '月付', 'facilities': ['空调', '洗衣机', '宽带'], 'status': '待出租', 'landlordPhone': '13800000001'},
    {'id': 2, 'community': '梧桐里', 'region': '西湖区', 'layout': '一室一厅', 'area': 48, 'rent': 3900, 'deposit': 3900, 'payment': '季付', 'facilities': ['冰箱', '宽带'], 'status': '已预约', 'landlordPhone': '13800000002'},
]


class PropertyListApiTests(APISimpleTestCase):
    def setUp(self):
        self.response = APIClient().get('/api/properties/')

    def test_returns_200_and_all_sample_properties(self):
        self.assertEqual(self.response.status_code, 200)
        self.assertEqual(len(self.response.json()), 2)

    def test_response_fields_match_api_contract(self):
        for item in self.response.json():
            self.assertEqual(list(item.keys()), EXPECTED_FIELDS)
            self.assertIn('landlordPhone', item)
            self.assertNotIn('landlord_phone', item)

    def test_field_mapping_values(self):
        self.assertEqual(self.response.json(), EXPECTED_PROPERTIES)
