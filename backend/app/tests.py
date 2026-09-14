from rest_framework.test import APIClient, APISimpleTestCase

from app.constants.enums import HOUSE_STATUS, REPAIR_TYPES


class MetaOptionsApiTests(APISimpleTestCase):
    def test_meta_options_come_from_unified_enums(self):
        response = APIClient().get('/api/meta/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            'houseStatus': list(HOUSE_STATUS),
            'repairTypes': list(REPAIR_TYPES),
        })
